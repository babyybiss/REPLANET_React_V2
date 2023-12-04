
function Bookmark({ index, bookmark, checkedItemHandler, checked }) {
    let orgCode = bookmark && bookmark.campaignCode.organization.orgCode

    const checkHandled = (e) => {
        checkedItemHandler(e.target.id, e.target.checked);
      }
    const onClickHandler = (campaignCode) => {
        window.location = `/campaign/${campaignCode}?orgCode=${orgCode}`

        //`/campaign/${orgList.campaignCode}?orgCode=${orgList.organization.orgCode}`
            //Navigate(`/campaigns/${campaignCode}`)
    };
    //날짜 
    const date = new Date(bookmark.campaignCode.startDate[0], bookmark.campaignCode.startDate[1] - 1, bookmark.campaignCode.startDate[2]);
    const endDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);

    return (
        <tr>
            <td><input id={bookmark.bookmarkCode} type="checkbox" checked={checked} onChange={checkHandled} /></td>
            <td>{index+1}</td>
            <td onClick={() => {onClickHandler(bookmark.campaignCode.campaignCode)}}>{bookmark.campaignCode.campaignTitle}</td>
            <td onClick={() => {onClickHandler(bookmark.campaignCode.campaignCode)}}>{bookmark.campaignCode.organization.member.memberName}</td>
            <td onClick={() => {onClickHandler(bookmark.campaignCode.campaignCode)}}>{endDate}</td>
        </tr>
    );
}

export default Bookmark;