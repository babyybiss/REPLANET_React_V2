import { NavLink, useNavigate } from "react-router-dom";

function CountBox(){
  const navigate = useNavigate();

  const goToRegist = () => {
    navigate('/regist')
  };

    return(
        <>
        <div style={{marginTop:100}}>
          <div className="campaign-banner bg-primary">
            <h3>오늘 하루!! amount명의 사람들이<br/>budget만큼 모았어요!</h3>
          </div>
        </div>
        <div className="campaign-button-container">
          <div className="campaign-button-area">

            <button className="button button-primary-outline">전체</button>
            <button className="button button-primary-outline">아동-청소년</button>
            <button className="button button-primary-outline">어르신</button>
            <button className="button button-primary-outline">환경보호</button>
            <button className="button button-primary-outline">동물</button>
            <button className="button button-primary-outline">기타</button>
            <button className="button button-primary" onClick={goToRegist}>캠페인 등록</button>
          </div>
        </div>
        </>
    );
}

export default CountBox;