import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import AuthContext from "./AuthContext"

const AuthNavigate = () => {
  const authCtx = useContext(AuthContext)
  const [memberName, setMemberName] = useState("")
  let isLogin = authCtx.isLoggedIn
  let isGet = authCtx.isGetSuccess

  const callback = str => {
    setMemberName(str)
  }

  useEffect(() => {
    if (isLogin) {
      console.log("start")
      authCtx.getUser()
    }
  }, [isLogin])

  useEffect(() => {
    if (isGet) {
      console.log("get start")
      callback(authCtx.userObj.nickname)
    }
  }, [isGet])

  const toggleLogoutHandler = () => {
    authCtx.logout()
  }

}

export default AuthNavigate
