import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getSelfAuditDetailsByResponsibilityWiseDetails } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import ListTable from '../../shared/ListTable';
//import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import moment from 'moment';
import Gap from '../../Gap';
//import SelfAuditPlanDetails from '../../masters/selfAuditPlans'
import { hideError, showError } from '../../../actions/error.actions';
import * as MasterType from '../../../action-types/admin.action.types';
import * as WorkingType from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import SelfAuditDetails from './selfAuditDetails';
import TeamAssignmentDetails from '../selfAuditTeamAssignmentAndExecution';
import { withRouter } from 'next/router';
import SelfAuditExecution from '../selfAuditTeamAssignmentAndExecution/executeAudit';
import { saveSelfAuditPlanId, saveSelfAuditMultiSectionID } from '../../../utils/session.helper';

import dynamic from 'next/dynamic';

const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })


class Index extends Wrapper {

    constructor(props) {
        super(props);

        this.state = {
            ResponsibilityWiseselfAuditDetails: [],
            isTeamAssignmentPopupVisible: false,
            isAuditExecutionVisible: false,
            selectedAuditPlanDetailsId: undefined,
            auditFlowMasterId: props.auditFlowMasterId ? props.auditFlowMasterId : '',
            processFlowMasterId: props.processFlowMasterId ? props.processFlowMasterId : '',
            processFlowName: props.processFlowName ? props.processFlowName : '',
            processFlowCode: props.processFlowCode ? props.processFlowCode : '',
        };

    };


