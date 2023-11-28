import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function SendEmail() {

    const [email, setEmail] = useState('');
    const title = "Your verification code is arrived.";
    const emailNum = Math.floor(Math.random() * 1000000);
    const message = emailNum;
    const emailContent = {
        email: email,
        title: title,
        message: message
    };

    const handleEmail = (e) => {
        const currEmail = e.target.value;
        setEmail(currEmail);
    }

    const sendEmail = async (email) => {
        try {
            const response = await axios.post("http://localhost:8001/emailsend/", emailContent);
            console.log(email);
            console.log(response.data);
            
            Swal.fire("메일 전송이 완료되었습니다.");
        } catch (error) {
            console.log(error);
            
            Swal.fire("메일 전송에 실패했습니다. 다시 시도해 주세요.");
        }
    };



    return (
        <div className="container-first">
            <div className="input-group">
                <input className="input" type="email" id="email" name="email" value={email} onChange={handleEmail}></input>
                <button className="button button-primary" onClick={sendEmail}>send</button>
            </div>
        </div>)

}

export default SendEmail;