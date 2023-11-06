import img from '../../../assets/images/campaign/1.jpg'

function CampaignContent({ campaignInfo }) {
    console.log(campaignInfo, '누구');
    return (
        campaignInfo && (
            <div className="item" >
                <img src={img} />
                <div>
                {campaignInfo.name}
                </div>
            </div>
        )
    );
}

export default CampaignContent;