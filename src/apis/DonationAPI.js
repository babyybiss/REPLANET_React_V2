import { GET_DONATIONS, GET_DONATION_BY_PAY_CODE, GET_POINT_OF_MEMBER } from "../modules/DonationModule";
import { GET_DONATIONS_BY_MEMBER } from "../modules/DonationModule";
import axios from "axios";

export function callGetAllDonationsAPI() {
    
    const requestURL = 'http://localhost:8001/donations'

    return async function getAllDonations(dispatch, getState) {
        try {
            const response = await axios.get(requestURL);
            const result = response.data;
            console.log('(callGetDonationsAPI) result : ', result);
            dispatch({ type: GET_DONATIONS, payload: result });
        } catch (error) {
            console.error('(callGetDonationsAPI) API 요청 실패! : ', error);
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