"use client"

// pages/users.tsx

import { useEffect, useState } from "react";
import axios from "axios";

interface Profile {
  name: string;
  bio: string | null;
}

interface User {
  id: number;
  email: string;
  profile: Profile;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user/get");
        setUsers(response.data);
      } catch (err: any) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Users</h1>

      {error && <div className="text-red-500 text-center py-8">{error}</div>}

      {users.length > 0 ? (
        <div className="flex flex-col gap-5">
          {users.map((user) => (
            <div key={user.id} className="group block shadow-md overflow-hidden hover:shadow-lg border transition-shadow">
              <div className="p-4">
                <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">
                  {user.profile.name}
                </h2>
                <p className="text-sm mt-2">{user.profile.bio || "No bio available."}</p>
                <p className="text-sm mt-2">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Loading</p>
      )}
    </div>
  );
}
