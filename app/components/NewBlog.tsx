"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { postSchema } from '@/utils/zodSchema';
import { getSession } from '@/utils/cookie';
import { z } from 'zod';
import axios from "axios";

type SessionData = {
    id: number;
    email: string;
    role: string;
    name: string;
};

type FormState = {
    title: string;
    content: string;
};

type ErrorState = {
    title?: string;
    content?: string;
};

export default function NewBlog() {
    const [formState, setFormState] = useState<FormState>({ title: '', content: '' });
    const [errors, setErrors] = useState<ErrorState>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [session, setSession] = useState<SessionData | null>(null);
    const router = useRouter();

    const validateForm = () => {
        try {
            postSchema.parse(formState);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.errors.reduce((acc, err) => {
                    const field = err.path[0];
                    if (typeof field === "string" && field in acc) {
                        acc[field as keyof FormState] = err.message;
                    }
                    return acc;
                }, {} as ErrorState);
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formState) return;
        if (!session) return;
        if (!validateForm()) return;
        setIsSubmitting(true);

        const payload = {
            title: formState.title,
            content: formState.content,
            userId: session.id,
        };

        console.log(formState);
        try {
            await axios.post('/api/blog/post', payload);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
            router.push('/blog');
        }
    };

    useEffect(() => {
        const checkSession = async () => {
            const sessionData = await getSession();
            if (!sessionData) { router.push("/login"); }
            setSession(sessionData);
        };

        checkSession();
    }, [router]);


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
                {isSubmitting ? 'Submitting...' : 'Create Blog'}
            </button>
        </div>
    </form>
}
