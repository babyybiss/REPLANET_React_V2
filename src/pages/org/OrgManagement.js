import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';


function OrgManagement(){

    const navigate = useNavigate();

    const navigateToOrgList = () => {
        navigate('list');
    }

    const navigateToOrgRegist = () => {
        navigate('regist')
    }

    return(
        <div className="container-first">
            <div className="container-centered">
                <h1>기부처 관리</h1>
            </div>
            <div className="container">
                <div className='campaign-button-container'>
                    <div className="campaign-button-area" style={{marginBottom: "10px"}}>
                        <button className="button button-lg button-primary-outline" onClick={navigateToOrgList}>
                            기부처 목록
                        </button>
                        <button className='button button-lg button-primary-outline' onClick={navigateToOrgRegist}>
                            기부처 등록
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    );
}

export default OrgManagement;