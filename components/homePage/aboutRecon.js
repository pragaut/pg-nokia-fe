import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Wrapper from '../shared/Wrapper';
import { withRouter } from 'next/router';
import * as CommonStyle from '../commonStyle';
import Gap from '../Gap'

class AboutRecon extends Wrapper {
    state = {
    }


    render() {

        const small = this.props.width < 768;

        return (
            <div>

                <Gap h="50px" />
                <CommonStyle.MainDiv
                    padding={small ? "0px 20px" : "0px 60px"}
                    flexdirection="column"
                    width={"90%"}
                >
                    <CommonStyle.TextDiv
                        textalign="center"
                        fontsize="24px"
                        color="#1192c9"
                        lineheight="1.71"
                        width="100%"
                        justifycontent="center"
                    >
                        What Is HR-AUDIT?
                    </CommonStyle.TextDiv>
                    <Gap h="25px" />
                    <CommonStyle.TextDiv
                        textalign="center"
                        fontsize="16px"
                        color="#000"
                        lineheight="1.71"
                        fontWeight="normal"
                    >
                        Under Construction Tool
                    </CommonStyle.TextDiv>
                </CommonStyle.MainDiv>
            </div>
        );
    }
}





const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    return { width };
};


export default withRouter(connect(mapStatetoProps, null)(AboutRecon));
