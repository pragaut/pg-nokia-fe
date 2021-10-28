import React, { Component } from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import Wrapper from '../../../components/shared/Wrapper';
import AppHeader from "../../../components/comman/appHeader";
import AdminAppHeader from "../../../components/comman/appHeader/sideBar";
import LoggedInUserHeader from ".././appHeader/loggedInUserHeader";
import { showNotification } from "../../../actions/comman/common.actions";
import HeadTag from './headTag';


class Header extends Wrapper {
  state = {
    showMyCourse: false,
    authOpen: false,
    isSignup: 0,
    socialauth: "yes",
    isSocialAuthVisible: true,
    isWelcomeScreenVisible: false,
    isWelcomeScreenCompleted: false,
    isWelcomebackvisible: false,
    IsClickedFromHeader: false,
  };



  render() {

    //console.log("data : ",this.props.data);

    return (
      <div>
        <HeadTag
          router={this.props.router}
          chapter={this.props.chapter}
          coursesForHead={this.props.coursesForHead}
        />
        
        {this.props.layout === "admin" &&
          <AdminAppHeader
            router={this.props.router}
            isLoggedIn={this.props.isLoggedIn}
            toggleAuth={this.openWindow}
            IsClickedFromHeader={this.state.IsClickedFromHeader}
            home={this.props.home}
           
            offerPopup={this.props.offerPopup}
            gifthAuth={this.openWindow} 
            pageActive={this.props.pageActive}
          />
        }
        {this.props.layout === "loggedUser" &&
          <LoggedInUserHeader
            router={this.props.router}
            isLoggedIn={this.props.isLoggedIn}
            toggleAuth={this.openWindow}
            IsClickedFromHeader={this.state.IsClickedFromHeader}
            home={this.props.home} 
            offerPopup={this.props.offerPopup}
            gifthAuth={this.openWindow} 
            pageActive={this.props.pageActive}
          />
        }
        {this.props.layout === "home" &&
          <AppHeader
            router={this.props.router}
            isLoggedIn={this.props.isLoggedIn}
            toggleAuth={this.openWindow}
            IsClickedFromHeader={this.state.IsClickedFromHeader}
            home={this.props.home} 
            offerPopup={this.props.offerPopup}
            gifthAuth={this.openWindow} 
            pageActive={this.props.pageActive}
          />
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  const { type, error, data } = state.accountReducer;

  return { type, error, data };

};

export default withRouter(
  connect(
    mapStateToProps,
    { showNotification ,connect}
  )(Header)
);
