import * as commonTypes from '../action-types/common.action.types';
import * as service from '../services/data.service';
import * as masterDetailsTypes from '../action-types/masterDetails.action.types';
import * as util from '../utils'
import config from '../config';
import * as errorTypes from '../action-types/error.action.types';

/**
 * 
 * @param {*} dispatch 
 * @param {*} type 
 * @param {*} data 
 * @param {*} error 
 * @param {*} message 
 * @param {*} recordsCount 
 */
const dispatchAction = (dispatch, type, data, error, message, recordsCount, masterCode = null) => {
    dispatch({
        type,
        message,
        data,
        error,
        recordsCount,
        masterCode
    });
};

export const initMasterDetailsType = () => dispatch => {
    dispatchAction(dispatch, masterDetailsTypes.MASTERDETAILS_INIT, null, null, null, null);
};

export const saveMasterDetails = masterDetails => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/masterDetails/`;
        const data = (typeof masterDetails.id === 'undefined' || masterDetails.id === -1) ? await service.post(url, masterDetails, true)
            : await service.put(url, masterDetails, true);
        console.log("Master Details 2", data);
        if (data && !data.errorMessage) {

            if (typeof masterDetails.id === 'undefined') masterDetails.id = data.data.id;

            dispatchAction(dispatch, masterDetailsTypes.MASTERDETAILS_SAVE_SUCCESS, masterDetails, null, data.message, null);
            let Messagedetails = masterDetails && masterDetails.MasterName ? masterDetails.MasterName + ' add successfully' : 'Master details updated successfully';
            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: Messagedetails,
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Master Categoty error'), null, null);
        }
    }
    catch (error) {
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};




export const getMasterDetailsById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `audit/masterDetails?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //    dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, masterDetailsTypes.MASTERDETAILS_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Master Categoty error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};



export const getMasterDetailsByMasterCategoryId = (pageIndex, rowsToReturn, order, where, masterCategoryId) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {

        let url = config.AUTH_URL + `audit/masterDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}&masterCategoryId=${masterCategoryId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, masterDetailsTypes.MASTERDETAILS_GET_BY_MASTERCATEGORYID_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Master Categoty error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getMasterDetailsBymasterCategoryCode = (pageIndex, rowsToReturn, order, where, masterCategoryCode) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {

        let url = config.AUTH_URL + `audit/masterDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}&masterCategoryCode=${masterCategoryCode}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("MasterCategoryIdByCode 1", data)
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, masterDetailsTypes.MASTERDETAILS_GET_BY_MASTERCATEGORYID_SUCCESS, data.data, null, data.message, data.recordsCount, masterCategoryCode);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Master Details by category code error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getMasterDetails = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/masterDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, masterDetailsTypes.MASTERDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Master Categoty error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteMasterDetails = masterDetailsIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/masterDetails`;

        const data = await service._delete(url + '?id=' + masterDetailsIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, masterDetailsTypes.MASTERDETAILS_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Master Detail(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Master Categoty error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
