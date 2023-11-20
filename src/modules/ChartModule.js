import { createActions, handleActions } from "redux-actions";

const initialState = {};

/* action type */
const GET_CHARTLIST = 'chart/GET_CHARTLIST';

/* action function */ 
export const { chart : { getChartlist }} = createActions({
    [GET_CHARTLIST]: (res) => ({ chartDataList: res })
});

/* reducer */ 
const chartReducer = handleActions(
    {
        [GET_CHARTLIST]: (state, { payload }) => {
            console.log(payload)
            return payload;
        }
    },
    initialState
);

export default chartReducer;