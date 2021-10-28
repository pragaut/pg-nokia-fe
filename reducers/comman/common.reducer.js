import * as commonActions from '../../action-types/comman/common.action.types';

/**
 * 
 */
const initialState = {
	type: commonActions.COMMON_INIT,
	message: '',
	notification: false,
	processFlowCode: '',
	processFlowMasterId: '',
	auditFlowMasterId: '',
	processFlowName: '',
	auditPlanDetailsId: '',
};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const commonReducer = (state, action) => {
	if (!state || typeof action.type === 'undefined') {
		return initialState;
	}

	if (action.data && typeof action.data === 'object') {
		action.data.key = new Date();
	}

	switch (action.type) {

		case commonActions.PROCESS_FLOW_SELECTED:
			//console.log("action : ", action);
			return {
				...state,
				processFlowCode: action.data.processFlowCode,
				processFlowMasterId: action.data.processFlowMasterId,
				auditFlowMasterId: action.data.auditFlowMasterId,
				processFlowName: action.data.processFlowName,
				auditPlanDetailsId: action.data.auditPlanDetailsId,
			};

		case commonActions.NOTIFICATION_HIDE:
			return {
				type: action.type,
				notification: false,
				message: ''
			};

		case commonActions.LOADING_SHOW:
			return {
				type: action.type,
				notification: false,
				message: '',
			};

		case commonActions.LOADING_HIDE:
			return {
				type: action.type,
				notification: false,
				message: '',
			};

		case commonActions.NOTIFICATION_SHOW:
			return {
				type: action.type,
				notification: true,
				message: action.message
			};
		case commonActions.HIDE_ALERT:
			return {
				type: action.type,
				notification: false,
				message: '',
			};

		case commonActions.SHOW_ALERT:

			return {
				type: action.type,
				notification: true,
				message: action.message
			};

		case commonActions.NOTIFICATION_DISPLAY:
			return {
				type: action.type,
				notification: true,
				message: action.message
			};

		case commonActions.STICKY_SHOW:
			return {
				type: action.type,
				notification: false,
				message: action.message
			};


		case commonActions.STICKY_HIDE:
			return {
				type: action.type,
				notification: false,
				message: ''
			};		// the action when we receive login error
		// important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
		default:
			return state;
	}
};

export default commonReducer;
