import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import config from '../../config';
import { constants } from '../../utils/constants';
import Link from "next/link";
import Head from 'next/head';
import { withRouter } from "next/router";
import styled from "styled-components";
import Wrapper from "../shared/Wrapper";
import * as sessionHelper from '../../utils/session.helper';
import MenuList from './MenuList'
import window from 'global/window'
// import { saveUser, dispatchUserInfo , changePassword , changePasswordInit} from "../../actions/account.actions";
import { saveUser, dispatchUserInfo, logoutUser, changePassword, changePasswordInit, registerAccountInit } from "../../actions/account.actions";
import { disableAnalyticTracking, openAuthWindow } from '../../actions/window.actions';
//import style from '../../static/scss/main.scss';
function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}
const style = lazyWithPreload(() => import("../../static/scss/main.scss"));




const MainDiv = styled.div`
width:100%;
padding:0px 60px 0px 60px;
z-index:150;
@media (max-width:1000px)
{
    padding:0px 30px 0px 30px;
}
@media (max-width:768px)
{
    padding:0px 30px 0px 54px;
}

`;

const MobileWrap = styled.div` 
  left: ${props => props.visible ? '0%' : '-100%'};
  position:fixed;
  top:0;
  transition: all .2s linear;
  background-image: linear-gradient(to right, rgb(0,0,0) 70% , rgb(0, 0, 0,0.45) 30%);
`;

const MenuHolder = styled.div`
  background-color: ${({ theme }) => theme.general.darkBg};
  /* // padding: 60px 40px; */
  width: 70vw;
  height: 100vh;
  padding-top: 70px;
`;

const DivWrapper = styled.div`
    position: fixed;
    top: ${props => props.offerPopup ? "70px" : "0px"};
    left: 0;
    width: 100%;
    align-items: center;
    color: white;
    padding: 0px 0px;
    box-sizing: border-box;
    z-index: 10;
    height: 70px;
    box-sizing: border-box;
    box-shadow: ${props => props.atHome && props.scrolledCompleteVideo ? undefined : '0 0px 20px 0 rgba(0, 0, 0, 0.50)'};
    background-color: #000000;
    /* background-color: ${props => { return props.atHome && props.scrolledCompleteVideo ? 'transparent' : '#1a1a1a' }}; */
`;


const WrapperAvatar = styled.div`
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-color: teal;
      cursor: pointer;
      overflow: hidden;
      color: #fff;
      text-align: center;
      line-height: 34px;
      font-size: 16px;
      font-weight: 600;
      img{
        max-width: 100%;
      }
`;

const LinkDiv = styled.div`
 display:flex;
`;


