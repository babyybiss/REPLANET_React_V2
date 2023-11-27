import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetSupportbotAnswerAPI } from "../../../../apis/SupportbotAPI";

function FirstResBubble({questionCode}) {

    /*
    const callApiResult = useSelector(state => state.supportbotReducer)
    const supportbotData = callApiResult.supportbotAnswer;
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetSupportbotAnswerAPI(questionCode))
        }
    );

    */
    return (
        <div className="response-box">
            {questionCode}
        </div>
    );
}
export default FirstResBubble;