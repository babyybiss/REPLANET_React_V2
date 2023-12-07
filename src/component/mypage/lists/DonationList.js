import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonationItem from "../items/DonationItem";
import { callGetAllPaysByMemberWithDateAPI } from "../../../apis/DonationAPI";
import Swal from 'sweetalert2';
import Loader from "../../common/Loader";


function DonationList() {

    const pays = useSelector(state => state.donationReducer);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    console.log('DonationList() startDate : ', startDate);
    console.log('DonationList() endDate : ', endDate);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [showDetailsAll, setShowDetailsAll] = useState(false);

    const handleToggleDetailsAll = () => {
        setShowDetailsAll((prev) => !prev);
    };

    const [detailsForItems, setDetailsForItems] = useState({});

    const handleToggleDetails = (payCode) => {
        setDetailsForItems((prevDetails) => {
            const newDetails = { ...prevDetails };
            newDetails[payCode] = !newDetails[payCode];
            return newDetails;
        });
    };

    const handleSearch = () => {
        if (startDate && endDate) {
            console.log('DonationDetail() handleSearch() 실행 : (startDate && endDate)');
            dispatch(callGetAllPaysByMemberWithDateAPI(startDate, endDate));
        } else if (startDate || endDate) {
            console.log('DonationDetail() handleSearch() 실행 : (startDate || endDate)');
            Swal.fire({
                icon: 'warning',
                title: '<b style="color:#1D7151; font-weight:bold;">검색 일자</b>를 확인해주세요.',
                text: '검색 시작일자와 종료일자 둘 다 선택해주세요.',
                confirmButtonColor: '#1D7151',
                iconColor: '#1D7151'
            });
        } else {
            console.log('DonationDetail() handleSearch() 실행 : ()');
            dispatch(callGetAllPaysByMemberWithDateAPI(startDate, endDate));
        }
    }

    const initSearchDate = () => {
        console.log('DonationDetail() initSearchDate() 실행 : 날짜 초기화됨');
        setStartDate('');
        setEndDate('');
        dispatch(callGetAllPaysByMemberWithDateAPI('', ''));
    }

    const handleStartDateChange = (newStartDate) => {
        if (!endDate || new Date(newStartDate) <= new Date(endDate)) {
            setStartDate(newStartDate);
        } else {
            Swal.fire({
                icon: 'warning',
                title: '<b style="color:#1D7151; font-weight:bold;">검색 시작일자</b>를 확인해주세요.',
                confirmButtonColor: '#1D7151',
                iconColor: '#1D7151'
            });
        }
    };

    const handleEndDateChange = (newEndDate) => {
        if (!startDate || new Date(newEndDate) >= new Date(startDate)) {
            setEndDate(newEndDate);
        } else {
            Swal.fire({
                icon: 'warning',
                title: '<b style="color:#1D7151; font-weight:bold;">검색 종료일자</b>를 확인해주세요.',
                confirmButtonColor: '#1D7151',
                iconColor: '#1D7151'
            });
        }
    };

    const calculateTotalAmount = () => {
        console.log('pays', pays);
        return pays && pays.length > 0
            ? pays.reduce((total, pay) => total + (pay.payAmount || 0) + (pay.refDonation?.donationPoint || 0), 0)
            : '0';
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log('DonationList() useEffect 실행');
            await dispatch(callGetAllPaysByMemberWithDateAPI(startDate, endDate));
            setLoading(false);
        };

        fetchData();
    }, [dispatch]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pays && pays.length > 0 ? pays.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalItems = pays.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            {loading ? (<div><Loader /></div>) : (<div className="admin-main">
                <div className="admin-title">
                    <h1 class="text-primary">기부 내역</h1>
                </div>
                <div className=''>
                    <div class="items-container ic3">
                        <div class="item">
                            <input
                                type='date'
                                value={startDate}
                                onChange={(e) => handleStartDateChange(e.target.value)}
                                className='input input-lg' />
                        </div>
                        <div>
                            <input
                                type='date'
                                value={endDate}
                                onChange={(e) => handleEndDateChange(e.target.value)}
                                className='input input-lg' />
                        </div>
                        <div class="item">
                            <div className="items-container ic2">
                            <button className='button button-lg button-primary-outline w-100' onClick={initSearchDate}>
                            초기화
                        </button>
                        <button className='button button-lg button-primary w-100' onClick={handleSearch}>
                            검색 <i class="fa-solid fa-search"></i>
                        </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='admin-title total-amount border-0'>
                    <div>
                        <span className="pay-color-gray">기부내역 클릭 시 해당 캠페인으로 이동합니다.</span>
                    </div>
                    <div>
                        <span>기간내 총 기부액 : </span>
                        <span className="pay-color-green">{calculateTotalAmount().toLocaleString()}원</span>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>순번</th>
                            <th>캠페인 이름</th>
                            <th>재단</th>
                            <th onClick={handleToggleDetailsAll} className="toggle-header">
                                {showDetailsAll ? '기부금액 (접기)' : '기부금액 (상세보기)'}
                            </th>
                            <th>기부일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pays && pays.length > 0 ? (
                            currentItems.map((pay) => (
                                <DonationItem
                                    key={pay.payCode}
                                    pay={pay}
                                    showDetails={showDetailsAll || detailsForItems[pay.payCode]}
                                    onToggleDetails={() => handleToggleDetails(pay.payCode)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>기부내역이 없습니다!</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <ul className="pagination">
                    <li className="icon" onClick={() => handlePageChange(currentPage - 1)}><a><span className="fas fa-angle-left"></span></a></li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            <a className={currentPage === index + 1 ? "active" : ""}>
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li onClick={() => handlePageChange(currentPage + 1)}><a><span className="fas fa-angle-right"></span></a></li>
                </ul>
            </div>)}
        </>
    );
}

export default DonationList;