const LinkSubdiv = styled.div`
padding-left:21px;
display:flex;
vetical-align:middle;
ul{
    margin: 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 70px;
  }
    li{
      
      margin-right: 62px;
      font-family: Asap;
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.29;
      letter-spacing: 0.28px;
      text-align: left;
      color: #c3c3c3;
      text-transform: capitalize;
      //height: 100%; 
      a{
        text-transform: capitalize;
          align-items: center;
          display: flex;
          justify-content: center;
          line-height: 1.29;
          height: 100%; 
          letter-spacing: 0.28px; 
          font-family: Asap;
          font-weight: bold;
          color: #c3c3c3;
          &:hover{
            color: #a78b44;
          }
           &.active{
            color: #a78b44;
            border-bottom:1px solid  #a78b44;
          }  
        }
      &:last-child{
        margin-right: 0px;
      }
      @media(max-width:1150px)
      {
          margin-right:23px;
          &:last-child{
            margin-right: 0px;
          }
      }
    }

    .login{
       width: 120px;
        height: 44px;
        border-radius: 27px;
        border:1px solid #fff;
        background-color: transparent;
        display:block; 
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.4); 
        text-align: center; 
      a{ 
       
            font-family: Asap;
            font-size: 14px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 2.14;
            letter-spacing: normal;
            text-align: center;
            color: #ffffff;    
      }
      @media(max-width:1000px)
      {
        width: 90px;
      }
      @media(max-width:900px)
      {
        width: 72px;
      }
    }
    .login :hover{
      background-color: #ffffff;
      color: #000000;
      a{
        color: #000000;
      }
    }
    .login:active{
        transform: translateY(-2px);
        opacity: 0.8;
    }

    .account{
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      font-size: 14px;
      font-family: Asap;
      font-weight: bold;
      color:#c3c3c3;
      padding-right:39px;
      &:hover{
          color: #a78b44;
          .trangle_icon{
             border-color: #00aeef;
          }
          .hover_list_account{
            display: block;
          }
      }
    }
    .trangle_icon{
      display: inline-block;
      margin-left: 10px;
      width: 0px;
      height: 0px;
      transform: rotate(45deg);
      margin-top: -5px;
      transition: all 0.1s ease-in 0s;
      border-style: solid;
      border-color: rgb(255, 255, 255);
      border-image: initial;
      border-width: 0px 1px 1px 0px;
      padding: 3px;
    }

    .hover_list_account{
      display: none;
      transition: all 0.1s;
     
      position: absolute;
      top: 100%;
      right: 0px;
      width: 167px;
      height: 130px;
      background-color: #000;
      padding: 5px 20px;
      ul{
        margin: 0px;
        padding: 0px;
        padding-top: 30px;
        display: block;
      li{
        display: block;
         margin-right: 0px;
         margin-bottom: 10px;
        img{
          max-width: 23px;
          vertical-align: middle;
          margin-right: 15px;
        }
        /* line-height: 45px; */
          a{
            display: flex;
            width: 100%;
            font-size: 14px;
            font-family: Asap;
            font-stretch: normal;
            font-style: bold;
            line-height: 1.67;
            letter-spacing: normal;
            text-align: left;
            color: #c3c3c3;
            text-transform: capitalize;
            &:hover{
              color: #a78b44;
            }
          }
      }
    }
    }
`;


const LogoWrapper = styled.div`
width: 164px;
position: relative;
background-color: ${props => props.atHome && props.scrolledCompleteVideo ? 'transparent' : '#000000'};
height: 70px;

box-sizing: border-box;
 .logo_div{
   display: flex;
   height: 100%;
   width: 100%;
   flex-direction: row;
   background:#000000;
   align-items: center;
   justify-content: flex-start;
   padding: 0px 12px 0px 0px;
   @media screen and (max-width: 767px){
     padding: 0px;
   }
   box-sizing: border-box;
   cursor: pointer;
   .logo{
     max-width: 135px;
     margin-right: 10px;
   }
 }

 &:hover {
  background-color: #1a1a1a;
}

 &:hover .hover_list {
  top: 100%;
 }
 &:hover .chevron{
       transform: rotate(180deg);
 }


.chevron{
transition: all 0.1s ;
}

.hover_list{
  transition: all 0.1s ;
  position: absolute;
  top: -200px;
  left: 0px;
  width: 230px;
  height: 130px;
  background-color: #1a1a1a;
  padding: 5px 21px;
  border-bottom-right-radius: 22px;
  border-bottom-left-radius: 22px;
  .poker{
    display: inline-block;
    width: 30px;
    margin-right: 9px;
    img{
      max-width: 30px;
      vertical-align: middle;
    }
  }
  .shop{
    display: inline-block;
    width: 30px;
    text-align: center;
    margin-right: 9px;
    
    img{
      max-width: 15px;
       vertical-align: middle;
    }
  }
  ul{
    margin: 0px;
    padding: 0px;
    padding-top: 10px;
    li{
      display: block;
      line-height: 45px;
        a{
        display: block;
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        /* line-height: 1.67; */
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;
        
        }
    }
  }
}

// :after {
//   content: " ";
//   position: absolute;
//   border-left: 1px #6c757d solid;
//   top: 35%;
//   right: 0;
//   height: 30%;
//   margin-top: auto;
//   margin-bottom: auto;
// }
@media (max-width:1000px)
{
   width:153px;
}
@media (max-width:768px)
{
  width:180px;
    :after{
    
      border-left: unset; 
    }
}
`;

const DivPositionAbsolute = styled.div`
position:fixed;
left:20px;
top:25px;
z-index:115;
ul{
    li{
        i{
            color:#a78b44 !important;
        }
    }
}
`;

