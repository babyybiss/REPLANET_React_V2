import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetSupportbotListAPI } from "../../apis/SupportbotAPI";
import RepeatBubble from "../supportbots/items/RepeatBubble";
import ResMessageBubble from "../supportbots/items/ResMessageBubble";
import ModalHeader from "./ModalHeader";
import QuestionBubbles from "../supportbots/list/QuestionBubbles";

function ModalSupportbot({ setIsShow }) {

    const callApiResult = useSelector(state => state.supportbotReducer)
    const supportbotDataList = callApiResult.supportbotDataList;
    const dispatch = useDispatch();

    useEffect(
        () => {
            console.log('확인용22222222222222222')
            dispatch(callGetSupportbotListAPI());
        },
        []
    );

    //console.log('확인용33333333333333') 오버 아웃이벤트와 함께 계속 동작
   // console.log(setIsShow)
   return (
    supportbotDataList && (
        <div className={'modal-box'}>
            <ModalHeader setIsShow={(setIsShow)} />
            
            <QuestionBubbles supportbotDataList={supportbotDataList.results.allSupportData}/>
        </div>
    )
    
   );
}
export default ModalSupportbot;