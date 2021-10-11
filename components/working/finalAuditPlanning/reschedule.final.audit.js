import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle';
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getCompanyMaster, getPlantMaster, getPlantMasterByGroupCompanyId } from '../../../actions/admin.action';
import { getFinalAuditPlanDetails, rescheduleFinalAuditDetails, initFinalAuditPlanDetails, UpdateFinalAuditPlanDetails, getSelfAuditPlanDetails, getSelfAuditPlanDetails_BySequilize, getSelfAuditPlanDetailsById, UpdateSelfAuditPlanDetails, deleteSelfAuditPlanDetails, initSelfAuditPlanDetails } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
//import SelfAuditPlanDetails from '../../masters/selfAuditPlans'
import { hideError, showError } from '../../../actions/error.actions';
import * as MasterType from '../../../action-types/admin.action.types';
import * as WorkingType from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import ListTable from '../../shared/ListTable';
//import AuditDetails from './auditDetails';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import ReactTable from '../../ReactTableComponent';
import moment from 'moment';
import { saveSelfAuditPlanId, saveSelfAuditMultiSectionID } from '../../../utils/session.helper';
import CancelFinalAuditDetails from './cancel.final.audit';
import Select from 'react-select';
const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })

class SelfAuditPlanningDetails extends Wrapper {