    componentDidMount() {
        saveSelfAuditPlanId(undefined);
        saveSelfAuditMultiSectionID(undefined);
        this.props.getSelfAuditDetailsByResponsibilityWiseDetails(0, constants.ALL_ROWS_LIST, undefined, undefined, this.props.processFlowCode, undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.ResponsibilityWiseselfAuditDetails && nextProps.ResponsibilityWiseselfAuditDetails != this.state.ResponsibilityWiseselfAuditDetails) {
            this.setState({
                ResponsibilityWiseselfAuditDetails: nextProps.ResponsibilityWiseselfAuditDetails
            });
        }
        if (nextProps.processFlowCode && nextProps.processFlowCode !== this.state.processFlowCode) {
            this.props.getSelfAuditDetailsByResponsibilityWiseDetails(0, constants.ALL_ROWS_LIST, undefined, undefined, nextProps.processFlowCode, undefined);

            this.setState({ processFlowCode: nextProps.processFlowCode });
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
        if (nextProps.selfAuditPlanActiontype && nextProps.selfAuditPlanActiontype === WorkingType.SELFAUDITPLANDETAILS_SAVE_SUCCESS && this.state.isTeamAssignmentPopupVisible === true) {
            // this.props.getSelfAuditDetailsByResponsibilityWiseDetails(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.processFlowCode, undefined);
            // setTimeout(() => {
            this.setState({ isTeamAssignmentPopupVisible: false, selectedAuditPlanDetailsId: undefined })
            // }, 300);

        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }
    onClickAssignTeamButton = (id) => {
        this.setState({ isTeamAssignmentPopupVisible: true, selectedAuditPlanDetailsId: id })
    }
    onClickCloseButton = () => {
        this.setState({ isTeamAssignmentPopupVisible: false, selectedAuditPlanDetailsId: undefined })
    }
    onClickExecuteAudit = (auditPlanDetailsId, multiSectionMasterId) => {
        saveSelfAuditPlanId(auditPlanDetailsId);
        saveSelfAuditMultiSectionID(multiSectionMasterId);
        this.props.router.push(
            {
                pathname: 'plantHrHead/self-audit-execution',
                tab: 'self-audit-execution',
                multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                query: {
                    tab: 'plantHrHead/self-audit-execution',
                    id: undefined,
                    pageName: 'Self Audit Execution',
                    auditFlowMasterId: undefined,
                    multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                    auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                }
            },
            'plantHrHead/self-audit-execution'
        );
    }
    onClickViewAuditSummaryDetails = (auditPlanDetailsId) => {
        saveSelfAuditPlanId(auditPlanDetailsId);
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'action-plan-update';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';

        this.props.router.push(
            {
                pathName: '/plantHrHead',
                tab: 'view-audit-complete-summary',
                query: {
                    tab: 'view-audit-complete-summary',
                    id: auditPlanDetailsId,
                    auditPlanDetailsId: auditPlanDetailsId,
                    pageName: 'Audit Summary Details',
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName,
                    auditFlowMasterId: auditFlowMasterId,
                    processFlowCode: processFlowCode
                }
            }, 'plantHrHead/view-audit-complete-summary'
        );
    }
    onClickViewAudit = (auditPlanDetailsId, multiSectionMasterId) => {
        saveSelfAuditPlanId(auditPlanDetailsId);
        saveSelfAuditMultiSectionID(multiSectionMasterId);
        this.props.router.push(
            {
                pathname: 'plantHrHead/view-self-audit-score',
                tab: 'view-self-audit-score',
                multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                query: {
                    tab: 'plantHrHead/view-self-audit-score',
                    id: undefined,
                    pageName: 'Self Audit Execution',
                    auditFlowMasterId: undefined,
                    multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                    auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                }
            },
            'plantHrHead/view-self-audit-score'
        );
    }
    render() {
        const { ResponsibilityWiseselfAuditDetails, isTeamAssignmentPopupVisible, selectedAuditPlanDetailsId } = this.state;
        console.log("ResponsibilityWiseselfAuditDetails", ResponsibilityWiseselfAuditDetails);
        const DataGrid = ResponsibilityWiseselfAuditDetails && ResponsibilityWiseselfAuditDetails.length > 0 && ResponsibilityWiseselfAuditDetails.filter(item => (item.isAuditCancelled !== 1 && item.isAuditCancelled !== true))
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                {isTeamAssignmentPopupVisible && isTeamAssignmentPopupVisible === true &&
                    <>
                        <CommonStyle.Overlay
                        // onClick={() => this.onClickCloseButton()} 
                         />
                        <CommonStyle.Wrapper_OnOverlay
                            height={"fit-content"}
                            padding={"20px 15px"}
                            width={"60%"}
                            visible={isTeamAssignmentPopupVisible}
                        >
                              <CommonStyle.CloseButtonForModel
                                onClick={() => this.onClickCloseButton()}
                            >X</CommonStyle.CloseButtonForModel>
                            <TeamAssignmentDetails
                                selectedAuditPlanDetailsId={selectedAuditPlanDetailsId}
                                onClickCloseButton={this.onClickCloseButton}
                            />
                        </CommonStyle.Wrapper_OnOverlay>

                    </>
                }
                <SelfAuditDetails
                    onClickAssignTeamButton={this.onClickAssignTeamButton}
                    onClickCloseButton={this.onClickCloseButton}
                    onClickExecuteAudit={this.onClickExecuteAudit}
                    onClickViewAudit={this.onClickViewAudit}
                    onClickViewAuditSummaryDetails={this.onClickViewAuditSummaryDetails}
                    processFlowCode={this.state.processFlowCode}
                    Data={DataGrid}
                />
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { ResponsibilityWiseselfAuditDetails, ResponsibilityWiseselfAuditDetailActiontype, ResponsibilityWiseselfAuditDetailRecordsCount, selfAuditPlanActiontype } = state.workingReducer;

    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { ResponsibilityWiseselfAuditDetails, ResponsibilityWiseselfAuditDetailActiontype, ResponsibilityWiseselfAuditDetailRecordsCount, selfAuditPlanActiontype, errorType, errorMessage };
};
export default withRouter(connect(mapStateToProps, { getSelfAuditDetailsByResponsibilityWiseDetails, hideError, connect })(Index));
