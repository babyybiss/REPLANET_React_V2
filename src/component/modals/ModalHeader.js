import '../../assets/css/supportbot.css'
import CloseIcon from '../../assets/images/icon/CloseIcon';

function ModalHeader({ setIsShow }) {
    return(
        <div class="modal-header">
            <button 
                className={'modal-close-btn'}
                onClick={() => setIsShow(false)}
            >
                <i class="fa-solid fa-times"></i>
            </button>
        </div>

    );
}
export default ModalHeader;