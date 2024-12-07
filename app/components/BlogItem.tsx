import { useSession } from "../context/SessionContext"
import Image from "next/image"
import Link from "next/link"
import BlogMenu from "./BlogMenu";

type CardProps = {
    id: string,
    userid: number,
    title: string,
    description: string,
    author?: string,
    image?: string,
    date?: string,
    className?: string,
    deleteItem: (id: number) => void
};

const BlogItem = ({ id, userid, title, description, author, image, date, className, deleteItem }: CardProps) => {
    const { session } = useSession();

    return <div className={`flex flex-col justify-start items-center w-full h-[30rem] shadow-xl bg-white/5 overflow-hidden relative group transition-opacity ${className}`}>
        <div className="w-full h-2/3 relative">
            <Image src={image || "/tempBlog.webp"} alt="blog" fill className="object-cover" />
        </div>
        <div className="mx-6 mt-4 w-[90%] flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <span className="text-sm opacity-50 font-bold self-start">{author}</span>
                <time dateTime={date} className="text-xs opacity-50">{date ? date : "N/A"}</time>
            </div>
            <div className="text-2xl font-bold group-hover:text-accent duration-500 transition-colors self-start">{title}</div>
            <div
                className="prose text-sm line-clamp-2 max-w-0 opacity-0 group-hover:max-w-full group-hover:opacity-100 transition-all duration-400"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
        <Link href={`blog/${id}`} className="absolute top-0 left-0 w-full h-full" />
        <div className="absolute top-4 right-4 z-10">
        {session && (session.id === userid || session.role === "ADMIN") ?
            <BlogMenu id={id} yes={true} page={false} deleteItem={() => deleteItem(parseInt(id))} /> :
            <BlogMenu id={id} yes={false} page={false} deleteItem={() => {}} />
        }
        </div>
    </div>
}

export default BlogItem