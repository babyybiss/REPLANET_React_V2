import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { callGetReviewComments } from "../../../apis/ReviewAPI";

export function ReviewComment ({review}) {
    const dispatch = useDispatch();

    const reviewCode = review.reviewCode;
    console.log("reviewCode is? : ", reviewCode);

    useEffect(
        () => {
            dispatch(callGetReviewComments(reviewCode));
        }
    );

    return (
        <ul>
            <li>
            <input type="checkbox"></input>
            <i></i>
            <h2>댓글 {}</h2>
                <p><h5>nickname</h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae debitis iusto voluptatum doloribus rem, qui nesciunt labore tempore fugit iste deserunt incidunt error provident repudiandae laudantium quo ipsa unde perspiciatis, nihil autem distinctio! Deserunt, aspernatur.</p>
                <p>writtenDate <button>삭제</button></p>
            </li>
        </ul>
    );
}