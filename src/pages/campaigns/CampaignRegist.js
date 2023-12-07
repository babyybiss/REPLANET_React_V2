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
    { key: "0", name: "카테고리를 선택해 주세요." },
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

    // 버튼 따닥 방지
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    // 텍스트 
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 이미지
    const [imgPreview, setImgPreview] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const imageInput = useRef();
    const maxSizeInBytes = 5242880; // 5 MB
    //const maxSizeInBytes = 1048; // 1 MB

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
    const submitHandler = async () => {
        // 버튼 따닥 방지
        if (isButtonDisabled) return
        setButtonDisabled(true);

        const formData = new FormData();

        formData.append("campaignCategory", inputs.campaignCategory);
        formData.append("campaignContent", inputs.campaignContent);
        formData.append("campaignTitle", inputs.campaignTitle);
        formData.append("endDate", inputs.endDate);
        formData.append("goalBudget", inputs.goalBudget);
        formData.append("orgCode", decodedToken.memberCode);
        if (imgPreview) {
            formData.append("imageFile", imgPreview);
        }
        try {
            await dispatch(PostCampaignAPI({
                inputs: formData,
            }));
        } finally {
            setButtonDisabled(false);
        }
    }

    const onChangeImage = (e) => {
        const image = e.target.files[0];
        imageInput.current.click();

        if (image && image.size > maxSizeInBytes) {
            Swal.fire({
                icon: 'warning',
                title: "이미지 용량이 5MB를 초과합니다.",
                confirmButtonColor: '#1D7151',
                iconColor: '#1D7151'
            });
            return setImgPreview('');
        } else (
            setImgPreview(image)
        );
    };

    return (
        <>
            <div className="container-first">
                <h1 className="py-3 container-centered">캠페인 등록</h1>
                {/*카테고리 셀렉 */}
                <select className="category mb-1" name="campaignCategory" onChange={onChange}>
                    {categoryList.map((item) => (
                        <option key={item.key} value={item.name} >
                            {item.name}
                        </option>
                    ))}
                </select>
                {/* 제목 & 텍스트 에디터 */}
                <input className="input mb-1" name="campaignTitle" maxLength="30" placeholder="제목을 입력해 주세요." onChange={onChange} required />
                <DraftEditor onChange={onChangeContent} editorState={editorState} />

                <input
                    type="file"
                    className="input d-flex pt-1 mb-1"
                    accept="image/*"
                    onChange={onChangeImage}
                    ref={imageInput}
                    placeholder="메인 이미지 1장을 업로드해 주세요!"
                />

                {imageUrl && <img
                    src={imageUrl}
                    alt="preview"
                />}

                <div className="items-container ic1">
                    <div className="card">
                        <div className="card-header bg-primary">기부금 사용 계획 설정</div>
                        <div className="card-body">
                            <div className="items-container ic2">
                                <div>
                                    <label>목표금액<input className="input mb-1" type="text" maxLength="13" name="goalBudget" placeholder="총 목표 금액을 입력하세요.(10억 원 이하)" value={inputs.goalBudget} onChange={priceChangeHandler} required /></label>
                                </div>
                                <div>
                                    <label htmlFor="endDate">캠페인 마감일 <input type="date" id="endDate" name="endDate" className="input" onChange={onChange} required /></label>
                                </div>
                            </div>


                            {/* <label>재단명<input className="input" name="orgName" maxLength="50" placeholder="재단명을 입력해주세요." onChange={onChange} required /></label>
                    <label>재단 한줄소개<input className="input" name="orgDescription" maxLength="50" placeholder="재단 한줄소개를 입력해주세요." onChange={onChange} required /></label>
                    <label>재단 연락처<input className="input" name="orgTel" maxLength="13" placeholder="전화번호를 입력해주세요." onChange={onChange} required /></label> */}

                        </div>
                    </div>
                </div>
                <hr />
                <div className="items-container ic2">
                    <button className="button button-primary" disabled={isButtonDisabled} onClick={submitHandler} >등록하기</button>
                    <button type="button" className="button button-primary-outline" onClick={() => navigate(-1)}>취소</button>
                </div>

            </div>

            <div className="container">

            </div>

        </>
    );
}

export default CampaignRegist;