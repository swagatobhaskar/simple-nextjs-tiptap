'use client'

import { useCallback } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBold, faItalic, faQuoteLeft, faUnderline, faStrikethrough,
    faImage, faHighlighter, faQuoteRightAlt, faCode, faList, faListNumeric,
    faLink, faLinkSlash, faBarsStaggered
} from '@fortawesome/free-solid-svg-icons'

import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

const Tiptap = ({content, onchange}) => {
    const editor = useEditor({
        immediatelyRender: false,
        autofocus: true,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                bulletList:{
                    itemTypeName: 'listItem',
                    keepMarks: true,
                    HTMLAttributes: {
                        class: 'list-disc ml-3 p-2'
                    },
                },
                orderedList:{
                    HTMLAttributes: {
                        class: 'list-decimal ml-3 p-2'
                    }
                },
                strike: {
                    HTMLAttributes: {
                        class: 'decoration-2'
                    },
                },
                code: {
                    HTMLAttributes: {
                        class: 'bg-gray-300 text-white border-md p-2'
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: 'border-l-2 border-gray-300 ml-2 pl-2'
                    }
                },
                horizontalRule: {
                    HTMLAttributes: {
                        class: 'my-4 cursor-pointer border-t-1 border-gray-600'
                    },
                },
            }),
            // Document,
            // Paragraph,
            // Text,
            // HardBreak,
            Image.configure({
                HTMLAttributes: {
                    class: 'block h-auto my-5 w-full'
                },
            }),
            Underline.configure({
                HTMLAttributes: {
                    class: 'underline underline-offset-4 decoration-2 decoration-indigo-500'
                },
            }),
            Highlight.configure({
                HTMLAttributes: {
                    multicolor: false,
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
        editorProps: {
            attributes: {
                class: 'rounded-md p-3 h-full w-full overflow-auto outline outline-gray-400'
            }
        },
        content: content,
        // content: '  \
        //     <p>Hello, World...</p>  \
        //     <p>Lorem Ipsum Dolor ...</p>    \
        //     ',

        onUpdate: ({editor}) => {
            // console.log(editor.getHTML())
            onchange(editor.getHTML());
        }
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

    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({src: url}).run()
        }
    }, [editor])

    if (!editor) return null

    return (
        <div className='w-full flex justify-center'>
            <div className="flex flex-col w-3/4 h-full">
                <div className='my-3 p-1 grid grid-rows-2 grid-cols-12 outline-2 outline-gray-400 rounded-md'>
                    {/* Bold */}
                    <button
                        className={editor.isActive('bold')? 'bg-gray-300' : 'py-1 px-2 hover:shadow hover:cursor-pointer focus:shadow-md'}
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
                        <FontAwesomeIcon icon={faStrikethrough} />
                    </button>
                    {/* <button
                        className='bg-white py-1 px-2 hover:shadow hover:cursor-pointer'
                        onClick={() => editor.chain().focus().setStrike().run()}
                        disabled={editor.isActive('strike')}
                    >
                        Set Strike
                    </button>
                    <button
                        onClick={() => editor.chain().focus().unsetStrike().run()}
                        disabled={!editor.isActive('strike')}
                    >
                        Unset strike
                    </button> */}
                    {/* Code */}
                    <button
                        title="single line code"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={editor.isActive('code') ? 'is-active' : ''}
                    >
                        <FontAwesomeIcon icon={faCode} />
                    </button>
                    {/* <button
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
                    </button> */}
                    {/* Highlight */}
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={editor.isActive('highlight') ? 'bg-gray-100' : ''}
                    >
                        <FontAwesomeIcon icon={faHighlighter} />
                    </button>
                    {/* <button
                        onClick={() => editor.chain().focus().unsetHighlight().run()}
                        disabled={!editor.isActive('highlight')}
                    >
                        Unset highlight
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
                    </button> */}
                    {/* Link */}
                    {/* <button
                        title='Add Link'
                        onClick={setLink}
                        className={editor.isActive('link') ? 'is-active' : ''}
                    >
                        Set link
                        <FontAwesomeIcon icon={faLink} />
                    </button>
                    <button
                        title="Remove Link"
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive('link')}
                    >
                        Unset link
                        <FontAwesomeIcon icon={faLinkSlash} />
                    </button> */}
                    <button
                        title='Add/Remove Link'
                        onClick={() => {
                        if (!editor.isActive('link')) {setLink();}
                        else {
                            editor.chain().focus().unsetLink().run();;
                        }
                        }}
                    >
                        {
                            !editor.isActive('link') ?
                                <FontAwesomeIcon icon={faLink} />
                                :
                                <FontAwesomeIcon icon={faLinkSlash} />
                        }
                    </button>
                    {/* Blockquote */}
                    {/* <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'is-active' : ''}
                    >
                        Toggle blockquote
                    </button> */}
                    <button
                        onClick={() => {
                            if (editor.isActive('blockquote')) {
                                editor.chain().focus().unsetBlockquote().run();
                            } else {
                                editor.chain().focus().setBlockquote().run();
                            }
                        }}
                        disabled={!editor.can().setBlockquote() && !editor.can().unsetBlockquote()}
                    >
                        {/* Set blockquote */}
                        <svg
                            className={`${editor.isActive('blockquote') ? 'bg-gray-400' : 'bg-white'} transition-colors duration-300`}
                            width="32px" height="32px" style={{ margin: 'auto', display: 'block' }}
                            viewBox="0 0 25.00 25.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                            strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.05"></g><g id="SVGRepo_iconCarrier">
                                <path d="M10 17.5H19M6 7.5H19M10 12.5H17M6.5 12V18" stroke="#121923" strokeWidth="1.75"></path>
                            </g>
                        </svg>
                    </button>
                    {/* <button
                        onClick={() => editor.chain().focus().unsetBlockquote().run()}
                        disabled={!editor.can().unsetBlockquote()}
                    >
                        <FontAwesomeIcon icon={faQuoteRightAlt} />
                        Unset blockquote
                    </button> */}
                    {/* BulletList/OrderedList */}
                    <button
                        title='Toggle bullet list'
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        {/* Toggle bullet list */}
                        <FontAwesomeIcon icon={faList} />
                    </button>
                    <button
                        title='Toggle ordered list'
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        {/* Toggle ordered list */}
                        <FontAwesomeIcon icon={faListNumeric} />
                    </button>
                    {/* <button
                        title='Split list item'
                        onClick={() => editor.chain().focus().splitListItem('listItem').run()}
                        disabled={!editor.can().splitListItem('listItem')}
                    >
                        Split list item can be alternately used by enter key
                    </button> */}
                    <button
                        title='Sink list item'
                        onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                        disabled={!editor.can().sinkListItem('listItem')}
                    >
                        {/* Sink list item */}
                        <svg style={{ display:'block', margin:'auto' }} fill="#000000" width="24px" height="24px" viewBox="0 0 56.00 56.00" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)" stroke="#000000" strokeWidth="0.00056">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.44800000000000006"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M 2.8067 17.5443 C 4.3659 17.5443 5.6134 16.2969 5.6134 14.7599 C 5.6134 13.2007 4.3659 11.9532 2.8067 11.9532 C 1.2697 11.9532 0 13.2007 0 14.7599 C 0 16.2969 1.2697 17.5443 2.8067 17.5443 Z M 12.6523 16.5420 L 43.0805 16.5420 C 44.1051 16.5420 44.8847 15.7623 44.8847 14.7599 C 44.8847 13.7352 44.1051 12.9557 43.0805 12.9557 L 12.6523 12.9557 C 11.6500 12.9557 10.8703 13.7352 10.8703 14.7599 C 10.8703 15.7623 11.6500 16.5420 12.6523 16.5420 Z M 8.3755 31.0209 C 9.9348 31.0209 11.1822 29.7735 11.1822 28.2142 C 11.1822 26.6549 9.9348 25.4075 8.3755 25.4075 C 6.8162 25.4075 5.5688 26.6549 5.5688 28.2142 C 5.5688 29.7735 6.8162 31.0209 8.3755 31.0209 Z M 18.2212 30.0185 L 48.6493 30.0185 C 49.6516 30.0185 50.4535 29.2166 50.4535 28.2142 C 50.4535 27.2118 49.6516 26.4322 48.6493 26.4322 L 18.2212 26.4322 C 17.1965 26.4322 16.4169 27.2118 16.4169 28.2142 C 16.4169 29.2166 17.1965 30.0185 18.2212 30.0185 Z M 13.9443 44.4974 C 15.4813 44.4974 16.7510 43.2277 16.7510 41.6907 C 16.7510 40.1315 15.4813 38.8841 13.9443 38.8841 C 12.3850 38.8841 11.1376 40.1315 11.1376 41.6907 C 11.1376 43.2277 12.3850 44.4974 13.9443 44.4974 Z M 23.7900 43.4728 L 54.2181 43.4728 C 55.2204 43.4728 56 42.6931 56 41.6907 C 56 40.6661 55.2204 39.8864 54.2181 39.8864 L 23.7900 39.8864 C 22.7653 39.8864 21.9857 40.6661 21.9857 41.6907 C 21.9857 42.6931 22.7653 43.4728 23.7900 43.4728 Z"></path>
                            </g>
                        </svg>
                    </button>
                    <button
                        title='Lift list item'
                        onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                        disabled={!editor.can().liftListItem('listItem')}
                    >
                        {/* Lift list item */}
                        <FontAwesomeIcon icon={faBarsStaggered} />
                    </button>
                    {/* Heading */}
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button> 
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-50' : ''}
                    >
                        H3
                    </button>
                    {/* HardBreak */}
                    <button
                        title="Line Break"
                        onClick={() => editor.chain().focus().setHardBreak().run()}
                    >
                        {/* Set hard break */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{margin: 'auto', display: 'block'}} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
                        </svg>
                    </button>
                    {/* HorizontalRule */}
                    <button
                        title="Horizontal line"
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        {/* Set horizontal rule */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{margin: 'auto', display: 'block'}} width="32px" height="32px" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                    </button>
                    {/* Image */}
                    <button onClick={addImage}>
                        <FontAwesomeIcon icon={faImage} />
                    </button>
                </div>
            
                <div className='flex-1 overflow-auto'>
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}

export default Tiptap
