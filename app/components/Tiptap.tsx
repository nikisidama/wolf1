"use client"

import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdHighlight, MdInsertPhoto, } from "react-icons/md"
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa"
import { useEditor, EditorContent } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import TextStyle from "@tiptap/extension-text-style"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"
import TextColor from "@tiptap/extension-color"
import { Button } from "@/components/ui/button"
import { useCallback, useState } from "react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import axios from "axios"

type TiptapEditorProps = {
    title: string,
    content: string,
    onUpdate: (content: string) => void
};

const Tiptap: React.FC<TiptapEditorProps> = ({ title, content, onUpdate }) => {
    const [userMessage, setUserMessage] = useState(content);
    const [color, setColor] = useState<string>("#000000");
    const [loading, setLoading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Link.configure({ openOnClick: true }),
            Image,
            Highlight.configure({ multicolor: true }),
            Placeholder.configure({ placeholder: "Start typing..." }),
            TextStyle,
            TextColor.configure({ types: ["textStyle"] })
        ],
        content,
        onUpdate: ({ editor }) => onUpdate(editor.getHTML())
    });

    const handleAI = async () => {
        if (!title) return;
        setLoading(true);
        try {
            console.log("userMessage: ", title);
            const response = await axios.post(
                "/api/hyperbolic",
                { userMessage: `Generate a content in HTML for the title "${title}". Use only the following tags: <p> for paragraphs (use style="text-align: " for alignment), <span style="color: rgb( )"> for text color, <strong> for bold text, <em> for italic text, <u> for underlined text, <mark> for highlighted text, and <img src=" "> for images. The content should include an introduction, two subheadings, and a conclusion. Use <p> for all paragraphs and align them with style="text-align: " where necessary. Return only the raw HTML in one line, no additional formatting.` },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const data = response.data;
            if (editor) editor.commands.insertContent(`<div>${data.output}</div>`);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            console.error(error)
        }
    };

    const addImage = useCallback(() => {
        const url = prompt("Enter image URL");
        if (url) editor?.chain().focus().setImage({ src: url }).run();
    }, [editor]);

    const changeTextColor = useCallback((color: string) => { editor?.chain().focus().setColor(color).run() }, [editor]);

    if (!editor) return <div className="text-center p-4">Loading editor...</div>;

    return <div className="border rounded-lg shadow-sm">
        <div className="flex gap-3 p-4 items-center justify-center">
            <Button
                type="button"
                variant={"outline"}
                onClick={() => editor.chain().focus().toggleBold().run()}
                aria-label="Bold"
                className={editor.isActive("bold") ? "bg-accent" : ''}
            >
                <MdFormatBold />
            </Button>
            <Button
                type="button"
                variant={"outline"}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Italic"
                className={editor.isActive("italic") ? "bg-accent" : ''}
            >
                <MdFormatItalic />
            </Button>
            <Button
                type="button"
                variant={"outline"}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                aria-label="Underline"
                className={editor.isActive("underline") ? "bg-accent" : ''}
            >
                <MdFormatUnderlined />
            </Button>
            <Button
                type="button"
                variant={"outline"}
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                aria-label="Highlight"
                className={editor.isActive("highlight") ? "bg-accent" : ''}
            >
                <MdHighlight />
            </Button>
            <Button
                type="button"
                variant={"outline"}
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                aria-label="Align Left"
            >
                <FaAlignLeft />
            </Button>
            <Button
                type="button"
                variant={"outline"}
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                aria-label="Align Center"
            >
                <FaAlignCenter />
            </Button>
            <Button
                type="button"
                variant={"outline"}
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                aria-label="Align Right"
            >
                <FaAlignRight />
            </Button>
            <Button
                type="button"
                variant={"outline"}
                onClick={addImage}
                aria-label="Insert Image"
            >
                <MdInsertPhoto />
            </Button>
            <Button
                type="button"
                variant={"outline"}
                onClick={handleAI}
                aria-label="Generate from title with hyperbolic"
                disabled={loading || !userMessage}
            >
                <p className="animate-rainbow">{loading ? "Loading..." : "AI"}</p>
            </Button>

            <div className="relative w-[7em] h-10 rounded-md">
                <input
                    type="color"
                    value={color}
                    onChange={(e) => { setColor(e.target.value); changeTextColor(e.target.value) }}
                    className="w-full h-full p-0 border-none outline-none appearance-none cursor-pointer"
                    aria-label="Text Color"
                />
            </div>
        </div>
        <hr className="bg-accent h-px border-0" />
        <EditorContent
            editor={editor}
            onChange={(e) => setUserMessage((e.target as HTMLInputElement).value)}
            placeholder="Start typing..."
            className="prose w-full min-h-full h-full p-4"
        />
    </div>
}

export default Tiptap
