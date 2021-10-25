import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withRouter } from 'next/router';
import Router from "next/router";
import redirect from 'nextjs-redirect';
import { connect } from 'react-redux';
import Main from '../components/main'
import Wrapper from "../components/shared/Wrapper";
import Header from '../components/header'
import MainBanner from '../components/homePage'
import { changeWidth, hideRedirectionStatus } from '../actions/window.actions';
import * as helper from '../helper';
import AboutRecon from '../components/homePage/aboutRecon'
import Footer from '../components/shared/Footer'
import Gap from '../components/Gap'
import * as CommonStyle from '../components/commonStyle'
import styled from 'styled-components'
import * as sessionHelper from '../utils/session.helper'
import style from '../theme/app.scss';
import { dispatchUserInfo } from "../actions/account.actions";
import { constants } from '../utils/constants';
import ModalHeader from '../components/shared/ModalHeader';
import MasterIndex from '../components/masters';
import MasterDetails from '../components/masters/masterDetails';
import AntennaRotatioDetails from '../components/working/viewDetails/antennaRotationDetails';
import DeviceLocationDetails from '../components/working/viewDetails/deviceLocationDetails';
import { showNotification, hideNotification } from '../actions/common.actions';
import * as commonType from '../action-types/common.action.types';
import NotificationPopUp from '../components/shared/notificationPopUp';
import { removeLoggedUserRole } from '../utils/session.helper';
import Can from '../components/auth/can';
import ChangePassword from '../components/auth/changePassword';
const Image = '../static/'
const window = require('global/window');
const AdminMain = styled.div`
    width:99.3vw;
    height:84vh;
    overflow:hidden;
    background-color:#ffffff;
    display:flex;
    justify-content:space-between;
`;

const ContentWapper = styled.div` 
  padding : 0px 55px 0px 55px;
  
`;
const WrapperMenu = styled.div`
    overflow-y:auto;
    width:${props => props.showSidebar ? "20%" : "20%"};
    height:100%; 
    background-color: teal; // #64b4db; 
    .menu_content {
      width: 100%;
      height:80%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      flex-direction:column;
      color:#000;
    }
`;

const MainLabel = styled.div` 
    height: 43px;
    width:100%;
    align-items : center;
    padding-left : 10px;
    display:flex;
      img{
          width:10px;
          height:20px;
          margin-right:20px;
      }
      .text{
          font-family: Asap;
          font-size: 30px; 
          font-stretch: normal;
          font-style: normal;
          line-height: 1.3;
          letter-spacing: normal;
          text-align: left;
          color: #333333; 
        
      }
`;

const Icon = styled.div`
    margin:auto;
    margin-right:10px;
  
`;
const Text = styled.div`
    display:${props => props.textShow ? "inline" : "none"};
    font-weight:bold;
    font-size:14px;
`;
const SwitchText = styled.div`
    display:${props => props.textShow ? "inline" : "none"};
    font-family: Asap; 
    font-size: 16px;
    display : flex;
    font-weight: bold;
    font-stretch: normal; 
    font-style: normal;
    line-height: 1.29;
    letter-spacing:normal; 
    color:#ffffff;
    text-transform:uppercase;
    &:hover{
      color:#daad2e;
    }
`;

const LinkWapper = styled.div`
    display:${props => props.isVisible === true ? "flex" : 'none'};
    justify-content:space-between;
    padding: 10px 35px; 
    font-weight : bold;
    font-size: 15px;
    font-weight: 500;
    text-decoration:${props => props.isLinkActive === true ? "underline 0.15em" : "none"};
    color: ${props => props.isLinkActive === true ? "#ffffff" : '#ffffff'};
    //color: ${props => props.isLinkActive === true ? "#ffffff" : '#ffffff'};
    &:hover{
      animation: spinAround 2s linear infinite;
      text-decoration:${props => props.isLinkActive === true ? "none" : "underline 0.15em"};
      color:  ${props => props.isLinkActive === true ? "#ffffff" : '#ffffff'};
      //color:  ${props => props.isLinkActive === true ? "#ffffff" : '#ffffff'};
    }
`;
const SwitchLinkWapper = styled.div`
    display:${props => props.isVisible === true ? "flex" : 'none'};
    justify-content:space-between;
    padding: 10px 30px; 
    font-weight : bold;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.isLinkActive === true ? "#daad2e" : '#ffffff'};
    //color: ${props => props.isLinkActive === true ? "#00aeef" : '#ffffff'};
    &:hover{
      color:  ${props => props.isLinkActive === true ? "#ffffff" : '#daad2e'};
      //color:  ${props => props.isLinkActive === true ? "#ffffff" : '#00aeef'};
    }
`;

