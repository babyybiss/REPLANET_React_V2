function CampaignPicture({campaignInfo}) {
    return (
        campaignInfo && (
        <div>
            <h2>{campaignInfo && campaignInfo.name} </h2>
            <p>
                사진 리스트
            </p>
        </div>
        )

    );
}

export default CampaignPicture;