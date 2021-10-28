import * as accountTypes from '../action-types/account.action.types'
import config from '../config';
import * as service from '../services/data.service';
import { constants } from '../utils/constants';
import * as sessionHelper from '../utils/session.helper';
import * as commonTypes from '../action-types/common.action.types';
import * as windowTypes from '../action-types/window.action.types';
import { LOGIN_SUCCESS } from '../action-types/account.action.types';
import * as util from '../utils';
import * as errorTypes from '../action-types/error.action.types';



/**
 * 
 * @param {*} dispatch 
 * @param {*} type 
 * @param {*} user 
 * @param {*} users 
 * @param {*} error 
 * @param {*} message 
 * @param {*} recordsCount 
 */
const dispatchAction = (dispatch, type, user, users, error, message, recordsCount) => {
    dispatch({
        type,
        user,
        users,
        message,
        error,
        recordsCount
    });
};

export const registerAccountInit = () => async dispatch => {
    dispatchAction(dispatch, accountTypes.REGISTER_INIT, null, null, null, null);
};

export const saveUser = user => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    try {
        const data = await service.put(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.USER_SAVE, user, true);

        if (data && !data.errorMessage) {
            const _user = sessionHelper.getLoggedUser();
            const finalUser = {
                ..._user,
                ...user
            };

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'User saved successfully',
                error: undefined,
                notification: true
            });

            sessionHelper.saveUser(finalUser);
            dispatchAction(dispatch, accountTypes.USER_SAVE_SUCCESS, finalUser, null, null, data.message);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
}

export const registerAccount = (userName, password, firstName, lastName, mobile, source) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    // let's try to get the referred by code, if any from session

    const referredByCode = sessionHelper.getReferralCode();

    const post = {
        userName: userName,
        password: password
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.REGISTER_ACCOUNT, post, false);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.REGISTER_REQUEST, data.data, null, null, data.message);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.id);
            sessionHelper.saveInSession(constants.SESSION_KEYS.REGISTRED_EMAIL, userName);
            sessionHelper.saveInSession(constants.SESSION_KEYS.REGISTRED_PWD, password);


            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Registration is successfull. Please check your inbox for otp to confirm your email address',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, util.generateError(data.errorMessage, data.code, 'Registration error'), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const registerLoginRequest = (userName, userNameType, loginOrRegister, source) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    sessionHelper.saveInSession(constants.SESSION_KEYS.USER_NAME_TYPE, userNameType);
    sessionHelper.saveInSession(constants.SESSION_KEYS.AUTH_TYPE, "login_OTP");
    sessionHelper.removeItemFromSession(constants.SESSION_KEYS.USER_FULLNAME);
    sessionHelper.saveInSession(constants.SESSION_KEYS.ONBORDING_SCREENS_STATUS, "pending");
    sessionHelper.saveInSession(constants.SESSION_KEYS.LOGIN_COUNT, "0");
    // let's try to get the referred by code, if any from session
    const referredByCode = sessionHelper.getReferralCode();
    const campaignData = sessionHelper.getFromSession(constants.SESSION_KEYS.CAMPAIGN_DATA);
    //console.log("userNameType",userNameType);

    const post = {
        userName: userName.toLowerCase(),
        userNameType: userNameType,
        loginOrRegister: loginOrRegister,
        source,
        campaignData: campaignData,
        referredByCode,
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.REGISTER_lOGIN, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.REGISTER_REQUEST, data.data, null, null, data.message);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.id);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_FULLNAME, "");
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_Name, userName.toLowerCase());
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_NAME_TYPE, userNameType);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);

            const utm_medium_a = sessionHelper.getUtm_Medium();
            //console.log("account action utm_medium", utm_medium_a)

        }
        else {
            dispatchAction(dispatch, accountTypes.REGISTER_INIT, null, null, null, null);
            dispatchAction(dispatch, errorTypes.DISPLAY_ERROR, null, null, util.generateError(data.errorMessage, data.code, 'Registration error'), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, accountTypes.REGISTER_INIT, null, null, null, null);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.DISPLAY_ERROR, null, null, error, null);
    }
};

