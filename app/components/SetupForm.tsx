"use client"

import { useSession } from "@/app/context/SessionContext"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
            const response = await axios.put("/api/user/setup", profile);
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

    return <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full h-full max-w-md mx-auto">
        <div className="w-full">
            <label htmlFor="name" className="text-sm font-medium">
                Name
            </label>
            <Input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="p-3 w-full rounded-md focus:ring-2 focus:ring-accent selection:text-foreground selection:bg-accent"
                required    
            />
        </div>
        <div className="w-full">
            <label htmlFor="bio" className="text-sm font-medium">
                Bio
            </label>
            <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="p-3 w-full rounded-md focus:ring-2 focus:ring-accent selection:text-foreground selection:bg-accent"
            />
        </div>
        <Button
            type="submit"
            variant={"outline"}
            className="w-full mt-4 hover:text-background dark:hover:text-foreground"
            disabled={loading}
        >
            {loading ? "Saving..." : "Save"}
        </Button>
    </form>
}

export default SetupForm
