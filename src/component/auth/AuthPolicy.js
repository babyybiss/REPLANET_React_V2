import { useState, useEffect } from "react";

function AuthPolicy() {

    const [allCheck, setAllCheck] = useState(false);
    const [privacyCheck, setPrivacyCheck] = useState(false);
    const [useCheck, setUseCheck] = useState(false);

    const allBtnEvent = () => {
        if (allCheck === false) {
            setAllCheck(true);
            setPrivacyCheck(true);
            setUseCheck(true);

        } else {
            setAllCheck(false);
            setPrivacyCheck(false);
            setUseCheck(false);

        }
    };

    const ageBtnEvent = () => {
        if (privacyCheck === false) {
            setPrivacyCheck(true)
        } else {
            setPrivacyCheck(false)
        }
    };

    const useBtnEvent = () => {
        if (useCheck === false) {
            setUseCheck(true)
        } else {
            setUseCheck(false)
        }
    };



    useEffect(() => {
        if (privacyCheck === true && useCheck === true) {
            setAllCheck(true)
        } else {
            setAllCheck(false)
        }
    }, [privacyCheck, useCheck])

    return (
        <>
            <div className="item">
                <div className="container-policy mb-1">
                    <pre>
                        <h4>개인정보처리방침</h4>
                        본 이용약관은 개인정보보호위원회(이하‘운영기관’이라 한다)에서 운영하는 “가명정보 활용 종합지원플랫폼”에 대한 이용조건 및 절차, 운영기관과 회원의 권리ㆍ의무, 기타 필요한 사항을 규정함을 목적으로 합니다.

                        제1조 약관의 효력과 변경
                        1. 회원이 본 이용약관 내용에 동의하는 경우 가명정보 활용 종합지원플랫폼의 서비스 제공 행위 및 회원의 서비스 사용 행위에 대하여는 본 약관이 우선적으로 적용됩니다.
                        2. 운영기관은 본 이용약관을 사전 고지 없이 변경할 수 있고, 변경된 약관은 가명정보 활용 종합지원플랫폼 내에 공지와 동시에 그 효력이 발생됩니다. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 본인의 회원등록을 취소(회원탈퇴)할 수 있으며 계속 사용의 경우는 약관 변경에 대한 동의로 간주됩니다.
                    </pre>
                </div>
                <input id="policy1" type="checkbox" className="mb-1" checked={privacyCheck} onChange={ageBtnEvent} />
                <label htmlFor="policy1">개인정보처리방침에 동의합니다.(필수)</label>
                <div className="container-policy mb-1">
                    <pre>
                        <h4>이용약관</h4>
                        본 이용약관은 개인정보보호위원회(이하‘운영기관’이라 한다)에서 운영하는 “가명정보 활용 종합지원플랫폼”에 대한 이용조건 및 절차, 운영기관과 회원의 권리ㆍ의무, 기타 필요한 사항을 규정함을 목적으로 합니다.

                        제1조 약관의 효력과 변경
                        1. 회원이 본 이용약관 내용에 동의하는 경우 가명정보 활용 종합지원플랫폼의 서비스 제공 행위 및 회원의 서비스 사용 행위에 대하여는 본 약관이 우선적으로 적용됩니다.
                        2. 운영기관은 본 이용약관을 사전 고지 없이 변경할 수 있고, 변경된 약관은 가명정보 활용 종합지원플랫폼 내에 공지와 동시에 그 효력이 발생됩니다. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 본인의 회원등록을 취소(회원탈퇴)할 수 있으며 계속 사용의 경우는 약관 변경에 대한 동의로 간주됩니다.
                    </pre>
                </div>
                <input id="policy2" type="checkbox" className="mb-1" checked={useCheck} onChange={useBtnEvent} />
                <label htmlFor="policy2">이용약관에 동의합니다.(필수)</label>
                <hr />
                <input id="policy1" type="checkbox" className="mb-1" checked={allCheck} onChange={allBtnEvent} />
                <label htmlFor="policy1">약관 전체동의</label>
            </div>
        </>
    )
}

export default AuthPolicy;