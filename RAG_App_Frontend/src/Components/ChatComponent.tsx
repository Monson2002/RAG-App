import { useState } from "react";

import AddFileBtn from "./AddFileBtn";
import Button from "./Button";
import TextBox from "./TextBox";

const ChatComponent = () => {

    const [msg, setMsg] = useState<string>("");
    const [chats, setChats] = useState<Array<{query: string, results: any[]}>>([])
    
    const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value);
    }    

    const handleSend = async () => {
        if (!msg.trim()) {
            return
        }
        try {
            const response = await fetch('http://127.0.0.1:5000/api/search/',
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
            console.log(`Backend response`, data);
            setChats((prev) => [
                ...prev,
                {
                    'query': data.query,
                    'results': data.results['documents'][0]
                }
            ])
            setMsg("")
        } catch (error) {
            console.log(`Error ${error}`);
        }
    }

    return (
        <>
            <main className="main-section lg:m-2 bg-white lg:w-4/5 lg:h-4/5 flex flex-col justify-center items-center lg:rounded-2xl">
                <section className="top-section lg:border-b-4 border-slate-200 w-full lg:h-1/5 flex justify-center items-center font-roboto">
                    <h1 className="text lg:text-2xl">DAU RAG</h1>
                </section>
                <section className="middle-section w-screen lg:h-3/5 flex justify-center items-center">
                    {chats.length == 0 ? (
                            <h4 className="text lg:text-lg text-slate-400 lg:font-light">
                                Start a conversation or upload a document!
                            </h4>
                        ) : (                     
                            chats.map((chat, idx) => {
                                return (
                                    <div key={idx} className="mb-4">
                                        <p className="font-bold text-black">You: {chat.query}</p>
                                        <ul className="ml-4 list-disc text-slate-600">
                                            {chat.results.map((res, i) => (
                                                <li key={i}>{res}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            })
                        )
                    }
                    
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