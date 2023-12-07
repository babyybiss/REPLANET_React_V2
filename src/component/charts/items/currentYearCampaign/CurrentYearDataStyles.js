/* 데이터 컬러 프리셋 */ 
const dataColorSet = ["#10573C", "#ff9f40", "#ff6384", "#ffcd56", "#36a2eb", "#9966ff"];

/* ----------- 1. line style ----------- */ 
export const lineStyleY1 = {
    data : {
    stroke : dataColorSet[0],
    strokeWidth : ({ active }) => active ? 3 : 2,
    opacity : ({ active }) => active ? 1 : 0.3
    }
}

export const lineStyleY2 = {
        data : {
        stroke : dataColorSet[1],
        strokeWidth : ({ active }) => active ? 3 : 2,
        opacity : ({ active }) => active ? 1 : 0.3
    }
}

export const lineStyleY3 = {
    data : {
    stroke : dataColorSet[2],
    strokeWidth : ({ active }) => active ? 3 : 2,
    opacity : ({ active }) => active ? 1 : 0.3
    }
}

export const lineStyleY4 = {
    data : {
    stroke : dataColorSet[3],
    strokeWidth : ({ active }) => active ? 3 : 2,
    opacity : ({ active }) => active ? 1 : 0.3
    }
}

export const lineStyleY5 = {
    data : {
    stroke : dataColorSet[4],
    strokeWidth : ({ active }) => active ? 3 : 2,
    opacity : ({ active }) => active ? 1 : 0.3
    }
}

export const lineStyleY6 = {
    data : {
    stroke : dataColorSet[5],
    strokeWidth : ({ active }) => active ? 3 : 2,
    opacity : ({ active }) => active ? 1 : 0.3
    }
}


/* ----------- 2. scatter style ----------- */
export const scatterStyleY1 = {
    data : {
    fill : dataColorSet[0],
    opacity : ({ active }) => active ? 1 : 0.3
    }
} 

export const scatterStyleY2 = {
    data : {
    fill : dataColorSet[1],
    opacity : ({ active }) => active ? 1 : 0.3
    }
} 

export const scatterStyleY3 = {
    data : {
    fill : dataColorSet[2],
    opacity : ({ active }) => active ? 1 : 0.3
    }
} 

export const scatterStyleY4 = {
    data : {
    fill : dataColorSet[3],
    opacity : ({ active }) => active ? 1 : 0.3
    }
} 

export const scatterStyleY5 = {
    data : {
    fill : dataColorSet[4],
    opacity : ({ active }) => active ? 1 : 0.3
    }
} 

export const scatterStyleY6 = {
    data : {
    fill : dataColorSet[5],
    opacity : ({ active }) => active ? 1 : 0.3
    }
} 