import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callGetSupportbotListAPI } from "../../apis/SupportbotAPI";
import RepeatBubble from "../chatbots/item/RepeatBubble";
import ResMessageBubble from "../chatbots/item/ResMessageBubble";
import ModalHeader from "./ModalHeader";
import ClickBubble from "../chatbots/item/ClickBubble";

function ModalChatbot({ setIsShow }) {

    const callApiResult = useSelector(state => state.supportbotReducer)
    const supportbotDataList = callApiResult.supportbotDataList;
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(callGetSupportbotListAPI());
        },
        []
    );

    /*
    const testData = [
        {
            questionCode: 1,
            questionContent: "포인트는 어떻게 얻을 수 있나요?",
            answerContent: "회원님의 마이페이지의 '포인트 전환 및 관리' 탭을 선택하신 후 하단의 전환 신청을 선택해주세요. 그 다음 저희가 제공하고 있는 포인트 전환 신청 폼 양식을 통해 봉사활동 확인서를 파일로 업로드하여 제출해주시면 관리자의 승인을 거쳐 확인서에 기재된 봉사활동 시간에 비례한 포인트로 전환됩니다."
          },
          {
            questionCode: 2,
            questionContent: "봉사 시간에 따른 포인트의 전환량이 어떻게 되나요?",
            answerContent: "기부에 사용가능한 포인트는 봉사활동 1시간 당 1만포인트로 전환됩니다. 여러분의 따스한 실천이 도움을 받는 분들 뿐만 아니라 여러분 자신에게도 더욱 풍성할 수 있기를 희망합니다. "
          },
          {
            questionCode: 3,
            questionContent: "포인트도 환불이 되나요?",
            answerContent: "캠페인에 등록해주신 기부금을 포함한 포인트는 환불이 불가능합니다. 보다 자세한 사항은 운영정책 및 약관에서 확인하실 수 있습니다. 환불에 대한 더 자세한 문의가 필요하시다면 사이트 하단에 기재된 연락처로 문의 부탁드립니다."
          },
          {
            questionCode: 4,
            questionContent: "캠페인 선택을 잘못해서 기부하였는데 환불 받거나 기부금 내역을 다른 캠페인으로 변경할 수 있나요?",
            answerContent: "죄송합니다만, 캠페인 모집을 통해 기부금으로 전달된 금액에 대하여는 현행법 상 반환이 불가능합니다. 저희는 기부금품 모집 등록 절차를 밟은 캠페인을 통해 후원자를 모집하고 있습니다. 기타 회원님의 기부금 사용내역 등 정보가 필요하시다면 사이트 하단에 기재된 연락처 혹은 이메일로 문의 부탁드립니다. "
          },
          {
            questionCode: 5,
            questionContent: "결제 시 포인트를 같이 사용한 경우 기부금영수증을 어떻게 확인할 수 있을까요?",
            answerContent: "결제한 이력이 존재하는 건에 대하여 후원자로 등록된 회원님에 한해 포인트 사용분을 제외한 기부금영수증이 신청 가능합니다. 기부금 영수증과 관련한 안내는 마이페이지 기부금영수증 탭에서 확인이 가능합니다."
          }
    ];
    */
   // console.log(setIsShow)
   return (
    supportbotDataList && (
        <div className={'modal-content'}>
            <ModalHeader setIsShow={(setIsShow)} />
            
            <ClickBubble supportbotDataList={supportbotDataList.results} />

            {/*<RepeatBubble supportbotDataList={supportbotDataList.results} />
            <ResMessageBubble supportbotDataList={supportbotDataList.results} />*/}
        </div>
    )
    
   );
}
export default ModalChatbot;