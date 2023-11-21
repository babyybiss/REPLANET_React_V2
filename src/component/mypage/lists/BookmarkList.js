import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";
import { getBookmarkList } from "../../../apis/BookmarkAPI";

function BookmarkList() {
    // 토큰 정보 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const memberCode = decodedToken.memberCode;

    const dispatch = useDispatch();
    const headers = {
            Authorization: token,
            "Content-type": "multipart/form-data charset=utf-8",
            Accept: "*/*",
            //Authorization: "Bearer " + window.localStorage.getItem("accessToken")
    };
    useEffect(
        ()=>{
            dispatch(getBookmarkList({memberCode}))
        },[]
    )

    // 북마크 삭제
    const deleteBookmark = (id, campaignCode) => {
        //dispatch(DeleteBookmark(id,campaignCode))
    };

    return (
        <>
            <div className="admin-main">
                <div className="admin-title">
                    <h5>
                        북마크 컴포넌트 테스트
                    </h5>
                </div>
                <div className='admin-title total-amount'>
                    <div>
                        <span className="pay-color-gray">북마크 클릭 시 해당 캠페인으로 이동합니다.</span>
                    </div>
                    <div style={{ padding: 20 }}>
                        <span>총 관심 기부 개수 : </span>
                        <span className="pay-color-green">0개</span>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>순번</th>
                            <th>캠페인 이름</th>
                            <th>단체</th>
                            <th>캠페인 등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><input type="checkbox" />
                            <td>테스트</td>
                            <td>테스트</td>
                            <td>테스트</td>
                            <td>테스트</td>
                        </tr>
                        <tr>
                            <td colSpan={6}>비어있음</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default BookmarkList;