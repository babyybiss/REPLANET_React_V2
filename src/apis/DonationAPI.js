import { GET_GET_PAYS, GET_PAYS_BY_DATE_RANGE, GET_DONATION_BY_PAY_CODE, GET_POINT_OF_MEMBER } from "../modules/DonationModule";
import { GET_DONATIONS_BY_MEMBER } from "../modules/DonationModule";
import axios from "axios";

export function callGetAllPaysAPI() {
    
    const requestURL = 'http://localhost:8001/pays'

    return async function getAllPays(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data.reverse();
            // 역순으로 불러오게 함
            console.log('(callGetAllPaysAPI) result : ', result);
            dispatch({ type: GET_GET_PAYS, payload: result });
        } catch (error) {
            console.error('(callGetAllPaysAPI) API 요청 실패! : ', error);
        }
    }
}

export function callGetPaysByDateRangeAPI(startDate, endDate) {

    console.log('callGetPaysByDateRangeAPI() startDate : ', startDate);
    console.log('callGetPaysByDateRangeAPI() endDate : ', endDate);
    
    const requestURL = `http://localhost:8001/pays?startDate=${startDate}&endDate=${endDate}`

    return async function getPaysByDateRange(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data.reverse();
            console.log('(callGetPaysByDateRangeAPI) result : ', result);
            dispatch({ type: GET_PAYS_BY_DATE_RANGE, payload: result });
        } catch (error) {
            console.error('(callGetPaysByDateRangeAPI) API 요청 실패! : ', error);
        }
    }
}

export function callGetDonationsByMemberAPI(memberCode) {

    const requestURL = `http://localhost:8001/users/${ memberCode }/donations`

    return async function getDonationsByMember(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data;
            console.log('(callGetDonationsByMemberAPI) result : ', result);
            dispatch({ type: GET_DONATIONS_BY_MEMBER, payload: result });
        } catch (error) {
            console.error('(callGetDonationsByMemberAPI) API 요청 실패! : ', error);
        }
    }
}

export function callGetDonationByPayCodeAPI(payCode) {

    const requestURL = `http://localhost:8001/donations/payCode=${ payCode }`

    return async function getDonationByTid(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data;
            console.log('(callGetDonationByPayCodeAPI) result : ', result);
            dispatch({ type: GET_DONATION_BY_PAY_CODE, payload: result });
        } catch (error) {
            console.error('(callGetDonationByPayCodeAPI) API 요청 실패! : ', error);
        }
    }
}

export function callGetPointByMemberAPI(memberCode) {

    const requestURL = `http://localhost:8001/users/point/${ memberCode }/donations`

    return async function getPointByMember(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data;
            console.log('(callGetPointByMemberAPI) result : ', result);
            dispatch({ type: GET_POINT_OF_MEMBER, payload: result });
        } catch (error) {
            console.error('(callGetPointByMemberAPI) API 요청 실패! : ', error);
        }
    }
}