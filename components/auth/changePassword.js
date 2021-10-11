import React, { Component } from 'react' 
import styled from 'styled-components';
import { Input, Button } from '../formStyle';
import Gap from '../Gap';
import { changePassword, changePasswordInit } from '../../actions/account.actions';
import { connect } from 'react-redux';
import Wrapper from '../shared/Wrapper';
const Row = styled.div`
   width : 100%;
   display: flex;
   align-items: ${props => props.alignItems ? props.alignItems : 'center'};
   justify-content: ${props => props.justify ? props.justify : 'space-between'};
   margin: ${props => props.margin ? props.margin : 'auto'};
   margin-right: ${props => props.marginRight ? (props.marginRight + 'px') : 'auto'};
   flex-direction: ${props => props.direction ? props.direction : 'row'};
   flex-wrap : ${props => props.wrap ? props.wrap : 'wrap'};
   overflow: ${props => props.overflow ? props.overflow : ''};
   padding: ${props => props.padding || '0px'};
   font-family:'Asap', sans-serif ;
   &::-webkit-scrollbar { width: ${props => props.hideScrollbar ? '0 !important' : 'auto' } } 
`;
const Wapper = styled.div`
    width: ${props => props.small ? "100%" : "441px"};
    .info_label{
        font-size: 18px;
        font-weight: normal;
        line-height: 2.78;
        text-align: left;
        color: #ffffff;
    }
`;

const H1 = styled.h1`
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;

`;

const Label = styled.label`
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.78;
  letter-spacing: normal;
  text-align: left;
  color: #7c7c7c;
  width: 100%;
  .forgot{
    font-size: 18px;
    float: right;
    text-align: right;
    color: #a78b44;
    cursor: pointer;
  }
`;



class ChangePassword extends Wrapper {

    constructor(props){
        super(props);

        this.props.changePasswordInit();
    };

    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    onTextChange = key => event => {
        const state = {};

        state[key] = event.target.value;

        this.setState({
            ...state
        });
    };

    render() {
        const { type, user } = this.props;
        const small = this.props.width < 768;

        return (
            <Wapper small={small}>
                {/* <H1>Change Password</H1>
                <p className="info_label">This will change your name of your account</p> */}
                <Row direction="column" alignItems="flex-start">
                <Label>Current Password</Label>
                    {/* <Label>Current Password <span className="forgot">Forgot Password?</span> </Label>  */}
                    <Input onChange={this.onTextChange('oldPassword')} borderRadius="14px" height="44px" type="password" />
                </Row>
                <Row direction="column" alignItems="flex-start">
                    <Label>New Password</Label>
                    <Input onChange={this.onTextChange('newPassword')} borderRadius="14px" height="44px" type="password" />
                </Row>
                <Row direction="column" alignItems="flex-start">
                    <Label>Confirm Password</Label>
                    <Input onChange={this.onTextChange('confirmNewPassword')} borderRadius="14px" height="44px" type="password" />
                </Row>
                <Gap h='30px' />
                <Row>
                    <Button width="70%" 
                    bgColor={"teal"}
                    onClick={() => {
                            if (this.state.newPassword !== this.state.confirmNewPassword){
                                return alert("Passwords don't match")
                            }

                            if (this.state.newPassword.trim().length < 8) {
                                return alert("The new password should be of minimum 8 characters");
                            }

                            if (this.state.newPassword.trim() === this.state.oldPassword.trim()) {
                                return alert("The new password cannot be same as the old password");
                            }

                            this.props.changePassword(this.state.oldPassword, this.state.newPassword, this.state.confirmNewPassword);
                        }}>Save</Button>
                    {/* <Button
                        width="48%"
                        bgColor="transparent"
                        border="1px solid #a78b44"
                        onClick={this.props.cancelButton()}
                    >Cancel</Button> */}
                </Row>
            </Wapper>
        )
    }
}

const mapStateToProps = (state) => {
    const { type, error, user } = state.accountReducer;

    return { type, error, user };
}

export default connect(mapStateToProps,{ changePasswordInit, changePassword })(ChangePassword);