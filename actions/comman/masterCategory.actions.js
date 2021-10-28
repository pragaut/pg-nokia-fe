import * as commonTypes from '../action-types/common.action.types';
import * as service from '../services/data.service';
import * as masterCategoryTypes from '../action-types/masterCategory.action.types';
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
const dispatchAction = (dispatch, type, data, error, message, recordsCount) => {
    dispatch({
        type,
        message,
        data,
        error,
        recordsCount
    });
};

export const initMasterCategoryType = () => dispatch => {
    dispatchAction(dispatch, masterCategoryTypes.MASTERCATEGORY_INIT, null, null, null, null);
};

export const saveMasterCategorys = masterCategory => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/masterCategory/`;
        const data = (typeof masterCategory.id === 'undefined' || masterCategory.id === -1) ? await service.post(url, masterCategory, true)
            : await service.put(url, masterCategory, true);

        if (data && !data.errorMessage) {

            if (typeof masterCategory.id === 'undefined') masterCategory.id = data.data.id;

            dispatchAction(dispatch, masterCategoryTypes.MASTERCATEGORY_SAVE_SUCCESS, masterCategory, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Master Categoty updated successfully',
                error: undefined,
                notification: true
            });
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




export const getMasterCategorysById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `audit/masterCategory?id=${id}`;
        const data = await service.get(url, true);       
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, masterCategoryTypes.MASTERCATEGORY_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
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

// export const getMasterCategorysByCode = (masterCategoryCode) => async dispatch => {
//     //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
//     try {
//         let url = config.AUTH_URL + `audit/masterCategory?masterCategoryCode${masterCategoryCode}`;
//         const data = await service.get(url, true);
//         if (data && !data.errorMessage) {
//             // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
//             dispatchAction(dispatch, masterCategoryTypes.MASTERCATEGORY_GET_BY_CODE_SUCCESS, data.data, null, data.message, null);
//         }
//         else {
//             dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Master Categoty error'), null, null);
//         }
//     }
//     catch (error) {
//         console.error('error: ', error);
//         // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
//         dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
//     }

// };




export const getMasterCategorys = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/masterCategory?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
         if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, masterCategoryTypes.MASTERCATEGORY_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
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

export const deleteMasterCategorys = masterCategoryIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/masterCategory`;

        const data = await service._delete(url + '?id=' + masterCategoryIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, masterCategoryTypes.MASTERCATEGORY_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Master Categoty(s) deleted successfully',
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
