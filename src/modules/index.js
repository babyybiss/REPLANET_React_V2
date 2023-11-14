import { combineReducers } from 'redux';
import campaignReducer from './CampaignModule'
import reviewReducer from './ReviewModule';
import donationReducer from './DonationModule';
import exchangeReducer from './PointModule';

const rootReducer = combineReducers({
    campaignReducer,
    reviewReducer,
    donationReducer,
    exchangeReducer
});

export default rootReducer;