function CampaignContent({ campaign }) {
    // 파일 이름이 있는지 체크
    let fileSaveName = campaign.campaignDescFileList[0] ? campaign.campaignDescFileList[0] : null
    if (fileSaveName == null || undefined) {
        fileSaveName = false;
    } else {
        fileSaveName = true;
    }
    return (
        campaign && (
            <div className="item" style={{ border: '1px', solid: '#ccc',marginTop:"30px", marginBottom:"30px"}} >
                <img style={{ maxHeight:"500px", minHeight:"500px", maxWidth:"700", minWidth:"1000"}} src={fileSaveName ? `/campaigns/${campaign.campaignDescFileList[0].fileSaveName}` : '/campaigns/default/noImage.png'} alt="캠페인 이미지" />
                <div dangerouslySetInnerHTML={{ __html: campaign.campaignContent }} className="card" style={{ marginTop:"30px" ,padding:"10px",  minHeight:"300px", width:"100%", height:"100%"}}>
                </div>
            </div>
        )
    );
}

export default CampaignContent;