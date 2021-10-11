import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle';
import { UpdateSelfAuditPlanDetails,AssignAuditTeamDetails ,getSelfAuditDetailsByResponsibilityWiseDetails} from '../../../actions/working.action';
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
import { uniqueId } from '../../../utils';
import InputText from '../../shared/InputBox';

import dynamic from 'next/dynamic';
import next from 'next';

const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })


class Index extends Wrapper {

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
            selfAuditPlan: [],
            auditPlantDetails: [],
            plants: [],
            yearTypes: [],
            years: [],
            companys: [],
            sections: [],
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
                    required: false
                }, {
                    name: 'multiAuditeeTeamId',
                    displayname: 'Auditee Team',
                    type: 'string',
                    required: false
                }
            ],
            auditorTeams: null,
            auditeeTeam: null,
            selectedAuditoTeam: undefined,
            selectedAuditeeTeam: undefined,
            selectedAuditoTeamIds: undefined,
            selectedAuditeeTeamIds: undefined,
            teamAssignedDetails: {
                id: props.selectedAuditPlanDetailsId ? props.selectedAuditPlanDetailsId : undefined,
                isAuditTeamAssigned: true,
                teamAssignedOn: moment(new Date()).format("YYYY-MM-DD"),
                teamAssignmentRemarks: null,
                LeadAuditorId: null,
                multiAuditorTeamId: null,
                multiAuditeeTeamId: null
            }
        };

    };


    componentDidMount() {
        const loggedUser = getLoggedUser();

        let plantMasterId = loggedUser && loggedUser.plantMasterId;
        let Filter = {
            companyMasterId: loggedUser && loggedUser.plantMaster && loggedUser.plantMaster.companyMasterID
        }

        const existingState = Object.assign({}, this.state.teamAssignedDetails);
        existingState["leadAuditorId"] = loggedUser && loggedUser.id;

        this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, Filter);
        this.props.getUserByPlantId(0, constants.ALL_ROWS_LIST, undefined, undefined, plantMasterId);
        this.setState({ teamAssignedDetails: existingState })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.users && MasterType.USER_LIST_SUCCESS === nextProps.userActiontype && nextProps.users != this.state.auditorTeams) {
            this.setState({
                auditorTeams: nextProps.users
            });
        }
        if (nextProps.users && MasterType.USER_GET_BY_PLANTID_SUCCESS === nextProps.userActiontype && nextProps.users != this.state.auditeeTeam) {
            this.setState({
                auditeeTeam: nextProps.users
            });
        }
        if (nextProps.selectedAuditPlanDetailsId && nextProps.selectedAuditPlanDetailsId !== null && nextProps.selectedAuditPlanDetailsId != this.state.selectedAuditPlanDetailsId) {
            const existingState = Object.assign({}, this.state.teamAssignedDetails);
            existingState["id"] = nextProps.selectedAuditPlanDetailsId;
            this.setState({
                teamAssignedDetails: existingState,
                selectedAuditPlanDetailsId: nextProps.selectedAuditPlanDetailsId
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

    onSubmit = async () => {
        const selectedAuditoTeam = this.state.selectedAuditoTeam;
        const selectedAuditeeTeam = this.state.selectedAuditeeTeam;
        const teamAssignedDetails = this.state.teamAssignedDetails;
        const validationText = validateInputsWithDisplayName(this.state.teamAssignedDetails, this.state.configs);
        if (validationText) {
            return alert(validationText);
        }
        // else if (selectedAuditoTeam === null || selectedAuditoTeam === undefined || selectedAuditoTeam.length === 0) {
        //     return alert("Please select at least one auditor in team !!");
        // }
        // else if (selectedAuditeeTeam === null || selectedAuditeeTeam === undefined || selectedAuditeeTeam.length === 0) {
        //     return alert("Please select at least one auditee in team !!");
        // }
        else {
            const loggedUser =this.loggedUser();
            const existingState = Object.assign({}, this.state.teamAssignedDetails);
            existingState["leadAuditorId"] = loggedUser && loggedUser.id;
            let Updatetype = "Team assignment";
            this.setState({teamAssignedDetails:existingState})
            this.props.AssignAuditTeamDetails(existingState, undefined);
            setTimeout(() => {
                this.props.getSelfAuditDetailsByResponsibilityWiseDetails(0, constants.ALL_ROWS_LIST, undefined, undefined, this.props.processFlowCode, undefined);
            }, 1000);
         
        }
    }

    onClickCancel = () => {
        const state = {};
        this.state.selfAuditPlan = [];
        this.state.auditPlantDetails = [];
        this.selectedSectionIds = [];
        this.state.selectedAuditoTeam = null;
        this.state.selectedAuditeeTeam = null;
        this.state.selectedAuditoTeamIds = null;
        this.state.selectedAuditeeTeamIds = null;
        this.state.teamAssignedDetails = {
            isAuditTeamAssigned: true,
            teamAssignedOn: moment(new Date()).format("YYYY-MM-DD"),
            teamAssignmentRemarks: null,
            LeadAuditorId: null,
            multiAuditorTeamId: null,
            multiAuditeeTeamId: null
        }
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
        this.props.onClickCloseButton();
    }

    onValueChanged = key => event => {
        // console.log("key : ", key);
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingState = Object.assign({}, this.state.teamAssignedDetails);
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ teamAssignedDetails: existingState });
    };

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
        const { yearTypes, years, teamAssignedDetails, auditorTeams, auditeeTeam } = this.state;
        const loggedUser = getLoggedUser();
        const loggedUserRole = getLoggedUserRole_JSONConverted();
        const auditorTeamsoptions = auditorTeams && auditorTeams.length > 0 ? auditorTeams.map((item, index) => {
            return { value: item.id, label: item.useFullName }
        }) : [{ value: "-1", label: 'Select Auditor Team' }];

        const auditeeTeamoptions = auditeeTeam && auditeeTeam.length > 0 ? auditeeTeam.map((item, index) => {
            return { value: item.id, label: item.useFullName }
        }) : [{ value: "-1", label: 'Select Auditee Team' }];
        console.log("teamAssignedDetails", teamAssignedDetails);
        const UserName = loggedUser && loggedUser.firstName + " " + loggedUser.lastName;
        const RoleName = loggedUserRole && loggedUserRole.roleName;
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                <CommonStyle.FormDiv
                    flexwrap={"nowrap"}
                >
                    <CommonStyle.InputControlsDiv
                        width="46%"
                        padding="15px 10px 5px 5px"
                    >
                        <span style={{ paddingBottom: '10px' }}>Lead Auditor ({RoleName ? RoleName : 'Plant HR Head'})</span>
                        <CommonStyle.MainDiv
                            bgColor={"grey"}
                            height={"40px"}
                            borderradius={'10px'}
                            justifycontent={"center"}
                            textalign={"left"}
                            color={"white"}
                            style={{textTransform:'capitalize'}}

                        >
                            {UserName}
                        </CommonStyle.MainDiv>
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="46%"
                        padding="15px 10px 5px 5px"
                    >
                        <InputText label="Remarks: (optional)" type='text' defaultValue={this.state.teamAssignedDetails.teamAssignmentRemarks} onChange={this.onValueChanged('teamAssignmentRemarks')} />

                    </CommonStyle.InputControlsDiv>

                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv
                    flexwrap={"nowrap"}>
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
                    <CommonStyle.InputControlsDiv
                        width="46%"
                        padding="15px 10px 5px 5px"
                    >
                        <span>Auditor Team (M)</span>
                        <Select
                            className="width100p"
                            value={this.state.selectedAuditoTeam && this.state.selectedAuditoTeam}
                            onChange={this.onValueChangedAuditorTeam}
                            options={auditorTeamsoptions}
                            closeMenuOnSelect={false}
                            isMulti={true}
                        />
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <span style={{ width: "100%", border: "solid 1px #ccc", marginTop: "20px" }}></span>

                <CommonStyle.MainDiv
                    justifycontent={"space-around"}
                    width={'70%'}
                >
                    <CommonStyle.ButtonDiv
                        style={{ paddingTop: '44px' }}
                        width="100%"
                    >
                        <Button
                            bgColor="#005900"
                            color="#ffffff"
                            height="40px"
                            zIndex={"0"}
                            width="48%"
                            bgChangeHover="#ffffff"
                            hoverColor="#005900"
                            border="solid 1px #005900"
                            onClick={() => this.onSubmit()}
                        >
                            Submit
                    </Button>
                        <Button
                            bgColor="#ad0000"
                            color="#ffffff"
                            height="40px"
                            zIndex={"0"}
                            width="48%"
                            bgChangeHover="#ffffff"
                            hoverColor="#ad0000"
                            border="solid 1px #ad0000"
                            onClick={() => this.onClickCancel()}
                        // onClick={() => this.resetValues()}
                        >
                            Cancel
                    </Button>
                    </CommonStyle.ButtonDiv>
                </CommonStyle.MainDiv>

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
    const { selfAuditPlan, selfAuditPlans, selfAuditPlanRecordsCount, selfAuditPlanActiontype,selfAuditScoreDetailActiontype } = state.workingReducer;
    const { users, userActiontype } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { users, userActiontype, errorType, errorMessage, selfAuditPlans };
};

export default connect(mapStateToProps, { getUserDetailsP,AssignAuditTeamDetails,getSelfAuditDetailsByResponsibilityWiseDetails, UpdateSelfAuditPlanDetails, getUserByPlantId, hideError })(Index);