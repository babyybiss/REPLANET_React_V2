import '../../assets/css/supportbot.css'

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