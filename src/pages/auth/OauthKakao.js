import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {callGetFindMemberAPI, callPostKakaoTokenAPI, callPostUserMeAPI} from "../../apis/KaKaoLoginAPI";

function OauthKakao() {

    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const authorizationCode = urlParams.get('code');

    useEffect(() => {
        if (authorizationCode) {
            callPostKakaoTokenAPI(authorizationCode)
            .then((response) => {
                console.log('토큰 교환 성공:', response);
                const accessToken = response.access_token;

                callGetFindMemberAPI(response)
                    .then((findMemberResponse) => {
                        console.log('서버에서 조회된 회원 정보:', findMemberResponse);
                    })
                    .catch((error) => {
                        console.error('서버에서 회원 조회 오류:', error);
                        let kakaoTokenId, email;

                        callPostUserMeAPI(accessToken)
                            .then((response) => {
                                console.log('사용자 정보 ! ', response);
                                console.log('카카오 id 값 : ',response.id);
                                console.log('카카오 email 값 : ',response.kakao_account.email);

                                kakaoTokenId = response.id;
                                email = response.kakao_account.email;

                            })
                            .catch((error) => {
                                console.error('accessToken 데이터 추출 오류 :', error);
                            })
                            .finally(() => {
                                if (error.response?.data?.redirectTo) {
                                    const redirectToWithCode = `/socialsignup?code=${authorizationCode}&kakaoTokenId=${kakaoTokenId}&email=${email}`;
                                    navigate(redirectToWithCode);
                                }
                            })
                    });
            })
            .catch((error) => {
                console.error('토큰 교환 오류 :', error);
            });
        }
    }, [authorizationCode]);

    return null;
};

export default OauthKakao;
