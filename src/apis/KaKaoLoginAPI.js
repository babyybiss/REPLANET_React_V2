import axios from 'axios';
import Swal from 'sweetalert2';
import { DELETE_USER_WITHDRAW } from '../modules/UserModule';

export const callPostKakaoTokenAPI = async (code) => {
    try {
        const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
        const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

        const response = await axios.post('https://kauth.kakao.com/oauth/token',
                {
                    grant_type: 'authorization_code',
                    client_id: restApiKey,
                    redirect_uri: redirectUri,
                    code: code,
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
        );

        return response.data;
    } catch (error) {
        console.error('(callPostKakaoTokenAPI) API 요청 실패! : ', error);
        throw error;
    }
};

export const callPostUserMeAPI = async (accessToken) => {
    try {
        const response = await axios.get('https://kapi.kakao.com/v2/user/me',{
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                params: {
                    secure_resource: false, // 이미지 URL 값 HTTPS 여부
                    property_keys: ['kakao_account.profile', 'kakao_account.name', 'kakao_account.email', 'kakao_account.age_range', 'kakao_account.birthday', 'kakao_account.gender'],
                },
        });

        return response.data;
    } catch (error) {
        console.error('(callPostUserMeAPI) API 요청 실패! : ', error);
        throw error;
    }
};

export const callGetFindMemberAPI = async (data) => {
    try {
        const response = await axios.post(
                'http://localhost:8001/kakaologin/findMember',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                }
        );

        return response.data;
    } catch (error) {
        console.error('(callGetFindMemberAPI) API 요청 실패! : ', error);
        throw error;
    }
};

export const callPostUnlinkMemberAPI = async (accessToken) => {
    try {
        const response = await axios.post('https://kapi.kakao.com/v1/user/unlink', null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        console.log('연동해제 성공:', response.data);
    } catch (error) {
        console.error('연동해제 실패:', error);
    }
}

export function socialUserWithdrawAPI({memberCode}, authCtx){
    console.log('[UserAPI] socialUserWithdrawAPI 시작');
    const requestURL = `http://localhost:8001/socialUsers/${memberCode}`;
    return async(dispatch, getState) => {
        try{
            const result = await axios.delete(requestURL, {});
            console.log('[UserAPI] userWithdrawAPI SUCCESS');
            dispatch({type: DELETE_USER_WITHDRAW, payload: result.data});
            Swal.fire({
                icon: "success",
                iconColor: '#1D7151',
                title: "연동해제(탈퇴) 되었습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            }).then(result => {
                if(result.isConfirmed){
                    authCtx.logout();
            }})
        } catch (error){
            console.error("[UserAPI] userWithdrawAPI FAIL : ", error);
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