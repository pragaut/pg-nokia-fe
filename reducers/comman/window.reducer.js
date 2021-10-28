import * as actions from '../../action-types/comman/window.action.types';

/**
 * 
 */
const initialState = {
	type: actions.WINDOW_INIT,
	width: 0,
	height: 0,
	authOpen: false,
	cartOpen: false,
	clicked: false,
	productId: -1,
	quickviewOpen: false,
	redirectToCourses: false,
	isAnaliticTracking: false
};

/**
 * 
 * @param {*} state the current state of the function state
 * @param {*} action the action which caused this login reducer
 * 
 * @returns the new state.
 */
const windowReducer = (state, action) => {
	if (!state || typeof action.type === 'undefined') {
		return initialState;
	}

	if (action.data && typeof action.data === 'object') {
		action.data.key = new Date();
	}



	switch (action.type) {
		
		case actions.WINDOW_CART_OPEN:
			return {
				type: action.type,
				width: state.width,
				height: state.height,
				cartOpen: true,
				clicked: false,
				redirectToCourses: false
			};

		case actions.AUTH_OPEN:
			// console.log("AUTH_OPEN", state.width)
			return {
				type: action.type,
				width: state.width,
				height: state.height,
				authOpen: true,
				clicked: false,
				redirectToCourses: false
			};

		case actions.AUTH_CLOSE:
			return {
				type: action.type,
				width: state.width,
				height: state.height,
				authOpen: false,
				clicked: false,
				redirectToCourses: false
			};

		case actions.QUICK_VIEW_OPEN:
			return {
				type: action.type,
				width: state.width,
				height: state.height,
				authOpen: state.authOpen,
				clicked: state.clicked,
				quickviewOpen: true,
				productId: action.productId,
				redirectToCourses: false
			};

		case actions.QUICK_VIEW_CLOSE:
			return {
				type: action.type,
				width: state.width,
				height: state.height,
				authOpen: state.authOpen,
				quickviewOpen: false,
				clicked: state.clicked,
				redirectToCourses: false
			};

		case actions.WINDOW_CART_CLOSE:
			return {
				type: action.type,
				width: state.width,
				height: state.height,
				cartOpen: false,
				clicked: false,
				redirectToCourses: false
			};

		case actions.WINDOW_WIDTH_CHANGED:
			return {
				type: action.type,
				width: action.width,
				height: state.height,
				cartOpen: state.cartOpen,
				authOpen: state.authOpen,
				clicked: false,
				redirectToCourses: false
			};
		case actions.WINDOW_HEIGHT_CHANGED:
			return {
				type: action.type,
				width: state.width,
				height: action.height,
				cartOpen: state.cartOpen,
				authOpen: state.authOpen,
				clicked: false,
				redirectToCourses: false
			};
		case actions.WINDOW_CLICKED:
			return {
				...state,
				clicked: true,
				redirectToCourses: false
			};

		case actions.WINDOW_REDIRECT_TO_COURSES:
			return {
				...state,
				redirectToCourses: true
			};

		case actions.WINDOW_REDIRECT_DESTROY:
			return {
				...state,
				redirectToCourses: false
			};

		case actions.ENABLE_ANALYTIC_TRACKING:
			return {
				...state,
				isAnaliticTracking: true
			};

		case actions.DISABLE_ANALYTIC_TRACKING:
			return {
				...state,
				isAnaliticTracking: false
			};

		// important: we should always give a default, otherwise React gives a cheap warning and it is very annoying
		default:
			return {
				...state,
				clicked: false,
				redirectToCourses: false
			};
	}
};

export default windowReducer;
