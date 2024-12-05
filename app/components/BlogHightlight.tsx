"use client"

import HighlightCard from "./HighlightCard"
import { useState } from "react"

type DataItem = {
    id: number,
    title: string,
    description: string
};

const BlogHightlight = () => {
    const data: DataItem[] = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        title: `HIGHLIGHT ${i + 1}`,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam natus autem expedita aliquam dolores ad cum laboriosam hic totam sint, quaerat temporibus suscipit deleniti numquam at voluptates debitis repudiandae ratione. ${i + 1}.`,
    }));

    const [currentPage, setCurrentPage] = useState<number>(0);
    const handlePageChange = (index: number) => { setCurrentPage(index) };

    return <div className="flex flex-col justify-center items-center h-full mx-2 font-[family-name:var(--font-geist-mono)] relative">
        <HighlightCard
            title={data[currentPage].title}
            description={data[currentPage].description}
            image=""
        />
        <div className="flex justify-center w-auto gap-10 items-center p-4">
            {data.map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={`w-3 h-3 rounded-full 
                            ${index === currentPage ? "bg-accent" : "bg-foreground hover:bg-gray-500"} 
                            transition-color duration-500 ease-in-out`}
                    aria-label={`Go to card ${index + 1}`}
                />
            ))}
        </div>
    </div>
}

export default BlogHightlight