export const verifyOTP = (otp) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);  
    sessionHelper.saveInSession(constants.SESSION_KEYS.AUTH_TYPE, "login_OTP");
    let userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
    sessionHelper.saveInSession(constants.SESSION_KEYS.LOGIN_COUNT, "0");
    let userNameType = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_NAME_TYPE);
    //console.log("userId",userId);
    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        userName: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_Name),
        userNameType: userNameType,
        OTP: otp,
        authType: "login_OTP",
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.LOGIN, post, false);
        //console.log("verifyOTP data", data);
        if (data && !data.errorMessage) {
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.user.id);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_FULLNAME, data.data.user.firstName + " " + data.data.user.lastName);
            sessionHelper.saveInSession(constants.SESSION_KEYS.ONBORDING_SCREENS_STATUS, "pending");

            if (data.data.user.loginCount === 1) {
                //sessionHelper.saveInSession(constants.SESSION_KEYS.ONBORDING_SCREENS_STATUS, "pending");
                dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
                dispatchAction(dispatch, accountTypes.REGISTER_SUCCESS, null, null, null, null);

                // if (data.data.user.email !== undefined && data.data.user.email !== " " && data.data.user.email !== null) {
                //     const responseMailChimp = chimpMailHelper.sendChimpMail(data.data.user.email, data.data.user.firstName, data.data.user.lastName, data.data.user.mobile, "subscribed", "Coaching");
                //     console.log("responseMailChimp", responseMailChimp);
                // }
            }
            else if (data.data.user.firstName === "" || data.data.user.email === "" || data.data.user.mobile === "") {
                sessionHelper.saveInSession(constants.SESSION_KEYS.USER_FULLNAME, "");
                //sessionHelper.saveInSession(constants.SESSION_KEYS.ONBORDING_SCREENS_STATUS, "completed");             
                dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
                dispatchAction(dispatch, accountTypes.REGISTER_SUCCESS, null, null, null, null);
            }
            else {

                sessionHelper.saveInSession(constants.SESSION_KEYS.LOGIN_COUNT, data.data.user.loginCount.toString());
                dispatchAction(dispatch, accountTypes.RegisterLogin_Success, null, null, null, null);
                setTimeout(() => {
                    //sessionHelper.saveInSession(constants.SESSION_KEYS.ONBORDING_SCREENS_STATUS, "completed");
                    sessionHelper.saveUser(data.data);

                    // dispatch({
                    //     type: commonTypes.NOTIFICATION_DISPLAY,
                    //     message: 'You are logged in',
                    //     //message: 'Email id is verified. Please login to continue',
                    //     error: undefined,
                    //     notification: true
                    // }); 

                    //dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);
                    dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, data.data.user, null, null, data.message);
                    dispatchAction(dispatch, windowTypes.ENABLE_ANALYTIC_TRACKING, true);
                    dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
                }, 100);
                setTimeout(() => {
                    dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);
                }, 400);
            }
        }
        else {
            console.error('error : ', data.errorMessage.message);
            dispatchAction(dispatch, errorTypes.DISPLAY_ERROR, null, null, new Error(data.errorMessage.message), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.DISPLAY_ERROR, null, null, error, null);
    }
};

export const resendOTP = () => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null); 
    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        userName: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_Name),
        userNameType: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_NAME_TYPE)
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.RESEND_OTP, post, false);
        //console.log("resend data", data);
        if (data && !data.errorMessage) {
            dispatch({
                type: commonTypes.NOTIFICATION_DISPLAY,
                message: 'OTP re-sent successfully',
                error: undefined,
                notification: true
            });
        }
        else {
            console.error('error : ', data.errorMessage.message);
            dispatchAction(dispatch, errorTypes.DISPLAY_ERROR, null, null, new Error(data.errorMessage.message), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.DISPLAY_ERROR, null, null, error, null);
    }
};

