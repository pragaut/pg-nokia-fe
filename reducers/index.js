import { combineReducers } from "redux";

import postReducer from './postReducer';
import accountReducer from './account.reducer';
import commonReducer from './common.reducer';
import windowReducer from './window.reducer';
import errorReducer from './error.reducer';
import masterCategoryReducer from './masterCategory.reducer';
import masterDetailReducer from './masterDetails.reducer';
import masterDetailByCategoryReducer from './masterDetailsByCategory.reducer';
import adminReducer from './admin.reducer';
import workingReducer from './working.reducer'; 
import reportReducer from './report.reducer'

export default combineReducers({
    posts: postReducer,
    masterDetailReducer,
    accountReducer,
    commonReducer,
    windowReducer,
    errorReducer,
    masterCategoryReducer,
    masterDetailByCategoryReducer,
    adminReducer,
    workingReducer ,
    reportReducer 
});    
