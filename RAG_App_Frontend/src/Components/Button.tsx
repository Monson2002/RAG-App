type ButtonType = {
    btn_text: string,
    color: string,
    bg_color: string,
    bg_hover_color: string,
    border_color: string,
    handleSend: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = ({btn_text, color, bg_color, bg_hover_color, border_color, handleSend}: ButtonType) => {
                                                              
    return (
        <>
            <main className="main-section">
                <button className={`send-btn hover:cursor-pointer lg:px-4 lg:py-2 ${bg_color} ${bg_hover_color} ${color} ${border_color} rounded-lg border-1`}
                onClick={(e) => handleSend(e)}
                >
                    <p>{btn_text}</p>
                </button>
            </main>
        </>
    )   
}

export default Button;