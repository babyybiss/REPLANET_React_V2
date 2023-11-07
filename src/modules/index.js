import { combineReducers } from 'redux';
import campaignReducer from './CampaignModule'
import reviewReducer from './ReviewModule';

const rootReducer = combineReducers({
    campaignReducer,
    reviewReducer
});

export default rootReducer;