import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Wrapper from '../../shared/Wrapper';
import { withRouter } from 'next/router';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../comman/commonStyle';
import { saveRoleDetailsOfLoggedUser } from '../../../utils/session.helper'
import Gap from '../../comman/Gap'
import LoginForm from '../auth'

const SwitchDiv = styled.div`
    //width:100%;
    min-height : 500px;
    color : #000;
    z-index:150;
    //padding:50px; 
    display: flex;
    justify-content:center;
    align-items:center;
    a{
        width:100%;
        margin: 10px;
        max-height: 200px;
        display: flex;
    }  
`;


const ButtonDivc = styled.div`
 
    border-radius: 10px;
    background-color: #008080;
    border: none;
    color: #FFFFFF;
    height : 45px;
    align-items: center;
    display: flex; 
    justify-content: center;
    text-align: center;
    font-size: 20px;
    padding: 4px;
    width: 100%;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px; 
  
    div {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }
  
  div:after {
    content: '\\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }
  
  &:hover div {
    padding-right: 25px;
  }
  
  &:hover div:after {
    opacity: 1;
    right: 0;
  }
`;

const RoleDiv = styled.div`
     
    width: 100%;
     height : 50px;
    border:1px solid teal;
    color : #fff;
    align-items:center;
    display:flex;
    text-align:center;
    justify-content:center;
    border-radius:20px;
    padding:5px;
    background-color: teal;
    a{
        width:100% !important;
    }
    div{
        font-size:30px;         
    }
    span{           
        font-size:15px; 
        color:#333; 
    } 
    p{           
        font-size:25px;  
    } 
    &:hover{
        color : teal;
        background-color: #fff;
    }
`;
const WrapperAvatar = styled.div`
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: teal;
      cursor: pointer;
      overflow: hidden;
      display:flex;
      justify-content:center;
      align-items:center;
      text-align: center;
      color: #fff;
      line-height: 0.2;
      font-size: 36px;
      font-weight: 600;
      img{
        max-width: 100%;
      }
`;


class banner extends Wrapper {
    state = {
    }

    componentDidMount() {
        const isLoggedIn = this.isLoggedIn();
        if (isLoggedIn) {
            //this.props.getCurrentUserSessionDetails();
        }
        else{
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

    }

    HeadingMasterDiv = props => {
        return <CommonStyle.MainDiv
            width={props.width ? props.width : "90%"}
            padding="10px 0px"
        >
            <CommonStyle.TextDiv
                width={props.headingwidth ? props.headingwidth : "35%"}
                fontsize="18px"
                color="#fff"
            >
                {props.headingname}
            </CommonStyle.TextDiv>
            <CommonStyle.TextDiv
                width={props.Colanwidth ? props.Colanwidth : "5%"}
                fontsize="18px"
                color="#fff"
            >
                :
            </CommonStyle.TextDiv>
            <CommonStyle.TextDiv
                width={props.valuewidth ? props.valuewidth : "60%"}
                fontsize="15px"
                fontWeight="normal"
                color="#fff"
                textalign={"left"}
                style={{ textTransform: 'capitalize' }}

            >
                {props.valuename}
            </CommonStyle.TextDiv>
        </CommonStyle.MainDiv>
    }

    onClickAnchar = async (data, url) => {
        saveRoleDetailsOfLoggedUser(data);
        setTimeout(() => {
            setTimeout(() => {
                window.location.href = '/' + url;
            }, 100);
        }, 100);
    }

    render() {

        const small = this.props.width < 768;

        let loggedIn = this.isLoggedIn();
        //console.log("loggedIn : ", loggedIn);
        let loggedUser = this.loggedUser();
        let plantMasterId = this.getFromSession(constants.SESSION_KEYS.PLANT_ID);
        
        console.log("loggedUser : ", loggedUser);

        return (
            <SwitchDiv>
                <CommonStyle.MainDiv
                    width="70%"
                    height="400px"
                >
                    <CommonStyle.MainDiv
                        width="40%"
                        height="100%"
                        flexdirection="column"
                        bgColor="#c0eaf0"
                        justifycontent="center"
                        padding="0px 20px"
                    >

                        {/* <WrapperAvatar>
                        <React.Fragment>
                            {loggedUser && loggedUser.firstName && loggedUser.firstName.substring(0, 1)}{loggedUser && loggedUser.lastName && loggedUser.lastName.substring(0, 1)}
                        </React.Fragment>
                    </WrapperAvatar> */}
                        <CommonStyle.TextDiv
                            width="100%"
                            justifycontent="center"
                            fontsize="35px"
                            color="#000"
                        // style={{textTransform:'uppercase'}}

                        >
                            Switch Role
                    </CommonStyle.TextDiv>

                        {loggedUser && loggedUser.userRoles.length > 0 && loggedUser.userRoles.map((data, Index) => {
                            console.log("Data : ", data);
                            return (
                                <a style={{ margin: '1px' }} href="#" 
                                    onClick={() => this.onClickAnchar(data && data.roleMaster, (data && data.roleMaster ? data.roleMaster.dashboardUrl : "switch-role"))}
                                >
                                    <ButtonDivc
                                        id={Index} key={Index} >
                                        <div
                                            style={{ marginTop: '-10px' }}
                                        ><b>{data && data.roleMaster.roleName}</b></div>
                                        <br /><br /><br />
                                    </ButtonDivc>
                                </a>
                            )
                        })}
                    </CommonStyle.MainDiv>
                    <CommonStyle.MainDiv
                        width="60%"
                        height="100%"
                        justifycontent="center"
                        flexdirection="column"
                        bgColor="teal"
                    >

                        <this.HeadingMasterDiv
                            headingname="Name"
                            valuename={loggedUser && loggedUser.employeeName}
                        />
                       
                        <this.HeadingMasterDiv
                            headingname="Email"
                            valuename={loggedUser && loggedUser.email}
                        />
                        <this.HeadingMasterDiv
                            headingname="Mobile"
                            valuename={loggedUser && loggedUser.mobile}
                        />
                      
                    </CommonStyle.MainDiv>

                </CommonStyle.MainDiv>
            </SwitchDiv>
        );
    }
}





const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    const { type, error, data } = state.accountReducer;

    return { width, type, error, data };
};


export default withRouter(connect(mapStatetoProps, { saveRoleDetailsOfLoggedUser })(banner));
