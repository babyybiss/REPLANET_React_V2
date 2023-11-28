import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ChangePassword = () => {
  let navigate = useNavigate()

  const authCtx = useContext(AuthContext)
  const exPasswordInputRef = useRef(null)
  const newPasswordInputRef = useRef(null)
  const newPasswordAgainInputRef = useRef(null)

  const submitHandler = event => {
    event.preventDefault()
    const enteredExPassword = exPasswordInputRef.current.value
    const enteredNewPassword = newPasswordInputRef.current.value
    const enteredNewPasswordAgain = newPasswordAgainInputRef.current.value
    if (enteredNewPassword !== enteredNewPasswordAgain) {
      alert("Password Write Correct!")
      return
    }
    console.log("change pw start!")
    authCtx.changePassword(enteredExPassword, enteredNewPassword)
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
        <label htmlFor="ex-password">이전 비밀번호</label>
        <input
        className="input"
          type="password"
          id="ex-password"

          ref={exPasswordInputRef}
        />
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
          ref={newPasswordAgainInputRef}
        />
      </div>
      <div>
        <button type="submit" className="button button-primary w-100">Change Password</button>
      </div>
    </form>
  )
}

export { ChangePassword }
