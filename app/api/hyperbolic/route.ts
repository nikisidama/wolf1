"use server"

import { OpenAI } from "openai"
import { NextRequest, NextResponse } from "next/server"

const client = new OpenAI({
  apiKey: process.env.HYPERBOLIC_API_KEY,
  baseURL: "https://api.hyperbolic.xyz/v1"
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userMessage } = body;
    console.log("userMessage: ", userMessage)
    const response = await client.chat.completions.create({
      messages: [
        // { role: "system", content: "You are an expert travel guide." },
        { role: "user", content: userMessage }
      ],
      model: "meta-llama/Llama-3.2-3B-Instruct",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.9
    });

    console.log(response);
    const output = response.choices[0].message.content;
    return NextResponse.json({ output })
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 })
  }
}