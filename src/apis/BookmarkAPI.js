import axios from "axios";
import Swal from 'sweetalert2';
import { postBookmark, getBookmark } from "../modules/BookmarkModule"; 

export const requestURL = 'http://localhost:8001/';

// 북마크 조회 
export function getBookmarkList(memberCode){
    console.log(memberCode,'멤코');

    return async (dispatch, getState) => {
        try{
         const result = await axios.get(requestURL+'bookmarks',memberCode);
         dispatch(getBookmark(result.data));
        }catch (error) {
            Swal.fire('에러발생',error);
        }
    }
}
//북마크 등록
export function AddBookmarkAPI(bookmark){
    console.log(bookmark,'이건등록');
    return async (dispatch, getState) => {
        await axios.post(requestURL+'bookmarks',bookmark)
        .then((res) =>{
            dispatch(postBookmark(res))
        })
        .catch((error) => {
            alert( error,'에러발생')
        })
    }
}

//북마크 삭제
export function DeleteBookmarkAPI(memberCode, campaignCode){
    console.log(memberCode, campaignCode,'이건삭제');
    return async (dispatch, getState) => {
        await axios.delete(requestURL+`bookmarks?memberCode=${memberCode}&campaignCode=${campaignCode}`)
        .then((res) =>{
            console.log(res.data,'너도체크좀222');
            dispatch(postBookmark(res))
        })
        .catch((error) => {
            alert( error,'에러발생')
        })
    }
}