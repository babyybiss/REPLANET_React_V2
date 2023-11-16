function CampaignContent({ campaignInfo }) {
    // 파일 이름이 있는지 체크
    let fileSaveName = campaignInfo.campaignDescfileList[0];

    if(fileSaveName == null || undefined){
        fileSaveName = false; 
      }else{ 
        fileSaveName = true; 
      }
    return (
        campaignInfo && (
            <div className="item" >
                <img src={ fileSaveName? `/campaigns/${campaignInfo.campaignDescfileList[0].fileSaveName}` : '/campaigns/default/noImage.png'} alt="캠페인 이미지" />
                <div dangerouslySetInnerHTML={{ __html: campaignInfo.campaignContent }}>
                
                </div>
            </div>
        )
    );
}

export default CampaignContent;