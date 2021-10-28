import * as commonTypes from '../../action-types/comman/common.action.types';
import * as service from '../../services/data.service';
import * as adminTypes from '../../action-types/comman/admin.action.types';
import * as util from '../../utils'
import config from '../../config';
import * as errorTypes from '../../action-types/comman/error.action.types'; 
import { getLoggedUser, getLoggedUserRole, saveCurrent_YearType_Year_IsCentralPlantCompany } from '../../utils/session.helper'


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

//#region Group Master

export const initGroupMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.GROUPMASTER_INIT, null, null, null, null);
};
export const saveGroupMasterData = groupMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/groupMaster/`;
        const data = (typeof groupMaster.id === 'undefined' || groupMaster.id === -1) ? await service.post(url, groupMaster, true)
            : await service.put(url, groupMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof groupMaster.id === 'undefined') groupMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.GROUPMASTER_SAVE_SUCCESS, groupMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Group master submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Group Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getGroupMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `nokia/admin/groupMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.GROUPMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Group Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};
export const getGroupMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/groupMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.GROUPMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Group Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const deleteGroupMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/groupMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.GROUPMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Group Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Group Mastererror'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region Org Relation Type Master

export const initOrgRelationTypeMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.ORGRELATIONTYPEMASTER_INIT, null, null, null, null);
};
export const saveOrgRelationTypeMasterData = OrgRelationTypeMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/orgRelationTypeMaster/`;
        const data = (typeof OrgRelationTypeMaster.id === 'undefined' || OrgRelationTypeMaster.id === -1) ? await service.post(url, OrgRelationTypeMaster, true)
            : await service.put(url, OrgRelationTypeMaster, true);

        if (data && !data.errorMessage) {


            dispatchAction(dispatch, adminTypes.ORGRELATIONTYPEMASTER_SAVE_SUCCESS, OrgRelationTypeMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Org relation type master submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Org Relation Type Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getOrgRelationTypeMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `nokia/admin/orgRelationTypeMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ORGRELATIONTYPEMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Org Relation Type Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};
export const getOrgRelationTypeMasterData = (pageIndex, rowsToReturn, order, where, groupId) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/orgRelationTypeMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        if(groupId && groupId)
        {
            url = url + `&groupId=${groupId}`;
        }
        const data = await service.get(url, true);
        console.log("Org Relation Type Master : ", data)
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ORGRELATIONTYPEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Org Relation Type Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const deleteOrgRelationTypeMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/orgRelationTypeMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.ORGRELATIONTYPEMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Org Relation Type Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Org Relation Type Master Error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Alarm Type Master

export const initAlarmTypeMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.ALARMTYPEMASTER_INIT, null, null, null, null);
};

export const saveAlarmTypeMasterData = alarmTypeMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/alarmTypeMaster/`;
        const data = (typeof alarmTypeMaster.id === 'undefined' || alarmTypeMaster.id === -1) ? await service.post(url, alarmTypeMaster, true)
            : await service.put(url, alarmTypeMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof alarmTypeMaster.id === 'undefined') alarmTypeMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.ALARMTYPEMASTER_SAVE_SUCCESS, alarmTypeMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Alarm type master submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Alarm Type Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getAlarmTypeMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `nokia/admin/alarmTypeMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ALARMTYPEMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Alarm Type Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getAlarmTypeMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/alarmTypeMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ALARMTYPEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Alarm Type Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteAlarmTypeMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/alarmTypeMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.ALARMTYPEMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Alarm Type Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Alarm Type Mastererror'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Notification Master

export const initNotificationMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTER_INIT, null, null, null, null);
};

export const saveNotificationMasterData = notificationMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/notificationMaster/`;
        const data = (typeof notificationMaster.id === 'undefined' || notificationMaster.id === -1) ? await service.post(url, notificationMaster, true)
            : await service.put(url, notificationMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof notificationMaster.id === 'undefined') notificationMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTER_SAVE_SUCCESS, notificationMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Notification master submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Notification Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getNotificationMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `nokia/admin/notificationMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'NOtification Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getNotificationMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/notificationMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Notification Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteNotificationMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/notificationMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Notification Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Notification Mastererror'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Module Master

export const initModuleMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.MODULEMASTER_INIT, null, null, null, null);
};

export const saveModuleMasterData = moduleMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/moduleMaster/`;
        const data = (typeof moduleMaster.id === 'undefined' || moduleMaster.id === -1) ? await service.post(url, moduleMaster, true)
            : await service.put(url, moduleMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof moduleMaster.id === 'undefined') moduleMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.MODULEMASTER_SAVE_SUCCESS, moduleMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Module master submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Module Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getModuleMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `nokia/admin/moduleMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.MODULEMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Module Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getModuleMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/moduleMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.MODULEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Module Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteModuleMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/moduleMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.MODULEMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Module Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Module Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Year Master


