import img from '../../../assets/images/campaign/1.jpg'

function CampaignContent({ campaignInfo }) {
    return (
        campaignInfo && (
            <div className="item" >
                <img src={img} />
                <div dangerouslySetInnerHTML={{ __html: campaignInfo.campaignContent }}>
                
                </div>
            </div>
        )
    );
}

export default CampaignContent;