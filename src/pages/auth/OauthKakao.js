import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {callGetFindMemberAPI, callPostKakaoTokenAPI, callPostUserMeAPI} from "../../apis/KaKaoLoginAPI";

function OauthKakao() {

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const authorizationCode = urlParams.get('code');

    useEffect(() => {
        if (authorizationCode) {

            callPostKakaoTokenAPI(authorizationCode)

            .then((response) => {
                console.log('토큰 교환 성공:', response);
                // callGetFindMemberAPI(response);
                const accessToken = response.access_token;

                if(accessToken) {
                    callPostUserMeAPI(accessToken)
                    .then((response) => {
                        console.log('사용자 정보 ! ', response);
                        console.log('카카오 id 값 : ',response.id);
                        console.log('카카오 email 값 : ',response.kakao_account.email);

                        const kakaoTokenId = response.id;
                        const email = response.kakao_account.email;

                        // callGetFindMemberAPI(response);
                    })
                    .catch((error) => {
                        console.error('accessToken 데이터 추출 오류 :', error);
                    });
                }
                // const decodedToken = token ? jwtDecode(token) : null;
                // console.log('Decoded Token:', decodedToken);
                
            })
            .catch((error) => {
                console.error('토큰 교환 오류 :', error);
            });
        }
    }, [authorizationCode]);

    return null;
};

export default OauthKakao;
