import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../commonStyle'
import { Button } from '../../formStyle';
import { getSelfAuditPlanDetailsById } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import { hideError, showError } from '../../../actions/error.actions';
import ViewBasicDetails from './index';
import ViewScoreDetails from './scoreDetails';
import ViewFinalAuditBasicDetails from './finalAuditBasicDetails';
import ViewFinalAuditScoreDetails from './viewFinalAuditScore';
import ViewActionPlanDetails from './viewActionPlanDetails';
import ViewMonthlyReviewDetails from '../monthlyActionPlanReview/view.actionPlanReviewDetails';
import SelfAuditScoreSummary from '../../reports/report.selfAudit.scoreSummary';
import FinalAuditScoreSummary from '../../reports/report.finalAudit.scoreSummary';
import { withRouter } from 'next/router';
import Gap from '../../Gap';
class executeAudit extends Wrapper {
    constructor(props) {
        super(props);
        //  const multiselectRef = useRef();
        this.state = {
            selectedAuditPlanDetailsId: props.selectedAuditPlanDetailsId ? props.selectedAuditPlanDetailsId : undefined,
            multiSectionMasterId: props.multiSectionMasterId ? props.multiSectionMasterId : undefined,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            selfAuditBasicDetailsView: true,
            selfAuditScoreView: true,
            finalAuditBasicDetailsView: true,
            finalAuditScoreView: true,
            finalAuditActionPlanView: true,
            finalAuditMonthlyReviewView: true,
            processFlowCode: props.processFlowCode ? props.processFlowCode : undefined,
            processFlowName: props.processFlowName ? props.processFlowName : 'Audit Details',
            auditFlowMasterId: props.auditFlowMasterId ? props.auditFlowMasterId : '',
            processFlowMasterId: props.processFlowMasterId ? props.processFlowMasterId : ''
        };
    };

