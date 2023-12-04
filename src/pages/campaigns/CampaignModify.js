import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { useCallback, useEffect, useState } from "react";
import { ModifyCampaignAPI } from "../../apis/CampaignListAPI";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetCampaignAPI } from "../../apis/CampaignListAPI";

import draftToHtml from 'draftjs-to-html';
import DraftEditor from "../../component/common/DraftEditor";
import '../../assets/css/editor.css';
import Swal from 'sweetalert2';

const categoryList = [
    { key: "0", name: "카테고리 선택" },
    { key: "1", name: "아동-청소년" },
    { key: "2", name: "어르신" },
    { key: "3", name: "환경보호" },
    { key: "4", name: "동물" },
    { key: "5", name: "기타" },
];

function CampaignModify() {
    //캠페인 정보 불러오기
    const result = useSelector(state => state.campaignReducer.campaigninfo);
    const campaign = result.results? result.results.campaign : "";
    const { campaignCode } = useParams();
    const navigate = useNavigate();
    const maxSizeInBytes = 1048576; // 1 MB

    // 캠페인 내용 가져오기
    const [editorState, setEditorState] = useState(() => {
        if (campaign) {
            const contentBlock = convertFromHTML(campaign.campaignContent);
            const contentState = ContentState.createFromBlockArray(contentBlock);
            return EditorState.createWithContent(contentState);
        } else {
            return EditorState.createEmpty();
        }
    });
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState([]);

    const [imagePre, setImagePre] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();
    

    let beforeUrl = campaign.campaignDescFileList[0] ? campaign.campaignDescFileList[0].fileSaveName : null

    // 수정하기 전 내용 가져오기 
    useEffect(() => {
        dispatch(GetCampaignAPI(campaignCode))
        setInputs(campaign)
        //setImagePre(campaignInfo.campaignDescfileList[0])

        if (imagePre) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(imagePre);
        }
    }, [imagePre]);

    const onChange = (e) => {
        const { value, name } = e.target;
        if (e.target.name == "endDate") {
            if (new Date(e.target.value) < new Date()) {
                Swal.fire({
                    icon: 'warning',
                    title: '마감일은 <b style="color:#1D7151; font-weight:bold;">현재 날짜보다</b> </br>작을 수 없습니다.',
                    confirmButtonColor: '#1D7151',
                    iconColor: '#1D7151'
                });
            }
        }
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // 가격 원화 설정 
    const priceChangeHandler = (event) => {
        let price = event.target.value;
        price = Number(price.replaceAll(',', ''));
        const clampedValue = Math.min(price, 1000000000);
        const { name } = event.target;
        if (isNaN(price)) {
            setInputs({
                ...inputs,
                [name]: 0
            })
        } else {
            setInputs({
                ...inputs,
                [name]: clampedValue.toLocaleString('ko-KR')
            });
        }
        if (price > 1000000000) {
            Swal.fire({
                icon: 'warning',
                title: '<b style="color:#1D7151; font-weight:bold;">10억 초과 금액은 </b> </br>모금 할 수 없습니다.',
                confirmButtonColor: '#1D7151',
                iconColor: '#1D7151'
            });
        }
    }

    const onChangeContent = useCallback(async (state) => {
        const value = await draftToHtml(convertToRaw(state.getCurrentContent()));
        // 텍스트 화면에 나오게 
        setEditorState(state);
        // 저어장~
        setInputs({
            ...inputs,
            campaignContent: value
        });

    }, [inputs]);


    useEffect(() => {
        // 이미지 업로드시 미리보기 세팅
        if (imagePre) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(imagePre);
        }
    }, [imagePre]);

    const onChangeImage = (e) => {
        const image = e.target.files[0];
        imageInput.current.click();

        if(image.size > maxSizeInBytes) {
            Swal.fire({
                icon: 'warning',
                title: "이미지 용량이 1MB를 초과합니다.",
                confirmButtonColor: '#1D7151',
                iconColor: '#1D7151'
            });
            return setImagePre('');
        } else (
            setImagePre(image)
        );
    };


    // db 전송
    const submitHandler = () => {

        const formData = new FormData();

        formData.append("campaignCategory", inputs.campaignCategory);
        formData.append("campaignContent", inputs.campaignContent);
        formData.append("campaignTitle", inputs.campaignTitle);
        formData.append("endDate", inputs.endDate);
        formData.append("goalBudget", inputs.goalBudget);

        if (imagePre) {
            formData.append("imageFile", imagePre);
        }

        dispatch(ModifyCampaignAPI({
            inputs: formData,
        }, campaignCode));

    }

    return (
        <>
            <div className="container-first">
                <h1 className="py-3 container-centered">캠페인 수정</h1>

                {/*카테고리 셀렉 */}
                <select className="category" name="campaignCategory" onChange={onChange} value={inputs.campaignCategory}>
                    {categoryList.map((item) => (
                        <option key={item.key} value={item.name} >
                            {item.name}
                        </option>

                    ))}
                </select>
                {/* 제목 & 텍스트 에디터 */}
                <input className="input" name="campaignTitle" maxLength="20" onChange={onChange} value={inputs.campaignTitle} required />
                <DraftEditor onChange={onChangeContent} editorState={editorState} inputs={inputs} />

                <input
                    type="file"
                    accept="image/*"
                    onChange={onChangeImage}
                    ref={imageInput}
                    placeholder="메인 이미지 1장을 업로드 해주세요"
                />
                <img
                    src={imageUrl || '/campaigns/' + beforeUrl}
                    alt="preview"
                />
            </div>

            <div className="container" id="container-user">
                <h3 className="text-center">기부금 사용 계획 </h3>
                <div className="items-container ic1">
                    <label>목표금액<input className="input" type="text" maxLength="20" name="goalBudget" placeholder="총 목표 금액을 입력하세요." value={inputs.goalBudget} onChange={priceChangeHandler} required /></label>
                    <label htmlFor="endDate">캠페인 마감일 <input type="date" id="endDate" name="endDate" className="input" onChange={onChange} value={inputs.endDate} /></label>
                </div>
            </div>
            <div className="campaignSubmitButton">
                <div className="button button-primary" style={{ width: '30%', textAlign: 'center',marginBottom: '1rem' }} onClick={submitHandler} >등록하기</div>
                <div className="button button-primary-outline" style={{ width: '30%', textAlign: 'center' }} onClick={() => navigate(-1)}>취소</div>
            </div>
        </>
    );
}
export default CampaignModify;