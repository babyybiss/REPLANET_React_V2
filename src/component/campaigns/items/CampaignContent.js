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
            <div className="item mt-2 mb-2">
                <img className="rounded-3" style={{ }} src={fileSaveName ? `/campaigns/${campaign.campaignDescFileList[0].fileSaveName}` : '/campaigns/default/noImage.png'} alt="캠페인 이미지" />
                <div dangerouslySetInnerHTML={{ __html: campaign.campaignContent }} className="mt-2 mb-2" style={{ marginTop:"30px" ,padding:"",  minHeight:"", width:"100%", height:"100%"}}>
                </div>
                <hr/>
            </div>
        )
    );
}

export default CampaignContent;