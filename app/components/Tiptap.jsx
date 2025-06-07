'use client'

import { useCallback } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBold, faItalic, faQuoteLeft, faUnderline, faStrikethrough
    } from '@fortawesome/free-solid-svg-icons'

import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Blockquote from '@tiptap/extension-blockquote'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'


const Tiptap = () => {
    const editor = useEditor({
        immediatelyRender: false,
        autofocus: true,
        extensions: [
            StarterKit.configure({
            heading: {
                levels: [1, 2],
            },
            }),
            Blockquote.configure({
                HTMLAttributes: {
                    class: 'border-l-3 border-gray-300 ml-2 pl-2'
                },
            }),
            // Underline,
            Underline.configure({
                HTMLAttributes: {
                    class: 'underline underline-offset-4 decoration-2 decoration-indigo-500'
                },
            }),
            Strike,
            Code.configure({
                HTMLAttributes: {
                    class: 'slate-700 border-md py-3 px-1'  // Not Working!
                },
            }),
            Highlight.configure({
                HTMLAttributes: {
                    multicolor: true,
                    class: 'rounded p-0.5'
                },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                HTMLAttributes: {
                    // Allow search engines to follow links(remove nofollow)
                    rel: 'noopener noreferrer',
                    target: '_blank',
                    class: 'cursor-pointer text-purple-600 hover:text-purple-800'
                },
                isAllowedUri: (url, ctx) => ctx.defaultValidate(url) && !url.startsWith('./'),
                shouldAutoLink: (url) => url.startsWith('https://'),
            }),
        ],
        content: '  \
            <p>Hello, World...🌎️</p>  \
            <p>Lorem Ipsum Dolor ...</p>    \
            '
    })
    
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        // update link
        try {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        } catch (e) {
            alert(e.message)
        }
    }, [editor])

    if (!editor) return null

    return (
        <div className='mx-auto w-3/4'>
            <div className='my-4 p-2 flex flex-row space-x-1.5'>
                {/* Bold */}
                <button
                    className='py-1 px-2 hover:shadow hover:cursor-pointer focus:shadow-md'
                    onClick={()=>editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                >
                    <FontAwesomeIcon icon={faBold} />
                </button>
                 {/* Italic */}
                <button
                    className='bg-white py-1 px-2 hover:shadow hover:cursor-pointer'
                    onClick={()=>editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                >
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                {/* Underline */}
                <button
                    className='bg-white py-1 px-2 hover:shadow hover:cursor-pointer'
                    onClick={()=>editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                >
                    <FontAwesomeIcon icon={faUnderline} />
                </button>
                {/* Strike */}
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    Toggle strike
                </button>
                <button
                    className='bg-white py-1 px-2 hover:shadow hover:cursor-pointer'
                    onClick={() => editor.chain().focus().setStrike().run()}
                    disabled={editor.isActive('strike')}
                >
                    <FontAwesomeIcon icon={faStrikethrough} />
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetStrike().run()}
                    disabled={!editor.isActive('strike')}
                >
                    Unset strike
                </button>
                {/* Code */}
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    Toggle code
                </button>
                <button
                    onClick={() => editor.chain().focus().setCode().run()}
                    disabled={editor.isActive('code')}
                >
                    Set code
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetCode().run()}
                    disabled={!editor.isActive('code')}
                >
                    Unset code
                </button>
                {/* Highlight */}
                <button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={editor.isActive('highlight') ? 'is-active' : ''}
                >
                    Toggle highlight
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
                    className={editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''}
                >
                    Orange
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()}
                    className={editor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''}
                >
                    Green
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()}
                    className={editor.isActive('highlight', { color: '#74c0fc' }) ? 'is-active' : ''}
                >
                    Blue
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()}
                    className={editor.isActive('highlight', { color: '#b197fc' }) ? 'is-active' : ''}
                >
                    Purple
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: 'red' }).run()}
                    className={editor.isActive('highlight', { color: 'red' }) ? 'is-active' : ''}
                >
                    Red ('red')
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()}
                    className={editor.isActive('highlight', { color: '#ffa8a8' }) ? 'is-active' : ''}
                >
                    Red (#ffa8a8)
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetHighlight().run()}
                    disabled={!editor.isActive('highlight')}
                >
                    Unset highlight
                </button>
                {/* Link */}
                <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                    Set link
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive('link')}
                >
                    Unset link
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
