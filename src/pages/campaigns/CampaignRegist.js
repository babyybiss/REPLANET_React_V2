import DraftEditor from "../../component/common/DraftEditor";
import { EditorState, convertToRaw } from "draft-js";
import { useState, useEffect } from "react";
import { PostCampaignAPI } from "../../apis/CampaignListAPI";
import draftToHtml from "draftjs-to-html";

function CampaignRegist() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [price, setPrice] = useState(0);

    const categoryList = [
        { key: "0", name: "선택 해주세요" },
        { key: "1", name: "아동-청소년" },
        { key: "2", name: "어르신" },
        { key: "3", name: "환경보호" },
        { key: "4", name: "동물" },
        { key: "5", name: "기타" },
    ];
    const [inputs, setInputs] = useState({
        categoryCode: '',
            campaignTitle: '',
            campaignContent:'',
            startDate: '',
            endDate: '',
            campaignCategory: '',
            currentBudget:'',
            goalBudget: '',
            orgName: '',
            orgDescription:'',
            orgTel: ''
    });

    const header = {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("Authorization")
        }
    };


    const campaignRegist = (value) => {
        let notice = {
            title: value.title,
            contents: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        }
        PostCampaignAPI(notice, header);
    }

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });

        console.log(name, '네임');
        console.log(value, '밸류');
    };

    // 가격 원화 설정 
    const priceChangeHandler = (event) => {
        let price = event.target.value;
        price = Number(price.replaceAll(',', ''));
        if (isNaN(price)) {
            setPrice(0);
        } else {
            setPrice(price.toLocaleString('ko-KR'));
        }
    }
    const submitHandler = (event) => {
        event.preventDefault();

        const expenseDate = {
            categoryCode: '',
            campaignTitle: '',
            campaignContent:'',
            startDate: new Date(),
            endDate: '',
            campaignCategory: '',
            currentBudget:'',
            goalBudget: '',
            orgName: '',
            orgDescription:'',
            orgTel: ''
        };
        console.log(expenseDate);
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <div class="container-first">

                    {/*카테고리 셀렉 */}
                    <select name="category" onChange={onChange}>
                        {categoryList.map((item) => (
                            <option key={item.key} value={item.name} >
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {/* 제목 & 텍스트 에디터 */}
                    <input name="campaignTitle" class="input" placeholder="제목 입력." onChange={onChange} required />
                    <DraftEditor editorState={editorState} setEditorState={setEditorState} />
                </div>

                <div class="container" id="container-user">
                    <h3 class="text-center">기부금 사용 계획 </h3>
                    <div class="items-container ic1">
                        <label>목표금액<input type="text" maxlength="20" name="goalBudget" class="input" placeholder="총 목표 금액을 입력하세요." value={price} onChange={priceChangeHandler} required /></label>
                        <label htmlFor="endDate">캠페인 마감일 <input type="date" id="endDate" name="endDate" class="input" onChange={onChange} required /></label>
                        <label>단체명<input name="orgName" maxlength="50" class="input" placeholder="단체명을 입력해주세요." onChange={onChange} required /></label>
                        <label>단체 연락처<input name="orgTel" maxlength="13" class="input" placeholder="전화번호를 입력해주세요." onChange={onChange} required /></label>
                    </div>
                </div>
                <div >
                    <button class="button button-primary" type="submit">등록하기</button><div></div>
                    <button class="button button-primary-outline">취소</button>
                </div>
            </form >
        </>
    );
}

export default CampaignRegist;