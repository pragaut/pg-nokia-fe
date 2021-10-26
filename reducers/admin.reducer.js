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

    orgEmployeeActiontype: actions.ORGANISATIONDETAILS_INIT,
    orgEmployee: undefined,
    orgEmployees: undefined,
    orgEmployeeRecordsCount: 0,

    moduleActiontype: actions.MODULEMASTER_INIT,
    module: undefined,
    modules: undefined,
    moduleRecordsCount: 0,

    roleActiontype: actions.ROLEMASTER_INIT,
    role: undefined,
    roles: undefined,
    roleRecordsCount: 0,
 

    yearActiontype: actions.YEARMASTER_INIT,
    year: undefined,
    years: undefined,
    yearRecordsCount: 0,

    userActiontype: actions.USER_INIT,
    user: undefined,
    users: undefined,
    userRecordsCount: 0,

    notificationActiontype: actions.NOTIFICATIONMASTER_INIT,
    notification: undefined,
    notifications: undefined,
    notificationRecordsCount: 0,

    towerActiontype: actions.TOWERMASTER_INIT,
    tower: undefined,
    towers: undefined,
    towerRecordsCount: 0,

    towerAllotmentActiontype: actions.TOWERALLOTMENTMASTER_INIT,
    towerAllotment: undefined,
    towerAllotments: undefined,
    towerAllotmentRecordsCount: 0,

    towerAntennasActiontype: actions.TOWERANTENNASMASTER_INIT,
    towerAntennas: undefined,
    towerAntennass: undefined,
    towerAntennasRecordsCount: 0,

    deviceRegistrationActiontype: actions.DEVICEREGISTRATIONMASTER_INIT,
    deviceRegistration: undefined,
    deviceRegistrations: undefined,
    deviceRegistrationRecordsCount: 0,

    organisationGroupModuleActiontype: actions.ORGANISATIONGROUPMODULEMASTER_INIT,
    organisationGroupModule: undefined,
    organisationGroupModules: undefined,
    organisationGroupModuleRecordsCount: 0,
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
                alarms: state.alarms,
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

        //#region  Module Master Reducer
        case actions.MODULEMASTER_LIST_SUCCESS:
            return {
                module: state.module,
                modules: action.data,
                moduleActiontype: action.type,
                moduleRecordsCount: action.recordsCount,

            };

        case actions.MODULEMASTER_GET_BY_ID_SUCCESS:
            return {
                modules: state.modules,
                module: action.data,
                moduleActiontype: action.type,
                moduleRecordsCount: state.recordsCount,
            };

        case actions.MODULEMASTER_SAVE_SUCCESS:
            return {
                module: action.data,
                modules: state.modules,
                moduleActiontype: action.type,
                moduleRecordsCount: state.recordsCount,
            };

        case actions.MODULEMASTER_DELETE_SUCCESS:
            return {
                module: state.data,
                modules: state.modules,
                moduleActiontype: action.type,
                moduleRecordsCount: state.recordsCount,
            };

        case actions.MODULEMASTER_INIT:
            return {
                module: state.module,
                modules: state.modules,
                moduleActiontype: action.type,
                moduleRecordsCount: state.recordsCount,
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

        //#region  Organisation Master Reducer
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

        //#region  Organisation Employee Master Reducer
        case actions.ORGANISATIONEMPLOYEEDETAILS_LIST_SUCCESS:
            return {
                orgEmployee: state.orgEmployee,
                orgEmployees: action.data,
                orgEmployeeActiontype: action.type,
                orgEmployeeRecordsCount: action.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONEMPLOYEEDETAILS_GET_BY_ID_SUCCESS:
            return {
                orgEmployees: state.orgEmployees,
                orgEmployee: action.data,
                orgEmployeeActiontype: action.type,
                orgEmployeeRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONEMPLOYEEDETAILS_GET_BY_ORGDETAILSID_SUCCESS:
            return {
                orgEmployees: state.orgEmployees,
                orgEmployee: action.data,
                orgEmployeeActiontype: action.type,
                orgEmployeeRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONEMPLOYEEDETAILS_SAVE_SUCCESS:
            return {
                orgEmployee: action.data,
                orgEmployees: state.orgEmployees,
                orgEmployeeActiontype: action.type,
                orgEmployeeRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONEMPLOYEEDETAILS_DELETE_SUCCESS:
            return {
                orgEmployee: state.data,
                orgEmployees: state.orgEmployees,
                orgEmployeeActiontype: action.type,
                orgEmployeeRecordsCount: state.recordsCount,

                type: action.type,
            };
        case actions.ORGANISATIONEMPLOYEEDETAILS_INIT:
            return {
                orgEmployee: state.orgEmployee,
                orgEmployees: state.orgEmployees,
                orgEmployeeActiontype: action.type,
                orgEmployeeRecordsCount: state.recordsCount,

                type: action.type,
            };
        //#endregion
        
        //#region  Module Master Reducer
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

        // case actions.MODULEMASTER_GET_BY_GROUPID_SUCCESS:
        //     return {
        //         module: state.module,
        //         modules: action.data,
        //         moduleActiontype: action.type,
        //         moduleRecordsCount: action.recordsCount,

        //         type: action.type,
        //     };

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

        //#region  Role Master Reducer
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

        //#region  Year Master Reducer
        case actions.YEARMASTER_LIST_SUCCESS:
            return {
                year: state.year,
                years: action.data,
                yearActiontype: action.type,
                yearRecordsCount: action.recordsCount,

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

        //#region  Notification Master Reducer
        case actions.NOTIFICATIONMASTER_LIST_SUCCESS:
            return {
                notification: state.notification,
                notifications: action.data,
                notificationActiontype: action.type,
                notificationRecordsCount: action.recordsCount,

                type: action.type,
            };

        case actions.NOTIFICATIONMASTER_GET_BY_ID_SUCCESS:
            return {
                notifications: state.notifications,
                notification: action.data,
                notificationActiontype: action.type,
                notificationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.NOTIFICATIONMASTER_SAVE_SUCCESS:
            return {
                notification: action.data,
                notifications: state.notifications,
                notificationActiontype: action.type,
                notificationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.NOTIFICATIONMASTER_DELETE_SUCCESS:
            return {
                notification: state.data,
                notifications: state.notifications,
                notificationActiontype: action.type,
                notificationRecordsCount: state.recordsCount,

                type: action.type,
            };

        case actions.NOTIFICATIONMASTER_INIT:
            return {
                notification: state.notification,
                notifications: state.notifications,
                notificationActiontype: action.type,
                notificationRecordsCount: state.recordsCount,

                type: action.type,
            };

        //#endregion 
  
        //#region  Tower Master Reducer

        case actions.TOWERMASTER_LIST_SUCCESS:
            return {
                tower: state.tower,
                towers: action.data,
                towerActiontype: action.type,
                towerRecordsCount: action.recordsCount,

            };

        case actions.TOWERMASTER_GET_BY_ID_SUCCESS:
            return {
                towers: state.towers,
                tower: action.data,
                towerActiontype: action.type,
                towerRecordsCount: state.recordsCount,
            };

        case actions.TOWERMASTER_SAVE_SUCCESS:
            return {
                tower: action.data,
                towers: state.towers,
                towerActiontype: action.type,
                towerRecordsCount: state.recordsCount,
            };

        case actions.TOWERMASTER_DELETE_SUCCESS:
            return {
                tower: state.data,
                towers: state.towers,
                towerActiontype: action.type,
                towerRecordsCount: state.recordsCount,
            };

        case actions.TOWERMASTER_INIT:
            return {
                tower: state.tower,
                towers: state.towers,
                towerActiontype: action.type,
                towerRecordsCount: state.recordsCount,
            };

        //#endregion

        //#region  Tower Allotment Master Reducer

        case actions.TOWERALLOTMENTMASTER_LIST_SUCCESS:
            return {
                towerAllotment: state.towerAllotment,
                towerAllotments: action.data,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: action.recordsCount,

            };

        case actions.TOWERALLOTMENTMASTER_GET_BY_ID_SUCCESS:
            return {
                towerAllotments: state.towerAllotments,
                towerAllotment: action.data,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: state.recordsCount,
            };

        case actions.TOWERALLOTMENTMASTER_SAVE_SUCCESS:
            return {
                towerAllotment: action.data,
                towerAllotments: state.towerAllotments,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: state.recordsCount,
            };

        case actions.TOWERALLOTMENTMASTER_DELETE_SUCCESS:
            return {
                towerAllotment: state.data,
                towerAllotments: state.towerAllotments,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: state.recordsCount,
            };

        case actions.TOWERALLOTMENTMASTER_INIT:
            return {
                towerAllotment: state.towerAllotment,
                towerAllotments: state.towerAllotments,
                towerAllotmentActiontype: action.type,
                towerAllotmentRecordsCount: state.recordsCount,
            };

        //#endregion

        //#region  Tower Antennas Master Reducer

        case actions.TOWERANTENNASMASTER_LIST_SUCCESS:
            return {
                towerAntennas: state.towerAntennas,
                towerAntennass: action.data,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: action.recordsCount,

            };

        case actions.TOWERANTENNASMASTER_GET_BY_ID_SUCCESS:
            return {
                towerAntennass: state.towerAntennass,
                towerAntennas: action.data,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: state.recordsCount,
            };

        case actions.TOWERANTENNASMASTER_SAVE_SUCCESS:
            return {
                towerAntennas: action.data,
                towerAntennass: state.towerAntennass,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: state.recordsCount,
            };

        case actions.TOWERANTENNASMASTER_DELETE_SUCCESS:
            return {
                towerAntennas: state.data,
                towerAntennass: state.towerAntennass,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: state.recordsCount,
            };

        case actions.TOWERANTENNASMASTER_INIT:
            return {
                towerAntennas: state.towerAntennas,
                towerAntennass: state.towerAntennass,
                towerAntennasActiontype: action.type,
                towerAntennasRecordsCount: state.recordsCount,
            };

        //#endregion

        //#region  Device Registration Master Reducer

        case actions.DEVICEREGISTRATIONMASTER_LIST_SUCCESS:
            return {
                deviceRegistration: state.deviceRegistration,
                deviceRegistrations: action.data,
                deviceRegistrationActiontype: action.type,
                deviceRegistrationRecordsCount: action.recordsCount,

            };

        case actions.DEVICEREGISTRATIONMASTER_GET_BY_ID_SUCCESS:
            return {
                deviceRegistrations: state.deviceRegistrations,
                deviceRegistration: action.data,
                deviceRegistrationActiontype: action.type,
                deviceRegistrationRecordsCount: state.recordsCount,
            };

        case actions.DEVICEREGISTRATIONMASTER_SAVE_SUCCESS:
            return {
                deviceRegistration: action.data,
                deviceRegistrations: state.deviceRegistrations,
                deviceRegistrationActiontype: action.type,
                deviceRegistrationRecordsCount: state.recordsCount,
            };

        case actions.DEVICEREGISTRATIONMASTER_DELETE_SUCCESS:
            return {
                deviceRegistration: state.data,
                deviceRegistrations: state.deviceRegistrations,
                deviceRegistrationActiontype: action.type,
                deviceRegistrationRecordsCount: state.recordsCount,
            };

        case actions.DEVICEREGISTRATIONMASTER_INIT:
            return {
                deviceRegistration: state.deviceRegistration,
                deviceRegistrations: state.deviceRegistrations,
                deviceRegistrationActiontype: action.type,
                deviceRegistrationRecordsCount: state.recordsCount,
            };

        //#endregion

        //#region Organisation Group Module Details

        case actions.ORGANISATIONGROUPMODULEMASTER_LIST_SUCCESS:
            return {
                organisationGroupModule: state.organisationGroupModule,
                organisationGroupModules: action.data,
                organisationGroupModuleActiontype: action.type,
                organisationGroupModuleRecordsCount: action.recordsCount,
            };

        case actions.ORGANISATIONGROUPMODULEMASTER_GET_BY_ID_SUCCESS:
            return {
                organisationGroupModules: state.organisationGroupModules,
                organisationGroupModule: action.data,
                organisationGroupModuleActiontype: action.type,
                organisationGroupModuleRecordsCount: state.recordsCount,
            };

        case actions.ORGANISATIONGROUPMODULEMASTER_SAVE_SUCCESS:
            return {
                organisationGroupModule: action.data,
                organisationGroupModules: state.organisationGroupModules,
                organisationGroupModuleActiontype: action.type,
                organisationGroupModuleRecordsCount: state.recordsCount,
            };

        case actions.ORGANISATIONGROUPMODULEMASTER_DELETE_SUCCESS:
            return {
                organisationGroupModule: state.data,
                organisationGroupModules: state.organisationGroupModules,
                organisationGroupModuleActiontype: action.type,
                organisationGroupModuleRecordsCount: state.recordsCount,
            };

        case actions.ORGANISATIONGROUPMODULEMASTER_INIT:
            return {
                organisationGroupModule: state.organisationGroupModule,
                organisationGroupModules: state.organisationGroupModules,
                organisationGroupModuleActiontype: action.type,
                organisationGroupModuleRecordsCount: state.recordsCount,
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

                tower: state.tower,
                towers: state.towers,
                towerActiontype: state.towerActiontype,
                towerRecordsCount: state.towerRecordsCount,

                towerAllotment: state.towerAllotment,
                towerAllotments: state.towerAllotments,
                towerAllotmentActiontype: state.towerAllotmentActiontype,
                towerAllotmentRecordsCount: state.towerAllotmentRecordsCount,

                towerAntennas: state.towerAntennas,
                towerAntennass: state.towerAntennass,
                towerAntennasActiontype: state.towerAntennasActiontype,
                towerAntennasRecordsCount: state.towerAntennasRecordsCount,

                deviceRegistration: state.deviceRegistration,
                deviceRegistrations: state.deviceRegistrations,
                deviceRegistrationActiontype: state.deviceRegistrationActiontype,
                deviceRegistrationRecordsCount: state.deviceRegistrationRecordsCount,

                organisationGroupModule: state.organisationGroupModule,
                organisationGroupModules: state.organisationGroupModules,
                organisationGroupModuleActiontype: state.organisationGroupModuleActiontype,
                organisationGroupModuleRecordsCount: state.organisationGroupModuleRecordsCount,
            };
    }
};

export default adminReducer;