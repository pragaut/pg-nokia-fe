import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle';
import { UpdateSelfAuditPlanDetails, AssignAuditTeamDetails, getSelfAuditDetailsByResponsibilityWiseDetails } from '../../../actions/working.action';
import { getUserDetailsP, getUserByPlantId } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper';
import ListTable from '../../shared/ListTable';
//import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import moment from 'moment';
import Gap from '../../Gap';
import { getLoggedUserRole_JSONConverted, getLoggedUser } from '../../../utils/session.helper';
//import SelfAuditPlanDetails from '../../masters/selfAuditPlans'
import { hideError, showError } from '../../../actions/error.actions';
import * as MasterType from '../../../action-types/admin.action.types';
import * as WorkingType from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import ScopeDetails from './scopeDetails';
import ViewBasicDetails from '../viewDetails';
import { withRouter } from 'next/router';

import dynamic from 'next/dynamic';
import next from 'next';

const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })


class executeAudit extends Wrapper {

    companyMasterIdRefs = undefined;
    plantMasterIdRefs = undefined;
    sectionMasterIdRefs = undefined;
    constructor(props) {
        super(props);
        this.companyMasterIdRefs = React.createRef();
        this.plantMasterIdRefs = React.createRef();
        this.sectionMasterIdRefs = React.createRef();
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
        // if (nextProps && nextProps.selfAuditScoreDetailActiontype && nextProps.selfAuditScoreDetailActiontype === WorkingType.SA_TEAMASSIGNMENTANDEXECUTION_SAVE_SUCCESS) {
        //     setTimeout(() => {
        //         this.onClickBackButton();
        //     }, 500);
        // }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }

    onSubmit = async () => {
    }

    onClickCancel = () => {
        const state = {};
        // this.state.selfAuditPlan = []; 
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }

    onValueChanged = key => event => {
        // console.log("key : ", key);
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingState = Object.assign({}, this.state.teamAssignedDetails);
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ teamAssignedDetails: existingState });
    };
    onClickBackButton = () => {
        this.props.router.push(
            {
                pathname: 'plantHrHead',
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

    onValueChangedAuditorTeam = selectedOption => {
        let selectedAuditorTeam = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        let AuditorsId = this.returnIdsFunction(selectedAuditorTeam);
        const existingState = Object.assign({}, this.state.teamAssignedDetails);
        existingState["multiAuditorTeamId"] = AuditorsId;

        this.setState({ teamAssignedDetails: existingState, selectedAuditoTeam: selectedOption, selectedAuditoTeamIds: selectedAuditorTeam });
    };

    onValueChangedAuditeeTeam = selectedOption => {
        let selectedAuditeeTeam = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        let AuditeeId = this.returnIdsFunction(selectedAuditeeTeam);
        const existingState = Object.assign({}, this.state.teamAssignedDetails);
        existingState["multiAuditeeTeamId"] = AuditeeId;

        this.setState({ teamAssignedDetails: existingState, selectedAuditeeTeam: selectedOption, selectedAuditeeTeamIds: selectedAuditeeTeam });
    };
    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    render() {
        const { multiSectionMasterId, auditPlanDetailsId, processFlowCode } = this.state;
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
                    onClick={() =>
                        this.props.router.push(
                            {
                                pathname: 'plantHrHead',
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
                >
                    Back
                </Button>
                <ViewBasicDetails
                    auditPlanDetailsId={auditPlanDetailsId}
                />
                <ScopeDetails
                    multiSectionMasterId={multiSectionMasterId}
                    auditPlanDetailsId={auditPlanDetailsId}
                    processFlowCode={processFlowCode}
                />
                <CommonStyle.ButtonDiv>
                    {this.props.errorType === errorTypes.DISPLAY_ERROR &&
                        <div>
                            {this.props.errorMessage}
                            {this.hideError()}
                        </div>
                    }
                </CommonStyle.ButtonDiv>
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    const { selfAuditScoreDetailActiontype } = state.workingReducer;
    return { errorType, errorMessage, selfAuditScoreDetailActiontype };

};

//export default connect(mapStateToProps, { getUserDetailsP, AssignAuditTeamDetails, getSelfAuditDetailsByResponsibilityWiseDetails, UpdateSelfAuditPlanDetails, getUserByPlantId, hideError })(executeAudit);

export default withRouter(connect(mapStateToProps, { getUserDetailsP, AssignAuditTeamDetails, getSelfAuditDetailsByResponsibilityWiseDetails, UpdateSelfAuditPlanDetails, getUserByPlantId, hideError })(executeAudit));
