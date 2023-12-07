import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/pay.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GetCampaignAPI } from '../../apis/CampaignListAPI';
function Cancel() {

    const dispatch = useDispatch();
    const result = useSelector(state => state.campaignReducer.campaigninfo)
    const campaignList = result && result.results.campaign;
    let orgCode = campaignList && campaignList.organization.orgCode;
    const navigate = useNavigate();
    const { campaignCode } = useParams();
    const [randomQuote, setRandomQuote] = useState({ quote: '', author: '' });
console.log(orgCode,'ㅇ;거화인');
    useEffect (() => {
        dispatch(GetCampaignAPI(campaignCode));
    },[])

    const handleBackToMain = () => {
        navigate('/');
    };

    const handleGoToCampaign = () => {
        navigate(`/campaign/${campaignCode}?orgCode=${orgCode}`);
    };
    
    useEffect(() => {
        // 페이지 로드될 때 랜덤 명언 선택
        const quotes = [
            { quote: "신중함은 모든 지혜의 기초이다.", author: "솔론 (c. 640 – c. 560 BC)" },
            { quote: "신중함은 명심해야 할 가장 소중한 미덕 중 하나이다.", author: "코데스쿠 (1802–1876)" },
            { quote: "생각하면서 말하고, 생각하면서 행동하라.", author: "제임스 앨런 (1864–1912)" },
            { quote: "자기를 아는 것은 모든 신중함의 시작이다.", author: "아리스토텔레스 (384–322 BC)" },
            { quote: "작은 실수가 큰 결과를 가져올 수 있다. 그러므로 모든 행동에 신중함을 기울여야 한다.", author: "미가엘 데 셀바르 (1741–1801)" },
            { quote: "신중함 없이 이루어진 성취는 잠시일 뿐이다. 지속적인 성공은 신중함에 기반한다.", author: "버트로트 러셀 (1872–1970)" },
            { quote: "생각이 없으면 행동은 비어있다. 행동이 없으면 생각은 쓸모가 없다.", author: "장자 (c. 369–286 BC)" },
            { quote: "성공은 생각하고 행동하는 사람에게만 주어진다.", author: "알버트 허버드 (1870–1935)" },
            { quote: "성취에는 신중함과 인내가 필요하다. 무엇보다 신중함이 중요하다.", author: "프랭클린 D. 루스벨트 (1882–1945)" },
            { quote: "신중함은 어떤 일에든 필요한 조건이다. 신중함 없이는 창의성과 효과적인 행동이 불가능하다.", author: "벤저민 디즈라엘리 (1804–1881)" }
        ];

        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);

    }, []);
    
    return(
        <>
            <br/>
            <br/>
            <br/>
            <div className="container-first">
                <div className="container-centered pay-anno pay-success-header">
                    <h4>결제를 취소하셨습니다.</h4>
                </div>
                <div className="container-centered pay-anno pay-success-header">
                    <h3 style={{fontStyle:"italic", fontWeight:"normal"}}>{randomQuote.quote}</h3><br/>
                </div>
                <div className="container-centered pay-anno pay-success-header">
                    <h5 style={{fontStyle:"italic", fontWeight:"normal"}}>- {randomQuote.author} -</h5>
                </div> 
                <br/>
                <div className='container-centered pay-anno pay-success-header'>
                    <button className="button button-lg button-primary" onClick={handleBackToMain}>메인으로</button>
                    <button className="button button-lg button-primary-outline" onClick={handleGoToCampaign}>해당 캠페인으로</button>
                </div>
            </div>
        </>
    );
}

export default Cancel;