import { createActions, handleActions } from "redux-actions";


const initialState = [
    {
        id: '',
        name: '',
        username: '',
        address: {}
    }
]

// 현재 날짜
const currentDate = new Date();


export const GET_CONTINU = 'campaign/GET_CONTINU';
export const GET_COMPLETE = 'campaign/GET_CONTINU';

const actions = createActions({
    [GET_CONTINU]: () => { },
    [GET_COMPLETE]: () => { }
})

const campaignReducer = handleActions(
    {
        [GET_CONTINU]: (state, {payload}) => {return payload},
        [GET_COMPLETE]: (state, { payload: currentDate }) => ({
            ...state,
            currentDate: currentDate
        }),
    }, initialState
);

export default campaignReducer;