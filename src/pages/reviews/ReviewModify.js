import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { callGetSpecificReviewAPI } from "../../apis/ReviewAPI";
import { useSelector, useDispatch } from "react-redux";
import { TextEditor } from "../../component/reviews/items/TextEditor.js";
import { callPutReview } from "../../apis/ReviewAPI";
import axios from "axios";


export function ReviewModify () {

    const { campaignCode } = useParams();
    const review = useSelector((state) => state.reviewReducer.review);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect (
       () => { dispatch(callGetSpecificReviewAPI(campaignCode))
}, [campaignCode])

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
        dispatch(callPutReview({
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
                                src={`/reviewImgs/${review.reviewFileList[0].fileSaveName}`}
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

                                                <button 
                            onClick={ onClickImageUpload }
                        >이미지 업로드
                        </button>
                        </div>
                    </div>

                    {/* Pass the callback function to TextEditor */}
                    <TextEditor existingReviewDescription={existingReviewDescription} onContentChange={handleContentChange} uploadImageCallback={uploadImageCallback}/>
                    <button
                        onClick={ () => navigate(-1)}
                    >
                        돌아가기
                    </button>
                    <button
                        onClick={ onClickReviewRegistrationHandler }
                    >
                            리뷰 등록
                    </button>
            </div>
        </>
        )
    );

}