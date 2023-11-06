import "../../assets/css/reset.css";
import "../../assets/css/common.css";
import "../../assets/css/adminexchange.css";


function ExchangeFile(){

    function getFileExtension(filename){
        return filename.slice(((filename.lastIndexOf(".") -1)>>> 0) +2);
    }

    const fileExtension = getFileExtension(filename);
    
    if(fileExtension === 'pdf'){
        return <div style={{alignItems:"center"}}><br/><iframe src={filename} className="infoFile"/><br/></div>;
    } else{
        return <div style={{alignItems:"center"}}><br/><img src={filename} className="infoFile"/><br/></div>;
    }
}

export default ExchangeFile;