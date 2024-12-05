import { useSession } from "../context/SessionContext"
import Image from "next/image"
import Link from "next/link"

type CardProps = {
    id: number,
    userid: number,
    title: string,
    description: string,
    author?: string,
    image?: string,
    date?: string,
    deleteItem: (id: number) => void
};

const BlogItem = ({ id, userid, title, description, author, image, date, deleteItem }: CardProps) => {
    const { session } = useSession();
    const imageSrc = image || "/tempBlog.webp";

    return <div className="flex flex-col justify-start items-center w-full h-[30rem] shadow-xl overflow-hidden bg-[#151515] relative group">
        <div className="w-full h-2/3 relative">
            <Image src={imageSrc} alt="blog" fill className="object-cover" />
        </div>
        <div className="mx-6 mt-4 w-[90%] flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <span className="text-sm text-[#A0A0A0] font-bold self-start">{author}</span>
                <time dateTime={date} className="text-xs text-gray-500">{date ? date : "N/A"}</time>
            </div>
            <div className="text-2xl font-bold group-hover:text-accent duration-500 transition-colors self-start">{title}</div>
            <div className="text-sm line-clamp-2 max-w-0 opacity-0 group-hover:max-w-full group-hover:opacity-100 transition-all duration-400">{description}</div>
        </div>
        <Link href={`blog/${id}`} className="absolute top-0 left-0 w-full h-full" />
        {session && (session.id === userid || session.role === "ADMIN") &&
            <div className="absolute top-0 right-0 w-[150px] h-auto bg-background text-foreground opacity-0 group-hover:opacity-100 transition-all duration-500">
                <ul className="flex flex-col p-2">
                    <Link href={`blog/${id}/config`} className="px-4 py-2 hover:text-accent transition-colors cursor-pointer">Edit</Link>
                    <button onClick={() => deleteItem(id)} className="px-4 py-2 text-left hover:text-accent transition-colors cursor-pointer">Delete</button>
                    <Link href={`blog/${id}/report`} className="px-4 py-2 hover:text-accent transition-colors cursor-pointer">Report</Link>
                </ul>
            </div>
        }
    </div>
}

export default BlogItem