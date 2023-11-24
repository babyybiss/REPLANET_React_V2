import { request } from "./CommonAPI";
import { getSupportbotList } from "../modules/SupportbotModule";
import { getSupportbotAnswer } from "../modules/SupportbotModule";

export function callGetSupportbotListAPI() {

    return async (dispatch, getState) => {

        const response = await request('GET', '/chatbots/list');

        dispatch(getSupportbotList(response));
    }
}

export function callGetSupportbotAnswerAPI(questionCode) {

    return async (dispatch, getState) => {

        const response = await request('GET', `/chatbots/${questionCode}`);

        dispatch(getSupportbotAnswer(response));
    }
}