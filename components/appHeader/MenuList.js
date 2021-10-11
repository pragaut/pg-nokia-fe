import React from "react";
//import { dispatchUserInfo, logoutUser } from "../../actions/account.actions";
import Link from "next/link";
import styled from "styled-components";
import { connect } from "react-redux";
// import Gap from "../../Gap";
import { disableAnalyticTracking, openAuthWindow } from '../../actions/window.actions';
import Wrapper from "../shared/Wrapper";
import Gap from "../Gap";

const Image = '../static/images/icon/'
// @Bc123

const MenuWrapper = styled.div`
    width: 100%;
    background:#000;
    position: relative;
    height: calc(100vh - 70px);
    ul{


        margin: 0px;
        display: flex;
        flex-direction: column;
        position: relative;
  }
    li{
     
        font-family:SuisseIntl-bold;
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.29;
        letter-spacing: 0.28px;
        text-align: left;
        color: #ffffff;
        text-transform: capitalize;
        // border-bottom: 1px solid #1a1a1a;
        display: block;
        // padding-bottom:28px;
        a{
           // padding: 0px 20px  0px 20px;
            font-family:SuisseIntl-bold;
            font-size: 14px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.29;
            letter-spacing: 0.28px;
            text-align: left;
            text-transform: uppercase;
          //  margin-bottom:28px;
            color: #c3c3c3;
                 display: block;
                 &.active{
                    color: #a78b44; 
                  } 
        }
        &:last-child{
            margin-right: 0px;
        }
    }
   
    

    .copy_right{
        padding-left:20px;
          font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 5;
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;
        position: absolute;
        bottom: 0px;
        border-top: 1px solid #1a1a1a;
        width: 90%;
    }
`;

const SubMenuMainDiv = styled.div`
padding:  ${props => props.padding ? props.padding : (props.isActive === true) ? '15px 20px 0px 20px' : '0px 20px 0px 20px'};
    width: 100%; 
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
    background-color: ${props => props.isActive === true ? '#333333' : 'transparent'};
`;

const MenuItems = styled.div`
font-family: SuisseIntl-bold;
min-height:20px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: 0.28px;
  text-align: left;
  text-transform:uppercase;
  color:  ${props => props.isActive === true ? '#a78b44' : '#c3c3c3;'} ;
    padding-bottom:28px;
  .imgDown{
    margin-left:9px;
    width: 6px;
    height: 12px;
    transform: rotate(90deg);
  }
  .imgUp{
      margin-left:9px;
    width: 6px;
    height: 12px;
    transform: rotate(-90deg);
  }
`;

const PremiumLinkIcon = styled.div` 
 
  width:100%;
  display:flex;
  justify-content:flex-end;
  .premiumDiv{
    padding:0px 3px 0px 3px;
    position:absolute;
    height: 18px;
    margin-right: 24px;
    margin-top: -12px;
    min-width:18px;
    background-color: #a78b44; 
    display:flex;
    align-items:center;
    justify-content:center; 
    border-radius: 7px; 
  }
  div{
    display : block;
    margin-left:5px;
    font-family: SuisseIntl-bold;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.1;
    letter-spacing: normal;
    text-align: left;
    color: #ffffff;
  }
  img{
    width: 12px;
    height: 12px;
  }
 `;


class MenuList extends Wrapper {
    state = {
        men: false,
        gift: false,
        women: false,
        accessories: false,
        account: false,
        shop: true,
        WatchLessonActive: false,
        PokerResourceActive: false,
    };

    closeMenu = () => {
        this.setState({ open: false });
    };

    logoutRequest = () => {
        this.killUser();
        //this.props.dispatchUserInfo({});
        this.props.logoutUser({}),
            setTimeout(() => {
                this.props.router.push(
                    {
                        pathname: "/",
                        query: {
                            page: "home"
                        }
                    },
                    "/"
                );
            }, 200);
    };



    liClicked = category => () => {
        this.setState({
            active: category
        });

        if (category === "logout") {
            this.logoutRequest();
        }

        this.props.clickHandler();
    };


    logoutRequest = () => {
        this.killUser();
        //this.props.dispatchUserInfo({});
        this.props.logoutUser({}),
            setTimeout(() => {
                this.props.router.push(
                    {
                        pathname: "/",
                        query: {
                            page: "home"
                        }
                    },
                    "/"
                );
            }, 200);
    };
    showHandler = (key) => {
        const { WatchLessonActive, PokerResourceActive } = this.state;
        const Value_WatchLessonActive = WatchLessonActive === true ? false : true;
        const Value_PokerResourceActive = PokerResourceActive === true ? false : true;

        if (key === "WatchLessonActive" && PokerResourceActive === true && WatchLessonActive === false) {
            this.setState({
                WatchLessonActive: Value_WatchLessonActive,
                PokerResourceActive: false
            })
        }
        else if (key === "PokerResourceActive" && PokerResourceActive === false && WatchLessonActive === true) {
            this.setState({
                WatchLessonActive: false,
                PokerResourceActive: Value_PokerResourceActive
            })
        }
        else {
            this.setState({
                [key]: !this.state[key],
            })
        }
    }

