import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { callGetSpecificReviewAPI } from "../../apis/ReviewAPI";
import { useSelector, useDispatch } from "react-redux";
import { TextEditor } from "../../component/reviews/items/TextEditor.js";
import { callPutReview } from "../../apis/ReviewAPI";
import axios from "axios";


export function ReviewModify () {

    const { reviewCode } = useParams();
    const review = useSelector((state) => state.reviewReducer.review);
    const dispatch = useDispatch();
    const navigate = useNavigate();

        useEffect (
        () => { dispatch(callGetSpecificReviewAPI(reviewCode))
    }, [reviewCode])

    console.log(review);
    const existingReviewTitle = review.reviewTitle;

    const existingReviewDescription = review.reviewDescription;

    const [reviewTitle, setReviewTitle] = useState(existingReviewTitle);
    const [reviewContent, setReviewContent] = useState('');
    const [reviewThumbnail, setReviewThumbnail] = useState('');
    const [convertedContent, setConvertedContent] = useState(null);
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();
    const maxSizeInBytes = 1048576; // 1 MB
    
    const [form, setForm] = useState({
        reviewTitle: '',
        reviewDescription: '',
        reviewCode: review.reviewCode,
    });

    useEffect (
        () => {
            if(image) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if(image.size > maxSizeInBytes) {
                        window.alert("이미지 용량이 1MB를 초과합니다.");
                        return;
                    }else if( result ) {
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

        if (e.target.name === "reviewTitle") {
            setReviewTitle(e.target.value);
        };
    };


    const onClickReviewRegistrationHandler = () => {
        console.log('[Review Registration] onClickReviewRegistrationHandler');


        
        const formData = new FormData();
        const reviewCode = review.reviewCode;
        console.log("WHAT IS THE REVIEWCODE", reviewCode)

        formData.append("reviewTitle", form.reviewTitle);
        formData.append("description", form.reviewDescription);
        formData.append("reviewCode", form.reviewCode);

        if(image) {
            formData.append("imageFile", image);
        }

        console.log('[Review Registration] formData : ', formData.get("reviewTitle"));
        console.log('[Review Registration] formData : ', formData.get("description"));
        console.log('[Review Registration] formData : ', formData.get("reviewCode"));
        console.log('[Review Registration] formData : ', formData.get("imageFile"));

        if(formData.get("reviewTitle") === "" || formData.get("description") === "" || formData.get("imageFile") === "") {
            window.alert("모두 입력 바랍니다.");
            return;
        }else {
            console.log("뭐징ㅇㅇㅇㅇ: ", formData)
            dispatch(callPutReview({
                form: formData
            }));

            alert('리뷰 목록으로 이동합니다.');
            navigate('/reviews');
            window.location.reload();
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
        dispatch(callGetSpecificReviewAPI(reviewCode));
        setForm({
            ...form,
            reviewCode: reviewCode
        });
    }, [reviewCode]);
    console.log("what is this!??!?!?!?! :" , reviewCode)

    const uploadImageCallback = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onloadend = async () => {
                const formData = new FormData();
                formData.append("multipartFiles", file);
                try {
                    const res = await axios.post('http://localhost:8001/uploadImage', formData);
                    resolve({ data: { link: res.data } });
                } catch (error) {
                    reject(error);
                }
            };
    
            reader.readAsDataURL(file);
        });
    };



    return (
        review && (
            <>
            <div className="container-first">
                    <h1 className="py-3 container-centered">캠페인 후기 등록</h1>
                    <h5 className="container-centered">{review.orgName}</h5>
                    <div className="text-center">
                        <input 
                            type="text" 
                            value={reviewTitle} 
                            name="reviewTitle"
                            className="searchbar" 
                            placeholder="제목을 입력해주세요" 
                            onChange={ onChangeHandler }
                        />
                            <br />
                        
                        <div>
                            <img
                               src={imageUrl || `/reviewImgs/${review.reviewFileList[0].fileSaveName}`}
                                alt="preview"
                            />

                        <input 
                            style={ { display: 'none' }}
                            type="file" 
                            name="reviewThumbnail"
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                            value={reviewThumbnail} 
                            //onChange={(e) => setReviewThumbnail(e.target.value)} 
                            placeholder="메인 이미지 1장을 업로드 해주세요" 
                        />
                        <br />
                        <button 
                            onClick={ onClickImageUpload }
                            className="button button-primary"
                        >이미지 업로드
                        </button>
                        </div>
                    </div>

                    {/* Pass the callback function to TextEditor */}
                    <TextEditor existingReviewDescription={existingReviewDescription} onContentChange={handleContentChange} uploadImageCallback={uploadImageCallback}/>
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
        )
    );

}