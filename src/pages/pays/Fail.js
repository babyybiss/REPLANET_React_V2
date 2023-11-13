import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/pay.css';
import { Link } from 'react-router-dom';

function Fail() {
    return(
        <>

            <br/>
            <br/>
            <br/>
            <div className="container-first">
                <h3>실패요</h3>
                <br/>
                <Link to="/">
                    <button className="button button-lg button-primary-outline">메인으로</button>
                </Link>
            </div>
        </>
    );
}

export default Fail;