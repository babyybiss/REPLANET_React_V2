import { useDispatch, useSelector } from "react-redux";

function SecondResBubble({questionCode}) {
    return (
        <div className="response-box">
            {questionCode}
        </div>
    );
}
export default SecondResBubble;