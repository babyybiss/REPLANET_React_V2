export const dateFormatToKorean = (dateTime, includeTime = true) => {
    const date = new Date(dateTime);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let result = `${year}년${month}월${day}일`;

    if (includeTime) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        result += `${hours}시${minutes}분${seconds}초`;
    }

    return result;

}