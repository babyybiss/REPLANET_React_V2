import { request } from "./CommonAPI";
import { getCategoryData, getDonationTime, getCurrentYear } from "../modules/ChartModule";

export function callGetCategoryDataAPI() {

    return async (dispatch, _) => {

        const response = await request('GET', '/charts/series/byCategory');

        dispatch(getCategoryData(response));
    }
}

export function callGetDonationTimeAPI() {

    return async (dispatch, _) => {

        const response = await request('GET', '/charts/series/byDonationTime');

        dispatch(getDonationTime(response));
    }
}

export function callGetCurrentYearAPI() {

    return async (dispatch, _) => {

        const response = await request('GET', '/charts/series/byCurrentYear');

        dispatch(getCurrentYear(response))
    }
}
