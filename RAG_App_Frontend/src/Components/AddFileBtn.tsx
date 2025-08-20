import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

type ButtonType = {
    btn_text: string,
    color: string,
    bg_color: string,
    bg_hover_color: string,
    border_color: string,
    has_upload?: boolean
}

const AddFileBtn = ({btn_text, color, bg_color, bg_hover_color, border_color, has_upload}: ButtonType) => {
    
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append("file", file);
        
        try {
            const res = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });
        
            if (res.ok) {
                console.log("✅ File uploaded successfully");
            } else {
                console.error("❌ Upload failed");
          }
        } catch (err) {
            console.error("🚨 Error uploading file", err);
        }
    };

    return (
        <>
            <main className="main-section">
                <button className={`send-btn hover:cursor-pointer lg:px-4 lg:py-2 ${bg_color} ${bg_hover_color} ${color} ${border_color} rounded-lg border-1`}
                onClick={handleClick}
                >
                    {has_upload && <FontAwesomeIcon icon={faArrowUpFromBracket} />}
                    <p>{btn_text}</p>
                </button>
                <input 
                    type="file" 
                    accept=".pdf, .doc, .docx, .txt"
                    ref={fileInputRef}
                    style={{display:'none'}}    
                    onChange={handleFileChange}
                />
            </main>
        </>
    )   
}

export default AddFileBtn;