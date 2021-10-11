import * as commonTypes from '../action-types/common.action.types';
import * as service from '../services/data.service';
import * as adminTypes from '../action-types/admin.action.types';
import * as util from '../utils'
import config from '../config';
import * as errorTypes from '../action-types/error.action.types';
import { constants } from '../utils/constants';
import { getLoggedUser, getLoggedUserRole, saveCurrent_YearType_Year_IsCentralPlantCompany } from '../utils/session.helper'
//import AlarmTypeMaster from '../components/masters/alarmTypeMaster';

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
        let url = config.AUTH_URL + `tmc/admin/groupMaster/`;
        const data = (typeof groupMaster.id === 'undefined' || groupMaster.id === -1) ? await service.post(url, groupMaster, true)
            : await service.put(url, groupMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof groupMaster.id === 'undefined') groupMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.GROUPMASTER_SAVE_SUCCESS, groupMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Group Master updated successfully',
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


export const getGroupMasterDataById = (group_id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `tmc/admin/groupMaster?group_id=${group_id}`;
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
        let url = config.AUTH_URL + `tmc/admin/groupMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

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
        let url = config.AUTH_URL + `tmc/admin/groupMaster`;

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

//#region Alarm Type Master

export const initAlarmTypeMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.ALARMTYPEMASTER_INIT, null, null, null, null);
};

export const saveAlarmTypeMasterData = alarmTypeMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `tmc/admin/alarmTypeMaster/`;
        const data = (typeof alarmTypeMaster.id === 'undefined' || alarmTypeMaster.id === -1) ? await service.post(url, alarmTypeMaster, true)
            : await service.put(url, alarmTypeMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof alarmTypeMaster.id === 'undefined') alarmTypeMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.ALARMTYPEMASTER_SAVE_SUCCESS, alarmTypeMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Alamr Type Master updated successfully',
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


export const getAlarmTypeMasterDataById = (alarm_type_id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `tmc/admin/alarmTypeMaster?alarm_type_id=${alarm_type_id}`;
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
        let url = config.AUTH_URL + `tmc/admin/alarmTypeMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

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
        let url = config.AUTH_URL + `tmc/admin/alarmTypeMaster`;

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

//#region Module Master

export const initModuleMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.MODULEMASTER_INIT, null, null, null, null);
};

export const saveModuleMasterData = moduleMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/moduleMaster/`;
        const data = (typeof moduleMaster.id === 'undefined' || moduleMaster.id === -1) ? await service.post(url, moduleMaster, true)
            : await service.put(url, moduleMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof moduleMaster.id === 'undefined') moduleMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.MODULEMASTER_SAVE_SUCCESS, moduleMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Module Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Module Mastererror'), null, null);
        }
    }
    catch (error) {
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getModuleMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `audit/admin/moduleMaster?id=${id}`;
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
        let url = config.AUTH_URL + `audit/admin/moduleMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

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
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Module Mastererror'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getModuleMasterByGroupId = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let groupId = "";
        let moduleId = id ? id : moduleId;
        let url = config.AUTH_URL + `audit/roleMaster/getByGroupId?moduleId=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.MODULEMASTER_GET_BY_GROUPID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Module Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteModuleMasterData = moduleMasterId => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/moduleMaster`;

        const data = await service._delete(url + '?id=' + moduleMasterId, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.MODULEMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Role Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Module Mastererror'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region  Role Master

export const initRoleMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.ROLEMASTER_INIT, null, null, null, null);
};

export const saveRoleMasterData = roleMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/roleMaster/`;
        const data = (typeof roleMaster.id === 'undefined' || roleMaster.id === -1) ? await service.post(url, roleMaster, true)
            : await service.put(url, roleMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof roleMaster.id === 'undefined') roleMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.ROLEMASTER_SAVE_SUCCESS, roleMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Role Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Role Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getRoleMasterDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `audit/admin/roleMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ROLEMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
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

export const getRolesByModuleId = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `audit/admin/roleMaster/getByModuleId?moduleId=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ROLEMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
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
        let url = config.AUTH_URL + `audit/admin/roleMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ROLEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
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

