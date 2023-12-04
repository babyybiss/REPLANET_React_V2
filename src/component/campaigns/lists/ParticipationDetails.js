import { useSelector, useDispatch } from "react-redux";
import Participation from "../items/Participation";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { callGetDonationByCampaignCodeAPI } from "../../../apis/DonationAPI";

function ParticipationDetails() {
    const participation = useSelector(state => state.donationReducer);
    const campaignCode = useParams();
    const dispatch = useDispatch();
    const itemsPerPage = 10;
    const pageInfo = participation;
    const participationList = participation.results ? participation.results.campaign : "";

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }
    useEffect(
        () => {
            setStart((currentPage - 1) * 5);
            dispatch(callGetDonationByCampaignCodeAPI({
                campaignCode: campaignCode.campaignCode,
                currentPage: currentPage
            }));
        }
        , [dispatch]
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = participationList && participationList.length > 0 ? participationList.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalItems = participationList && participationList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    // participation.map(participation => <Participation key={participation.donationCode}  participation={participation}/>

    return (
        participationList && (
            <>
                <h2 className="my-1" >참여 내역</h2>
                {participationList && participationList.length > 0 ? (currentItems.map((participation) => (

                        <Participation key={participation ? participation.donationCode : ''} participation={participation} />

                    

                ))) : (
                    <tr className="text-center">
                        <td colSpan={5}>참여 내역이 없습니다!</td>
                    </tr>
                )}
                <div>
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
                </div>
            </>
        )
    );
}

export default ParticipationDetails;







