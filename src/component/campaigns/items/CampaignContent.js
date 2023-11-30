function CampaignContent({ campaign }) {
    // 파일 이름이 있는지 체크
    let fileSaveName = campaign.campaignDescFileList[0] ? campaign.campaignDescFileList[0] : null
    if(fileSaveName == null || undefined){
        fileSaveName = false; 
      }else{ 
        fileSaveName = true; 
      }
    return (
        campaign && (
            <div  className="item" style={{height: '500px', border: '1px', solid: '#ccc'}} >
                <img src={ fileSaveName? `/campaigns/${campaign.campaignDescFileList[0].fileSaveName}` : '/campaigns/default/noImage.png'} alt="캠페인 이미지" />
                <div dangerouslySetInnerHTML={{ __html: campaign.campaignContent }}>
                </div>
            </div>
        )
    );
}

export default CampaignContent;