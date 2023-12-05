import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { AddBookmarkAPI, DeleteBookmarkAPI, getBookmarkList } from "../../../apis/BookmarkAPI";
import { useEffect } from "react";
import { GET_BOOKMARK_STATUS } from "../../../modules/BookmarkModule";
import Swal from 'sweetalert2';

function HeartBar({ campaignCode }) {
    // 토큰 정보 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    // 캠페인 정보
    const dispatch = useDispatch();

    // 북마크 
    const bookmarkResult = useSelector(state => state.bookmarkReducer.bookmark)
    const [like, setLike] = useState(0);

    const bookmark = bookmarkResult && bookmarkResult.results.bookmarkList;
    useEffect(() => {
        // 사용자가 로그인한 경우에만 찜목록을 불러오도록
        if (token) {
            dispatch(getBookmarkList(decodedToken.memberCode))
        }
    }, [token]);

    // 북마크 추가
    const addBookmark = (memberCode, campaignCode) => {
        dispatch(AddBookmarkAPI({ memberCode, campaignCode }))
    };
    // 북마크 삭제
    const deleteBookmark = (memberCode, campaignCode) => {
        dispatch(DeleteBookmarkAPI(memberCode, campaignCode))
    };

    //하트 누르기
    const clickedToggle = () => {
        if (token) {

            if (like === 0) {
                addBookmark(decodedToken.memberCode, campaignCode);
                setLike(1);
            } else if (like === 1) {
                deleteBookmark(decodedToken.memberCode, campaignCode);
                setLike(0);
            }
            dispatch({ type: GET_BOOKMARK_STATUS, payload: 1 });
        } else {
            Swal.fire({
                icon: "error",
                title: "로그인 후 이용 가능합니다!",
                text: "북마크 기능은 로그인 후 이용해주시기 바랍니다.",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인',
                })
        }
    };

    function matchCampaign(campaignCode) {
        for (let i = 0; i < bookmark.length; i++) {
            if (bookmark[i].campaignCode.campaignCode == campaignCode) {
                return setLike(1)
            }
        }
        return setLike(0)
    }

    // 렌더링시 하트 표시하기
    useEffect(() => {
        bookmark && (
            matchCampaign(campaignCode)
        );

    }, [bookmark])

    return (
        /*<img
            className=""
            style={{ width: 28, height: 28 }}
            alt="#"
            src={
                like === 1
                    ? "/campaigns/default/checked.png"
                    : "/campaigns/default/unChecked.png"
            }
            onClick={clickedToggle}
        />*/
        <>




<div className={

like === 1
                ? "input-group campaignbtn1"
                : "input-group campaignbtn3"
        } onClick={clickedToggle}>
<input type="text" placeholder='북마크' style={{ cursor: "pointer" + "!important" }} readOnly className={
            like === 1
                ? "input border-danger bg-danger"
                : "input border-danger"
        } />

<button  className={
            like === 1
                ? "button button-danger"
                : "button button-danger-outline"
        }> <i className={
            like === 1
                ? "fa-solid fa-heart"
                : "fa-regular fa-heart"
        }
        >
    </i></button>


</div>


        </>

    );
}

export default HeartBar;