export const updateProfile = (firstName, lastName, MobileEmail, userNameType, source) => async dispatch => {
    //dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);    
    sessionHelper.saveInSession(constants.SESSION_KEYS.AUTH_TYPE, "login_OTP");
    let userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
    sessionHelper.saveInSession(constants.SESSION_KEYS.ONBORDING_SCREENS_STATUS, "pending");
    sessionHelper.saveInSession(constants.SESSION_KEYS.LOGIN_COUNT, "0");

    //console.log("userId",userId);
    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        firstName: firstName,
        lastName: lastName,
        MobileEmail: MobileEmail.toLowerCase(),
        userNameType: userNameType,
        source
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.UPDATE_PROFILE, post, false);

        if (data && !data.errorMessage) {
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.user.id);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_FULLNAME, data.data.user.firstName + " " + data.data.user.lastName);
            sessionHelper.saveInSession(constants.SESSION_KEYS.LOGIN_COUNT, data.data.user.loginCount.toString());


            setTimeout(() => {
                sessionHelper.saveUser(data.data);
                // dispatch({
                //     type: commonTypes.NOTIFICATION_SHOW,
                //     message: 'You are logged in',
                //     //message: 'Email id is verified. Please login to continue',
                //     error: undefined,
                //     notification: true
                // }); 

                //dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);
                dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, data.data.user, null, null, data.message);
                dispatchAction(dispatch, windowTypes.ENABLE_ANALYTIC_TRACKING, true);
                dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            }, 10);
            setTimeout(() => {
                dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);
            }, 400);
        }
        else {
            dispatchAction(dispatch, errorTypes.DISPLAY_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.DISPLAY_ERROR, null, null, error, null);
    }
};

export const registerFreeTrial = (userName, password, firstName, lastName, mobile, source) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);


    // let's try to get the referred by code, if any from session

    const referredByCode = sessionHelper.getReferralCode();

    const post = {
        email: userName,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        password: password,
        source,
        referredByCode
    };

    const postChimp = {
        "email_address": userName,
        "status": "subscribed",
        "merge_fields": {
            "FNAME": firstName,
            "LNAME": lastName,
            "ADDRESS": "",
            "PHONE": mobile,
            "BIRTHDAY": "",
            "MMERGE6": "",
            "MMERGE7": new Date(),
            "MMERGE8": "",
            "MMERGE9": "Coaching"
        }
    };

    try {
        let url = config.RECONCILIATION_URL + `coaching/chimpmail`;
        //const dataChimpMail = await service.post(url, postChimp, false);
        //const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.REGISTER_ACCOUNT, {...post, mailChimpId: dataChimpMail.data.id }, false);
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.REGISTER_FREETRIAL, post, false);
        if (data && !data.errorMessage) {
            //console.log("reg data",data);
            dispatchAction(dispatch, accountTypes.REGISTER_REQUEST, data.data, null, null, data.message);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.id);
            sessionHelper.saveInSession(constants.SESSION_KEYS.REGISTRED_EMAIL, userName);
            sessionHelper.saveInSession(constants.SESSION_KEYS.REGISTRED_PWD, password);


            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Registration is successfull. Please check your inbox for password to confirm your Mobile Number',
                error: undefined,
                notification: true
            });
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, util.generateError(data.errorMessage, data.code, 'Registration error'), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const verifyOtpInit = () => async dispatch => {
    dispatchAction(dispatch, accountTypes.VERIFY_OTP_INIT, null, null, null, null);
};

