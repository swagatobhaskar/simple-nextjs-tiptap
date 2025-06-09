"use client"

import React, { useState } from "react"

import Tiptap from "./Tiptap"

export default function ContentForm() {

    // const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const onchange = (content: string) => {
        // setTitle(e.target.value);
        setContent(content);
        console.log("INSIDE-ONCHANGE: ", content);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Submitted!")
        console.log("With: ", content);
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* <input type="text" id="title" name="title" onChange={(e)=>handleChange(e)} /> */}
            <Tiptap content={content} onchange={onchange} />
            <button type="submit">Submit</button>
        </form>
    );

}