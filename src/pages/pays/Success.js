import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/pay.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { callGetDonationByTidAPI } from '../../apis/DonationAPI';
import { useLocation } from 'react-router-dom';

function Success() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const payTid = searchParams.get('payTid');
    console.log('Success() payTid : ' + payTid);

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetDonationByTidAPI(payTid));
        },
        []
    );

    return(
        <>
            <br/>
            <br/>
            <br/>
            <div className="container-first">
                <h3>성공</h3>
            </div>
        </>
    );
}

export default Success;