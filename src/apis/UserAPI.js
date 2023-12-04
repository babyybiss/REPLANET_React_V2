import axios from "axios";
import Swal from 'sweetalert2';
import { DELETE_USER_WITHDRAW, GET_VERIFY_USER, PUT_MODIFY_USER } from "../modules/UserModule";

export function userWithdrawAPI({memberCode, password}, navigate, authCtx){
    console.log('[UserAPI] userWithdrawAPI 시작');
    const requestURL = `http://localhost:8001/users/${memberCode}`;
    return async(dispatch, getState) => {
        try{
            const result = await axios.delete(requestURL, {params: {password}});
            console.log('[UserAPI] userWithdrawAPI SUCCESS');
            dispatch({type: DELETE_USER_WITHDRAW, payload: result.data});
            Swal.fire({
                icon: "success",
                iconColor: '#1D7151',
                title: "탈퇴 처리가 완료되었습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            }).then(result => {
                if(result.isConfirmed){
                    authCtx.logout();
            }})
        } catch (error){
            console.error("[UserAPI] userWithdrawAPI FAIL : ", error);
            if(error.response?.data == 'WrongPwd'){
                Swal.fire({
                    icon: "error",
                    iconColor: "#DB524E",
                    title: "비밀번호를 잘못 입력하셨습니다.",
                    text: '문제가 지속될 경우 고객센터로 문의 바랍니다.',
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            } else {
                Swal.fire({
                    icon: "error",
                    iconColor: "#DB524E",
                    title: "탈퇴 처리 중 오류가 발생했습니다 (" + error.response?.status + ")",
                    text: '문제가 지속될 경우 고객센터로 문의 바랍니다.',
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            }
        }
    }
}

export function VerifyUserAPI({memberCode, userPwd}, navigate){
    console.log('[UserAPI] VerifyUserAPI 시작');
    const requestURL = `http://localhost:8001/users/verifying/${memberCode}`;
    return async (dispatch, getState) => {
        try {
            console.log("비밀번호? ", userPwd);
            const result = await axios.get(requestURL, {params: {userPwd}});
            console.log('[UserAPI] VerifyUserAPI SUCCESS');
            dispatch({type: GET_VERIFY_USER, payload: result.data});
            navigate('/myPage/modify');
        }catch(error){
            console.log('[UserAPI] VerifyUserAPI FAIL : ', error);
            if(error.response?.data == 'WrongPwd'){
                Swal.fire({
                    icon: "error",
                    iconColor: "#DB524E",
                    title: "비밀번호를 잘못 입력하셨습니다.",
                    text: '문제가 지속될 경우 고객센터로 문의 바랍니다.',
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            } else {
                Swal.fire({
                    icon: "error",
                    iconColor: "#DB524E",
                    title: "처리 중 오류가 발생했습니다 (" + error.response?.status + ")",
                    text: '문제가 지속될 경우 고객센터로 문의 바랍니다.',
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
            }
        }
    }
}

export function modifyUserAPI({memberCode, password, memberName, phone}, navigate){
    console.log('[UserAPI] ModifyUserAPI 시작');
    console.log("API단계 확인 : ", password, memberName, phone)
    const requestURL = `http://localhost:8001/users/${memberCode}`;
    return async (dispatch, getState) => {
        try{
            const result = await axios.put(requestURL, null, {params: {password, memberName, phone}});
            console.log('[UserAPI] modifyUserAPI SUCCESS');
            dispatch({type: PUT_MODIFY_USER, payload: result.data});
            Swal.fire({
                icon: "success",
                iconColor: '#1D7151',
                title: "회원 정보가 정상적으로 수정되었습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            }).then(result => {
                if(result.isConfirmed){
                    navigate('/myPage');
            }})
        } catch (error){
            console.error("[UserAPI] modifyUserAPI FAIL : ", error);
            Swal.fire({
                icon: "error",
                iconColor: "#DB524E",
                title: "처리 중 오류가 발생했습니다 (" + error.response?.status + ")",
                text: '문제가 지속될 경우 고객센터로 문의 바랍니다.',
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            })
        }
    }
}