    componentDidMount() {
        this.props.getSelfAuditPlanDetailsById(this.state.auditPlanDetailsId);
    }
    onClickBackButton = () => {
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'action-plan-update';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';
        const CurrentRole = this.getLoggedUserRole_JSONConverted();
        const roleCode = CurrentRole && CurrentRole.roleCode;
        let p_pathname = 'plantHrHead';
        let p_Url = 'plantHrHead/' + processFlowCode;
        if (roleCode === "Corporate_Coordinator") {
            p_pathname = "corporateCoordinator";
            p_Url = 'corporateCoordinator/' + processFlowCode;
        }
        else if (roleCode === "Auditor") {
            p_pathname = "auditor";
            p_Url = 'auditor/' + processFlowCode;
        }
        else if (roleCode === "Management") {
            p_pathname = "management";
            p_Url = 'management/' + processFlowCode;
        }
        else if (roleCode === "companyHRHead") {
            p_pathname = "companyHRHead";
            p_Url = 'companyHRHead/' + processFlowCode;
        }
        this.props.router.push(
            {
                pathname: p_pathname,
                query: {
                    tab: processFlowCode,
                    id: undefined,
                    pageName: processFlowName,
                    auditFlowMasterId: auditFlowMasterId,
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName
                },
                tab: processFlowCode,
            },
            p_Url
        )
    }
    onClickBackButtonCoorporateCoordinator = () => {
        this.props.router.push(
            {
                pathname: 'corporateCoordinator/final-audit-planning',
                query: {
                    tab: 'final-audit-planning',
                    id: undefined,
                    pageName: 'Final Audit Planing',
                    auditFlowMasterId: undefined,
                },
                tab: 'final-audit-planning',
            },
            'corporateCoordinator/final-audit-planning'
        )
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId
            });
            this.props.getSelfAuditPlanDetailsById(nextProps.auditPlanDetailsId);
        }
        if (nextProps.selfAuditPlan && nextProps.selfAuditPlan != this.state.selfAuditPlan) {
            this.setState({
                selfAuditPlan: nextProps.selfAuditPlan
            });
        }
        if (nextProps.multiSectionMasterId && nextProps.multiSectionMasterId != this.state.multiSectionMasterId) {
            this.setState({
                multiSectionMasterId: nextProps.multiSectionMasterId
            });
        }
        if (nextProps.processFlowCode && nextProps.processFlowCode != this.state.processFlowCode) {
            this.setState({
                processFlowCode: nextProps.processFlowCode
            });
        }
        if (nextProps.processFlowName && nextProps.processFlowName != this.state.processFlowName) {
            this.setState({
                processFlowName: nextProps.processFlowName
            });
        }
        if (nextProps && nextProps.auditFlowMasterId && nextProps.auditFlowMasterId != this.state.auditFlowMasterId) {
            this.setState({
                auditFlowMasterId: nextProps.auditFlowMasterId,
            })
        }
        if (nextProps && nextProps.processFlowMasterId && nextProps.processFlowMasterId != this.state.processFlowMasterId) {
            this.setState({
                processFlowMasterId: nextProps.processFlowMasterId,
            })
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
        const { multiSectionMasterId, auditPlanDetailsId, processFlowCode, selfAuditPlan, selfAuditScoreView, finalAuditBasicDetailsView, finalAuditScoreView, finalAuditActionPlanView, finalAuditMonthlyReviewView } = this.state;
        const selfAuditPlanId = selfAuditPlan ? selfAuditPlan.id : 'no-id';
        const IsSelfAuditExecuted = selfAuditPlan && selfAuditPlan.isAuditExecuted;
        const finalAuditPlanId = selfAuditPlan && selfAuditPlan.finalAuditPlan ? selfAuditPlan.finalAuditPlan.id : 'no-id';
        const selfAuditPlanDetailsId = auditPlanDetailsId && auditPlanDetailsId !== null && auditPlanDetailsId !== '' ? auditPlanDetailsId : 'no-id';
        const isFinalAuditExecuted = selfAuditPlan && selfAuditPlan.finalAuditPlan && selfAuditPlan.finalAuditPlan.isAuditExecuted;
        console.log("isFinalAuditExecuted", isFinalAuditExecuted);
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
                justifycontent="flex-start"
                alignitems="baseline"
                style={{ overflow: 'visible' }}
            >
                <Button
                    width="100px"
                    height="40px"
                    borderRadius="10px"
                    bgColor="teal"
                    onClick={() => {
                        this.onClickBackButton();
                    }}
                >
                    Back
                </Button>
                {selfAuditPlanId && selfAuditPlanId !== null && selfAuditPlanId !== 'no-id' &&
                    <>
                        <ViewBasicDetails
                            auditPlanDetailsId={selfAuditPlanId}
                        />
                        <ViewScoreDetails
                            multiSectionMasterId={multiSectionMasterId}
                            auditPlanDetailsId={selfAuditPlanId}
                            processFlowCode={processFlowCode}
                        />
                        {IsSelfAuditExecuted &&
                            <SelfAuditScoreSummary
                                auditPlanDetailsId={selfAuditPlanId}
                            />
                        }
                        {finalAuditPlanId && finalAuditPlanId !== 'no-id' &&
                            <>


                                <ViewFinalAuditBasicDetails
                                    auditPlanDetailsId={finalAuditPlanId}
                                />
                                <ViewFinalAuditScoreDetails
                                    auditPlanDetailsId={finalAuditPlanId}
                                />

                                <FinalAuditScoreSummary
                                        auditPlanDetailsId={finalAuditPlanId}
                                    /> 
                                <ViewActionPlanDetails
                                    auditPlanDetailsId={finalAuditPlanId}
                                    finalBasicDetailsHide={true}
                                    isBackButtonHide={true}
                                />
                                <ViewMonthlyReviewDetails
                                    auditPlanDetailsId={finalAuditPlanId}
                                    finalBasicDetailsHide={true}
                                    isBackButtonHide={true}
                                />
                            </>
                        }
                        <Gap h="50px" />
                    </>

                }

            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { selfAuditPlan } = state.workingReducer;
    return { selfAuditPlan };
};
export default withRouter(connect(mapStateToProps, { getSelfAuditPlanDetailsById })(executeAudit));
