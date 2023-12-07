import BubbleList from "../supportbots/list/BubbleList";
import ModalHeader from "./ModalHeader";

function ModalSupportbot({ setIsShow }) {
 
    return (
        <div className={'modal-box'}>
            <ModalHeader setIsShow={(setIsShow)} /> 
            <BubbleList setIsShow={(setIsShow)}/>
        </div>
    );
}
export default ModalSupportbot;