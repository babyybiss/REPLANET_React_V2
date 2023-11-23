import { request } from "./CommonAPI";
import { getSupportbotlist } from "../modules/SupportbotModule";

export function callGetSupportbotListAPI() {

    return async (dispatch, getState) => {

        const response = await request('GET', '/chatbots/list');

        dispatch(getSupportbotlist(response));
    }
}