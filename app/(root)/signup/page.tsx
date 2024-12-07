"use client"

import { useSession } from "@/app/context/SessionContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSession } from "@/utils/cookie"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import axios from "axios"

type FormData = {
  email: string,
  password: string
};

export default function Page() {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const { setSession } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signup", formData);
      if (response.data.success) {
        const session = await getSession();
        if (!session) return;
        setSession(session);
        router.push("/home/setup");
      }
    } catch (error: any) {
      if (error.response) setError(error.response.data.message || "An error occurred");
      else setError("An error occurred");
    }
  };

  return <div className="flex flex-col items-center justify-center gap-4 min-h-screen w-full">
    <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full h-full max-w-md mx-auto">
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="p-3 w-full rounded-md focus:ring-2 focus:ring-accent selection:text-foreground selection:bg-accent"
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        autoComplete="on"
        className="p-3 w-full rounded-md focus:ring-2 focus:ring-accent selection:text-foreground selection:bg-accent"
      />
      <Button type="submit" className="bg-accent text-background py-2 w-full">Sign Up</Button>
    </form>
    <Link href={"/login"} className="mt-4 text-accent">Already have an account?</Link>
  </div>
}
