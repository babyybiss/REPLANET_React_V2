import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { useCallback, useEffect, useState } from "react";
import { ModifyCampaignAPI } from "../../apis/CampaignListAPI";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { GetCampaignAPI } from "../../apis/CampaignListAPI";

import draftToHtml from 'draftjs-to-html';
import DraftEditor from "../../component/common/DraftEditor";
import '../../assets/css/editor.css';

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
    const campaigns = useSelector(state => state.campaignReducer);
    const campaignInfo = campaigns.campaigninfo;
    const { campaignCode } = useParams();

    const [editorState, setEditorState] = useState(() => {
        if (campaignInfo) {
            const contentBlock = convertFromHTML(campaignInfo.campaignContent);
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

    const beforeUrl = campaignInfo.campaignDescfileList[0].fileSaveName;
    // 수정하기 전 내용 가져오기 
    useEffect(() => {
        dispatch(GetCampaignAPI(campaignCode))
        setInputs(campaignInfo)
        //setImagePre(campaignInfo.campaignDescfileList[0])
        
        if(imagePre){
            const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if( result ) {
                        setImageUrl(result);
                    }
                }
                fileReader.readAsDataURL(imagePre);
        }
    }, [imagePre]);


    // const canSubmit = useCallback(() => {
    //     return inputs !== "" && editorState !== "";
    //   }, [inputs]);
    const header = {
        headers: {
            //Authorization: `${getItem('token')}`,
            "Content-type": "multipart/form-data charset=utf-8",
            Accept: "*/*",
            Authorization: "Bearer " + window.localStorage.getItem("accessToken")
        },
    };

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // 가격 원화 설정 
    const priceChangeHandler = (event) => {
        let price = event.target.value;
        const { name } = event.target;
        price = Number(price.replaceAll(',', ''));
        if (isNaN(price)) {
            setInputs({
                ...inputs,
                [name]: 0
            })
        } else {
            setInputs({
                ...inputs,
                [name]: price.toLocaleString('ko-KR')
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

    // db 전송
    const submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("campaignCategory", inputs.campaignCategory);
        formData.append("campaignContent", inputs.campaignContent);
        formData.append("campaignTitle", inputs.campaignTitle);
        formData.append("endDate", inputs.endDate);
        formData.append("goalBudget", inputs.goalBudget);
        formData.append("orgDescription", inputs.orgDescription);
        formData.append("orgName", inputs.orgName);
        formData.append("orgTel", inputs.orgTel);

        if (imagePre) {
            formData.append("imageFile", imagePre);
        }

        console.log('[Review Registration] campaignTitle : ', formData.get("campaignTitle"));

        dispatch(ModifyCampaignAPI({
            inputs: formData,
            header,
        },campaignCode));

    }

    return (
        <>
            <form onSubmit={submitHandler}>
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
                        onChange={
                            (e) => {
                                const image = e.target.files[0];
                                setImagePre(image)
                                imageInput.current.click();
                            }}
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
                        <label>단체명<input className="input" name="orgName" maxLength="50" placeholder="단체명을 입력해주세요." onChange={onChange} value={inputs.orgName} required /></label>
                        <label>단체 한줄소개<input className="input" name="orgDescription" maxLength="50" placeholder="단체 한줄소개를 입력해주세요." value={inputs.orgDescription} onChange={onChange} required /></label>
                        <label>단체 연락처<input className="input" name="orgTel" maxLength="13" placeholder="전화번호를 입력해주세요." onChange={onChange} value={inputs.orgTel} required /></label>
                    </div>
                </div>
                <div >
                    {/*canSubmit() ? (
                <button className="button button-primary" type="submit">등록하기</button>
                ) : (
                    <button className="button button-primary">
                        전부 수정하세욧!
                    </button>

                ) */}
                    <button className="button button-primary" type="submit">등록하기</button>

                    <button className="button button-primary-outline">취소</button>
                </div>
            </form >
        </>
    );
}
export default CampaignModify;