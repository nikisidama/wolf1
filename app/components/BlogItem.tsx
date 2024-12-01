import Image from "next/image";
import Link from "next/link";

type CardProps = {
    title: string;
    description: string;
    catagory?: string;
    image?: string
    date?: string
};

export default function BlogItem({ title, description, catagory, image, date }: CardProps) {
    const imageSrc = image || "/tempBlog.webp";
    const catagoryName = catagory || "Blog";
    return (
        <Link href="\" className="flex flex-col justify-start items-center w-full h-[30rem] shadow-xl overflow-hidden bg-[#151515] relative group">
            <div className="w-full h-2/3 relative">
                <Image src={imageSrc} alt="blog" fill className="object-cover" />
            </div>
            <div className="mx-6 mt-4 w-[90%] flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-[#A0A0A0] font-bold self-start">{catagoryName}</span>
                    <time dateTime={date} className="text-xs text-gray-500">{date ? date : "N/A"}</time>
                </div>
                <div className="text-2xl font-bold group-hover:text-accent duration-500 transition-colors self-start">{title}</div>
                <div className="text-sm line-clamp-2 max-w-0 opacity-0 group-hover:max-w-full group-hover:opacity-100 transition-all duration-400">{description}</div>
            </div>
        </Link>
    )
}