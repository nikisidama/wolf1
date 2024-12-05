"use client"

import { useSession } from "../context/SessionContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

type FormState = {
    title: string,
    content: string
};

type ErrorState = {
    title?: string,
    content?: string
};

const BlogForm = ({ id }: { id?: number }) => {
    const editing = !!id;
    const [userid, setUserid] = useState<number>(0);
    const [formState, setFormState] = useState<FormState>({ title: "", content: "" });
    const [errors, setErrors] = useState<ErrorState>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { session } = useSession();
    const router = useRouter();

    const validateForm = () => {
        const errors: ErrorState = {};
        if (!formState.title.trim()) {
            errors.title = "Title is required.";
        }
        if (!formState.content.trim()) {
            errors.content = "Content is required.";
        }
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) return;
        if (!validateForm()) return;
        setIsSubmitting(true);

        const payload = {
            title: formState.title,
            content: formState.content,
            userId: session.id,
        };

        try {
            if (editing) await axios.put(`/api/blog/put/${id}`, payload);
            else await axios.post("/api/blog/post", payload)
        }
        catch (error) { console.error(error) }
        finally {
            setIsSubmitting(false);
            router.push(`/blog${editing ? `/${id}` : ""}`);
        }
    };

    useEffect(() => {
        const fetchBlogData = async () => {
            if (editing) {
                try {
                    const response = await axios.get(`/api/blog/get/${id}`);
                    setFormState({
                        title: response.data.title,
                        content: response.data.content,
                    });
                    setUserid(response.data.userId)
                } catch (error) {
                    console.error("Failed to fetch blog data:", error);
                    router.push("/blog")
                }
            }
        };

        fetchBlogData()
    }, [id, editing, router]);

    useEffect(() => {
        const checkSession = async () => {
            if (!session) {
                router.push("/login");
                return
            }

            if (editing && userid !== 0) {
                if (session.id !== userid && session.role !== "ADMIN") {
                    router.push("/blog");
                    return
                }
            }
        };

        if (userid || !editing) checkSession()
    }, [userid, editing, router]);


    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => setErrors({}), 3000);
            return () => clearTimeout(timer)
        }
    }, [errors]);

    return <form onSubmit={handleSubmit} className="w-[90%] h-full">
        {/* Title Field */}
        <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-medium">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formState.title}
                onChange={(e) => setFormState((prev) => ({ ...prev, title: e.target.value }))}
                className="mt-2 p-3 bg-black w-full"
                placeholder="Enter blog title"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="content" className="block text-lg font-medium">Content</label>
            <textarea
                id="content"
                name="content"
                value={formState.content}
                onChange={(e) => setFormState((prev) => ({ ...prev, content: e.target.value }))}
                className="bg-black w-full h-full mb-24"
                rows={6}
                placeholder="Enter blog content"
                required
            />
        </div>

        {/* Submit Button */}
        {errors.content && <span className="text-red-500">{errors.content}</span>}
        <div className="flex justify-center self-end">
            <button type="submit" disabled={isSubmitting}
                className="px-6 py-3 bg-accent focus:outline-none"
            >
                {isSubmitting ? editing ? "Updating..." : "Submitting..." : editing ? "Update Blog" : "Create Blog"}
            </button>
        </div>
    </form>
}

export default BlogForm