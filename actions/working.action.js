import * as commonTypes from '../action-types/common.action.types';
import * as service from '../services/data.service';
import { constants } from '../utils/constants';
import * as sessionHelper from '../utils/session.helper';
import * as workingTypes from '../action-types/working.action.types';
import * as util from '../utils'
import config from '../config';
import * as errorTypes from '../action-types/error.action.types';
import { getLoggedUser, getLoggedUserRole_JSONConverted } from '../utils/session.helper';
import { now } from 'moment';


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
//#region  Pending Task Dashboard

export const initPendingTaskDashBoard = () => dispatch => {
    dispatchAction(dispatch, workingTypes.PENDINGTASKDASHBOARD_INIT, null, null, null, null);
};


export const getPendingTaskDashBoardData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let Loggeduser = getLoggedUser();
        let LoggeduserRole = getLoggedUserRole_JSONConverted();
        let employeeMasterId = Loggeduser && Loggeduser.id;
        let plantMasterId = Loggeduser && Loggeduser.plantMasterId;
        let companyMasterId = Loggeduser && Loggeduser.plantMaster && Loggeduser.plantMaster.companyMasterID;
        let roleMasterId = LoggeduserRole && LoggeduserRole.id;


        let url = config.AUDIT_URL + `audit/auditWorking/pendingTaskDashboard?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        if (employeeMasterId) {
            url = url + `&employeeMasterId=${employeeMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        if (roleMasterId) {
            url = url + `&roleMasterId=${roleMasterId}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.PENDINGTASKDASHBOARD_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Pending Task Dashboard  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region Audit Observation for execution

export const initAuditObservation = () => dispatch => {
    dispatchAction(dispatch, workingTypes.AUDITOBSERVATION_INIT, null, null, null, null);
};


export const getAuditObservationData = (auditPlanDetailsId, auditType) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {

        let url = config.AUDIT_URL + `audit/auditWorking/auditObservationForAudit?auditPlanDetailsId=${auditPlanDetailsId}`;

        if (auditType) {
            url = url + `&auditType=${auditType}`;
        }
        const data = await service.get(url, true);
        console.log("observation data", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.AUDITOBSERVATION_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Pending Task Dashboard  error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region SelfAuditPlan Details

export const initSelfAuditPlanDetails = () => dispatch => {
    dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_INIT, null, null, null, null);
};

export const saveSelfAuditPlanDetails = (selfAuditPlanDetails, auditPlantDetails, selectedSectionIds, processFlowMasterId, auditFlowMasterId, valueReturned) => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
        // console.log("selfAuditPlanDetails : ", selfAuditPlanDetails);
        // console.log("auditPlantDetails : ", auditPlantDetails);
        // console.log("selectedSectionIds : ", selectedSectionIds);
        //console.log("orderPaymentDetails : ", orderPaymentDetails);
        let UserRole = sessionHelper.getLoggedUserRole_JSONConverted();
        let roleMasterId = UserRole && UserRole.id;
        let statusMasterId = '';
        let processFlowCode = '';

        const selfAuditPlanDetailsData = {
            userId: userId,
            processFlowMasterId: processFlowMasterId,
            processFlowCode: processFlowCode,
            roleMasterId: roleMasterId,
            statusMasterId: statusMasterId,
            auditFlowMasterId: auditFlowMasterId,
            selfAuditPlanDetails: selfAuditPlanDetails ? selfAuditPlanDetails : [],
            auditPlantDetails: auditPlantDetails ? auditPlantDetails : [],
            selectedSectionIds: selectedSectionIds ? selectedSectionIds : [],
        }

        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditDetails/`;
        const data = (typeof selfAuditPlanDetails.id === 'undefined' || selfAuditPlanDetails.id === -1) ? await service.post(url, selfAuditPlanDetailsData, true)
            : await service.put(url, selfAuditPlanDetailsData, true);

        if (data && !data.errorMessage) {

            //if (typeof selfAuditPlanDetails.id === 'undefined') selfAuditPlanDetails.id = data.data.id;

            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_SAVE_SUCCESS, data, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'SelfAuditPlan Saved successfully !!',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'SelfAuditPlan Details error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getSelfAuditPlanDetailsById = (id) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'SelfAuditPlan Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }

};


export const getSelfAuditForReschedule = (plantIds, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {

        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/selfAuditForReschedule?plantMasterId=${JSON.stringify(plantIds)}`;
        const data = await service.get(url, true);
        console.log("data self audit reschedule", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'SelfAuditPlan Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getSelfAuditPlanDetails = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        // let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/ByProcedure?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/ByProcedure?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        console.log("Self Audit Details", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Self Audit Plan Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getSelfAuditPlanDetails_PlantAndCompanyMasterID = (pageIndex, rowsToReturn, order, where, companyMasterId, plantMasterId, filterDetails) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        // let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/ByProcedure?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/ByProcedure?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        if (filterDetails && filterDetails.yearTypeMasterId) {
            url = url + `&yearTypeMasterId=${filterDetails.yearTypeMasterId}`
        }
        if (filterDetails && filterDetails.yearMasterId) {
            url = url + `&yearMasterId=${filterDetails.yearMasterId}`
        }
        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        const data = await service.get(url, true);
        console.log("Self Audit Details", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Self Audit Plan Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getSelfAuditPlanDetails_BySequilize = (pageIndex, rowsToReturn, order, where, companyMasterId, plantMasterId, status, yearTypeMasterId) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        // let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/ByProcedure?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        let auditPlannedBy = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        console.log('plantMasterId', plantMasterId);
        console.log('companyMasterId', companyMasterId);
        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        if (companyMasterId && companyMasterId !== '[]' && companyMasterId !== '' && companyMasterId.length > 0) {
            url = url + `&companyMasterId=${JSON.stringify(companyMasterId)}`;
        }
        if (plantMasterId && plantMasterId != '' && plantMasterId != '[]' && plantMasterId.length > 0) {
            url = url + `&plantMasterId=${JSON.stringify(plantMasterId)}`;
        }
        if (auditPlannedBy) {
            url = url + `&auditPlannedBy=${auditPlannedBy}`;
        }
        if (yearTypeMasterId) {
            url = url + `&yearTypeMasterId=${yearTypeMasterId}`;
        }
        if (status) {
            url = url + `&status=${status}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Self Audit Plan Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteSelfAuditPlanDetails = id => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails`;

        const data = await service._delete(url + '?id=' + id, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'SelfAuditPlan Details(s) deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'SelfAuditPlan Details error'), null, null);
        }
    }
    catch (error) {
        //dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const cancelSelfAuditPlan = selfAuditPlan => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
        const dataToBeSend = {
            id: selfAuditPlan.id,
            isAuditCancelled: true,
            auditCancelledOn: now(),
            cancellationRemarks: selfAuditPlan.cancellationRemarks
        }
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/CancelAudit/`;
        const data = await service.put(url, dataToBeSend, true);
        console.log("data Cancel Audit", data)
        if (data && !data.errorMessage) {

            //     if (typeof user.id === 'undefined') user.id = data.data.id;

            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_SAVE_SUCCESS, selfAuditPlan, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Self Audit Cancel Successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Cancel Error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const AssignAuditTeamDetails = (selfAuditPlan) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);

        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/updateAuditDetails/`;
        const data = await service.put(url, selfAuditPlan, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_SAVE_SUCCESS, selfAuditPlan, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Team Assignment updated Successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Cancel Error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const UpdateSelfAuditPlanDetails = (selfAuditPlan) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);

        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/updateAuditDetails/`;
        const data = await service.put(url, selfAuditPlan, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_SAVE_SUCCESS, selfAuditPlan, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Self Audit Plan updated Successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Cancel Error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const rescheduleSelfAuditDetails = selfAuditDetails => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        // let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails/multiplefiles/`;
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/rescheduleAudit/`;
        const data = await service.post(url, selfAuditDetails, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SELFAUDITPLANDETAILS_SAVE_SUCCESS, selfAuditDetails, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Self Audit Details successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


//#endregion

//#region Supporting Doc

export const initSupportingDocumentDetails = () => dispatch => {
    dispatchAction(dispatch, workingTypes.SUPPORTINGDOC_INIT, null, null, null, null);
};

export const saveMultipleSupportingDocumentDetails = supportingDoc => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails/multiplefiles/`;
        const data = await service.post(url, supportingDoc, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, workingTypes.SUPPORTINGDOC_SAVE_SUCCESS, supportingDoc, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Supporting Doc updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getSupportingDocumentDetailsById = (id) => async dispatch => {
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails?id=${id}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SUPPORTINGDOC_GET_BY_ID_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getSupportingDocumentDetailsData = (pageIndex, rowsToReturn, order, where) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {



        let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SUPPORTINGDOC_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getMediaDetailsbyAuditPlanDetailsId = (pageIndex, rowsToReturn, order, where, auditPlanDetailsId) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        console.log("auditPlanDetailsId media get", auditPlanDetailsId);
        let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (where && where.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        if (auditPlanDetailsId) {
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SUPPORTINGDOC_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};



export const getSupportingDocumentDetailsBYInvoiceDetailsID = (pageIndex, rowsToReturn, order, where, invoiceDetailsId) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}&invoiceDetailsId=${invoiceDetailsId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SUPPORTINGDOC_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const getSupportingDocumentDetailsByPaymentDetailsId = (pageIndex, rowsToReturn, order, where, paymentDetailsId) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails?pageIndex=${pageIndex}&rows=${rowsToReturn}&paymentDetailsId=${paymentDetailsId}`;

        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }

        if (order && order.length > 0) {
            url = url + `&where=${JSON.stringify(where)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SUPPORTINGDOC_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const saveSupportingDocumentDetails = supportingDoc => async dispatch => {
    //  dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails/`;
        const data = (typeof supportingDoc.id === 'undefined' || supportingDoc.id === -1) ? await service.post(url, supportingDoc, true)
            : await service.put(url, supportingDoc, true);

        if (data && !data.errorMessage) {

            //if (typeof supportingDoc.id === 'undefined') supportingDoc.id = data.data.id;

            dispatchAction(dispatch, workingTypes.SUPPORTINGDOC_SAVE_SUCCESS, supportingDoc, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Group Master updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Supporting Document error'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const deleteSupportingDocumentDetails = ids => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails`;

        const data = await service._delete(url + '?id=' + ids, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, workingTypes.SUPPORTINGDOC_DELETE_SUCCESS, null, null, null, data.message);

            setTimeout(() =>
                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'Invoice deleted successfully',
                    error: undefined,
                    notification: true
                }), 500);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Invoiceerror'), null, null);
        }
    }
    catch (error) {
        // dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region Self Audit Details Process Flow Wise

export const initSelfAuditDetailsByResponsibilityWise = () => dispatch => {
    dispatchAction(dispatch, workingTypes.SELFAUDITDETAILS_RESPONSIBILITYWISE_INIT, null, null, null, null);
};
export const getSelfAuditDetailsByResponsibilityWiseDetails = (pageIndex, rowsToReturn, order, where, processFlowCode, processFlowMasterId) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let Loggeduser = getLoggedUser();
        let LoggeduserRole = getLoggedUserRole_JSONConverted();
        let employeeMasterId = Loggeduser && Loggeduser.id;
        let plantMasterId = Loggeduser && Loggeduser.plantMasterId;
        let companyMasterId = Loggeduser && Loggeduser.plantMaster && Loggeduser.plantMaster.companyMasterID;
        let roleMasterId = LoggeduserRole && LoggeduserRole.id;

        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/selfAuditProcessresponsibilityWise?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        if (employeeMasterId) {
            url = url + `&employeeMasterId=${employeeMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        if (roleMasterId) {
            url = url + `&roleMasterId=${roleMasterId}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (processFlowCode) {
            url = url + `&processFlowCode=${processFlowCode}`;
        }

        if (processFlowMasterId) {
            url = url + `&processFlowMasterId=${processFlowMasterId}`;
        }
        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SELFAUDITDETAILS_RESPONSIBILITYWISE_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Pending Task Dashboard  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Self Audit Team Assigment And Execution
export const initSelfAudit_ScopeDetails = () => dispatch => {
    dispatchAction(dispatch, workingTypes.SA_SCOPEDETAILS_INIT, null, null, null, null);
};
export const getSelfAudit_ScopeDetails = (auditPlanDetailsId, multiSectionMasterId, pageIndex, rowsToReturn, onlyUpdatedObservationfetch) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/scopeDetails?auditPlanDetailsId=${auditPlanDetailsId}`;
        if (multiSectionMasterId) {
            url = url + `&multiSectionMasterId=${JSON.stringify(multiSectionMasterId)}`;
        }
        if (onlyUpdatedObservationfetch) {
            url = url + `&onlyUpdatedObservationfetch=${onlyUpdatedObservationfetch}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SA_SCOPEDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scope Master Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getSelfAudit_ScoreDetails = (auditPlanDetailsId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/selfAuditScoreDetails?auditPlanDetailsId=${auditPlanDetailsId}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SA_TEAMASSIGNMENTANDEXECUTION_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scope Master Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getSelfAudit_ScoreDetails_WithAssicition = (auditPlanDetailsId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        const Association = true;
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/selfAuditScoreDetails?auditPlanDetailsId=${auditPlanDetailsId}&isAssosciationDataRequired=${Association}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SA_TEAMASSIGNMENTANDEXECUTION_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scope Master Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};





export const saveSelfAuditScoreDetails = selfAuditScoreDetails => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/selfAuditPlanDetails/updateSelfAuditScore/`;
        const data = await service.post(url, selfAuditScoreDetails, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SA_TEAMASSIGNMENTANDEXECUTION_SAVE_SUCCESS, selfAuditScoreDetails.auditObservationDetils ? selfAuditScoreDetails.auditObservationDetils : undefined, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Self Audit Score Details updated successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'self audit score details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


//#endregion


//#region  Final Audit Responsibility Wise Data

export const getFinalAuditDetailsByResponsibilityWiseDetails = (pageIndex, rowsToReturn, order, where, processFlowCode, processFlowMasterId) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let Loggeduser = getLoggedUser();
        let LoggeduserRole = getLoggedUserRole_JSONConverted();
        let employeeMasterId = Loggeduser && Loggeduser.id;
        let plantMasterId = Loggeduser && Loggeduser.plantMasterId;
        let companyMasterId = Loggeduser && Loggeduser.plantMaster && Loggeduser.plantMaster.companyMasterID;
        let roleMasterId = LoggeduserRole && LoggeduserRole.id;

        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditProcessresponsibilityWise?pageIndex=${pageIndex}&rows=${rowsToReturn}`;
        if (employeeMasterId) {
            url = url + `&employeeMasterId=${employeeMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        if (roleMasterId) {
            url = url + `&roleMasterId=${roleMasterId}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (processFlowCode) {
            url = url + `&processFlowCode=${processFlowCode}`;
        }

        if (processFlowMasterId) {
            url = url + `&processFlowMasterId=${processFlowMasterId}`;
        }
        if (order && order.length > 0) {
            url = url + `&order=${JSON.stringify(order)}`;
        }
        const data = await service.get(url, true);

        console.log("data", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITDETAILS_RESPONSIBILITYWISE_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Pending Task Dashboard  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region   Final Audit Plan

export const initFinalAuditPlanDetails = () => dispatch => {
    dispatchAction(dispatch, workingTypes.FINALAUDITPLANDETAILS_INIT, null, null, null, null);
};

export const saveFinalAuditPlanDetails = (auditPlantDetails) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditPlanDetails/saveFinalAuditPlanning/`;
        const data = await service.post(url, auditPlantDetails, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITPLANDETAILS_SAVE_SUCCESS, data, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Final audit plan saved successfully !!',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'SelfAuditPlan Details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const UpdateFinalAuditPlanDetails = (finalAuditPlan) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/updateFinalAuditPlanDetails/`;
        const data = await service.put(url, finalAuditPlan, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITPLANDETAILS_SAVE_SUCCESS, finalAuditPlan, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Final Audit Plan updated Successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Cancel Error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const UpdateFinalAuditClosureDetails = (finalAuditClosure) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    console.log("final Audit Closure Details", finalAuditClosure)
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/updateFinalAuditClosureDetails/`;
        const data = await service.put(url, finalAuditClosure, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITPLANDETAILS_SAVE_SUCCESS, finalAuditClosure, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Final Audit Details Updated Successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit Closure Error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getSectionMasterDetails_ForFinalAuditPlan = (selfAuditplanDetailsId, finalAuditDetailsId) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let url = config.AUDIT_URL + `audit/auditWorking/getSectionDetailsBySelfPlanDetails?pageIndex=${pageIndex}`;

        if (selfAuditplanDetailsId) {
            url = url + `&selfAuditplanDetailsId=${selfAuditplanDetailsId}`;
        }
        if (finalAuditDetailsId) {
            url = url + `&finalAuditDetailsId=${finalAuditDetailsId}`;
        }
        const data = await service.get(url, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.SECTIONDETAILSFORFINALAUDIT_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Final Audit Plan Details error'), null, null);
        }

    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getFinalAuditPlanDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditPlanDetails?pageIndex=${pageIndex}`;
        // if (filters) {
        //     console.log("filters : ", filters);
        // }
        let finalAuditDetailsId = filters && filters.finalAuditDetailsId ? filters.finalAuditDetailsId : '';
        let selfAuditBasicDetailsId = filters && filters.selfAuditBasicDetailsId ? filters.selfAuditBasicDetailsId : '';
        let companyMasterId = filters && filters.companyMasterId ? filters.companyMasterId : '';
        let plantMasterId = filters && filters.plantMasterId ? filters.plantMasterId : '';
        let finalAuditStatus = filters && filters.finalAuditStatus ? filters.finalAuditStatus : '';
        let dataFetchType = filters && filters.dataFetchType ? filters.dataFetchType : '';
        let cancelledAuditExclude = filters && filters.cancelledAuditExclude ? filters.cancelledAuditExclude : 'No';
        let executedAuditExclude = filters && filters.executedAuditExclude ? filters.executedAuditExclude : 'No';
        let userMasterId = filters && filters.userMasterId ? filters.userMasterId : '';

        let auditFromDate = filters && filters.auditFromDate ? filters.auditFromDate : null;
        let auditToDate = filters && filters.auditToDate ? filters.auditToDate : null;

        if (finalAuditDetailsId) {
            url = url + `&finalAuditDetailsId=${finalAuditDetailsId}`;
        }
        if (selfAuditBasicDetailsId) {
            url = url + `&selfAuditBasicDetailsId=${selfAuditBasicDetailsId}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        // if (companyMasterId) {
        //     url = url + `&companyMasterId=${JSON.stringify(companyMasterId)}`;
        // }
        // if (plantMasterId) {
        //     url = url + `&plantMasterId=${JSON.stringify(plantMasterId)}`;
        // }
        if (finalAuditStatus) {
            url = url + `&finalAuditStatus=${finalAuditStatus}`;
        }
        if (dataFetchType) {
            url = url + `&dataFetchType=${dataFetchType}`;
        }
        if (cancelledAuditExclude) {
            url = url + `&cancelledAuditExclude=${cancelledAuditExclude}`;
        }
        if (executedAuditExclude) {
            url = url + `&executedAuditExclude=${executedAuditExclude}`;
        }
        if (userMasterId) {
            url = url + `&userMasterId=${userMasterId}`;
        }
        if (auditFromDate) {
            url = url + `&auditFromDate=${auditFromDate}`;
        }
        if (auditToDate) {
            url = url + `&auditToDate=${auditToDate}`;
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }
        const data = await service.get(url, true);
        console.log("data final audit plan  ", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITPLANDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Final Audit Plan Details error'), null, null);
        }

    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const getFinalAuditDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;

        if (userId === undefined || userId === null || userId === ' ') {
            userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
        }
        let yearMasterId = filters && filters.yearMasterId ? filters.yearMasterId : '';; // userId;
        let auditDetailsId = filters && filters.auditDetailsId ? filters.auditDetailsId : '';
        let selfAuditDetailsId = filters && filters.selfAuditDetailsId ? filters.selfAuditDetailsId : '';
        let companyMasterId = filters && filters.companyMasterId ? filters.companyMasterId : '';
        let plantMasterId = filters && filters.plantMasterId ? filters.plantMasterId : '';
        let auditFromDate = filters && filters.auditFromDate ? filters.auditFromDate : null;
        let auditToDate = filters && filters.auditToDate ? filters.auditToDate : null;
        let auditDataType = filters && filters.auditDataType ? filters.auditDataType : 'all'; //all, executed, actionPlanUpdated, actionPlanApproved, actionPlanReviewCompleted

        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditDetails?userId=${userId}`;
        if (yearMasterId) {
            url = url + `&yearMasterId=${yearMasterId}`;
        }
        if (auditDetailsId) {
            url = url + `&auditDetailsId=${auditDetailsId}`;
        }
        if (selfAuditDetailsId) {
            url = url + `&selfAuditDetailsId=${selfAuditDetailsId}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        if (auditDataType) {
            url = url + `&auditDataType=${auditDataType}`;
        }
        if (auditFromDate) {
            url = url + `&auditFromDate=${auditFromDate}`;
        }
        if (auditToDate) {
            url = url + `&auditToDate=${auditToDate}`;
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }
        const data = await service.get(url, true);
        console.log("data final audit plan  ", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITPLANDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Final Audit Plan Details error'), null, null);
        }

    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


export const rescheduleFinalAuditDetails = auditDetails => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        // let url = config.AUDIT_URL + `audit/auditWorking/mediaDetails/multiplefiles/`;
        let url = config.AUDIT_URL + `audit/auditWorking/rescheduleFinalAuditPlanDetails/`;
        const data = await service.post(url, auditDetails, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITPLANDETAILS_SAVE_SUCCESS, auditDetails, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Final Audit Details successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Final Audit Reschedule error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};


//#endregion

//#region Final Audit Execution
export const getFinalAuditPlanForExecution = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {

        if (userId === undefined || userId === null || userId === ' ') {
            userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
        }
        let auditorMasterId = userId;

        let auditDetailsId = filters && filters.auditDetailsId ? filters.auditDetailsId : '';
        let selfAuditDetailsId = filters && filters.selfAuditDetailsId ? filters.selfAuditDetailsId : '';
        let companyMasterId = filters && filters.companyMasterId ? filters.companyMasterId : '';
        let plantMasterId = filters && filters.plantMasterId ? filters.plantMasterId : '';
        let auditFromDate = filters && filters.auditFromDate ? filters.auditFromDate : null;
        let auditToDate = filters && filters.auditToDate ? filters.auditToDate : null;

        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditDetailsForExecution?userId=${userId}`;
        if (auditorMasterId) {
            url = url + `&auditorMasterId=${auditorMasterId}`;
        }
        if (auditDetailsId) {
            url = url + `&auditDetailsId=${auditDetailsId}`;
        }
        if (selfAuditDetailsId) {
            url = url + `&selfAuditDetailsId=${selfAuditDetailsId}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        if (auditFromDate) {
            url = url + `&auditFromDate=${auditFromDate}`;
        }
        if (auditToDate) {
            url = url + `&auditToDate=${auditToDate}`;
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }

        const data = await service.get(url, true);
        //console.log("data final audit plan for execution", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITPLANDETALSFOREXECUTION_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'SelfAuditPlan Details error'), null, null);
        }

    }
    catch (error) {

    }
}

export const getFinalAuditScopeForExecution = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        if (userId === undefined || userId === null || userId === ' ') {
            userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
        }
        let auditorMasterId = userId;
        let auditPlanDetailsId = filters && filters.auditPlanDetailsId ? filters.auditPlanDetailsId : '';
        let selfAuditDetailsId = filters && filters.selfAuditDetailsId ? filters.selfAuditDetailsId : '';
        let sectionMasterId = filters && filters.sectionMasterId ? filters.sectionMasterId : '';
        let subSectionMasterId = filters && filters.subSectionMasterId ? filters.subSectionMasterId : '';

        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditScopeForExecution?userId=${userId}`;

        if (auditorMasterId) {
            url = url + `&auditorMasterId=${auditorMasterId}`;
        }
        //console.log("auditPlanDetailsId : ", auditPlanDetailsId);
        if (auditPlanDetailsId) {
            //console.log("auditPlanDetailsId 2 : ", auditPlanDetailsId);
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }
        if (selfAuditDetailsId) {
            url = url + `&selfAuditDetailsId=${selfAuditDetailsId}`;
        }
        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (subSectionMasterId) {
            url = url + `&subSectionMasterId=${subSectionMasterId}`;
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }
        const data = await service.get(url, true);
        //console.log("data final audit Scope for execution", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITSCOPEDETALSFOREXECUTION_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'SelfAuditPlan Details error'), null, null);
        }

    }
    catch (error) {

    }
}

export const getFinalAuditScopeForExecution_ForAll = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    console.log("filters 1", filters)
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        if (userId === undefined || userId === null || userId === ' ') {
            userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
        }
        let auditorMasterId = userId;
        let auditPlanDetailsId = filters && filters.auditPlanDetailsId ? filters.auditPlanDetailsId : '';
        let selfAuditDetailsId = filters && filters.selfAuditDetailsId ? filters.selfAuditDetailsId : '';
        let sectionMasterId = filters && filters.sectionMasterId ? filters.sectionMasterId : '';
        let subSectionMasterId = filters && filters.subSectionMasterId ? filters.subSectionMasterId : '';

        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditScopeForExecutionForAll?userId=${userId}`;

        if (auditorMasterId) {
            url = url + `&auditorMasterId=${auditorMasterId}`;
        }
        //console.log("auditPlanDetailsId : ", auditPlanDetailsId);
        if (auditPlanDetailsId) {
            //console.log("auditPlanDetailsId 2 : ", auditPlanDetailsId);
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }
        if (selfAuditDetailsId) {
            url = url + `&selfAuditDetailsId=${selfAuditDetailsId}`;
        }
        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (subSectionMasterId) {
            url = url + `&subSectionMasterId=${subSectionMasterId}`;
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }
        const data = await service.get(url, true);
        console.log("data final audit Scope for execution 1", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITSCOPEDETALSFOREXECUTION_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'SelfAuditPlan Details error'), null, null);
        }

    }
    catch (error) {

    }
}


export const saveFinalAuditObservationDetails = finalAuditScoreDetails => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        //console.log("finalAuditScoreDetails : ", finalAuditScoreDetails);
        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditObservationDetails/`;
        const data = await service.post(url, finalAuditScoreDetails, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITPLANEXECUTIONDETALS_SAVE_SUCCESS, data.data, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Final audit observations updated successfully!!',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'self audit score details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getFinalAuditObservationDetails = (auditPlanDetailsId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditObservationDetails?auditPlanDetailsId=${auditPlanDetailsId}`;
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITPLANEXECUTIONDETALS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Scope Master Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getFinalAudit_ScoreDetails_WithAssicition = (auditPlanDetailsId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        const Association = true;
        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditPlanDetails/finalAuditScoreDetails?auditPlanDetailsId=${auditPlanDetailsId}&isAssosciationDataRequired=${Association}`;
        const data = await service.get(url, true);
        console.log("Final data score details", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITSCORE_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Final Score Details error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion

//#region  Final Audit Action Plan 
export const getFinalAuditActionPlanDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;

        //console.log("ActionPlan filters : ", filters);

        if (userId === undefined || userId === null || userId === ' ') {
            userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
        }

        let auditPlanDetailsId = filters && filters.auditPlanDetailsId ? filters.auditPlanDetailsId : '';
        let sectionMasterId = filters && filters.sectionMasterId ? filters.sectionMasterId : '';
        let subSectionMasterId = filters && filters.subSectionMasterId ? filters.subSectionMasterId : '';
        let criticalityMasterId = filters && filters.criticalityMasterId ? filters.criticalityMasterId : '';
        let auditModeMasterId = filters && filters.auditModeMasterId ? filters.auditModeMasterId : '';

        let url = config.AUDIT_URL + `audit/auditWorking/finalAuditActionPlanDetails?userId=${userId}`;

        if (auditPlanDetailsId) {
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }
        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (subSectionMasterId) {
            url = url + `&subSectionMasterId=${subSectionMasterId}`;
        }
        if (criticalityMasterId) {
            url = url + `&criticalityMasterId=${criticalityMasterId}`;
        }
        if (auditModeMasterId) {
            url = url + `&auditModeMasterId=${auditModeMasterId}`;
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }

        //console.log("ActionPlan url : ", url);

        const data = await service.get(url, true);
        //console.log("Audit Action Plan Data :  ", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.FINALAUDITACTIONPLANDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Final Audit Plan Details error'), null, null);
        }

    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion


//#region  Action Plan Update 
export const initActionPlanUpdate = () => dispatch => {
    dispatchAction(dispatch, workingTypes.ACTIONPLANUPDATE_INIT, null, null, null, null);
};

export const getActionPlanUpdate_NotRequiredObservation = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let auditorMasterId = undefined;
        let auditPlanDetailsId = filters && filters.auditPlanDetailsId ? filters.auditPlanDetailsId : '';
        let selfAuditDetailsId = filters && filters.selfAuditDetailsId ? filters.selfAuditDetailsId : '';
        let sectionMasterId = filters && filters.sectionMasterId ? filters.sectionMasterId : '';
        let subSectionMasterId = filters && filters.subSectionMasterId ? filters.subSectionMasterId : '';
        let onlyActionPlanUpdateObservation = filters && filters.onlyActionPlanUpdateObservation ? filters.onlyActionPlanUpdateObservation : '';
        let url = config.AUDIT_URL + `audit/auditWorking/auditActionPlan/actionRequiredAuditObservationDetails?userId=${userId}`;

        if (auditorMasterId) {
            url = url + `&auditorMasterId=${auditorMasterId}`;
        }
        //console.log("auditPlanDetailsId : ", auditPlanDetailsId);
        if (auditPlanDetailsId) {
            //console.log("auditPlanDetailsId 2 : ", auditPlanDetailsId);
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }
        if (selfAuditDetailsId) {
            url = url + `&selfAuditDetailsId=${selfAuditDetailsId}`;
        }
        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (subSectionMasterId) {
            url = url + `&subSectionMasterId=${subSectionMasterId}`;
        }
        if (onlyActionPlanUpdateObservation) {
            url = url + `&onlyActionPlanUpdateObservation=${onlyActionPlanUpdateObservation}`
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }
        const data = await service.get(url, true);
        console.log("ACTIONPLANUPDATE_ACTIONREQUIREDOBSERVATION_LIST_SUCCESS", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.ACTIONPLANUPDATE_ACTIONREQUIREDOBSERVATION_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit observation Details error'), null, null);
        }
    }
    catch (error) {

    }
}

export const getObservationsToUpdateActionPlan = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let auditorMasterId = undefined;
        let auditPlanDetailsId = filters && filters.auditPlanDetailsId ? filters.auditPlanDetailsId : '';
        let selfAuditDetailsId = filters && filters.selfAuditDetailsId ? filters.selfAuditDetailsId : '';
        let sectionMasterId = filters && filters.sectionMasterId ? filters.sectionMasterId : '';
        let subSectionMasterId = filters && filters.subSectionMasterId ? filters.subSectionMasterId : '';
        let onlyActionPlanUpdateObservation = filters && filters.onlyActionPlanUpdateObservation ? filters.onlyActionPlanUpdateObservation : '';
        let url = config.AUDIT_URL + `audit/auditWorking/auditActionPlan/actionRequiredAuditObservationDetails?userId=${userId}`;

        if (auditorMasterId) {
            url = url + `&auditorMasterId=${auditorMasterId}`;
        }
        //console.log("auditPlanDetailsId : ", auditPlanDetailsId);
        if (auditPlanDetailsId) {
            //console.log("auditPlanDetailsId 2 : ", auditPlanDetailsId);
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }
        if (selfAuditDetailsId) {
            url = url + `&selfAuditDetailsId=${selfAuditDetailsId}`;
        }
        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (subSectionMasterId) {
            url = url + `&subSectionMasterId=${subSectionMasterId}`;
        }
        if (onlyActionPlanUpdateObservation) {
            url = url + `&onlyActionPlanUpdateObservation=${onlyActionPlanUpdateObservation}`
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }
        const data = await service.get(url, true);
        console.log("ACTIONPLANUPDATE_ACTIONREQUIREDOBSERVATION_LIST_SUCCESS", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.ACTIONPLANUPDATE_ACTIONREQUIREDOBSERVATION_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Audit observation Details error'), null, null);
        }
    }
    catch (error) {

    }
}

export const updateActionPlanDetails = auditObservationActionPlanDetails => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        //console.log("finalAuditScoreDetails : ", finalAuditScoreDetails);
        let url = config.AUDIT_URL + `audit/auditWorking/auditActionPlan/updateActionPlanDetails/`;
        const data = await service.post(url, auditObservationActionPlanDetails, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.ACTIONPLANUPDATE_SAVE_SUCCESS, data.data, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Action Plan updated successfully!!',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'self audit score details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region  Monthly Plan Review
export const getActionPlanDetails_forMonthlyReview = (filters, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let auditPlanDetailsId = filters && filters.auditPlanDetailsId ? filters.auditPlanDetailsId : '';
        let sectionMasterId = filters && filters.sectionMasterId ? filters.sectionMasterId : '';
        let subSectionMasterId = filters && filters.subSectionMasterId ? filters.subSectionMasterId : '';
        let url = config.AUDIT_URL + `audit/auditWorking/monthlyReview/getMonthlyReviewActionPlanDetails_ForUpdate?pageIndex=${pageIndex}`;

        //console.log("auditPlanDetailsId : ", auditPlanDetailsId);
        if (auditPlanDetailsId) {
            //console.log("auditPlanDetailsId 2 : ", auditPlanDetailsId);
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }

        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (subSectionMasterId) {
            url = url + `&subSectionMasterId=${subSectionMasterId}`;
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }
        const data = await service.get(url, true);
        console.log("data actionPlanForReviewDetails ", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.MONTHLYREVIEW_ACTIONPLANS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Action plan Details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);

    }
}

export const getCurrentMonthReview_MonthlyReview = (filters, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let auditPlanDetailsId = filters && filters.auditPlanDetailsId ? filters.auditPlanDetailsId : '';
        let sectionMasterId = filters && filters.sectionMasterId ? filters.sectionMasterId : '';
        let subSectionMasterId = filters && filters.subSectionMasterId ? filters.subSectionMasterId : '';
        let url = config.AUDIT_URL + `audit/auditWorking/monthlyReview/currentMonth_NotClosedReviewDetails?pageIndex=${pageIndex}`;

        //console.log("auditPlanDetailsId : ", auditPlanDetailsId);
        if (auditPlanDetailsId) {
            //console.log("auditPlanDetailsId 2 : ", auditPlanDetailsId);
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }

        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (subSectionMasterId) {
            url = url + `&subSectionMasterId=${subSectionMasterId}`;
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }
        const data = await service.get(url, true);
        console.log("data currentMonthReviewDetails ", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.CURRENTMONTH_MONTHLYREVIEW_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Action plan Details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);

    }
}


export const updateMonthlyReviewDetails = currentMonthReviewDetails => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        //console.log("finalAuditScoreDetails : ", finalAuditScoreDetails);
        let url = config.AUDIT_URL + `audit/auditWorking/monthlyReview/saveMonthlyReviewDetails/`;
        const data = await service.post(url, currentMonthReviewDetails, true);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.MONTHLYREVIEW_SAVE_SUCCESS, data.data, null, data.message, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Monthly Review Details updated successfully!!',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'monthly review details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const getActionPlanMonthlyReviewDetails = (filters, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;
        let auditPlanDetailsId = filters && filters.auditPlanDetailsId ? filters.auditPlanDetailsId : '';
        let sectionMasterId = filters && filters.sectionMasterId ? filters.sectionMasterId : '';
        let subSectionMasterId = filters && filters.subSectionMasterId ? filters.subSectionMasterId : '';
        let url = config.AUDIT_URL + `audit/auditWorking/monthlyReview/getReviewDetails?pageIndex=${pageIndex}`;

        //console.log("auditPlanDetailsId : ", auditPlanDetailsId);
        if (auditPlanDetailsId) {
            //console.log("auditPlanDetailsId 2 : ", auditPlanDetailsId);
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }

        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (subSectionMasterId) {
            url = url + `&subSectionMasterId=${subSectionMasterId}`;
        }
        if (filters) {
            url = url + `&filters=${filters}`;
        }
        const data = await service.get(url, true);
        console.log("data getReviewDetails ", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.MONTHLYREVIEWDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Action plan Details error'), null, null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);

    }
}
//#endregion