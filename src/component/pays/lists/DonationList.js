import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonationItem from "../items/DonationItem";
import { callGetAllPaysAPI } from "../../../apis/DonationAPI";
import { useState } from "react";

function DonationList({startDate, endDate}) {

    const result = useSelector(state => state.donationReducer);
    console.log('result', result);
    console.log('DonationList() startDate : ', startDate);
    console.log('DonationList() endDate : ', endDate);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const pays = result;
    console.log('DonationList() pays : ',pays);

    const calculateTotalAmount = () => {
        return pays && pays.length > 0 ? (pays.reduce((total, pay) => total + pay.payAmount, 0)) : ('0');
    }

    useEffect(
        () => {
            console.log('DonationList() useEffect 실행');
            if (startDate && endDate) {
            } else {
                dispatch(callGetAllPaysAPI());
            }
        },
        [startDate, endDate]
    );

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

    return(
            <>
                <div className='admin-title total-amount'>
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
                            <th>단체</th>
                            <th>기부금액</th>
                            <th>기부일자</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pays && pays.length > 0 ? 
                        ( currentItems.map((pay) => (
                            <DonationItem key={pay.payCode} pay={pay} />
                        )))
                        :
                        (<tr><td colSpan={5}>기부내역이 없습니다!</td></tr>)}
                    </tbody>
                </table>

                <ul className="pagination">
                    <li className="icon" onClick={() => handlePageChange(currentPage -1)}><a><span className="fas fa-angle-left">&lt;</span></a></li>
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
                    <li onClick={() => handlePageChange(currentPage + 1)}><a><span className="fas fa-angle-left">&gt;</span></a></li>
                </ul>
            </>
    );
}

export default DonationList;