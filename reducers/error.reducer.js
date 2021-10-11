import * as errorActions from '../action-types/error.action.types';

/**
 * 
 */
const initialState = {
	type: errorActions.ERROR_INIT,
	message: '',
	error:'',
	notification: false
	
};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const errorReducer = (state, action) => {
	if (!state || typeof action.type === 'undefined') {
		return initialState;
	}

	if (action.data && typeof action.data === 'object') {
        action.data.key = new Date();
	}

    switch (action.type) {
		case errorActions.HIDE_ERROR:
			return {
                type: action.type,
				notification: false,
				message: '',
				error: undefined
			};
		
		
		case errorActions.SHOW_ERROR:
			console.warn('error : ', action.error);
			return {
                type: action.type,
				notification: false,
				message: '',
				error: action.error
			}; 
			
		case errorActions.DISPLAY_ERROR:
			console.warn('error PB : ', action.error);
			return {
				type: action.type,
				notification: false,
				message: '',
				error: action.error.message
			};
		// the action when we receive login error
		// important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
		default:
			return state;
	}
};

export default errorReducer;
