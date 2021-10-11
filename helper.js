
// import * as sessionHelper from './utils/session.helper';
// import * as utils from './utils';

// import * as service from './services/data.service';
// import * as config from './config';


export const mapStateToProps_for_page_wrappers = state => {

	//const user = state.accountReducer.data;
	const authOpen = state.windowReducer.authOpen;
	//const type = state.accountReducer.type;
	const windowClicked = state.windowReducer.clicked;
	const width = state.windowReducer.width;
	const redirectToCourse = state.windowReducer.redirectToCourses;
	const processFlowCode = state.commonReducer.processFlowCode;
	const processFlowMasterId = state.commonReducer.processFlowMasterId;
	const auditFlowMasterId = state.commonReducer.auditFlowMasterId;
	const processFlowName = state.commonReducer.processFlowName;
	const auditPlanDetailsId = state.commonReducer.auditPlanDetailsId;

	return { authOpen, windowClicked, width, redirectToCourse, processFlowCode, processFlowMasterId, auditFlowMasterId, processFlowName, auditPlanDetailsId };
	//return { user, authOpen, type, windowClicked, width, redirectToCourse };
};

export const getIdealColumnsFromScreenSize = () => {
	const width = window ? window.innerWidth : 0;

	console.warn(`${width} produces ${width > 900} && ${width > 670} && ${width > 450} `)

	if (width > 900) {
		// large screen
		return 4;
	}

	else if (width > 670) {
		// large screen
		return 3;
	}

	else if (width > 450) {
		// large screen
		return 2;
	}

	else {
		// large screen
		return 1;
	}
};

export const validateResponse = async response => {
	console.log("response : ", response);
	const promise = new Promise((resolve, reject) => {
		response.text().then((responseText) => {
			let responseData = undefined;
			try { responseData = JSON.parse(responseText); } catch { }
			console.log("responseData : ", responseData);
			if (!responseData) {
				return reject(new Error(responseText));
			}
			if (!(responseData.code && responseData.code === 200) && responseData.error) {
				return reject(new Error(responseData.error));
			}

			resolve(responseData);
		});
	});

	return await promise;
};







export const numberFormat = (value) =>
	new Intl.NumberFormat('en-IN', {
		// style: 'currency',
		// currency: 'INR' 
	}).format(value);





export const post = async (url, body, guarded) => {
	const requestOptions = {
		method: 'POST',
		//	headers: utils.getMandatoryRequestHeaders(guarded),
		body: JSON.stringify(body)
	};

	return post_override(url, requestOptions);
};

const post_override = async (url, requestOptions) => {
	console.warn(`requesting: ${url} with options ==> `, requestOptions);

	if (typeof fetch === 'undefined') {
		fetch = require('node-fetch');
	}

	const response = await fetch(url, requestOptions);
	const data = await validateResponse(response);


	// check if the request was successfull from it
	if (data.success === true) {
		// the response was successfull
		// we should return the json back to the action.
		return data;

	}
	else {
		console.warn(`faulty data received from the server: `, data, url);
		// throw util.generateError(data.message, data.code, 'Invalid request');
	}
};




export const dateAdd = (date, interval, units) => {
	let ret = new Date(date); // don't change original date
	const checkRollover = () => { if (ret.getDate() !== date.getDate()) ret.setDate(0); };

	switch (interval.toLowerCase()) {
		case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
		case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
		case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
		case 'week': ret.setDate(ret.getDate() + 7 * units); break;
		case 'day': ret.setDate(ret.getDate() + units); break;
		case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
		case 'minute': ret.setTime(ret.getTime() + units * 60000); break;
		case 'second': ret.setTime(ret.getTime() + units * 1000); break;
		default: ret = undefined; break;
	}
	return ret;
};
