import * as actionTypes from '../action-types/window.action.types';
import * as helper from '../helper';
//import config from '../config';


/**
 * 
 * 
 * @param {*} dispatch 
 * @param {*} type 
 * @param {*} user 
 * @param {*} users 
 * @param {*} error 
 * @param {*} message 
 * @param {*} recordsCount 
 */
const dispatchAction = (dispatch, type, width, data) => {
    dispatch({
        type,
        width,
        data
    });
};



export const changeWidth = width => async dispatch => {
    dispatchAction(dispatch, actionTypes.WINDOW_WIDTH_CHANGED, width, undefined);
};
export const changeHeight = height => async dispatch => {
    dispatchAction(dispatch, actionTypes.WINDOW_HEIGHT_CHANGED, height, undefined);
};

export const openCartWindow = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.WINDOW_CART_OPEN, -1, undefined);
};


export const closeCartWindow = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.WINDOW_CART_CLOSE, -1, undefined);
};


export const openAuthWindow = () => async dispatch => {

    dispatchAction(dispatch, actionTypes.AUTH_OPEN, -1, undefined);
};


export const closeAuthWindow = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.AUTH_CLOSE, -1, undefined);
};


export const hideRedirectionStatus = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.WINDOW_REDIRECT_DESTROY, -1, undefined);
};

export const enableAnalyticTracking = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.ENABLE_ANALYTIC_TRACKING, true, undefined);
};

export const disableAnalyticTracking = () => async dispatch => {
    dispatchAction(dispatch, actionTypes.DISABLE_ANALYTIC_TRACKING, false, undefined);
};