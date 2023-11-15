import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callGetSpecificReviewAPI } from "../../apis/ReviewAPI";
import { TextEditor } from "../../component/reviews/items/TextEditor.js";
import { callPostReview } from "../../apis/ReviewAPI";
import axios from "axios";

export function ReviewRegist() {
    const { campaignCode } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const result = useSelector(state => state.reviewReducer);
    const review = result.review;
    
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewThumbnail, setReviewThumbnail] = useState('');
    const [convertedContent, setConvertedContent] = useState(null);
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('');
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

        setImage(image);
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

        console.log('[Review Registration] formData : ', formData.get("reviewTitle"));
        console.log('[Review Registration] formData : ', formData.get("description"));
        console.log('[Review Registration] formData : ', formData.get("campaignCode"));
        console.log('[Review Registration] formData : ', formData.get("imageFile"));

        console.log("뭐징ㅇㅇㅇㅇ: ", formData)
        dispatch(callPostReview({
            form: formData
        }));

                                                                                                       alert('리뷰 목록으로 이동합니다.');
        navigate('/reviews');
        window.location.reload();
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
        dispatch(callGetSpecificReviewAPI(campaignCode));
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

    const uploadImageCallback = (file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8eac554d5b85e96');
    
            const data = new FormData();
            data.append('image', file);
    
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                
                if (xhr.status === 429) {
                    // Handle rate limiting, add a delay and retry
                    setTimeout(() => {
                        uploadImageCallback(file).then(resolve).catch(reject);
                    }, 1000); // Adjust the delay time as needed
                } else {
                    console.log(response);
                    resolve({ data: { link: response.data.link } });
                }
            });
    
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                console.log(error);
                reject(error);
            });
    
            xhr.send(data);
        });
    };
    
    


    return (
        <>
            <div className="container-first">
                    <h1 className="py-3 container-centered">캠페인 후기 등록</h1>
                    <h5 className="container-centered">{review && result.review.orgName}</h5>
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

                        <button 
                            onClick={ onClickImageUpload }
                            className="button button-primary"
                        >이미지 업로드
                        </button>
                        </div>
                    </div>

                    {/* Pass the callback function to TextEditor */}
                    <TextEditor onContentChange={handleContentChange} uploadImageCallback={uploadImageCallback}/>
                    <button
                        onClick={ () => navigate(-1)}
                        className="button button-primary m-1"
                    >
                        돌아가기
                    </button>
                   
                    <button
                        onClick={ onClickReviewRegistrationHandler }
                        className="button button-primary"
                    >
                            리뷰 등록
                    </button>
            </div>
        </>
    );
}