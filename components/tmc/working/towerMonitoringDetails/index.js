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
        this.props.getSelfAuditPlanDetailsById(this.state.auditPlanDetailsId);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.props.getSelfAuditPlanDetailsById(nextProps.auditPlanDetailsId);
            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId
            });
        }
        if (nextProps.selfAuditPlan && nextProps.selfAuditPlan != this.state.selfAuditPlan) {
            this.setState({
                selfAuditPlan: nextProps.selfAuditPlan
            });
        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }

    render() {
        const { selfAuditPlan } = this.state;
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
              
            </CommonStyle.MainDiv >
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