export const verifyEmailOtp = (otp) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        otp
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.VERIFY_EMAIL_OTP, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.REGISTER_SUCCESS, null, null, null, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'Email id is verified. Please login to continue',
                error: undefined,
                notification: true
            });
            dispatchAction(dispatch, windowTypes.AUTH_OPEN, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const verifyEmailOtpAndLogin = (otp) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    let userId = sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID);
    console.log("userId", userId);
    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        otp
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.VERIFY_EMAIL_OTP, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.REGISTER_SUCCESS, null, null, null, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'You are logged in',
                //message: 'Email id is verified. Please login to continue',
                error: undefined,
                notification: true
            });

            let userName = sessionHelper.getFromSession(constants.SESSION_KEYS.REGISTRED_EMAIL);
            let password = sessionHelper.getFromSession(constants.SESSION_KEYS.REGISTRED_PWD);
            const post2 = {
                email: userName,
                password: password
            };
            const data2 = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.LOGIN, post2, false);

            if (data2 && !data2.errorMessage) {
                sessionHelper.saveUser(data2.data);

                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'You are logged in',
                    error: undefined,
                    notification: true
                });

                //dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);
                dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, data2.data.user, null, null, data2.message);
                dispatchAction(dispatch, windowTypes.ENABLE_ANALYTIC_TRACKING, true);
                dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            }
            else {
                dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, util.generateError(data2.errorMessage, data2.code, 'Login not successful'), null);
            }
            //dispatchAction(dispatch, windowTypes.AUTH_OPEN, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const verifyMobileOtp = (otp) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        otp
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.VERIFY_MOBILE_OTP, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.VERIFY_MOBILE_OTP_SUCCESS, null, null, null, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, accountTypes.VERIFY_MOBILE_OTP_ERROR, null, null, new Error(data.errorMessage), null);
        }

    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const verifyPasswordAndLogin = (password) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);
    sessionHelper.saveInSession(constants.SESSION_KEYS.REGISTRED_PWD, password);
    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        otp: password,
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.VERIFY_MOBILE_PWD, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.REGISTER_SUCCESS, null, null, null, null);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);

            dispatch({
                type: commonTypes.NOTIFICATION_SHOW,
                message: 'You are logged in',
                //message: 'Email id is verified. Please login to continue',
                error: undefined,
                notification: true
            });

            let userName = sessionHelper.getFromSession(constants.SESSION_KEYS.REGISTRED_EMAIL);
            let password = sessionHelper.getFromSession(constants.SESSION_KEYS.REGISTRED_PWD);
            const post2 = {
                email: userName,
                password: password
            };
            const data2 = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.LOGIN, post2, false);

            if (data2 && !data2.errorMessage) {
                sessionHelper.saveUser(data2.data);

                dispatch({
                    type: commonTypes.NOTIFICATION_SHOW,
                    message: 'You are logged in',
                    error: undefined,
                    notification: true
                });

                //dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);
                //dispatchAction(dispatch, accountTypes.REGISTER_INIT, data.data, null, null, data.message);
                dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, data2.data.user, null, null, data2.message);
                dispatchAction(dispatch, windowTypes.ENABLE_ANALYTIC_TRACKING, true);
                dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            }
            else {
                dispatchAction(dispatch, accountTypes.REGISTER_REQUEST, data.data, null, null, data2.message);
                dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, util.generateError(data2.errorMessage, data2.code, 'Login not successful'), null);
            }
            //dispatchAction(dispatch, windowTypes.AUTH_OPEN, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, util.generateError(data.errorMessage, data.code, 'Password not verify !!'), null);
            //dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const login = (userName, password, dataPublicIP, socialauth) => async dispatch => {
    console.log("login function");
    const post = {
        email: userName,
        password,
        dataPublicIP:dataPublicIP,
        socialauth: socialauth,// sessionHelper.getFromSession(constants.SESSION_KEYS.socialauth),
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.LOGIN, post, false);
        //console.log("After Login Data", data);
        if (data && !data.errorMessage) {
            sessionHelper.saveUser(data.data);

            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.user.id);
           // sessionHelper.saveInSession(constants.SESSION_KEYS.PLANT_ID, data.data.plantMasterId);
           // sessionHelper.saveInSession(constants.SESSION_KEYS.COMPANY_ID, data.data.user.plantMaster.companyMasterID);

           
            dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, data.data.user, null, null, data.message);

        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, util.generateError(data.errorMessage, data.code, 'Login not successful'), null);
        }
    }
    catch (error) {
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error);
    }
};

export const login_social = (email, token, authType, userId) => async dispatch => {
    sessionHelper.saveInSession(constants.SESSION_KEYS.AUTH_TYPE, "login_Social");
    sessionHelper.saveInSession(constants.SESSION_KEYS.USER_NAME_TYPE, "email");
    sessionHelper.saveInSession(constants.SESSION_KEYS.USER_NAME, email);
    sessionHelper.saveInSession(constants.SESSION_KEYS.ONBORDING_SCREENS_STATUS, "pending");
    sessionHelper.saveInSession(constants.SESSION_KEYS.LOGIN_COUNT, "0");

    const referredByCode = sessionHelper.getReferralCode();

    const post = {
        email,
        token,
        authType,
        referredByCode
    };

    if (userId) {
        post.facebookUserId = userId;
    }

    try {

        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.LOGIN, post, false);
      
        if (data && !data.errorMessage) {
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.user.id);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_FULLNAME, data.data.user.firstName + " " + data.data.user.lastName);

            if (data.data.user.mobile === null || data.data.user.mobile === " ") {               
                dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
                dispatchAction(dispatch, accountTypes.REGISTER_SUCCESS, null, null, null, null);
            }
            else {
                dispatchAction(dispatch, windowTypes.AUTH_CLOSE, null, null, null, null);
                sessionHelper.saveInSession(constants.SESSION_KEYS.LOGIN_COUNT, data.data.user.loginCount.toString());

                dispatch({
                    type: commonTypes.NOTIFICATION_DISPLAY,
                    message: 'You are logged in',
                    error: undefined,
                    notification: true
                });
                dispatchAction(dispatch, accountTypes.RegisterLogin_Success, null, null, null, null);
                setTimeout(() => {
                    sessionHelper.saveUser(data.data);
                    dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, data.data.user, null, null, data.message);
                }, 500);
                dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            }
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error);
    }
};

