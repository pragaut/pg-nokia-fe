import * as accountActions from '../../action-types/comman/account.action.types';

/**
 * 
 */
const initialState = {
	type: accountActions.LOGIN_INIT,
	error: undefined,
	message: '',
	data: undefined,
	sticky: false,
	loginCount: 0,
};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const accountReducer = (state, action) => {

	if (!state || typeof action.type === 'undefined') {
		return initialState;
	}

	if (action.data && typeof action.data === 'object') {
        action.data.key = new Date();
    }

    switch (action.type) {
		// the action when we init the UI
		case accountActions.LOGIN_REQUEST:
			return {
				type: action.type,
			};
		
		// the action when we receive login error
		case accountActions.LOGIN_ERROR:
			return {
				type: action.type,
				error: action.error,
				message: action.message,
			};

		// the action when we start making the request
		case accountActions.LOGIN_REQUEST:
			return {
				type: action.type,
			};

		// the action when the login request is successful
		case accountActions.LOGIN_SUCCESS:
			return {
				type: action.type,
				message: action.message,	
				data: action.user,
			};
		
		// the action when the login request is successful
		case accountActions.LOGOUT_SUCCESS:
			return {
				type: action.type,
				message: action.message,
				data: action.user,	
			};

		// the action when the login request is successful
		case accountActions.LOGIN_NO_NOTIFICATION:
			return {
				type: action.type,
				message: '',
				data: state.data,
				error: null,
			};
		
		case accountActions.REGISTER_INIT:
			return {
				type: action.type,
			};

		case accountActions.REGISTER_REQUEST:
			return {
				type: action.type,
				data: action.data,
				message: action.message
			};

		case accountActions.REGISTER_SUCCESS:
			return {
				type: action.type,
				data: action.data,
				message: action.message
			};

		case accountActions.REGISTER_ERROR:
			return {
				type: action.type,
				error: action.error,
			};

		case accountActions.VERIFY_OTP_INIT:
			return {
				type: action.type,
			};

		case accountActions.VERIFY_EMAIL_OTP_REQUEST:
			return {
				type: action.type,
				data: action.data,
				message: action.message
			};

		case accountActions.VERIFY_EMAIL_OTP_SUCCESS:
			return {
				type: action.type,
				data: action.data,
				message: action.message
			};

		case accountActions.VERIFY_MOBILE_OTP_ERROR:
			return {
				type: action.type,
				error: action.error,
			};
			
		case accountActions.VERIFY_MOBILE_OTP_REQUEST:
			return {
				type: action.type,
				data: action.data,
				message: action.message
			};

		case accountActions.VERIFY_MOBILE_OTP_SUCCESS:
			return {
				type: action.type,
				data: action.data,
				message: action.message
			};

		case accountActions.VERIFY_MOBILE_OTP_ERROR:
			return {
				type: action.type,
				error: action.error,
			};

		case accountActions.RESET_PASSWORD_INIT:
			return {
				type: action.type,
			};

		case accountActions.RESET_PASSWORD_RAISE_ERROR:
			return {
				type: action.type,
				error: action.error,
			};
		
		case accountActions.RESET_PASSWORD_RAISE_REQUEST:
			return {
				type: action.type,
				data: action.data,
				message: action.message,
			};

		case accountActions.RESET_PASSWORD_RAISE_SUCCESS:
			return {
				type: action.type,
				data: action.data,
				message: action.message,
			};

		case accountActions.RESET_PASSWORD_REQUEST:
			return {
				type: action.type,
				data: action.data,
				message: action.message,
			};

		case accountActions.RESET_PASSWORD_SUCCESS:
			return {
				type: action.type,
				data: action.data,
				message: action.message,
			};


		case accountActions.RESET_PASSWORD_ERROR:
			return {
				type: action.type,
				error: action.error,
			};

		case accountActions.VERIFY_PASSWORD_OTP_SUCCESS:
			return {
				type: action.type,
				data: action.data,
				message: action.message,
			};
		
		case accountActions.VERIFY_PASSWORD_OTP_REQUEST:
			return {
				type: action.type,
				data: action.data,
				message: action.message,
			};
		
		case accountActions.VERIFY_PASSWORD_OTP_ERROR:
			return {
				type: action.type,
				error: action.error,
			};

		case accountActions.CHANGE_PASSWORD_INIT:
			return {
				type: action.type,
				data: state.data
			};

		case accountActions.CHANGE_PASSWORD_REQUEST:
			return {
				type: action.type,
				data: state.data,
				message: action.message,
			};

		case accountActions.CHANGE_PASSWORD_SUCCESS:
			return {
				type: action.type,
				data: action.data,
				message: action.message,
			};

		case accountActions.CHANGE_PASSWORD_ERROR:
			return {
				type: action.type,
				data: state.data,
				error: action.error,
			};


		// case accountActions.RESET_PASSWORD_REQUEST:
		// 	return {
		// 		type: action.type,
		// 		data: action.data,
		// 		message: action.message
		// 	};


		// important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
		default:
			return JSON.parse(JSON.stringify(state));
	}
};

export default accountReducer;
