"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { MdEdit, MdDelete } from "react-icons/md"
import { FaEllipsisH, FaFlag } from "react-icons/fa"
import Link from "next/link"

interface BlogMenuProps {
    id: string,
    yes: boolean,
    page: boolean,
    deleteItem: (id: string) => void
}

const BlogMenu = ({ id, yes, page, deleteItem }: BlogMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center p-2 rounded-md hover:bg-accent transition-colors">
                    <FaEllipsisH/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-lg rounded-lg w-40 p-2">
                {yes && <>
                    <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-accent hover:text-foreground transition-colors cursor-pointer">
                        <MdEdit className="mr-2" />
                        <Link href={`${!page ? "blog/" : ''}${id}/config`} className="w-full">
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-accent hover:text-foreground transition-colors cursor-pointer">
                        <MdDelete className="mr-2" />
                        <button onClick={() => deleteItem(id)} className="w-full text-left">
                            Delete
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </>}
                <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-accent hover:text-foreground transition-colors cursor-pointer">
                    <FaFlag className="mr-2" />
                    <Link href={`${!page ? "blog/" : ''}${id}/report`} className="w-full">
                        Report
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default BlogMenu
