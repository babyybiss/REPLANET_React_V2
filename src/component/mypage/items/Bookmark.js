import moment from "moment/moment";

function Bookmark({ checked, checkedItemHandler, bookmark, index }) {
    let orgCode = bookmark && bookmark.campaignCode.orgCode


    const checkHandled = (e) => {
        checkedItemHandler(e.target.id, e.target.checked);
      }
    const onClickHandler = (campaignCode) => {
        window.location = `/campaign/${campaignCode}?orgCode=${orgCode}`

        //`/campaign/${orgList.campaignCode}?orgCode=${orgList.organization.orgCode}`
            //Navigate(`/campaigns/${campaignCode}`)
    };

    return (
        <tr>
            <td><input id={bookmark.bookmarkCode} type="checkbox" checked={checked} onChange={checkHandled} /></td>
            <td>{index+1}</td>
            <td onClick={() => {onClickHandler(bookmark.campaignCode.campaignCode)}}>{bookmark.campaignCode.campaignTitle}</td>
            <td onClick={() => {onClickHandler(bookmark.campaignCode.campaignCode)}}>{bookmark.campaignCode.orgName}</td>
            <td onClick={() => {onClickHandler(bookmark.campaignCode.campaignCode)}}>{moment(bookmark.campaignCode.startDate).subtract(1, 'months').format('YYYY-MM-DD')}</td>
        </tr>
    );
}

export default Bookmark;