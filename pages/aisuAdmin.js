import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withRouter } from 'next/router';
import Router from "next/router";
import redirect from 'nextjs-redirect';
import { connect } from 'react-redux';
import Main from '../components/comman/main'
import Wrapper from "../components/shared/Wrapper";
import Header from '../components/comman/header'
import { changeWidth, hideRedirectionStatus } from '../actions/comman/window.actions';
import * as helper from '../helper';
import Footer from '../components/shared/Footer'
import Gap from '../components/comman/Gap'
import * as CommonStyle from '../components/comman/commonStyle'
import styled from 'styled-components'
import * as sessionHelper from '../utils/session.helper'
import style from '../theme/app.scss';
import { dispatchUserInfo } from "../actions/comman/account.actions";
import { constants } from '../utils/constants';
import ModalHeader from '../components/shared/ModalHeader'; 
import AntennaRotatioDetails from '../components/aisu/working/viewDetails/antennaRotationDetails';
 
import { showNotification, hideNotification } from '../actions/comman/common.actions';
import * as commonType from '../action-types/comman/common.action.types';
import NotificationPopUp from '../components/shared/notificationPopUp';
import { removeLoggedUserRole } from '../utils/session.helper';
import Can from '../components/comman/auth/can';
import ChangePassword from '../components/comman/auth/changePassword'; 
import { MainWrapper, ContentWapper } from '../components/comman/commonStyle/pagesStyle';

const Image = '../static/'
const window = require('global/window');



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
      aisuDetails: false,
      type: commonType.NOTIFICATION_HIDE,
      notification: false,
      message: '',
      isAuthorizedUser: false
    }
  }


  async componentDidMount() {
    // now, let's make sure we have userinfo in our state
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
    let Role = RoleName && RoleName;
    Role = RoleName && RoleName.replace(' ', '');
    //console.log("Role Name User : ", Role);
    let AuthorizedUser = this.checkIsAuthorizedUser(Role, "admin-page:visit", null);
    //console.log("Authorized User : ", AuthorizedUser);
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
    const sideBar = false;
    const MasterCategoryVisible = this.state.MasterCategoryVisible; 
    const ActiveTabname = router && router.query && router.query.tab;
    console.log("ActiveTabname : ", ActiveTabname);
    console.log("router.query : ", router.query);
    let Notification = true;
    if (commonType.NOTIFICATION_SHOW === this.state.type) {
      Notification = true;
    }
    if (Notification === true) {
      setTimeout(() => {
        Notification = true;
      }, 50000);
    }    
    return (
      <div>
        <Main />
        <Header
          layout="loggedUser" //"admin"
        />
        <div>
          {/* <Gap h="70px" /> */}
          <MainWrapper className={style.admin_main}>
            <ContentWapper padding ={'0px 0px 0px 0px'}>
              <ModalHeader
                heading={router && router.query && ((router.query.page !== "" && router.query.page) || (router.query.pageName !== "" && router.query.pageName))} //"Group Master"
              />
              {/* {router && router.query && router.query.tab === "antenna-rotation-details" && (
                <div> 
                  <AntennaRotatioDetails />
                </div>
              )} */} 
              {router && ((router.query && router.query.tab === "antenna-rotation-details") || (!router.query || !router.query.tab || router.query.tab === null || router.query.tab === undefined)) && (
                <div>
                  <AntennaRotatioDetails />
                </div>
              )}
              {((router && router.query && router.query.tab === "change-password") || (this.props.query && this.props.query.tab === "change-password")) && (
                <div>
                  <ChangePassword />
                </div>
              )}             
            </ContentWapper>
          </MainWrapper>
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
  return {type, notification, message, authOpen, windowClicked, width, redirectToCourse };
};

export default withRouter(connect(mapStateToProps, { showNotification, hideNotification, dispatchUserInfo,  changeWidth, hideRedirectionStatus})(Index));
