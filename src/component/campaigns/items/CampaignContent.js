function CampaignContent({ campaignInfo }) {
    let fileSaveName = campaignInfo.campaignDescfile;

    if(campaignInfo.campaignDescfile == null){
        fileSaveName = "default/noImage.png"
      }else{ 
        fileSaveName = campaignInfo.campaignDescfile.fileSaveName;
      }

    return (
        campaignInfo && (
            <div className="item" >
                <img src={`/campaigns/${fileSaveName}`} alt="캠페인 이미지" />
                <div dangerouslySetInnerHTML={{ __html: campaignInfo.campaignContent }}>
                
                </div>
            </div>
        )
    );
}

export default CampaignContent;