    render() {
        const { logoutRequest } = this.props;
        const { WatchLessonActive, PokerResourceActive } = this.state;
        const loggedIn = this.props.loggedIn;
        const user = this.loggedUser();
        const isSubscribed = (user && user.subscription && user.subscription.subscriptionStatus === 'active');
        // const IsPricingPlantLinkVisible = isSubscribed ? (user && user.subscription && (user.subscription.planId === 'dv-tbs_k5wbqvick5wbr749' || user.subscription.planId === 'dv-tbs_k5wbs7wyk5wbtwan')) : true;
        let isActivePage = this.props.pageActive === "lessonLibrary" || this.props.pageActive === "playNexplain" ? true : false;
        let isPokerResourcesActivePage = this.props.pageActive === "pokerGlossary" || this.props.pageActive === "handRangeChart" ? true : false;
        const WatchLessonActiveLink = (WatchLessonActive === true || isActivePage === true) && (!PokerResourceActive || PokerResourceActive === false)  ? true : false;
        const PokerResourseActiveLink = (isPokerResourcesActivePage === true || PokerResourceActive === true) && (!WatchLessonActive || WatchLessonActive === false ) ? true : false;

        return (
            <MenuWrapper>
                <ul>
                    {!this.props.hideLesson &&
                        <li>
                            <Gap h="40px" />
                            <SubMenuMainDiv
                                padding="15px 20px 0px 20px"
                                isActive={WatchLessonActiveLink}>
                                <MenuItems
                                    onClick={() => this.showHandler('WatchLessonActive')}
                                    isActive={WatchLessonActiveLink}>
                                    Watch Lessons
                                    {WatchLessonActiveLink === true ?
                                        <img className="imgUp" src={Image + "playIcon_a78b44.svg"} alt="Open" />
                                        :
                                        <img className="imgDown" src={Image + "Play_c3c3c3.svg"} alt="close" />
                                    }
                                </MenuItems>
                                {WatchLessonActiveLink === true &&
                                    <>
                                        <MenuItems
                                            onClick={() => {
                                                if (this.props.clickHandler) {
                                                    this.props.clickHandler();
                                                }
                                            }}
                                        >
                                            <Link href={{ pathname: '/courseList', query: { page: 'courseList', socialauth: `${this.props.socialauth}` } }} as='/poker-lesson'><a className={this.props.pageActive === "lessonLibrary" ? "active" : ""}>Lessons Library</a></Link>
                                        </MenuItems>
                                        <MenuItems
                                            onClick={() => {
                                                if (this.props.clickHandler) {
                                                    this.props.clickHandler();
                                                }
                                            }}
                                        >
                                            <Link href={{ pathname: '/PlayNExplain', query: { page: 'PlayNExplain', socialauth: `${this.props.socialauth}` } }} as='/play-n-explain'><a className={this.props.pageActive === "playNexplain" ? "active" : ""}>PLAY & EXPLAIN</a></Link>
                                        </MenuItems>
                                    </>
                                }
                            </SubMenuMainDiv>
                            <SubMenuMainDiv
                                padding={WatchLessonActiveLink === true || PokerResourseActiveLink === true ? '15px 20px 0px 20px' : '0px 20px 0px 20px'}
                                isActive={PokerResourseActiveLink}>
                                <MenuItems
                                    onClick={() => this.showHandler('PokerResourceActive')}
                                    isActive={PokerResourseActiveLink}>
                                    Poker Resources
                                        {PokerResourseActiveLink === true ?
                                        <img className="imgUp" src={Image + "playIcon_a78b44.svg"} alt="Open" />
                                        :
                                        <img className="imgDown" src={Image + "Play_c3c3c3.svg"} alt="close" />
                                    }
                                </MenuItems>
                                {PokerResourseActiveLink === true &&
                                    <>
                                        <MenuItems
                                            onClick={() => {
                                                if (this.props.clickHandler) {
                                                    this.props.clickHandler();
                                                }
                                                if (loggedIn) {
                                                    this.props.router.push({
                                                        pathname: '/pokerGlossary',
                                                        query: {
                                                            page: 'pokerGlossary',
                                                        }
                                                    }, `/`, 'poker-Glossary',
                                                    );
                                                }
                                                else {
                                                    this.saveOnGlossaryPageLink('Yes');
                                                    this.setState({ IsSelectedPokerGlossaryActive: true });
                                                    this.props.openAuthWindow();
                                                }

                                            }}
                                        >
                                            <Link href='#' as='/poker-Glossary'><a className={this.props.pageActive === "pokerGlossary" ? "active" : ""}>POKER GLOSSARY</a></Link>
                                        </MenuItems>
                                        {/* <MenuItems> */}
                                        {isSubscribed
                                            ?
                                            <MenuItems
                                                onClick={() => {
                                                    if (this.props.clickHandler) {
                                                        this.props.clickHandler();
                                                    }
                                                }}
                                            >
                                                <Link href={{ pathname: '/handRangeChart', query: { page: 'handRangeChart', socialauth: `${this.props.socialauth}` } }} as='/hand-range-chart'><a className={this.props.pageActive === "handRangeChart" ? "active" : ""}>HAND RANGE  CHARTS</a></Link>
                                            </MenuItems>
                                            :
                                            <>
                                                <MenuItems>
                                                    <PremiumLinkIcon>
                                                        <div className="premiumDiv">
                                                            <img src={Image + "Crown.svg"} alt="Crown" />
                                                            <div>
                                                                PREMIUM
                                                                </div>
                                                        </div>
                                                    </PremiumLinkIcon>
                                                HAND RANGE  CHARTS
                                            </MenuItems>
                                            </>
                                        }
                                        {/* <Link href={{ pathname: '/handRangeChart', query: { page: 'handRangeChart', socialauth: `${this.props.socialauth}` } }} as='/hand-range-chart'><a className={this.props.pageActive === "handRangeChart" ? "active" : ""}>Hand Range Charts</a></Link>
                                        </MenuItems> */}
                                    </>
                                }
                            </SubMenuMainDiv>
                            <SubMenuMainDiv
                                onClick={() => {
                                    if (this.props.clickHandler) {
                                        this.props.clickHandler();
                                    }
                                }}
                                padding={PokerResourseActiveLink === true ? '15px 20px 0px 20px' : '0px 20px 0px 20px'}
                            >
                                {!isSubscribed &&
                                    <MenuItems>
                                        <Link href={{ pathname: '/subscriptionPlans', query: { page: 'subscriptionPlans', socialauth: `${this.props.socialauth}` } }} as='/pricing-plans'><a className={this.props.pageActive === "pricingplan" ? "active" : ""}>Pricing Plans</a></Link>
                                    </MenuItems>
                                }
                                {this.props.pageActive !== "pricingplan" &&
                                    <MenuItems>
                                        <Link href={{ pathname: '/subPlansSubscription', query: { page: "PlanSubscription", planId: "dv-tbs_k5wbsjwrk5wbti0g", socialauth: `${this.props.socialauth}` } }} as='/poker-personalized-coaching' ><a className={this.props.pageActive === "coaching" ? "active" : ""}>Personalised Coaching</a></Link>
                                    </MenuItems>

                                }
                            </SubMenuMainDiv>



                            {/* <li><Link><a target="_blank" href="https://pokeruniversity.thebigstack.com/subPlansSubscription?planId=dv-tbs_k5wbsjwrk5wbti0g">Personalised Coaching</a></Link></li> */}
                            {/* {this.props.router && this.props.router.query && this.props.router.query.planId ?
                            <Link href="#"><a>Personalised Coaching</a></Link>
                            : null
                        } */}
                        </li>
                    }
                    <SubMenuMainDiv>


                        {loggedIn && <li onClick={() => {
                            if (this.props.clickHandler) {
                                this.props.clickHandler();
                            }
                        }}>
                            <MenuItems>
                                <Link href={{ pathname: '/profile', query: { page: 'profile' } }} as='/my-account'><a>Account</a></Link>
                            </MenuItems>


                        </li>}
                        {!loggedIn ? <li onClick={(event => {
                            this.props.toggleAuth(event);
                            if (this.props.clickHandler) {
                                this.props.clickHandler();
                            }

                        })}>
                            <Link href={{ pathname: '/', query: { socialauth: this.props.socialauth } }}>
                                <a></a>
                            </Link></li>
                            :
                            <li><Link href={{ pathname: '/' }}><a onClick={this.logoutRequest}>LogOut</a></Link></li>}
                    </SubMenuMainDiv>
                </ul>
                <p className="copy_right">©2020. All rights reserved</p>
            </MenuWrapper>
        );
    }
}


const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, { openAuthWindow })(MenuList);


