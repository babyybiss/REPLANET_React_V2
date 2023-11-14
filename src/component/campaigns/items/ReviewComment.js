import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { callGetReviewComments } from "../../../apis/ReviewAPI";
import commentStyles from "../../../assets/css/comment.css"

export function ReviewComment ({review}) {
    const dispatch = useDispatch();

    const reviewCode = review.reviewCode;
    console.log("reviewCode is? : ", reviewCode);

    useEffect(
        () => {
            dispatch(callGetReviewComments(reviewCode));
        }
    );

    const handleInputChange = (e) => {
        e.preventDefault();
    }

    const handleDeleteComment = (e) => {
        e.preventDefault();
    }

    return (
        <ul id="comment" className={commentStyles.commentList}>
          <li>
            <input type="checkbox"></input>
            <i></i>
            <h2>댓글 {}</h2>
    
            <div className={commentStyles.commentContainer} onClick={(e) => e.stopPropagation()}>
              <p>
                <h5>nickname</h5>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
                debitis iusto voluptatum doloribus rem, qui nesciunt labore tempore
                fugit iste deserunt incidunt error provident repudiandae laudantium quo
                ipsa unde perspiciatis, nihil autem distinctio! Deserunt, aspernatur.
              </p>
              <p>
                writtenDate <button onClick={handleDeleteComment}>삭제</button>
              </p>
              <hr />
            </div>
                <p><input className="commentInput commentI" type="text" placeholder="댓글을 입력해주세요 ❤️"></input><button className="button button-primary" type="submit">댓글등록</button></p>
            </li>    
        </ul>
      );
      
}