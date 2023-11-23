import '../../assets/css/chatbot.css'
import CloseIcon from '../../assets/images/icon/CloseIcon';

function ModalHeader({ setIsShow }) {
    return(
        <div>
            <button 
                className={'modal-close-btn'}
                onClick={() => setIsShow(false)}
            >
                <CloseIcon/>
            </button>
        </div>

    );
}
export default ModalHeader;