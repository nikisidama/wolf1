"use client"

import { useSession } from "@/app/context/SessionContext"
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
    } catch (error) {
      setError("Invalid email or password.")
    }
  };

  return <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
    <h1 className="text-2xl font-bold mb-4">Login</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="bg-background p-2"
        required
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        autoComplete="on"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="bg-background p-2"
        required
      />
      <button type="submit" className="bg-accent py-2 px-4">Login</button>
    </form>
    <Link href={"/signup"}>Don't have an account?</Link>
  </div>
}
