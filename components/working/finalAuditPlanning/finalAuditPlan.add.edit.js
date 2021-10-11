import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../commonStyle'
import { Button, SELECT, Input } from '../../formStyle';
import { constants } from '../../../utils/constants';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import { getSelfAuditPlanDetailsById, UpdateFinalAuditPlanDetails, getSectionMasterDetails_ForFinalAuditPlan, initFinalAuditPlanDetails, saveFinalAuditPlanDetails } from '../../../actions/working.action';
import { getUserDetailsP, getUserByPlantId, getSectionMasterData, getAuditTypeAuditorRelationMasterData_AllUsers } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper';
import { hideError, showError } from '../../../actions/error.actions';
import { withRouter } from 'next/router';
import ViewBasicDetails from '../viewDetails';
import moment from 'moment';
import * as MasterType from '../../../action-types/admin.action.types';
import * as WorkingType from '../../../action-types/working.action.types';
import Select from 'react-select';
import { Checkbox } from '@material-ui/core';
import Gap from '../../Gap';
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
            finalAuditPlanDetailsId: props.finalAuditPlanDetailsId ? props.finalAuditPlanDetailsId : undefined,
            processFlowCode: props.processFlowCode ? props.processFlowCode : 'final-audit-planning',
            multiSectionMasterId: props.multiSectionMasterId ? props.multiSectionMasterId : undefined,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            sections: [],
            coorporateUser: [],
            multiSectionIds: [],
            selectedAuditoTeam: [],
            selfAuditPlantMasterId: undefined,
            selfAuditCompanyMasterId:undefined,
            selectedAuditeeTeam: [],
            coorporateAuditor: [],
            auditSectionAuditorDetails: [{
                id: undefined,
                auditPlanDetailsId: undefined,
                sectionMasterId: undefined,
                auditorMasterId: undefined
            }],
            auditPlanDetails: {
                id: props.finalAuditPlanDetailsId ? props.finalAuditPlanDetailsId : undefined,
                selfAuditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
                multiCorporateAuditorTeamId: undefined,
                multiPlantAuditeeTeamId: undefined,
                auditPlanRemarks: undefined,
                auditFromDate: undefined,
                auditToDate: undefined,
                auditPlannedBy: undefined,
                auditPlannedOn: moment(new Date()).format("YYYY-MM-DD"),
                auditorDetails: [{
                    id: undefined,
                    auditPlanDetailsId: undefined,
                    sectionMasterId: undefined,
                    auditorMasterId: undefined
                }]
            },
            auditeeTeam: [],
            auditTypeAuditorRelations: [],
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
                    name: 'multiCorporateAuditorTeamId',
                    displayname: 'Coorporate Auditor Team',
                    type: 'string',
                    required: true
                }, {
                    name: 'multiPlantAuditeeTeamId',
                    displayname: 'Plant Auditee Team',
                    type: 'string',
                    required: true
                }, {
                    name: 'auditFromDate',
                    displayname: 'Audit Date',
                    type: 'string',
                    required: true
                }, {
                    name: 'auditPlanRemarks',
                    displayname: 'Plan Remarks',
                    type: 'string',
                    required: false
                }
            ],
        };

    };


    componentDidMount() {
        const loggedUser = this.loggedUser();// getLoggedUser();
        const CurrentRole = this.getLoggedUserRole_JSONConverted()
        const UserId = loggedUser && loggedUser.id;
        const roleID = CurrentRole && CurrentRole.id;
        const companyMasterId = loggedUser && loggedUser.plantMaster && loggedUser.plantMaster.companyMasterID;
        const plantMasterId = loggedUser && loggedUser.plantMaster && loggedUser.plantMaster.id;
        const finalAuditPlanDetailsId = this.state.finalAuditPlanDetailsId;

        let Filter = {
            companyMasterId:undefined ,// loggedUser && loggedUser.plantMaster && loggedUser.plantMaster.companyMasterID
        }
        this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, Filter);
        this.props.getAuditTypeAuditorRelationMasterData_AllUsers(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSelfAuditPlanDetailsById(this.state.auditPlanDetailsId);
        this.props.getSectionMasterDetails_ForFinalAuditPlan(this.state.auditPlanDetailsId, finalAuditPlanDetailsId);

        const existingState = Object.assign({}, this.state.auditPlanDetails);
        existingState["auditPlannedBy"] = UserId;
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);

        const multiSectionId = this.ConvertStringToArrayRoleReturn(this.state.multiSectionMasterId);
        //let plantMasterId = loggedUser && loggedUser.plantMasterId;

        this.setState({
            multiSectionIds: multiSectionId,
            auditPlanDetails: existingState,
            userId: UserId,
            roleMasterId: roleID,
            companyMasterId: companyMasterId,
            plantId: plantMasterId

        });

        setTimeout(() => {
            this.onValueChangedAuditorTeamOnPropsChange(this.state.auditPlanDetails.multiCorporateAuditorTeamId);
            setTimeout(() => {
                this.onValueChangedAuditeeTeamOnPropsChange(this.state.auditPlanDetails.multiPlantAuditeeTeamId);
            }, 50);
        }, 700);
    }

    onClickBackButtonCoorporateCoordinator = () => {
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
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
            this.props.getSelfAuditPlanDetailsById(nextProps.auditPlanDetailsId);
            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId
            });
        }

        if (nextProps.sections && nextProps.sections != this.state.sections) {
            this.setState({
                sections: nextProps.sections
            });
        }
        if (nextProps.finalAuditSectionDetails && nextProps.finalAuditSectionDetails != this.state.auditSectionAuditorDetails) {

            const auditorDetails = nextProps.finalAuditSectionDetails && nextProps.finalAuditSectionDetails.filter(item => item.isSectionApplicable === "Yes" && item.auditorMasterId !== null && item.auditorMasterId !== '');
            const existingAuditPlanDetails = Object.assign({}, this.state.auditPlanDetails);
            existingAuditPlanDetails["auditorDetails"] = auditorDetails;
            this.setState({
                auditSectionAuditorDetails: nextProps.finalAuditSectionDetails,
                auditPlanDetails: existingAuditPlanDetails
            });
        }
        if (nextProps.users && MasterType.USER_LIST_SUCCESS === nextProps.userActiontype && nextProps.users != this.state.coorporateUser) {
            const coorporateAuditor = nextProps.users && nextProps.users.length > 0 && nextProps.users.filter(item => item.isAuditRoleAssigned === "Yes");// && item.isCoorporateUser === "Yes"
            console.log("coorporateAuditor 2", coorporateAuditor);
            this.setState({
                coorporateUser: nextProps.users, coorporateAuditor: coorporateAuditor
            });
        }
        if (nextProps.finalAuditPlanActiontype && nextProps.finalAuditPlanActiontype === WorkingType.FINALAUDITPLANDETAILS_SAVE_SUCCESS) {
            this.onClickBackButtonCoorporateCoordinator();
        }
        if (nextProps.users && MasterType.USER_GET_BY_PLANTID_SUCCESS === nextProps.userActiontype && nextProps.users != this.state.auditeeTeam) {

            this.setState({
                auditeeTeam: nextProps.users
            });
            // setTimeout(() => {
            //     this.onValueChangedAuditeeTeamOnPropsChange(this.state.auditPlanDetails && this.state.auditPlanDetails.multiPlantAuditeeTeamId);
            // }, 50);
        }
        if (nextProps.multiSectionMasterId && nextProps.multiSectionMasterId != this.state.multiSectionMasterId) {
            this.setState({
                multiSectionMasterId: nextProps.multiSectionMasterId
            });
        }
        if (nextProps && nextProps.auditTypeAuditorRelations && nextProps.auditTypeAuditorRelations !== null && nextProps.auditTypeAuditorRelations !== undefined && nextProps.auditTypeAuditorRelations !== 'undefined' && nextProps.auditTypeAuditorRelations !== this.state.auditTypeAuditorRelations) {
            this.setState({
                auditTypeAuditorRelations: nextProps.auditTypeAuditorRelations
            })
        }
        if (nextProps.selfAuditPlan && nextProps.selfAuditPlan != this.state.selfAuditPlan) {
            const finalAuditPlan = nextProps.selfAuditPlan && nextProps.selfAuditPlan.finalAuditPlan && nextProps.selfAuditPlan.finalAuditPlan;
            const existingState = Object.assign({}, this.state.auditPlanDetails);
            if (finalAuditPlan) {
                existingState["id"] = finalAuditPlan.id ? finalAuditPlan.id : undefined;
                existingState["selfAuditPlanDetailsId"] = finalAuditPlan.selfAuditPlanDetailsId ? finalAuditPlan.selfAuditPlanDetailsId : undefined;
                existingState["multiCorporateAuditorTeamId"] = finalAuditPlan.multiCorporateAuditorTeamId ? finalAuditPlan.multiCorporateAuditorTeamId : undefined;
                existingState["multiPlantAuditeeTeamId"] = finalAuditPlan.multiPlantAuditeeTeamId;
                existingState["auditPlanRemarks"] = finalAuditPlan.auditPlanRemarks;
                existingState["auditFromDate"] = moment(new Date(finalAuditPlan.auditFromDate)).format("YYYY-MM-DD");
                existingState["auditToDate"] = moment(new Date(finalAuditPlan.auditToDate)).format("YYYY-MM-DD");
            }
            this.props.getUserByPlantId(0, constants.ALL_ROWS_LIST, undefined, undefined, nextProps.selfAuditPlan.plantMasterId);

            this.setState({
                selfAuditPlan: nextProps.selfAuditPlan,
                auditPlanDetails: existingState,
                selfAuditPlantMasterId: nextProps.selfAuditPlan.plantMasterId,
                selfAuditCompanyMasterId :  nextProps.selfAuditPlan.companyMasterId,
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
    onValueChangedAuditorTeam = selectedOption => {
        let selectedAuditorTeam = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        let AuditorsId = this.returnIdsFunction(selectedAuditorTeam);
        const existingState = Object.assign({}, this.state.auditPlanDetails);
        existingState["multiCorporateAuditorTeamId"] = AuditorsId;

        this.setState({ auditPlanDetails: existingState, selectedAuditoTeam: selectedOption, selectedAuditoTeamIds: selectedAuditorTeam });
    };
    onValueChangedAuditeeTeamOnPropsChange = selectedIds => {
        const auditeeTeam = this.state.auditeeTeam;
        let selectedAuditeeTeam = this.ConvertStringToArrayRoleReturn(selectedIds);//selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        var data = [];
        auditeeTeam && auditeeTeam.length > 0 && auditeeTeam.forEach(element => {
            selectedAuditeeTeam && selectedAuditeeTeam.forEach(element2 => {
                if (element2 === element.id) {
                    data = data && data.length > 0 ? data.concat(element) : [element];// data.push(element);
                }
            });
        });
        const auditeeTeamsoptions = data && data.length > 0 && data.map((item, index) => {
            return { value: item.id, label: item.useFullName }
        });
        this.setState({ selectedAuditeeTeam: auditeeTeamsoptions, selectedAuditeeTeamIds: selectedAuditeeTeam });
    };
    onValueChangedAuditorTeamOnPropsChange = selectedIds => {
        const coorporateAuditor = this.state.coorporateAuditor;
        var data = [];
        let selectedAuditorTeam = this.ConvertStringToArrayRoleReturn(selectedIds);//selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        coorporateAuditor && coorporateAuditor.length > 0 && coorporateAuditor.forEach(element => {
            selectedAuditorTeam && selectedAuditorTeam.forEach(element2 => {
                if (element2 === element.id) {
                    data = data && data.length > 0 ? data.concat(element) : [element];// data.push(element);
                }
            });
        });
        const auditorTeamsoptions = data && data.length > 0 && data.map((item, index) => {
            return { value: item.id, label: item.useFullName }
        });
        this.setState({ selectedAuditoTeam: auditorTeamsoptions, selectedAuditoTeamIds: selectedAuditorTeam });
    };


    onValueChangedAuditeeTeam = selectedOption => {
        let selectedAuditeeTeam = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        let AuditeeId = this.returnIdsFunction(selectedAuditeeTeam);
        const existingState = Object.assign({}, this.state.auditPlanDetails);
        existingState["multiPlantAuditeeTeamId"] = AuditeeId;

        this.setState({ auditPlanDetails: existingState, selectedAuditeeTeam: selectedOption, selectedAuditeeTeamIds: selectedAuditeeTeam });
    };
    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    ConvertStringToArrayRoleReturn = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring;
    }

    onValueChanged = key => event => {
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingState = Object.assign({}, this.state.auditPlanDetails);
        if (key === "auditFromDate") {
            existingState["auditToDate"] = selectedValue;
        }
        existingState[key] = selectedValue; // Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ auditPlanDetails: existingState });
    };

    onChangeScope0 = () => event => {
        alert("Total scope count is 0, you can't plan audit for this section !!");
    }

    onChangeValue_SectionSelectionNew = (Key, id, auditPlanDetailsId, sectionMasterID) => event => {
        //alert("DDl Changed");
        const CurrentDate = moment(new Date()).format("YYYY-MM-DD");
        const auditSectionAuditorDetails = this.state.auditSectionAuditorDetails;
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        let finalAuditPlanId = this.state.finalAuditPlanDetailsId ? this.state.finalAuditPlanDetailsId : auditPlanDetailsId;

        const index = auditSectionAuditorDetails && auditSectionAuditorDetails.length > 0 && auditSectionAuditorDetails.findIndex(item => item.sectionMasterId === sectionMasterID);
        if ((selectedValue === "true" || selectedValue === true || selectedValue === "Yes") && Key === "Section_Selection") {
            if (index > -1) {
                const ExistingState = [...auditSectionAuditorDetails]
                ExistingState[index].id = id;
                ExistingState[index].auditPlanDetailsId = auditPlanDetailsId;
                ExistingState[index].sectionMasterId = sectionMasterID;
                ExistingState[index].auditorMasterId = ExistingState[index].auditorMasterId;
                ExistingState[index].isSectionApplicable = 'Yes';
                const auditorDetails = ExistingState && ExistingState.filter(item => item.isSectionApplicable === "Yes" && item.auditorMasterId && item.auditorMasterId !== null && item.auditorMasterId !== '');
                const existingAuditPlanDetails = Object.assign({}, this.state.auditPlanDetails);
                existingAuditPlanDetails["auditorDetails"] = auditorDetails;
                this.setState({ auditPlanDetails: existingAuditPlanDetails, auditSectionAuditorDetails: ExistingState })
            }
        }
        else if ((selectedValue === "false" || selectedValue === false || selectedValue === "No") && Key === "Section_Selection") {
            const ExistingState = [...auditSectionAuditorDetails]
            ExistingState[index].id = id;
            ExistingState[index].auditPlanDetailsId = auditPlanDetailsId;
            ExistingState[index].sectionMasterId = sectionMasterID;
            ExistingState[index].auditorMasterId = ExistingState[index].auditorMasterId;
            ExistingState[index].isSectionApplicable = 'No';
            const auditorDetails = ExistingState && ExistingState.filter(item => item.isSectionApplicable === "Yes" && item.auditorMasterId && item.auditorMasterId !== null && item.auditorMasterId !== '');
            const existingAuditPlanDetails = Object.assign({}, this.state.auditPlanDetails);
            existingAuditPlanDetails["auditorDetails"] = auditorDetails;
            this.setState({ auditPlanDetails: existingAuditPlanDetails, auditSectionAuditorDetails: ExistingState })
        }
        else if (Key === "auditor") {
            if (index > -1) {
                const ExistingState = [...auditSectionAuditorDetails]
                ExistingState[index].id = id;
                ExistingState[index].auditPlanDetailsId = auditPlanDetailsId;
                ExistingState[index].sectionMasterId = ExistingState[index].sectionMasterId;
                ExistingState[index].auditorMasterId = selectedValue;
                ExistingState[index].isSectionApplicable = 'Yes';
                const auditorDetails = ExistingState && ExistingState.filter(item => item.isSectionApplicable === "Yes" && item.auditorMasterId && item.auditorMasterId !== null && item.auditorMasterId !== '');
                const existingAuditPlanDetails = Object.assign({}, this.state.auditPlanDetails);
                existingAuditPlanDetails["auditorDetails"] = auditorDetails;
                this.setState({ auditPlanDetails: existingAuditPlanDetails, auditSectionAuditorDetails: ExistingState })
            }
        }
    }

    onClickSubmit = () => {
        const auditorDetails = this.state.auditPlanDetails.auditorDetails;
        const auditSectionAuditorDetails = this.state.auditSectionAuditorDetails;
        let AuditorCount = auditorDetails && auditorDetails.length > 0 ? auditorDetails.length : 0;
        let AuditSectioCount = auditSectionAuditorDetails && auditSectionAuditorDetails.length > 0 ? auditSectionAuditorDetails.filter(item => item.isSectionApplicable === "Yes").length : 0;
        const validationText = validateInputsWithDisplayName(this.state.auditPlanDetails, this.state.configs);
        if (validationText) {
            return alert(validationText);
        }
        else if (AuditSectioCount > AuditorCount) {
            return alert("Auditor selection mandatory in case of Yes selected");
        }
        else {
            const existingState = Object.assign({}, this.state.auditPlanDetails);
            existingState["roleMasterId"] = this.state.roleMasterId;
            existingState["companyMasterId"] = this.state.companyMasterId;
            existingState["plantId"] = this.state.plantId;
            existingState["processFlowCode"] = this.state.processFlowCode;
            if (this.state.auditPlanDetails && this.state.auditPlanDetails.id && this.state.auditPlanDetails.id !== null && this.state.auditPlanDetails.id !== "") {
                //  alert("update");
                this.props.UpdateFinalAuditPlanDetails(existingState, undefined);
            }
            else {
                this.props.saveFinalAuditPlanDetails(existingState, undefined);
            }
        }
    }

    InputTextBox = props => {
        return <CommonStyle.InputControlsDiv
        //width={props.width ? props.width : "15%"}
        >
            <CommonStyle.InputLabel
                color={props.color ? props.color : "#000"}
            >
                {props.headerTitle}
            </CommonStyle.InputLabel>
            <CommonStyle.InputDiv>
                <Input
                    placeholderColor="#7c7c7c"
                    placeholder=""
                    value={props.SelectedValues}
                    paddingLeft="20px"
                    borderRadius="5px"
                    height="33px"
                    type={props.type ? props.type : 'text'}
                    color="#000"
                    borderColor="#000"
                    style={{ backgroundColor: "transparent" }}
                    onChange={this.onValueChanged(props.KeyName)} />
            </CommonStyle.InputDiv>
        </CommonStyle.InputControlsDiv>
    }
    InputTextBoxDateField = props => {
        return <CommonStyle.InputControlsDiv
        //width={props.width ? props.width : "15%"}
        >
            <CommonStyle.InputLabel
                color={props.color ? props.color : "#000"}
            >
                {props.headerTitle}
            </CommonStyle.InputLabel>
            <CommonStyle.InputDiv>
                <Input
                    placeholderColor="#7c7c7c"
                    placeholder=""
                    value={props.SelectedValues}
                    paddingLeft="20px"
                    borderRadius="5px"
                    min={moment(new Date()).format("YYYY-MM-DD")}
                    height="33px"
                    type={props.type ? props.type : 'text'}
                    color="#000"
                    borderColor="#000"
                    style={{ backgroundColor: "transparent" }}
                    onChange={this.onValueChanged(props.KeyName)} />
            </CommonStyle.InputDiv>
        </CommonStyle.InputControlsDiv>
    }

    render() {
        //  const LoggedRole = this.getLoggedUserRole_JSONConverted();
        const { multiSectionMasterId,selfAuditPlan,selfAuditCompanyMasterId, selfAuditPlantMasterId, auditPlanDetails, multiSectionIds, auditSectionAuditorDetails, auditPlanDetailsId, auditeeTeam, coorporateAuditor, processFlowCode, sections, auditTypeAuditorRelations } = this.state;
        console.log("coorporateAuditor", coorporateAuditor); 
        let auditorTeamsoptions = [];
        if (selfAuditCompanyMasterId) {
            auditorTeamsoptions = coorporateAuditor && coorporateAuditor.length > 0 ? coorporateAuditor.filter(flt => flt.companyMasterId !== selfAuditCompanyMasterId).map((item, index) => {
                return { value: item.id, label: item.useFullName }
            }) : [{ value: "-1", label: 'Select Auditor Team' }];
        }
        else {
            auditorTeamsoptions = coorporateAuditor && coorporateAuditor.length > 0 ? coorporateAuditor.map((item, index) => {
                return { value: item.id, label: item.useFullName }
            }) : [{ value: "-1", label: 'Select Auditor Team' }];
        }

        const auditeeTeamoptions = auditeeTeam && auditeeTeam.length > 0 ? auditeeTeam.map((item, index) => {
            return { value: item.id, label: item.useFullName }
        }) : [{ value: "-1", label: 'Select Auditee Team' }];

        //  console.log("this.state.selectedAuditeeTeam", this.state.selectedAuditeeTeam);
        console.log("this.state.auditPlanDetails.auditorDetails", this.state.auditPlanDetails.auditorDetails);
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
                    onClick={() => this.onClickBackButtonCoorporateCoordinator()}
                >
                    Back
                </Button>
                <ViewBasicDetails
                    auditPlanDetailsId={auditPlanDetailsId}
                />
                <CommonStyle.FormDiv
                    flexwrap={"nowrap"}>
                    <CommonStyle.InputControlsDiv
                        width="46%"
                        padding="15px 10px 5px 5px"
                    >
                        <span>Coorporate Auditor Team (M) </span>
                        <Select
                            className="width100p"
                            value={this.state.selectedAuditoTeam && this.state.selectedAuditoTeam}
                            onChange={this.onValueChangedAuditorTeam}
                            options={auditorTeamsoptions}
                            closeMenuOnSelect={false}
                            isMulti={true}
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="46%"
                        padding="15px 10px 5px 5px"
                    >
                        <span>Auditee Team (M)</span>
                        <Select
                            className="width100p"
                            value={this.state.selectedAuditeeTeam && this.state.selectedAuditeeTeam}
                            onChange={this.onValueChangedAuditeeTeam}
                            options={auditeeTeamoptions}
                            closeMenuOnSelect={false}
                            isMulti={true}
                        />
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv
                    flexwrap={"nowrap"}>
                    <CommonStyle.TABLE>
                        <tr>
                            <th>Sr#</th>
                            <th>Section Name</th>
                            <th>Audit Type (Section)</th>
                            <th>Scope Count</th>
                            <th>Section Planned in Self Audit</th>
                            <th> Section Planned in Final Audit</th>
                            <th>
                                Auditor (HR / Operation)
                            </th>
                        </tr>
                        {auditSectionAuditorDetails && auditSectionAuditorDetails.length > 0 && auditSectionAuditorDetails.map((item, index) => {
                            const Auditors = auditTypeAuditorRelations && auditTypeAuditorRelations.length > 0 && auditTypeAuditorRelations.filter(m => m.auditTypeId === item.auditTypeId);
                            const SelectedValue = item.isSectionApplicable && item.isSectionApplicable === 'Yes' ? 'true' : 'false';
                            return <tr key={index}>
                                <td className="textalignleft">{index + 1}</td>
                                <td className="textalignleft">{item.sectionName}</td>
                                <td className="textalignleft">
                                    {item.auditType && item.auditType}
                                </td>
                                <td className="textalignleft">
                                    {item.totalScopeCount}
                                </td>
                                <td className="textalignleft">
                                    {item.isSectionPlannedInSelfAudit}
                                </td>
                                <td>
                                    {/* <input type='Checkbox' /> */}
                                    <SELECT
                                        borderRadius={"5px"}
                                        bgColor={"#fff"}
                                        width={"100px"}
                                        value={SelectedValue ? SelectedValue : 'false'}
                                        height={"40px"}
                                        paddingLeft={"10px"}
                                        onChange={item.totalScopeCount && item.totalScopeCount > 0 ? this.onChangeValue_SectionSelectionNew("Section_Selection", item.id, this.state.finalAuditPlanDetailsId, item.sectionMasterId) : this.onChangeScope0()}
                                    >
                                        <option value='-1'> Select  </option>
                                        <option value='true'> Yes </option>
                                        <option value='false'> No </option>
                                    </SELECT>
                                </td>
                                <td>
                                    <SELECT
                                        borderRadius={"5px"}
                                        bgColor={"#fff"}
                                        width={"200px"}
                                        height={"40px"}
                                        value={item.auditorMasterId ? item.auditorMasterId : ''}
                                        paddingLeft={"10px"}
                                        disabled={SelectedValue === 'false' ? true : false}
                                        onChange={this.onChangeValue_SectionSelectionNew("auditor", item.id, this.state.finalAuditPlanDetailsId, item.sectionMasterId)}
                                    >
                                        <option key={'-1'} >Select Auditor</option>
                                        {Auditors && Auditors.length > 0 && Auditors.map((audi, indexaudit) => {
                                            return <option key={indexaudit} value={audi.singleUserId}>
                                                {audi.userName}
                                            </option>
                                        })}
                                    </SELECT>
                                </td>
                            </tr>
                        })

                        }
                    </CommonStyle.TABLE>
                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv
                    flexwrap={"nowrap"}>
                    <this.InputTextBoxDateField
                        headerTitle="Audit Date"
                        SelectedValues={this.state.auditPlanDetails && this.state.auditPlanDetails.auditFromDate ? this.state.auditPlanDetails.auditFromDate : ''} //{this.state.selfAuditPlan.auditToDate}
                        KeyName="auditFromDate"
                        type="date"
                        width="25%"
                        color="#000"
                    />
                    <this.InputTextBox
                        headerTitle="Remarks"
                        SelectedValues={this.state.auditPlanDetails && this.state.auditPlanDetails.auditPlanRemarks ? this.state.auditPlanDetails.auditPlanRemarks : ''}
                        KeyName="auditPlanRemarks"
                        type="text"
                        color="#000"
                        width="25%"
                    />
                    <CommonStyle.ButtonDiv
                        style={{ paddingTop: '44px' }}
                        width="50%"
                    >
                        <Button
                            bgColor="#358856"
                            color="#ffffff"
                            height="40px"
                            width="48%"
                            zIndex="0"
                            bgChangeHover="#4FA64F"
                            hoverColor="#ffffff"
                            border="solid 1px #4FA64F"
                            onClick={() => this.onClickSubmit()}
                        >
                            Submit
                        </Button>
                        {/* <Button
                            bgColor="#ad0000"
                            color="#ffffff"
                            height="40px"
                            width="48%"
                            bgChangeHover="#ffffff"
                            hoverColor="#ad0000"
                            border="solid 1px #ad0000"
                            onClick={() => this.onClickCancel()}
                        // onClick={() => this.resetValues()}
                        >
                            Cancel
                        </Button> */}
                    </CommonStyle.ButtonDiv>
                </CommonStyle.FormDiv>
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    const { selfAuditPlan, finalAuditPlan, finalAuditPlanActiontype, finalAuditSectionDetails } = state.workingReducer;
    const { sections, auditTypeAuditorRelations, userActiontype, users } = state.adminReducer;

    return { errorType, errorMessage, finalAuditPlan, finalAuditPlanActiontype, sections, userActiontype, finalAuditSectionDetails, users, auditTypeAuditorRelations, selfAuditPlan };
};

//export default connect(mapStateToProps, { getUserDetailsP, AssignAuditTeamDetails, getSelfAuditDetailsByResponsibilityWiseDetails, UpdateSelfAuditPlanDetails, getUserByPlantId, hideError })(executeAudit);

export default withRouter(connect(mapStateToProps, { saveFinalAuditPlanDetails, UpdateFinalAuditPlanDetails, getSectionMasterDetails_ForFinalAuditPlan, getAuditTypeAuditorRelationMasterData_AllUsers, getSectionMasterData, getUserDetailsP, getSelfAuditPlanDetailsById, getUserByPlantId, hideError })(executeAudit));
