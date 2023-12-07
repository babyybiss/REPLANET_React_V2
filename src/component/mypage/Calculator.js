import { useEffect, useState } from "react";

function Calculator() {

    const [inputValue, setInputValue] = useState(
        {
            totalSalary: 0,
            totalDonation: 0,
            earnedIncome: 0,
            incomeAfterDeduction: 0,
            taxDeductionRate: 0.15,
            taxDeductionAmount: 0,
            taxableIncome: 0
        }
    );

    const { totalSalary,
        totalDonation,
        earnedIncome,
        incomeAfterDeduction,
        taxDeductionRate,
        taxDeductionAmount,
        taxableIncome
    } = inputValue;

    const calculateTaxableIncome = (totalDonation, earnedIncome) => {
        return Math.min(totalDonation, earnedIncome);
    };

    const MAX_TOTAL_SALARY = 100000000000000;

    const calculateIncomeAfterDeduction = (totalSalary) => {
        let incomeAfterDeduction = 0;

        if (totalSalary <= 5000000) {
            incomeAfterDeduction = totalSalary * 0.7;
        } else if (totalSalary <= 15000000) {
            incomeAfterDeduction = 3500000 + (totalSalary - 5000000) * 0.4;
        } else if (totalSalary <= 45000000) {
            incomeAfterDeduction = 7500000 + (totalSalary - 15000000) * 0.15;
        } else if (totalSalary <= 100000000) {
            incomeAfterDeduction = 12000000 + (totalSalary - 45000000) * 0.05;
        } else {
            incomeAfterDeduction = 14750000 + (totalSalary - 100000000) * 0.02;
        }
        return incomeAfterDeduction;
    }

    const calculateTaxDeductionRate = (totalDonation) => {
        let taxDeductionRate = 0;

        if (totalDonation <= 10000000) {
            taxDeductionRate = 0.15
        } else {
            taxDeductionRate = 0.3
        }
        return taxDeductionRate;
    }

    const calculateTaxDeductionAmount = (taxableIncome, taxDeductionRate) => {
        return Math.ceil(taxableIncome * taxDeductionRate);
    };

    const parseNumber = (value) => isNaN(parseInt(value.replace(/,/g, ''), 10)) ? 0 : parseInt(value.replace(/,/g, ''), 10);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        const parsedValue = parseNumber(value);

        const limitedValue = Math.min(parsedValue, MAX_TOTAL_SALARY);

        setInputValue((prevInputValue) => ({
            ...prevInputValue,
            [name]: limitedValue,
        }));
    };

    useEffect(() => {
        const newIncomeAfterDeduction = Math.ceil(calculateIncomeAfterDeduction(totalSalary));
        const earnedIncome = totalSalary - newIncomeAfterDeduction;

        const incomeAfterDeductionLimited = Math.min(newIncomeAfterDeduction, 20000000);

        const newTaxableIncome = calculateTaxableIncome(totalDonation, earnedIncome);

        const newTaxDeductionRate = calculateTaxDeductionRate(totalDonation);
        const newTaxDeductionAmount = calculateTaxDeductionAmount(newTaxableIncome, newTaxDeductionRate);

        const taxDeductionAmountLimited = Math.min(newTaxDeductionAmount, earnedIncome);

        setInputValue((prevInputValue) => ({
            ...prevInputValue,
            incomeAfterDeduction: incomeAfterDeductionLimited,
            earnedIncome: earnedIncome,
            taxableIncome: newTaxableIncome,
            taxDeductionRate: newTaxDeductionRate,
            taxDeductionAmount: taxDeductionAmountLimited,
        }));

        console.log('inputValue : ', inputValue);
    }, [totalSalary, totalDonation]);


    return (



        <>
            <div className="admin-main">
                <div className="admin-title">
                    <h1 class="text-primary">세액공제 계산기(법정기부금)</h1>
                </div>
                <table>
                    <tr>
                        <td>총 급여액</td>
                        <td>
                            <input
                                id="totalSalary"
                                name="totalSalary"
                                className="input"
                                type="text"
                                min="0"
                                value={totalSalary.toLocaleString()}
                                onChange={onChangeHandler}
                                onClick={(e) => e.target.select()}
                                style={{ maxWidth: '200px' }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>총 기부 금액(연간 기부 금액)</td>
                        <td>
                            <input
                                id="totalDonation"
                                name="totalDonation"
                                className="input"
                                type="text"
                                min="0"
                                value={totalDonation.toLocaleString()}
                                onChange={onChangeHandler}
                                onClick={(e) => e.target.select()}
                                style={{ maxWidth: '200px' }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>근로소득금액(총급여액 - 근로소득 공제액<small>(공제한도 2,000만 원)</small>)</td>
                        <td style={{ maxWidth: '200px' }}>{earnedIncome.toLocaleString()}원 ({totalSalary.toLocaleString()}원 - {incomeAfterDeduction.toLocaleString()}원)</td>
                    </tr>
                    <tr>
                        <td>대상금액(한도 = 근로소득금액)</td>
                        <td>{taxableIncome.toLocaleString()}원</td>
                    </tr>
                    <tr>
                        <td>세액공제율(일반 세액공제율 적용)</td>
                        <td>{taxDeductionRate.toLocaleString() * 100} %</td>
                    </tr>
                    <tr>
                        <td className="text-bold">세액공제액</td>
                        <td className="text-bold">{taxDeductionAmount.toLocaleString()}원</td>
                    </tr>
                </table>
            <div style={{padding: '20px'}}>
                <h4 className="text-primary">주의사항</h4>
                <ol>
                    <li>기부금 중 <span className="pay-color-green" style={{ fontWeight: 'bold' }}>법정기부금</span>에 한해서만 계산을 하실 수 있도록 만들어진 계산기입니다. </li>
                    <li>정치자금 기부금, 우리사주조합 기부금, 지정 기부금 계산은 불가능합니다.</li>
                    <li><span className="pay-color-green" style={{ fontWeight: 'bold' }}>세액공제율</span> 같은 경우 한시적으로 변경이 될 수 있습니다.</li>
                    <li><span className="pay-color-green" style={{ fontWeight: 'bold' }}>기부금 세액공제</span>는 기부자가 근로자 본인이거나 배우자, 직계존속(부모님, 조부모, 외조부모 등), 직계비속(자녀, 손자‧손녀, 외손자‧외손녀 등) 등의 기본공제 대상자(나이 요건 제한 없음, 소득 요건 제한 있음)인 경우에만 혜택을 제공받을 수 있습니다.</li>
                    <li>최대 100조까지 입력 가능합니다.</li>
                </ol>
                <hr/>
                <h4 className="text-primary">참고사항</h4>
                <ol>
                    <li>국세청에서는 ‘특별재해(재난)지역’의 복구를 위한 <span className="pay-color-green" style={{ fontWeight: 'bold' }}>자원봉사</span> 시간을 금품으로 환산해 <span className="pay-color-green" style={{ fontWeight: 'bold' }}>기부금 세액공제</span> 혜택을 제공하고 있습니다. 특별재해(재난)지역으로 선포된 이후 뿐 아니라 선포되기 이전에 했던 <span className="pay-color-green" style={{ fontWeight: 'bold' }}>자원봉사</span>에도 동일하게 적용합니다.</li>
                    <li>자원봉사 후 해당 지역의 지방자치단체장 혹은 지방자치단체장의 위임을 받은 단체의 장이나 자원봉사센터장으로부터 ‘특별재해(재난)지역 자원봉사용역 등에 대한 <span className="pay-color-green" style={{ fontWeight: 'bold' }}>기부금 확인서</span>를 발급받아야 합니다.</li>
                    <li>이 같은 자원봉사용역은 <span className="pay-color-green" style={{ fontWeight: 'bold' }}>법정기부금과 같은 조건</span>으로 공제되는데요. 자원봉사 8시간을 1일로 환산해 봉사일수에 5만원을 곱한 금액을 공제해주고 있습니다.</li>
                </ol>
                <hr/>
                <h4 className="text-primary">참고링크</h4>
                    <div class="items-container ic3">

                    <button onClick={()=>window.open('https://finsupport.naver.com/contentsGuide/264')} class="button button-primary">2023년 달라진 기부금 세액공제(링크)</button>
                            <button onClick={()=>window.open('https://finsupport.naver.com/contentsGuide/119')} class="button button-primary">가족 대상 소득‧세액공제 총정리(링크)</button>
                    </div>
            </div>
            </div>
        </>
    );
}

export default Calculator;