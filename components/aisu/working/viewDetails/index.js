import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux'; 
import * as CommonStyle from '../../../comman/commonStyle' 
import { getSelfAuditPlanDetailsById } from '../../../../actions/aisu/working.action';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment'; 
import { withRouter } from 'next/router'; 

class viewSelfAuditBasicDetails extends Wrapper {
    constructor(props) {
        super(props);
          this.state = {
            selfAuditPlan: undefined,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,

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
        console.log("selfAuditPlan", selfAuditPlan);
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                <CommonStyle.TABLE_ONLYOUTER>
                    <CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TH
                            colSpan="4"
                            bgColor={"teal"}
                            color="#ffffff"
                            fontsize="20px"
                            textAlign={"center"}
                        >
                          Self Audit Basic Details
                        </CommonStyle.TH>
                    </CommonStyle.TR_ONLY_OUTER>
                    <CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TH>
                            Audit Number
                        </CommonStyle.TH>
                        <CommonStyle.TD>
                            {selfAuditPlan && selfAuditPlan.selfAuditNumber}
                        </CommonStyle.TD>
                        <CommonStyle.TH>
                            Self Audit Duration
                        </CommonStyle.TH>
                        <CommonStyle.TD>
                            {selfAuditPlan && selfAuditPlan.auditFromDate ? moment(new Date(selfAuditPlan.auditFromDate)).format("DD-MMM-YYYY") : 'N/A'}&nbsp;To &nbsp;
                            {selfAuditPlan && selfAuditPlan.auditToDate ? moment(new Date(selfAuditPlan.auditToDate)).format("DD-MMM-YYYY") : 'N/A'}
                        </CommonStyle.TD>
                    </CommonStyle.TR_ONLY_OUTER>
                    <CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TH>
                            Group Name
                        </CommonStyle.TH>
                        <CommonStyle.TD>
                            Anand Automotive Private Limited
                        </CommonStyle.TD>
                        <CommonStyle.TH>
                            Lead Auditor
                        </CommonStyle.TH>
                        <CommonStyle.TD>
                            {selfAuditPlan && selfAuditPlan.user && selfAuditPlan.user.firstName} {selfAuditPlan && selfAuditPlan.user && selfAuditPlan.user.lastName}
                        </CommonStyle.TD>
                    </CommonStyle.TR_ONLY_OUTER>
                    <CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TH>
                            Company
                        </CommonStyle.TH>
                        <CommonStyle.TD>
                            {selfAuditPlan && selfAuditPlan.company && selfAuditPlan.company.companyName}
                        </CommonStyle.TD>
                        <CommonStyle.TH>
                            Auditor Team
                        </CommonStyle.TH>
                        <CommonStyle.TD>
                            {selfAuditPlan && selfAuditPlan.auditorTeam}
                        </CommonStyle.TD>
                    </CommonStyle.TR_ONLY_OUTER>
                    <CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TH>
                            Plant
                        </CommonStyle.TH>
                        <CommonStyle.TD>
                            {selfAuditPlan && selfAuditPlan.plant && selfAuditPlan.plant.plantName}
                        </CommonStyle.TD>
                        <CommonStyle.TH>
                            Auditee Team
                        </CommonStyle.TH>
                        <CommonStyle.TD>
                            {selfAuditPlan && selfAuditPlan.auditeeTeam}
                        </CommonStyle.TD>
                    </CommonStyle.TR_ONLY_OUTER>
                    <CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TH>
                            Section
                        </CommonStyle.TH>
                        <CommonStyle.TD colSpan="3">
                            {selfAuditPlan && selfAuditPlan.sections}
                        </CommonStyle.TD>
                    </CommonStyle.TR_ONLY_OUTER>
                </CommonStyle.TABLE_ONLYOUTER>
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
export default withRouter(connect(mapStateToProps, { getSelfAuditPlanDetailsById })(viewSelfAuditBasicDetails));