export const getYearMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    try {
        let url = config.AUTH_URL + `nokia/admin/yearMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("yearData", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.YEARMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Year Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region Role Master

export const initRoleMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.ROLEMASTER_INIT, null, null, null, null);
};

export const saveRoleMasterData = roleMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/roleMaster/`;
        const data = (typeof roleMaster.id === 'undefined' || roleMaster.id === -1) ? await service.post(url, roleMaster, true)
            : await service.put(url, roleMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof roleMaster.id === 'undefined') roleMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.ROLEMASTER_SAVE_SUCCESS, roleMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Role master submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Role Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getRoleMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `nokia/admin/roleMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ROLEMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Role Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getRoleMasterByModuleId = (org_modules_id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `nokia/admin/roleMaster/getByModuleId?org_modules_id=${org_modules_id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ROLEMASTER_GET_BY_MODULEID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Role Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getRoleMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/roleMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ROLEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Role Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteRoleMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/roleMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.ROLEMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Role Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Role Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Group Company Master

export const initCompanyMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.COMPANYMASTER_INIT, null, null, null, null);
};

export const saveCompanyMasterData = Company => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/companyMaster/`;
        const data = (typeof Company.id === 'undefined' || Company.id === -1) ? await service.post(url, Company, true)
            : await service.put(url, Company, true);

        if (data && !data.errorMessage) {

            //if (typeof Company.id === 'undefined') Company.id = data.data.id;

            dispatchAction(dispatch, adminTypes.COMPANYMASTER_SAVE_SUCCESS, Company, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Group company submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Group Company error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getCompanyMasterById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `nokia/admin/companyMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.COMPANYMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Group Company error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getCompanyMasterByGroupId = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `nokia/admin/companyMaster/getByGroupMasterId?groupMasterID=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.COMPANYMASTER_GET_BY_GROUPID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Group Company error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getCompanyMaster = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/companyMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.COMPANYMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Group Company error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteCompanyMaster = MasterIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/companyMaster`;

        const data = await service._delete(url + '?id=' + MasterIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.COMPANYMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Company(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Group Company error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

 
//#region User

export const saveUserData = user => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/user/`;
        const data = (typeof user.id === 'undefined' || user.id === -1) ? await service.post(url, user, true)
            : await service.put(url, user, true);
        console.log("data", data);
        console.log("data.code", data.code);
        if (data && !data.errorMessage && (data.code === 200 || data.code === '200')) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.USER_SAVE_SUCCESS, user, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'User submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else if (data && data.code === '305') {
            let ErrorMesage = {
                name: '',
                message: data.message,
                stack: ''
            }
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Usererror'), null, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Usererror'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const unLockAccount = user => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {

        const dataToBeSend = {
            id: user.id,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        let url = config.AUTH_URL + `nokia/user/unLockAccount`;
        const data = await service.put(url, dataToBeSend, true);

        if (data && !data.errorMessage) {

            //     if (typeof user.id === 'undefined') user.id = data.data.id;

            dispatchAction(dispatch, adminTypes.USER_SAVE_SUCCESS, user, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'User unlocked successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Usererror'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getUserDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `nokia/user?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.USER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'User error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getUserDetailsP = (pageIndex, rowsToReturn, order, where, userFilters) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        console.log("getUserDetailsP","Get User Details Here");
        let url = config.AUTH_URL + `nokia/user/getUsersP?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        url = url + `&userId=${userFilters && userFilters.userId ? userFilters.userId : ''}`; 
        url = url + `&roleMasterId=${userFilters && userFilters.roleMasterId && userFilters.roleMasterId !== null && userFilters.roleMasterId !== '-1' ? userFilters.roleMasterId : ''}`;
       // console.log("url : 1",url);
        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }

        const data = await service.get(url, true);

        
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.USER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Usererror'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getUserData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let LoggedUserCategory = JSON.parse(getLoggedUserRole());
        let Loggeduser = getLoggedUser();
        let LoggedUserPlantId = Loggeduser && Loggeduser.plantMasterId;
        let RoleCategory = LoggedUserCategory ? LoggedUserCategory.roleCategory : undefined;

        let url = config.AUTH_URL + `nokia/user?pageIndex=${pageIndex}&rows=${rowsToReturn}`
        if (RoleCategory && RoleCategory === "Company Admin") {
            url = url + `&plantMasterId=${LoggedUserPlantId}`;
        }
        // let url = config.AUTH_URL + `audit/user?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.USER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Usererror'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getUserByPlantId = (pageIndex, rowsToReturn, order, where, id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let groupId = "";
        let plantId = id ? id : plantId;
        let url = config.AUTH_URL + `nokia/user/getUsersP?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        url = url + `&plantMasterId=${id}`;

        //let url = config.AUTH_URL + `audit/user/getByPlantId?plantId=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.USER_GET_BY_PLANTID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'User error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getUserByPlantDepartmentId = (plantId, departmentId) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `nokia/user/getByPlantId?plantId=${plantId},departmentId=${departmentId}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.USER_GET_BY_GROUPID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'User error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteUserData = userId => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/user`;

        const data = await service._delete(url + '?id=' + userId, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.USER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'User deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Usererror'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getCurrentUserSessionDetails = () => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let pageIndex = 0;
        let rowsToReturn = 1;
        let Loggeduser = getLoggedUser();
        let userMasterId = Loggeduser && Loggeduser.id;
        let plantMasterId = Loggeduser && Loggeduser.plantMasterId;
        let companyMasterId = Loggeduser && Loggeduser.plantMaster && Loggeduser.plantMaster.companyMasterID;
        let url = config.AUTH_URL + `nokia/user/getCurrentUserSessionDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        url = url + `&userMasterId=${userMasterId && userMasterId ? userMasterId : ''}`;
        url = url + `&plantMasterId=${plantMasterId && plantMasterId ? plantMasterId : ''}`;
        url = url + `&companyMasterId=${companyMasterId && companyMasterId ? companyMasterId : ''}`;

        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            saveCurrent_YearType_Year_IsCentralPlantCompany(data.data)
            //dispatchAction(dispatch, adminTypes.USER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Usererror'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion
 
//#region Country Master

export const getCountryMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/countryMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.COUNTRYMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Country Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
         //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region State Master


export const getStateMasterData = (pageIndex, rowsToReturn, order, where, countryId) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/stateMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        if (countryId) {
            url = url + `&countryId=${countryId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.STATEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'State Master error'), null, null);
                }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
    
    };
//#endregion

//#region City Master

export const getCityMasterData = (pageIndex, rowsToReturn, order, where,stateId) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/cityMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
              if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
           if (stateId) {
            url = url + `&stateId=${stateId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.CITYMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'City Master error'), null, null);
              }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region Gender Master

export const getGenderMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/genderMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.GENDERMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Gender Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
          //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Organisation Details
export const initOrganisationDetails = () => dispatch => {
    dispatchAction(dispatch, adminTypes.ORGANISATIONDETAILS_INIT, null, null, null, null);
};
export const saveOrganisationDetails = Organisation => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/organisationDetails/`;
        const data = (typeof Organisation.id === 'undefined' || Organisation.id === -1) ? await service.post(url, Organisation, true)
            : await service.put(url, Organisation, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.ORGANISATIONDETAILS_SAVE_SUCCESS, Organisation, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Organisation details submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Organisation Master have some error pls check !!'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getOrganisationDetailsDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `nokia/admin/organisationDetails?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ORGANISATIONDETAILS_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Organisation Master have some error pls check !!'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};
export const getOrganisationDetailsData = (pageIndex, rowsToReturn, order, where, filterparameter) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let pageIndex = 0;
        let url = config.AUTH_URL + `nokia/admin/organisationDetails?pageIndex=${pageIndex}`;

        if (filterparameter && filterparameter.groupId && filterparameter.groupId !== null && filterparameter.groupId !== 'undefined' && filterparameter.groupId !== '-1') {
            url = url + `&groupId=${filterparameter.groupId}`;
        }
        if (filterparameter && filterparameter.orgRelationTypeId && filterparameter.orgRelationTypeId !== null && filterparameter.orgRelationTypeId !== 'undefined' && filterparameter.orgRelationTypeId !== '-1') {
            url = url + `&orgRelationTypeId=${filterparameter.orgRelationTypeId}`;
        }
        const data = await service.get(url, true);
        console.log('Get Organisation Details Data', data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ORGANISATIONDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Organisation Master have some error pls check !!'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const deleteOrganisationDetailsData = Ids => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/organisationDetails`;

        const data = await service._delete(url + '?id=' + Ids, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.ORGANISATIONDETAILS_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Organisation Detail(s) deleted successfully !!',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Organisation Master have some error pls check !!'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Organisation Employee Details
export const initOrganisationEmployeeDetails = () => dispatch => {
    dispatchAction(dispatch, adminTypes.ORGANISATIONEMPLOYEEDETAILS_INIT, null, null, null, null);
};
export const saveOrganisationEmployeeDetails = OrganisationEmployee => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/organisationEmployeeDetails/`;
        const data = (typeof OrganisationEmployee.id === 'undefined' || OrganisationEmployee.id === -1) ? await service.post(url, OrganisationEmployee, true)
            : await service.put(url, OrganisationEmployee, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.ORGANISATIONEMPLOYEEDETAILS_SAVE_SUCCESS, OrganisationEmployee, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Organisation employee details submitted successfully',
                  error: undefined,
                notification: true
            });
        }
        else {
              dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Organisation Employee Master have some error pls check !!'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getOrganisationEmployeeDetailsDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `nokia/admin/organisationEmployeeDetails?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ORGANISATIONEMPLOYEEDETAILS_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Organisation Employee Master have some error pls check !!'), null, null);
             }
    }
    catch (error) {
        console.error('error: ', error);
           dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};
export const getOrganisationEmployeeDetailsData = (pageIndex, rowsToReturn, order, where, filterparameter) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let pageIndex = 0;
        
        let url = config.AUTH_URL + `nokia/admin/organisationEmployeeDetails?pageIndex=${pageIndex}`;

        console.log("filterparameter: Org Empl : ---------",filterparameter)

        if (filterparameter && filterparameter.orgDetailsId && filterparameter.orgDetailsId !== null && filterparameter.orgDetailsId !== 'undefined' && filterparameter.orgDetailsId !== '-1') {
            url = url + `&orgDetailsId=${filterparameter.orgDetailsId}`;
        }
        const data = await service.get(url, true);
        console.log('Get Organisation Employee Details Data', data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ORGANISATIONEMPLOYEEDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Organisation Employee Master have some error pls check !!'), null, null);
               }
    }
    catch (error) {
        console.error('error: ', error);
               // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const deleteOrganisationEmployeeDetailsData = Ids => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/organisationEmployeeDetails`;

        const data = await service._delete(url + '?id=' + Ids, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.ORGANISATIONEMPLOYEEDETAILS_DELETE_SUCCESS, null, null, null, data.message);
            
            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                       message: 'Organisation Employee Detail(s) deleted successfully !!',
                         error: undefined,
                    notification: true
                }), 500);
        }
        else {
              dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Organisation Employee Master have some error pls check !!'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

 //#region Device Registration Master

export const initDeviceRegistrationMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.DEVICEREGISTRATIONMASTER_INIT, null, null, null, null);
};