export const deleteRoleMasterData = roleMasterIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/roleMaster`;

        const data = await service._delete(url + '?id=' + roleMasterIds, true);

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
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Group Company Master

export const initCompanyMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.COMPANYMASTER_INIT, null, null, null, null);
};

export const saveCompanyMasterData = Company => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/companyMaster/`;
        const data = (typeof Company.id === 'undefined' || Company.id === -1) ? await service.post(url, Company, true)
            : await service.put(url, Company, true);

        if (data && !data.errorMessage) {

            //if (typeof Company.id === 'undefined') Company.id = data.data.id;

            dispatchAction(dispatch, adminTypes.COMPANYMASTER_SAVE_SUCCESS, Company, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Group Company updated successfully',
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
        let url = config.AUTH_URL + `audit/admin/companyMaster?id=${id}`;
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
        let url = config.AUTH_URL + `audit/admin/companyMaster/getByGroupMasterId?groupMasterID=${id}`;
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
        let url = config.AUTH_URL + `audit/admin/companyMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

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
        let url = config.AUTH_URL + `audit/admin/companyMaster`;

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

//#region    Company Plant Master

export const initPlantMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.PLANTMASTER_INIT, null, null, null, null);
};

export const savePlantMasterData = companyPlant => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/plantMaster/`;
        const data = (typeof companyPlant.id === 'undefined' || companyPlant.id === -1) ? await service.post(url, companyPlant, true)
            : await service.put(url, companyPlant, true);

        if (data && !data.errorMessage) {

            //if (typeof companyPlant.id === 'undefined') companyPlant.id = data.data.id;

            dispatchAction(dispatch, adminTypes.PLANTMASTER_SAVE_SUCCESS, companyPlant, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Company Plant updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Company Plant error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getPlantMasterById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUTH_URL + `audit/admin/plantMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.PLANTMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Company Plant error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getPlantMasterByGroupCompanyId = (id, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        // let url = config.AUTH_URL + `audit/admin/plantMaster/getByGroupCompanyMasterId?companyMasterID=${id}`;
        //    let url = config.AUTH_URL + `audit/admin/plantMaster/getPlantByCompanyId?pageIndex=${pageIndex}&rows=${rowsToReturn}&companyMasterID=${id}`; 
        //    const data = await service.get(url, true);
        //     console.log(" Plant data",data);
        //console.log("Plant - company id : ",id);
        let url = config.AUTH_URL + `audit/admin/plantMaster/getByGroupCompanyMasterId?companyMasterID=${JSON.stringify(id)}`;
        const data = await service.get(url, true);
        console.log("Plant Data", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.PLANTMASTER_GET_BY_GROUPCOMPANYID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Company Plant error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getPlantMasterByGroupCompanyId_UsingProcedure = (companyMasterId, yearMasterId, fromDate, todate, validateType) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/plantMaster/getPlantByCompanyID_UsingProcedure?companyMasterID=${companyMasterId}`;
        if (yearMasterId) {
            url = url + `&yearMasterId=${yearMasterId}`;
        }
        if (fromDate) {
            url = url + `&auditFromDate=${fromDate}`;
        }
        if (todate) {
            url = url + `&auditToDate=${todate}`;
        }
        const data = await service.get(url, true);
        console.log("Plant Data", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.PLANTMASTER_GET_BY_GROUPCOMPANYID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Company Plant error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getPlantMaster = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/plantMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.PLANTMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Company Plant error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deletePlantMaster = MasterIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/plantMaster`;

        const data = await service._delete(url + '?id=' + MasterIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.PLANTMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Company Plant(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Company Plant error'), null, null);
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
        let url = config.AUTH_URL + `audit/user/`;
        const data = (typeof user.id === 'undefined' || user.id === -1) ? await service.post(url, user, true)
            : await service.put(url, user, true);
        console.log("data", data);
        console.log("data.code", data.code);
        if (data && !data.errorMessage && (data.code === 200 || data.code === '200')) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.USER_SAVE_SUCCESS, user, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'User updated successfully',
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
        let url = config.AUTH_URL + `audit/user/unLockAccount`;
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
        let url = config.AUTH_URL + `audit/user?id=${id}`;
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

        let url = config.AUTH_URL + `audit/user/getUsersP?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        url = url + `&userId=${userFilters && userFilters.userId ? userFilters.userId : ''}`;
        url = url + `&companyMasterId=${userFilters && userFilters.companyMasterId && userFilters.companyMasterId !== null && userFilters.companyMasterId !== '-1' ? userFilters.companyMasterId : ''}`;
        url = url + `&plantMasterId=${userFilters && userFilters.plantMasterId && userFilters.plantMasterId !== null && userFilters.plantMasterId !== '-1' ? userFilters.plantMasterId : ''}`;
        url = url + `&departmentMasterId=${userFilters && userFilters.departmentMasterId && userFilters.departmentMasterId !== null && userFilters.departmentMasterId !== '-1' ? userFilters.departmentMasterId : ''}`;
        url = url + `&roleMasterId=${userFilters && userFilters.roleMasterId && userFilters.roleMasterId !== null && userFilters.roleMasterId !== '-1' ? userFilters.roleMasterId : ''}`;

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

        let url = config.AUTH_URL + `audit/user?pageIndex=${pageIndex}&rows=${rowsToReturn}`
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
        let url = config.AUTH_URL + `audit/user/getUsersP?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
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
        let url = config.AUTH_URL + `audit/user/getByPlantId?plantId=${plantId},departmentId=${departmentId}`;
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
        let url = config.AUTH_URL + `audit/user`;

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
        let url = config.AUTH_URL + `audit/user/getCurrentUserSessionDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

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

//#region Year Master

export const initYearMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.YEARMASTER_INIT, null, null, null, null);
};

export const saveYearMasterData = yearMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/yearMaster/`;
        const data = (typeof yearMaster.id === 'undefined' || yearMaster.id === -1) ? await service.post(url, yearMaster, true)
            : await service.put(url, yearMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof yearMaster.id === 'undefined') yearMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.YEARMASTER_SAVE_SUCCESS, yearMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Year Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Year Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getYearMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `audit/admin/yearMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //   // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.YEARMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Year Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //// dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getYearMasterData = (pageIndex, rowsToReturn, order, where, yearTypeId) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        console.log("get year where : ", where);
        let url = config.AUTH_URL + `audit/admin/yearMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        if (yearTypeId) {
            url = url + `&yearTypeId=${yearTypeId}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            //  // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.YEARMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Year Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteYearMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/yearMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.YEARMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Year Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Year Master error'), null, null);
        }
    }
    catch (error) {
        //dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};



//#endregion

//#region  Notification Master
export const initNotificationMasterDetails = () => dispatch => {
    dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTERDETAILS_INIT, null, null, null, null);
};

export const saveNotificationMasterDetails = notificationDetails => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/notificationDetails/`;

        const data = (typeof notificationDetails.id === 'undefined' || notificationDetails.id === -1) ? await service.post(url, notificationDetails, true)
            : await service.put(url, notificationDetails, true);

        if (data && !data.errorMessage) {

            //if (typeof notificationDetails.id === 'undefined') notificationDetails.id = data.data.id;

            dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTERDETAILS_SAVE_SUCCESS, notificationDetails, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Notification Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        //dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getNotificationMasterDetails = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/notificationDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        //console.log("otification data : ",data)
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTERDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};



export const getNotificationMasterDetailsById = (id) => async dispatch => {
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/notificationDetails?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTERDETAILS_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Notification Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        //  dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteNotificationMasterDetails = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/notificationDetails`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.NOTIFICATIONMASTERDETAILS_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Notification Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region  Escalation Matrix Master

export const initEscalationMatrixDetails = () => dispatch => {
    dispatchAction(dispatch, adminTypes.ESCALATIONMATRIXDETAILS_INIT, null, null, null, null);
};

export const saveEscalationMatrixDetails = escalationMatrix => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/escalationmatrix/`;

        const data = (typeof escalationMatrix.id === 'undefined' || escalationMatrix.id === -1) ? await service.post(url, escalationMatrix, true)
            : await service.put(url, escalationMatrix, true);

        if (data && !data.errorMessage) {

            //if (typeof escalationMatrix.id === 'undefined') escalationMatrix.id = data.data.id;

            dispatchAction(dispatch, adminTypes.ESCALATIONMATRIXDETAILS_SAVE_SUCCESS, escalationMatrix, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Escalation Matrix Details  updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getEscalationMatrixDetails = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/escalationmatrix?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ESCALATIONMATRIXDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};



export const getEscalationMatrixDetailsById = (id) => async dispatch => {
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/escalationmatrix?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ESCALATIONMATRIXDETAILS_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Notification Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteEscalationMatrixDetails = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/escalationmatrix`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.ESCALATIONMATRIXDETAILS_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Escalation Matrix Details (s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region  Escalation Duration Master

export const initEscalationDurationDetails = () => dispatch => {
    dispatchAction(dispatch, adminTypes.ESCALATIONDURATIONDETAILS_INIT, null, null, null, null);
};

export const saveEscalationDurationDetails = escalationDuration => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/escalationDuration/`;

        const data = (typeof escalationDuration.id === 'undefined' || escalationDuration.id === -1) ? await service.post(url, escalationDuration, true)
            : await service.put(url, escalationDuration, true);

        if (data && !data.errorMessage) {

            //if (typeof escalationDuration.id === 'undefined') escalationDuration.id = data.data.id;

            dispatchAction(dispatch, adminTypes.ESCALATIONDURATIONDETAILS_SAVE_SUCCESS, escalationDuration, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Escalation Duration Details  updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getEscalationDurationDetails = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/escalationDuration?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ESCALATIONDURATIONDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getEscalationMatrixDurationById = (id) => async dispatch => {
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/escalationDuration?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.ESCALATIONDURATIONDETAILS_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Notification Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteEscalationDurationDetails = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/escalationDuration`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.ESCALATIONDURATIONDETAILS_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Escalation Duration Details (s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region  Escalation Duration Master

export const initSupportingDocumentMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.SUPPORTINGDOCUMENTMASTER_INIT, null, null, null, null);
};

export const saveSupportingDocumentMaster = supportingDocumentMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/supportingDocumentMaster/`;

        const data = (typeof supportingDocumentMaster.id === 'undefined' || supportingDocumentMaster.id === -1) ? await service.post(url, supportingDocumentMaster, true)
            : await service.put(url, supportingDocumentMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof supportingDocumentMaster.id === 'undefined') supportingDocumentMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.SUPPORTINGDOCUMENTMASTER_SAVE_SUCCESS, supportingDocumentMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Supporting Document Master  updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getSupportingDocumentMaster = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/supportingDocumentMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SUPPORTINGDOCUMENTMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getSupportingDocumentMasterById = (id) => async dispatch => {
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/supportingDocumentMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SUPPORTINGDOCUMENTMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteSupportingDocumentMaster = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/supportingDocumentMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.SUPPORTINGDOCUMENTMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Supporting Document Master (s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Due Days Master

export const initDueDaysMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.DUEDAYSMASTER_INIT, null, null, null, null);
};

export const saveDueDaysMasterData = dueDaysMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/dueDaysMaster/`;
        const data = (typeof dueDaysMaster.id === 'undefined' || dueDaysMaster.id === -1) ? await service.post(url, dueDaysMaster, true)
            : await service.put(url, dueDaysMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof dueDaysMaster.id === 'undefined') dueDaysMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.DUEDAYSMASTER_SAVE_SUCCESS, dueDaysMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Due Days Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getDueDaysMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/dueDaysMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.DUEDAYSMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getDueDaysMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditAdmin/dueDaysMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        console.log("url", url);
        const data = await service.get(url, true);
        console.log("url data", data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.DUEDAYSMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteDueDaysMasterData = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/dueDaysMaster`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.DUEDAYSMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Due Days Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'DueDays Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Status Master

export const initStatusMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.STATUSMASTER_INIT, null, null, null, null);
};

export const getStatusMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `audit/admin/statusMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.STATUSMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Status Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getStatusMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/statusMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.STATUSMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Status Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getStatusMasterData_ByCategory = (pageIndex, category, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUTH_URL + `audit/admin/statusMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        if (category) {
            url = url + `&category=${category}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.STATUSMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Status Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Year Type Master

export const initYearTypeMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.YEARTYPEMASTER_INIT, null, null, null, null);
};

export const getYearTypeMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUTH_URL + `audit/admin/yearTypeMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.YEARTYPEMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Year Type Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getYearTypeMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    try {
        let url = config.AUTH_URL + `audit/admin/yearTypeMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("yearTypeData", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.YEARTYPEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Year Type Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region  Section Master

export const initSectionMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.SECTIONMASTER_INIT, null, null, null, null);
};

