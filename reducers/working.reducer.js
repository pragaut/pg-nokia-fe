import { startOfYesterday } from 'date-fns';
import * as actions from '../action-types/working.action.types';


/**
 * 
 */
const initialState = {
    type: actions.SUPPORTINGDOC_INIT,
    recordsCount: 0,

    selfAuditPlanActiontype: actions.SELFAUDITPLANDETAILS_INIT,
    selfAuditPlan: undefined,
    selfAuditPlans: undefined,
    selfAuditPlanRecordsCount: 0,

    supportingDocActiontype: actions.SUPPORTINGDOC_INIT,
    supportingDoc: undefined,
    supportingDocs: undefined,
    supportingDocRecordsCount: 0,

    pendingTaskDetailActiontype: actions.PENDINGTASKDASHBOARD_INIT,
    pendingTaskDetail: undefined,
    pendingTaskDetails: undefined,
    pendingTaskDetailRecordsCount: 0,
    recordsCount: 0,

    ResponsibilityWiseselfAuditDetailActiontype: actions.SELFAUDITDETAILS_RESPONSIBILITYWISE_INIT,
    ResponsibilityWiseselfAuditDetails: undefined,
    ResponsibilityWiseselfAuditDetailRecordsCount: 0,

    selfAuditScopeDetailActiontype: actions.SA_SCOPEDETAILS_INIT,
    selfAuditScopeDetails: undefined,
    selfAuditScopeDetailRecordsCount: 0,

    selfAuditScoreDetailActiontype: actions.SA_TEAMASSIGNMENTANDEXECUTION_INIT,
    selfAuditScoreDetail: undefined,
    selfAuditScoreDetails: undefined,
    selfAuditScoreDetailRecordsCount: 0,

    finalAuditPlanActiontype: actions.FINALAUDITPLANDETAILS_INIT,
    finalAuditPlan: undefined,
    finalAuditPlans: undefined,
    finalAuditPlanRecordsCount: 0,

    finalAuditPlanExecutionActiontype: actions.FINALAUDITPLANEXECUTIONDETALS_INIT,
    finalAuditPlanExecutionDetail: undefined,
    finalAuditPlanExecutionDetails: undefined,
    finalAuditPlanDetailsForExecution: undefined,
    finalAuditScopeDetailsForExecution: undefined,
    finalAuditPlanExecutionDetailRecordsCount: 0,

    finalAuditSectionDetailActiontype: actions.SECTIONDETAILSFORFINALAUDIT_INIT,
    finalAuditSectionDetail: undefined,
    finalAuditSectionDetails: undefined,
    finalAuditSectionDetailRecordsCount: 0,


    actionRequiredObservationActiontype: actions.ACTIONPLANUPDATE_ACTIONREQUIREDOBSERVATION_INIT,
    actionRequiredObservation: undefined,
    actionRequiredObservations: undefined,
    actionRequiredRecordsCount: 0,

    actionPlanDetailActiontype: actions.ACTIONPLANUPDATE_INIT,
    actionPlanDetail: undefined,
    actionPlanDetails: undefined,
    actionPlanDetailRecordsCount: 0,

    responsibilityWiseFinalAuditDetailActiontype: actions.FINALAUDITDETAILS_RESPONSIBILITYWISE_INIT,
    responsibilityWiseFinalAuditDetails: undefined,
    responsibilityWiseFinalAuditDetailRecordsCount: 0,

    finalAuditActionPlanActiontype: actions.FINALAUDITPLANDETAILS_INIT,
    finalAuditActionPlandetail: undefined,
    finalAuditActionPlandetails: undefined,
    finalAuditActionPlanRecordsCount: 0,

    actionPlanForReviewActiontype: actions.MONTHLYREVIEW_ACTIONPLANS_INIT,
    actionPlanForReviewDetails: undefined,
    currentMonthReviewDetails: undefined,
    actionPlanForReviewDetailRecordsCount: 0,

    monthlyReviewActiontype: actions.MONTHLYREVIEW_INIT,
    monthlyReviewDetail: undefined,
    monthlyReviewDetails: undefined,
    monthlyReviewRecordsCount: 0,

    observationActiontype: actions.AUDITOBSERVATION_INIT,
    observations: undefined,
    observationRecordsCount: 0,
};


