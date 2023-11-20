import { useEffect } from "react";
import { useDispatch,  useSelector } from "react-redux";
import { callGetReviewComments } from "../../../apis/ReviewAPI";
import commentStyles from "../../../assets/css/comment.css"
import { useState } from "react";
import { callPostReviewComment } from "../../../apis/ReviewAPI";
import moment from 'moment';
import comment from "../../../assets/images/review/comment.png"
import { callDeleteReviewComment } from "../../../apis/ReviewAPI";
import { jwtDecode } from 'jwt-decode';
import { callPutSpecificCommentModify } from "../../../apis/ReviewAPI";
import { useNavigate } from "react-router-dom";
import { callputMonitoredComment } from "../../../apis/ReviewAPI";

export function ReviewComment ({ review }) {

  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;

  console.log('Decoded Token:', decodedToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ revCommentContent, setRevCommentContent ] = useState('');
    const [ modify, setModify ] = useState(false);
    const [commentBeingModified, setCommentBeingModified] = useState(null);
    const [ commentState, setCommentState ] = useState(review.reviewCommentList ? review.reviewCommentList.revCommentContent : '');
    const comments = useSelector((state) => state.reviewReducer.comments);
    const [ hiddenStatus, setHiddenStatus ] = useState('N')
    const [commentEmail, setCommentEmail] = useState({});
    const reviewCode = review.reviewCode;


    const [form, setForm] = useState({
      revCommentContent: '',
      memberCode: decodedToken && decodedToken.memberCode,
    })
    

    console.log("reviewCode is? : ", reviewCode);

    console.log('is review in reviewComments? : ', review);
    
    const formData = new FormData();

    formData.append("revCommentContent", form.revCommentContent);
    formData.append("memberCode", decodedToken && decodedToken.memberCode);

    console.log("comment is???: ", revCommentContent)

    const handleCommentSubmit = (e) => {

        e.preventDefault();
        dispatch(callPostReviewComment({
          form: formData,
          reviewCode
        }));
        window.location.reload();
    };

    const handleModifyComment = (e, revCommentCode, existingCommentContent) => {
      setModify(true);
      setCommentBeingModified(revCommentCode);
      setCommentState(existingCommentContent);
    }

    const handleDeleteComment = (e, revCommentCode) => {

      if(decodedToken && decodedToken.memberRole === "ROLE_ADMIN") {
        dispatch(callputMonitoredComment(reviewCode, revCommentCode));
      } else {
        e.preventDefault();
        const reviewCode = review.reviewCode;
        console.log(revCommentCode);
        console.log(reviewCode);
        dispatch(callDeleteReviewComment(revCommentCode, reviewCode));
        window.location.reload();
    }
  }

    const handleSubmitModifiedComment = (revCommentCode, memberCode, reviewCode) => {
      console.log("what comment will be modified? : ", revCommentCode);
      console.log("what has the comment been modified to? : ", commentState);

      const formData = new FormData();

      formData.append("revCommentContent", commentState);
      formData.append("memberCode", memberCode);
      formData.append("revCommentCode", revCommentCode);
      formData.append("reviewCode", reviewCode);

      console.log('[Comment modify] formData : ', formData.get("revCommentContent"));
      console.log('[Comment modify] formData : ', formData.get("memberCode"));
      console.log('[Comment modify] formData : ', formData.get("revCommentCode"));
      console.log('[Comment modify] formData : ', formData.get("reviewCode"));

      dispatch(callPutSpecificCommentModify({
        form: formData
      }));

      window.location.reload();
    }

    const onChangeHandler = (e) => {
      setForm({
          ...form,
          [e.target.name] : e.target.value,
          memberCode: comment.memberCode,
      });
  };

  const endDate = moment(review.reviewCommentList ? review.reviewCommentList.revCommentDate : null).format('YYYY-MM-DD');


  const NavigateToLoginPageHandler = () => {
    navigate('/login')
  }

  useEffect(() => {
    const fetchCommentEmail = async () => {
      const emailPromises = review.reviewCommentList.map(async (comment) => {
        try {
        const response = await fetch(`/reviews/getEmailByMemberCode/${comment.memberCode}`);

        if( response.ok ) {
          if(response.headers.get('content-type') && response.headers.get('content-type').includes('application/json')) {
          const data = await response.json();
          return { memberCode: comment.memberCode, email: data };
        } else {
          const data = await response.text();
          return { memberCode: comment.memberCode, email: data };
        }
      } else {
        console.error(`Error fetching email for memberCode ${comment.memberCode}: ${response.statusText}`);
        return { memberCode: comment.memberCode, email: 'Error fetching email' };
      }
    } catch (error) {
      console.error(`Error fetching email for memberCode ${comment.memberCode}: ${error.message}`);
      return { memberCode: comment.memberCode, email: 'Error fetching email' };
    }
  });


    try{ 
      const emails = await Promise.all(emailPromises);
      const emailMap = {};
      emails.forEach(({ memberCode, email }) => {
        emailMap[memberCode] = email;
      });

      setCommentEmail(emailMap);
    } catch ( error ) {
      console.error(`Error fetching comments' emails: ${error.message}`);
    }
    };

    if (review.reviewCommentList) {
      fetchCommentEmail();
    }
  }, [review.reviewCommentList]);

  console.log("emails?????/",commentEmail[3]);

  return (
    <ul id="comment" className={commentStyles.commentList}>
      <li>
        <input type="checkbox"></input>
        <i></i>
        <h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="24"
              viewBox="0 0 26 24"
              fill="none"
              style={{ transform: 'translateY(4px)' }}
            >
            <path d="M13 24C12.1656 24 11.3795 23.6104 10.8233 22.9314L9.0093 20.705C8.97302 20.6605 8.82791 20.6048 8.76744 20.5937H8.16279C3.12 20.5937 0 19.3358 0 13.0798V7.51391C0 2.59369 2.81767 0 8.16279 0H17.8372C23.1823 0 26 2.59369 26 7.51391V13.0798C26 18 23.1823 20.5937 17.8372 20.5937H17.2326C17.1358 20.5937 17.0512 20.6382 16.9907 20.705L15.1767 22.9314C14.6205 23.6104 13.8344 24 13 24ZM8.16279 1.66976C3.83349 1.66976 1.81395 3.52876 1.81395 7.51391V13.0798C1.81395 18.1113 3.68837 18.9239 8.16279 18.9239H8.76744C9.38419 18.9239 10.0856 19.2468 10.4605 19.7032L12.2744 21.9295C12.6977 22.4416 13.3023 22.4416 13.7256 21.9295L15.5395 19.7032C15.9386 19.2134 16.5674 18.9239 17.2326 18.9239H17.8372C22.1665 18.9239 24.186 17.0649 24.186 13.0798V7.51391C24.186 3.52876 22.1665 1.66976 17.8372 1.66976H8.16279Z" fill="#10573C"/>
            <path d="M12.9998 11.9666C12.3226 11.9666 11.7905 11.4657 11.7905 10.8534C11.7905 10.2412 12.3347 9.74025 12.9998 9.74025C13.6649 9.74025 14.2091 10.2412 14.2091 10.8534C14.2091 11.4657 13.677 11.9666 12.9998 11.9666Z" fill="#10573C"/>
            <path d="M17.8372 11.9666C17.16 11.9666 16.6279 11.4657 16.6279 10.8534C16.6279 10.2412 17.1721 9.74025 17.8372 9.74025C18.5023 9.74025 19.0465 10.2412 19.0465 10.8534C19.0465 11.4657 18.5144 11.9666 17.8372 11.9666Z" fill="#10573C"/>
            <path d="M8.16243 11.9666C7.48522 11.9666 6.95312 11.4657 6.95312 10.8534C6.95312 10.2412 7.49731 9.74025 8.16243 9.74025C8.82754 9.74025 9.37173 10.2412 9.37173 10.8534C9.37173 11.4657 8.83964 11.9666 8.16243 11.9666Z" fill="#10573C"/>
            </svg>  댓글 {review.reviewCommentList ? review.reviewCommentList.length : 0}
        </h2>

        <div className="m-21" onClick={(e) => e.stopPropagation()}>
        {review.reviewCommentList && review.reviewCommentList.map(comment => (
          <div key={comment.revCommentCode}>
            <div className="m-3 flexing">
              <div className="commentWidth">
                {commentBeingModified === comment.revCommentCode ? (
                // If the comment is being modified, show the input
                <p className="w-100">
                  <h5>{comment.memberCode}</h5>
                  <input
                    type="text"
                    name="commentState"
                    value={commentState}
                    className="commentInput commentI"
                    onChange={(e) => setCommentState(e.target.value)}
                  />
                </p>
              ) : (
                // Otherwise, show the comment details
                <>
                 {/* <h5>{comment.memberCode}</h5> */}
                  <h5>{commentEmail[comment.memberCode]}</h5>
                  {comment.revCommentMonitorized === "Y" && (
                    <h6>관리자에 의해 삭제 된 댓글 입니다.</h6>
                  )}
                  <h6>{comment.revCommentContent}</h6>
                  {endDate}
                </>
              )}
            </div>
            { ( commentBeingModified && decodedToken && (decodedToken.memberRole === "ROLE_ADMIN" || decodedToken.memberCode === comment.memberCode)) && (
              <span className="mt-1">
                <button onClick={() => handleSubmitModifiedComment(comment.revCommentCode, comment.memberCode, comment.reviewCode)} className="button1 button-primary w-5">
                  등록
                </button>
              </span>
            )}
              { (!commentBeingModified && decodedToken && (decodedToken.memberRole === "ROLE_ADMIN" || decodedToken.memberRole === "ROLE_USER" && decodedToken.memberCode === comment.memberCode)) && (
                <>
                  <span>
                    <button className="button1 text-danger w-5" onClick={(e) => handleDeleteComment(e, comment.revCommentCode)}>
                      삭제
                    </button>
                  </span>
                  {decodedToken.memberRole === "ROLE_USER" &&  (decodedToken.memberCode === comment.memberCode) && (
                    <span>
                      <button className="button1 text-danger w-5" onClick={(e) => handleModifyComment(e, comment.revCommentCode, comment.revCommentContent)}>
                      수정
                      </button>
                    </span>
                  )}
                </>
              )}
        

    </div>
    <hr />
  </div>
))}
        </div>
        {decodedToken && decodedToken.memberCode !== undefined  ? (
            <form onSubmit={handleCommentSubmit} className="m-21">
              <p className="w-100">
                <input
                  className="commentInput commentI"
                  name="revCommentContent"
                  type="text"
                  placeholder={review.reviewCommentList ? "댓글을 입력해주세요 ❤️" : "따뜻한 한마디로 첫 응 원자가 되어보세요 ❤️"}
                  onChange={onChangeHandler}
                  required
                />
                <button className="button-primary v-5 rounded" type="submit">댓글등록</button>
              </p>
            </form>
              ) : (
                <form className="m-21">
                <p className="w-100">
                <input
                  className="commentDisable"
                  type="text"
                  placeholder="로그인 후 이용 가능한 서비스입니다."
                  onClick={NavigateToLoginPageHandler}
                />
              </p>
              </form>
              )}
        
      </li>    
    </ul>
  );
}
