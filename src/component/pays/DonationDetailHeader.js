import DonationList from './lists/DonationList';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callGetPaysByDateRangeAPI } from '../../apis/DonationAPI';


function DonationDetailHeader() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (startDate && endDate) {
            console.log('DonationDetailHeader() handleSearch() 실행 : 검색 버튼 누름');
            dispatch(callGetPaysByDateRangeAPI(startDate, endDate));
        }
    }

    const initSearchDate = () => {
        console.log('DonationDetailHeader() initSearchDate() 실행 : 날짜 초기화됨');
        setStartDate('');
        setEndDate('');
    }

    const handleStartDateChange = (newStartDate) => {
        if (!endDate || new Date(newStartDate) <= new Date(endDate)) {
            setStartDate(newStartDate);
        } else {
            alert('검색 시작일자를 확인해주세요.');
        }
    };
    
    const handleEndDateChange = (newEndDate) => {
        if (!startDate || new Date(newEndDate) >= new Date(startDate)) {
            setEndDate(newEndDate);
        } else {
            alert('검색 종료일자를 확인해주세요.');
        }
    };

    useEffect(
        () => {
            console.log('DonationList() useEffect 실행');
            console.log('DonationDetailHeader() startDate : ', startDate);
            console.log('DonationDetailHeader() endDate : ', endDate);
            if (startDate && endDate) {
                dispatch(callGetPaysByDateRangeAPI(startDate, endDate));
            }
        },
        []
    );

    return(
        <>
            <div className="admin-main">
                <div className="admin-title">
                    <h5>기부내역</h5>
                </div>
                <div className='admin-title search-section'>
                    <div>
                        <input
                        type='date'
                        value={startDate}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        className='button button-lg button-primary-outline' />
                        <span> ~ </span>
                        <input
                        type='date'
                        value={endDate}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        className='button button-lg button-primary-outline' />
                    </div>
                    <div>
                        <button className='button button-lg button-primary-outline' onClick={initSearchDate}>
                            초기화
                        </button>
                        &nbsp;
                        <button className='button button-lg button-primary' onClick={handleSearch}>
                            검색
                        </button>
                    </div>
                </div>
                <DonationList startDate={startDate} endDate={endDate}/>
            </div>
        </>
    );
}

export default DonationDetailHeader;