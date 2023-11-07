import DraftEditor from "../../component/common/DraftEditor";

function CampaignRegist() {
    return (
        <>
            <div class="container-first">
                <select>
                    <option>카테고리 선택</option>
                    <option>카테고리1</option>
                    <option>카테고리2</option>
                    <option>카테고리3</option>
                </select>
                <input type="text" placeholder="제목 입력" />
                <DraftEditor/>
            </div>
            <div class="container" id="container-user">
                <h3 class="text-center">기부금 사용 계획 </h3>
                <div class="items-container ic1">
                    <label>총 목표금액<input type="text" class="input" placeholder="총 목표 금액을 입력하세요." /></label>
                    <label>캠페인 마감일<input type="text" class="input" placeholder="마감일자 선택해주세요." /></label>
                    <label>단체명<input type="text" class="input" placeholder="단체명을 입력해주세요." /></label>
                    <label>단체 연락처<input type="text" class="input" placeholder="전화번호를 입력해주세요." /></label>

                </div>

            </div>
            <div >
                <button class="button button-primary">등록하기</button><div></div>
                <button class="button button-primary-outline">취소</button>
            </div>
        </>
    );
}

export default CampaignRegist;