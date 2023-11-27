import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
/*
import FirstResBubble from "../items/responseitem/FirstResBubble";
import SecondResBubble from "../items/responseitem/SecondResBubble";
import ThirdResBubble from "../items/responseitem/ThirdResBubble";
import FourthResBubble from "../items/responseitem/FourthResBubble";
import FifthResBubble from "../items/responseitem/FifthResBubble";
import AnyQuestion from "../items/textitem/AnyQuestion";
*/

function BubbleList() {
    const callApiResult = useSelector(state => state.supportbotReducer)
    const supportbotDataList = callApiResult.supportbotDataList.results.allSupportData;

    
    const questionCodeArray = supportbotDataList.map((code) => code.questionCode)
    const questionContentArray = supportbotDataList.map((question) => question.questionContent) 
    const answerArray = supportbotDataList.map((answer) => answer.answerContent)
    /* answerArray = [0,1,2,3,4] */ 

    /* 말풍선 리스트 상태 */
    const [bubbles, setBubbles] = useState(supportbotDataList)
    const [middleBubbles, setMiddleBubbles] = useState([]);
    
    const [questionCode, setQuestionCode] = useState(0);
    const [madeKey, setMadekey] = useState(6);
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        console.log(middleBubbles)


    },[middleBubbles]);


    /* 질문을 눌렀을 경우 기존 말풍선 리스트에 답변 말풍선을 추가하고 싶음 */ 
    const testFilterBubbleHandler = () => {


    }

    const testQuestionClickHandler = () => {
        
        const changeBubbles = bubbles.concat({
            key: madeKey,
            questionCode: madeKey,
            questionContent: "가",
            answerContent: "나"
        });
        console.log(changeBubbles)
        setMadekey(madeKey + 1)
        setMiddleBubbles(changeBubbles);
    }
    
    
    /*
    const selectRenderComponents = () => {
        switch (questionCode) {
            case 1:
                return <FirstResBubble questionCode={questionCode} />;
            case 2:
                return <SecondResBubble questionCode={questionCode} />;
            case 3:
                return <ThirdResBubble questionCode={questionCode} />;
            case 4:
                return <FourthResBubble questionCode={questionCode} />;
            case 5:
                return <FifthResBubble questionCode={questionCode} />;
            default:
                return null;
        }
    }
    */
    

    return(
        <>
            {bubbles.map((question) => (
                <div
                    key={question.questionCode}
                    className="click-box"
                    onClick={testQuestionClickHandler}
                >
                    {question.questionContent}
                </div>
                
            ))}

        </>
    );

}
export default BubbleList;