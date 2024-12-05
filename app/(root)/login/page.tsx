"use client"

import { NextPage } from 'next'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from '@/app/context/SessionContext'
import { getSession } from '@/utils/cookie'
import axios from "axios"
import Link from 'next/link'

type FormData = {
  email: string;
  password: string;
};

const Page: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const { session, setSession } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("/api/auth/login", formData)
      if (response.data.success) {
        const sessionData = await getSession();
        console.log("sessionData: ", sessionData)
        if (!sessionData) return;
         const response = await axios.get(`/api/user/get/${sessionData.id}`);
          const userData = response.data;
          
          setSession({
            ...sessionData,
            name: userData.profile?.name || sessionData.email.split("@")[0],
          });
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
    <p>{JSON.stringify(session)}</p>
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
    <Link href={'/signup'}>Don't have an account?</Link>
  </div>
}

export default Page