import { NavLink } from "react-router-dom";

function CountBox(){
    return(
        <>
        <div style={{marginTop:100}}>
          <div className="campaign-banner bg-primary">
            <h3>period동안 amount명의 사람들이<br/>budget만큼 모았어요!</h3>
          </div>
        </div>
        <div className="campaign-button-container">
          <div className="campaign-button-area">
            <button className="button button-primary-outline">categoryName</button>
            <button className="button button-primary-outline">categoryName</button>
            <button className="button button-primary-outline">categoryName</button>
            <button className="button button-primary-outline">categoryName</button>
            <button className="button button-primary-outline">categoryName</button>
            <button className="button button-primary-outline">categoryName</button>
            <button className="button button-primary-outline">categoryName</button>
            <button className="button button-primary" id="button-registCampaign" ><NavLink to={"/regist"}>캠페인 등록</NavLink></button>
          </div>
        </div>
        </>
    );
}

export default CountBox;