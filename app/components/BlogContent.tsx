"use client"

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogItem from "./BlogItem";
import Link from "next/link";

type DataItem = {
    id: number;
    title: string;
    description: string;
    createDate: string;
    category: string;
};

const BlogContent = () => {
    const data: DataItem[] = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `Blog ${i + 1}`,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam natus autem expedita aliquam dolores ad cum laboriosam hic totam sint, quaerat temporibus suscipit deleniti numquam at voluptates debitis repudiandae ratione. ${i + 1}.`,
        createDate: `2023-09-${(i + 1).toString().padStart(2, '0')}`,
        category: i % 2 === 0 ? "Technology" : "Lifestyle"
    }));

    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
    const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') || '1', 10));

    const itemsPerPage = 9;
    const pageRange = 10;

    const filteredData = data.filter((item) => {
        const isSearchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const isCategoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
        return isSearchMatch && isCategoryMatch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    const updateQueryParams = (newParams: Record<string, string | number | boolean>) => {
        const currentParams = new URLSearchParams(window.location.search);

        for (const key in newParams) {
            currentParams.set(key, String(newParams[key]));
        }

        router.push(`?${currentParams.toString()}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateQueryParams({ page });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        updateQueryParams({ search: query, page: 1 }); // Reset to page 1 on search change
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setSelectedCategory(category);
        updateQueryParams({ category: category, page: 1 }); // Reset to page 1 on category change
    };

    return (<>
        <div className="w-full flex justify-between my-4">
            <Link href={"/blog/new"} className="px-4 py-2 bg-black">New Blog</Link>
            <input
                type="text"
                placeholder="Search blogs..."
                className="p-2 flex-[0.9] bg-black"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <select
                className="p-2 bg-black"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="All">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
        </div>

        <div className="grid grid-cols-3 gap-4 font-[family-name:var(--font-geist-mono)]">
            {currentItems.map((item) => (
                <BlogItem
                    key={item.id}
                    title={item.title}
                    catagory={item.category}
                    description={item.description}
                    date={item.createDate}
                />
            ))}
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

            {[...Array(endPage - startPage + 1).keys()].map((_, index) => {
                const pageNumber = startPage + index;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-accent border' : 'bg-black'} rounded`}
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
    </>
    );
};

export default BlogContent;