const ExistingUser = styled.span` 
    font-family: SuisseIntl;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.5;
    letter-spacing: normal;
    text-align: left;
    color: #aaaaaa; 
    height: 100%;
    display: flex;
    justify-content: center; 
    align-items: center;
`;

const ButtonLoginSmall = styled.button` 
    position:fixed;
    right:21px;
    top:15px;
    width: 108px;
    height: 44px;
    border:1px solid #fff;
    border-radius: 29px; 
    background:transparent;  
    font-family: SuisseIntl-bold;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.5;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff; 
    cursor:pointer;
    :hover{
      background:#ffffff; 
      color: #000000; 
    }
`;

let scrollTop = '';
export const Overlay = styled.div`
 position: fixed;
 z-index:112;
 top: 0;
 right: 0;
 width: 30%;
 height: 100%;
 background: rgba(0, 0, 0, 0.1);
 `;

const OnHoverNavbarMainDiv = styled.div`
 width:100%;
 height: 48px;
 box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
 background-color: #333333; 
 padding-left:245px;
 display:${props => props.display ? props.display : "none"};

 @media(max-width:1000px)
 {
  padding-left: 204px;
 }
 `;


const OnHoverNavbarLinkDiv = styled.div`
 width:100%;
 height: 48px;

 background-color: #333333;  
 display:flex;  
 `;

const HoverLink = styled.div`
 height:100% ;
 width :${props => props.Linkwidth ? props.Linkwidth : "142px"};
 margin-right:42px;
 &:last-child{
  margin-right:0px;
    }
 a{
   width:100%;
  height:100% ;
  font-family: SuisseIntl-bold;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: 0.28px;
  text-align: left;
  color:${props => props.color ? props.color : "#c3c3c3"} ; 
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:center;

  &:hover{
    color: #a78b44 ; 
  }
  border-bottom:${props => props.borderbotom === true ? "2px solid #a78b44" : "unset"} ;
 
 }
 `;

const WatchLessonOnHover = styled.div`
 width:auto;
  height: 70px;
  padding:0px 23px 0px 23px;
  margin-right:39px;
  background-color:${props => props.ActiveHover === true ? "#333333" : "#000000"};
  display:flex; 
  justify-content:center;
  align-items:center;
  text-align:center;
  font-family: SuisseIntl-bold;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: 0.28px;
  text-align: left;
  color: #c3c3c3;
  cursor:pointer;
  @media(max-width:1150px)
  {
    padding:0px 10px 0px 10px;
    margin-right:13px; 
  }
   
 
 `;


const CompanyNameDiv = styled.div`
    width:72%;
    height:auto;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    font-family:Asap;
    font-size:26px;
    font-weight:bold;
    
 `;


