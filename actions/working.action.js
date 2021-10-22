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

//#region  Final Audit Action Plan 
export const getAntennaRotataionDetails = (filters, userId, pageIndex, rowsToReturn) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null)
    try {
        let pageIndex = 0;

        //console.log("ActionPlan filters : ", filters);
        let id = filters && filters.id ? filters.id : '';
        let towerAntennaId = filters && filters.towerAntennaId ? filters.towerAntennaId : '';
        let towerId = filters && filters.towerId ? filters.towerId : '';
        let macOrAntennaCode = filters && filters.macOrAntennaCode ? filters.criticamacOrAntennaCodelityMasterId : '';

        let url = config.TMC_URL + `tmc/tmcworking/antennaRotationDetails?pageIndex=${pageIndex}`;

        if (id) {
            url = url + `&id=${id}`;
        }
        if (towerAntennaId) {
            url = url + `&towerAntennaId=${towerAntennaId}`;
        }
        if (towerId) {
            url = url + `&towerId=${towerId}`;
        }
        if (macOrAntennaCode) {
            url = url + `&macOrAntennaCode=${macOrAntennaCode}`;
        }

        //console.log("ActionPlan url : ", url);

        const data = await service.get(url, true);
        console.log("antenna Rotations Details:  ", data);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, workingTypes.ANTENNAROTATIONDETAILS_LIST_SUCCESS, data.data, null, data.message, data.recordsCount);
        }
        else {
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, util.generateError(data.errorMessage, data.code, 'Antenna Rotation Details error'), null, null);
        }

    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, error, null, null);
    }
};
//#endregion
