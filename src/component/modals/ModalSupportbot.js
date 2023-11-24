import BubbleList from "../supportbots/list/BubbleList";
import ModalHeader from "./ModalHeader";
import { useEffect } from "react";

function ModalSupportbot({ setIsShow }) {
 
    return (
        <div className={'modal-box'}>
            <ModalHeader setIsShow={(setIsShow)} />   
            <BubbleList />
        </div>
    );
}
export default ModalSupportbot;