import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirstResBubble from "../items/responseitem/FirstResBubble";

function QuestionBubbles({supportbotDataList}) {

    console.log(supportbotDataList)
    /*
    const callApiResult = useSelector(state => state.supportbotReducer)
    const supportbotDataList = callApiResult.supportbotDataList.results.allSupportData;
    */
    /* 질문코드 상태 */ 
    const [questionCode, setQuestionCode] = useState(0);

    const questionClickHandler = (questionCode) => {
        setQuestionCode(questionCode)
    }

    
    const selectRenderComponents = () => {
        switch (questionCode) {
            case 1:
                return <FirstResBubble questionCode={questionCode} />;
            /*case 2:
                return <SecondResBubble />;
            case 3:
                return <ThirdResBubble />;
            case 4:
                return <FourthResBubble />;
            case 5:
                return <FifthResBubble />;*/
            default:
                return null;
        }
    }
    
    return(
        <>
           {supportbotDataList.map((question) => (
            <div
                key={question.questionCode} 
                className="click-box"
                onClick={() => questionClickHandler(question.questionCode)}  
            >
                {question.questionContent}
            </div>
           ))}
           
           {selectRenderComponents()}
        </>
    );
}
export default QuestionBubbles;