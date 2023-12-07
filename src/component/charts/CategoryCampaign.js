import "../../assets/css/chart.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CategoryChart from "./items/CategoryChart";
import { callGetCategoryDataAPI } from "../../apis/ChartAPI";

function CategoryCampaign() {
    const dispatch = useDispatch();
    const callApiResult = useSelector(state => state.chartReducer)
    const byCategory = callApiResult.byCategory;

    useEffect(
        () => {
            dispatch(callGetCategoryDataAPI());
        }, [dispatch]
    );

    return (
        byCategory && (
            <CategoryChart byCategory={byCategory}/>
        )
    );
}
export default CategoryCampaign;