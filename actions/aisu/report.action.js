import * as commonTypes from '../../action-types/comman/common.action.types';
import * as service from '../../services/data.service';
import * as reportTypes from '../../action-types/aisu/report.action.types';
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

export const initSelfVsFinalScoreDetails = () => dispatch => {
    dispatchAction(dispatch, reportTypes.SELF_VS_FINALSCORE_INIT, null, null, null, null);
};

export const getSelfVsFinalScorePlantWiseDetails = (filterParameter) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let pageIndex = 0;
        let yearMasterId = filterParameter && filterParameter.yearMasterId && filterParameter.yearMasterId !== null && filterParameter.yearMasterId !== "" && filterParameter.yearMasterId !== '-1' && filterParameter.yearMasterId;
        let plantMasterId = filterParameter && filterParameter.plantMasterId && filterParameter.plantMasterId !== null && filterParameter.plantMasterId !== "" && filterParameter.plantMasterId !== '-1' && filterParameter.plantMasterId;
        let companyMasterId = filterParameter && filterParameter.companyMasterId && filterParameter.companyMasterId !== null && filterParameter.companyMasterId !== "" && filterParameter.companyMasterId !== '-1' && filterParameter.companyMasterId;
        let roleMasterId = filterParameter && filterParameter.roleMasterId && filterParameter.roleMasterId !== null && filterParameter.roleMasterId !== "" && filterParameter.roleMasterId !== '-1' && filterParameter.roleMasterId;
        let userMasterId = filterParameter && filterParameter.userMasterId && filterParameter.userMasterId !== null && filterParameter.userMasterId !== "" && filterParameter.userMasterId !== '-1' && filterParameter.userMasterId;
        let reportType = filterParameter && filterParameter.reportType && filterParameter.reportType !== null && filterParameter.reportType !== "" && filterParameter.reportType;
        let url = config.AUDIT_URL + `audit/auditReport/selfScoreVsFinalScore_PlantWise?pageIndex=${pageIndex}`;
        if (yearMasterId) {
            url = url + `&yearMasterId=${yearMasterId}`;
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
        if (userMasterId) {
            url = url + `&userMasterId=${userMasterId}`;
        }
        if (reportType) {
            url = url + `&reportType=${reportType}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, reportTypes.SELF_VS_FINALSCORE_PLANTWISE_LIST_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Self Vs Final Score Report plant Wise  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

export const GetSelfVsFinalAuditScoreCompanySectionWise = (filterParameter) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let pageIndex = 0;
        let yearMasterId = filterParameter && filterParameter.yearMasterId && filterParameter.yearMasterId !== null && filterParameter.yearMasterId !== "" && filterParameter.yearMasterId !== '-1' && filterParameter.yearMasterId;
        let plantMasterId = filterParameter && filterParameter.plantMasterId && filterParameter.plantMasterId !== null && filterParameter.plantMasterId !== "" && filterParameter.plantMasterId !== '-1' && filterParameter.plantMasterId;
        let companyMasterId = filterParameter && filterParameter.companyMasterId && filterParameter.companyMasterId !== null && filterParameter.companyMasterId !== "" && filterParameter.companyMasterId !== '-1' && filterParameter.companyMasterId;
        let roleMasterId = filterParameter && filterParameter.roleMasterId && filterParameter.roleMasterId !== null && filterParameter.roleMasterId !== "" && filterParameter.roleMasterId !== '-1' && filterParameter.roleMasterId;
        let userMasterId = filterParameter && filterParameter.userMasterId && filterParameter.userMasterId !== null && filterParameter.userMasterId !== "" && filterParameter.userMasterId !== '-1' && filterParameter.userMasterId;
        let url = config.AUDIT_URL + `audit/auditReport/GetSelfVsFinalAuditScoreCompanySectionWise?pageIndex=${pageIndex}`;
        if (yearMasterId) {
            url = url + `&yearMasterId=${yearMasterId}`;
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
        if (userMasterId) {
            url = url + `&userMasterId=${userMasterId}`;
        }

        const data = await service.get(url, true);
        console.log("GetSelfVsFinalAuditScoreCompanySectionWise data : ", data);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, reportTypes.SELF_VS_FINAAuditLSCORE_COMPANYSECTIONWISE_LIST_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Self Vs Final Score Report plant Wise  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#region  Self Audit Score Summary 
export const initSelfAuditScoreSummaryDetails_SubSectionWise = () => dispatch => {
    dispatchAction(dispatch, reportTypes.SELFAUDITSUMMARY_SUBSECTIONWISE_INIT, null, null, null, null);
};

export const getSelfAuditScoreSummaryDetails_SubSectionWise = (filterParameter) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let pageIndex = 0;

        let selfAuditPlanDetailsID = filterParameter && filterParameter.selfAuditPlanDetailsID && filterParameter.selfAuditPlanDetailsID !== null && filterParameter.selfAuditPlanDetailsID !== "" && filterParameter.selfAuditPlanDetailsID !== '-1' && filterParameter.selfAuditPlanDetailsID;
        let sectionMasterId = filterParameter && filterParameter.sectionMasterId && filterParameter.sectionMasterId !== null && filterParameter.sectionMasterId !== "" && filterParameter.sectionMasterId !== '-1' && filterParameter.sectionMasterId;
        let selfAuditPlanBasicDetailsId = filterParameter && filterParameter.selfAuditPlanBasicDetailsId && filterParameter.selfAuditPlanBasicDetailsId !== null && filterParameter.selfAuditPlanBasicDetailsId !== "" && filterParameter.selfAuditPlanBasicDetailsId;
        let yearTypeMasterId = filterParameter && filterParameter.yearTypeMasterId && filterParameter.yearTypeMasterId !== null && filterParameter.yearTypeMasterId !== "" && filterParameter.yearTypeMasterId !== "-1" && filterParameter.yearTypeMasterId;


        let yearMasterId = filterParameter && filterParameter.yearMasterId && filterParameter.yearMasterId !== null && filterParameter.yearMasterId !== "" && filterParameter.yearMasterId !== '-1' && filterParameter.yearMasterId;
        let plantMasterId = filterParameter && filterParameter.plantMasterId && filterParameter.plantMasterId !== null && filterParameter.plantMasterId !== "" && filterParameter.plantMasterId !== '-1' && filterParameter.plantMasterId;
        let companyMasterId = filterParameter && filterParameter.companyMasterId && filterParameter.companyMasterId !== null && filterParameter.companyMasterId !== "" && filterParameter.companyMasterId !== '-1' && filterParameter.companyMasterId;

        let url = config.AUDIT_URL + `audit/auditReport/selfAudit_ScoreSummary_SubSectionWise?pageIndex=${pageIndex}`;
        if (yearMasterId) {
            url = url + `&yearMasterId=${yearMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        if (selfAuditPlanDetailsID) {
            url = url + `&selfAuditPlanDetailsID=${selfAuditPlanDetailsID}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (selfAuditPlanBasicDetailsId) {
            url = url + `&selfAuditPlanBasicDetailsId=${selfAuditPlanBasicDetailsId}`;
        }
        if (yearTypeMasterId) {
            url = url + `&yearTypeMasterId=${yearTypeMasterId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, reportTypes.SELFAUDITSUMMARY_SUBSECTIONWISE_LIST_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Self Vs Final Score Report plant Wise  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const initSelfAuditScoreSummaryDetails_SectionWise = () => dispatch => {
    dispatchAction(dispatch, reportTypes.SELFAUDITSUMMARY_SECTIONWISE_INIT, null, null, null, null);
};

export const getSelfAuditScoreSummaryDetails_SectionWise = (filterParameter) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let pageIndex = 0;

        let selfAuditPlanDetailsID = filterParameter && filterParameter.selfAuditPlanDetailsID && filterParameter.selfAuditPlanDetailsID !== null && filterParameter.selfAuditPlanDetailsID !== "" && filterParameter.selfAuditPlanDetailsID !== '-1' && filterParameter.selfAuditPlanDetailsID;
        let sectionMasterId = filterParameter && filterParameter.sectionMasterId && filterParameter.sectionMasterId !== null && filterParameter.sectionMasterId !== "" && filterParameter.sectionMasterId !== '-1' && filterParameter.sectionMasterId;
        let selfAuditPlanBasicDetailsId = filterParameter && filterParameter.selfAuditPlanBasicDetailsId && filterParameter.selfAuditPlanBasicDetailsId !== null && filterParameter.selfAuditPlanBasicDetailsId !== "" && filterParameter.selfAuditPlanBasicDetailsId;
        let yearTypeMasterId = filterParameter && filterParameter.yearTypeMasterId && filterParameter.yearTypeMasterId !== null && filterParameter.yearTypeMasterId !== "" && filterParameter.yearTypeMasterId !== "-1" && filterParameter.yearTypeMasterId;


        let yearMasterId = filterParameter && filterParameter.yearMasterId && filterParameter.yearMasterId !== null && filterParameter.yearMasterId !== "" && filterParameter.yearMasterId !== '-1' && filterParameter.yearMasterId;
        let plantMasterId = filterParameter && filterParameter.plantMasterId && filterParameter.plantMasterId !== null && filterParameter.plantMasterId !== "" && filterParameter.plantMasterId !== '-1' && filterParameter.plantMasterId;
        let companyMasterId = filterParameter && filterParameter.companyMasterId && filterParameter.companyMasterId !== null && filterParameter.companyMasterId !== "" && filterParameter.companyMasterId !== '-1' && filterParameter.companyMasterId;

        let url = config.AUDIT_URL + `audit/auditReport/selfAudit_ScoreSummary_SectionWise?pageIndex=${pageIndex}`;
        if (yearMasterId) {
            url = url + `&yearMasterId=${yearMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        if (selfAuditPlanDetailsID) {
            url = url + `&selfAuditPlanDetailsID=${selfAuditPlanDetailsID}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (selfAuditPlanBasicDetailsId) {
            url = url + `&selfAuditPlanBasicDetailsId=${selfAuditPlanBasicDetailsId}`;
        }
        if (yearTypeMasterId) {
            url = url + `&yearTypeMasterId=${yearTypeMasterId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, reportTypes.SELFAUDITSUMMARY_SECTIONWISE_LIST_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Self Vs Final Score Report plant Wise  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion

//#region  Final Audit Score Summary 
export const initFinalAuditScoreSummaryDetails_SubSectionWise = () => dispatch => {
    dispatchAction(dispatch, reportTypes.FINALAUDITSUMMARY_SUBSECTIONWISE_INIT, null, null, null, null);
};

export const getFinalAuditScoreSummaryDetails_SubSectionWise = (filterParameter) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let pageIndex = 0;

        let auditPlanDetailsId = filterParameter && filterParameter.auditPlanDetailsId && filterParameter.auditPlanDetailsId !== null && filterParameter.auditPlanDetailsId !== "" && filterParameter.auditPlanDetailsId !== '-1' && filterParameter.auditPlanDetailsId;
        let sectionMasterId = filterParameter && filterParameter.sectionMasterId && filterParameter.sectionMasterId !== null && filterParameter.sectionMasterId !== "" && filterParameter.sectionMasterId !== '-1' && filterParameter.sectionMasterId;
        let selfAuditPlanDetailsId = filterParameter && filterParameter.selfAuditPlanDetailsId && filterParameter.selfAuditPlanDetailsId !== null && filterParameter.selfAuditPlanDetailsId !== "" && filterParameter.selfAuditPlanDetailsId;
        let yearTypeMasterId = filterParameter && filterParameter.yearTypeMasterId && filterParameter.yearTypeMasterId !== null && filterParameter.yearTypeMasterId !== "" && filterParameter.yearTypeMasterId !== "-1" && filterParameter.yearTypeMasterId;


        let yearMasterId = filterParameter && filterParameter.yearMasterId && filterParameter.yearMasterId !== null && filterParameter.yearMasterId !== "" && filterParameter.yearMasterId !== '-1' && filterParameter.yearMasterId;
        let plantMasterId = filterParameter && filterParameter.plantMasterId && filterParameter.plantMasterId !== null && filterParameter.plantMasterId !== "" && filterParameter.plantMasterId !== '-1' && filterParameter.plantMasterId;
        let companyMasterId = filterParameter && filterParameter.companyMasterId && filterParameter.companyMasterId !== null && filterParameter.companyMasterId !== "" && filterParameter.companyMasterId !== '-1' && filterParameter.companyMasterId;

        let url = config.AUDIT_URL + `audit/auditReport/finalAudit_ScoreSummary_SubSectionWise?pageIndex=${pageIndex}`;
        if (yearMasterId) {
            url = url + `&yearMasterId=${yearMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        if (auditPlanDetailsId) {
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (selfAuditPlanDetailsId) {
            url = url + `&selfAuditPlanDetailsId=${selfAuditPlanDetailsId}`;
        }
        if (yearTypeMasterId) {
            url = url + `&yearTypeMasterId=${yearTypeMasterId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, reportTypes.FINALAUDITSUMMARY_SUBSECTIONWISE_LIST_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Self Vs Final Score Report plant Wise  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
export const initFinalAuditScoreSummaryDetails_SectionWise = () => dispatch => {
    dispatchAction(dispatch, reportTypes.FINALAUDITSUMMARY_SECTIONWISE_INIT, null, null, null, null);
};

export const getFinalAuditScoreSummaryDetails_SectionWise = (filterParameter) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    try {
        let pageIndex = 0;

        let auditPlanDetailsId = filterParameter && filterParameter.auditPlanDetailsId && filterParameter.auditPlanDetailsId !== null && filterParameter.auditPlanDetailsId !== "" && filterParameter.auditPlanDetailsId !== '-1' && filterParameter.auditPlanDetailsId;
        let sectionMasterId = filterParameter && filterParameter.sectionMasterId && filterParameter.sectionMasterId !== null && filterParameter.sectionMasterId !== "" && filterParameter.sectionMasterId !== '-1' && filterParameter.sectionMasterId;
        let selfAuditPlanDetailsId = filterParameter && filterParameter.selfAuditPlanDetailsId && filterParameter.selfAuditPlanDetailsId !== null && filterParameter.selfAuditPlanDetailsId !== "" && filterParameter.selfAuditPlanDetailsId;
        let yearTypeMasterId = filterParameter && filterParameter.yearTypeMasterId && filterParameter.yearTypeMasterId !== null && filterParameter.yearTypeMasterId !== "" && filterParameter.yearTypeMasterId !== "-1" && filterParameter.yearTypeMasterId;


        let yearMasterId = filterParameter && filterParameter.yearMasterId && filterParameter.yearMasterId !== null && filterParameter.yearMasterId !== "" && filterParameter.yearMasterId !== '-1' && filterParameter.yearMasterId;
        let plantMasterId = filterParameter && filterParameter.plantMasterId && filterParameter.plantMasterId !== null && filterParameter.plantMasterId !== "" && filterParameter.plantMasterId !== '-1' && filterParameter.plantMasterId;
        let companyMasterId = filterParameter && filterParameter.companyMasterId && filterParameter.companyMasterId !== null && filterParameter.companyMasterId !== "" && filterParameter.companyMasterId !== '-1' && filterParameter.companyMasterId;

        let url = config.AUDIT_URL + `audit/auditReport/finalAudit_ScoreSummary_SectionWise?pageIndex=${pageIndex}`;
        if (yearMasterId) {
            url = url + `&yearMasterId=${yearMasterId}`;
        }
        if (plantMasterId) {
            url = url + `&plantMasterId=${plantMasterId}`;
        }
        if (auditPlanDetailsId) {
            url = url + `&auditPlanDetailsId=${auditPlanDetailsId}`;
        }
        if (companyMasterId) {
            url = url + `&companyMasterId=${companyMasterId}`;
        }
        if (sectionMasterId) {
            url = url + `&sectionMasterId=${sectionMasterId}`;
        }
        if (selfAuditPlanDetailsId) {
            url = url + `&selfAuditPlanDetailsId=${selfAuditPlanDetailsId}`;
        }
        if (yearTypeMasterId) {
            url = url + `&yearTypeMasterId=${yearTypeMasterId}`;
        }
        const data = await service.get(url, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, reportTypes.FINALAUDITSUMMARY_SECTIONWISE_LIST_SUCCESS, data.data, null, data.message, null);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Self Vs Final Score Report plant Wise  error'), null, null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};

//#endregion