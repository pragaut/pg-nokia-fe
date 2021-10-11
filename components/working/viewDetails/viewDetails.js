import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../commonStyle'
import { Button } from '../../formStyle';
import { UpdateSelfAuditPlanDetails, AssignAuditTeamDetails, getSelfAuditDetailsByResponsibilityWiseDetails } from '../../../actions/working.action';
import { getUserDetailsP, getUserByPlantId } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper';
import { hideError, showError } from '../../../actions/error.actions';
import ViewBasicDetails from './index';
import ViewScoreDetails from './scoreDetails';
import { withRouter } from 'next/router';
class executeAudit extends Wrapper {
    constructor(props) {
        super(props);
        //  const multiselectRef = useRef();
        this.state = {
            selectedAuditPlanDetailsId: props.selectedAuditPlanDetailsId ? props.selectedAuditPlanDetailsId : undefined,
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            processFlowCode: props.processFlowCode ? props.processFlowCode : 'self-audit-team-assigment-and-audit-execution',
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
        const { multiSectionMasterId, auditPlanDetailsId, processFlowCode } = this.state;
        const RoleCode = LoggedRole && LoggedRole.roleCode;
        const selfAuditPlanDetailsId = auditPlanDetailsId && auditPlanDetailsId !== null && auditPlanDetailsId !== '' ? auditPlanDetailsId : 'no-id';
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
                            this.onClickBackButtonPlanHRHead();
                        }
                        else if (RoleCode === "Corporate_Coordinator") {
                            this.onClickBackButtonCoorporateCoordinator();
                        }
                    }

                    }
                >
                    Back
                </Button>
                <ViewBasicDetails
                    auditPlanDetailsId={selfAuditPlanDetailsId}
                />
                <ViewScoreDetails
                    multiSectionMasterId={multiSectionMasterId}
                    auditPlanDetailsId={selfAuditPlanDetailsId}
                    processFlowCode={processFlowCode}
                />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { errorType, errorMessage };
};

//export default connect(mapStateToProps, { getUserDetailsP, AssignAuditTeamDetails, getSelfAuditDetailsByResponsibilityWiseDetails, UpdateSelfAuditPlanDetails, getUserByPlantId, hideError })(executeAudit);

export default withRouter(connect(mapStateToProps, { getUserDetailsP, AssignAuditTeamDetails, getSelfAuditDetailsByResponsibilityWiseDetails, UpdateSelfAuditPlanDetails, getUserByPlantId, hideError })(executeAudit));
