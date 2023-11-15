import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/adminexchange.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { exchangeDetailAPI } from "../../../apis/PointAPI";


function ExchangeFile({info}){

    // function getFileExtension(filename){
    //     // return filename.slice(((filename.lastIndexOf(".") -1)>>> 0) +2);
    //     return filename.substring(filename.lastIndexOf('.'), filename.length);
    // }

    // const fileExtension = getFileExtension(info.fileSaveName);

    console.log('파일칸에서 info확인 : ', info);
    console.log('파일네임 확인 : ', info.fileSaveName);

    const fileExtension = 'pdf';

    if(fileExtension === 'pdf'){
        return <div style={{alignItems:"center"}}><br/><iframe src={process.env.PUBLIC_URL + '/exchangeFiles/' + info.fileSaveName} className="infoFile"/><br/></div>;
    } else{
        return <div style={{alignItems:"center"}}><br/><img src={process.env.PUBLIC_URL + '/exchangeFiles/' + info.fileSaveName} className="infoFile"/><br/></div>;
    }
}

export default ExchangeFile;