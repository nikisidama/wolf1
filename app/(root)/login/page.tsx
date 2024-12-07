"use client"

import { useSession } from "@/app/context/SessionContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { getSession } from "@/utils/cookie"
import { useState } from "react"
import Link from "next/link"
import axios from "axios"

export default function Page() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const { setSession } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("/api/auth/login", formData)
      if (response.data.success) {
        const session = await getSession();
        if (!session) return;
        setSession(session);
        router.push("/home")
      }
    } 
    catch (error) { setError("Invalid email or password.") }
  };

  return <div className="flex flex-col items-center justify-center gap-4 min-h-screen w-full">
    <h1 className="text-2xl font-bold mb-4">Login</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full h-full max-w-md mx-auto">
      <Input
        id="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="p-3 w-full rounded-md focus:ring-2 focus:ring-accent selection:text-foreground selection:bg-accent"
        required
      />
      <Input
        id="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        autoComplete="on"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="p-3 w-full rounded-md focus:ring-2 focus:ring-accent selection:text-foreground selection:bg-accent"
        required
      />
      <Button type="submit" className="bg-accent text-background py-2 w-full">Login</Button>
    </form>
    <Link href={"/signup"} className="mt-4 text-accent">Don't have an account?</Link>
  </div>
}
