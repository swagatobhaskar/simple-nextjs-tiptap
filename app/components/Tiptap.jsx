'use client'

import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Blockquote from '@tiptap/extension-blockquote'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

const Tiptap = () => {
    const editor = useEditor({
        immediatelyRender: false,
        autofocus: true,
        extensions: [StarterKit.configure({
            heading: {
                levels: [1, 2],
            },
        }),
        Blockquote.configure({
            HTMLAttributes: {
                class: 'border-l-3 border-gray-300 ml-2 pl-2'
            },
        }),
        ],
        content: '  \
            <p>Hello, World...🌎️</p>  \
            <p>Lorem Ipsum Dolor ...</p>    \
            '
    })
    
    if (!editor) return null

    return (
        <div>
            <div>
                {/* Marks */}
                {/* Bold */}
                <button
                    onClick={()=>editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                >
                    <FontAwesomeIcon icon={faBold} />
                </button>
                 {/* Italic */}
                <button
                    onClick={()=>editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                >
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                {/* Underline */}
                <button
                    onClick={()=>editor.chain().focus().toggleUnde().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                >
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                {/* Blockquote */}
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    Toggle blockquote
                </button>
                <button
                    onClick={() => editor.chain().focus().setBlockquote().run()}
                    disabled={!editor.can().setBlockquote()}
                >
                    <FontAwesomeIcon icon={faQuoteLeft} />
                    {/* Set blockquote */}
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetBlockquote().run()}
                    disabled={!editor.can().unsetBlockquote()}
                >
                    Unset blockquote
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}

export default Tiptap