export class AppHeader extends Wrapper {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      removeIcon: false,
      scrolling: 0,
      windowInnerHeight: window.innerHeight,
      onHoverActive: false,
      WorkingLink: [
        {
          pathname: "/corporateCoordinator",
          tab: "Dashboard",
          pageName: 'Dashboard',
          url: "/corporateCoordinator/Dashboard",
          isVisible: true,
          ApplicableFor: 'Working'
        },
      ],
    }
  }

  handleClickOutside() {
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false });
    }
  }

  togglemenuOpen() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  _linkClicked = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }


  componentDidMount() {
    this.setState({
      ...this.state,
      windowInnerHeight: window.innerHeight
    })

    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('screen', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('screen', this.handleScroll);
  }

  LoginbuttonClick = (e) => {
    this.props.toggleAuth();

  }

  OnMouseEnterHoverClassAtive = () => {
    this.setState({ onHoverActive: true })
  }
  OnMouseEnterLeaveClassAtive = () => {
    setTimeout(() => {
      this.setState({ onHoverActive: false })
    }, 200);

  }

  handleScroll = (event) => {
    this.scrollTop = window.scrollY > 50

    this.setState({
      removeIcon: false,
      scrolling: window.scrollY
    });
  }


  render() {

    const { data, router } = this.props;
    const user = this.loggedUser();
    const userRole = this.getLoggedUserRole()
    const LoggedUserRole = userRole && JSON.parse(userRole);
    const loggedIn = this.isLoggedIn();
    const small = this.props.width < 768;
    const smallTab = this.props.width < 1000 && this.props.width > 768;
    const windowInnerHeight = this.state.windowInnerHeight;
    const companyName = user && user.plantMaster && user.plantMaster.plantCode;
    let profilePic = ""; //config.RECONCILIATION_URL + constants.END_POINTS.IMAGES + user.profilePic;
    //   const DataRole = LoggedUserRole && JSON.parse(LoggedUserRole.roleName)

    const RoleName = LoggedUserRole && LoggedUserRole.roleName;
    let Right = smallTab ? "45px" : "60px";
    // console.log("User between ", user)
    const { WorkingLink } = this.state;
    return (
      <div>
        <Head>
          <link rel="icon" href={'~/static/favico.png'} />
        </Head>
        <DivWrapper offerPopup={this.props.offerPopup} atHome={router && router.pathname === '/' ? true : false} scrolledCompleteVideo={this.state.scrolling < 20 ? true : false}>
          <MainDiv>
            <LinkDiv>
              <LogoWrapper atHome={router && router.pathname === '/' ? true : false} scrolledCompleteVideo={this.state.scrolling < 20 ? true : false}>
                <div className="logo_div">
                  <a href={"/switch-role"}>
                    <img className="logo" src="../../static/AnandGroup.png" title="Anand Group" alt="logo" />
                  </a>
                </div>
              </LogoWrapper>
              <LinkDiv
                padding="10px 30px 20px 30px"
                isVisible={true}
                className={style.show_hand} onClick={() => {
                  this.props.router.push(
                    {
                      pathname: "/corporateCoordinator",
                      tab: 'dashboard',
                      query: {
                        tab: 'dashboard',
                        id: undefined,
                        pageName: 'Dashboard'
                      }
                    },
                    "/corporateCoordinator"
                  );
                }}
              >

                Dashboard
              </LinkDiv>
              <CompanyNameDiv>
                {companyName} &nbsp;
                {RoleName &&
                  <>
                    ( {RoleName} )
                 </>
                }
                {/* {companyName} ( {RoleName} ) */}
              </CompanyNameDiv>
              <LinkDiv>
                <LinkSubdiv scrollTop={this.scrollTop}>

                  <ul style={{ marginLeft: '100px', position: "absolute", right: Right }}>
                    <Link href='#'>
                      <div className="account">
                        <WrapperAvatar>
                          <React.Fragment>
                            {user && user.firstName && user.firstName.substring(0, 1)}{user && user.lastName && user.lastName.substring(0, 1)}
                          </React.Fragment>
                        </WrapperAvatar>
                          &nbsp;&nbsp;&nbsp;&nbsp;Account
                        <div className="trangle_icon"></div>
                        <div className="hover_list_account">
                          <ul>
                            <li>
                              <Link
                                href={{
                                  pathname: '/switch-role',
                                  query: {
                                    page: 'switch-role'
                                  },
                                }}
                                as={`/my-account`}>
                                <a>
                                  <div>
                                    <img src={"user-white.png"} alt="" />
                                  </div>
                                  My Info
                              </a>
                              </Link>
                            </li>
                            <li onClick={() => {
                              return (
                                this.killUser(),
                                this.props.registerAccountInit(),
                                this.props.logoutUser(undefined),
                                setTimeout(() => {
                                  this.props.router.push("/")
                                }, 500)
                              )
                            }}><Link href="/">
                                <a><div><img src={"logout-white.png"} alt="" /></div>Logout</a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Link>
                  </ul>
                </LinkSubdiv>
              </LinkDiv>
            </LinkDiv>
          </MainDiv>
        </DivWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { type, error, data } = state.accountReducer;
  const user = state.accountReducer.data;
  const width = state.windowReducer.width;


  return { type, error, data, user, width };
};

export default withRouter(connect(mapStateToProps, { dispatchUserInfo, logoutUser, openAuthWindow, disableAnalyticTracking, registerAccountInit })(AppHeader));