/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const workingReducer = (state, action) => {
    if (!state || typeof action.type === 'undefined') {
        return initialState;
    }
    //console.log("action.type", action.type);
    switch (action.type) {

        //#region Self Audit Plan Details
        case actions.SELFAUDITPLANDETAILS_LIST_SUCCESS:
            return {
                selfAuditPlan: state.selfAuditPlan,
                selfAuditPlans: action.data,
                selfAuditPlanActiontype: action.type,
                selfAuditPlanRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.SELFAUDITPLANDETAILS_GET_BY_ID_SUCCESS:
            return {
                selfAuditPlans: state.selfAuditPlans,
                selfAuditPlan: action.data,
                selfAuditPlanActiontype: action.type,
                selfAuditPlanRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SELFAUDITPLANDETAILS_SAVE_SUCCESS:
            return {
                selfAuditPlan: action.data,
                selfAuditPlans: state.selfAuditPlans,
                selfAuditPlanActiontype: action.type,
                selfAuditPlanRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.SELFAUDITPLANDETAILS_DELETE_SUCCESS:
            return {
                selfAuditPlan: state.data,
                selfAuditPlans: state.selfAuditPlans,
                selfAuditPlanActiontype: action.type,
                selfAuditPlanRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SELFAUDITPLANDETAILS_INIT:
            return {
                selfAuditPlan: state.selfAuditPlan,
                selfAuditPlans: state.selfAuditPlans,
                selfAuditPlanActiontype: action.type,
                selfAuditPlanRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion


        //#region Supporting Doc
        case actions.SUPPORTINGDOC_LIST_SUCCESS:
            return {
                supportingDoc: state.supportingDoc,
                supportingDocs: action.data,
                supportingDocActiontype: action.type,
                supportingDocRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.SUPPORTINGDOC_GET_BY_ID_SUCCESS:
            return {
                supportingDocs: state.supportingDocs,
                supportingDoc: action.data,
                supportingDocActiontype: action.type,
                supportingDocRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SUPPORTINGDOC_SAVE_SUCCESS:
            return {
                supportingDoc: action.data,
                supportingDocs: state.supportingDocs,
                supportingDocActiontype: action.type,
                supportingDocRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.SUPPORTINGDOC_DELETE_SUCCESS:
            return {
                supportingDoc: state.data,
                supportingDocs: state.supportingDocs,
                supportingDocActiontype: action.type,
                supportingDocRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SUPPORTINGDOC_INIT:
            return {
                supportingDoc: state.supportingDoc,
                supportingDocs: state.supportingDocs,
                supportingDocActiontype: action.type,
                supportingDocRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion
        //#region Pending Task Dashboard
        case actions.PENDINGTASKDASHBOARD_LIST_SUCCESS:
            return {
                pendingTaskDetail: state.pendingTaskDetail,
                pendingTaskDetails: action.data,
                pendingTaskDetailActiontype: action.type,
                pendingTaskDetailRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.PENDINGTASKDASHBOARD_INIT:
            return {
                pendingTaskDetail: state.pendingTaskDetail,
                pendingTaskDetails: state.pendingTaskDetails,
                pendingTaskDetailActiontype: action.type,
                pendingTaskDetailRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion
        //#region Self Audit Details Responsibili Wise
        case actions.SELFAUDITDETAILS_RESPONSIBILITYWISE_LIST_SUCCESS:
            return {
                ResponsibilityWiseselfAuditDetails: action.data,
                ResponsibilityWiseselfAuditDetailActiontype: action.type,
                ResponsibilityWiseselfAuditDetailRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.SELFAUDITDETAILS_RESPONSIBILITYWISE_INIT:
            return {
                ResponsibilityWiseselfAuditDetails: state.ResponsibilityWiseselfAuditDetails,
                ResponsibilityWiseselfAuditDetailActiontype: action.type,
                ResponsibilityWiseselfAuditDetailRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Self Audit Scope Details 
        case actions.SA_SCOPEDETAILS_LIST_SUCCESS:
            return {
                selfAuditScopeDetails: action.data,
                selfAuditScopeDetailActiontype: action.type,
                selfAuditScopeDetailRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.SA_SCOPEDETAILS_INIT:
            return {
                selfAuditScopeDetails: state.selfAuditScopeDetails,
                selfAuditScopeDetailActiontype: action.type,
                selfAuditScopeDetailRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region  Self Audit Execution Details
        case actions.SA_TEAMASSIGNMENTANDEXECUTION_LIST_SUCCESS:
            return {
                selfAuditScoreDetail: state.selfAuditScoreDetail,
                selfAuditScoreDetails: action.data,
                selfAuditScoreDetailActiontype: action.type,
                selfAuditScoreDetailRecordsCount: action.recordsCount,
                type: action.type,
            };
        case actions.SA_TEAMASSIGNMENTANDEXECUTION_SAVE_SUCCESS:
            return {
                selfAuditScoreDetail: state.selfAuditScoreDetail,
                selfAuditScoreDetails: action.data,
                selfAuditScoreDetailActiontype: action.type,
                selfAuditScoreDetailRecordsCount: action.recordsCount,
                type: action.type,
            };
        case actions.SA_TEAMASSIGNMENTANDEXECUTION_INIT:
            return {
                selfAuditScoreDetail: state.selfAuditScoreDetail,
                selfAuditScoreDetails: state.selfAuditScoreDetails,
                selfAuditScoreDetailActiontype: action.type,
                selfAuditScoreDetailRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Self Audit Details Responsibili Wise
        case actions.FINALAUDITDETAILS_RESPONSIBILITYWISE_LIST_SUCCESS:
            return {
                responsibilityWiseFinalAuditDetails: action.data,
                responsibilityWiseFinalAuditDetailActiontype: action.type,
                responsibilityWiseFinalAuditDetailRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.FINALAUDITDETAILS_RESPONSIBILITYWISE_INIT:
            return {
                responsibilityWiseFinalAuditDetails: state.responsibilityWiseFinalAuditDetails,
                responsibilityWiseFinalAuditDetailActiontype: action.type,
                responsibilityWiseFinalAuditDetailRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion


        //#region Final Audit Plan
        case actions.FINALAUDITPLANDETAILS_LIST_SUCCESS:
            return {
                finalAuditPlan: state.finalAuditPlan,
                finalAuditPlans: action.data,
                finalAuditPlanActiontype: action.type,
                finalAuditPlanRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.FINALAUDITPLANDETAILS_GET_BY_ID_SUCCESS:
            return {
                finalAuditPlans: state.finalAuditPlans,
                finalAuditPlan: action.data,
                finalAuditPlanActiontype: action.type,
                finalAuditPlanRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.FINALAUDITPLANDETAILS_SAVE_SUCCESS:
            return {
                finalAuditPlan: action.data,
                finalAuditPlans: state.finalAuditPlans,
                finalAuditPlanActiontype: action.type,
                finalAuditPlanRecordsCount: state.recordsCount,
                type: action.type,
            };
        case actions.FINALAUDITPLANDETAILS_DELETE_SUCCESS:
            return {
                finalAuditPlan: state.data,
                finalAuditPlans: state.finalAuditPlans,
                finalAuditPlanActiontype: action.type,
                finalAuditPlanRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.FINALAUDITPLANDETAILS_INIT:
            return {
                finalAuditPlan: state.finalAuditPlan,
                finalAuditPlans: state.finalAuditPlans,
                finalAuditPlanActiontype: action.type,
                finalAuditPlanRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Final Audit Plan Execution        

        case actions.FINALAUDITPLANDETALSFOREXECUTION_LIST_SUCCESS:
            return {
                finalAuditPlanDetailsForExecution: action.data,
                finalAuditPlanExecutionDetail: state.finalAuditPlanExecutionDetail,
                finalAuditPlanExecutionDetails: state.finalAuditPlanExecutionDetails,
                finalAuditPlanExecutionDetailActiontype: action.type,
                finalAuditPlanExecutionDetailRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.FINALAUDITSCOPEDETALSFOREXECUTION_LIST_SUCCESS:
            return {
                finalAuditScopeDetailsForExecution: action.data,
                finalAuditPlanDetailsForExecution: state.finalAuditPlanDetailsForExecution,
                finalAuditPlanExecutionDetail: state.finalAuditPlanExecutionDetail,
                finalAuditPlanExecutionDetails: state.finalAuditPlanExecutionDetails,
                finalAuditPlanExecutionDetailActiontype: action.type,
                finalAuditPlanExecutionDetailRecordsCount: action.recordsCount,
                type: action.type,
            };

        case actions.FINALAUDITSCORE_LIST_SUCCESS:
            return {
                finalAuditScoreDetail: state.finalAuditScoreDetail,
                finalAuditScoreDetails: action.data,
                finalAuditScoreDetailActiontype: action.type,
                finalAuditScoreDetailRecordsCount: action.recordsCount,
                type: action.type,
            };


        case actions.FINALAUDITPLANEXECUTIONDETALS_LIST_SUCCESS:
            return {
                finalAuditScopeDetailsForExecution: state.finalAuditScopeDetailsForExecution,
                finalAuditPlanDetailsForExecution: state.finalAuditPlanDetailsForExecution,
                finalAuditPlanExecutionDetail: state.finalAuditPlanExecutionDetail,
                finalAuditPlanExecutionDetails: action.data,
                finalAuditPlanExecutionDetailActiontype: action.type,
                finalAuditPlanExecutionDetailRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.FINALAUDITPLANEXECUTIONDETALS_GET_BY_ID_SUCCESS:
            return {
                finalAuditScopeDetailsForExecution: state.finalAuditScopeDetailsForExecution,
                finalAuditPlanDetailsForExecution: state.finalAuditPlanDetailsForExecution,
                finalAuditPlanExecutionDetails: state.finalAuditPlanExecutionDetails,
                finalAuditPlanExecutionDetail: action.data,
                finalAuditPlanExecutionDetailActiontype: action.type,
                finalAuditPlanExecutionDetailRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.FINALAUDITPLANEXECUTIONDETALS_SAVE_SUCCESS:
            return {
                finalAuditScopeDetailsForExecution: state.finalAuditScopeDetailsForExecution,
                finalAuditPlanDetailsForExecution: state.finalAuditPlanDetailsForExecution,
                finalAuditPlanExecutionDetail: action.data,
                finalAuditPlanExecutionDetails: state.finalAuditPlanExecutionDetails,
                finalAuditPlanExecutionDetailActiontype: action.type,
                finalAuditPlanExecutionDetailRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.FINALAUDITPLANEXECUTIONDETALS_DELETE_SUCCESS:
            return {
                finalAuditScopeDetailsForExecution: state.finalAuditScopeDetailsForExecution,
                finalAuditPlanDetailsForExecution: state.finalAuditPlanDetailsForExecution,
                finalAuditPlanExecutionDetail: state.data,
                finalAuditPlanExecutionDetails: state.finalAuditPlanExecutionDetails,
                finalAuditPlanExecutionDetailActiontype: action.type,
                finalAuditPlanExecutionDetailRecordsCount: state.recordsCount,
            };

        case actions.FINALAUDITPLANEXECUTIONDETALS_INIT:
            return {
                finalAuditScopeDetailsForExecution: state.finalAuditScopeDetailsForExecution,
                finalAuditPlanDetailsForExecution: state.finalAuditPlanDetailsForExecution,
                finalAuditPlanExecutionDetail: state.finalAuditPlanExecutionDetail,
                finalAuditPlanExecutionDetails: state.finalAuditPlanExecutionDetails,
                finalAuditPlanExecutionDetailActiontype: action.type,
                finalAuditPlanExecutionDetailRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region  Final Audit Section Details
        case actions.SECTIONDETAILSFORFINALAUDIT_LIST_SUCCESS:
            return {
                finalAuditSectionDetail: state.finalAuditSectionDetail,
                finalAuditSectionDetails: action.data,
                finalAuditSectionDetailActiontype: action.type,
                finalAuditSectionDetailRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.PENDINGTASKDASHBOARD_INIT:
            return {
                finalAuditSectionDetail: state.finalAuditSectionDetail,
                finalAuditSectionDetails: state.finalAuditSectionDetails,
                finalAuditSectionDetailActiontype: action.type,
                finalAuditSectionDetailRecordsCount: state.recordsCount,
                type: action.type,
            };
        //#endregion

        //#region  Action Required Observation
        case actions.ACTIONPLANUPDATE_ACTIONREQUIREDOBSERVATION_LIST_SUCCESS:
            return {
                actionRequiredObservation: state.actionRequiredObservation,
                actionRequiredObservations: action.data,
                actionRequiredObservationActiontype: action.type,
                actionRequiredRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.ACTIONPLANUPDATE_ACTIONREQUIREDOBSERVATION_INIT:
            return {
                actionRequiredObservation: state.actionRequiredObservation,
                actionRequiredObservations: state.actionRequiredObservations,
                actionRequiredObservationActiontype: action.type,
                actionRequiredRecordsCount: action.recordsCount,
                type: action.type,
            };
        //#endregion


        //#region Action Plan Update Details
        case actions.ACTIONPLANUPDATE_LIST_SUCCESS:
            return {
                actionPlanDetail: state.actionPlanDetail,
                actionPlanDetails: action.data,
                actionPlanDetailActiontype: action.type,
                actionPlanDetailRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.ACTIONPLANUPDATE_SAVE_SUCCESS:
            return {
                actionPlanDetail: action.data,
                actionPlanDetails: state.actionPlanDetails,
                actionPlanDetailActiontype: action.type,
                actionPlanDetailRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.ACTIONPLANUPDATE_INIT:
            return {
                actionPlanDetail: state.actionPlanDetail,
                actionPlanDetails: state.actionPlanDetails,
                actionPlanDetailActiontype: action.type,
                actionPlanDetailRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Action Plan Details
        case actions.FINALAUDITACTIONPLANDETAILS_LIST_SUCCESS:
            return {
                finalAuditActionPlandetail: state.finalAuditActionPlandetail,
                finalAuditActionPlandetails: action.data,
                finalAuditActionPlanActiontype: action.type,
                finalAuditActionPlanRecordsCount: action.recordsCount,

                type: action.type,
            };

        //#endregion

        //#region  Action  Plan  for monthly review
        case actions.MONTHLYREVIEW_ACTIONPLANS_LIST_SUCCESS:
            return {
                actionPlanForReviewDetails: action.data,
                currentMonthReviewDetails: state.currentMonthReviewDetails,
                actionPlanForReviewActiontype: action.type,
                actionPlanForReviewDetailRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.CURRENTMONTH_MONTHLYREVIEW_LIST_SUCCESS:
            return {
                actionPlanForReviewDetails: state.actionPlanForReviewDetails,
                currentMonthReviewDetails: action.data,
                actionPlanForReviewActiontype: action.type,
                actionPlanForReviewDetailRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.MONTHLYREVIEW_ACTIONPLANS_INIT:
            return {
                actionPlanForReviewDetails: state.actionPlanForReviewDetails,
                currentMonthReviewDetails: state.currentMonthReviewDetails,
                actionPlanForReviewActiontype: action.type,
                actionPlanForReviewDetailRecordsCount: action.recordsCount,
                type: action.type,
            };
        //#endregion


        //#region Monthly Review Details
        case actions.MONTHLYREVIEWDETAILS_LIST_SUCCESS:
            return {
                monthlyReviewDetail: state.monthlyReviewDetail,
                monthlyReviewDetails: action.data,
                monthlyReviewActiontype: action.type,
                monthlyReviewRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.MONTHLYREVIEW_SAVE_SUCCESS:
            return {
                monthlyReviewDetail: action.data,
                monthlyReviewDetails: state.monthlyReviewDetails,
                monthlyReviewActiontype: action.type,
                monthlyReviewRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.MONTHLYREVIEW_INIT:
            return {
                monthlyReviewDetail: state.monthlyReviewDetail,
                monthlyReviewDetails: state.monthlyReviewDetails,
                monthlyReviewActiontype: action.type,
                monthlyReviewRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Monthly Review Details
        case actions.AUDITOBSERVATION_LIST_SUCCESS:
            return {
                observations: action.data,
                observationActiontype: action.type,
                observationRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.AUDITOBSERVATION_INIT:
            return {
                observations: state.observations,
                observationActiontype: action.type,
                observationRecordsCount: state.recordsCount,
                type: action.type,
            };
        //#endregion


        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                recordsCount: state.recordsCount,

                selfAuditPlan: state.selfAuditPlan,
                selfAuditPlans: state.selfAuditPlans,
                selfAuditPlanActiontype: state.selfAuditPlanActiontype,
                selfAuditPlanRecordsCount: state.selfAuditPlanRecordsCount,

                supportingDoc: state.supportingDoc,
                supportingDocs: state.supportingDocs,
                supportingDocActiontype: state.supportingDocActiontype,
                supportingDocRecordsCount: state.supportingDocRecordsCount,

                pendingTaskDetail: state.pendingTaskDetail,
                pendingTaskDetails: state.pendingTaskDetails,
                pendingTaskDetailActiontype: state.pendingTaskDetailActiontype,
                pendingTaskDetailRecordsCount: state.pendingTaskDetailRecordsCount,

                ResponsibilityWiseselfAuditDetails: state.ResponsibilityWiseselfAuditDetails,
                ResponsibilityWiseselfAuditDetailActiontype: state.ResponsibilityWiseselfAuditDetailActiontype,
                ResponsibilityWiseselfAuditDetailRecordsCount: state.ResponsibilityWiseselfAuditDetailRecordsCount,

                selfAuditScopeDetails: state.selfAuditScopeDetails,
                selfAuditScopeDetailActiontype: state.selfAuditScopeDetailActiontype,
                selfAuditScopeDetailRecordsCount: state.selfAuditScopeDetailRecordsCount,

                selfAuditScoreDetail: state.selfAuditScoreDetail,
                selfAuditScoreDetails: state.selfAuditScoreDetails,

                selfAuditScoreDetailActiontype: state.selfAuditScoreDetailActiontype,
                selfAuditScoreDetailRecordsCount: state.selfAuditScoreDetailRecordsCount,

                finalAuditPlan: state.finalAuditPlan,
                finalAuditPlans: state.finalAuditPlans,
                finalAuditPlanActiontype: state.finalAuditPlanActiontype,
                finalAuditPlanRecordsCount: state.finalAuditPlanRecordsCount,

                finalAuditScopeDetailsForExecution: state.finalAuditScopeDetailsForExecution,
                finalAuditPlanDetailsForExecution: state.finalAuditPlanDetailsForExecution,
                finalAuditPlanExecutionDetail: state.finalAuditPlanExecutionDetail,
                finalAuditPlanExecutionDetails: state.finalAuditPlanExecutionDetails,
                finalAuditPlanExecutionDetailActiontype: state.finalAuditPlanExecutionDetailActiontype,
                finalAuditPlanExecutionDetailRecordsCount: state.finalAuditPlanExecutionDetailRecordsCount,

                finalAuditSectionDetail: state.finalAuditSectionDetail,
                finalAuditSectionDetails: state.finalAuditSectionDetails,
                finalAuditSectionDetailActiontype: state.finalAuditSectionDetailActiontype,
                finalAuditSectionDetailRecordsCount: state.finalAuditSectionDetailRecordsCount,

                actionRequiredObservation: state.actionRequiredObservation,
                actionRequiredObservations: state.actionRequiredObservations,
                actionRequiredObservationActiontype: state.actionRequiredObservationActiontype,
                actionRequiredRecordsCount: state.actionRequiredRecordsCount,

                actionPlanDetail: state.actionPlanDetail,
                actionPlanDetails: state.actionPlanDetails,
                actionPlanDetailActiontype: state.actionPlanDetailActiontype,
                actionPlanDetailRecordsCount: state.actionPlanDetailRecordsCount,

                responsibilityWiseFinalAuditDetails: state.responsibilityWiseFinalAuditDetails,
                responsibilityWiseFinalAuditDetailActiontype: state.responsibilityWiseFinalAuditDetailActiontype,
                responsibilityWiseFinalAuditDetailRecordsCount: state.responsibilityWiseFinalAuditDetailRecordsCount,

                finalAuditActionPlandetail: state.finalAuditActionPlandetail,
                finalAuditActionPlandetails: state.finalAuditActionPlandetails,
                finalAuditActionPlanActiontype: state.finalAuditActionPlanActiontype,
                finalAuditActionPlanRecordsCount: state.finalAuditActionPlanRecordsCount,

                actionPlanForReviewDetails: state.actionPlanForReviewDetails,
                currentMonthReviewDetails: state.currentMonthReviewDetails,
                actionPlanForReviewActiontype: state.actionPlanForReviewActiontype,
                actionPlanForReviewDetailRecordsCount: state.actionPlanForReviewDetailRecordsCount,

                monthlyReviewDetail: state.monthlyReviewDetail,
                monthlyReviewDetails: state.monthlyReviewDetails,
                monthlyReviewActiontype: state.monthlyReviewActiontype,
                monthlyReviewRecordsCount: state.monthlyReviewRecordsCount,

                observations: state.observations,
                observationActiontype: state.observationActiontype,
                observationRecordsCount: state.observationRecordsCount,
            };
    }
};

export default workingReducer;