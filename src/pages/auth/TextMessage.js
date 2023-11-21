import React from 'react';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function TextMessage() {
    let input = <input/>;
    const changeData = {changeData};
    const phone = useRef(null);
    const u_phone = phone.current.value;
    const sendSMS = () => {

        let url = localStorage.url + "/users/sms?u_phone=" + input.u_phone;
        axios.get(url)
            .then(res => {
                input.randomNum = res.data;
            })
    }
    
    const checkSMS = () => {
        if (input.randomNum == input.checkSMS) {
            Swal.fire("휴대폰 인증이 정상적으로 완료되었습니다.");
        } else {
            Swal.fire("인증번호가 올바르지 않습니다.")
        }
    }

    return (
        <tr>
    <th style={{width:'130px',backgroundColor:'#ddd'}}>인증번호</th>
    <td>
        <input type="text" className='input' name={"checkSMS"} onChange={changeData}/>
    </td>
    <button className="button button-primary" onClick={() => {
                checkSMS();
            }}>
        인증번호 확인
    </button>
</tr>
    )

}



export default TextMessage;
