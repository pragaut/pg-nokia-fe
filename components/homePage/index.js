import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Wrapper from '../shared/Wrapper';
import { withRouter } from 'next/router';
import * as CommonStyle from '../commonStyle';
import Gap from '../Gap'
import LoginForm from '../auth'

class banner extends Wrapper {
    state = {
    }


    render() {

        const small = this.props.width < 768;
        return (
            <div >
                <CommonStyle.DivWithBgImage
                    backgroundimage="../../static/Banner_Image_01.jpg"
                    padding={small ? "0px 20px" : "123px 60px"}
                    flexdirection="row"
                >
                    <CommonStyle.MainDiv
                        width={small ? "100%" : "60%"}
                        flexdirection="Column"

                    >
                        <Gap h="40px" />
                        <CommonStyle.TextDiv
                            textalign="left"
                            width={"100%"}
                            fontsize="70px"
                            color="#ffffff"
                            lineheight="1.71"
                        >
                            &nbsp;
                  <br />
                            <Gap h="180px" />
                        </CommonStyle.TextDiv>
                    </CommonStyle.MainDiv>
                    <CommonStyle.MainDiv
                        width={small ? "100%" : "40%"}
                    >
                        <LoginForm
                        />
                    </CommonStyle.MainDiv>
                </CommonStyle.DivWithBgImage>
            </div>
        );
    }
}   

const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    return { width };
};


export default withRouter(connect(mapStatetoProps, null)(banner));
