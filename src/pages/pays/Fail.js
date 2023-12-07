import '../../assets/css/reset.css'
import '../../assets/css/common.css';
import '../../assets/css/user.css';
import '../../assets/css/pay.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GetCampaignAPI } from '../../apis/CampaignListAPI';

function Fail() {

    const dispatch = useDispatch();
    const result = useSelector(state => state.campaignReducer.campaigninfo)
    const campaignList = result && result.results.campaign;
    let orgCode = campaignList && campaignList.organization.orgCode;

    const navigate = useNavigate();
    const { campaignCode } = useParams();
    const [randomQuote, setRandomQuote] = useState({ quote: '', author: '' });

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
            { quote: "실패는 성공의 어머니다.", author: "알버트 아인슈타인 (1879–1955)" },
            { quote: "모든 성공의 기반이 실패다.", author: "벤저민 디즈라엘리 (1804–1881)" },
            { quote: "실패에서 배우는 것은 성공에서는 얻을 수 없는 교훈이다.", author: "헨리 포드 (1863–1947)" },
            { quote: "우리는 성공을 위해 먼저 실패해야 한다.", author: "존 C. 맥스웰 (1831–1860)" },
            { quote: "실패는 성취의 밑거름이다.", author: "C.S. 루이스 (1898–1963)" },
            { quote: "당신이 어떻게 실패에 대처하느냐가 최종 성공을 결정짓는다.", author: "잭 캔필드 (1944–)" },
            { quote: "가장 큰 성공은 가장 큰 실패에서 나온다.", author: "디즈니 (1901–1966)" },
            { quote: "실패는 또 다른 시도로 기회를 맞이하게 하는 것이다.", author: "토머스 에디슨 (1847–1931)" },
            { quote: "실패는 지나간 것일 뿐, 실패한 것이 아니다.", author: "로버트 H. 슐러 (1916–1998)" },
            { quote: "실패는 성공을 찾아가는 길에 놓인 흥미로운 표지판이다.", author: "웨인 데어 (1940–2015)" },
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
                    <h4>결제에 실패하였습니다.</h4>
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

export default Fail;