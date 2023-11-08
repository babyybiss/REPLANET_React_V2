import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/userexchange.css";
import { useState } from "react";


function PointDetail(){

    const [isOpen, setIsOpen] = useState(true);  

    function getFileExtension(filename){
        return filename.slice(((filename.lastIndexOf(".") -1)>>> 0) +2);
    }

    const fileExtension = getFileExtension(filename);

    const closeModal = (e) => {
        setIsOpen(false);
    }

    return(
        <div className="modal">
            <div className="modal-content" style={{display:isOpen ? "block" : "none"}}>
                <h2>{detail.date}</h2>
                <p>{detail.title}</p>
                {fileExtension === 'pdf'? 
                    (<iframe src={filename} width="400px" height="600px"/>) : 
                    (<img src={filename} style={{width:"400px", height:"600px"}}/>)}
                <button className="modal-btn" onClick={closeModal}>닫기</button>
            </div>
        </div>
    )
}

export default PointDetail;