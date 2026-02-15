"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[150px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value]);

  if (!editor) return null;

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden bg-gray-900">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b border-gray-700 bg-gray-800">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
          Bold
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
          Italic
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}>
          Underline
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}>
          H1
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
          H2
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
          Bullet
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
          Numbered
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          Left
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          Center
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          Right
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="p-4 min-h-[200px]" />
    </div>
  );
}

function ToolbarButton({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-3 py-1 rounded-md text-sm transition ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      {children}
    </button>
  );
}
