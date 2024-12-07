"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "../context/SessionContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { MdCreate } from "react-icons/md"
import BlogItem from "./BlogItem"
import Link from "next/link"
import axios from "axios"

interface Post {
    id: number,
    userId: number,
    title: string,
    content: string,
    imageUrl?: string,
    createdAt: string,
    user: {
        profile: {
            name: string,
        } | null,
    } | null
}

const BlogContent = () => {
    const [deleting, setDeleting] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const { session } = useSession();

    const router = useRouter();
    const searchParams = useSearchParams();
    const itemsPerPage = 9;

    // Get search and page from URL
    const searchQueryFromUrl = searchParams.get("search") || "";
    const currentPageFromUrl = parseInt(searchParams.get("page") || "1", 10);

    const [searchQuery, setSearchQuery] = useState<string>(searchQueryFromUrl);
    const [currentPage, setCurrentPage] = useState<number>(currentPageFromUrl);

    // Paginate all posts first, then filter
    const totalPages = Math.ceil(posts.length / itemsPerPage);

    // Get paginated data before filtering
    const paginatedData = posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Filter the paginated data based on search query
    const filteredData = paginatedData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const updateQueryParams = (newParams: Record<string, string | number | boolean>) => {
        const currentParams = new URLSearchParams(window.location.search);
        for (const key in newParams) currentParams.set(key, String(newParams[key]));
        router.push(`?${currentParams.toString()}`)
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        updateQueryParams({ search: e.target.value, page: 1 })
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateQueryParams({ search: searchQuery, page: page })
    };

    const refreshData = async () => {
        try {
            const response = await axios.get("/api/blog/get");
            setPosts(response.data)
        }
        catch (error) { console.error("Failed to fetch posts:", error) }
        finally { setLoading(false) }
    };

    const handleDeletePost = async (id: number) => {
        setDeleting(id);
        try {
            const response = await axios.delete(`/api/blog/delete/${id}`);
            if (response.status === 200) refreshData()
        }
        catch (error: any) { setError(error.response?.data?.error || "An error occurred") }
    };

    useEffect(() => { refreshData() }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(timer)
        }
    }, [error]);

    useEffect(() => { updateQueryParams({ search: searchQuery, page: currentPage }) }, [searchQuery, currentPage]);

    return (
        <>
            <div className="w-full flex justify-between items-center my-4">
                {session && (
                    <Link
                        href={"/blog/new"}
                        className="flex items-center px-4 py-2 rounded-md border-2 group"
                    >
                        <MdCreate className="mr-2 group-hover:text-accent transition-colors" />
                        New Blog
                    </Link>
                )}
                <div className={`relative w-full ${session ? "max-w-sm" : ''} group`}>
                    <Input
                        type="text"
                        placeholder="Search blogs..."
                        className="w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-4 focus:ring-accent"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-accent transition-colors" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                    <p>Loading...</p>
                ) : filteredData.length === 0 ? (
                    <p>No posts available</p>
                ) : (
                    filteredData.map((post) => (
                        <BlogItem
                            key={post.id}
                            id={post.id.toString()}
                            userid={post.userId}
                            title={post.title}
                            description={post.content}
                            image={post.imageUrl}
                            author={post.user?.profile?.name}
                            date={post.createdAt}
                            className={deleting === post.id ? "opacity-0" : ""}
                            deleteItem={() => handleDeletePost(post.id)}
                        />
                    ))
                )}
            </div>

            <div className="mt-4 flex justify-center gap-4 space-x-2">
                <Button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded"
                >
                    &lt;&lt;
                </Button>
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded"
                >
                    &lt;
                </Button>
                {[...Array(totalPages).keys()].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <Button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`${currentPage === pageNumber ? "text-accent border border-accent" : ''} px-4 py-2 rounded`}
                        >
                            {pageNumber}
                        </Button>
                    );
                })}
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded"
                >
                    &gt;
                </Button>
                <Button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded"
                >
                    &gt;&gt;
                </Button>
            </div>

            {error && <div className="fixed inset-0 flex items-center justify-center text-5xl text-red-600">{error}</div>}
        </>
    );
};

export default BlogContent;
