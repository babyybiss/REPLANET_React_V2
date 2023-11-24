import { useState } from "react";

function QuestionBubbles(supportbotDataProps) {

    const { supportbotDataList } = supportbotDataProps;
    // console.log(questionContent) 오버 아웃이벤트와 함께 계속 동작

    const [selectedQuestion, setSelectedQuestion] = useState(0);
    const questionClickHandler = (questionCode) => {
        setSelectedQuestion(questionCode)
    }
    console.log(selectedQuestion)

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
        </>
    );
}
export default QuestionBubbles;