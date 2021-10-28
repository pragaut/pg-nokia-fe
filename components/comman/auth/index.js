import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Wrapper from '../../shared/Wrapper';
import { withRouter } from 'next/router';
import { Input, Button, InputDiv } from '../../comman/formStyle'
import * as CommonStyle from '../../comman/commonStyle';
import * as actionTypes from '../../../action-types/comman/account.action.types';
import { login, login_social,forgotPasswordInit } from '../../../actions/comman/account.actions';
import Gap from '../../comman/Gap';
import ForgotPassword from './forgotPassword';
//import * as rdd from 'react-device-detect';
const publicIp = require('public-ip');

class banner extends Wrapper {
    state = {
        userName: '',
        password: '',
        dataPublicIP: '',
        isForgotPasswordScreenVisible:false,
    }

    async componentDidMount(){
        var dataPublicIP = await publicIp.v4();
        // var dataV6 = await publicIp.v6();
        setTimeout(() => {
          this.setState({
            dataPublicIP: dataPublicIP
          })
        }, 200);
    }
    onTextChange = key => event => {
        const state = {};

        state[key] = event.target.value;

        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        }); 
    };
    _login = () => {
        this.props.login(this.state.userName, this.state.password,this.state.dataPublicIP)
    }

    OnClickForgotPassword = () => {
        if (!this.state.isForgotPasswordScreenVisible) {
             this.props.forgotPasswordInit();
            this.setState({
                isForgotPasswordScreenVisible: true
            });
        }
        else {
            this.setState({
                isForgotPasswordScreenVisible: false
            });
        }

    }

    OnClickForgotPasswordInit = () => { 
             this.props.forgotPasswordInit();
            this.setState({
                isForgotPasswordScreenVisible: true
            }); 
    }
    render() {
        const { isForgotPasswordScreenVisible } = this.state;
        let loggedIn = this.isLoggedIn();
        //console.log("loggedIn : ", loggedIn);
        //console.log("user data a : ", this.props.data)

    setTimeout(() => {
      if (loggedIn === true) {
        this.props.router.push({
          pathname: '/switch-role',
          query: { page: 'switchRole' }
        }, '/switch-role'); 
      }
    }, 100);

        const small = this.props.width < 768;
        const { type, error, message, data, width } = this.props;
        return (
            <div > 
<Gap h="50px" />
{(isForgotPasswordScreenVisible === true && type !== actionTypes.RESET_PASSWORD_SUCCESS) ?
                 <CommonStyle.MainDiv
                 padding={small ? "0px 20px" : "0px 20px"}
                 bgColor="rgba(0,128,128,0.8)"
                 flexdirection="column"
                 width="342px"
                 borderradius="20px"
             >
                 <Gap h="15px" />
                 <ForgotPassword />
                 <Gap h="35px" />
                 <InputDiv textalign="center"
                     justifyContent="center"
                 >
                     <a className="anchorlink" onClick={this.OnClickForgotPassword}> Cancel </a>
                 </InputDiv>
                 <Gap h="35px" />
             </CommonStyle.MainDiv>

             :
                <CommonStyle.MainDiv
                    padding={small ? "0px 20px" : "0px 20px"}
                    bgColor="rgba(0,128,128,0.8)"
                    flexdirection="column"
                    width="342px"
                    borderradius="20px"
                >
                     <Gap h="15px" />
                     <CommonStyle.TextDiv
                padding="0px 10px"
                justifycontent="center"
                fontsize="35px"
                color="#ffffff"
                >
                        Login Form
                </CommonStyle.TextDiv>
                     <Gap h="25px" />
                <CommonStyle.TextDiv
                padding="0px 10px"
                color="#ffffff"
                fontsize="18px"
                >
                        User Name
                </CommonStyle.TextDiv>
                <Gap h="5px" />
                    <InputDiv>
                        <Input
                            placeholderColor="#7c7c7c"
                            placeholder="User Name"
                            defaultValue={this.state.userName}
                            borderRadius="29px"
                            paddingLeft="24px"
                            height="55px"
                            type="text"
                            borderColor="#7c7c7c"
                            bgColor="#ffffff"
                            color="#000000"
                            autoFocus={false}
                            required={true}
                            onChange={this.onTextChange("userName")} />
                    </InputDiv>
                    <Gap h="20px" />
                <CommonStyle.TextDiv
                padding="0px 10px"
                color="#ffffff"
                fontsize="18px"
                >
                       Password
                </CommonStyle.TextDiv>
                <Gap h="5px" />
                    <InputDiv>
                        <Input
                            placeholderColor="#7c7c7c"
                            placeholder="Password"
                            defaultValue={this.state.password}
                            borderRadius="29px"
                            paddingLeft="24px"
                            height="55px"
                            type="password"
                            borderColor="#7c7c7c"
                            bgColor="#ffffff"
                            color="#000000"
                            autoFocus={false}
                            required={true}
                            onChange={this.onTextChange("password")} />
                    </InputDiv>
                    <Gap h="35px" />
                    <InputDiv>
                    <Button
                                            height="55px"
                                            fontsize="16px"
                                            bgColor="transparent"
                                            borderradius="29px"
                                            border="solid 1px #ffffff"
                                            lineheight="1.29" 
                                            letterspacing="normal"
                                            hoverColor="#000000 !important"
                                            bgChangeHover="#ffffff"
                                            onClick={this._login}
                                        >
                                           
                                                LOGIN
                                     
                                        </Button>
                    </InputDiv>
                    <Gap h="15px" />
                        <InputDiv textalign="center"
                            justifyContent="center"
                        >
                            <a className="anchorlink" onClick={this.OnClickForgotPasswordInit}>   Forgot Password ?</a>
                        </InputDiv>
                        <Gap h="15px" />
                </CommonStyle.MainDiv>
    }
            </div>
        );
    }
}





const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    const { data, type, message } = state.accountReducer;
    return { width ,data, type, message };
};


export default withRouter(connect(mapStatetoProps, {login,forgotPasswordInit})(banner));
