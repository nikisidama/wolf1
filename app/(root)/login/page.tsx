"use client"

import { NextPage } from 'next'
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useSession } from '@/app/context/SessionContext'

type FormData = {
  email: string;
  password: string;
};

const Page: NextPage = () => {
  const router = useRouter();
  const { setSession } = useSession();
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("/api/auth/login", formData)

      setSession(response.data.session);
      
      if (response.status === 200) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Login failed:", error)
      setError("Invalid email or password.")
    }
  }

  return <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold mb-4">Login</h1>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
      <div>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-background p-2"
          required
        />
      </div>

      <div>
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
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
}

export default Page