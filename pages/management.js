import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withRouter } from 'next/router';
import Router from "next/router";
import redirect from 'nextjs-redirect';
import { connect } from 'react-redux';
import Main from '../components/comman/main'
import Wrapper from "../components/shared/Wrapper";
//import Header from '../components/appHeader';
import Header from '../components/comman/header'
import { changeWidth, hideRedirectionStatus } from '../actions/comman/window.actions';
import Footer from '../components/shared/Footer'
import Gap from '../components/comman/Gap'
import * as CommonStyle from '../components/comman/commonStyle'
import styled from 'styled-components'
import * as sessionHelper from '../utils/session.helper'
import style from '../theme/app.scss';
import { dispatchUserInfo } from "../actions/comman/account.actions";
import ModalHeader from '../components/shared/ModalHeader';
import { showNotification, hideNotification } from '../actions/comman/common.actions';
import * as commonType from '../action-types/comman/common.action.types';
import { removeLoggedUserRole } from '../utils/session.helper';
import ChangePassword from '../components/comman/auth/changePassword';
import DeviceMappingDetails from '../components/tmc/working/deviceMapping/index';
import TowerNotificationDetails from '../components/tmc/working/towerNotifications/index';
import ClosedTowerNotificationDetails from '../components/tmc/working/towerNotifications/closedTowerNotification';
const Image = '../static/'
const window = require('global/window');
const AdminMain = styled.div`
width:100%;  
background-color:#ffffff;
display:flex;
justify-content:center;
`;

const ContentWapper = styled.div` 
padding : ${props => props.padding ? props.padding : '0px 55px 0px 55px'};
width : ${props => props.width ? props.width : '100%'};
display:flex;
flex-direction:column;
  
`;
export class Index extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            removeIcon: false,
            scrolling: 0,
            windowInnerHeight: window.innerHeight,
            onHoverActive: false,
            isPokerreoureceActive: false,
            IsSelectedPokerGlossaryActive: false,
            commonMasterSection: false,
            nokiaMaster: false,
            type: commonType.NOTIFICATION_HIDE,
            notification: false,
            message: '',
            isAuthorizedUser: false,
            isDeviceMappingSection: false
        }
    }


    async componentDidMount() {
        // now, let's make sure we have userinfo in our state
        if (this.isLoggedIn()) {
            this.props.dispatchUserInfo(this.loggedUser());
        }
        else {
            this.props.router.push(
                {
                    pathname: '/',
                    query: {
                        page: 'home'
                    },
                },
                '/',
            );
        }
        const userRole = this.getLoggedUserRole();
        const LoggedUserRole = userRole && JSON.parse(userRole);
        const RoleName = LoggedUserRole && LoggedUserRole.roleName;
        let AuthorizedUser = this.checkIsAuthorizedUser(RoleName, "user-page:visit", null);
        console.log("Authorized User : ", AuthorizedUser);
        if (!AuthorizedUser) {
            this._logout();
            //this.unAuthorizedAccess();
        }
    }
    _logout = () => {
        this.killUser();
        this.props.dispatchUserInfo({});

        setTimeout(() => {
            this.props.router.push(
                {
                    pathname: '/',
                    query: {
                        page: 'home'
                    },
                },
                '/',
            );
        }, 200);
    }

    showHandler = (key) => {
        this.setState({
            [key]: !this.state[key],
        });
    }

    HeadingMasterDiv = props => {
        return <React.Fragment>
            <CommonStyle.TextDiv
                fontsize="36px"
                minheight="40px"
            >
                {props.name}
            </CommonStyle.TextDiv>
        </React.Fragment>
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.type && nextProps.type != this.state.type) {
            this.setState({
                type: nextProps.type
            })
        }
        if (nextProps && nextProps.notification && nextProps.notification != this.state.notification) {
            this.setState({
                notification: nextProps.notification
            })
        }
        if (nextProps && nextProps.message && nextProps.message != this.state.message) {
            this.setState({
                message: nextProps.message
            })
        }
    };

    oclickHideNotification = () => {
        this.props.hideNotification();
    }

    unAuthorizedAccess() {
        setTimeout(() => {
            removeLoggedUserRole();
            this.props.router.push(
                {
                    pathname: "/switch-role",
                    query: {
                        tab: "switch-role"
                    }
                },
                "/switch-role"
            );
        }, 500);
    }

    render() {
        const { router } = this.props;
        const loggedIn = this.props.user && this.isLoggedIn();
        const user = sessionHelper.getLoggedUser();
        const sideBar = true;
        const ActiveTabname = router && router.query && router.query.tab;

        return (
            <div>
                <Main />
                <Header
                    layout="loggedUser" //"admin"
                />
                <div style={{ width: '95%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <AdminMain style={{ width: '100%', padding: '0px 30px' }} className={style.admin_main}>
                        <ContentWapper padding="0px">
                            <ModalHeader
                                heading={router && router.query && router.query.tab !== "" && router.query.MasterName} //"Group Master"
                            />
                            {router && (router.query && router.query.tab === "device-mapping-details") && (
                                <div>
                                    <DeviceMappingDetails />
                                </div>
                            )}
                            {router && (router.query && router.query.tab === "tower-notification-details") && (
                                <div>
                                    <TowerNotificationDetails />
                                </div>
                            )}
                            {router && (router.query && router.query.tab === "closed-tower-notification-details") && (
                                <div>
                                    <ClosedTowerNotificationDetails />
                                </div>
                            )}
                            {((router && router.query && router.query.tab === "change-password") || (this.props.query && this.props.query.tab === "change-password")) && (
                                <div>
                                    <ChangePassword />
                                </div>
                            )}
                        </ContentWapper>
                    </AdminMain>
                </div>

                <Footer />
            </div>
        )
    }

}
const mapStateToProps = state => {
    const authOpen = state.windowReducer.authOpen;
    const windowClicked = state.windowReducer.clicked;
    const width = state.windowReducer.width;
    const { type, notification, message } = state.commonReducer;
    const redirectToCourse = state.windowReducer.redirectToCourses;
    // const {   auditTypes,yearTypes, sections,companys ,criticalitys,  auditObservations} = state.adminReducer;

    return { type, notification, message, authOpen, windowClicked, width, redirectToCourse };
};

export default withRouter(connect(mapStateToProps, { showNotification, hideNotification, dispatchUserInfo, changeWidth, hideRedirectionStatus })(Index));
