"use client"

import { useSession } from "@/app/context/SessionContext"
import { useState, useEffect } from "react"
import axios from "axios"

interface Profile {
  name: string,
  bio: string | null
}

interface User {
  id: number,
  email: string,
  profile: Profile,
}

export default function UserHomePage() {
  const { session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/api/user/get/${session.id}`);
          setUser(response.data);
        } catch (err: any) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data.");
        }
      };

      fetchUser();
    }
  }, [session]);

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (!user) {
    return <div className="text-center py-8">Loading</div>;
  }

  return <div className="flex flex-col justify-center items-center mx-auto px-4 py-8 h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">{user.profile.name}</h1>
        <p>{user.profile.bio}</p>
      </div>
    </div>
}
