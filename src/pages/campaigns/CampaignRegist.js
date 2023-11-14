import { EditorState, convertToRaw } from "draft-js";
import { useCallback, useEffect, useState } from "react";
import { PostCampaignAPI } from "../../apis/CampaignListAPI";
import { useDispatch } from 'react-redux';
import { useRef } from "react";

import draftToHtml from 'draftjs-to-html';
import DraftEditor from "../../component/common/DraftEditor";
import '../../assets/css/editor.css';

const categoryList = [
    { key: "0", name: "선택 해주세요" },
    { key: "1", name: "아동-청소년" },
    { key: "2", name: "어르신" },
    { key: "3", name: "환경보호" },
    { key: "4", name: "동물" },
    { key: "5", name: "기타" },
];

function CampaignRegist() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [inputs, setInputs] = useState([]);


    const [imgPreview, setImgPreview] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();

    const dispatch = useDispatch();

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
        if (imgPreview) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(imgPreview);
        }
    }, [imgPreview]);

    // const onClickImageUpload = () => {
    //     imageInput.current.click();
    // }
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



        if (imgPreview) {
            formData.append("imageFile", imgPreview);
        }
        dispatch(PostCampaignAPI({	// 상품 상세 정보 조회
            inputs: formData,
            header,

        }));

    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="container-first">

                    {/*카테고리 셀렉 */}
                    <select className="category" name="campaignCategory" onChange={onChange}>
                        {categoryList.map((item) => (
                            <option key={item.key} value={item.name} >
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {/* 제목 & 텍스트 에디터 */}
                    <input className="input" name="campaignTitle" maxLength="20" placeholder="제목 입력." onChange={onChange} required />
                    <DraftEditor onChange={onChangeContent} editorState={editorState} />

                    <input 
                        type="file"
                        accept="image/*"
                        onChange={
                            (e) => {
                                const image = e.target.files[0];
                                setImgPreview(image)
                                imageInput.current.click();
                            }}
                        ref={imageInput}
                        placeholder="메인 이미지 1장을 업로드 해주세요"
                    />
                    {imageUrl && <img
                        src={imageUrl}
                        alt="preview"
                    />}
                </div>

                <div className="container" id="container-user">
                    <h3 className="text-center">기부금 사용 계획 </h3>
                    <div className="items-container ic1">
                        <label>목표금액<input className="input" type="text" maxLength="20" name="goalBudget" placeholder="총 목표 금액을 입력하세요." value={inputs.goalBudget} onChange={priceChangeHandler} required /></label>
                        <label htmlFor="endDate">캠페인 마감일 <input type="date" id="endDate" name="endDate" className="input" onChange={onChange} /></label>
                        <label>단체명<input className="input" name="orgName" maxLength="50" placeholder="단체명을 입력해주세요." onChange={onChange} required /></label>
                        <label>단체 한줄소개<input className="input" name="orgDescription" maxLength="50" placeholder="단체 한줄소개를 입력해주세요." onChange={onChange} required /></label>
                        <label>단체 연락처<input className="input" name="orgTel" maxLength="13" placeholder="전화번호를 입력해주세요." onChange={onChange} required /></label>
                    </div>
                </div>
                <div >
                    <button className="button button-primary" type="submit">등록하기</button><div></div>
                    <button className="button button-primary-outline">취소</button>
                </div>
            </form >
        </>
    );
}

export default CampaignRegist;