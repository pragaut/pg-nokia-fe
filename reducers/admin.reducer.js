import * as actions from '../action-types/admin.action.types';

/**
 * 
 */
const initialState = {
    type: actions.GROUPMASTER_INIT,
    recordsCount: 0,

    groupActiontype: actions.GROUPMASTER_INIT,
    group: undefined,
    groups: undefined,
    groupRecordsCount: 0,

    alarmActiontype: actions.ALARMTYPEMASTER_INIT,
    alarm: undefined,
    alarms: undefined,
    alarmRecordsCount: 0,

    orgRelationTypeActiontype: actions.GROUPMASTER_INIT,
    orgRelationType: undefined,
    orgRelationTypes: undefined,
    orgRelationTypeRecordsCount: 0,

    countryActiontype: actions.COUNTRYMASTER_INIT,
    country: undefined,
    countrys: undefined,
    countryRecordsCount: 0,

    stateActiontype: actions.STATEMASTER_INIT,
    state: undefined,
    states: undefined,
    stateRecordsCount: 0,

    cityActiontype: actions.CITYMASTER_INIT,
    city: undefined,
    citys: undefined,
    cityRecordsCount: 0,

    genderActiontype: actions.GENDERMASTER_INIT,
    gender: undefined,
    genders: undefined,
    genderRecordsCount: 0,

    organisationActiontype: actions.ORGANISATIONDETAILS_INIT,
    organisation: undefined,
    organisations: undefined,
    organisationRecordsCount: 0,

    moduleActiontype: actions.MODULEMASTER_INIT,
    module: undefined,
    modules: undefined,
    moduleRecordsCount: 0,

    roleActiontype: actions.ROLEMASTER_INIT,
    role: undefined,
    roles: undefined,
    roleRecordsCount: 0,

    companyActiontype: actions.COMPANYMASTER_INIT,
    company: undefined,
    companys: undefined,
    companyRecordsCount: 0,

    plantActiontype: actions.PLANTMASTER_INIT,
    plant: undefined,
    plants: undefined,
    plantRecordsCount: 0,

    yearActiontype: actions.YEARMASTER_INIT,
    year: undefined,
    years: undefined,
    yearRecordsCount: 0,

    userActiontype: actions.USER_INIT,
    user: undefined,
    users: undefined,
    userRecordsCount: 0,

    notificationActiontype: actions.NOTIFICATIONMASTERDETAILS_INIT,
    notification: undefined,
    notifications: undefined,
    notificationRecordsCount: 0,

    escalationmatrixActiontype: actions.ESCALATIONMATRIXDETAILS_INIT,
    escalationmatrix: undefined,
    escalationmatrixs: undefined,
    escalationmatrixRecordsCount: 0,

    escalationDurationActiontype: actions.ESCALATIONDURATIONDETAILS_INIT,
    escalationDuration: undefined,
    escalationDurations: undefined,
    escalationDurationRecordsCount: 0,

    supportingDocumentMasterActiontype: actions.SUPPORTINGDOCUMENTMASTER_INIT,
    supportingDocumentMaster: undefined,
    supportingDocumentMasters: undefined,
    supportingDocumentMasterRecordsCount: 0,

    dueDayActiontype: actions.DUEDAYSMASTER_INIT,
    dueDay: undefined,
    dueDays: undefined,
    dueDaysRecordsCount: 0,

    statusActiontype: actions.STATUSMASTER_INIT,
    status: undefined,
    statuss: undefined,
    statusRecordsCount: 0,

    yearTypeActiontype: actions.YEARMASTER_INIT,
    yearType: undefined,
    yearTypes: undefined,
    yearTypeRecordsCount: 0,

    sectionActiontype: actions.SECTIONMASTER_INIT,
    section: undefined,
    sections: undefined,
    sectionRecordsCount: 0,

    subSectionActiontype: actions.SUBSECTIONMASTER_INIT,
    subSection: undefined,
    subSections: undefined,
    subSectionRecordsCount: 0,

    auditTypeActiontype: actions.AUDITTYPEMASTER_INIT,
    auditType: undefined,
    auditTypes: undefined,
    auditTypeRecordsCount: 0,

    auditObservationActiontype: actions.AUDITOBSERVATIONMASTER_INIT,
    auditObservation: undefined,
    auditObservations: undefined,
    auditObservationRecordsCount: 0,

    criticalityActiontype: actions.CRITICALITYMASTER_INIT,
    criticality: undefined,
    criticalitys: undefined,
    criticalityRecordsCount: 0,

    auditTypeAuditorRelationActiontype: actions.AUDITTYPEAUDITORRELATIONMASTER_INIT,
    auditTypeAuditorRelation: undefined,
    auditTypeAuditorRelations: undefined,
    auditTypeAuditorRelationRecordsCount: 0,

    scopeActiontype: actions.SCOPEMASTER_INIT,
    scope: undefined,
    scopes: undefined,
    scopeRecordsCount: 0,


    processFlowResponsibility: actions.PROCESSFLOWRESPONSIBILITYMASTER_INIT,
    processFlowResponsibilitys: undefined,
    processFlowResponsibilityActiontype: undefined,
    processFlowResponsibilityRecordsCount: 0,
};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const adminReducer = (state, action) => {
    if (!state || typeof action.type === 'undefined') {
        return initialState;
    }

    switch (action.type) {

        //#region  Group Master Reducer
        case actions.GROUPMASTER_LIST_SUCCESS:
            return {
                group: state.group,
                groups: action.data,
                groupActiontype: action.type,
                groupRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.GROUPMASTER_GET_BY_ID_SUCCESS:
            return {
                groups: state.groups,
                group: action.data,
                groupActiontype: action.type,
                groupRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.GROUPMASTER_SAVE_SUCCESS:
            return {
                group: action.data,
                groups: state.groups,
                groupActiontype: action.type,
                groupRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.GROUPMASTER_DELETE_SUCCESS:
            return {
                group: state.data,
                groups: state.groups,
                groupActiontype: action.type,
                groupRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.GROUPMASTER_INIT:
            return {
                group: state.group,
                groups: state.groups,
                groupActiontype: action.type,
                groupRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Alarm Type Master Reducer
        case actions.ALARMTYPEMASTER_LIST_SUCCESS:
            return {
                alarm: state.alarm,
                alarms: action.data,
                alarmActiontype: action.type,
                alarmRecordsCount: action.recordsCount,

            };

        case actions.ALARMTYPEMASTER_GET_BY_ID_SUCCESS:
            return {
                alarms: state.alarmRecordsCount,
                alarm: action.data,
                alarmActiontype: action.type,
                alarmRecordsCount: state.recordsCount,
            };

        case actions.ALARMTYPEMASTER_SAVE_SUCCESS:
            return {
                alarm: action.data,
                alarms: state.alarms,
                alarmActiontype: action.type,
                alarmRecordsCount: state.recordsCount,
            };

        case actions.ALARMTYPEMASTER_DELETE_SUCCESS:
            return {
                alarm: state.data,
                alarms: state.alarms,
                alarmActiontype: action.type,
                alarmRecordsCount: state.recordsCount,
            };

        case actions.ALARMTYPEMASTER_INIT:
            return {
                alarm: state.alarm,
                alarms: state.alarms,
                alarmActiontype: action.type,
                alarmRecordsCount: state.recordsCount,
            };

        //#endregion
        //#region  Org Relation Type Reducer
        case actions.ORGRELATIONTYPEMASTER_LIST_SUCCESS:
            return {
                orgRelationType: state.orgRelationType,
                orgRelationTypes: action.data,
                orgRelationType: action.type,
                orgRelationTypeRecordsCount: action.recordsCount,

                type: action.type,
            };


        case actions.ORGRELATIONTYPEMASTER_GET_BY_ID_SUCCESS:
            return {
                orgRelationTypes: state.orgRelationTypes,
                orgRelationType: action.data,
                orgRelationTypeActiontype: action.type,
                orgRelationTypeRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.ORGRELATIONTYPEMASTER_SAVE_SUCCESS:
            return {
                orgRelationType: action.data,
                orgRelationTypes: state.orgRelationTypes,
                orgRelationType: action.type,
                orgRelationTypeRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.ORGRELATIONTYPEMASTER_DELETE_SUCCESS:
            return {
                orgRelationType: state.data,
                orgRelationTypes: state.orgRelationTypes,
                orgRelationTypeActiontype: action.type,
                orgRelationTypeRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.ORGRELATIONTYPEMASTER_INIT:
            return {
                orgRelationType: state.orgRelationType,
                orgRelationTypes: state.orgRelationTypes,
                orgRelationTypeActiontype: action.type,
                orgRelationTypeRecordsCount: state.recordsCount,

                type: action.type,
            };


        //#endregion 

        //#region  Country Master Reducer
        case actions.COUNTRYMASTER_LIST_SUCCESS:
            return {
                country: state.country,
                countrys: action.data,
                country: action.type,
                countryRecordsCount: action.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  State Master Reducer
        case actions.STATEMASTER_LIST_SUCCESS:
            return {
                state: state.state,
                states: action.data,
                state: action.type,
                stateRecordsCount: action.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  City Master Reducer
        case actions.CITYMASTER_LIST_SUCCESS:
            return {
                city: state.city,
                citys: action.data,
                city: action.type,
                cityRecordsCount: action.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Gender Master Reducer
        case actions.GENDERMASTER_LIST_SUCCESS:
            return {
                gender: state.gender,
                genders: action.data,
                gender: action.type,
                genderRecordsCount: action.recordsCount,

                type: action.type,
            };

        //#endregion 


        //#region Module Master Reducer
        case actions.ORGANISATIONDETAILS_LIST_SUCCESS:
            return {
                organisation: state.organisation,
                organisations: action.data,
                organisationActiontype: action.type,
                organisationRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONDETAILS_GET_BY_ID_SUCCESS:
            return {
                organisations: state.organisations,
                organisation: action.data,
                organisationActiontype: action.type,
                organisationRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONDETAILS_GET_BY_GROUPID_SUCCESS:
            return {
                organisations: state.organisations,
                organisation: action.data,
                organisationActiontype: action.type,
                organisationRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONDETAILS_GET_BY_ORGRELATIONTYPEID_SUCCESS:
            return {
                organisations: state.organisations,
                organisation: action.data,
                organisationActiontype: action.type,
                organisationRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONDETAILS_SAVE_SUCCESS:
            return {
                organisation: action.data,
                organisations: state.organisations,
                organisationActiontype: action.type,
                organisationRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONDETAILS_DELETE_SUCCESS:
            return {
                organisation: state.data,
                organisations: state.organisations,
                organisationActiontype: action.type,
                organisationRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONDETAILS_INIT:
            return {
                organisation: state.organisation,
                organisations: state.organisations,
                organisationActiontype: action.type,
                organisationRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion


        //#region Module Master Reducer
        case actions.MODULEMASTER_LIST_SUCCESS:
            return {
                module: state.module,
                modules: action.data,
                moduleActiontype: action.type,
                moduleRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.MODULEMASTER_GET_BY_ID_SUCCESS:
            return {
                modules: state.modules,
                module: action.data,
                moduleActiontype: action.type,
                moduleRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.MODULEMASTER_GET_BY_GROUPID_SUCCESS:
            return {
                module: state.module,
                modules: action.data,
                moduleActiontype: action.type,
                moduleRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.MODULEMASTER_SAVE_SUCCESS:
            return {
                module: action.data,
                modules: state.modules,
                moduleActiontype: action.type,
                moduleRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.MODULEMASTER_DELETE_SUCCESS:
            return {
                module: state.data,
                modules: state.modules,
                moduleActiontype: action.type,
                moduleRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.MODULEMASTER_INIT:
            return {
                module: state.module,
                modules: state.modules,
                moduleActiontype: action.type,
                moduleRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Role Master Reducer
        case actions.ROLEMASTER_LIST_SUCCESS:
            return {
                role: state.role,
                roles: action.data,
                roleActiontype: action.type,
                roleRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.ROLEMASTER_GET_BY_ID_SUCCESS:
            return {
                roles: state.roles,
                role: action.data,
                roleActiontype: action.type,
                roleRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.ROLEMASTER_GET_BY_MODULEID_SUCCESS:
            return {
                role: state.role,
                roles: action.data,
                roleActiontype: action.type,
                roleRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.ROLEMASTER_SAVE_SUCCESS:
            return {
                role: action.data,
                roles: state.roles,
                roleActiontype: action.type,
                roleRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.ROLEMASTER_DELETE_SUCCESS:
            return {
                role: state.data,
                roles: state.roles,
                roleActiontype: action.type,
                roleRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.ROLEMASTER_INIT:
            return {
                role: state.role,
                roles: state.roles,
                roleActiontype: action.type,
                roleRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Group Company Master Reducer
        case actions.COMPANYMASTER_LIST_SUCCESS:
            return {
                company: state.company,
                companys: action.data,
                companyActiontype: action.type,
                companyRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.COMPANYMASTER_GET_BY_ID_SUCCESS:
            return {
                companys: state.companys,
                company: action.data,
                companyActiontype: action.type,
                companyRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.COMPANYMASTER_GET_BY_GROUPID_SUCCESS:
            return {
                company: state.company,
                companys: action.data,
                companyActiontype: action.type,
                companyRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.COMPANYMASTER_SAVE_SUCCESS:
            return {
                company: action.data,
                companys: state.companys,
                companyActiontype: action.type,
                companyRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.COMPANYMASTER_DELETE_SUCCESS:
            return {
                company: state.data,
                companys: state.companys,
                companyActiontype: action.type,
                companyRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.COMPANYMASTER_INIT:
            return {
                company: state.company,
                companys: state.companys,
                companyActiontype: action.type,
                companyRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region   Company Plant  Master Reducer
        case actions.PLANTMASTER_LIST_SUCCESS:
            return {
                plant: state.plant,
                plants: action.data,
                plantActiontype: action.type,
                plantRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.PLANTMASTER_GET_BY_ID_SUCCESS:
            return {
                plants: state.plants,
                plant: action.data,
                plantActiontype: action.type,
                plantRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.PLANTMASTER_GET_BY_GROUPCOMPANYID_SUCCESS:
            return {
                plant: state.plant,
                plants: action.data,
                plantActiontype: action.type,
                plantRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.PLANTMASTER_SAVE_SUCCESS:
            return {
                plant: action.data,
                plants: state.plants,
                plantActiontype: action.type,
                plantRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.PLANTMASTER_DELETE_SUCCESS:
            return {
                plant: state.data,
                plants: state.plants,
                plantActiontype: action.type,
                plantRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.PLANTMASTER_INIT:
            return {
                plant: state.plant,
                plants: state.plants,
                plantActiontype: action.type,
                plantRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region  Year Master Reducer
        case actions.YEARMASTER_LIST_SUCCESS:
            return {
                year: state.year,
                years: action.data,
                yearActiontype: action.type,
                yearRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.YEARMASTER_GET_BY_ID_SUCCESS:
            return {
                years: state.years,
                year: action.data,
                yearActiontype: action.type,
                yearRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.YEARMASTER_SAVE_SUCCESS:
            return {
                year: action.data,
                years: state.years,
                yearActiontype: action.type,
                yearRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.YEARMASTER_DELETE_SUCCESS:
            return {
                year: state.data,
                years: state.years,
                yearActiontype: action.type,
                yearRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.YEARMASTER_INIT:
            return {
                year: state.year,
                years: state.years,
                yearActiontype: action.type,
                yearRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  User Reducer
        case actions.USER_LIST_SUCCESS:
            return {
                user: state.user,
                users: action.data,
                userActiontype: action.type,
                userRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.USER_GET_BY_ID_SUCCESS:
            return {
                users: state.users,
                user: action.data,
                userActiontype: action.type,
                userRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.USER_GET_BY_PLANTID_SUCCESS:
            return {
                user: state.user,
                users: action.data,
                userActiontype: action.type,
                userRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.USER_GET_BY_PLANTDEPARTMENTID_SUCCESS:
            return {
                user: state.user,
                users: action.data,
                userActiontype: action.type,
                userRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.USER_SAVE_SUCCESS:
            return {
                user: action.data,
                users: state.users,
                userActiontype: action.type,
                userRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.USER_DELETE_SUCCESS:
            return {
                user: state.data,
                users: state.users,
                userActiontype: action.type,
                userRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.USER_INIT:
            return {
                user: state.user,
                users: state.users,
                userActiontype: action.type,
                userRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Notificaation Master Reducer
        case actions.NOTIFICATIONMASTERDETAILS_LIST_SUCCESS:
            return {
                notification: state.notification,
                notifications: action.data,
                notificationActiontype: action.type,
                notificationRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.NOTIFICATIONMASTERDETAILS_GET_BY_ID_SUCCESS:
            return {
                notifications: state.notifications,
                notification: action.data,
                notificationActiontype: action.type,
                notificationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.NOTIFICATIONMASTERDETAILS_SAVE_SUCCESS:
            return {
                notification: action.data,
                notifications: state.notifications,
                notificationActiontype: action.type,
                notificationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.NOTIFICATIONMASTERDETAILS_DELETE_SUCCESS:
            return {
                notification: state.data,
                notifications: state.notifications,
                notificationActiontype: action.type,
                notificationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.NOTIFICATIONMASTERDETAILS_INIT:
            return {
                notification: state.notification,
                notifications: state.notifications,
                notificationActiontype: action.type,
                notificationRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Escalation Matrix Master Reducer
        case actions.ESCALATIONMATRIXDETAILS_LIST_SUCCESS:
            return {
                escalationmatrix: state.escalationmatrix,
                escalationmatrixs: action.data,
                escalationmatrixActiontype: action.type,
                escalationmatrixRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.ESCALATIONMATRIXDETAILS_GET_BY_ID_SUCCESS:
            return {
                escalationmatrixs: state.escalationmatrixs,
                escalationmatrix: action.data,
                escalationmatrixActiontype: action.type,
                escalationmatrixRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.ESCALATIONMATRIXDETAILS_SAVE_SUCCESS:
            return {
                escalationmatrix: action.data,
                escalationmatrixs: state.escalationmatrixs,
                escalationmatrixActiontype: action.type,
                escalationmatrixRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.ESCALATIONMATRIXDETAILS_DELETE_SUCCESS:
            return {
                escalationmatrix: state.data,
                escalationmatrixs: state.escalationmatrixs,
                escalationmatrixActiontype: action.type,
                escalationmatrixRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.ESCALATIONMATRIXDETAILS_INIT:
            return {
                escalationmatrix: state.escalationmatrix,
                escalationmatrixs: state.escalationmatrixs,
                escalationmatrixActiontype: action.type,
                escalationmatrixRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Escalation Duration Master Reducer
        case actions.ESCALATIONDURATIONDETAILS_LIST_SUCCESS:
            return {
                escalationDuration: state.escalationDuration,
                escalationDurations: action.data,
                escalationDurationActiontype: action.type,
                escalationDurationRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.ESCALATIONDURATIONDETAILS_GET_BY_ID_SUCCESS:
            return {
                escalationDurations: state.escalationDurations,
                escalationDuration: action.data,
                escalationDurationActiontype: action.type,
                escalationDurationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.ESCALATIONDURATIONDETAILS_SAVE_SUCCESS:
            return {
                escalationDuration: action.data,
                escalationDurations: state.escalationDurations,
                escalationDurationActiontype: action.type,
                escalationDurationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.ESCALATIONDURATIONDETAILS_DELETE_SUCCESS:
            return {
                escalationDuration: state.data,
                escalationDurations: state.escalationDurations,
                escalationDurationActiontype: action.type,
                escalationDurationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.ESCALATIONDURATIONDETAILS_INIT:
            return {
                escalationDuration: state.escalationDuration,
                escalationDurations: state.escalationDurations,
                escalationDurationActiontype: action.type,
                escalationDurationRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Supporting Document Master Reducer
        case actions.SUPPORTINGDOCUMENTMASTER_LIST_SUCCESS:
            return {
                supportingDocumentMaster: state.supportingDocumentMaster,
                supportingDocumentMasters: action.data,
                supportingDocumentMasterActiontype: action.type,
                supportingDocumentMasterRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.SUPPORTINGDOCUMENTMASTER_GET_BY_ID_SUCCESS:
            return {
                supportingDocumentMasters: state.supportingDocumentMasters,
                supportingDocumentMaster: action.data,
                supportingDocumentMasterActiontype: action.type,
                supportingDocumentMasterRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SUPPORTINGDOCUMENTMASTER_SAVE_SUCCESS:
            return {
                supportingDocumentMaster: action.data,
                supportingDocumentMasters: state.supportingDocumentMasters,
                supportingDocumentMasterActiontype: action.type,
                supportingDocumentMasterRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SUPPORTINGDOCUMENTMASTER_DELETE_SUCCESS:
            return {
                supportingDocumentMaster: state.data,
                supportingDocumentMasters: state.supportingDocumentMasters,
                supportingDocumentMasterActiontype: action.type,
                supportingDocumentMasterRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SUPPORTINGDOCUMENTMASTER_INIT:
            return {
                supportingDocumentMaster: state.supportingDocumentMaster,
                supportingDocumentMasters: state.supportingDocumentMasters,
                supportingDocumentMasterActiontype: action.type,
                supportingDocumentMasterRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Due Days Master Reducer
        case actions.DUEDAYSMASTER_LIST_SUCCESS:
            return {
                dueDay: state.dueDay,
                dueDays: action.data,
                dueDayActiontype: action.type,
                dueDayRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.DUEDAYSMASTER_GET_BY_ID_SUCCESS:
            return {
                dueDays: state.dueDays,
                dueDay: action.data,
                dueDayActiontype: action.type,
                dueDayRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.DUEDAYSMASTER_SAVE_SUCCESS:
            return {
                dueDay: action.data,
                dueDays: state.dueDays,
                dueDayActiontype: action.type,
                dueDayRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.DUEDAYSMASTER_DELETE_SUCCESS:
            return {
                dueDay: state.data,
                dueDays: state.dueDays,
                dueDayActiontype: action.type,
                dueDayRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.DUEDAYSMASTER_INIT:
            return {
                dueDay: state.dueDay,
                dueDays: state.dueDays,
                dueDayActiontype: action.type,
                dueDayRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Status Master Reducer
        case actions.STATUSMASTER_LIST_SUCCESS:
            return {
                status: state.status,
                statuss: action.data,
                statusActiontype: action.type,
                statusRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.STATUSMASTER_GET_BY_ID_SUCCESS:
            return {
                statuss: state.statuss,
                status: action.data,
                statusActiontype: action.type,
                statusRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.STATUSMASTER_SAVE_SUCCESS:
            return {
                status: action.data,
                statuss: state.statuss,
                statusActiontype: action.type,
                statusRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.STATUSMASTER_DELETE_SUCCESS:
            return {
                status: state.data,
                statuss: state.statuss,
                statusActiontype: action.type,
                statusRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.STATUSMASTER_INIT:
            return {
                status: state.status,
                statuss: state.statuss,
                statusActiontype: action.type,
                statusRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Year Type Master Reducer
        case actions.YEARTYPEMASTER_LIST_SUCCESS:
            return {
                yearType: state.yearTypes,
                yearTypes: action.data,
                yearTypeActiontype: action.type,
                yearTypeRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.YEARTYPEMASTER_GET_BY_ID_SUCCESS:
            return {
                yearTypes: state.yearTypes,
                yearType: action.data,
                yearTypeActiontype: action.type,
                yearTypeRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.YEARTYPEMASTER_SAVE_SUCCESS:
            return {
                yearType: action.data,
                yearTypes: state.yearTypes,
                yearTypeActiontype: action.type,
                yearTypeRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.YEARTYPEMASTER_DELETE_SUCCESS:
            return {
                yearType: action.data,
                yearTypes: state.yearTypes,
                yearTypeActiontype: action.type,
                yearTypeRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.YEARTYPEMASTER_INIT:
            return {
                yearType: action.data,
                yearTypes: state.yearTypes,
                yearTypeActiontype: action.type,
                yearTypeRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 


        //#region Section Master Reducer
        case actions.SECTIONMASTER_LIST_SUCCESS:
            return {
                section: state.section,
                sections: action.data,
                sectionActiontype: action.type,
                sectionRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.SECTIONMASTER_GET_BY_ID_SUCCESS:
            return {
                sections: state.sections,
                section: action.data,
                sectionActiontype: action.type,
                sectionRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.SECTIONMASTER_SAVE_SUCCESS:
            return {
                section: action.data,
                sections: state.sections,
                sectionActiontype: action.type,
                sectionRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SECTIONMASTER_DELETE_SUCCESS:
            return {
                section: state.data,
                sections: state.sections,
                sectionActiontype: action.type,
                sectionRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SECTIONMASTER_INIT:
            return {
                section: state.section,
                sections: state.sections,
                sectionActiontype: action.type,
                sectionRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Sub Section Master Reducer
        case actions.SUBSECTIONMASTER_LIST_SUCCESS:
            return {
                subSection: state.subSection,
                subSections: action.data,
                subSectionActiontype: action.type,
                subSectionRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.SUBSECTIONMASTER_GET_BY_ID_SUCCESS:
            return {
                subSections: state.subSections,
                subSection: action.data,
                subSectionActiontype: action.type,
                subSectionRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.SUBSECTIONMASTER_SAVE_SUCCESS:
            return {
                subSection: action.data,
                subSections: state.subSections,
                subSectionActiontype: action.type,
                subSectionRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SUBSECTIONMASTER_DELETE_SUCCESS:
            return {
                subSection: state.data,
                subSections: state.sections,
                subSectionActiontype: action.type,
                subSectionRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SUBSECTIONMASTER_INIT:
            return {
                subSection: state.subSection,
                subSections: state.subSections,
                subSectionActiontype: action.type,
                subSectionRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Scoring Master Reducer
        case actions.SCORINGRULEMASTER_LIST_SUCCESS:
            return {
                scoringRule: state.scoringRule,
                scoringRules: action.data,
                scoringRuleActiontype: action.type,
                scoringRuleRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.SCORINGRULEMASTER_GET_BY_ID_SUCCESS:
            return {
                scoringRules: state.scoringRules,
                scoringRule: action.data,
                scoringRuleActiontype: action.type,
                scoringRuleRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.SCORINGRULEMASTER_SAVE_SUCCESS:
            return {
                scoringRule: action.data,
                scoringRules: state.scoringRules,
                scoringRuleActiontype: action.type,
                scoringRuleRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SCORINGRULEMASTER_DELETE_SUCCESS:
            return {
                scoringRule: state.data,
                scoringRules: state.scoringRules,
                scoringRuleActiontype: action.type,
                scoringRuleRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SCORINGRULEMASTER_INIT:
            return {
                scoringRule: state.scoringRule,
                scoringRules: state.scoringRules,
                scoringRuleActiontype: action.type,
                scoringRuleRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion



        //#region Audit Type Master Reducer
        case actions.AUDITTYPEMASTER_LIST_SUCCESS:
            return {
                auditType: state.auditType,
                auditTypes: action.data,
                auditTypeActiontype: action.type,
                auditTypeRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.AUDITTYPEMASTER_INIT:
            return {
                auditType: state.auditType,
                auditTypes: state.auditTypes,
                auditTypeActiontype: action.type,
                auditTypeRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Audit Flow Master Reducer
        case actions.AUDITFLOWMASTER_LIST_SUCCESS:
            return {
                auditFlow: state.auditFlow,
                auditFlows: action.data,
                auditFlowActiontype: action.type,
                auditFlowRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.AUDITFLOWMASTER_INIT:
            return {
                auditFlow: state.auditFlow,
                auditFlows: state.auditFlows,
                auditFlowActiontype: action.type,
                auditFlowRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion

        //#region Process Flow Master Reducer
        case actions.PROCESSFLOWMASTER_LIST_SUCCESS:
            return {
                processFlow: state.processFlow,
                processFlows: action.data,
                processFlowActiontype: action.type,
                processFlowRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.PROCESSFLOWMASTER_GET_BY_ID_SUCCESS:
            return {
                processFlows: state.processFlows,
                processFlow: action.data,
                processFlowActiontype: action.type,
                processFlowRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.PROCESSFLOWMASTER_SAVE_SUCCESS:
            return {
                processFlow: action.data,
                processFlows: state.processFlows,
                processFlowActiontype: action.type,
                processFlowRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.PROCESSFLOWMASTER_DELETE_SUCCESS:
            return {
                processFlow: state.data,
                processFlows: state.processFlows,
                processFlowActiontype: action.type,
                processFlowRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.PROCESSFLOWMASTER_INIT:
            return {
                processFlow: state.processFlow,
                processFlows: state.processFlows,
                processFlowActiontype: action.type,
                processFlowRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion


        //#region  criticality Master Reducer
        case actions.CRITICALITYMASTER_LIST_SUCCESS:
            return {
                criticality: state.criticality,
                criticalitys: action.data,
                criticalityActiontype: action.type,
                criticalityRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.CRITICALITYMASTER_INIT:
            return {
                criticality: state.criticality,
                criticalitys: state.criticalitys,
                criticalityActiontype: action.type,
                criticalityRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.CRITICALITYMASTER_GET_BY_ID_SUCCESS:
            return {
                criticalitys: state.criticalitys,
                criticality: action.data,
                criticalityActiontype: action.type,
                criticalityRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.CRITICALITYMASTER_SAVE_SUCCESS:
            return {
                criticality: action.data,
                criticalitys: state.criticalitys,
                criticalityActiontype: action.type,
                criticalityRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.CRITICALITYMASTER_DELETE_SUCCESS:
            return {
                criticality: state.data,
                criticalitys: state.auditObservations,
                criticalityActiontype: action.type,
                criticalityRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion

        //#region  Audit Observation Master Reducer
        case actions.AUDITOBSERVATIONMASTER_LIST_SUCCESS:
            return {
                auditObservation: state.auditObservation,
                auditObservations: action.data,
                auditObservationActiontype: action.type,
                auditObservationRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.AUDITOBSERVATIONMASTER_GET_BY_ID_SUCCESS:
            return {
                auditObservations: state.auditObservations,
                auditObservation: action.data,
                auditObservationActiontype: action.type,
                auditObservationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.AUDITOBSERVATIONMASTER_SAVE_SUCCESS:
            return {
                auditObservation: action.data,
                auditObservations: state.auditObservations,
                auditObservationActiontype: action.type,
                auditObservationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.AUDITOBSERVATIONMASTER_DELETE_SUCCESS:
            return {
                auditObservation: state.data,
                auditObservations: state.auditObservations,
                auditObservationActiontype: action.type,
                auditObservationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.AUDITOBSERVATIONMASTER_INIT:
            return {
                auditObservation: state.auditObservation,
                auditObservations: state.auditObservations,
                auditObservationActiontype: action.type,
                auditObservationRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region  Audit  Type Auditor Relation Master Reducer
        case actions.AUDITTYPEAUDITORRELATIONMASTER_LIST_SUCCESS:
            return {
                auditTypeAuditorRelation: state.auditTypeAuditorRelation,
                auditTypeAuditorRelations: action.data,
                auditTypeAuditorRelationActiontype: action.type,
                auditTypeAuditorRelationRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.AUDITTYPEAUDITORRELATIONMASTER_GET_BY_ID_SUCCESS:
            return {
                auditObservations: state.auditObservations,
                auditObservation: action.data,
                auditTypeAuditorRelationActiontype: action.type,
                auditTypeAuditorRelationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.AUDITTYPEAUDITORRELATIONMASTER_SAVE_SUCCESS:
            return {
                auditTypeAuditorRelation: action.data,
                auditTypeAuditorRelations: state.auditTypeAuditorRelations,
                auditTypeAuditorRelationActiontype: action.type,
                auditTypeAuditorRelationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.AUDITTYPEAUDITORRELATIONMASTER_DELETE_SUCCESS:
            return {
                auditTypeAuditorRelation: state.data,
                auditTypeAuditorRelations: state.auditTypeAuditorRelations,
                auditTypeAuditorRelationActiontype: action.type,
                auditTypeAuditorRelationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.AUDITTYPEAUDITORRELATIONMASTER_INIT:
            return {
                auditTypeAuditorRelation: state.auditTypeAuditorRelation,
                auditTypeAuditorRelations: state.auditTypeAuditorRelations,
                auditTypeAuditorRelationActiontype: action.type,
                auditTypeAuditorRelationRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 


        //#region  Scope Master Reducer
        case actions.SCOPEMASTER_LIST_SUCCESS:
            return {
                scope: state.scope,
                scopes: action.data,
                scopeActiontype: action.type,
                scopeRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.SCOPEMASTER_GET_BY_ID_SUCCESS:
            return {
                scopes: state.scopes,
                scope: action.data,
                scopeActiontype: action.type,
                scopeRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SCOPEMASTER_SAVE_SUCCESS:
            return {
                scope: action.data,
                scopes: state.scopes,
                scopeActiontype: action.type,
                scopeRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SCOPEMASTER_DELETE_SUCCESS:
            return {
                scope: state.data,
                scopes: state.scopes,
                scopeActiontype: action.type,
                scopeRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.SCOPEMASTER_INIT:
            return {
                scope: state.scope,
                scopes: state.scopes,
                scopeActiontype: action.type,
                scopeRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 

        //#region Process Flow Master Reducer
        case actions.PROCESSFLOWRESPONSIBILITYMASTER_LIST_SUCCESS:
            return {
                processFlowResponsibility: state.processFlow,
                processFlowResponsibilitys: action.data,
                processFlowResponsibilityActiontype: action.type,
                processFlowResponsibilityRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.PROCESSFLOWRESPONSIBILITYMASTER_GET_BY_ID_SUCCESS:
            return {
                processFlowResponsibilitys: state.processFlowResponsibilitys,
                processFlowResponsibility: action.data,
                processFlowResponsibilityActiontype: action.type,
                processFlowResponsibilityRecordsCount: state.recordsCount,

                type: action.type,
            };


        case actions.PROCESSFLOWRESPONSIBILITYMASTER_SAVE_SUCCESS:
            return {
                processFlowResponsibility: action.data,
                processFlowResponsibilitys: state.processFlowResponsibilitys,
                processFlowResponsibilityActiontype: action.type,
                processFlowResponsibilityRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.PROCESSFLOWRESPONSIBILITYMASTER_DELETE_SUCCESS:
            return {
                processFlowResponsibility: state.data,
                processFlowResponsibilitys: state.processFlowResponsibilitys,
                processFlowResponsibilityActiontype: action.type,
                processFlowResponsibilityRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.PROCESSFLOWRESPONSIBILITYMASTER_INIT:
            return {
                processFlowResponsibility: state.processFlowResponsibility,
                processFlowResponsibilitys: state.processFlowResponsibilitys,
                processFlowResponsibilityActiontype: action.type,
                processFlowResponsibilityRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion



        // important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
        default:
            return {
                type: state.type,
                recordsCount: state.recordsCount,

                group: state.group,
                groups: state.groups,
                groupActiontype: state.groupActiontype,
                groupRecordsCount: state.groupRecordsCount,

                orgRelationType: state.orgRelationType,
                orgRelationTypes: state.orgRelationTypes,
                orgRelationType: state.orgRelationTypeActiontype,
                orgRelationTypeRecordsCount: state.orgRelationTypeRecordsCount,

                country: state.country,
                countrys: state.countrys,
                countryActiontype: state.countryActiontype,
                countryRecordsCount: state.countryRecordsCount,

                state: state.state,
                states: state.states,
                stateryActiontype: state.stateActiontype,
                stateRecordsCount: state.stateRecordsCount,

                city: state.city,
                citys: state.citys,
                cityActiontype: state.cityActiontype,
                cityRecordsCount: state.cityRecordsCount,

                gender: state.gender,
                genders: state.genders,
                genderActiontype: state.genderActiontype,
                genderRecordsCount: state.genderRecordsCount,
                alarm: state.alarm,
                alarms: state.alarms,
                alarmActiontype: state.alarmActiontype,
                alarmRecordsCount: state.alarmRecordsCount,

                module: state.module,
                modules: state.modules,
                moduleActiontype: state.moduleActiontype,
                moduleRecordsCount: state.moduleRecordsCount,

                role: state.role,
                roles: state.roles,
                roleActiontype: state.roleActiontype,
                roleRecordsCount: state.roleRecordsCount,

                groupCompany: state.groupCompany,
                groupCompanys: state.groupCompanys,
                groupCompanyActiontype: state.groupCompanyActiontype,
                groupCompanyRecordsCount: state.groupCompanyRecordsCount,

                plant: state.plant,
                plants: state.plants,
                plantActiontype: state.plantActiontype,
                plantRecordsCount: state.plantRecordsCount,

                year: state.year,
                years: state.years,
                yearActiontype: state.yearActiontype,
                yearRecordsCount: state.yearRecordsCount,

                user: state.user,
                users: state.users,
                userActiontype: state.userActiontype,
                userRecordsCount: state.userRecordsCount,

                notification: state.notification,
                notifications: state.notifications,
                notificationActiontype: state.notificationActiontype,
                notificationRecordsCount: state.notificationRecordsCount,

                escalationmatrix: state.escalationmatrix,
                escalationmatrixs: state.escalationmatrixs,
                escalationmatrixActiontype: action.escalationmatrixActiontype,
                escalationmatrixRecordsCount: state.escalationmatrixRecordsCount,

                escalationDuration: state.escalationDuration,
                escalationDurations: state.escalationDurations,
                escalationDurationActiontype: state.escalationDurationActiontype,
                escalationDurationRecordsCount: state.escalationDurationRecordsCount,

                supportingDocumentMaster: state.supportingDocumentMaster,
                supportingDocumentMasters: state.supportingDocumentMasters,
                supportingDocumentMasterActiontype: state.supportingDocumentMasterActiontype,
                supportingDocumentMasterRecordsCount: state.supportingDocumentMasterRecordsCount,

                dueDay: state.dueDay,
                dueDays: state.dueDays,
                dueDayActiontype: state.dueDayActiontype,
                dueDaysRecordsCount: state.dueDaysRecordsCount,

                status: state.status,
                statuss: state.statuss,
                statusActiontype: state.statusActiontype,
                statussRecordsCount: state.statussRecordsCount,

                section: state.section,
                sections: state.sections,
                sectionActiontype: state.sectionActiontype,
                sectionRecordsCount: state.sectionRecordsCount,

                scoringRule: state.scoringRule,
                scoringRules: state.scoringRules,
                scoringRuleActiontype: state.scoringRuleActiontype,
                scoringRuleRecordsCount: state.scoringRuleRecordsCount,

                subSection: state.subSection,
                subSections: state.subSections,
                subSectionActiontype: state.subSectionActiontype,
                subSectionRecordsCount: state.subSectionRecordsCount,

                auditType: state.auditType,
                auditTypes: state.auditTypes,
                auditTypeActiontype: state.auditTypeActiontype,
                auditTypeRecordsCount: state.auditTypeRecordsCount,

                auditObservation: state.auditObservation,
                auditObservations: state.auditObservations,
                auditObservationActiontype: state.auditObservationActiontype,
                auditObservationRecordsCount: state.auditObservationRecordsCount,

                criticality: state.criticality,
                criticalitys: state.criticalitys,
                criticalityActiontype: state.criticalityActiontype,
                criticalityRecordsCount: state.criticalityRecordsCount,

                auditTypeAuditorRelation: state.auditTypeAuditorRelation,
                auditTypeAuditorRelations: state.auditTypeAuditorRelations,
                auditTypeAuditorRelationActiontype: state.auditTypeAuditorRelationActiontype,
                auditTypeAuditorRelationRecordsCount: state.auditTypeAuditorRelationRecordsCount,

                scope: state.scope,
                scopes: state.scopes,
                scopeActiontype: state.scopeActiontype,
                scopeRecordsCount: state.scopeRecordsCount,

                processFlowResponsibility: state.processFlowResponsibility,
                processFlowResponsibilitys: state.processFlowResponsibilitys,
                processFlowResponsibilityActiontype: state.processFlowResponsibilityActiontype,
                processFlowResponsibilityRecordsCount: state.processFlowResponsibilityRecordsCount,
            };
    }
};

export default adminReducer;