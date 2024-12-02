"use client";

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
  const { setSession } = useSession()
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signup", formData);

      setSession(response.data.session);

      if (response.status === 201) {
        router.push("/home/setup");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };

  return <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-background p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          autoComplete="on"
          className="bg-background p-2"
        />
        <button type="submit" className="bg-accent py-2 px-4">Sign Up</button>
      </form>
    </div>
};

export default Page