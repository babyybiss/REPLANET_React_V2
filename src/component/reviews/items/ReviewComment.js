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
import Swal from "sweetalert2";
import { format, parseISO } from 'date-fns';

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

    const handleCommentSubmit = async (e) => {
      e.preventDefault();
      dispatch(callPostReviewComment({ form: formData, reviewCode }));
      dispatch(callGetReviewComments(reviewCode));
      setForm({
        ...form,
        revCommentContent: '',
      });
      Swal.fire({
        icon: 'success',
        title: '댓글 등록 완료!',
        confirmButtonColor: '#1D7151',
        iconColor: '#1D7151'
      }).then((result) => {
        if(result.isConfirmed) {
          window.location.reload();
        }
      })
    }

    const handleModifyComment = (e, revCommentCode, existingCommentContent) => {
      setModify(true);
      setCommentBeingModified(revCommentCode);
      setCommentState(existingCommentContent);
    }

    const handleDeleteComment = async (e, revCommentCode) => {
      e.preventDefault();
    
      if (decodedToken && decodedToken.memberRole === 'ROLE_ADMIN') {
        dispatch(callputMonitoredComment(reviewCode, revCommentCode));
        Swal.fire({
          icon: 'success',
          title: '해당 댓글 숨김 완료!',
          confirmButtonColor: '#1D7151',
          iconColor: '#1D7151'
        }).then((result) => {
          if(result.isConfirmed) {
            window.location.reload();
          }
        })
      } else {
        dispatch(callDeleteReviewComment(revCommentCode, reviewCode));
        Swal.fire({
          icon: 'success',
          title: '해당 댓글 삭제 완료!',
          confirmButtonColor: '#1D7151',
          iconColor: '#1D7151'
        }).then((result) => {
          if(result.isConfirmed) {
            window.location.reload();
          }
        })

      }
      dispatch(callGetReviewComments(reviewCode));
    };

    const handleSubmitModifiedComment = async (revCommentCode, memberCode, reviewCode) => {
      const formData = new FormData();
      formData.append('revCommentContent', commentState);
      formData.append('memberCode', memberCode);
      formData.append('revCommentCode', revCommentCode);
      formData.append('reviewCode', reviewCode);
    
      dispatch(callPutSpecificCommentModify({ form: formData }));
      dispatch(callGetReviewComments(reviewCode));
      setModify(false);
      setCommentBeingModified(null);

      Swal.fire({
        icon: 'success',
        title: '댓글 수정 완료!',
        confirmButtonColor: '#1D7151',
        iconColor: '#1D7151'
      }).then((result) => {
        if(result.isConfirmed) {
          window.location.reload();
        }
      })
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

  const hideEmailCharacters = (email) => {
    if (email && email.indexOf) {
      const atIndex = email.indexOf('@');
      if (atIndex !== -1) {
        const visiblePrefix = email.length > 4 ? email.substring(0, 4) : '***';
        const hiddenSuffix = '*'.repeat(email.length - 4 - atIndex);
        return visiblePrefix + hiddenSuffix + email.substring(atIndex);
      }
      return email;
    }
    return '';
  };



  return (
    <ul id="comment" className={commentStyles.commentList}>
      <li>
        <input type="checkbox"></input>
        <i className="fa-solid fa-plus caret"></i>
        <h2>
        <i className="fa-regular fa-comments"></i>  댓글 {review.reviewCommentList ? review.reviewCommentList.length : 0}
        </h2>

        <div className="m-21" onClick={(e) => e.stopPropagation()}>
        {review.reviewCommentList && review.reviewCommentList.map(comment => (
          <div key={comment.revCommentCode}>
            <div className="flexing">
              <div className="commentWidth">
                {commentBeingModified === comment.revCommentCode ? (
                // If the comment is being modified, show the input
                <p className="w-100">
                  <h5>{decodedToken.email}</h5>
                  <div className="input-group">
                  <textarea
                    type="text"
                    name="commentState"
                    value={commentState}
                    className="commentI textarea"
                    onChange={(e) => setCommentState(e.target.value)}
                  />
                  <button 
                    className="button-primary p-1" 
                    style={{borderTopRightRadius: "0.25rem", borderBottomRightRadius: "0.25rem"}}
                    onClick={() => handleSubmitModifiedComment(comment.revCommentCode, comment.memberCode, comment.reviewCode)}
                    >
                    등록
                  </button>
                  </div>
                </p>
              ) : (
                // Otherwise, show the comment details
                <>
                 {/* <h5>{comment.memberCode}</h5> */}

                  {comment.revCommentMonitorized === "Y" ? (
                    <>
                    <h5>{hideEmailCharacters(commentEmail[comment.memberCode])}</h5>
                    <p style={{color: "#1D7151", fontWeight: 'bold'}}>부적절한 표현을 감지하여 리플래닛 클린봇에 의해 숨겨진 댓글입니다.</p><br/>
                    {format(parseISO(comment.revCommentDate), 'yyyy-MM-dd')}
                    </>
                  ) : (
                    <>
                    <h5>{hideEmailCharacters(commentEmail[comment.memberCode])}</h5>
                    <p>{comment.revCommentContent}</p><br/>
                    {format(parseISO(comment.revCommentDate), 'yyyy-MM-dd')}
                    </>

                  )}
                  
                </>
              )}
            </div>
            {commentBeingModified && decodedToken && (decodedToken.memberRole === "ROLE_ADMIN" || decodedToken.memberCode === comment.memberCode) && (
  <span className="mt-1">
  </span>
)}

{!commentBeingModified && decodedToken && (decodedToken.memberRole === "ROLE_ADMIN" || (decodedToken.memberRole === "ROLE_USER" && decodedToken.memberCode === comment.memberCode)) && (
  <>
    {comment.revCommentMonitorized === "Y" ?
      (
        <span>
          <button className="button1 button-danger w-5" onClick={(e) => handleDeleteComment(e, comment.revCommentCode)}>
            삭제
          </button>
        </span>
      )
      :
      (decodedToken.memberRole === "ROLE_ADMIN" ?
        <span>
          <button className="button1 button-danger w-5" onClick={(e) => handleDeleteComment(e, comment.revCommentCode)}>
            숨김
          </button>
        </span>
        :
        <>
          <span>
            <button className="button1 button-danger w-5" onClick={(e) => handleDeleteComment(e, comment.revCommentCode)}>
              삭제
            </button>
          </span>
          <span>
            <button className="button1 button-primary w-5" onClick={(e) => handleModifyComment(e, comment.revCommentCode, comment.revCommentContent)}>
            수정
          </button>
          </span>
        </>
      )
    }
  </>
)}
    </div>
    <hr />
  </div>
))}
        </div>
        {decodedToken && decodedToken.memberCode !== undefined && decodedToken.memberRole == "ROLE_USER" ? (
            <form onSubmit={handleCommentSubmit} className="m-21">
              <p className="w-100">
              <div className="input-group">
                <textarea
                className="commentI textarea"
                  name="revCommentContent"
                  type="text"
                  placeholder={review.reviewCommentList ? "댓글을 입력해 주세요!" : "따뜻한 한마디로 첫 응원자가 되어 보세요!"}
                  onChange={onChangeHandler}
                  required
                />
                <button className="button-primary p-1" type="submit" style={{borderTopRightRadius: "0.25rem", borderBottomRightRadius: "0.25rem"}}>댓글등록</button>
              </div>
              </p>
            </form>
              ) : ( 
                (decodedToken?.memberRole == "ROLE_ORG" || decodedToken?.memberRole == "ROLE_ADMIN"?  
                <form className="m-21">
                  <p className="w-100">
                    <textarea
                      className="commentDisable textarea w-100"
                      type="text"
                      placeholder="일반 회원만 댓글을 작성할 수 있습니다."
                      disabled
                    />
                  </p>
                </form>
                :
                <form className="m-21">
                  <p className="w-100">
                  <textarea
                    className="commentDisable textarea w-100"
                    type="text"
                    placeholder="로그인 후 이용 가능한 서비스입니다."
                    disabled
                  />
                  </p>
                </form>
                ))} 
      </li>    
    </ul>
  );
}
