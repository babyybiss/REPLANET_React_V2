import { createActions, handleActions } from "redux-actions";

const initialState = {};

export const GET_DONATIONS = 'donations/GET_DONATIONS'
export const GET_DONATIONS_BY_MEMBER = 'donations/GET_DONATIONS_BY_MEMBER'
export const GET_DONATION_BY_TID = 'donations/GET_DONATION_BY_TID'
// 필요에 따라 뭐 이런식으로 써야할듯? 
// 전체(관리자용?),멤버에따른기부내역(사용자용), 방금기부한기부내역(성공페이지에서 보여줄거),

const actions = createActions({
    [GET_DONATIONS]: () => {},
    [GET_DONATIONS_BY_MEMBER]: (memberCode) => ({ memberCode }),
    [GET_DONATION_BY_TID]: (payTid) => ({ payTid })
});

const donationReducer = handleActions(
    {
        [GET_DONATIONS]: (state, { payload }) => {
            console.log('(donationReducer) [GET_DONATIONS] payload : ', payload);
            return payload;
        },
        [GET_DONATIONS_BY_MEMBER]: (state, { payload }) => {
            console.log('(donationReducer) [GET_DONATIONS_BY_MEMBER] payload : ', payload);
            return payload;
        },
        [GET_DONATION_BY_TID]: (state, { payload }) => {
            console.log('(donationReducer) [GET_DONATION_BY_TID] payload : ', payload);
            return payload;
        }
    },
    initialState
);

export default donationReducer;