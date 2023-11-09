import { combineReducers } from 'redux';
import campaignReducer from './CampaignModule'
import reviewReducer from './ReviewModule';
import donationReducer from './DonationModule';

const rootReducer = combineReducers({
    campaignReducer,
    reviewReducer,
    donationReducer
});

export default rootReducer;