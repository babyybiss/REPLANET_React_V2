import { request } from "./CommonAPI";
import { getChartlist } from "../modules/ChartModule";

export function callGetChartListAPI() {

    return async (dispatch, getState) => {

        const response = await request('GET', '/charts/series');

        dispatch(getChartlist(response));
    }
}