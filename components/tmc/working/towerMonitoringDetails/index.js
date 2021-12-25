import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux'; 
import * as CommonStyle from '../../../comman/commonStyle'  
import Wrapper from '../../shared/Wrapper';
import moment from 'moment'; 
import { withRouter } from 'next/router'; 


class TowerMonitoringDetailsIndex extends Wrapper {
    constructor(props) {
        super(props);
          this.state = { 
           
        } 
    }; 
    componentDidMount() {
     } 
    UNSAFE_componentWillReceiveProps(nextProps) {
        
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    } 
    render() {
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
              
            </CommonStyle.MainDiv>
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    const { selfAuditPlan } = state.workingReducer;

    return { errorType, errorMessage, selfAuditPlan };
};
export default withRouter(connect(mapStateToProps, null)(TowerMonitoringDetailsIndex));
