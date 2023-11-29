import axios from "axios";
import Swal from 'sweetalert2';
import { postBookmark, getBookmark } from "../modules/BookmarkModule"; 

export const requestURL = 'http://localhost:8001/';

// 북마크 조회 
export function getBookmarkList(memberCode){
    return async (dispatch, getState) => {
        try{
         const result = await axios.get(requestURL+`bookmarks?memberCode=${memberCode}`);
         dispatch(getBookmark(result.data));
        }catch (error) {
            Swal.fire('에러발생',error);
        }
    }
}
//북마크 등록
export function AddBookmarkAPI(bookmark){
    return async (dispatch, getState) => {
        await axios.post(requestURL+'bookmarks',bookmark)
        .then((res) =>{
         //   dispatch(postBookmark(res.data))
        })
        .catch((error) => {
            Swal.fire('에러발생',error);
        })
    }
}

//북마크 삭제
export function DeleteBookmarkAPI(memberCode, campaignCode){
    return async (dispatch, getState) => {
        await axios.delete(requestURL+`bookmarks?memberCode=${memberCode}&campaignCode=${campaignCode}`)
        .then((res) =>{
          //  dispatch(postBookmark(res.data))
        })
        .catch((error) => {
            Swal.fire('에러발생',error);
        })
    }
}
 
//북마크 전체 삭제
export function DeleteAllBookmarksAPI({bookmarkCode}){
    return async (dispatch, getState) => {
        await axios.put(requestURL+'AllBookmarks',bookmarkCode)
        .then((res) =>{
            Swal.fire({
                icon: "success",
                iconColor: '#1D7151',
                title: "삭제가 완료되었습니다!",
                showCancelButton: false,
                confirmButtonColor: '#1D7151',
                confirmButtonText: '확인'
            }).then(result => {
                if(result.isConfirmed){
            }})
            dispatch(postBookmark(res.data))
        })
        .catch((error) => {
            Swal.fire('에러발생',error);
        })
    }
}