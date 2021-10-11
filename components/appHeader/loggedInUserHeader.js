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
import * as NavStyle from '../commonStyle/layoutStyle';
import Gap from "../Gap";
function lazyWithPreload(factory) {
    const Component = React.lazy(factory);
    Component.preload = factory;
    return Component;
}
const style = lazyWithPreload(() => import("../../static/scss/main.scss"));


export class AppHeader extends Wrapper {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
       // this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            menuOpen: false,
            removeIcon: false,
            scrolling: 0,
            windowInnerHeight: window.innerHeight,
            onHoverActive: false,
            isProfileVisible: false,
            isWorkingLinkVisible: false,
            WorkingLink: [
                {
                    pathname: "/corporateCoordinator",
                    tab: "Dashboard",
                    pageName: 'Dashboard',
                    url: "/corporateCoordinator",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'Corporate_Coordinator'
                },
                // {
                //     pathname: "/corporateCoordinator",
                //     tab: "self-audit-planning",
                //     pageName: 'Self Audit Plan',
                //     id: 'dv-PG_krkc36z4krkc3al2',
                //     auditFlowMasterId: 'ac7d34b0-crcvxcgdslsunita',
                //     url: "/corporateCoordinator/self-audit-planning",
                //     isVisible: true,
                //     ApplicableFor: 'Working',
                //     roleCode: 'Corporate_Coordinator'
                // },
                {
                    pathname: "/corporateCoordinator",
                    tab: "self-audit-planning-details",
                    pageName: 'Self Audit Plan Details',
                    url: "/corporateCoordinator/self-audit-planning-details",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'Corporate_Coordinator'
                },
                // {
                //     pathname: "/corporateCoordinator",
                //     tab: "self-audit-reschedule",
                //     pageName: 'Self Audit Reschedule',
                //     id: 'dv-PG_krkc36z4krkc3al2',
                //     auditFlowMasterId: 'ac7d34b0-crcvxcgdslsunita',
                //     url: "/corporateCoordinator/self-audit-reschedule",
                //     isVisible: true,
                //     ApplicableFor: 'Working',
                //     roleCode: 'Corporate_Coordinator'
                // },
                {
                    pathname: "/corporateCoordinator",
                    tab: "final-audit-planning",
                    pageName: 'Final Audit Plan',
                    //id: 'dv-PG_krkc36z4krkc3al2',
                    //  auditFlowMasterId: 'ac7d34b0-crcvxcgdslsunita',
                    url: "/corporateCoordinator/final-audit-planning",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'Corporate_Coordinator'
                },
                {
                    pathname: "/corporateCoordinator",
                    tab: "view-final-audit-action-plan",
                    pageName: 'View Final Audit Action Plan',
                    //id: 'dv-PG_krkc36z4krkc3al2',
                    //  auditFlowMasterId: 'ac7d34b0-crcvxcgdslsunita',
                    url: "/corporateCoordinator/view-final-audit-action-plan",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'Corporate_Coordinator'
                },
                {
                    pathname: "/corporateCoordinator",
                    tab: "view-action-plan-monthly-review",
                    pageName: 'Action Plan Monthly Review',
                    //id: 'dv-PG_krkc36z4krkc3al2',
                    //  auditFlowMasterId: 'ac7d34b0-crcvxcgdslsunita',
                    url: "/corporateCoordinator/view-action-plan-monthly-review",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'Corporate_Coordinator'
                },
                {
                    pathname: "/corporateCoordinator",
                    tab: "change-password",
                    pageName: 'Change Password', 
                    url: "/corporateCoordinator/change-password",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'Corporate_Coordinator'
                },
                {
                    pathname: "/plantHrHead",
                    tab: "Dashboard",
                    pageName: 'Dashboard',
                    url: "/plantHrHead",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'PlantHRHead'
                },
                {
                    pathname: "/plantHrHead",
                    tab: "self-vs-final-Score",
                    pageName: 'Self V/s Final Score',
                    url: "/plantHrHead",
                    isVisible: true,
                    ApplicableFor: 'Report',
                    roleCode: 'PlantHRHead'
                },
                {
                    pathname: "/plantHrHead",
                    tab: "demo-highChart",
                    pageName: 'Demo High Chart',
                    url: "/plantHrHead/demo-highChart",
                    isVisible: true,
                    ApplicableFor: 'Report',
                    roleCode: 'PlantHRHead'
                },
                {
                    pathname: "/plantHrHead",
                    tab: "change-password",
                    pageName: 'Change Password', 
                    url: "/plantHrHead/change-password",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'PlantHRHead'
                },
                 {
                    pathname: "/auditor",
                    tab: "Dashboard",
                    pageName: 'Dashboard',
                    url: "/auditor",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'Auditor'
                },
                {
                    pathname: "/auditor",
                    tab: "change-password",
                    pageName: 'Change Password', 
                    url: "/auditor/change-password",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'Auditor'
                },
                {
                    pathname: "/management",
                    tab: "change-password",
                    pageName: 'Change Password', 
                    url: "/management/change-password",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'Management'
                },
                {
                    pathname: "/companyHRHead",
                    tab: "Dashboard",
                    pageName: 'Dashboard',
                    url: "/companyHRHead",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'companyHRHead'
                },
                {
                    pathname: "/companyHRHead",
                    tab: "change-password",
                    pageName: 'Change Password', 
                    url: "/companyHRHead/change-password",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'companyHRHead'
                },
                {
                    pathname: "/subAdmin",
                    tab: "change-password",
                    pageName: 'Change Password', 
                    url: "/subAdmin/change-password",
                    isVisible: true,
                    ApplicableFor: 'Working',
                    roleCode: 'subAdmin'
                },
            ],
        }
    }

    // handleClickOutside() {
    //     if (this.state.menuOpen) {
    //         this.setState({ menuOpen: false });
    //     }
    // }

    togglemenuOpen() {
        this.setState({ menuOpen: !this.state.menuOpen });
    }
    toggleprofileOpen() {
        //alert(!this.state.isProfileVisible);
        this.setState({ isWorkingLinkVisible: false, isProfileVisible: !this.state.isProfileVisible });
    }
    toggleWorkingLinkOpen() {
        //alert(!this.state.isProfileVisible);
        this.setState({ isProfileVisible: false, isWorkingLinkVisible: !this.state.isWorkingLinkVisible });
    }
    activeHeaderLinkClose() {
        //alert(!this.state.isProfileVisible);
        this.setState({ isProfileVisible: false, isWorkingLinkVisible: false});
    }
    _linkClicked = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
    }


    componentDidMount() {
        this.setState({
            ...this.state,
            windowInnerHeight: window.innerHeight
        })
        document.addEventListener('mousedown', this.handleClickOutside);
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        window.addEventListener('screen', this.handleScroll, { passive: true });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('screen', this.handleScroll);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    LoginbuttonClick = (e) => {
        this.props.toggleAuth();

    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            // alert('You clicked outside of me!');
            this.activeHeaderLinkClose();
        }
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
        const smallTab = this.props.width < 1000 && this.props.width > 768;
        const ActiveTabname = router && router.query && router.query.tab;
        const userName = user && user.employeeName ;
        let Right = smallTab ? "45px" : "60px";
        // console.log("User between ", user)
        const { WorkingLink, isProfileVisible, isWorkingLinkVisible } = this.state;
     
        return (
            <div>
                <Head>
                    <link rel="icon" href={'~/static/favico.png'} />
                </Head>
                <NavStyle.MainNav ref={this.wrapperRef} offerPopup={this.props.offerPopup} atHome={router && router.pathname === '/' ? true : false} scrolledCompleteVideo={this.state.scrolling < 20 ? true : false}>
                    <NavStyle.SubMainNav>
                        <NavStyle.LogoDiv
                            marginRight={"20px"}
                        >
                            <a href={"/switch-role"}>
                                <img className="logo" src="../../static/application_logo.png" title="Nokia Group" alt="logo" />
                            </a>
                        </NavStyle.LogoDiv>
                   
                        <NavStyle.LogoDiv
                            bgColor={isProfileVisible === true ? 'transparent' : 'transparent'}                           
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.toggleprofileOpen()}
                        >
                            <img className="sideLogo" src="../../static/logout-icon-256.png" title="logout" alt="logo" />

                            <NavStyle.ProfileDiv
                                className="account"
                                isVisible={isProfileVisible === true ? true : undefined}
                            >
                                <div className="hover_list_account">
                                    <ul style={{ listStyle: 'none', paddingLeft: '10px', }}>
                                        <li style={{ paddingBottom: '20px', color: '#f6d613', fontSize: '16px', fontWeight: 'bold' }}>
                                            {userName}
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
                                                <a style={{ fontWeight: '900' }}> Logout</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </NavStyle.ProfileDiv>
                        </NavStyle.LogoDiv>
                    </NavStyle.SubMainNav>
                </NavStyle.MainNav >
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
