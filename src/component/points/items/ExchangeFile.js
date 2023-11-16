import "../../../assets/css/reset.css";
import "../../../assets/css/common.css";
import "../../../assets/css/adminexchange.css";


function ExchangeFile({info}){

    console.log('파일네임 확인 : ', info.fileSaveName);
    console.log('파일확장자 확인 : ', info.fileExtension);

    return (
        info.fileExtension === ".pdf"? 
        <div style={{alignItems:"center"}}><br/><iframe src={'/exchangeFiles/' + info.fileSaveName} className="infoFile"/><br/></div>:
        <div style={{alignItems:"center"}}><br/><img src={'/exchangeFiles/' + info.fileSaveName} className="infoFile"/><br/></div>
    );
}

export default ExchangeFile;