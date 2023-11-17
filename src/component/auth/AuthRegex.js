import { useRef, useState } from "react";

const UseRefEx = () => {
    // 포커스를 주기 위한 useRef
    const inputRef = useRef([]); // ref 배열형태로 저장해서 여러 값을 인덱스로 컨트롤 가능

    // input value state 관리
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        memberName: "",
        phone: ""
    });
    const { email, password, memberName, phone } = inputs; // 구조분해할당

    //유효한 id, password, email 조건 변수에 담아 사용
    const regEmail = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]/; // email 형식 정규표현식
    const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const regMemberName = /^[ㄱ-ㅎ|가-힣]+$/;
    const regPhone = /^[0-9]{0,13}$/;
    const vaildEmail = email.match(regEmail);
    const vaildPassword = email.match(regPassword);
    const validMemberName = email.match(regMemberName);
    const validPhone = email.match(regPhone);

    // onChange 함수로 state 값 바꿔주기
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    // 클릭이벤트 : 유효성에 맞는 이벤트 이루어지도록
    const handleClick = () => {
        if (!vaildEmail) {
            alert("유효하지 않은 email 입니다.");
            inputRef.current[1].focus();
            setInputs({
                ...inputs,
                email: "",
            });
        }
        else if (!vaildPassword) {
            alert("유효하지 않은 password 입니다.");
            inputRef.current[2].focus();
            setInputs({
                ...inputs,
                password: "",
            });
        }
        else if (!validMemberName) {
            alert("유효하지 않은 이름 입니다.");
            inputRef.current[3].focus();
            setInputs({
                ...inputs,
                memberName: "",
            });
        }

        else if (!validPhone) {
            alert("유효하지 않은 전화번호 입니다.");
            inputRef.current[4].focus();
            setInputs({
                ...inputs,
                phone: "",
            });
        }

        else {
            return alert("회원가입 성공!");
        }
    }
}
export default AuthRegex;