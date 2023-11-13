import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/pay.css';
import { Link } from 'react-router-dom';

function Cancel() {
    return(
        <>

            <br/>
            <br/>
            <br/>
            <div className="container-first">
                <h3>결제를 취소하셨습니다.</h3>
                <br/>
                <Link to="/">
                    <button className="button button-lg button-primary-outline">메인으로</button>
                </Link>
            </div>
        </>
    );
}

export default Cancel;