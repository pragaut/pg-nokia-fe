import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../commonStyle'
import { Button } from '../../formStyle';
import { UpdateSelfAuditPlanDetails, AssignAuditTeamDetails, getSelfAuditDetailsByResponsibilityWiseDetails } from '../../../actions/working.action';
import { getUserDetailsP, getUserByPlantId } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper';
import { hideError, showError } from '../../../actions/error.actions';
import FinalAuditBasicDetails from './finalAuditBasicDetails';
import ViewScoreDetails from './viewFinalAuditScore';
import { withRouter } from 'next/router';
import FinalAuditScoreSummary from '../../reports/report.finalAudit.scoreSummary';
import Gap from '../../Gap';

class ViewFinalAuditDetails extends Wrapper {
    constructor(props) {
        super(props);
        //  const multiselectRef = useRef();
        this.state = {
            selectedAuditPlanDetailsId: props.selectedAuditPlanDetailsId ? props.selectedAuditPlanDetailsId : undefined,
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            processFlowCode: props.processFlowCode ? props.processFlowCode : 'final-audit-execution-index',
            tab: props.tab,
            multiSectionMasterId: props.multiSectionMasterId ? props.multiSectionMasterId : undefined,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            boolValuesForDDL: [
                {
                    text: 'Yes',
                    value: 'true'
                },
                {
                    text: 'No',
                    value: 'false'
                }
            ],
            showEditPopup: false,
            configs: [
                {
                    name: 'multiAuditorTeamId',
                    displayname: 'Auditor Team',
                    type: 'string',
                    required: true
                }, {
                    name: 'multiAuditeeTeamId',
                    displayname: 'Auditee Team',
                    type: 'string',
                    required: true
                }
            ],
        };

    };


    componentDidMount() {
        this.setState({
            tab: this.props.tab
        });
    }

    onClickBackButtonPlanHRHead = () => {
        this.props.router.push(
            {
                pathname: 'plantHrHead/self-audit-team-assigment-and-audit-execution',
                query: {
                    tab: 'self-audit-team-assigment-and-audit-execution',
                    id: undefined,
                    pageName: 'Team Assigment & Audit Execution',
                    auditFlowMasterId: undefined,
                },
                tab: 'self-audit-team-assigment-and-audit-execution',
            },
            'plantHrHead/self-audit-team-assigment-and-audit-execution'
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
    onClickBackButton_PlantHRHead = () => {
        this.props.router.push(
            {
                pathname: 'plantHrHead/action-plan-update',
                query: {
                    tab: 'action-plan-update',
                    id: undefined,
                    pageName: 'Action Plan Update',
                    auditFlowMasterId: undefined,
                },
                tab: 'action-plan-update',
            },
            'plantHrHead/action-plan-update'
        )
    }

    onClickBackButtonAuditor = () => {
        this.props.router.push(
            {
                pathname: 'auditor',
                query: {
                    tab: 'final-audit-execution',
                    id: undefined,
                    pageName: 'Audit Observation',
                    auditFlowMasterId: undefined,
                },
                tab: 'final-audit-execution',
            },
            'auditor/final-audit-execution-index'
        )
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId
            });
        }
        if (nextProps.multiSectionMasterId && nextProps.multiSectionMasterId != this.state.multiSectionMasterId) {
            this.setState({
                multiSectionMasterId: nextProps.multiSectionMasterId
            });
        }
        if (nextProps.tab && nextProps.tab != null) {
            this.setState({
                tab: nextProps.tab
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
        const LoggedRole = this.getLoggedUserRole_JSONConverted();
        const { multiSectionMasterId, auditPlanDetailsId, processFlowCode, tab } = this.state;
        console.log("audit Plan Details Id", auditPlanDetailsId)
        const RoleCode = LoggedRole && LoggedRole.roleCode;
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
                        if (RoleCode === "PlantHRHead") {
                            if (tab && tab === 'view-final-audit-score') {
                                this.onClickBackButton_PlantHRHead();
                            }
                            else {
                                this.onClickBackButtonPlanHRHead();
                            }

                        }
                        else if (RoleCode === "Corporate_Coordinator") {
                            this.onClickBackButtonCoorporateCoordinator();
                        }
                        else if (RoleCode === "auditor" || RoleCode === "AUDITOR" || RoleCode === "Auditor") {
                            this.onClickBackButtonAuditor();
                        }
                    }

                    }
                >
                    Back
                </Button>
                <FinalAuditBasicDetails
                    auditPlanDetailsId={auditPlanDetailsId}
                />
                <ViewScoreDetails
                    multiSectionMasterId={multiSectionMasterId}
                    auditPlanDetailsId={auditPlanDetailsId}
                    processFlowCode={processFlowCode}
                />
                <FinalAuditScoreSummary
                    auditPlanDetailsId={auditPlanDetailsId}
                    auditPlanDetailsID={auditPlanDetailsId}
                />
                <Gap h="50px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { errorType, errorMessage };
};


export default withRouter(connect(mapStateToProps, { getUserDetailsP, AssignAuditTeamDetails, getSelfAuditDetailsByResponsibilityWiseDetails, UpdateSelfAuditPlanDetails, getUserByPlantId, hideError })(ViewFinalAuditDetails));
