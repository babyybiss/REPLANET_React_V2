import { request } from "./CommonAPI";
import { getChartlist } from "../modules/ChartModule";

export function callGetChartListAPI() {

    return async (dispatch, getState) => {

        const response = await request('GET', '/charts/series');

        console.log('결과 가지고 오니? : ', response);

        dispatch(getChartlist(response));
    }
}