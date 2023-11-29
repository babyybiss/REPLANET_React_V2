export const numberFormatToKorean = (number, isShowData = true) => {
    const billion = Math.floor(number / 100000000);
    const million = Math.floor((number % 100000000) / 10000);
    const thousand = Math.floor((number % 10000) / 1000);
    const one = number % 1000;

    let result = '';

    if (billion > 0) {
        result += `${billion}억`;
    }
    if (million > 0) {
        result += `${million}만`;
    }
    if (thousand > 0 && isShowData) {
        result += `${thousand}`
    }
    if (one > 0 && isShowData) {
        result += `${one}`
    }
    if (number === 0) {
        result = `0`
    }
    return result.trim();
  }