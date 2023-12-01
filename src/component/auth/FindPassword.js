import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const FindPassword = () => {
  let navigate = useNavigate()

  const authCtx = useContext(AuthContext)
  
  const newPasswordInputRef = useRef(null)
  const newpasswordConfirmInputRef = useRef(null)

  const submitHandler = event => {
    event.preventDefault()
    const enteredNewPassword = newPasswordInputRef.current.value
    const enteredNewpasswordConfirm = newpasswordConfirmInputRef.current.value
    if (enteredNewPassword !== enteredNewpasswordConfirm) {
      alert("확인이 일치하지 않습니다.")
      return
    }
    console.log("change pw start!")
    authCtx.changePassword(enteredNewPassword, enteredNewpasswordConfirm)
    console.log(authCtx.isSuccess)
    if (authCtx.isSuccess) {
      alert("다시 로그인하세요.")
      authCtx.logout()
      navigate("/", { replace: true })
    }
  }

  return (
    <form onSubmit={submitHandler} className="text-left">
      <div>
        <label htmlFor="new-password">새 비밀번호</label>
        <input
        className="input"
          type="password"
          id="new-password"
          minLength={8}
          ref={newPasswordInputRef}
        />
        <label htmlFor="new-password">새 비밀번호 확인</label>
        <input
        className="input mb-1"
          type="password"
          id="new-password"
          minLength={8}
          ref={newpasswordConfirmInputRef}
        />
      </div>
      <div>
        <button type="submit" className="button button-primary w-100">Change Password</button>
      </div>
    </form>
  )
}

export { FindPassword }
