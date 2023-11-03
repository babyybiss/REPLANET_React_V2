import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/pay.css';
import PayForm from '../../component/pays/PayForm';

function Pay() {
    return(
        <>

            <br/>
            <br/>
            <br/>
            <div className="container-first">
                <h3>기부하기</h3>
                <PayForm/>
            </div>
        </>
    );
}

export default Pay;