    constructor(props) {
        super(props);
        this.companyMasterIdRefs = React.createRef();
        this.plantMasterIdRefs = React.createRef();

        this.state = {
            finalAuditPlans: [],
            companys: [],
            plants: [],
            rescheduleDetails: {
                isAuditRescheduled: true,
                auditRescheduledOn: new Date(),
                auditFromDate: null,
                auditToDate: null,
                reasonOfReschedule: null
            },
            showCancelPopup: false,
            openPopup: false,
            filterParameter: {
                executedAuditExclude: 'Yes',
                cancelledAuditExclude: 'Yes'
            },
            selectedFinalAuditPlans: [],
            columns: [],
            SelectedId: [],
            configs: [
                {
                    name: 'auditFromDate',
                    displayname: 'Audit Date',
                    type: 'string',
                    required: true
                }, {
                    name: 'reasonOfReschedule',
                    displayname: 'Reason of reschedule',
                    type: 'string',
                    required: true
                }
            ],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(
            this
        );

    };

    handleChange = () => {
        var selectAll = !this.state.selectAll;
        this.setState({ selectAll: selectAll });
        var checkedCopy = [];
        var SelectedId = [];
        this.state.finalAuditPlans.forEach(function (e, index) {
            checkedCopy.push(selectAll);
            if (selectAll === true) {
                SelectedId.push(e.id);
            }
        });
        this.setState({
            checked: checkedCopy,
            SelectedId: SelectedId
        });
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 200);
    };
    removeCheckboxChange = () => {
        var selectAll = false;
        this.setState({ selectAll: selectAll });
        var checkedCopy = [];
        var SelectedId = [];
        this.state.finalAuditPlans.forEach(function (e, index) {
            checkedCopy.push(false);
        });
        this.setState({
            checked: checkedCopy,
            SelectedId: SelectedId
        });
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 200);
    };

    handleSingleCheckboxChange = (index, id) => {
        console.log(index);

        var checkedCopy = this.state.checked;
        var SelectedId = this.state.SelectedId;
        checkedCopy[index] = !this.state.checked[index];
        if (checkedCopy[index] === false) {
            this.setState({ selectAll: false });
            SelectedId = SelectedId && SelectedId.filter(item => item !== id);
            // SelectedId[index] = undefined;
        }
        else {
            SelectedId.push(id);
        }

        this.setState({
            checked: checkedCopy,
            SelectedId: SelectedId
        });
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 200);
    };
    updateColumnWhenPropsUpdate = () => {
        let columns = [
            {
                Header: (
                    <input
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={this.state.selectAll}
                    />
                ),
                accessor: 'id',
                id: 'id',
                show: true,
                Cell: row => (
                    <React.Fragment>
                        <input
                            type="checkbox"
                            defaultChecked={this.state.checked[row.index]}
                            checked={this.state.checked[row.index]}
                            onChange={() => this.handleSingleCheckboxChange(row.index, row.original.id)}
                        />
                        {/* <input type='checkbox' onClick={() => this.onClickCheckbox(propss.original.id)} /> */}
                    </React.Fragment>
                ),
                style: { 'text-align': "center" },
                minWidth: 80,
                sortable: false,
                filterable: false
            },
            {
                Header: 'Sr#',
                minWidth: 50,
                id: 'srnumber',
                style: { 'text-align': "center" },
                show: true,
                Cell: row => (
                    <React.Fragment>
                        {row.index + 1}
                    </React.Fragment>
                ),
                sortable: true,
                filterable: false
            },
            {
                Header: 'Audit Id',
                accessor: 'auditNumber',
                id: 'auditNumber',
                show: true,
            },
            {
                Header: 'Plant',
                accessor: 'plantName',
                id: 'plantName',
                minWidth: 200,
                show: true,
            },
            // {
            //     Header: 'Audit Date',
            //     accessor: 'auditFromDate',
            //     id: 'auditFromDate',
            //     show: true,
            // },
            {
                Header: 'Audit Date',
                accessor: d => `${d.auditFromDate && moment(new Date(d.auditFromDate)).format("YYYY-MM-DD")}`,
                id: 'auditFromDate',
                show: true,
            },
            {
                Header: 'Self Audit Section',
                accessor: d => `${d.selfAuditSectionName}`,
                id: 'selfAuditSectionName',
                style: { 'white-space': "pre-wrap" },
                minWidth: 200,
                show: true
            },
            {
                Header: 'Corporate Auditor Team',
                accessor: d => `${d.CorporateAuditorTeamName}`,
                id: 'CorporateAuditorTeamName',
                style: { 'white-space': "pre-wrap" },
                minWidth: 150,
                show: true
            },
            {
                Header: 'Plant Auditee Team',
                accessor: d => `${d.AuditeeTeamName}`,
                id: 'AuditeeTeamName',
                style: { 'white-space': "pre-wrap" },
                minWidth: 150,
                show: true
            },
            {
                Header: 'Audit Plan Remarks',
                accessor: d => `${d.auditPlanRemarks} `,// 'LeadEmail',
                id: 'auditPlanRemarks',
                style: { 'white-space': "pre-wrap" },
                show: true
            },
        ]
        this.setState({ columns: columns });
    }
    componentDidMount() {
        const filterParameter = this.state.filterParameter;
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getFinalAuditPlanDetails(filterParameter);
        this.updateColumnWhenPropsUpdate();
    }

    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.companys && nextProps.companys != this.state.companys) {
            this.setState({
                companys: nextProps.companys
            });
        }
        if (nextProps.finalAuditPlanActiontype && nextProps.finalAuditPlanActiontype === WorkingType.FINALAUDITPLANDETAILS_SAVE_SUCCESS) {
            const filterParameter = this.state.filterParameter;
            this.props.getFinalAuditPlanDetails(filterParameter);
            this.props.initFinalAuditPlanDetails();
        }
        if (nextProps.plants && nextProps.plants != this.state.plants) {
            this.setState({
                plants: nextProps.plants
            });
        }

        if (nextProps.finalAuditPlans && nextProps.finalAuditPlans != this.state.finalAuditPlans) {

            var checkedCopy = [];
            var selectAll = this.state.selectAll;
            nextProps.finalAuditPlans.forEach(function (e, index) {
                checkedCopy.push(selectAll);
            });
            this.setState({
                finalAuditPlans: nextProps.finalAuditPlans,
                checked: checkedCopy,
                selectAll: selectAll
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

    onClickBackToFinalAuditPlanDetails = () => {
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
                tab: 'final-audit-planning',
                query: {
                    tab: 'final-audit-planning',
                    pageName: 'Final Audit Plan',
                }
            },
            'corporateCoordinator/final-audit-planning'
        );
    }

    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onValueChangedCompany = selectedOption => {
        let selecteddata = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selecteddata) {
            selecteddata = ['pb'];
        }
        const strinCompanyIds = this.returnIdsFunction(selecteddata);
        const existingState = Object.assign({}, this.state.filterParameter);
        existingState["companyMasterId"] = strinCompanyIds;
        this.props.getFinalAuditPlanDetails(existingState);
        this.props.getPlantMasterByGroupCompanyId(selecteddata);
        this.setState({ filterParameter: existingState, selectedCompany: selectedOption, selectedCompanyIds: selecteddata });
    };
    refreshData = () => {
        let filterParameter = {
            executedAuditExclude: 'Yes',
            cancelledAuditExclude: 'Yes'
        };
        this.props.getFinalAuditPlanDetails(filterParameter);
    }
    onValueChangedPlant = selectedOption => {
        let selectedPlant = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selectedPlant) {
            selectedPlant = ['pb'];
        }
        const strinPlantIds = this.returnIdsFunction(selectedPlant);
        const existingState = Object.assign({}, this.state.filterParameter);
        existingState["plantMasterId"] = strinPlantIds;
        this.props.getFinalAuditPlanDetails(existingState);
        this.setState({ filterParameter: existingState, selectedPlants: selectedOption, selectedPlantsId: selectedPlant });
    };
    onClickCancel = () => {
        const state = {};
        this.state.selectedPlants = null;
        this.state.selectedCompany = null;
        const selectedIds = this.state.SelectedId;
        this.state.rescheduleDetails = {
            isAuditRescheduled: true,
            auditRescheduledOn: moment(new Date()).format("YYYY-MM-DD"),
            reasonOfReschedule: null,
            auditFromDate: null,
            auditToDate: null
        }
        if (selectedIds && selectedIds.length > 0) {
            this.removeCheckboxChange();
        }
        this.refreshData();
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }
    onSubmit = async () => {
        const newDataForInsert = [
            {
                id: null,
                auditFromDate: null,
                auditToDate: null,
                reasonOfReschedule: null
            }
        ];
        let newDataForInsertPush = [];
        const selectedAuditDetails = this.state.SelectedId;
        const rescheduleDetails = this.state.rescheduleDetails;
        const auditFromDate = rescheduleDetails && rescheduleDetails.auditFromDate;
        const auditToDate = rescheduleDetails && rescheduleDetails.auditToDate;
        const reasonOfReschedule = rescheduleDetails && rescheduleDetails.reasonOfReschedule;
        const validationText = validateInputsWithDisplayName(this.state.rescheduleDetails, this.state.configs);
        if (validationText) {
            return alert(validationText);
        }
        else if (selectedAuditDetails === null || selectedAuditDetails === undefined || selectedAuditDetails.length === 0) {
            return alert("Please select at least one audit !!");
        }
        else {
            const Lengthofdata = selectedAuditDetails && selectedAuditDetails.length;
            //  let selectedIds = selectedSelfAuditDetails && selectedSelfAuditDetails.length > 0 && selectedSelfAuditDetails.map((item) => item.id);



            this.setState({ rescheduleDetails: existingState });
            for (let index = 0; index < Lengthofdata; index++) {
                let data = {
                    id: selectedAuditDetails[index],
                    isAuditRescheduled: true,
                    auditRescheduledOn: moment(new Date()).format("YYYY-MM-DD"),
                    auditFromDate: auditFromDate,
                    auditToDate: auditToDate,
                    reasonOfReschedule: reasonOfReschedule
                }
                newDataForInsertPush = newDataForInsertPush && newDataForInsertPush.length > 0 ? newDataForInsertPush.concat(data) : [data];
            }
            console.log("newDataForInsertPush", newDataForInsertPush);
            const existingState = Object.assign({}, this.state.rescheduleDetails);
            existingState["auditDetails"] = newDataForInsertPush;
            existingState["SelectedAuditDetailsIds"] = JSON.stringify(selectedAuditDetails);
            this.props.rescheduleFinalAuditDetails(existingState, undefined);
            setTimeout(() => {
                this.onClickCancel();
            }, 1000);
        }
    }


    onValueChanged = key => event => {
        console.log("key : ", key);
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingState = Object.assign({}, this.state.rescheduleDetails);
        existingState[key] = selectedValue;// Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (key === "auditFromDate") {
            existingState["auditToDate"] = selectedValue;
        }
        this.setState({ rescheduleDetails: existingState });
    };
    onClickGoToPlanningDetailsAudit = () => {
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
                query: {
                    tab: 'final-audit-planning', 
                    pageName: 'Final Audit Planing', 
                },
                tab: 'final-audit-planning',
            },
            'corporateCoordinator/final-audit-planning'
        )
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
                    value={props.SelectedValues ? props.SelectedValues : undefined}
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
    render() {
        const { companys, plants, SelectedId, rescheduleDetails, selectedFinalAuditPlans, cancelFinalAuditPopup, finalAuditDetail, openPopup, columns } = this.state;
         const options = plants && plants.length > 0 ? plants.map((item, index) => {
            return { value: item.id, label: item.plantName }
        }) : [{ value: "-1", label: 'Select Plant' }];

        const Companyoption = companys && companys.length > 0 ? companys.map((item, index) => {
            return { value: item.id, label: item.companyName }
        }) : [{ value: "-1", label: 'Select Company' }];
       return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                textalign={"left"}
                flexdirection="column"
            >
                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="35%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "5px" }}>Company</span>
                        <Select
                            className="width100p"
                            value={this.state.selectedCompany && this.state.selectedCompany}
                            onChange={this.onValueChangedCompany}
                            options={Companyoption}
                            closeMenuOnSelect={false}
                            isMulti={true}
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="35%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "5px" }}>Plant</span>
                        <Select
                            className="width100p"
                            value={this.state.selectedPlants && this.state.selectedPlants}
                            onChange={this.onValueChangedPlant}
                            options={options}
                            closeMenuOnSelect={false}
                            isMulti={true}
                        />

                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="15%"
                        padding="30px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "8px" }}> &nbsp;</span>
                        <Button
                            bgColor="#ad0000"
                            color="#ffffff"
                            height="35px"
                            borderRadius={"10px"}
                            width="48%"
                            bgChangeHover="#ffffff"
                            hoverColor="#ad0000"
                            zIndex="0"
                            border="solid 1px #ad0000"
                            style={{ marginTop: "3px", fontSize: "11px", }}
                            onClick={() => this.onClickCancel()}
                        >
                            RESET
                        </Button>
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv>
                    <div style={{ width: '100%' }}>
                        <ReactTable
                            Data={this.state.finalAuditPlans}
                            sectionFilterApplicable={true}
                            isColumnUpdate={true}
                            defaultPageSize={1000}
                            updateColumn={this.updateColumn}
                            columns={columns}
                        />
                    </div>
                    <CommonStyle.InputControlsDiv
                        width="100%"
                        padding="0px 0px 0px 0px"
                    >
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv>
                    <this.InputTextBox
                        headerTitle={'Audit Date'}
                        SelectedValues={rescheduleDetails && rescheduleDetails.auditFromDate ? rescheduleDetails.auditFromDate : undefined} //{this.state.selfAuditPlan.auditFromDate}
                        KeyName="auditFromDate"
                        type="date"
                        width="27%"
                        color="#000"
                    />
                    {/* <this.InputTextBox
                        headerTitle="To Date"
                        SelectedValues={this.state.rescheduleDetails && this.state.rescheduleDetails.auditToDate ? this.state.selfAuditPlan.auditToDate : ''} //{this.state.selfAuditPlan.auditToDate}
                        KeyName="auditToDate"
                        type="date"
                        width="27%"
                        color="#000"
                    /> */}
                    <this.InputTextBox
                        headerTitle="Reason Of Reschedule"
                        SelectedValues={this.state.rescheduleDetails && this.state.rescheduleDetails.reasonOfReschedule ? this.state.rescheduleDetails.reasonOfReschedule : ''}
                        KeyName="reasonOfReschedule"
                        type="text"
                        color="#000"
                        width="27%"
                    />
                    <CommonStyle.ButtonDiv
                        style={{ paddingTop: '44px' }}
                        width="43%"
                    >
                        <Button
                            bgColor="#358856"
                            color="#ffffff"
                            height="40px"
                            width="48%"
                            margin={"0px 5px 0px 0px"}
                            borderRadius={"10px"}
                            bgChangeHover="#4FA64F"
                            hoverColor="#ffffff"
                            fontsize={"14px"}
                            zIndex="0"
                            border="solid 1px #358856"
                            onClick={() => this.onSubmit()}
                        >
                            Submit
                    </Button>
                        <Button
                            bgColor="#ad0000"
                            color="#ffffff"
                            height="40px"
                            width="48%"
                            margin={"0px 5px 0px 0px"}
                            borderRadius={"10px"}
                            bgChangeHover="#ffffff"
                            hoverColor="#ad0000"
                            fontsize={"14px"}
                            zIndex="0"
                            border="solid 1px #ad0000"
                            onClick={() => this.onClickCancel()}
                        // onClick={() => this.resetValues()}
                        >
                            Cancel
                    </Button>
                        <Button
                            bgColor="#cc5d13"
                            color="#ffffff"
                            height="40px"
                            width="48%"
                            borderRadius={"10px"}
                            bgChangeHover="#ffffff"
                            hoverColor="#cc5d13"
                            fontsize={"14px"}
                            zIndex="0"
                            border="solid 1px #cc5d13"
                          onClick={() => this.onClickGoToPlanningDetailsAudit()}
                        >
                            Back
                    </Button>
                    </CommonStyle.ButtonDiv>
                </CommonStyle.FormDiv>
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { finalAuditPlans, selfAuditPlan, selfAuditPlans, finalAuditPlanActiontype, selfAuditPlanRecordsCount, selfAuditPlanActiontype } = state.workingReducer;
    const { plants, companys } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { finalAuditPlans, companys, plants, finalAuditPlanActiontype, selfAuditPlan, selfAuditPlanActiontype, selfAuditPlans, errorType, errorMessage, selfAuditPlanRecordsCount, selfAuditPlanActiontype };
};

//export default connect(mapStateToProps, { getCompanyMaster, getSelfAuditPlanDetails_BySequilize, getSelfAuditPlanDetailsById, getPlantMaster, UpdateSelfAuditPlanDetails, deleteSelfAuditPlanDetails, initSelfAuditPlanDetails, getSelfAuditPlanDetails, hideError })(SelfAuditPlanningDetails);
export default withRouter(connect(mapStateToProps, { rescheduleFinalAuditDetails, getFinalAuditPlanDetails, initFinalAuditPlanDetails, getPlantMasterByGroupCompanyId, UpdateFinalAuditPlanDetails, getCompanyMaster, getSelfAuditPlanDetails_BySequilize, getSelfAuditPlanDetailsById, getPlantMaster, UpdateSelfAuditPlanDetails, deleteSelfAuditPlanDetails, initSelfAuditPlanDetails, getSelfAuditPlanDetails, hideError })(SelfAuditPlanningDetails));
