import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';

import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle';
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { saveSelfAuditPlanDetails, initSelfAuditPlanDetails } from '../../../actions/working.action';
import { getYearTypeMasterData, getYearMasterData, getCompanyMaster, getSectionMasterData } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
//import SelfAuditPlanDetails from '../../masters/selfAuditPlans'
import { hideError, showError } from '../../../actions/error.actions';
import * as MasterType from '../../../action-types/admin.action.types';
import * as WorkingType from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import MultiSelectDDL from "react-multi-select-component";
import moment from 'moment';
import style from '../../../theme/app.scss';
import { uniqueId } from '../../../utils';

import PlantList from './plant.select';
import { withRouter } from 'next/router';

import dynamic from 'next/dynamic';
//  const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })

class SelfAuditPlanning extends Wrapper {
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

        this.state = {
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            selfAuditPlan: [],
            auditPlantDetails: [],
            yearTypes: [],
            year: null,
            years: [],
            processFlowMasterId: props.id ? props.id : undefined,
            auditFlowMasterId: props.auditFlowMasterId ? props.auditFlowMasterId : undefined,
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
                    name: 'yearTypeMasterId',
                    displayname: 'Audit Cycle',
                    type: 'string',
                    required: true
                },
                {
                    name: 'yearMasterId',
                    displayname: 'Year',
                    type: 'string',
                    required: true
                }, {
                    name: 'auditFromDate',
                    displayname: 'Audit From Date',
                    type: 'string',
                    required: true
                }, {
                    name: 'auditToDate',
                    displayname: 'Audit To Date',
                    type: 'string',
                    required: true
                }
            ],
            selectedYearTypeMasterId: null,
            selectedCompany: [],
            selectedCompanyIds: [],
            selectedSection: [],
            selectedSectionIds: [],
        };

    };
    onClickGoToPlanningPage = () => {
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
                query: {
                    tab: 'self-audit-planning-details',
                    id: 'dv-PG_krkc36z4krkc3al2',
                    pageName: 'Final Audit Planing',
                    auditFlowMasterId: 'ac7d34b0-crcvxcgdslsunita',
                },
                tab: 'self-audit-planning-details',
            },
            'corporateCoordinator/self-audit-planning-details'
        )
    }
    componentDidMount() {
        this.props.getYearTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        if (this.state.selfAuditPlan && this.state.selfAuditPlan.yearTypeMasterId) {

            let where = [];
            where.push({ key: 'yearTypeMasterId', value: this.state.selfAuditPlan.yearTypeMasterId })
            this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, where);
            this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, where);
        }
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.yearTypes && nextProps.yearTypes != this.state.yearTypes) {
            this.setState({
                yearTypes: nextProps.yearTypes
            });
        }
        if (nextProps.id && nextProps.id != this.state.processFlowMasterId) {
            this.setState({
                processFlowMasterId: nextProps.id
            });
        }
        if (nextProps.auditFlowMasterId && nextProps.auditFlowMasterId != this.state.auditFlowMasterId) {
            this.setState({
                auditFlowMasterId: nextProps.id
            });
        }
        if (nextProps.years && nextProps.years != this.state.years) {
            this.setState({
                years: nextProps.years
            });
        }
        if (nextProps.companys && nextProps.companys != this.state.companys) {
            this.setState({
                companys: nextProps.companys
            });
        }
        if (nextProps.sections && nextProps.sections != this.state.sections) {
            this.setState({
                sections: nextProps.sections
            });
        }
        if (nextProps.selfAuditPlanActiontype && nextProps.selfAuditPlanActiontype === WorkingType.SELFAUDITPLANDETAILS_SAVE_SUCCESS) {
            setTimeout(() => {
                this.onClickGoToPlanningDetailsAudit();
                this.setState({
                    selfAuditPlan: [],
                    auditPlantDetails: [],
                    selectedCompanyIds: [],
                    selectedCompany: [],
                    selectedSectionIds: [],
                    selectedSection: []
                })
            }, 500);
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }

    onValueChanged = key => event => {
        // console.log("key : ", key);
        let validInput = true;
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingState = Object.assign({}, this.state.selfAuditPlan);

        if (key == 'auditFromDate' || key == 'auditToDate') {
            if (this.state.year && this.state.years !== null) {
                let startdate = this.state.year.startDate;
                let Enddate = this.state.year.enddate;
                if (key == 'auditFromDate') {
                    let auditTodate = this.state.selfAuditPlan && this.state.selfAuditPlan.auditToDate ? this.state.selfAuditPlan.auditToDate : undefined;
                    if (auditTodate !== undefined && (new Date(selectedValue)) > new Date(auditTodate)) {
                        validInput = false;
                        event.target.value = '';
                        return alert("Audit from date can't be less then 'Audit To Date'");
                    }
                    else if (startdate !== undefined && (new Date(selectedValue)) < new Date(startdate)) {
                        validInput = false;
                        event.target.value = '';
                        return alert("Audit from date can't be less then 'year start Date'");
                    }
                    else if (Enddate !== undefined && (new Date(selectedValue)) > new Date(Enddate)) {
                        validInput = false;
                        event.target.value = '';
                        return alert("Audit from date can't be more then 'Year end Date'");
                    }
                }
                else {
                    let auditFromdate = this.state.selfAuditPlan && this.state.selfAuditPlan.auditFromDate ? this.state.selfAuditPlan.auditFromDate : undefined;
                    if (auditFromdate !== undefined && (new Date(selectedValue)) < (new Date(auditFromdate))) {
                        validInput = false;
                        event.target.value = '';
                        return alert("Audit from date can't be less then 'Audit To Date'");
                    }
                    else if (startdate !== undefined && (new Date(selectedValue)) < new Date(startdate)) {
                        validInput = false;
                        event.target.value = '';
                        return alert("Audit to date can't be less then 'year start Date'");
                    }
                    else if (Enddate !== undefined && (new Date(selectedValue)) > new Date(Enddate)) {
                        validInput = false;
                        event.target.value = '';
                        return alert("Audit to date can't be more then 'Year end Date'");
                    }
                }
            }
            else {
                validInput = false;
                event.target.value = '';
                return alert("select Year first");

            }
        }
        if (validInput) {
            if (key == 'yearTypeMasterId') {
                this.setState({
                    selectedYearTypeMasterId: selectedValue,
                    selectedCompany: [],
                    selectedCompanyIds: []
                });
                let where = [];
                if (selectedValue) {
                    where.push({ key: 'yearTypeMasterId', value: selectedValue })
                }
                else if (!selectedValue || selectedValue === '') {
                    where.push({ key: 'yearTypeMasterId', value: 'na' })
                }
                this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, where);
                this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, where);
                //console.log("selectedValue : ", selectedValue)
                existingState["auditFromDate"] = null;
                existingState["auditToDate"] = null;
            }
            else if (key === "yearMasterId") {
                const YearData = this.state.years && this.state.years.filter(item => item.id === selectedValue);
                let year = YearData && YearData.length > 0 && YearData[0];
                existingState["auditFromDate"] = null;
                existingState["auditToDate"] = null;
                this.setState({ year: year });
            }

            existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

            this.setState({ selfAuditPlan: existingState });
        }
    };

    onSubmit = async () => {

        try {
            const selfAuditPlans = Object.assign({}, this.state.selfAuditPlan);
            const auditPlantDetails = Object.assign([], this.state.auditPlantDetails);
            const selectedSectionIds = this.state.selectedSectionIds;
            let auditTodate = this.state.selfAuditPlan && this.state.selfAuditPlan.auditToDate ? this.state.selfAuditPlan.auditToDate : undefined;
            let auditFromdate = this.state.selfAuditPlan && this.state.selfAuditPlan.auditFromDate ? this.state.selfAuditPlan.auditFromDate : undefined;

            let startdate = this.state.year && this.state.year.startDate;
            let Enddate = this.state.year && this.state.year.enddate;
            //console.log("selfAuditPlans : ", selfAuditPlans);
            //console.log("auditPlantDetails : ", auditPlantDetails);
            //console.log("selectedSectionIds : ", selectedSectionIds);

            const validationText = validateInputsWithDisplayName(this.state.selfAuditPlan, this.state.configs);
            if (validationText) {
                return alert(validationText);
            }
            else if (startdate !== undefined && (new Date(auditFromdate)) < new Date(startdate)) {
                return alert("Audit from date can't be less then 'year start Date'");
            }
            else if (Enddate !== undefined && (new Date(auditFromdate)) > new Date(Enddate)) {
                return alert("Audit from date can't be more then 'Year end Date'");
            }
            else if (startdate !== undefined && (new Date(auditTodate)) < new Date(startdate)) {
                return alert("Audit to date can't be less then 'year start Date'");
            }
            else if (Enddate !== undefined && (new Date(auditTodate)) > new Date(Enddate)) {
                return alert("Audit to date can't be more then 'Year end Date'");
            }
            else if (auditPlantDetails === null || auditPlantDetails === undefined || auditPlantDetails.length === 0) {
                return alert("Please select at least one plant !!");
            }
            else if (selectedSectionIds === null || selectedSectionIds === undefined || selectedSectionIds.length === 0) {
                return alert("Please select at least one section !!");
            }
            let valueReturned = undefined;
            if (this.state.auditFlowMasterId) {
                selfAuditPlans["auditFlowMasterId"] = this.state.auditFlowMasterId;
            }
            if (this.state.auditFlowMasterId) {
                auditPlantDetails["auditFlowMasterId"] = this.state.auditFlowMasterId;
            }
            console.log("auditPlantDetails, 1", auditPlantDetails);
            this.setState({ selfAuditPlan: selfAuditPlans, auditPlantDetails: auditPlantDetails });
            this.props.saveSelfAuditPlanDetails(selfAuditPlans, auditPlantDetails, selectedSectionIds, this.state.processFlowMasterId, this.state.auditFlowMasterId, valueReturned)

            console.log("this.props.selfAuditPlanActiontype : ", this.props.selfAuditPlanActiontype);
            // setTimeout(() => {
            //     if (this.props.selfAuditPlanActiontype === WorkingType.SELFAUDITPLANDETAILS_SAVE_SUCCESS) {
            //       this.onClickGoToPlanningDetailsAudit();
            //         this.setState({
            //             selfAuditPlan: [],
            //             auditPlantDetails: [],
            //             selectedCompanyIds: [],
            //             selectedCompany: [],
            //             selectedSectionIds: [],
            //             selectedSection: []
            //         })
            //     }
            // }, 500);

            setTimeout(() => {
                this.setState({ errorMessage: '', errortype: '' })
            }, 3000);
        }
        catch {
            const state = {};
            // this.state.errorMessage = 'Error in Master Category Master';
            //this.state.errortype = 'error';
            setTimeout(() => {
                this.setState({ errorMessage: '', errortype: '' })
            }, 3000);
        }

    }

    onClickCancel() {
        //console.log("this.state.selfAuditPlan", this.state.selfAuditPlan);
        //console.log("this.state.auditPlantDetails", this.state.auditPlantDetails);
        //console.log("this.state.selectedSectionIds", this.state.selectedSectionIds);        
        this.setState({
            selfAuditPlan: [],
            auditPlantDetails: [],
            selectedCompany: [],
            selectedCompanyIds: [],
            selectedSectionIds: [],
            selectedSection: [],
            year: null
        });
        //console.log("this.companyMasterIdRefs.current : ", this.companyMasterIdRefs.current)
        //this.companyMasterIdRefs.current.resetSelectedValues();
    }


    onCompanySelect = (selectedList, selectedItem) => {
        const listItems = selectedList.map((item) => item.id);
        this.setState({
            selectedCompanyIds: listItems
        });
    };

    onCompanyRemove = (selectedList, removedItem) => {
        let listItems = selectedList.map((item) => item.id);
        if (listItems && listItems.length == 0) {
            listItems = ['pb'];
        }
        this.setState({
            selectedCompanyIds: listItems
        });
    };

    onSectionSelect = (selectedList, selectedItem) => {
        const listItems = selectedList.map((item) => item.id);
        this.setState({
            selectedSectionIds: listItems
        });
    };

    onValueChangedSection = selectedOption => {
        let selecteddata = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selecteddata) {
            selecteddata = [''];
        }
        //this.props.getPlantMasterByGroupCompanyId(selecteddata);
        this.setState({ selectedSection: selectedOption, selectedSectionIds: selecteddata });
    };
    onSectionRemove = (selectedList, removedItem) => {
        const listItems = selectedList.map((item) => item.id);
        this.setState({
            selectedSectionIds: listItems
        });
    };

    onPlantSelection = (selectedPlants, ids) => {
        console.log("SelectedPlants 2 : ", selectedPlants);
        this.setState({
            auditPlantDetails: selectedPlants
        });
    }

    InputTextBox = props => {
        return <CommonStyle.InputControlsDiv
            width={props.width ? props.width : "15%"}
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
                    //  onBlur={this.onValueChanged(props.KeyName)} 
                    onChange={this.onValueChanged(props.KeyName)}
                />
            </CommonStyle.InputDiv>
        </CommonStyle.InputControlsDiv>
    }

    InputTextBoxDateField = props => {
        return <CommonStyle.InputControlsDiv
            width={props.width ? props.width : "15%"}
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
                    min={moment(new Date()).format("YYYY-MM-DD")}
                    type={props.type ? props.type : 'text'}
                    color="#000"
                    borderColor="#000"
                    style={{ backgroundColor: "transparent" }}
                    //  onBlur={this.onValueChanged(props.KeyName)} 
                    onChange={this.onValueChanged(props.KeyName)}
                />
            </CommonStyle.InputDiv>
        </CommonStyle.InputControlsDiv>
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
    onValueChangedCompany = selectedOption => {
        let selecteddata = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selecteddata) {
            selecteddata = ['pb'];
        }
        //this.props.getPlantMasterByGroupCompanyId(selecteddata);
        this.setState({ selectedCompany: selectedOption, selectedCompanyIds: selecteddata });
    };
    render() {
        const { yearTypes, years, selectedSection, selectedCompany, companys, sections } = this.state;
        const Companyoption = companys && companys.length > 0 ? companys.map((item, index) => {
            return { value: item.id, label: item.companyName }
        }) : [];// [{ value: "-1", label: 'Select Company' }];
        const sectionOption = sections && sections.length > 0 ? sections.map((item, index) => {
            return { value: item.id, label: item.sectionName }
        }) : [];//[{ value: "-1", label: 'Select Section' }];
         return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="15%"
                    >
                        <CommonStyle.InputLabel>
                            Audit Cycle
                        </CommonStyle.InputLabel>
                        <CommonStyle.InputDiv>
                            <SELECT
                                value={this.state.selfAuditPlan.yearTypeMasterId ? this.state.selfAuditPlan.yearTypeMasterId : ''}
                                paddingLeft="20px"
                                borderRadius="5px"
                                height="35px"
                                type="text"
                                color="#000"
                                borderColor="#000"
                                style={{ backgroundColor: "transparent" }}
                                onChange={this.onValueChanged('yearTypeMasterId')}
                            >
                                <option value=''>--Select--</option>
                                {yearTypes &&
                                    yearTypes.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.yearTypeName}</option>
                                    })
                                }
                            </SELECT>
                        </CommonStyle.InputDiv>
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="15%"
                    >
                        <CommonStyle.InputLabel>
                            Year
                        </CommonStyle.InputLabel>
                        <CommonStyle.InputDiv>
                            <SELECT
                                value={this.state.selfAuditPlan.yearMasterId ? this.state.selfAuditPlan.yearMasterId : ''}//{this.state.selfAuditPlan.yearMasterId}
                                paddingLeft="20px"
                                borderRadius="5px"
                                height="35px"
                                type="text"
                                color="#000"
                                borderColor="#000"
                                style={{ backgroundColor: "transparent" }}
                                onChange={this.onValueChanged('yearMasterId')}
                            >
                                <option value=''>--Select--</option>
                                {years &&
                                    years.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.yearName}</option>
                                    })
                                }
                            </SELECT>
                        </CommonStyle.InputDiv>
                    </CommonStyle.InputControlsDiv>
                    <this.InputTextBoxDateField
                        headerTitle={'From Date'}
                        SelectedValues={this.state.selfAuditPlan.auditFromDate ? this.state.selfAuditPlan.auditFromDate : ''} //{this.state.selfAuditPlan.auditFromDate}
                        KeyName="auditFromDate"
                        type="date"
                        width="15%"
                        color="#000"
                    />
                    <this.InputTextBoxDateField
                        headerTitle="To Date"
                        SelectedValues={this.state.selfAuditPlan.auditToDate ? this.state.selfAuditPlan.auditToDate : ''} //{this.state.selfAuditPlan.auditToDate}
                        KeyName="auditToDate"
                        type="date"
                        width="15%"
                        color="#000"
                    />
                    <this.InputTextBox
                        headerTitle="Remarks"
                        SelectedValues={this.state.selfAuditPlan.auditPlanRemarks ? this.state.selfAuditPlan.auditPlanRemarks : ''} //{this.state.selfAuditPlan.auditPlanRemarks}
                        KeyName="auditPlanRemarks"
                        type="text"
                        color="#000"
                        width="31%"
                    />
                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="50%"
                        padding="15px 10px 5px 5px"
                    >
                        <span style={{ marginLeft: "8px" }}>Company</span>
                        <MultiSelectDDL
                            className="width100p"
                            value={this.state.selectedCompany && this.state.selectedCompany.length > 0 ? this.state.selectedCompany : []}
                            onChange={this.onValueChangedCompany}
                            options={Companyoption}
                            hasSelectAll={true}
                            labelledBy="Select"
                        />
                        {/* <Multiselect
                            options={companys} // Options to display in the dropdown
                            selectedValues={this.state.selectedCompany} // Preselected value to persist in dropdown
                            onSelect={this.onCompanySelect} // Function will trigger on select event
                            onRemove={this.onCompanyRemove} // Function will trigger on remove event
                            displayValue="companyName" // Property name to display in the dropdown options                               
                            ref={this.companyMasterIdRefs}
                            closeIcon={"cancel"}
                            showCheckbox={true}
                            placeholder={"Select Company"}
                            closeOnSelect={false}
                            style={{
                                multiselectContainer: { // To change input field position or margin
                                    margin: '8px',
                                    fontSize: '12px',
                                    border: '1px solid #000000',
                                    borderRadius: '5px',
                                    color: '#000'
                                },
                                inputField: { // To change input field position or margin
                                    paddingLeft: '8px',
                                    fontSize: '12px',
                                    paddingTop: '2px',
                                    //border:'1px solid #000000'
                                },
                                border: '1px solid #000000'
                            }}
                        /> */}
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="46%"
                        padding="15px 10px 5px 5px"
                    >
                        <span style={{ marginLeft: "8px" }}>Section</span>
                        <MultiSelectDDL
                            className="width100p"
                            value={selectedSection && selectedSection.length > 0 ? selectedSection : []}
                            onChange={this.onValueChangedSection}
                            options={sectionOption}
                            hasSelectAll={false}
                            labelledBy="Select"
                        />
                        {/* <Multiselect
                            options={sections} // Options to display in the dropdown
                            selectedValues={this.state.selectedSection} // Preselected value to persist in dropdown
                            onSelect={this.onSectionSelect} // Function will trigger on select event
                            onRemove={this.onSectionRemove} // Function will trigger on remove event
                            displayValue="sectionName" // Property name to display in the dropdown options                               
                            ref={this.companyMasterIdRefs}
                            closeIcon={"cancel"}
                            showCheckbox={true}
                            placeholder={"Select Section"}
                            closeOnSelect={false}
                            style={{
                                multiselectContainer: { // To change input field position or margin
                                    margin: '8px',
                                    fontSize: '12px',
                                    border: '1px solid #000000',
                                    borderRadius: '5px',
                                    color: '#000'
                                },
                                inputField: { // To change input field position or margin
                                    paddingLeft: '8px',
                                    fontSize: '12px',
                                    paddingTop: '2px',
                                    //border:'1px solid #000000'
                                },
                                border: '1px solid #000000'
                            }}
                        /> */}
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <span style={{ width: "100%", border: "solid 1px #ccc", marginTop: "20px" }}></span>
                {/* <gap h="20px" /> */}
                <CommonStyle.FormDiv>
                    <PlantList
                        selectedCompanyIds={this.state.selectedCompanyIds ? this.state.selectedCompanyIds : undefined}
                        selectedYearMasterIds={this.state.selfAuditPlan.yearMasterId ? this.state.selfAuditPlan.yearMasterId : undefined}
                        selectedFromDate={this.state.selfAuditPlan.auditFromDate ? this.state.selfAuditPlan.auditFromDate : undefined}
                        selectedToDate={this.state.selfAuditPlan.auditToDate ? this.state.selfAuditPlan.auditToDate : undefined}
                        onPlantSelection={this.onPlantSelection}
                    />
                </CommonStyle.FormDiv>
                {/* <Gap h="37px" /> */}
                <CommonStyle.ButtonDiv
                    width="50%"
                >
                    <Button
                        bgColor="#358856"
                        color="#ffffff"
                        height="40px"
                        width="48%"
                        bgChangeHover="#4FA64F"
                        hoverColor="#ffffff"
                        borderRadius={"10px"}
                        margin={"0px 5px 0px 0px"}
                        border="solid 1px #358856"
                        zIndex="0"
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
                        margin={"0px 5px 0px 0px"}
                        hoverColor="#ad0000"
                        borderRadius={"10px"}
                        zIndex="0"
                        border="solid 1px #ad0000"
                        onClick={() => this.onClickCancel()}
                    >
                        Cancel
                    </Button>
                    <Button
                        bgColor="#cc5d13"
                        color="#ffffff"
                        height="40px"
                        width="48%"
                        bgChangeHover="#ffffff"
                        hoverColor="#cc5d13"
                        borderRadius={"10px"}
                        zIndex="0"
                        border="solid 1px #cc5d13"
                        onClick={() => this.onClickGoToPlanningDetailsAudit()}
                    >
                        Back
                    </Button>
                </CommonStyle.ButtonDiv>
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
    const { years, companys, yearTypes, sections } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { yearTypes, years, companys, sections, selfAuditPlan, selfAuditPlanActiontype, selfAuditPlans, errorType, errorMessage, selfAuditPlanRecordsCount };
};

//export default connect(mapStateToProps, { getYearTypeMasterData, getYearMasterData, getCompanyMaster, getSectionMasterData, saveSelfAuditPlanDetails, initSelfAuditPlanDetails, hideError })(SelfAuditPlanning);
export default withRouter(connect(mapStateToProps, { getYearTypeMasterData, getYearMasterData, getCompanyMaster, getSectionMasterData, saveSelfAuditPlanDetails, initSelfAuditPlanDetails, hideError })(SelfAuditPlanning));
