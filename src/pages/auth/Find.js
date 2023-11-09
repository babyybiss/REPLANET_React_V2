import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../component/auth/AuthContext";
import KakaoLogin from "./KakaoLogin";
import '../../assets/css/user.css';
import Signup from "./Signup";
function Find() {
    return (
        <div className="container-first container-centered">
        <div id="container-user">

            <div className="tabs">
                <input id="tab1" type="radio" name="tab_item" defaultChecked/>
                <label className="tab_item ti2" for="tab1">아이디 찾기</label>
                <input id="tab2" type="radio" name="tab_item"/>
                <label className="tab_item ti2" for="tab2">비밀번호 찾기</label>
          
                <div className="tab_content" id="tab1_content">
                  <div className="items-container ic1">
                    <form className="form">
                      <div className="input-group ">
                        <input type="text" className="input" placeholder="전화번호"/>
                        <button className="button button-primary">인증</button>
                      </div>
                      <button type="submit" className="button button-primary">아이디 찾기</button>
                    </form>

                  </div>
          
                </div>
                <div className="tab_content" id="tab2_content">
                  <div className="items-container ic1">

                      <input type="text" className="input" placeholder="id"/>

                    <div className="input-group">
                      <input type="number" className="input" placeholder="전화번호"/>
                      <button className="button button-primary">인증</button>
                    </div>
                    
                    <button type="submit" className="button button-primary">비밀번호 찾기</button>
                  </div>

            
                  </div>
          
              </div>


        </div>


      

    







</div>
    )

}
export default Find;