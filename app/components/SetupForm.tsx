"use client"

import { useSession } from "@/app/context/SessionContext"
import { useEffect, useState } from "react"
import { getSession } from "@/utils/cookie" 
import { useRouter } from "next/navigation"
import axios from "axios"

export const SetupForm = () => {
    const { session, setSession } = useSession();
    const [profile, setProfile] = useState({ name: "", bio: "" });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put("/api/setup", profile);
            if (response.data.success) {
                const session = await getSession();
                if (!session) return;
                console.log("Session updated:", session);
                setSession(session);
                router.push("/home");
            }
        }
        catch (error) { console.error("Error setting up profile:", error) }
        finally { setLoading(false) }
    };

    useEffect(() => {
        if (!session) return;
        setProfile({ name: session.profile?.name || "User", bio: session.profile?.bio || "Bio" });
        setLoading(false)
    }, [session, router]);

    if (loading) return <div>Loading...</div>;

    return <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full h-full">
        <label>Name:
            <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-black p-2 w-full"
                required
            />
        </label>
        <label>Bio:
            <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="bg-black p-4 w-full"
            />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
    </form>
}

export default SetupForm
