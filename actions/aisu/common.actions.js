import * as commonTypes from '../action-types/common.action.types'


/**
 * 
 * @param {*} dispatch 
 * @param {*} type 
 * @param {*} user 
 * @param {*} users 
 * @param {*} error 
 * @param {*} message 
 * @param {*} recordsCount 
 */
const dispatchAction = (dispatch, type, error, message, notification, data) => {
    dispatch({
        type,
        message,
        error,
        notification,
        data
    });
};

export const processFlowSelection = (processFlowCode, processFlowMasterId, auditFlowMasterId, processFlowName, auditPlanDetailsId) => async dispatch => {
    let data = {
        'processFlowCode': processFlowCode,
        'processFlowMasterId': processFlowMasterId,
        'auditFlowMasterId': auditFlowMasterId,
        'processFlowName': processFlowName,
        'auditPlanDetailsId': auditPlanDetailsId
    }
    dispatchAction(dispatch, commonTypes.PROCESS_FLOW_SELECTED, null, '', false, data);
};

export const showNotification = message => async dispatch => {
    dispatchAction(dispatch, commonTypes.NOTIFICATION_SHOW, null, message, true, null);
};


export const hideNotification = () => async dispatch => {
    dispatchAction(dispatch, commonTypes.NOTIFICATION_HIDE, null, '', false, null);
};


export const showSticky = html => async dispatch => {
    dispatchAction(dispatch, commonTypes.STICKY_SHOW, null, html, false, null);
};


export const hideSticky = () => async dispatch => {
    dispatchAction(dispatch, commonTypes.STICKY_HIDE, null, '', false, null);
};


export const showLoader = () => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, '', false, null);
};


export const hideLoader = () => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, '', false, null);
};

export const showAlert = message => async dispatch => {
    dispatchAction(dispatch, commonTypes.SHOW_ALERT, null, message, true, null);
};


export const hideAlert = () => async dispatch => {
    dispatchAction(dispatch, commonTypes.HIDE_ALERT, null, '', false, null);
};
