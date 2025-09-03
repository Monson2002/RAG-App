import { useState, useEffect, useRef } from "react";

import AddFileBtn from "./AddFileBtn";
import Button from "./Button";
import TextBox from "./TextBox";

const ChatComponent = () => {

    const [msg, setMsg] = useState<string>("");
    const [chats, setChats] = useState<Array<{query: string, answer: string}>>([])
    
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value);
    }    

    const handleSend = async () => {
        if (!msg.trim()) {
            return
        }
        const currentQuery = msg;
        setMsg("")
        setChats((prev) => [
            ...prev,
            { query: currentQuery, answer: "..." }  // show loading dots until answer comes
        ]);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/ask/',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(({
                        query: msg,
                        n_results: 5
                    }))
                }
            )
            
            const data = await response.json()
            setChats((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    query: currentQuery,
                    answer: data.answer,
                };
                return updated;
            });
            // setMsg("")
        } catch (error) {
            console.log(`Error ${error}`);
        }
    }

    return (
        <>
            <main className="main-section lg:m-2 bg-white lg:w-4/5 lg:h-4/5 flex flex-col justify-center items-center lg:rounded-2xl">
                <section className="top-section lg:border-b-4 border-slate-200 w-full lg:h-1/5 flex justify-center items-center font-roboto">
                    <h1 className="text lg:text-2xl">RAG</h1>
                </section>
                {/* <section className="middle-section lg:h-3/5 lg:w-full flex flex-col justify-center items-center overflow-scroll overflow-x-hidden">
                    {chats.length == 0 ? (
                            <h4 className="text lg:text-lg text-slate-400 lg:font-light">
                                Start a conversation or upload a document!
                            </h4>
                        ) : (                     
                            chats.map((chat, idx) => {
                                return (
                                    <div key={idx} className="mb-4 h-full bg-yellow-50 grid grid-rows-2">
                                        <p className="text-black">{chat.query}</p>
                                        
                                        <p className="ml-4 list-disc w-1/2 text-slate-600 flex justify-start items-start">
                                            <h4 className="text lg:text-sm text-black lg:font-light">
                                                {chat.answer}
                                            </h4>
                                        </p>
                                    </div>
                                )
                            })
                        )
                    }
                    
                </section> */}
                <section className="middle-section lg:h-3/5 w-full flex flex-col p-4 overflow-y-auto space-y-4 bg-slate-50">
                {chats.length === 0 ? (
                    <h4 className="text-lg text-slate-400 font-light text-center flex justify-center items-center h-screen">
                        Start a conversation or upload a document!
                    </h4>
                    ) : (
                        chats.map((chat, idx) => (
                            <div key={idx} className="w-full flex flex-col space-y-2">
                            {/* User Query */}
                                <div className="flex justify-end">
                                <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-none shadow-md max-w-[70%]">
                                    {chat.query}
                                </div>
                            </div>

                            {/* Bot Answer */}
                            <div className="flex justify-start">
                                <div className="bg-gray-200 text-black px-4 py-2 rounded-2xl rounded-bl-none shadow-md max-w-[70%] text-justify">
                                    {chat.answer}
                                </div>
                            </div>
                            </div>
                        ))
                    )}
                    <div ref={chatEndRef}/>
                </section>

                <section className="bottom-section lg:border-t-4 border-slate-200 w-full lg:h-1/5 grid grid-cols-[1fr_4fr_1fr] items-center justify-center">
                    <AddFileBtn btn_text="Add file" color="text-black" bg_color='bg-slate-100'   bg_hover_color='hover:bg-slate-200' border_color='border-slate-200' has_upload={true}/>
                    <TextBox msg={msg} handleMsgChange={(e) => handleMsgChange(e)}/>
                    <Button btn_text='Send' color='text-white' bg_color='bg-black' bg_hover_color='hover:bg-gray-800' border_color='border-slate-200' handleSend={handleSend}/>
                </section>
            </main>
        </>
    )
}

export default ChatComponent;