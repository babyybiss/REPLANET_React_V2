import BubbleList from "../supportbots/list/BubbleList";
import ModalHeader from "./ModalHeader";

function ModalSupportbot({ setIsShow }) {
 
    console.log()
    return (
        <div className={'modal-box'}>
            <ModalHeader setIsShow={(setIsShow)} /> 
            <BubbleList />
        </div>
    );
}
export default ModalSupportbot;