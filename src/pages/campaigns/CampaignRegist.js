import { EditorState, convertToRaw } from "draft-js";
import { useCallback, useEffect, useState } from "react";
import { PostCampaignAPI } from "../../apis/CampaignListAPI";
import { useDispatch } from 'react-redux';
import { useRef } from "react";
import { jwtDecode } from 'jwt-decode';
import draftToHtml from 'draftjs-to-html';
import DraftEditor from "../../component/common/DraftEditor";
import '../../assets/css/editor.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const categoryList = [
    { key: "0", name: "선택 해주세요" },
    { key: "1", name: "아동-청소년" },
    { key: "2", name: "어르신" },
    { key: "3", name: "환경보호" },
    { key: "4", name: "동물" },
    { key: "5", name: "기타" },
];

function CampaignRegist() {
    // 토큰 정보 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;

    // 텍스트 
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 이미지
    const [imgPreview, setImgPreview] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();

    const onChange = (e) => {
        const { value, name } = e.target;
        if(e.target.name == "endDate"){
            if(new Date(e.target.value) < new Date()){
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
    const submitHandler = () => {

        const formData = new FormData();

        formData.append("campaignCategory", inputs.campaignCategory);
        formData.append("campaignContent", inputs.campaignContent);
        formData.append("campaignTitle", inputs.campaignTitle);
        formData.append("endDate", inputs.endDate);
        formData.append("goalBudget", inputs.goalBudget);
        formData.append("orgCode", decodedToken.memberCode);
        // formData.append("orgDescription", inputs.orgDescription);
        // formData.append("orgName", inputs.orgName);
        // formData.append("orgTel", inputs.orgTel);

        if (imgPreview) {
            formData.append("imageFile", imgPreview);
        }
        dispatch(PostCampaignAPI({	// 상품 상세 정보 조회
            inputs: formData,
            //header,

        }));

    }
    return (
        <>
            <div className="container-first">
                <h1 className="py-3 container-centered">캠페인 등록</h1>
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
                    <label>목표금액<input className="input" type="text" maxLength="13" name="goalBudget" placeholder="총 목표 금액을 입력하세요.(10억 이하로)" value={inputs.goalBudget} onChange={priceChangeHandler} required /></label>
                    <label htmlFor="endDate">캠페인 마감일 <input type="date" id="endDate" name="endDate" className="input" onChange={onChange} /></label>
                    {/* <label>단체명<input className="input" name="orgName" maxLength="50" placeholder="단체명을 입력해주세요." onChange={onChange} required /></label>
                    <label>단체 한줄소개<input className="input" name="orgDescription" maxLength="50" placeholder="단체 한줄소개를 입력해주세요." onChange={onChange} required /></label>
                    <label>단체 연락처<input className="input" name="orgTel" maxLength="13" placeholder="전화번호를 입력해주세요." onChange={onChange} required /></label> */}
                </div>
            </div>
            <div >
                <button className="button button-primary" onClick={submitHandler} >등록하기</button>
                <button className="button button-primary-outline" onClick={() => navigate(-1)}>취소</button>

            </div>

        </>
    );
}

export default CampaignRegist;