import { GET_MEMBER_BY_TOKEN } from "../modules/MemberModule";
import axios from "axios";

export function callGetMemberByTokenAPI() {
    // 현재 로그인한 멤버를 토큰을 통해 멤버 정보를 조회해 오는 API
    // 멤버의 기부 총액 totalAmount와 멤버의 총 기부횟수 totalDonation을 같이들고옴
    const requestURL = `http://localhost:8001/users`

    return async function getMemberByToken(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data;
            console.log('(callGetMemberByTokenAPI) result : ', result);
            dispatch({ type: GET_MEMBER_BY_TOKEN, payload: result });
        } catch (error) {
            console.error('(callGetMemberByTokenAPI) API 요청 실패! : ', error);
        }
    }
}