"use client"

import { useState } from "react"
import axios from "axios"

export default function Page() {
    const [userMessage, setUserMessage] = useState("");
    const [responses, setResponses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("userMessage: ", userMessage);
            const res = await axios.post(
                "/api/hyperbolic",
                { userMessage },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const data = res.data;
            setResponses((prevResponses) => [...prevResponses, data.output]);
            setLoading(false);
        }
        catch (error) { console.error(error) }
    };

    return <div>
        <h1>Ask AI</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your query"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="bg-black"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Ask"}
            </button>
        </form>

        {responses.length > 0 && (
            <div>
                <h2>Responses</h2>
                {responses.map((response, index) => (
                    <p key={index}>{response}</p> // Display all responses
                ))}
            </div>
        )}
    </div>
}
