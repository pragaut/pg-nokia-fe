import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Wrapper from '../../shared/Wrapper';
import { withRouter } from 'next/router';
import * as CommonStyle from '../../comman/commonStyle';
import Gap from '../../comman/Gap'
import LoginForm from '../../comman/auth'

class banner extends Wrapper {
    state = {
    }


    render() {

        const small = this.props.width < 768;
        return (
            <div> 
                <CommonStyle.MainDiv
                    padding={small ? "0px 60px" : "0px"}
                    flexdirection="row"
                > 
                
                </CommonStyle.MainDiv>
            </div>
        );
    }
}





const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    return { width };
};


export default withRouter(connect(mapStatetoProps, null)(banner));
