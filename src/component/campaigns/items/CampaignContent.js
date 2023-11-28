function CampaignContent({ campaign }) {
    // 파일 이름이 있는지 체크
    console.log(campaign,'dd');
    let fileSaveName = campaign? campaign.campaignDescFileList : ''
    //let fileSaveName = campaignInfo.campaignDescFileList[0];
    

    if(fileSaveName == null || undefined){
        fileSaveName = false; 
      }else{ 
        fileSaveName = true; 
      }
    return (
        campaign && (
            <div className="item" >
                <img src={ fileSaveName? `/campaigns/${campaign.campaignDescFileList[0].fileSaveName}` : '/campaigns/default/noImage.png'} alt="캠페인 이미지" />
                <div dangerouslySetInnerHTML={{ __html: campaign.campaignContent }}>
                
                </div>
            </div>
        )
    );
}

export default CampaignContent;