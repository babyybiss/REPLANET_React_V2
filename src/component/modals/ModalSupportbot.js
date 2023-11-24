import ModalHeader from "./ModalHeader";
import QuestionBubbles from "../supportbots/list/QuestionBubbles";
import { useEffect } from "react";

function ModalSupportbot({ setIsShow, supportbotDataList }) {
 

    return (
        <div className={'modal-box'}>
            <ModalHeader setIsShow={(setIsShow)} />   
            <QuestionBubbles supportbotDataList={supportbotDataList} />
        </div>
    );
}
export default ModalSupportbot;