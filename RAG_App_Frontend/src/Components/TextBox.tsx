type TextBoxProps = {
    msg: string;
    handleMsgChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextBox = ({msg, handleMsgChange}: TextBoxProps) => {

    return (
        <>
            <main className="main-section">
                <form action="" method="post">
                    <textarea 
                    name="text-box" 
                    id="text-box"
                    placeholder="Ask your queries..."
                    className="w-full lg:h-3vh p-2 lg:rounded-lg border-slate-100 shadow no-scrollbar resize-none placeholder:text-md placeholder:text-slate-700 placeholder:font-thin"
                    onChange={(e) => handleMsgChange(e)}
                    value={msg}
                    >
                        
                    </textarea>
                </form>
            </main>
        </>
    )   
}

export default TextBox;