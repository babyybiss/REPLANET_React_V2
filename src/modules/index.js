import { combineReducers } from 'redux';
import campaignReducer from './CampaignModule'
import reviewReducer from './ReviewModule';
import donationReducer from './DonationModule';
import exchangeReducer from './PointModule';
import memberReducer from './MemberModule';

const rootReducer = combineReducers({
    campaignReducer,
    reviewReducer,
    donationReducer,
    exchangeReducer,
    memberReducer
});

export default rootReducer;