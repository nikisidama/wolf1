"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogItem from "./BlogItem";
import Link from "next/link";
import axios from "axios";
import { useSession } from "../context/SessionContext";

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    user: {
        profile: {
            name: string;
        } | null;
    } | null;
}

const BlogContent = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { session } = useSession();

    const router = useRouter();
    const searchParams = useSearchParams();
    const itemsPerPage = 9;
    const pageRange = 10;

    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
    const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get("page") || "1", pageRange));


    const filteredData = posts.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) // || item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const updateQueryParams = (newParams: Record<string, string | number | boolean>) => {
        const currentParams = new URLSearchParams(window.location.search);
        for (const key in newParams) currentParams.set(key, String(newParams[key]));
        router.push(`?${currentParams.toString()}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const refreshData = async () => {
        try {
            const response = await axios.get("/api/blog/get");
            setPosts(response.data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (id: number) => {
        try {
            const response = await axios.delete(`/api/blog/delete/${id}`);
            if (response.status === 200) {
                refreshData();
            }
        } catch (error: any) {
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        updateQueryParams({ search: searchQuery, page: currentPage });
    }, [searchQuery, currentPage]);

    return (
        <>
            <div className="w-full flex justify-between my-4">
                {session && (
                    <Link href={"/blog/new"} className="px-2 py-2 mr-4 text-center bg-black">
                        New Blog
                    </Link>
                )}
                <input
                    type="text"
                    placeholder="Search blogs..."
                    className="p-2 w-full bg-black"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                {loading ? (
                    <p>Loading...</p>
                ) : paginatedData.length === 0 ? (
                    <p>No posts available</p>
                ) : (
                    paginatedData.map((post) => (
                        <BlogItem
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            description={post.content}
                            author={post.user?.profile?.name}
                            date={post.createdAt}
                            deleteItem={() => handleDeletePost(post.id)}
                        />
                    ))
                )}
            </div>

            <div className="mt-4 flex justify-center gap-4 space-x-2">
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded"
                >
                    &lt;&lt;
                </button>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded"
                >
                    &lt;
                </button>
                {[...Array(totalPages).keys()].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-4 py-2 ${currentPage === pageNumber ? "bg-accent border" : "bg-black"
                                } rounded`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded"
                >
                    &gt;
                </button>
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded"
                >
                    &gt;&gt;
                </button>
            </div>

            {error && <div className="fixed inset-0 flex items-center justify-center text-5xl text-red-600">{error}</div>}
        </>
    );
};

export default BlogContent;
