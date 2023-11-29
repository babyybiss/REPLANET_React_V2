import { GET_MEMBER_BY_TOKEN, GET_ORGS, PUT_WITHDRAW_ORG } from "../modules/MemberModule";
import { http } from "../utils/TokenUtils"; 

export function callGetMemberByTokenAPI() {
    // 현재 로그인한 멤버를 토큰을 통해 멤버 정보를 조회해 오는 API
    // 멤버의 기부 총액 totalAmount와 멤버의 총 기부횟수 totalDonation을 같이들고옴
    const requestURL = `/users`

    return async function getMemberByToken(dispatch, getState) {
        try {
            const response = await http.get(requestURL);
            const result = response.data;
            console.log('(callGetMemberByTokenAPI) result : ', result);
            dispatch({ type: GET_MEMBER_BY_TOKEN, payload: result });
        } catch (error) {
            console.error('(callGetMemberByTokenAPI) API 요청 실패! : ', error);
        }
    }
}

export function callGetOrgsAPI() {
    // ROLE_ORG인 멤버들의 정보를 전체 조회하는 API
    const requestURL = `/orgs`

    return async function getOrgs(dispatch, getState) {
        try {
            const response = await http.get(requestURL);
            const result = response.data;
            console.log('(callGetOrgsAPI) result : ', result);
            dispatch({ type: GET_ORGS, payload: result });
        } catch (error) {
            console.error('(callGetOrgsAPI) API 요청 실패! : ', error);
        }
    }
}

export function callPutWithdrawOrgAPI({memberCode}) {
    // ROLE_ORG인 멤버를 탈퇴상태로 변경하는 API
    const requestURL = `/withdrawOrg`

    return async function putWithdrawOrg(dispatch, getState) {
        try {
            const response = await http.put(requestURL, {memberCode});
            const result = response.data;
            console.log('(callPutWithdrawOrgAPI) result : ', result);
            dispatch({ type: PUT_WITHDRAW_ORG, payload: result });
        } catch (error) {
            console.error('(callPutWithdrawOrgAPI) API 요청 실패! : ', error);
        }
    }
}