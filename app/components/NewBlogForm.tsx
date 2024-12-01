"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';


const NewBlog = () => {
    const router = useRouter();

    // const [state, action] = useFormState(createMessage, null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('Technology');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const isFormValid = title && content;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("Please fill in both the title and description.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate an API call
            setTimeout(() => {
                alert("Blog created successfully!");
                router.push('/');  // Redirect to the home page or blog listing page after submission
            }, 1000);
        } catch (error) {
            alert("Failed to create blog. Please try again.");
            setIsSubmitting(false);
        }
    };

    return <>
        <form onSubmit={handleSubmit} className="w-[90%] h-full">
            {/* Title Field */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-lg font-medium">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 p-3 bg-black w-full"
                    placeholder="Enter blog title"
                    required
                />
            </div>

            {/* Category Field */}
            <div className="mb-4">
                <label htmlFor="category" className="block text-lg font-medium">Category</label>
                <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-2 p-3 bg-black w-full"
                >
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Business">Business</option>
                    <option value="Health">Health</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="content" className="block text-lg font-medium">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="bg-black w-full h-full mb-24"
                    rows={6}
                    placeholder="Enter blog content"
                    required
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center self-end">
                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`px-6 py-3 bg-accent focus:outline-none ${!isFormValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? 'Submitting...' : 'Create Blog'}
                </button>
            </div>
        </form>
    </>
}

export default NewBlog


