import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getCompanyMaster, getYearTypeMasterData, getPlantMaster, getPlantMasterByGroupCompanyId } from '../../../actions/admin.action';
import { UpdateFinalAuditPlanDetails, getSelfAuditPlanDetails, getSelfAuditPlanDetails_BySequilize, getSelfAuditPlanDetailsById, UpdateSelfAuditPlanDetails, deleteSelfAuditPlanDetails, initSelfAuditPlanDetails } from '../../../actions/working.action';
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

class Index extends Wrapper {
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
            finalAuditDetail: null,
            selfAuditPlans: [],
            selfAuditPlan: {},
            yearTypes: [],
            cancelFinalAuditPopup: false,
            years: [],
            columns: [],
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
            openPopup: false,
            selectedyearTypes: null,
            selectedYearTypeId: '',
            processFlowCode: props.processFlowCode ? props.processFlowCode : 'final-audit-planning',
            processFlowName: props.processFlowName ? props.processFlowName : 'final-audit-planning',
            auditFlowMasterId: props.auditFlowMasterId ? props.auditFlowMasterId : '',
            processFlowMasterId: props.processFlowMasterId ? props.processFlowMasterId : ''

        };
    };
    onClickViewAudit = (auditPlanDetailsId) => {
        this.props.router.push(
            {
                pathname: 'auditor',
                tab: 'view-final-audit-score',
                auditPlanDetailsId: auditPlanDetailsId,
                query: {
                    tab: 'view-final-audit-score',
                    id: undefined,
                    pageName: 'Final Audit Score',
                    auditFlowMasterId: undefined,
                    auditPlanDetailsId: auditPlanDetailsId,
                }
            },
            'auditor/view-final-audit-score'
        );
    }

    updateColumnWhenPropsUpdate = () => {
        let columns = [
            {
                Header: 'Action',
                accessor: 'id',
                id: 'id',
                show: true,
                Cell: propss => (
                    <React.Fragment>
                        {(propss.original.isAuditTeamAssigned === 1 || propss.original.isAuditTeamAssigned === true) && (propss.original.isAuditExecuted === 1 || propss.original.isAuditExecuted === true) &&
                            <>
                                <div className="info width130px" onClick={() =>
                                    this.onClickViewAuditSummaryDetails(propss.original.id, propss.original.multiSectionMasterId)
                                }
                                >
                                    View Summary
                                </div>
                                <br />
                                {/* <div className="info width130px" onClick={() =>
                                    this.onClickViewAudit(propss.original.id, propss.original.multiSectionMasterId)
                                }
                                >
                                    View Self Score
                                </div> */}
                                {(propss.original.finalAuditPlan && propss.original.finalAuditPlan.id)
                                    ?
                                    <div >
                                        {(propss.original.finalAuditPlan.isAuditCancelled !== 1 && propss.original.finalAuditPlan.isAuditCancelled !== true && propss.original.finalAuditPlan.isAuditExecuted !== 1 && propss.original.finalAuditPlan.isAuditExecuted !== true) &&
                                            <>
                                                <div className="danger width130px"
                                                    onClick={() => this.onClickCancelFinalAudit(propss.original.finalAuditPlan.id)}
                                                >
                                                    Cancel Final Audit
                                                </div><br />
                                                <div className="warning width130px"
                                                    onClick={() =>
                                                        this.onClickModifyFinalAudit(propss.original.id, propss.original.multiSectionMasterId, propss.original.finalAuditPlan.id)
                                                    }
                                                >
                                                    Modify Final Audit
                                                </div>

                                            </>

                                        }

                                    </div>
                                    :
                                    <div className="primary width130px" onClick={() =>
                                        this.onClickPlanFinalAudit(propss.original.id, propss.original.multiSectionMasterId)
                                    }
                                    >
                                        Plan Final Audit
                                    </div>
                                }

                            </>
                        }
                    </React.Fragment>
                ),
                sortable: false,
                filterable: false,
                minWidth: 130,
            },
            {
                Header: 'Sr#',
                minWidth: 50,
                id: 'srnumber',
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
                Header: 'Self Audit Id',
                accessor: 'selfAuditNumber',
                id: 'selfAuditNumber',
                show: true,
            },
            {
                Header: 'Final Audit Id',
                accessor: 'finalAuditPlan.auditNumber',
                id: 'finalAuditNumber',
                show: true,
            },
            {
                Header: 'Plant',
                accessor: 'plant.plantName',
                id: 'plantName',
                show: true,
            },
            // {
            //     Header: 'From Date',
            //     accessor: 'auditFromDate',
            //     id: 'auditFromDate',
            //     show: true,
            // },
            // {
            //     Header: 'To Date',
            //     accessor: 'auditToDate',
            //     id: 'auditToDate',
            //     show: true,
            // },
            {
                Header: 'Self Audit Duration',
                // accessor: d => `${d.auditFromDate - d.auditToDate}`,
                Cell: row => (
                    <React.Fragment>
                        {row && row.original && row.original.auditFromDate && moment(new Date(row.original.auditFromDate)).format("DD-MMM-YYYY")}
                        &nbsp; <span>/</span><br /> &nbsp;
                        {row && row.original && row.original.auditToDate && moment(new Date(row.original.auditToDate)).format("DD-MMM-YYYY")}
                    </React.Fragment>
                ),
                id: 'selfAuditDuration',
                show: true,
            },
            // {
            //     Header: 'Planned Date',
            //     accessor: d => `${moment(new Date(d.auditPlannedOn)).format("YYYY-MM-DD")}`,
            //     id: 'auditPlannedOn',
            //     show: true,
            // },
            {
                Header: 'Plan Remarks',
                accessor: d => `${d.auditPlanRemarks}`,
                id: 'auditPlanRemarks',
                style: { 'white-space': "pre-wrap" },
                minWidth: 100,
                show: true
            },
            // {
            //     Header: 'Team Assigned',
            //     accessor: d => `${(d.isAuditTeamAssigned === 1 || d.isAuditTeamAssigned === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
            //     id: 'isAuditTeamAssigned',
            //     show: false
            // },
            // {
            //     Header: 'Team Assigned On',
            //     accessor: 'teamAssignedOn',
            //     id: 'teamAssignedOn',
            //     show: false,
            // },
            // {
            //     Header: 'Auditor Team',
            //     //  accessor: 'auditorTeam',
            //     accessor: d => `${d.auditorTeam ? d.auditorTeam.replace(',', " ") : ''}`,
            //     style: { 'white-space': "pre-wrap" },
            //     minWidth: 150,
            //     id: 'auditorTeam',
            //     show: false,
            // },
            // {
            //     Header: 'Auditee Team',
            //     // accessor: 'auditeeTeam',
            //     accessor: d => `${d.auditeeTeam ? d.auditeeTeam.replace(',', " ") : ''}`,
            //     style: { 'white-space': "pre-wrap" },
            //     minWidth: 150,
            //     id: 'auditeeTeam',
            //     show: false,
            // },
            // {
            //     Header: 'Audit Rescheduled',
            //     accessor: d => `${(d.isAuditRescheduled === 1 || d.isAuditRescheduled === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
            //     id: 'isAuditRescheduled',
            //     show: false
            // },
            // {
            //     Header: 'Rescheduled On',
            //     accessor: 'auditRescheduledOn',
            //     id: 'auditRescheduledOn',
            //     show: false,
            // },
            // {
            //     Header: 'Reason Of Reschedule',
            //     accessor: 'reasonOfReschedule',
            //     style: { 'white-space': "pre-wrap" },
            //     minWidth: 200,
            //     id: 'reasonOfReschedule',
            //     show: false,
            // },
            {
                Header: 'Self Audit Executed',
                accessor: d => `${(d.isAuditExecuted === 1 || d.isAuditExecuted === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
                id: 'isAuditExecuted',
                show: false
            },
            {
                Header: 'Final Audit Date',
                accessor: d => `${d.finalAuditPlan && d.finalAuditPlan.auditFromDate && moment(new Date(d.finalAuditPlan.auditFromDate)).format("DD-MMM-YYYY")}`,
                id: 'finalAuditDate',
                show: true,
            },
            {
                Header: 'Final Audit Remarks',
                accessor: d => `${d.finalAuditPlan && d.finalAuditPlan.auditPlanRemarks}`,
                id: 'finalAuditPlanRemarks',
                style: { 'white-space': "pre-wrap" },
                minWidth: 100,
                show: true
            },
            {
                Header: 'Coorporate Auditor Team',
                accessor: 'coorporateAuditorTeam',
                style: { 'white-space': "pre-wrap" },
                minWidth: 200,
                id: 'coorporateAuditorTeam',
                show: false,
            },
            {
                Header: 'plant Auditee Team',
                accessor: 'plantAuditeeTeam',
                style: { 'white-space': "pre-wrap" },
                minWidth: 200,
                id: 'plantAuditeeTeam',
                show: false,
            },
            {
                Header: 'Final Audit Cancelled',
                accessor: d => `${d.finalAuditPlan && (d.finalAuditPlan.isAuditCancelled === 1 || d.finalAuditPlan.isAuditCancelled === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
                id: 'isFinalAuditCancelled',
                show: false
            },
            {
                Header: 'Cancellation Remarks',
                accessor: d => `${d.finalAuditPlan && d.finalAuditPlan.cancellationRemarks !== 'null' && d.finalAuditPlan.cancellationRemarks !== null ? d.finalAuditPlan.cancellationRemarks : ''} `,// 'LeadEmail',
                id: 'finalAuditCancelleationRemarks',
                show: false
            },
        ]
        this.setState({ columns: columns });
    }

    componentDidMount() {
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getYearTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSelfAuditPlanDetails_BySequilize(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined, undefined, 'Executed');
        this.updateColumnWhenPropsUpdate();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.companys && nextProps.companys != this.state.companys) {
            this.setState({
                companys: nextProps.companys
            });
        }
        if (nextProps.finalAuditPlanActiontype && nextProps.finalAuditPlanActiontype === WorkingType.FINALAUDITPLANDETAILS_SAVE_SUCCESS && this.state.cancelFinalAuditPopup === true) {
            this.setState({
                cancelFinalAuditPopup: false
            });
            this.props.getSelfAuditPlanDetails_BySequilize(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined, undefined, 'Executed');

        }
        if (nextProps.plants && nextProps.plants != this.state.plants) {
            this.setState({
                plants: nextProps.plants
            });
        }

        if (nextProps.selfAuditPlans && nextProps.selfAuditPlans != this.state.selfAuditPlans) {
            this.setState({
                selfAuditPlans: nextProps.selfAuditPlans
            });
        }
        if (nextProps.yearTypes && nextProps.yearTypes != this.state.yearTypes) {
            this.setState({
                yearTypes: nextProps.yearTypes
            });
        }
        if (nextProps.processFlowCode && nextProps.processFlowCode != this.state.processFlowCode) {
            this.setState({
                processFlowCode: nextProps.processFlowCode
            });
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

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }
    onClickCancelFinalAudit = (id) => {
        let finalAuditDetail = {
            id: id,
            isAuditCancelled: true,
            auditCancelledOn: new Date(),
            cancellationRemarks: ''
        }
        this.setState({ cancelFinalAuditPopup: true, finalAuditDetail: finalAuditDetail });
    }
    onClickViewAudit = (auditPlanDetailsId, multiSectionMasterId) => {
        saveSelfAuditPlanId(auditPlanDetailsId);
        saveSelfAuditMultiSectionID(multiSectionMasterId);
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
                tab: 'view-self-audit-score',
                multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                query: {
                    tab: 'view-self-audit-score',
                    id: undefined,
                    pageName: 'Self Audit Execution',
                    auditFlowMasterId: undefined,
                    multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                    auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                }
            },
            'corporateCoordinator/view-self-audit-score'
        );
    }
    onClickPlanFinalAudit = (auditPlanDetailsId, multiSectionMasterId) => {
        saveSelfAuditPlanId(auditPlanDetailsId);
        saveSelfAuditMultiSectionID(multiSectionMasterId);
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
                tab: 'final-audit-plan',
                multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                query: {
                    tab: 'final-audit-plan',
                    id: undefined,
                    pageName: 'Final Audit Plan',
                    auditFlowMasterId: undefined,
                    multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                    auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                }
            },
            'corporateCoordinator/final-audit-plan'
        );
    }
    onClickModifyFinalAudit = (auditPlanDetailsId, multiSectionMasterId, finalAuditPlanDetailsId) => {
        saveSelfAuditPlanId(auditPlanDetailsId);
        saveSelfAuditMultiSectionID(multiSectionMasterId);
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
                tab: 'final-audit-plan',
                multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                query: {
                    tab: 'final-audit-plan',
                    id: this.props.id,
                    pageName: 'Final Audit Plan',
                    auditFlowMasterId: this.props.auditFlowMasterId,
                    multiSectionMasterId: JSON.stringify(multiSectionMasterId),
                    auditPlanDetailsId: JSON.stringify(auditPlanDetailsId),
                    finalAuditPlanDetailsId: finalAuditPlanDetailsId
                }
            },
            'corporateCoordinator/final-audit-plan'
        );
    }
    onClickRescheduleFinalAudit = () => {
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
                tab: 'reschedule-final-audit',
                query: {
                    tab: 'reschedule-final-audit',
                    id: undefined,
                    pageName: 'Reschedule Final Audit',
                }
            },
            'corporateCoordinator/reschedule-final-audit'
        );
    }
    onClickCloseCanceModelPopUp = () => {
        this.setState({
            cancelFinalAuditPopup: false,
            finalAuditDetail: null
        });
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onValueChangedCompany = selectedOption => {
        let selecteddata = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selecteddata) {
            selecteddata = [];
        }
        this.props.getSelfAuditPlanDetails_BySequilize(0, constants.ALL_ROWS_LIST, undefined, undefined, selecteddata, this.state.selectedPlantsId, 'Executed');

        this.props.getPlantMasterByGroupCompanyId(selecteddata);
        this.setState({ selectedCompany: selectedOption, selectedCompanyIds: selecteddata });
    };
    onValueChangedPlant = selectedOption => {
        let selectedPlant = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selectedPlant) {
            selectedPlant = [];
        }
        this.props.getSelfAuditPlanDetails_BySequilize(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.selectedCompanyIds, selectedPlant, 'Executed');

        this.setState({ selectedPlants: selectedOption, selectedPlantsId: selectedPlant });
    };
    onClickCancel = () => {
        const state = {};
        this.state.selectedPlants = null;
        this.state.selectedCompany = null;
        this.props.getSelfAuditPlanDetails_BySequilize(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined, undefined, 'Executed');

        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }
    onValueChangedYearType = selectedOption => {
        let selecteddata = selectedOption && selectedOption.value;// > 0 && selectedOption.map((item) => item.value);

        let where = [];
        if (selecteddata) {
            where.push({ key: 'yearTypeMasterId', value: selecteddata })
        }
        else if (!selecteddata || selecteddata === '') {
            where.push({ key: 'yearTypeMasterId', value: 'na' })
        }
        let FilterDetails = {
            yearTypeMasterId: selecteddata
        }
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, where);
        this.props.getSelfAuditPlanDetails_BySequilize(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined, undefined, 'Executed', selecteddata);

        this.setState({
            selectedCompany: [],
            selectedCompanyIds: [],
            selectedyearTypes: selectedOption,
            selectedYearTypeId: selecteddata,
            selectedPlants: [],
            selectedPlantsId: [],
            FilterDetails: FilterDetails
        });
    };
    onClickViewAuditSummaryDetails = (auditPlanDetailsId) => {
        saveSelfAuditPlanId(auditPlanDetailsId);
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'action-plan-update';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';

        this.props.router.push(
            {
                pathName: '/corporateCoordinator',
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
            }, 'corporateCoordinator/view-audit-complete-summary'
        );
    }
    render() {
        const { companys, plants, selectedyearTypes, yearTypes, cancelFinalAuditPopup, finalAuditDetail, openPopup, columns } = this.state;
        const options = plants && plants.length > 0 ? plants.map((item, index) => {
            return { value: item.id, label: item.plantName }
        }) : [{ value: "-1", label: 'Select Plant' }];

        const Companyoption = companys && companys.length > 0 ? companys.map((item, index) => {
            return { value: item.id, label: item.companyName }
        }) : [{ value: "-1", label: 'Select Company' }];
        let nulloption = [{ value: '', label: 'select list' }]
        const yearTypeOption = yearTypes && yearTypes.length > 0 ? yearTypes.map((item, index) => {
            return { value: item.id, label: item.yearTypeName }
        }) : [];
        const finalYearTypeDDL = nulloption.concat(yearTypeOption);
        console.log("this.state.selfAuditPlans",this.state.selfAuditPlans);
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                textalign={"left"}
                flexdirection="column"
            >
                {cancelFinalAuditPopup && cancelFinalAuditPopup === true &&
                    <>
                        <CommonStyle.Overlay
                        //   onClick={() => this.onClickCloseCanceModelPopUp()}
                        />
                        <CommonStyle.Wrapper_OnOverlay
                            visible={cancelFinalAuditPopup}
                            width={cancelFinalAuditPopup === true ? "50%" : "80%"}
                            height={"fit-content"}
                        >
                            <CommonStyle.CloseButtonForModel
                                onClick={() => this.onClickCloseCanceModelPopUp()}
                            >X</CommonStyle.CloseButtonForModel>
                            <CancelFinalAuditDetails
                                onSave={this.props.UpdateFinalAuditPlanDetails}
                                baseObject={finalAuditDetail}
                                onCancel={this.onClickCloseCanceModelPopUp}
                            />
                        </CommonStyle.Wrapper_OnOverlay>
                    </>
                }

                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="20%"
                        padding="21px 10px 5px 5px"
                        style={{ zIndex: '5' }}
                    >
                        <span style={{ marginLeft: "8px" }}>Audit Cycle</span>
                        <Select
                            className="width100p"
                            value={selectedyearTypes ? selectedyearTypes : null}
                            onChange={this.onValueChangedYearType}
                            options={finalYearTypeDDL}
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="20%"
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
                        width="20%"
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
                        width="10%"
                        padding="30px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "8px" }}> &nbsp;</span>
                        <Button
                            bgColor="#ad0000"
                            color="#ffffff"
                            height="35px"
                            width="100%"
                            bgChangeHover="#ffffff"
                            hoverColor="#ad0000"
                            borderRadius={"10px"}
                            border="solid 1px #ad0000"
                            style={{ marginTop: "3px", fontSize: "11px", }}
                            onClick={() => this.onClickCancel()}
                        >
                            RESET
                        </Button>
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="10%"
                        padding="30px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "8px" }}> &nbsp;</span>
                        <Button
                            bgColor="#ff9800"
                            color="#ffffff"
                            height="35px"
                            width="100%"
                            borderRadius={"10px"}
                            bgChangeHover="#ffffff"
                            hoverColor="#ff9800"
                            border="solid 1px #ff9800"
                            style={{ marginTop: "3px", fontSize: "11px", }}
                            onClick={() => this.onClickRescheduleFinalAudit()}
                        >
                            Reschedule
                        </Button>
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv>
                    <div style={{ width: '100%' }}>
                        <ReactTable
                            Data={this.state.selfAuditPlans}
                            sectionFilterApplicable={true}
                            isColumnUpdate={true}
                            updateColumn={this.updateColumn}
                            columns={columns}
                        />
                    </div>

                    {/* <AuditDetails
                        onClickViewAudit={this.onClickViewAudit}
                        Data={this.state.selfAuditPlans}
                        onClickPlanFinalAudit={this.onClickPlanFinalAudit}
                    /> */}
                    <CommonStyle.InputControlsDiv
                        width="100%"
                        padding="0px 0px 0px 0px"
                    >
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>

                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { selfAuditPlan, selfAuditPlans, finalAuditPlanActiontype, selfAuditPlanRecordsCount, selfAuditPlanActiontype } = state.workingReducer;
    const { plants, companys, yearTypes } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { companys, yearTypes, plants, finalAuditPlanActiontype, selfAuditPlan, selfAuditPlanActiontype, selfAuditPlans, errorType, errorMessage, selfAuditPlanRecordsCount, selfAuditPlanActiontype };
};

//export default connect(mapStateToProps, { getCompanyMaster, getSelfAuditPlanDetails_BySequilize, getSelfAuditPlanDetailsById, getPlantMaster, UpdateSelfAuditPlanDetails, deleteSelfAuditPlanDetails, initSelfAuditPlanDetails, getSelfAuditPlanDetails, hideError })(SelfAuditPlanningDetails);
export default withRouter(connect(mapStateToProps, { getYearTypeMasterData, getPlantMasterByGroupCompanyId, UpdateFinalAuditPlanDetails, getCompanyMaster, getSelfAuditPlanDetails_BySequilize, getSelfAuditPlanDetailsById, getPlantMaster, UpdateSelfAuditPlanDetails, deleteSelfAuditPlanDetails, initSelfAuditPlanDetails, getSelfAuditPlanDetails, hideError })(Index));
