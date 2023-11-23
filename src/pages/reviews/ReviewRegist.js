import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callGetSpecificCampaignAPI } from "../../apis/ReviewAPI";
import { TextEditor } from "../../component/reviews/items/TextEditor.js";
import { callPostReview } from "../../apis/ReviewAPI";
import axios from "axios";

export function ReviewRegist() {
    const { campaignCode } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const result = useSelector(state => state.reviewReducer.campaign);
   // const review = result.review;


    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewThumbnail, setReviewThumbnail] = useState('');
    const [convertedContent, setConvertedContent] = useState(null);
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const maxSizeInBytes = 1048576; // 1 MB
    const imageInput = useRef();

    const [form, setForm] = useState({
        reviewTitle: '',
        reviewDescription: '',
        reviewCampaignCode: 0,
    });

    useEffect (
        () => {
            if(image) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if( result ) {
                        setImageUrl(result);
                    }
                }
                fileReader.readAsDataURL(image);
            }


        },
        [image]
    );

    const onChangeImageUpload = (e) => {
        const image = e.target.files[0];

        if(image.size > maxSizeInBytes) {
            window.alert("이미지 용량이 1MB를 초과합니다.")
            return;
        } else (
            setImage(image)
        );
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const onClickReviewRegistrationHandler = () => {
        console.log('[Review Registration] onClickReviewRegistrationHandler');
        
        const formData = new FormData();

        formData.append("reviewTitle", form.reviewTitle);
        formData.append("description", form.reviewDescription);
        formData.append("campaignCode", form.campaignCode);

        if(image) {
            formData.append("imageFile", image);
        }

        console.log("image?!?!?!? : ", image);


        console.log('[Review Registration] formData : ', formData.get("reviewTitle"));
        console.log('[Review Registration] formData : ', formData.get("description"));
        console.log('[Review Registration] formData : ', formData.get("campaignCode"));
        console.log('[Review Registration] formData : ', formData.get("imageFile"));

        if(formData.get("reviewTitle") == "" || formData.get("description") == "") {
            window.alert("입력안하니");
            return;
        } else if(formData.get("imageFile") == undefined) {
            window.alert("파일 업로드 바랍니다.");
            return;
        } else {
            console.log("뭐징ㅇㅇㅇㅇ: ", formData)
            dispatch(callPostReview({
            form: formData
            }));                                                                                                
            alert('리뷰 목록으로 이동합니다.');
            navigate('/reviews');
            //window.location.reload();
        }
    }

    // Callback function to receive HTML content from TextEditor
    const handleContentChange = (htmlContent) => {
        setConvertedContent(htmlContent);

        setForm({
            ...form,
            reviewDescription: convertedContent
        });
    };


    useEffect(() => {
        dispatch(callGetSpecificCampaignAPI(campaignCode));
        setForm({
            ...form,
            campaignCode: campaignCode
        });
    }, [campaignCode]);
    console.log("what is this!??!?!?!?! :" , campaignCode)

    
   /* const submitReview = (event) => {
        event.preventDefault();
        console.log('hihihihihihi!');

        const campaignCode = result.review.campaignCode;

        dispatch(callPostReview(reviewTitle, convertedContent, campaignCode));
        navigate('/reviews');
    } */

    console.log("(reviewRegist) result? : ", result);

   /* const uploadImageCallback = (file) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://api.imgur.com/3/image');
          xhr.setRequestHeader('Authorization', 'Client-ID ce9fbcd31155140');
      
          const data = new FormData();
          data.append('image', file);
      
          xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
      
            if (response.success) {
              const imageUrl = response.data.link;
              console.log('Resolved Image URL:', imageUrl);
              resolve({ data: { link: imageUrl } });
              console.log("fuuuuuck: ",data.link);
            } else {
              // Reject with an error message
              reject({ error: 'Failed to upload image' });
            }
          });
      
          xhr.addEventListener('error', () => {
            const error = JSON.parse(xhr.responseText);
            console.log(error);
            reject(error);
          });
      
          xhr.send(data);
        });
      };*/
      
      
      
    
    
    console.log("did the campaign come: ", result);

    return (
        <>
            <div className="container-first">
                    <h1 className="py-3 container-centered">캠페인 후기 등록</h1>
                    <h5 className="container-centered">{result && result.orgName}</h5>
                    <div className="text-center">
                        <input 
                            type="text" 
                            //value={reviewTitle} 
                            name="reviewTitle"
                            className="searchbar" 
                            placeholder="제목을 입력해주세요" 
                            onChange={ onChangeHandler }
                            required
                        />
                            <br />
                        
                        <div>
                            { imageUrl && <img
                                src={ imageUrl }
                                alt="preview"
                            />}
                        <input 
                            style={ { display: 'none' }}
                            type="file" 
                            name="reviewThumbnail"
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                            value={reviewThumbnail} 
                            //onChange={(e) => setReviewThumbnail(e.target.value)} 
                            required
                        />
                        <br/>
                        <button 
                            onClick={ onClickImageUpload }
                            className="button button-primary"
                        >이미지 업로드
                        </button>
                        </div>
                    </div>

                    {/* Pass the callback function to TextEditor */}
                    <TextEditor onContentChange={handleContentChange} />
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button
                            onClick={ () => navigate(-1)}
                            className="button button-primary w-20 m-1"
                        >
                            돌아가기
                        </button>
                    
                        <button
                            onClick={ onClickReviewRegistrationHandler }
                            className="button button-primary w-20 m-1"
                        >
                                리뷰 등록
                        </button>
                    </div>
            </div>
        </>
    );
}