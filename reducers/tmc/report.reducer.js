import * as actions from '../../action-types/tmc/report.action.types';


/**
 * 
 */
const initialState = {
    type: actions.SELF_VS_FINALSCORE_INIT,
    //selfVsFinalPlantWiseActionType : actions.SELF_VS_FINALSCORE_INIT,
    selfVsFinalPlantWiseScores: undefined,
    selfVsFinalPlantWiseScoreCount: undefined,
    selfVsFinalCompanySectionWiseScores: undefined,
    recordsCount: 0,

    selfAuditScoreSummarySubSectionActionType: actions.SELFAUDITSUMMARY_SUBSECTIONWISE_INIT,
    selfAuditScoreSummarySubSections: undefined,
    selfAuditScoreSummarySubSectionRecordsCount: 0,

    selfAuditScoreSummarySectionActionType: actions.SELFAUDITSUMMARY_SECTIONWISE_INIT,
    selfAuditScoreSummarySections: undefined,
    selfAuditScoreSummarySectionRecordsCount: 0,

    finalAuditScoreSummarySubSectionActionType: actions.FINALAUDITSUMMARY_SUBSECTIONWISE_INIT,
    finalAuditScoreSummarySubSections: undefined,
    finalAuditScoreSummarySubSectionRecordsCount: 0,

    finalAuditScoreSummarySectionActionType: actions.FINALAUDITSUMMARY_SECTIONWISE_INIT,
    finalAuditScoreSummarySections: undefined,
    finalAuditScoreSummarySectionRecordsCount: 0,
};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const reportReducer = (state, action) => {
    if (!state || typeof action.type === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case actions.SELF_VS_FINALSCORE_PLANTWISE_LIST_SUCCESS:
            return {
                selfVsFinalPlantWiseScoreCount: state.selfVsFinalPlantWiseScoreCount,
                selfVsFinalPlantWiseScores: action.data,
                type: action.type,
                recordsCount: action.recordsCount
            };
        case actions.SELF_VS_FINAAuditLSCORE_COMPANYSECTIONWISE_LIST_SUCCESS:
            console.log("action.data : ", action.data);
            return {
                selfVsFinalPlantWiseScoreCount: state.selfVsFinalPlantWiseScoreCount,
                selfVsFinalPlantWiseScores: state.selfVsFinalPlantWiseScores,
                selfVsFinalCompanySectionWiseScores: action.data,
                type: action.type,
                recordsCount: action.recordsCount
            };
        case actions.SELF_VS_FINALSCORE_INIT:
            return {
                selfVsFinalPlantWiseScores: state.selfVsFinalPlantWiseScores,
                selfVsFinalPlantWiseScoreCount: state.selfVsFinalPlantWiseScoreCount,
                type: action.type,
                recordsCount: state.recordsCount
            };
        //#region  Self Audit Score Summary
        case actions.SELFAUDITSUMMARY_SUBSECTIONWISE_LIST_SUCCESS:
            return {
                selfAuditScoreSummarySubSections: action.data,
                selfAuditScoreSummarySubSectionActionType: action.type,
                selfAuditScoreSummarySubSectionRecordsCount: action.recordsCount
            };
        case actions.SELFAUDITSUMMARY_SUBSECTIONWISE_INIT:
            return {
                selfAuditScoreSummarySubSections: state.selfAuditScoreSummarySubSections,
                selfAuditScoreSummarySubSectionActionType: action.type,
                selfAuditScoreSummarySubSectionRecordsCount: state.recordsCount
            };

        case actions.SELFAUDITSUMMARY_SECTIONWISE_LIST_SUCCESS:
            return {
                selfAuditScoreSummarySections: action.data,
                selfAuditScoreSummarySectionActionType: action.type,
                selfAuditScoreSummarySectionRecordsCount: action.recordsCount
            };
        case actions.SELFAUDITSUMMARY_SECTIONWISE_INIT:
            return {
                selfAuditScoreSummarySections: state.selfAuditScoreSummarySections,
                selfAuditScoreSummarySectionActionType: action.type,
                selfAuditScoreSummarySectionRecordsCount: state.recordsCount
            };
        //#endregion


        //#region  Final Audit Score Summary
        case actions.FINALAUDITSUMMARY_SUBSECTIONWISE_LIST_SUCCESS:
            return {
                finalAuditScoreSummarySubSections: action.data,
                finalAuditScoreSummarySubSectionActionType: action.type,
                finalAuditScoreSummarySubSectionRecordsCount: action.recordsCount
            };
        case actions.FINALAUDITSUMMARY_SUBSECTIONWISE_INIT:
            return {
                finalAuditScoreSummarySubSections: state.finalAuditScoreSummarySubSections,
                finalAuditScoreSummarySubSectionActionType: action.type,
                finalAuditScoreSummarySubSectionRecordsCount: state.recordsCount
            };

        case actions.FINALAUDITSUMMARY_SECTIONWISE_LIST_SUCCESS:
            return {
                finalAuditScoreSummarySections: action.data,
                finalAuditScoreSummarySectionActionType: action.type,
                finalAuditScoreSummarySectionRecordsCount: action.recordsCount
            };
        case actions.FINALAUDITSUMMARY_SECTIONWISE_INIT:
            return {
                finalAuditScoreSummarySections: state.finalAuditScoreSummarySections,
                finalAuditScoreSummarySectionActionType: action.type,
                finalAuditScoreSummarySectionRecordsCount: state.recordsCount
            };
        //#endregion

        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                selfVsFinalPlantWiseScores: state.selfVsFinalPlantWiseScores,
                selfVsFinalCompanySectionWiseScores: state.selfVsFinalCompanySectionWiseScores,
                selfVsFinalPlantWiseScoreCount: state.selfVsFinalPlantWiseScoreCount,
                recordsCount: state.recordsCount,

                selfAuditScoreSummarySections: state.selfAuditScoreSummarySections,
                selfAuditScoreSummarySectionActionType: state.selfAuditScoreSummarySectionActionType,
                selfAuditScoreSummarySectionRecordsCount: state.selfAuditScoreSummarySectionRecordsCount,

                selfAuditScoreSummarySubSections: state.selfAuditScoreSummarySubSections,
                selfAuditScoreSummarySubSectionActionType: state.selfAuditScoreSummarySubSectionActionType,
                selfAuditScoreSummarySubSectionRecordsCount: state.selfAuditScoreSummarySubSectionRecordsCount,

                finalAuditScoreSummarySubSections: state.finalAuditScoreSummarySubSections,
                finalAuditScoreSummarySubSectionActionType: state.finalAuditScoreSummarySubSectionActionType,
                finalAuditScoreSummarySubSectionRecordsCount: state.finalAuditScoreSummarySubSectionRecordsCount,

                finalAuditScoreSummarySections: state.finalAuditScoreSummarySections,
                finalAuditScoreSummarySectionActionType: state.finalAuditScoreSummarySectionActionType,
                finalAuditScoreSummarySectionRecordsCount: state.finalAuditScoreSummarySectionRecordsCount
            };
    }
};

export default reportReducer;