import React, { useContext, useState } from 'react'
import { assets } from "@/assets/assets";
import Image from 'next/image';
import { Context } from '@/context/context';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Response = () => {
    const {
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        onSent
    } = useContext(Context);
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault();
            setInput((prev) => prev + "\n")
        }
        if (event.key === 'Enter' && !event.shiftKey) {
            onSent();
        }
    }
    const renderers = {
        code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline ? (
                <SyntaxHighlighter style={dracula} language={match ? match[1] : "javascript"}>
                    {String(children).trim()}
                </SyntaxHighlighter>
            ) : (
                <code className="bg-gray-200 px-1 py-0.5 rounded-md">{children}</code>
            );
        },
    };
    return (
        <div className="p-10 bg-blue-100 max-w-[80vw] w-full">
            <div className='flex justify-center items-center flex-col'>
                {!showResult ? (
                    <>
                        <div className="my-[50px] text-[56px] text-[#c4c7c5] font-medium p-5">
                            <p>
                                <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">Hello, Dev</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5">
                        </div>
                    </>
                ) : (

                    <div className="overflow-y-auto w-full max-h-[80vh] scrollbar-hide">
                        <div className="my-[40px] flex items-center gap-5">
                            <Image src={assets.user_icon} alt="" className="w-10 rounded-full" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="flex items-start gap-5 h-[70vh]">
                            <Image src={assets.gemini_icon} alt="" className="w-10 rounded-full" />
                            {loading ? (
                                <div className="w-full flex flex-col gap-2.5">

                                </div>
                            ) : (
                                <ReactMarkdown components={renderers} className="text-[17px] font-light leading-[1.8]">
                                    {resultData}
                                </ReactMarkdown>
                            )}
                        </div>
                    </div>
                )}
                <div className=" p-5 absolute bottom-0 w-[60vw]">
                    <div
                        className={`flex items-center justify-between gap-5 bg-blue-100 p-3 
                transition-all duration-200 outline
                ${input.length > 40 ? "rounded-xl" : "rounded-l"}`} // Adjust border based on text length
                    >
                        <div></div>
                        <textarea
                            onChange={(e) => {
                                setInput(e.target.value);
                                e.target.style.height = "auto"; // Reset height
                                e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    onSent();
                                }
                            }}
                            value={input}
                            placeholder="Enter a prompt here..."
                            className="flex-1 bg-transparent border-none outline-none p-2 text-[18px] text-black placeholder:text-grey
                 resize-none overflow-hidden min-h-[40px] max-h-[200px]"
                        />
                        <div className="flex items-center gap-3.5">
                            <Image src={assets.gallery_icon} alt="" className="w-6 cursor-pointer" />
                            <Image src={assets.mic_icon} alt="" className="w-6 cursor-pointer" />
                            {input && <Image src={assets.send_icon} onClick={() => onSent()} alt="" className="w-6 cursor-pointer" />}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Response