const MenuItems = styled.div`
  font-family: Asap;
  min-height:20px;
  font-size: 16px;
  display : flex;
  font-weight: bold;
  font-stretch: normal;
  padding: 10px 30px; 
  font-style: normal;
  line-height: 1.29;
  letter-spacing:normal;
  text-align: left;
  text-transform:uppercase;
  cursor:pointer;
  color:  ${props => props.isActive === true ? '#daad2e' : '#ffffff'} ;
  //color:  ${props => props.isActive === true ? '#00aeef' : '#ffffff'} ;
  padding-bottom:0px;
  .imgDown{
    margin-left:9px;
    width: 6px;
    height: 12px;
    transform: rotate(90deg);
  }
  &:hover{
    color:  ${props => props.isActive === true ? '#ffffff' : '#daad2e'} ;
    //color:  ${props => props.isActive === true ? '#ffffff' : '#00aeef'} ;
  }
  .imgUp{
      margin-left:9px;
    width: 6px;
    height: 12px;
    transform: rotate(-90deg);
  }
`;

const DesignMenuDiv = styled.div`
  width:100%;
  height:auto;
  background-color : #c3c3c3; 
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
      aisuDetails: false,
      type: commonType.NOTIFICATION_HIDE,
      notification: false,
      message: '',
      isAuthorizedUser: false,
      aisuDetailsLink: [
        {
          pathname: "/aisuAdmin",
          tab: "antenna-rotation-details",
          id: undefined,
          MasterName: 'Antenna Movement Details',
          ParentMasterName: undefined,
          parentMasterCategoryId: '',
          url: "/aisuAdmin/antenna-rotation-details",
          isVisible: true
        },
        {
          pathname: "/aisuAdmin",
          tab: "device-location-details",
          id: undefined,
          MasterName: 'Device Location Details',
          ParentMasterName: undefined,
          parentMasterCategoryId: '',
          url: "/aisuAdmin/device-location-details",
          isVisible: true
        }
      ],
      commonMasterLinks: []
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

  showHandler = (key) => {

    // this.setState({
    //   [key]: !this.state[key],
    // }); 

    const { commonMasterSection, aisuDetails } = this.state;
    const Value_commonMasterSection = commonMasterSection === true ? false : true;
    const Value_aisuDetails = aisuDetails === true ? false : true;

    if (key === "commonMasterSection" && aisuDetails === true && commonMasterSection === false) {
      this.setState({
        commonMasterSection: Value_commonMasterSection,
        aisuDetails: false
      })
    }
    else if (key === "aisuDetails" && aisuDetails === false && commonMasterSection === true) {
      this.setState({
        commonMasterSection: false,
        aisuDetails: Value_aisuDetails
      })
    }
    else {
      this.setState({
        [key]: !this.state[key],
      })
    }

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
          <AdminMain className={style.admin_main}>
            <WrapperMenu showSidebar={sideBar}>
              <div className="menu_content" style={{ alignItems: sideBar ? "flex-start" : "center" }}>
                <Gap h="50px" />
                <MenuItems
                  onClick={() => this.showHandler('aisuDetails')}
                  isActive={this.state.aisuDetails}>
                  <Icon><i className="fas fa-list"></i></Icon>  AISU Details
                </MenuItems>

                {this.state.aisuDetails === true &&
                  <>
                    {this.state.aisuDetailsLink && this.state.aisuDetailsLink.map((item, index) => {
                      return <LinkWapper
                        key={index}
                        isVisible={item.isVisible}
                        className={style.show_hand}
                        isLinkActive={ActiveTabname === item.tab ? true : false}
                        onClick={() => {
                          this.props.router.push(
                            {
                              pathname: item.pathname,
                              query: {
                                tab: item.tab,
                                id: item.id && item.id,
                                MasterName: item.MasterName,
                                ParentMasterName: undefined,
                                parentMasterCategoryId: ''
                              }
                            },
                            item.url
                          );
                        }}
                      > <Icon><i className="fas fa-book"></i></Icon> <Text textShow={sideBar}>{item.MasterName}</Text>
                      </LinkWapper>
                    })}
                  </>
                }
                {/* <Gap h="20px" />
                <MenuItems
                  onClick={() => this.showHandler('commonMasterSection')}
                  isActive={this.state.commonMasterSection}>
                  <Icon><i className="fas fa-list"></i></Icon>    Common Master
                </MenuItems>
                {this.state.commonMasterSection === true &&
                  <>
                    {this.state.commonMasterLinks && this.state.commonMasterLinks.map((item, index) => {
                      return <LinkWapper
                        key={index}
                        isVisible={item.isVisible}
                        isLinkActive={ActiveTabname === item.tab ? true : false}
                        className={style.show_hand}
                        onClick={() => {
                          this.props.router.push(
                            {
                              pathname: item.pathname,
                              query: {
                                tab: item.tab,
                                id: item.id && item.id,
                                MasterName: item.MasterName,
                                ParentMasterName: undefined,
                                parentMasterCategoryId: ''
                              }
                            },
                            item.url
                          );
                        }}
                      > <Icon><i className="fas fa-book"></i></Icon> <Text textShow={sideBar}>{item.MasterName}</Text>
                      </LinkWapper>
                    })}
                  </>
                } */}

                <Gap h="20px" />
                <SwitchLinkWapper
                  isVisible={true}
                  className={style.show_hand}
                  onClick={() => {
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
                  }}
                >
                  <Icon><i className="fas fa-toggle-on"></i></Icon>   <SwitchText textShow={sideBar}>Switch Role</SwitchText>

                </SwitchLinkWapper>
                <Gap h="10px" />
                <SwitchLinkWapper
                  isVisible={true}
                  className={style.show_hand}
                  onClick={() => {
                    this.props.router.push(
                      {
                        pathname: "/aisuAdmin",
                        tab: "change-password",
                        query: {
                          tab: "change-password",
                          id: undefined,
                          pageName: 'Change Password'
                        }
                      },
                      "/aisuAdmin/change-password"
                    );
                  }}
                >
                  <Icon><i className="fas fa-toggle-on"></i></Icon>   <SwitchText textShow={sideBar}>Change Password</SwitchText>

                </SwitchLinkWapper>
                <SwitchLinkWapper
                  isVisible={true}
                  className={style.show_hand}
                  onClick={this._logout}
                >
                  <Icon><i className="fas fa-sign-out-alt"></i></Icon>   <SwitchText textShow={sideBar}>Logout</SwitchText>

                </SwitchLinkWapper>
                <Gap h="50px" />
              </div>
            </WrapperMenu>

            <ContentWapper style={{ width: sideBar ? '80%' : '100%', height: '100%', transition: 'all 0.3s', overflowY: 'scroll' }}>
              <ModalHeader
                heading={router && router.query && router.query.tab !== "" && router.query.MasterName} //"Group Master"
              />
              {router && router.query && router.query.tab === "antenna-rotation-details" && (
                <div>
                  {/* <TowerAddEdit /> */}
                  <AntennaRotatioDetails />
                </div>
              )}
              {router && router.query && router.query.tab === "device-location-details" && (
                <div>
                  {/* <TowerAddEdit /> */}
                  <DeviceLocationDetails />
                </div>
              )}
              {(!router || !router.query || router.query.tab === undefined) &&
                <div>
                  <MasterIndex />
                </div>
              }
              {((router && router.query && router.query.tab === "change-password") || (this.props.query && this.props.query.tab === "change-password")) && (
                <div>
                  <ChangePassword />
                </div>
              )}
              {router && router.query && router.query.MasterName && router.query.tab != "antenna-rotation-details" &&
               router.query.tab !="device-location-details" &&
                <div>
                  <MasterDetails
                    masterCateogyId={router && router.query && router.query.id}
                    parentMasterCategoryId={router && router.query && router.query.parentMasterCategoryId}
                    MasterName={router && router.query && router.query.MasterName}
                    ParentMasterName={router && router.query && router.query.ParentMasterName}
                    masterCategoryCode={router && router.query && router.query.tab}
                  />
                </div>
              }
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