export const saveSectionMasterData = sectionMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/sectionMaster/`;
        const data = (typeof sectionMaster.id === 'undefined' || sectionMaster.id === -1) ? await service.post(url, sectionMaster, true)
            : await service.put(url, sectionMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof roleMaster.id === 'undefined') roleMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.SECTIONMASTER_SAVE_SUCCESS, sectionMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Section Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Section Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getSectionMasterDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/sectionMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SECTIONMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Section Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getSectionMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/sectionMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("Section Master Data", data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SECTIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Section Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getSectionMasterData_ExcluseInoperativeRecord = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let InoperativeData = 'false';

        let url = config.AUDIT_URL + `audit/auditadmin/sectionMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}&isInOperativeRecord=${InoperativeData}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("Section Master Data", data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SECTIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Section Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteSectionMasterData = roleMasterIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/sectionMaster`;

        const data = await service._delete(url + '?id=' + roleMasterIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.SECTIONMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Section Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Section Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region Sub  Section Master

export const initSubSectionMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.SUBSECTIONMASTER_INIT, null, null, null, null);
};

export const saveSubSectionMasterData = subSectionMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/subSectionMaster/`;
        const data = (typeof subSectionMaster.id === 'undefined' || subSectionMaster.id === -1) ? await service.post(url, subSectionMaster, true)
            : await service.put(url, subSectionMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof roleMaster.id === 'undefined') roleMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.SUBSECTIONMASTER_SAVE_SUCCESS, subSectionMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Sub Section Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Sub Section Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getSubSectionMasterDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/subSectionMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SUBSECTIONMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Sub Section Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getSubSectionMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/subSectionMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("getSubSectionMasterData", data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SUBSECTIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Sub Section Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getSubSectionMasterData_BySectionID = (pageIndex, rowsToReturn, order, where, sectionMasterId) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/subSectionMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}&sectionMasterId=${sectionMasterId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("getSubSectionMasterData", data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SUBSECTIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Sub Section Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteSubSectionMasterData = roleMasterIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/subSectionMaster`;

        const data = await service._delete(url + '?id=' + roleMasterIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.SUBSECTIONMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Sub Section Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Sub Section Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region Scoring Rule Master

export const initScoringRuleMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.SCORINGRULEMASTER_INIT, null, null, null, null);
};

export const saveScoringRuleMasterData = scoringRuleMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/scoringRuleMaster/`;
        const data = (typeof scoringRuleMaster.id === 'undefined' || scoringRuleMaster.id === -1) ? await service.post(url, scoringRuleMaster, true)
            : await service.put(url, scoringRuleMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof roleMaster.id === 'undefined') roleMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.SCORINGRULEMASTER_SAVE_SUCCESS, scoringRuleMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Scoring Rule Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scoring Rule Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getScoringRuleMasterDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/scoringRuleMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SCORINGRULEMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scoring Rule Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getScoringRuleMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/scoringRuleMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("getScoringRuleMasterData", data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SCORINGRULEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scoring Rule Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteScoringRuleMasterData = roleMasterIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/scoringRuleMaster`;

        const data = await service._delete(url + '?id=' + roleMasterIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.SCORINGRULEMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Scoring Rule Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scoring Rule Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Audit Type 

export const getAuditTypeMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/auditType?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.AUDITTYPEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Type Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Audit Flow 

export const getAuditFlowMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/auditFlow?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.AUDITFLOWMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Flow Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Process Flow Master

export const initProcessFlowMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.PROCESSFLOWMASTER_INIT, null, null, null, null);
};

export const saveProcessFlowMasterData = processFlowMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/processFlowMaster/`;
        const data = (typeof processFlowMaster.id === 'undefined' || processFlowMaster.id === -1) ? await service.post(url, processFlowMaster, true)
            : await service.put(url, processFlowMaster, true);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, adminTypes.PROCESSFLOWMASTER_SAVE_SUCCESS, processFlowMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Process Flow Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Process Flow Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getProcessFlowMasterDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/processFlowMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.PROCESSFLOWMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Process Flow Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getProcessFlowMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/processFlowMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("Process Flow Master Data", data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.PROCESSFLOWMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Process Flow Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteProcessFlowMasterData = roleMasterIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/processFlowMaster`;

        const data = await service._delete(url + '?id=' + roleMasterIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.PROCESSFLOWMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Process Flow Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Process Flow Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  AuditObservation Master

export const initAuditObservationMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.AUDITOBSERVATIONMASTER_INIT, null, null, null, null);
};

export const saveAuditObservationMasterData = auditObservationMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/auditObservationMaster/`;
        const data = (typeof auditObservationMaster.id === 'undefined' || auditObservationMaster.id === -1) ? await service.post(url, auditObservationMaster, true)
            : await service.put(url, auditObservationMaster, true);

        if (data && !data.errorMessage) {

            //if (typeof auditObservationMaster.id === 'undefined') auditObservationMaster.id = data.data.id;

            dispatchAction(dispatch, adminTypes.AUDITOBSERVATIONMASTER_SAVE_SUCCESS, auditObservationMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Audit Observation Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit observation master error !!'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getAuditObservationMasterDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/auditObservationMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.AUDITOBSERVATIONMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AuditObservationMaster error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getAuditObservationMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/auditObservationMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.AUDITOBSERVATIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AuditObservationMaster error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getAuditObservationMasterData_ExcludeInoperativeRecords = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let InoperativeData = 'false';
        let url = config.AUDIT_URL + `audit/auditadmin/auditObservationMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}&isInOperativeRecord=${InoperativeData}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.AUDITOBSERVATIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AuditObservationMaster error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const deleteAuditObservationMasterData = roleMasterIds => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/auditObservationMaster`;

        const data = await service._delete(url + '?id=' + roleMasterIds, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.AUDITOBSERVATIONMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Audit observation master(s) deleted successfully !!',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'AuditObservation Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Critacality Master 
export const getCriticalityMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/criticalityMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.CRITICALITYMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Criticality Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const initCriticalityMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.CRITICALITYMASTER_INIT, null, null, null, null);
};
export const saveCriticalityMasterData = criticalityMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/criticalityMaster/`;
        const data = (typeof criticalityMaster.id === 'undefined' || criticalityMaster.id === -1) ? await service.post(url, criticalityMaster, true)
            : await service.put(url, criticalityMaster, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.CRITICALITYMASTER_SAVE_SUCCESS, criticalityMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Criticality Master Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Criticality Master master error !!'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getCriticalityMasterDataById = (id) => async dispatch => {
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/criticalityMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.CRITICALITYMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Criticality Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};
export const getCriticalityMasterData_ExcludeInoperativeRecords = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let InoperativeData = 'false';
        let url = config.AUDIT_URL + `audit/auditadmin/criticalityMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}&isInOperativeRecord=${InoperativeData}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.CRITICALITYMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Criticality Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const deleteCriticalityMasterData = ids => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/criticalityMaster`;

        const data = await service._delete(url + '?id=' + ids, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.CRITICALITYMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Criticality Master master(s) deleted successfully !!',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Criticality Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Audit Type Auditor Relation Master

export const initAuditTypeAuditorRelationMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.AUDITTYPEAUDITORRELATIONMASTER_INIT, null, null, null, null);
};

export const saveAuditTypeAuditorRelationMasterData = auditTypeAuditorRelation => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/auditTypeAuditorRelation/`;
        const data = (typeof auditTypeAuditorRelation.id === 'undefined' || auditTypeAuditorRelation.id === -1) ? await service.post(url, auditTypeAuditorRelation, true)
            : await service.put(url, auditTypeAuditorRelation, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.AUDITTYPEAUDITORRELATIONMASTER_SAVE_SUCCESS, auditTypeAuditorRelation, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Audit Type Auditor Relation Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Type Auditor Relation master error !!'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getAuditTypeAuditorRelationMasterDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/auditTypeAuditorRelation?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.AUDITTYPEAUDITORRELATIONMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Type Auditor Relation error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getAuditTypeAuditorRelationMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let getType = 'groupdata';
        let url = config.AUDIT_URL + `audit/auditadmin/auditTypeAuditorRelation?pageIndex=${pageIndex}&rows=${rowsToReturn}&getType=${getType}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.AUDITTYPEAUDITORRELATIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Type Auditor Relation error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getAuditTypeAuditorRelationMasterData_AllUsers = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let getType = 'AllUser';
        let url = config.AUDIT_URL + `audit/auditadmin/auditTypeAuditorRelation?pageIndex=${pageIndex}&rows=${rowsToReturn}&getType=${getType}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.AUDITTYPEAUDITORRELATIONMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Type Auditor Relation error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const deleteAuditTypeAuditorRelationMasterData = Ids => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/auditTypeAuditorRelation`;

        const data = await service._delete(url + '?id=' + Ids, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.AUDITTYPEAUDITORRELATIONMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Audit Type Auditor Relation master(s) deleted successfully !!',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Type Auditor Relation Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion




//#region  Scope Master

export const initScopeMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.SCOPEMASTER_INIT, null, null, null, null);
};

export const saveScopeMasterData = Scope => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/scopeMaster/`;
        const data = (typeof Scope.id === 'undefined' || Scope.id === -1) ? await service.post(url, Scope, true)
            : await service.put(url, Scope, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.SCOPEMASTER_SAVE_SUCCESS, Scope, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Scope Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scope master error !!'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getScopeMasterDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/scopeMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SCOPEMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scope Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getScopeMasterData = (pageIndex, rowsToReturn, order, where, filterparameter) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let getType = 'groupdata';
        let url = config.AUDIT_URL + `audit/auditadmin/scopeMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}&getType=${getType}`;

        if (filterparameter && filterparameter.sectionMasterId && filterparameter.sectionMasterId !== null && filterparameter.sectionMasterId !== 'undefined' && filterparameter.sectionMasterId !== '-1') {
            url = url + `&sectionMasterId=${filterparameter.sectionMasterId}`;
        }
        if (filterparameter && filterparameter.subSectionMasterId && filterparameter.subSectionMasterId !== null && filterparameter.subSectionMasterId !== 'undefined' && filterparameter.subSectionMasterId !== '-1') {
            url = url + `&subSectionMasterId=${filterparameter.subSectionMasterId}`;
        }
        if (filterparameter && filterparameter.auditModeMasterId && filterparameter.auditModeMasterId !== null && filterparameter.auditModeMasterId !== 'undefined' && filterparameter.auditModeMasterId !== '-1') {
            url = url + `&auditModeMasterId=${filterparameter.auditModeMasterId}`;
        }
        if (filterparameter && filterparameter.criticalityMasterId && filterparameter.criticalityMasterId !== null && filterparameter.criticalityMasterId !== 'undefined' && filterparameter.criticalityMasterId !== '-1') {
            url = url + `&criticalityMasterId=${filterparameter.criticalityMasterId}`;
        }
        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.SCOPEMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scope Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteScopeMasterData = Ids => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/scopeMaster`;

        const data = await service._delete(url + '?id=' + Ids, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.SCOPEMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Scope master(s) deleted successfully !!',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scope Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion



//#region  Process Flow Responsibility Master

export const initProcessFlowResponsibilityMaster = () => dispatch => {
    dispatchAction(dispatch, adminTypes.PROCESSFLOWRESPONSIBILITYMASTER_INIT, null, null, null, null);
};

export const saveProcessFlowResponsibilityMasterData = processFlowResponsibilityMaster => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/processFlowResponsibilityMaster/`;
        const data = (typeof processFlowResponsibilityMaster.id === 'undefined' || processFlowResponsibilityMaster.id === -1) ? await service.post(url, processFlowResponsibilityMaster, true)
            : await service.put(url, processFlowResponsibilityMaster, true);

        if (data && !data.errorMessage) {

            dispatchAction(dispatch, adminTypes.PROCESSFLOWRESPONSIBILITYMASTER_SAVE_SUCCESS, processFlowResponsibilityMaster, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Process Flow Responsibility Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Process Flow  Responsibility Master error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getProcessFlowResponsibilityMasterDataById = (id) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/processFlowResponsibilityMaster?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.PROCESSFLOWRESPONSIBILITYMASTER_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Process Flow Responsibility Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};

export const getProcessFlowResponsibilityMasterData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/processFlowResponsibilityMaster?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("Process Flow Master Data", data);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, adminTypes.PROCESSFLOWRESPONSIBILITYMASTER_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Process Flow Responsibility Master error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteProcessFlowResponsibilityMasterData = ids => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditadmin/processFlowResponsibilityMaster`;

        const data = await service._delete(url + '?id=' + ids, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, adminTypes.PROCESSFLOWRESPONSIBILITYMASTER_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Process Flow Responsibility Master(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Process Flow Master Responsibility error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion
