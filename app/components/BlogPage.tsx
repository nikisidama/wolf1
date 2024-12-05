"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import axios from "axios"

interface Post {
    title: string,
    content: string
}

const BlogPage = ({ id }: { id: string }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/blog/get/${id}`);
                setPost(response.data);
            } 
            catch (error: any) { setError(error.response?.data?.error || "An error occurred") }
        };
        fetchPost()
    }, [id]);

    if (!id) redirect("/blog");
    if (!post) return <div className="text-center h-full">Loading</div>;

    return <div>
        {error && <p className="text-lg text-red-500">{error}</p>}
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <Link href="/blog" className="absolute top-4 left-4 p-2 m-4">Back</Link>
        <Link href={`/blog/${id}/config`} className="absolute top-4 right-4 p-2 m-4">Edit</Link>
    </div>
}

export default BlogPage