export const forgotPasswordInit = () => async dispatch => {
    dispatchAction(dispatch, accountTypes.RESET_PASSWORD_INIT, null, null, null, null);
};

export const forgotPassword = email => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    const post = {
        email
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.FORGOT_PASSWORD, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.RESET_PASSWORD_RAISE_SUCCESS, data.data, null, null, data.message);
            sessionHelper.saveInSession(constants.SESSION_KEYS.USER_ID, data.data.userId);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
            dispatchAction(dispatch, commonTypes.NOTIFICATION_SHOW, null, null, null, data.message);

        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const verifyPasswordOtp = (otp) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);

    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        otp
    };


    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.VERIFY_PASSWORD_OTP, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.VERIFY_PASSWORD_OTP_SUCCESS, null, null, null, null);
            sessionHelper.saveInSession(constants.SESSION_KEYS.PASSWORD_TOKEN, data.data.passwordToken);
            dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const resetPassword = (password, confirm_password) => async dispatch => {
    dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);


    if (!password || !confirm_password) {
        return dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error('Please provide correct input for password and confirm password'), null);
    }


    if (password.trim().length < 8) {
        return dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error('Password should be of minimum 8 length'), null);
    }

    if (confirm_password.trim().localeCompare(password.trim())) {
        return dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error('Password and confirm password do not match'), null);
    }

    const post = {
        userId: sessionHelper.getFromSession(constants.SESSION_KEYS.USER_ID),
        passwordToken: sessionHelper.getFromSession(constants.SESSION_KEYS.PASSWORD_TOKEN),
        password: password,
        confirmPassword: confirm_password

    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.RESET_PASSWORD, post, false);

        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.RESET_PASSWORD_SUCCESS, data.data, null, null, data.message);
            dispatchAction(dispatch, commonTypes.NOTIFICATION_SHOW, null, null, null, data.message);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};

export const releaseErrorInfo = () => dispatch => {
    dispatchAction(dispatch, accountTypes.LOGIN_NO_NOTIFICATION, null, null, null, '', 0);
};

export const errored = (error) => dispatch => {

    if (error.code === 352) {
        // jwt expired


    }

    dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
};

export const dispatchUserInfo = user => dispatch => {
    dispatchAction(dispatch, accountTypes.LOGIN_SUCCESS, user, null, null, '');
};

export const logoutUser = user => dispatch => {
    dispatchAction(dispatch, accountTypes.LOGOUT_SUCCESS, user, null, null, '');
};

export const changePasswordInit = () => async dispatch => {
    dispatchAction(dispatch, accountTypes.CHANGE_PASSWORD_INIT, null, null, null, null);
};

export const changePassword = (oldPassword, newPassword, confirmNewPassword) => async dispatch => {
    dispatchAction(dispatch, accountTypes.CHANGE_PASSWORD_REQUEST, null, null, null, null);
   // dispatchAction(dispatch, commonTypes.LOADING_SHOW, null, null, null, null);


    const post = {
        password: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmNewPassword,
    };

    try {
        const data = await service.post(config.AUTH_URL + process.env.APP_NAME + '/' + constants.END_POINTS.CHANGE_PASSWORD, post, true);
        if (data && !data.errorMessage) {
            dispatchAction(dispatch, accountTypes.CHANGE_PASSWORD_SUCCESS, data.data, null, null, data.message);

            const user = sessionHelper.getLoggedUser();
            // let's save back the user

            sessionHelper.saveUser(user);

            // and dispatch an action to reflect that in store too
            dispatch({
                type: LOGIN_SUCCESS,
                user
            });
            dispatchAction(dispatch, commonTypes.NOTIFICATION_SHOW, null, null, null, data.message);
        }
        else {
            dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, new Error(data.errorMessage), null);
        }
    }
    catch (error) {
        console.error('error: ', error);
        dispatchAction(dispatch, commonTypes.LOADING_HIDE, null, null, null, null);
        dispatchAction(dispatch, errorTypes.SHOW_ERROR, null, null, error, null);
    }
};
