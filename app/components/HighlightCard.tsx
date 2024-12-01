import Image from "next/image";
import Link from "next/link";

type CardProps = {
    title: string;
    description: string;
    image?: string;
};

export default function HighlightCard({ title, description, image }: CardProps) {
    const imageSrc = image || "/tempBlog.webp";
    return (
        <Link href="\" className="flex flex-col w-full h-full shadow-xl overflow-hidden relative group">
            <div className="w-full h-full -z-10 relative">
                <Image src="/tempBlog.webp" alt="blog" fill className="object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 flex flex-col justify-center items-start bg-gradient-to-t from-black via-black/50 to-transparent p-6 pb-8 group-hover:py-24 duration-100 transition-all">
                <div className="text-4xl font-bold w-fit group-hover:text-accent duration-500 transition-colors">{title}</div>
                <div className="text-lg tx max-w-[50%] line-clamp-1 group-hover:line-clamp-none group-hover:max-w-full ">{description}</div>
            </div>
        </Link>
    )
}