import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getSelfAuditForReschedule, initSelfAuditPlanDetails, getSelfAuditPlanDetailsById, rescheduleSelfAuditDetails, saveSelfAuditPlanDetails } from '../../../actions/working.action';
import { getYearTypeMasterData, getYearMasterData, getPlantMasterByGroupCompanyId, getCompanyMaster, getSectionMasterData } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper';
import ListTable from '../../shared/ListTable';
//import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import moment from 'moment';
import Gap from '../../Gap';
import ReactTable from '../../ReactTableComponent';
//import SelfAuditPlanDetails from '../../masters/selfAuditPlans'
import { hideError, showError } from '../../../actions/error.actions';
import * as MasterType from '../../../action-types/admin.action.types';
import * as WorkingType from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';
import { withRouter } from 'next/router';
import MultiSelect from "react-multi-select-component";


import dynamic from 'next/dynamic';

//const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })


class rescheduleSelfAudit extends Wrapper {

    companyMasterIdRefs = undefined;
    plantMasterIdRefs = undefined;
    sectionMasterIdRefs = undefined;
    constructor(props) {
        super(props);
        this.companyMasterIdRefs = React.createRef();
        this.plantMasterIdRefs = React.createRef();
        this.sectionMasterIdRefs = React.createRef();
        this.state = {
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            selfAuditPlan: [],
            auditPlantDetails: [],
            plants: [],
            yearTypes: [],
            selfAuditPlans: [],
            years: [],
            companys: [],
            SelectedId: [],
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
                    name: 'auditFromDate',
                    displayname: 'Audit From Date',
                    type: 'string',
                    required: true
                }, {
                    name: 'auditToDate',
                    displayname: 'Audit To Date',
                    type: 'string',
                    required: true
                }, {
                    name: 'reasonOfReschedule',
                    displayname: 'Reason of reschedule',
                    type: 'string',
                    required: true
                }
            ],
            selectedYearTypeMasterId: null,
            selectedCompany: [],
            selectedCompanyIds: [],
            selectedPlants: [],
            selectedPlantsId: [],
            selectedyearTypes: [],
            selectedYearTypeId: [],
            selectedSelfAuditDetails: [],
            columns: [],
            rescheduleDetails: {
                isAuditRescheduled: true,
                auditRescheduledOn: moment(new Date()).format("YYYY-MM-DD"),
                reasonOfReschedule: null,
                auditFromDate: null,
                auditToDate: null
            }
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
        this.state.selfAuditPlans.forEach(function (e, index) {
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
        this.state.selfAuditPlans.forEach(function (e, index) {
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
        //   console.log(index);

        var checkedCopy = this.state.checked;
        var SelectedId = this.state.SelectedId;
        checkedCopy[index] = !this.state.checked[index];
        if (checkedCopy[index] === false) {
            this.setState({ selectAll: false });
            SelectedId = SelectedId && SelectedId.filter(item => item !== id);
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
                Header: 'Audit Number',
                accessor: 'selfAuditNumber',
                id: 'selfAuditNumber',
                show: true,
            },
            {
                Header: 'Company',
                accessor: 'company.companyName',
                id: 'companyName',
                minWidth: 200,
                show: true,
            },
            {
                Header: 'Plant',
                accessor: 'plant.plantName',
                id: 'plantName',
                minWidth: 200,
                show: true,
            },
            {
                Header: 'Sections',
                accessor: d => `${d.sections}`,
                id: 'sections',
                style: { 'white-space': "pre-wrap" },
                minWidth: 200,
                show: true
            },
            {
                Header: 'Audit From',
                accessor: d => `${d.auditFromDate && moment(new Date(d.auditFromDate)).format("YYYY-MM-DD")}`,
                id: 'auditFromDate',
                show: true,
            },
            {
                Header: 'Audit To',
                accessor: d => `${d.auditToDate && moment(new Date(d.auditToDate)).format("YYYY-MM-DD")}`,
                id: 'auditToDate',
                show: true,
            },
            {
                Header: 'Plan Remarks',
                accessor: 'auditPlanRemarks',
                id: 'auditPlanRemarks',
                style: { 'white-space': "pre-wrap" },
                minWidth: 200,
                show: true
            }
        ]
        this.setState({ columns: columns });
    }
    componentDidMount() {
        this.props.getYearTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        //   this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSelfAuditForReschedule(['pb']);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 200);
        //  this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.companys && nextProps.companys != this.state.companys) {
            this.setState({
                companys: nextProps.companys
            });

        }
        if (nextProps.yearTypes && nextProps.yearTypes != this.state.yearTypes) {
            this.setState({
                yearTypes: nextProps.yearTypes
            });
        }
        if (nextProps.selfAuditPlans && nextProps.selfAuditPlans != this.state.selfAuditPlans) {

            var checkedCopy = [];
            var selectAll = this.state.selectAll;
            nextProps.selfAuditPlans.forEach(function (e, index) {
                checkedCopy.push(selectAll);
            });
            this.setState({
                selfAuditPlans: nextProps.selfAuditPlans,
                checked: checkedCopy,
                selectAll: selectAll
            });
        }
        if (nextProps.plants && nextProps.plants !== null && nextProps.plants != this.state.plants) {
            this.setState({
                plants: nextProps.plants
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
        const newDataForInsert = [
            {
                id: null,
                auditFromDate: null,
                auditToDate: null,
                reasonOfReschedule: null
            }
        ];
        let newDataForInsertPush = [];
        const selectedSelfAuditDetails = this.state.SelectedId;
        const rescheduleDetails = this.state.rescheduleDetails;
        const auditFromDate = rescheduleDetails && rescheduleDetails.auditFromDate;
        const auditToDate = rescheduleDetails && rescheduleDetails.auditToDate;
        const reasonOfReschedule = rescheduleDetails && rescheduleDetails.reasonOfReschedule;
        const validationText = validateInputsWithDisplayName(this.state.rescheduleDetails, this.state.configs);
        if (validationText) {
            return alert(validationText);
        }
        else if (selectedSelfAuditDetails === null || selectedSelfAuditDetails === undefined || selectedSelfAuditDetails.length === 0) {
            return alert("Please select at least one audit !!");
        }
        else {
            const Lengthofdata = selectedSelfAuditDetails && selectedSelfAuditDetails.length;
            let selectedIds = selectedSelfAuditDetails; selectedSelfAuditDetails && selectedSelfAuditDetails.length > 0 && selectedSelfAuditDetails.map((item) => item.id);



            this.setState({ rescheduleDetails: existingState });
            for (let index = 0; index < Lengthofdata; index++) {
                let data = {
                    id: selectedSelfAuditDetails[index],
                    isAuditRescheduled: true,
                    auditRescheduledOn: moment(new Date()).format("YYYY-MM-DD"),
                    auditFromDate: auditFromDate,
                    auditToDate: auditToDate,
                    reasonOfReschedule: reasonOfReschedule
                }
                newDataForInsertPush = newDataForInsertPush && newDataForInsertPush.length > 0 ? newDataForInsertPush.concat(data) : [data];
            }
            // console.log("newDataForInsertPush", newDataForInsertPush);
            const existingState = Object.assign({}, this.state.rescheduleDetails);
            existingState["SelfAuditDetails"] = newDataForInsertPush;
            existingState["SelectedSelfAuditDetailsIds"] = JSON.stringify(selectedIds);
            this.props.rescheduleSelfAuditDetails(existingState, undefined);
            setTimeout(() => {
                this.onClickCancel();
            }, 1000);
        }
    }

    onClickCancel = () => {
        const state = {};
        this.state.selfAuditPlan = [];
        this.state.auditPlantDetails = [];
        this.selectedSectionIds = [];
        this.state.selectedPlants = null;
        this.state.selectedCompany = null;
        const data = [{ id: '' }]
        this.props.getSelfAuditForReschedule(data);
        this.props.getPlantMasterByGroupCompanyId(['null']);
        this.state.rescheduleDetails = {
            isAuditRescheduled: true,
            auditRescheduledOn: moment(new Date()).format("YYYY-MM-DD"),
            reasonOfReschedule: null,
            auditFromDate: moment(new Date()).format("YYYY-MM-DD"),
            auditToDate: moment(new Date()).format("YYYY-MM-DD")
        }
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }
    onClickGoToPlanningDetailsAudit = () => {
        this.props.router.push(
            {
                pathname: 'corporateCoordinator/self-audit-planning-details',
                query: {
                    tab: 'self-audit-planning-details',
                    id: 'dv-PG_krkc36z4krkc3al2',
                    pageName: 'Self Audit Plan Details',
                    auditFlowMasterId: 'ac7d34b0-crcvxcgdslsunita',
                },
                tab: 'self-audit-planning-details',
            },
            'corporateCoordinator/self-audit-planning-details'
        )
    }

    onValueChanged = key => event => {
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingState = Object.assign({}, this.state.rescheduleDetails);
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ rescheduleDetails: existingState });
    };

    onValueChangedPlant = selectedOption => {
        let selectedPlant = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selectedPlant) {
            selectedPlant = ['pb'];
        }
        this.props.getSelfAuditForReschedule(selectedPlant);
        this.setState({ selectedPlants: selectedOption, selectedPlantsId: selectedPlant });
    };

    onValueChangedCompany = selectedOption => {
        let selecteddata = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selecteddata) {
            selecteddata = ['pb'];
        }
        this.props.getPlantMasterByGroupCompanyId(selecteddata);
        this.setState({
            selectedCompany: selectedOption,
            selectedCompanyIds: selecteddata,
            selectedPlants: [],
            selectedPlantsId: []
        });
    };
    onValueChangedYearType = selectedOption => {
        let selecteddata = selectedOption && selectedOption.value;// > 0 && selectedOption.map((item) => item.value);

          let where = [];
        if (selecteddata) {
            where.push({ key: 'yearTypeMasterId', value: selecteddata })
        }
        else if (!selecteddata || selecteddata === '') {
            where.push({ key: 'yearTypeMasterId', value: 'na' })
        }
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, where);
        let selectedPlant = ['pb'];
        this.props.getSelfAuditForReschedule(selectedPlant);
        this.setState({
            selectedCompany: [],
            selectedCompanyIds: [],
            selectedyearTypes: selectedOption,
            selectedYearTypeId: selecteddata,
            selectedPlants: [],
            selectedPlantsId: []
        });
    };


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
                    min={props.min ? props.min : moment(new Date()).format("YYYY-MM-DD")}
                    height="33px"
                    type={props.type ? props.type : 'text'}
                    color="#000"
                    borderColor="#000"
                    style={{ backgroundColor: "transparent" }}
                    onChange={this.onValueChanged(props.KeyName)} />
            </CommonStyle.InputDiv>
        </CommonStyle.InputControlsDiv>
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    render() {
        const { yearTypes, years, columns, selectedyearTypes, companys, selfAuditPlans, selectedSelfAuditDetails, plants } = this.state;
        const options = plants && plants.length > 0 ? plants.map((item, index) => {
            return { value: item.id, label: item.plantName }
        }) : [];// [{ value: "-1", label: 'Select' }];

        const Companyoption = companys && companys.length > 0 ? companys.map((item, index) => {
            return { value: item.id, label: item.companyName }
        }) : []//[{ value: "-1", label: 'Select Company' }];

        const yearTypeOption = yearTypes && yearTypes.length > 0 ? yearTypes.map((item, index) => {
            return { value: item.id, label: item.yearTypeName }
        }) : [];

        console.log("this.state.rescheduleDetails", this.state.rescheduleDetails);
        const datalength = selfAuditPlans && selfAuditPlans.length > 0 ? selfAuditPlans.length : 0;
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="30%"
                        padding="15px 10px 5px 5px"
                        style={{ zIndex: '5' }}
                    >
                        <span style={{ marginLeft: "8px" }}>Audit Cycle</span>
                        <Select
                            className="width100p"
                            value={selectedyearTypes ? selectedyearTypes : {}}
                            onChange={this.onValueChangedYearType}
                            options={yearTypeOption}
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="30%"
                        padding="15px 10px 5px 5px"
                        style={{ zIndex: '5' }}
                    >
                        <span style={{ marginLeft: "8px" }}>Company</span>
                        <MultiSelect
                            className="width100p"
                            value={this.state.selectedCompany && this.state.selectedCompany.length > 0 ? this.state.selectedCompany : []}
                            onChange={this.onValueChangedCompany}
                            options={Companyoption}
                            hasSelectAll={true}
                            labelledBy="Select"
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="30%"
                        padding="15px 10px 5px 5px"
                        style={{ zIndex: '5' }}
                    >
                        <span style={{ marginLeft: "8px" }}>Plant</span>
                        <MultiSelect
                            className="width100p"
                            value={this.state.selectedPlants && this.state.selectedPlants.length > 0 ? this.state.selectedPlants : []}
                            onChange={this.onValueChangedPlant}
                            options={options}
                            hasSelectAll={true}
                            labelledBy="Select"
                        />
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <span style={{ width: "100%", border: "solid 1px #ccc", marginTop: "20px" }}></span>
                <CommonStyle.InputControlsDiv
                    width="100%"
                    padding="0px 0px 0px 0px"
                >
                    {/* {datalength > 0 && */}
                    <div style={{ width: '100%' }}>
                        <ReactTable
                            Data={selfAuditPlans}
                            sectionFilterApplicable={true}
                            isColumnUpdate={true}
                            defaultPageSize={1000}
                            updateColumn={this.updateColumn}
                            columns={columns}
                        />
                    </div>
                    {/* } */}

                </CommonStyle.InputControlsDiv>
                <CommonStyle.FormDiv>
                    <this.InputTextBoxDateField
                        headerTitle={'From Date'}
                        SelectedValues={this.state.rescheduleDetails && this.state.rescheduleDetails.auditFromDate ? this.state.rescheduleDetails.auditFromDate : ''} //{this.state.selfAuditPlan.auditFromDate}
                        KeyName="auditFromDate"
                        type="date"
                        width="27%"
                        color="#000"
                    />
                    <this.InputTextBoxDateField
                        headerTitle="To Date"
                        SelectedValues={this.state.rescheduleDetails && this.state.rescheduleDetails.auditToDate ? this.state.rescheduleDetails.auditToDate : ''} //{this.state.selfAuditPlan.auditToDate}
                        KeyName="auditToDate"
                        min={this.state.rescheduleDetails && this.state.rescheduleDetails.auditFromDate && this.state.rescheduleDetails.auditFromDate}// moment(new Date(this.state.selfAuditPlan.auditFromDate)).format("YYYY-MM-DD") : undefined}
                        type="date"
                        width="27%"
                        color="#000"
                    />
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
                        width="30%"
                    >
                        <Button
                            bgColor="#358856"
                            color="#ffffff"
                            height="40px"
                            margin="0px 5px 0px 0px"
                            width="48%"
                            bgChangeHover="#4FA64F"
                            hoverColor="#ffffff"
                            borderRadius={"10px"}
                            fontsize={"14px"}
                            border="solid 1px #358856"
                            zIndex={"0"}
                            onClick={() => this.onSubmit()}
                        >
                            Submit
                    </Button>
                        <Button
                            bgColor="#358856"
                            color="#ffffff"
                            height="40px"
                            margin="0px 5px 0px 0px"
                            width="48%"
                            borderRadius={"10px"}
                            bgChangeHover="#4FA64F"
                            hoverColor="#ffffff"
                            zIndex={"0"}
                            fontsize={"14px"}
                            border="solid 1px #358856"
                            onClick={() => this.onClickCancel()}
                        >
                            Cancel
                    </Button>
                        <Button
                            bgColor="#cc5d13"
                            color="#ffffff"
                            height="40px"
                            margin="0px 5px 0px 0px"
                            width="48%"
                            borderRadius={"10px"}
                            bgChangeHover="#ffffff"
                            zIndex={"0"}
                            hoverColor="#cc5d13"
                            fontsize={"14px"}
                            border="solid 1px #cc5d13"
                            onClick={() => this.onClickGoToPlanningDetailsAudit()}
                        >
                            Back
                    </Button>
                    </CommonStyle.ButtonDiv>
                </CommonStyle.FormDiv>

                <CommonStyle.ButtonDiv>
                    {this.props.errorType === errorTypes.DISPLAY_ERROR &&
                        <div>
                            {this.props.errorMessage}
                            {this.hideError()}
                        </div>
                    }
                </CommonStyle.ButtonDiv>
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { selfAuditPlan, selfAuditPlans, selfAuditPlanRecordsCount, selfAuditPlanActiontype } = state.workingReducer;
    const { years, companys, yearTypes, plant, plants, sections } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { yearTypes, years, companys, sections, plants, selfAuditPlan, selfAuditPlanActiontype, selfAuditPlans, errorType, errorMessage, selfAuditPlanRecordsCount };
};
export default withRouter(connect(mapStateToProps, { getYearTypeMasterData, initSelfAuditPlanDetails, rescheduleSelfAuditDetails, getSelfAuditPlanDetailsById, saveSelfAuditPlanDetails, getSelfAuditForReschedule, getPlantMasterByGroupCompanyId, getYearMasterData, getCompanyMaster, getSectionMasterData, hideError })(rescheduleSelfAudit));
