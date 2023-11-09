import { EditorState, convertToRaw } from "draft-js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostCampaignAPI } from "../../apis/CampaignListAPI";

import DraftEditor from "../../component/common/DraftEditor";
import draftToHtml from "draftjs-to-html";


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
    const [Thumbnail, setThumbnail] = useState('');

    
    const [inputs, setInputs] = useState({
        campaignTitle: '',
        startDate: new Date(),
        endDate: '',
        campaignCategory: '',
        goalBudget: "숫자만 입력해주세요",
        orgName: '',
        orgDescription: '',
        orgTel: ''
    });

    const header = {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("Authorization")
        }
    };

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });
    };

    // 가격 원화 설정 
    const priceChangeHandler = (event) => {
        let price = event.target.value;
        const { value, name } = event.target;
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

    // db 전송
    const submitHandler = (event) => {
        event.preventDefault();

        const campaignContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        PostCampaignAPI(inputs, campaignContent,header);
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
                    <input className="input" name="campaignTitle" maxLength="20"  placeholder="제목 입력." onChange={onChange} required />
                    <DraftEditor editorState={editorState} setEditorState={setEditorState} />
                    <input type="file" value={Thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="메인 이미지 1장을 업로드 해주세요" />
                </div>

                <div className="container" id="container-user">
                    <h3 className="text-center">기부금 사용 계획 </h3>
                    <div className="items-container ic1">
                        <label>목표금액<input className="input" type="text" maxLength="20" name="goalBudget"  placeholder="총 목표 금액을 입력하세요." value={inputs.goalBudget} onChange={priceChangeHandler} required /></label>
                        <label htmlFor="endDate">캠페인 마감일 <input type="date" id="endDate" name="endDate" className="input" onChange={onChange} required /></label>
                        <label>단체명<input className="input" name="orgName" maxLength="50"  placeholder="단체명을 입력해주세요." onChange={onChange} required /></label>
                        <label>단체 한줄소개<input className="input" name="orgDescription" maxLength="50"  placeholder="단체 한줄소개를 입력해주세요." onChange={onChange} required /></label>
                        <label>단체 연락처<input className="input" name="orgTel" maxLength="13"  placeholder="전화번호를 입력해주세요." onChange={onChange} required /></label>
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