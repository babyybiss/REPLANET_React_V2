import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { getBookmarkList, DeleteAllBookmarksAPI } from "../../../apis/BookmarkAPI";
import Bookmark from "../items/Bookmark";
import Swal from "sweetalert2";
function BookmarkList() {
    const dispatch = useDispatch();
    // 토큰 정보 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    let memberCode = decodedToken.memberCode;

    // 북마크 리스트 정보
    const bookmark = useSelector(state => state.bookmarkReducer.bookmark)
    const [checkItems, setCheckItems] = useState([]);

    // 북마크 삭제
    const deleteBookmark = () => {
        if (checkItems.length === 0) {
            Swal.fire({
                icon: "error",
                title: "삭제 불가!",
                text: "선택된 북마크가 없습니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인',
            })
            return
        } else {

            Swal.fire({
                icon: "question",
                title: "북마크 삭제",
                text: "해당 북마크를 삭제하시겠습니까?",
                showCancelButton: true,
                confirmButtonColor: '#1D7151',
                cancelButtonColor: '#1D7151',
                confirmButtonText: '승인',
                cancelButtonText: '취소'
            }).then(result => {
                if (result.isConfirmed) {
                    dispatch(DeleteAllBookmarksAPI({ bookmarkCode: checkItems })).then( () => {
                        dispatch(getBookmarkList(memberCode))
                        setCurrentPage(1);
                    })
                }
            }
            );
        }

    };
    // 체크박스 단일

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

    useEffect(
        () => {
            dispatch(getBookmarkList(memberCode))
        }, [currentPage]
    )

    const isCheckedHandler = () => {
        if (checkItems.length === 0){
            return false
        }
        return checkItems.length === currentItems.length ? true : false
    }
    return (
        <>
            <div className="admin-main">
                <div className="admin-title">
                    <h1 className="text-primary">
                        북마크 리스트
                    </h1>
                </div>
                <div className='admin-title total-amount'>
                    <div>
                        <span className="pay-color-gray">북마크 클릭 시 해당 캠페인으로 이동합니다.</span>
                    </div>
                    <div style={{ padding: 20 }}>
                        <span>총 관심 기부 갯수 : </span>
                        <span className="pay-color-green">{totalItems}개</span>
                    </div>
                </div>
                <table class="mb-1">
                    <thead>
                        <tr>
                            <th>
                                <label >
                                    <input type="checkbox"
                                        onChange={(e) => onCheckAll(e.target.checked)}
                                        
                                        checked={isCheckedHandler()}
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
                            currentItems.map((bookmark, index) =>
                                <Bookmark 
                                index={index + (currentPage - 1) * itemsPerPage}
                                key={bookmark.bookmarkCode} id={bookmark.bookmarkCode}
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
                <button onClick={deleteBookmark} className="button button-primary">선택삭제</button>
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
    );
};

export default BookmarkList;