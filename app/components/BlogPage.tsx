"use client"

import { useSession } from "../context/SessionContext"
import { Button } from "@/components/ui/button"
import { MdArrowBack } from "react-icons/md"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BlogMenu from "./BlogMenu"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"

interface Post {
    userId: number,
    title: string,
    content: string,
    imageUrl?: string
}

const BlogPage = ({ id }: { id: string }) => {
    const [error, setError] = useState<string | null>(null);
    const [post, setPost] = useState<Post | null>(null);
    const { session } = useSession();
    const router = useRouter(); // Initialize useRouter
  
    useEffect(() => {
      if (!id) return;
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/blog/get/${id}`);
          setPost(response.data);
        } catch (error: any) {
          setError(error.response?.data?.error || "An error occurred");
        }
      };
      fetchPost();
    }, [id]);
  
    const handleDeletePost = async (id: number) => {
      try {
        const response = await axios.delete(`/api/blog/delete/${id}`);
        if (response.status === 200) router.push("/blog"); // Use router.push for navigation
      } catch (error: any) {
        setError(error.response?.data?.error || "An error occurred");
      }
    };
  
    if (!id) {
      router.push("/blog");
      return null; // Avoid rendering anything while redirecting
    }
  
    if (!post) return <div className="text-center h-full">Loading</div>;

    return <div className="flex flex-col items-center w-full h-full relative">
        <div className="w-full h-[calc(100vh-24rem)] select-none relative">
            <Image
                src={post.imageUrl || "/tempBlog.webp"}
                alt={post.title || "Blog image"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="z-[-1]"
                priority
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative p-6 h-screen w-full max-w-4xl mx-auto rounded-lg shadow-lg mt-4">
            {error && <div className="mb-4 text-center"><p className="text-lg text-red-500">{error}</p></div>}
            <h1 className="text-4xl font-bold text-center mb-6">{post.title}</h1>
            <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="absolute w-full top-4 left-0 right-0 flex justify-between gap-4 p-4">
            <Link href="/blog" className="flex justify-center items-center group">
                <Button variant="link" className="px-6 py-2 text-lg flex items-center gap-2">
                    <MdArrowBack className="h-5 w-5 group-hover:text-accent transition-colors" /> Back
                </Button>
            </Link>
            {session && (session.id === post.userId || session.role === "ADMIN") ?
                <BlogMenu id={id} yes={true} page={true} deleteItem={() => handleDeletePost(parseInt(id))} /> :
                <BlogMenu id={id} yes={false} page={true} deleteItem={() => { }} />
            }
        </div>
    </div>
}

export default BlogPage