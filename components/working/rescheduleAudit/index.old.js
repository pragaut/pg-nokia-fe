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
//import SelfAuditPlanDetails from '../../masters/selfAuditPlans'
import { hideError, showError } from '../../../actions/error.actions';
import * as MasterType from '../../../action-types/admin.action.types';
import * as WorkingType from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';
import { withRouter } from 'next/router';
import MultiSelectComponent from "react-multi-select-component";


import dynamic from 'next/dynamic';

//const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })


class rescheduleSelfAudit extends Wrapper {

    companyMasterIdRefs = undefined;
    plantMasterIdRefs = undefined;
    sectionMasterIdRefs = undefined;
    // configs = [
    //     {
    //         name: 'value',
    //         displayname: 'Master Name ',
    //         type: 'string',
    //         required: true
    //     }, {
    //         name: 'code',
    //         displayname: 'Master Code ',
    //         type: 'string',
    //         required: true
    //     }
    // ];
    constructor(props) {
        super(props);
        this.companyMasterIdRefs = React.createRef();
        this.plantMasterIdRefs = React.createRef();
        this.sectionMasterIdRefs = React.createRef();
        //  const multiselectRef = useRef();
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
            selectedSelfAuditDetails: [],
            rescheduleDetails: {
                isAuditRescheduled: true,
                auditRescheduledOn: moment(new Date()).format("YYYY-MM-DD"),
                reasonOfReschedule: null,
                auditFromDate: null,
                auditToDate: null
            }
        };

    };


    componentDidMount() {
        //  this.props.getYearTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        //   this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSelfAuditForReschedule(['pb']);
        //  this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.companys && nextProps.companys != this.state.companys) {
            this.setState({
                companys: nextProps.companys
            });
        }
        if (nextProps.selfAuditPlans && nextProps.selfAuditPlans != this.state.selfAuditPlans) {
            this.setState({
                selfAuditPlans: nextProps.selfAuditPlans
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
        const selectedSelfAuditDetails = this.state.selectedSelfAuditDetails;
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
            let selectedIds = selectedSelfAuditDetails && selectedSelfAuditDetails.length > 0 && selectedSelfAuditDetails.map((item) => item.id);



            this.setState({ rescheduleDetails: existingState });
            for (let index = 0; index < Lengthofdata; index++) {
                let data = {
                    id: selectedSelfAuditDetails[index].id,
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
        // console.log("key : ", key);
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
        this.setState({ selectedCompany: selectedOption, selectedCompanyIds: selecteddata });
    };

    onAuditSelection = (auditIds, selectedData) => {
        var selectedAudit = selectedData && selectedData.map(function (value, index) { return { 'id': value['id'] }; });
        this.setState({
            selectedSelfAuditDetails: selectedAudit
        });
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
    render() {
        const { yearTypes, years, companys, selectedSelfAuditDetails, plants } = this.state;
        const { selfAuditPlans } = this.props;
        const options = plants && plants.length > 0 ? plants.map((item, index) => {
            return { value: item.id, label: item.plantName }
        }) : [{ value: "-1", label: 'Select' }];

        const Companyoption = companys && companys.length > 0 ? companys.map((item, index) => {
            return { value: item.id, label: item.companyName }
        }) : [{ value: "-1", label: 'Select Company' }];
        console.log("selectedSelfAuditDetails", selectedSelfAuditDetails);

        const filterData = selfAuditPlans && selfAuditPlans.length > 0 && selfAuditPlans.filter(item => (item.isAuditCancelled !== 1 && item.isAuditCancelled !== true && item.isAuditExecuted !== 1 && item.isAuditExecuted !== true))
       const dataRows = filterData && filterData.length > 0 ? filterData : [];
          return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                {this.state.errortype === "success" &&
                    <SuccessMessage>
                        {this.state.errorMessage}
                    </SuccessMessage>
                }
                {this.state.errortype === "error" &&
                    <ErrorMessage>
                        {this.state.errorMessage}
                    </ErrorMessage>
                }
                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="46%"
                        padding="15px 10px 5px 5px"
                    >
                        <span style={{ marginLeft: "8px" }}>Company</span>
                        <MultiSelectComponent
                            className="width100p"
                            value={this.state.selectedCompany && this.state.selectedCompany.length > 0 ? this.state.selectedCompany : [{ label: 'select', value: 'undefined' }]}
                            onChange={this.onValueChangedCompany}
                            options={Companyoption}
                            // closeMenuOnSelect={false}
                            hasSelectAll={true}
                            labelledBy="Select"
                        // isMulti={true}
                        />
                        {/* <Select
                            className="width100p"
                            value={this.state.selectedCompany && this.state.selectedCompany}
                            onChange={this.onValueChangedCompany}
                            options={Companyoption}
                            closeMenuOnSelect={false}
                            hasSelectAll={true}
                            isMulti={true}
                        /> */}
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="46%"
                        padding="15px 10px 5px 5px"
                    >
                        <span style={{ marginLeft: "8px" }}>Plant</span>
                        <MultiSelectComponent
                            className="width100p"
                            value={this.state.selectedPlants && this.state.selectedPlants.length > 0 ? this.state.selectedPlants : [{ label: '', value: '' }]}
                            onChange={this.onValueChangedPlant}
                            options={options}
                            // closeMenuOnSelect={false}
                            hasSelectAll={true}
                            labelledBy="Select"
                        // isMulti={true}
                        />
                        {/* <Select
                            className="width100p"
                            value={this.state.selectedPlants && this.state.selectedPlants}
                            onChange={this.onValueChangedPlant}
                            options={options}
                            closeMenuOnSelect={false}
                            isMulti={true}
                        /> */}
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <span style={{ width: "100%", border: "solid 1px #ccc", marginTop: "20px" }}></span>
                <CommonStyle.InputControlsDiv
                    width="100%"
                    padding="0px 0px 0px 0px"
                >
                    <div id='selfAuditDetails' className={style.table_wapper} style={{ paddingTop: '0px', marginBottom: '0px', paddingBottom: '0px' }} >
                        <ListTable
                            recordsCount={this.props.selfAuditPlanRecordsCount}
                            EditForm={'<div></div>'}
                            onRefresh={this.props.getSelfAuditForReschedule}
                            onSave={this.props.saveSelfAuditPlanDetails}
                            getById={this.props.getSelfAuditPlanDetailsById}
                            onDelete={undefined}
                            actionType={this.props.selfAuditPlanActiontype}
                            onSelection={this.onAuditSelection}
                            needIdsOnCheckboxSelection={true}
                            isCheckboxVisibleOnlyPlanNoExistingPlan={true}
                            dataRows={dataRows}
                            pickEditFromMemory={true}
                            isFilterRequired={true}
                            showDateFilter={false}
                            pickEditFromMemory={true}
                            evidenceUpdateRequired={false}
                            viewInvoiceButtonRequired={false}
                            isCloseAfterSave={true}
                            actionsWidth='55px'
                            maxHeight={'300px'}
                            isDateAndTimeRequired={false}
                            hideAdd={true}
                            hideRefresh={true}
                            hideChooseColumns={true}
                            hideSortingColumns={true}
                            hideCopy={true}
                            hideAddFilters={true}
                            hideClearFilters={true}
                            hideGridEdit={true}
                            hideGridDelete={true}
                            hideGridMoveUp={true}
                            hideTrash={true}
                            hideGridCheckBox={false}
                            hideLoadMore={true}
                            hideQuickSearch={true}
                            rupaySignVisible={false} 
                            columnHeadings={[
                                {
                                    name: 'selfAuditNumber',
                                    displayName: "Audit Number",
                                    type: 'string'
                                },
                                {
                                    name: 'company.companyName',
                                    displayName: "Company",
                                    type: 'string'
                                },
                                {
                                    name: 'plant.plantName',
                                    displayName: "Plant",
                                    type: 'string'
                                },
                                {
                                    name: 'sections',
                                    displayName: "Section",
                                    type: 'string'
                                },
                                {
                                    name: 'auditFromDate',
                                    displayName: "Audit From",
                                    type: 'string'
                                },
                                {
                                    name: 'auditToDate',
                                    displayName: "Audit To",
                                    type: 'string'
                                },
                                {
                                    name: 'auditPlanRemarks',
                                    displayName: "Remarks",
                                    type: 'string'
                                },
                            ]}
                        /> 
                    </div>
                </CommonStyle.InputControlsDiv>


                <CommonStyle.FormDiv>
                    <this.InputTextBox
                        headerTitle={'From Date'}
                        SelectedValues={this.state.rescheduleDetails && this.state.rescheduleDetails.auditFromDate ? this.state.selfAuditPlan.auditFromDate : ''} //{this.state.selfAuditPlan.auditFromDate}
                        KeyName="auditFromDate"
                        type="date"
                        width="27%"
                        color="#000"
                    />
                    <this.InputTextBox
                        headerTitle="To Date"
                        SelectedValues={this.state.rescheduleDetails && this.state.rescheduleDetails.auditToDate ? this.state.selfAuditPlan.auditToDate : ''} //{this.state.selfAuditPlan.auditToDate}
                        KeyName="auditToDate"
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
                            bgColor="#005900"
                            color="#ffffff"
                            height="40px"
                            width="48%"
                            bgChangeHover="#ffffff"
                            hoverColor="#005900"
                            fontsize={"14px"}
                            border="solid 1px #005900"
                            zIndex={"0"}
                            onClick={() => this.onSubmit()}
                        >
                            Submit
                    </Button>
                        <Button
                            bgColor="#ad0000"
                            color="#ffffff"
                            height="40px"
                            width="48%"
                            bgChangeHover="#ffffff"
                            hoverColor="#ad0000"
                            zIndex={"0"}
                            fontsize={"14px"}
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
                {/* <CommonStyle.DetailsList width="100%">
                    <SelfAuditPlanDetails
                        MasterName={MasterName}
                        ParentMasterName={ParentMasterName}
                        data={this.props.selfAuditPlansCategory}
                        EditSelfAuditPlanDetails={this.EditSelfAuditPlanDetails}
                        deleteSelfAuditPlanDetails={this.deleteSelfAuditPlanDetails}
                    />
                </CommonStyle.DetailsList> */}
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

//export default connect(mapStateToProps, { getYearTypeMasterData, initSelfAuditPlanDetails, rescheduleSelfAuditDetails, getSelfAuditPlanDetailsById, saveSelfAuditPlanDetails, getSelfAuditForReschedule, getPlantMasterByGroupCompanyId, getYearMasterData, getCompanyMaster, getSectionMasterData, hideError })(rescheduleSelfAudit);
export default withRouter(connect(mapStateToProps, { getYearTypeMasterData, initSelfAuditPlanDetails, rescheduleSelfAuditDetails, getSelfAuditPlanDetailsById, saveSelfAuditPlanDetails, getSelfAuditForReschedule, getPlantMasterByGroupCompanyId, getYearMasterData, getCompanyMaster, getSectionMasterData, hideError })(rescheduleSelfAudit));
