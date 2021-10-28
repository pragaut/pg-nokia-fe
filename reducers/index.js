import { combineReducers } from "redux";
 
import adminReducerAisu from './aisu/admin.reducer';
import workingReducerAisu from './aisu/working.reducer'; 
import reportReducerAisu from './aisu/report.reducer' 

import postReducer from './comman/postReducer';
import accountReducer from './comman/account.reducer';
import commonReducer from './comman/common.reducer';
import windowReducer from './comman/window.reducer';
import errorReducer from './comman/error.reducer';
import masterCategoryReducer from './comman/masterCategory.reducer';
import masterDetailReducer from './comman/masterDetails.reducer';
import masterDetailByCategoryReducer from './comman/masterDetailsByCategory.reducer';
import adminReducer from './comman/admin.reducer';
import workingReducer from './comman/working.reducer'; 
import reportReducer from './comman/report.reducer'

import adminReducerTmc from './tmc/admin.reducer';
import workingReducerTmc from './tmc/working.reducer'; 
import reportReducerTmc from './tmc/report.reducer'

export default combineReducers({
    posts:  postReducer,
    accountReducer,
    commonReducer,
    windowReducer,
    errorReducer,
    masterCategoryReducer,
    masterDetailReducer,
    masterDetailByCategoryReducer,
    adminReducer,
    workingReducer,
    reportReducer,

    adminReducerTmc,
    workingReducerTmc,
    reportReducerTmc,

    adminReducerAisu,
    workingReducerAisu,
    reportReducerAisu
});    