export const saveDeviceRegistrationMasterData = deviceRegistrationMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/deviceRegistrationMaster/`;
        const data = (typeof deviceRegistrationMaster.id === 'undefined' || deviceRegistrationMaster.id === -1) ? await service.post(url, deviceRegistrationMaster, true)
            : await service.put(url, deviceRegistrationMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof deviceRegistrationMaster.id === 'undefined') deviceRegistrationMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.DEVICEREGISTRATIONMASTER_SAVE_SUCCESS, deviceRegistrationMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Device registration master submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Registration Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getDeviceRegistrationMasterDataById = (id) => async dispatch => {
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/deviceRegistrationMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.DEVICEREGISTRATIONMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Registration Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getDeviceRegistrationMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/deviceRegistrationMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("getDeviceRegistrationMasterData data ",data);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.DEVICEREGISTRATIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Registration Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteDeviceRegistrationMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.NOKIA_URL + `nokia/nokiaadmin/deviceRegistrationMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.DEVICEREGISTRATIONMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Device Registration Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Device Registration Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Organisation Group Module Details

export const getOrganisationGroupModulesMasterData = (pageIndex, rowsToReturn, order, where,grpModuleId) => async dispatch => {
    
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/organisationGroupModuleDetails?pageIndex=${pageIndex}`;
        if(grpModuleId && grpModuleId !==null)
        {
            url = url + `&grpModuleId=${grpModuleId}`;
        }
 
        const data = await service.get(url, true);
        console.log("getOrganisationGroupModulesMasterData data ",data);
        if (data && !data.errorMessage) {
            //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ORGANISATIONGROUPMODULEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Organisation Modules Details Getting Error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const saveOrganisationGroupModulesMasterData = dataSubmit => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `nokia/admin/organisationGroupModuleDetails/`;
       console.log("dataSubmit -------------", dataSubmit);
        const data = await service.post(url, dataSubmit, true) 
        if (data && !data.errorMessage) { 
            //if (typeof moduleMaster.id === 'undefined') moduleMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.ORGANISATIONGROUPMODULEMASTER_SAVE_SUCCESS, dataSubmit, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Module master submitted successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Module Master error'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion