import axios from 'axios';

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
        throw error;
    }
};

export const callGetFindMemberAPI = async (kakaoTokenId, email) => {
    try {
        const response = await axios.post('https://localhost:8001/kakaologin/findMember',
                {
                    kakaoTokenId: kakaoTokenId,
                    email: email,
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};