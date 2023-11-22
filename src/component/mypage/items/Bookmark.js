import moment from "moment/moment";

function Bookmark({ checked, checkedItemHandler, bookmark }) {
    const checkHandled = (e) => {
        console.log('checkHandled')
        checkedItemHandler(e.target.id, e.target.checked);
      }
console.log(checked,'이거왜안댐');
    const onClickHandler = (campaignCode) => {
        window.location = `/campaign/${campaignCode}`
            //Navigate(`/campaigns/${campaignCode}`)
    };

    return (
        <tr>
            <td><input id={bookmark.bookmarkCode} type="checkbox" checked={checked} onChange={checkHandled} /></td>
            <td>{bookmark.bookmarkCode}</td>
            <td onClick={() => {onClickHandler(bookmark.campaignCode.campaignCode)}}>{bookmark.campaignCode.campaignTitle}</td>
            <td onClick={() => {onClickHandler(bookmark.campaignCode.campaignCode)}}>{bookmark.campaignCode.orgName}</td>
            <td onClick={() => {onClickHandler(bookmark.campaignCode.campaignCode)}}>{moment(bookmark.campaignCode.startDate).subtract(1, 'months').format('YYYY-MM-DD')}</td>
        </tr>
    );
}

export default Bookmark;