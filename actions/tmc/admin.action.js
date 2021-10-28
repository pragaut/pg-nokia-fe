import * as commonTypes from '../../action-types/comman/common.action.types';
import * as service from '../../services/data.service';
import * as adminTypes from '../../action-types/tmc/admin.action.types';
import * as util from '../../utils'
import config from '../../config';
import * as errorTypes from '../../action-types/comman/error.action.types'; 


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

//#region Tower Master

export const initTowerMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.TOWERMASTER_INIT, null, null, null, null);
};

export const saveTowerMasterData = towerMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
       
        let url = config.NOKIA_URL + `nokia/nokiaadmin/towerMaster/`;
        const data = (typeof towerMaster.id === 'undefined' || towerMaster.id === -1) ? await service.post(url, towerMaster, true)
            : await service.put(url, towerMaster, true);
       
        if (data && !data.errorMessage) {

            //if (typeof towerMaster.id === 'undefined') towerMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.TOWERMASTER_SAVE_SUCCESS, towerMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Tower master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getTowerMasterDataById = (id) => async dispatch => {
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/towerMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.TOWERMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getTowerMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/towerMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("getTowerMasterData data ",data);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.TOWERMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteTowerMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/towerMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.TOWERMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Tower Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Mastererror'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Tower Allotment Master

export const initTowerAllotmentMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.TOWERALLOTMENTMASTER_INIT, null, null, null, null);
};

export const saveTowerAllotmentMasterData = towerAllotmentMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/towerAllotmentMaster/`;
        const data = (typeof towerAllotmentMaster.id === 'undefined' || towerAllotmentMaster.id === -1) ? await service.post(url, towerAllotmentMaster, true)
            : await service.put(url, towerAllotmentMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof towerAllotmentMaster.id === 'undefined') towerAllotmentMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.TOWERALLOTMENTMASTER_SAVE_SUCCESS, towerAllotmentMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Tower allotment master submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Allotment Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getTowerAllotmentMasterDataById = (id) => async dispatch => {
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/towerAllotmentMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.TOWERALLOTMENTMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Allotment Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getTowerAllotmentMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/towerAllotmentMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("getTowerAllotemntMasterData data ",data);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.TOWERALLOTMENTMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Allotment Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteTowerAllotmentMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/towerAllotmentMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.TOWERALLOTMENTMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Tower Allotment Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Tower Allotment Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion
 
 