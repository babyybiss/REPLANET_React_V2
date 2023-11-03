import img from "../../../assets/images/exchange/img_file_example.png"
import pdf from "../../../assets/images/exchange/pdf_file_example.pdf"

function ExchangeFile(){

    function getFileExtension(filename){
        return filename.slice(((filename.lastIndexOf(".") -1)>>> 0) +2);
    }

    const fileExtension = getFileExtension(filename);
    
    if(fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'jpeg'){
        return <img src={img}/>;
    } else if(fileExtension === 'pdf'){
        return <iframe src={pdf}/>;
    }
}

export default ExchangeFile;