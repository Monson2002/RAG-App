import ChatComponent from "../Components/ChatComponent";

const ChatPage = () => {
    return (
        <>
            <main className="main-section ">
                <section className="lg:p-2 bg-slate-200 lg:h-screen lg:w-screen flex justify-center items-center">
                    <ChatComponent/>
                </section>
            </main>
        </>
    )
}

export default ChatPage;