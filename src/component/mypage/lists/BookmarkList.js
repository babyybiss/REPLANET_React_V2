import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { getBookmarkList, DeleteAllBookmarksAPI } from "../../../apis/BookmarkAPI";

import Bookmark from "../items/Bookmark";

function BookmarkList() {
    // 토큰 정보 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    let memberCode = decodedToken.memberCode;

    // 북마크 리스트 정보
    const bookmark = useSelector(state => state.bookmarkReducer.bookmark)

    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(getBookmarkList(memberCode))
        }, []
    )
    // 북마크 삭제
    const deleteBookmark = () => {
        dispatch(DeleteAllBookmarksAPI({bookmarkCode:checkItems }))
    };
    // 체크박스 단일
    const [checkItems, setCheckItems] = useState([]);

    const checkedItemHandler = (id, checked) => {
        let code = parseInt(id)
        if (checked) {
            setCheckItems([...checkItems, code])
        } else {
            setCheckItems(checkItems.filter((bookmark) => bookmark !== code))
        }
    };
    // 체크박스 전체
    const onCheckAll = (checked) => {
        if (checked) {
            // const checkArray = []
            // currentItems.forEach( item => checkArray.push(item.bookmarkCode))
            // setCheckItems(checkArray)
            setCheckItems(currentItems.map((bookmark) => bookmark.bookmarkCode))
        } else {
            setCheckItems([])
        }
    }
    useEffect(() => {
        console.log(checkItems)
    }, [checkItems])


    //페이징
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bookmark && bookmark.length > 0 ? bookmark.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalItems = bookmark ? bookmark.length : '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            setCheckItems([])
        }
    };
    console.log(checkItems,'너 갯수확인하자');

    return (
        <>
            <div className="admin-main">
                <div className="admin-title">
                    <h5>
                        북마크 리스트
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
                            <th>
                                <label >
                                    <input type="checkbox"
                                        onChange={(e) => onCheckAll(e.target.checked)}
                                        checked={checkItems.length === currentItems.length ? true : false}
                                    />
                                </label>
                            </th>
                            <th>순번</th>
                            <th>캠페인 이름</th>
                            <th>단체</th>
                            <th>캠페인 등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmark && bookmark.length > 0 ? (
                            currentItems.map((bookmark) =>
                                <Bookmark key={bookmark.bookmarkCode} id={bookmark.bookmarkCode}
                                    checkedItemHandler={checkedItemHandler}
                                    checked={checkItems.indexOf(bookmark.bookmarkCode) >= 0 ? true : false}
                                    bookmark={bookmark}
                                />)
                        ) :
                            <tr>
                                <td colSpan={6}>비어있음</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <button onClick={deleteBookmark}>선택삭제</button>
                <ul className="pagination">
                    <li className="icon" onClick={() => handlePageChange(currentPage - 1)}><a><span className="fas fa-angle-left">&lt;</span></a></li>
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
            </div>
        </>
    );
};

export default BookmarkList;