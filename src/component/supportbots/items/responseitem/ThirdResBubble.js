import { useDispatch, useSelector } from "react-redux";

function ThirdResBubble({questionCode}) {
    return (
        <div className="response-box">
            {questionCode}
        </div>
    );
}
export default ThirdResBubble;