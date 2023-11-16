import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { callGetReviewComments } from "../../../apis/ReviewAPI";
import commentStyles from "../../../assets/css/comment.css"
import { useState } from "react";
import { callPostReviewComment } from "../../../apis/ReviewAPI";

export function ReviewComment ({ review, memberCode }) {
  
    const dispatch = useDispatch();
    const [ revCommentContent, setRevCommentContent ] = useState('');
    const reviewCode = review.reviewCode;
    const [form, setForm] = useState({
      revCommentContent: '',
      memberCode: 0,
    })
    
    console.log("reviewCode is? : ", reviewCode);

    useEffect(
        () => {
            //dispatch(callGetReviewComments(reviewCode));
        },[]
    );
    
    const formData = new FormData();

    formData.append("revCommentContent", form.revCommentContent);
    formData.append("memberCode", form.memberCode);

    console.log("comment is???: ", revCommentContent)

    const handleCommentSubmit = (e) => {

        e.preventDefault();
        dispatch(callPostReviewComment({
          form: formData,
          reviewCode
        }))
    };


    const handleDeleteComment = (e) => {
        e.preventDefault();
    }

    const onChangeHandler = (e) => {
      setForm({
          ...form,
          [e.target.name] : e.target.value,
          memberCode: memberCode,
      });
  };

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
            <form onSubmit={handleCommentSubmit}>
                <p>
                  <input 
                  className="commentInput commentI" 
                  name="revCommentContent"
                  type="text" 
                  placeholder="댓글을 입력해주세요 ❤️"
                  onChange={onChangeHandler}
                >
                </input>
                <button className="button button-primary" type="submit">댓글등록</button></p>
            </form>
            </li>    
        </ul>
      );
      
}