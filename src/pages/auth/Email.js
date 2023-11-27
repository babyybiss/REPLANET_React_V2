import axios from "axios";
import { useState, useCallback } from "react";

function Email() {

    const [email, setEmail] = useState('');
    const emailnum = Math.floor(Math.random()*1000000);


    const handleEmail = useCallback(async (e) => {
        const currEmail = e.target.value;
        setEmail(currEmail);
      });

    //   axios({
    //     url: "http://localhost:8001/mailCerti",
    //     type: "post",
    //     data: {
    //         email: email,
    //         title: "Deli email confirm",
    //         message: "<h1>"+emailnum+"</h1>"
    //     }
    // });
    return(
    <div className="container-first">
    <input type="text" id="email" name="email" value={email} onChange={handleEmail}></input>
    </div>)
}

export default Email;