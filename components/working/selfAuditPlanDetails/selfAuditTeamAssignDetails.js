import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getCompanyMaster, getPlantMaster } from '../../../actions/admin.action';
import { getSelfAuditPlanDetails } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
//import SelfAuditPlanDetails from '../../masters/selfAuditPlans'
import { hideError, showError } from '../../../actions/error.actions';
import * as MasterType from '../../../action-types/admin.action.types';
import * as WorkingType from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';
import ListTable from '../../shared/ListTable';
import PlantList from './plant.select';
import dynamic from 'next/dynamic';
const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })

class SelfAuditTeamAssignDetails extends Wrapper {
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

        this.state = {
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            selfAuditPlans: [],
            selfAuditPlan: {},
            yearTypes: [],
            years: [],
            companys: [],
            plants: [],
            auditStatus: [
                {
                    text: 'All',
                    value: null
                },
                {
                    text: 'Pending',
                    value: '0'
                },
                {
                    text: 'Executed',
                    value: '1'
                }
            ],
            showCancelPopup: false,
            selectedYearTypeMasterId: null,
            selectedCompany: null,
            selectedCompanyIds: [],
            selectedPlant: null,
            selectedPlantIds: [],
        };

    };

    componentDidMount() {
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSelfAuditPlanDetails(0, constants.ALL_ROWS_LIST, undefined, undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.companys && nextProps.companys != this.state.companys) {
            this.setState({
                companys: nextProps.companys
            });
        }
        if (nextProps.plants && nextProps.plants != this.state.plants) {
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
    onClickCancel = () => {

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

    onPlantSelect = (selectedList, selectedItem) => {
        const listItems = selectedList.map((item) => item.id);
        this.setState({
            selectedCompanyIds: listItems
        });
    };

    onPlantRemove = (selectedList, removedItem) => {
        const listItems = selectedList.map((item) => item.id);
        this.setState({
            selectedCompanyIds: listItems
        });
    };


    render() {
        const { companys, plants } = this.state;
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
                        width="20%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "5px" }}>Company</span>
                        <Multiselect
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
                                    margin: '5px',
                                    fontSize: '12px',
                                    borderRadius: '5px',
                                    color: '#000'
                                },
                                inputField: { // To change input field position or margin
                                    paddingLeft: '8px',
                                    fontSize: '12px',
                                    paddingTop: '2px',
                                    //border:'1px solid #000000'
                                }
                            }}
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="15%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "5px" }}>Plant</span>
                        <Multiselect
                            options={plants} // Options to display in the dropdown
                            selectedValues={this.state.selectedPlant} // Preselected value to persist in dropdown
                            onSelect={this.onPlantSelect} // Function will trigger on select event
                            onRemove={this.onPlantRemove} // Function will trigger on remove event
                            displayValue="PlantName" // Property name to display in the dropdown options                               
                            ref={this.plantMasterIdRefs}
                            closeIcon={"cancel"}
                            showCheckbox={true}
                            placeholder={"Select Plant"}
                            closeOnSelect={false}
                            style={{
                                multiselectContainer: { // To change input field position or margin
                                    margin: '5px',
                                    fontSize: '12px',
                                    borderRadius: '5px',
                                    color: '#000'
                                },
                                inputField: { // To change input field position or margin
                                    paddingLeft: '8px',
                                    fontSize: '12px',
                                    paddingTop: '2px',
                                    //border:'1px solid #000000'
                                }
                            }}
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="15%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "8px" }}>Audit Status</span>
                        <SELECT margin="5px"
                            value={''} paddingLeft="8px" borderRadius="5px" height="35px"
                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                            style={{ backgroundColor: "transparent", border: "1px solid #cccccc" }}

                        >
                            {this.state.auditStatus &&
                                this.state.auditStatus.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>
                                })
                            }
                        </SELECT>
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="15%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "8px" }}> &nbsp;</span>
                        <Button
                            bgColor="#ad0000"
                            color="#ffffff"
                            height="35px"
                            width="48%"
                            bgChangeHover="#ffffff"
                            hoverColor="#ad0000"
                            border="solid 1px #ad0000"
                            style={{ marginTop: "3px", fontSize: "11px", }}
                            onClick={() => this.onClickCancel()}
                        >
                            RESET
                        </Button>
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="100%"
                        padding="0px 0px 0px 0px"
                    >
                        <div id='selfAuditDetails' className={style.table_wapper} style={{ paddingTop: '0px', marginBottom: '0px', paddingBottom: '0px' }} >

                            <ListTable
                                recordsCount={this.props.selfAuditPlanRecordsCount}
                                onRefresh={this.props.getSelfAuditPlanDetails}
                                dataRows={this.props.selfAuditPlans}
                                pickEditFromMemory={true}
                                isFilterRequired={true}
                                showDateFilter={false}
                                pickEditFromMemory={true}
                                evidenceUpdateRequired={false}
                                viewInvoiceButtonRequired={false}
                                isCloseAfterSave={true}
                                isPagerefreshaftersave={true}
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
                                hideGridCheckBox={true}
                                hideLoadMore={true}
                                hideQuickSearch={true}
                                rupaySignVisible={false}
                                columnHeadings={[{
                                    name: 'selfAuditNumber',
                                    displayName: "Audit Number",
                                    type: 'string'
                                },
                                {
                                    name: 'companyName',
                                    displayName: "Company",
                                    type: 'string'
                                },
                                {
                                    name: 'plantName',
                                    displayName: "Plant",
                                    type: 'string'
                                },
                                {
                                    name: 'sectionName',
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
                                {
                                    name: 'auditPlannedBy',
                                    displayName: "Planned By",
                                    type: 'string'
                                },
                                {
                                    name: 'isAuditExecuted',
                                    displayName: "Executed",
                                    type: 'string'
                                }
                                ]}
                            />
                            <Gap h="5rem" />
                        </div>
                    </CommonStyle.InputControlsDiv>
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
    const { plants, companys } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { companys, plants, selfAuditPlan, selfAuditPlanActiontype, selfAuditPlans, errorType, errorMessage, selfAuditPlanRecordsCount, selfAuditPlanActiontype };
};

export default connect(mapStateToProps, { getCompanyMaster, getPlantMaster, getSelfAuditPlanDetails, hideError })(SelfAuditTeamAssignDetails);