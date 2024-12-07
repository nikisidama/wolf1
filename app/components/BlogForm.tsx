"use client"

import { useSession } from "../context/SessionContext"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Tiptap from "./Tiptap"
import axios from "axios"

type FormState = {
    title: string,
    content: string
    image?: string
};

type ErrorState = {
    title?: string,
    content?: string
    image?: string
};

const BlogForm = ({ id }: { id?: number }) => {
    const editing = !!id;
    const [formState, setFormState] = useState<FormState>({ title: "Title", content: "Lorem ipsum", image: "" });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<ErrorState>({});
    const [userid, setUserid] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const { session } = useSession();
    const router = useRouter();

    const validateForm = () => {
        const errors: ErrorState = {};
        if (!formState.title.trim()) errors.title = "Title is required.";
        if (!formState.content.trim()) errors.content = "Content is required.";
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
            imageUrl: formState.image
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
                        image: response.data.imageUrl
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
            if (!session) return;

            if (editing && userid !== 0) {
                if (session.id !== userid && session.role !== "ADMIN") {
                    router.push("/blog");
                    return
                }
            }

            setLoading(false)
        };

        if (userid || !editing) checkSession()
    }, [userid, editing, router]);


    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => setErrors({}), 3000);
            return () => clearTimeout(timer)
        }
    }, [errors]);

    if (loading) return <div>Loading...</div>;

    return <form onSubmit={handleSubmit} className="w-[90%] h-full mt-12">
        <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-medium">Title</label>
            <Input
                type="text"
                id="title"
                name="title"
                value={formState.title}
                onChange={(e) => setFormState((prev) => ({ ...prev, title: e.target.value }))}
                className="mt-2 p-3 w-full"
                placeholder="Enter blog title"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="imageURL" className="block text-lg font-medium">image URL</label>
            <Input
                type="text"
                id="imageURL"
                name="imageURL"
                value={formState.image}
                onChange={(e) => setFormState((prev) => ({ ...prev, image: e.target.value }))}
                className="mt-2 p-3 w-full"
                placeholder="image URL"
            />
        </div>

        <div className="mb-4">
            <label htmlFor="content" className="block text-lg font-medium">Content</label>
            <Tiptap title={formState.title} content={formState.content} onUpdate={(content: string) => setFormState((prev) => ({ ...prev, content }))} />
        </div>

        {errors.content && <span className="text-red-500">{errors.content}</span>}
        <div className="flex justify-center self-end">
            <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-accent text-background rounded-md">
                {isSubmitting ? editing ? "Updating..." : "Submitting..." : editing ? "Update Blog" : "Create Blog"}
            </button>
        </div>
    </form>
}

export default BlogForm