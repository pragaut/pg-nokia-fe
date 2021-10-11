import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getFinalAuditDetailsByResponsibilityWiseDetails } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import Select from 'react-select';
import moment from 'moment';
import Gap from '../../Gap';
import { getCompanyMaster, getPlantMaster } from '../../../actions/admin.action';
//import SelfAuditPlanDetails from '../../masters/selfAuditPlans'
import { hideError, showError } from '../../../actions/error.actions';
import * as WorkingType from '../../../action-types/working.action.types';
import { withRouter } from 'next/router';
import { saveSelfAuditPlanId, saveSelfAuditMultiSectionID } from '../../../utils/session.helper';
import styled from 'styled-components';

import ReactTable from '../../ReactTableComponent';
import dynamic from 'next/dynamic';

const MainWrapper = styled.div`
    width : ${props => props.width ? props.width : '100%'};
    height : ${props => props.height ? props.height : 'auto'};
    background-color:${props => props.bgColor ? props.bgColor : 'transparent'};
    padding : ${props => props.padding ? props.padding : '0px 0px 0px 0px'};
    flex-wrap : ${props => props.flexwrap ? props.flexwrap : 'nowrap'};
    display : ${props => props.display ? props.display : 'flex'};
    flex-direction :  ${props => props.flexdirection ? props.flexdirection : 'row'};
    justify-content : ${props => props.justifycontent ? props.justifycontent : 'center'};
    align-items : ${props => props.alignitems ? props.alignitems : 'center'};
    text-align : ${props => props.textalign ? props.textalign : 'center'};
    border : ${props => props.border ? props.border : '0px'};
    border-radius : ${props => props.borderradius ? props.borderradius : '0px'};
    font-family:${props => props.fontfamily ? props.fontfamily : 'Asap'} ;
    color:  ${props => props.color ? props.color : '#000'} ;
    .disabled{
        cursor: not-allowed;
    }
    .pg-logo-style{
    height: 40px;
    width: 140px;
    }
    &:hover{
    transform: ${props => props.hoverscalerequired === true ? 'scale(1.1)' : undefined};
    }
`

class finalAuditIndex extends Wrapper {
 
    constructor(props) {
        super(props);  
        this.state = { 
            auditFlowMasterId: props.auditFlowMasterId ? props.auditFlowMasterId : '',
            processFlowMasterId: props.processFlowMasterId ? props.processFlowMasterId : '',
            processFlowName:  props.processFlowName ? props.processFlowName : '',
            yearTypes: [],
            years: [],
            companys: [],
            plants: [],
            processFlowCode: props.processFlowCode ? props.processFlowCode : '',
            responsibilityWiseFinalAuditDetails: [],
            isTeamAssignmentPopupVisible: false,
            isAuditExecutionVisible: false,
            selectedAuditPlanDetailsId: undefined,
            columns: []
        };

    };

    onClickFinalViewAudit = (auditPlanDetailsId) => {       
        this.props.router.push(
            {
                pathname: 'plantHrHead',
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
            'plantHrHead/view-final-audit-score'
        );
    }

    updateColumnWhenPropsUpdate = () => {
        let columns = [
            {
                Header: 'Action',
                accessor: 'id',
                id: 'id',
                show: true,
                Cell: p => (
                    <React.Fragment>
                        {this.state.processFlowCode === 'monthly-review' &&
                            <>
                                {(p.original.isActionPlanUpdated && (p.original.isActionPlanUpdated === 1 || p.original.isActionPlanUpdated === true) && (p.original.isAuditClosed === true || p.original.isAuditClosed === 1) && (p.original.isActionPlanReviewCompleted !== true && p.original.isActionPlanReviewCompleted !== 1)) &&
                                    <button className="primary" value={p.original.id} onClick={() =>
                                        this.onClickUpdateMonthlyReviewButton(p.original.id)
                                    }>
                                        Monthly Review
                                    </button>
                                }
                            </>
                        }
                        {this.state.processFlowCode === 'action-plan-update' &&
                            <>
                                {(p.original.isAuditExecuted && (p.original.isAuditExecuted === 1 || p.original.isAuditExecuted === true) && (p.original.isActionPlanUpdated !== true && p.original.isActionPlanUpdated !== 1)) &&
                                    <button className="primary" value={p.original.id} onClick={() =>
                                        this.onClickUpdateActionPlanButton(p.original.id)
                                    }>
                                        Update Action Plan
                                    </button>
                                }
                                <br />
                                {(p.original.isAuditExecuted && (p.original.isAuditExecuted === 1 || p.original.isAuditExecuted === true) && (p.original.isActionPlanUpdated === true || p.original.isActionPlanUpdated === 1)) &&
                                    <button className="info" value={p.original.id} onClick={() =>
                                        this.onClickViewActionPlanButton(p.original.id)
                                    }>
                                        View Action Plan
                                    </button>
                                }
                                <br/>
                                 <div className="primary width120px" onClick={() =>
                                    this.onClickFinalViewAudit(p.original.id)
                                }
                                >
                                    View Final Score
                        </div>
                            </>
                        }

                        <br />
                        {((p.original.isActionPlanReviewCompleted === 1 || p.original.isActionPlanReviewCompleted === true)) &&
                            <button style={{ width: "125px" }} className="info" value={p.original.id} onClick={() =>
                                this.onClickReviewActionPlan(p.original.id, 'Active')
                            }>
                                Monthly Review
                            </button>
                        }
                        {(p.original.selfAuditPlanDetailsId) &&
                            <button style={{ width: "125px" }} className="info" value={p.original.id} onClick={() =>
                                this.onClickViewAuditSummaryDetails(p.original.selfAuditPlanDetailsId, 'Active')
                            }>
                               View Summary
                            </button>
                        }
                    </React.Fragment>
                ),
                minWidth: 150
            },
            {
                Header: 'Self Audit Number',
                accessor: 'selfAuditNumber',
                id: 'selfAuditNumber',
                show: true,
                minWidth: 100
            },
            {
                Header: 'Audit Number',
                accessor: 'auditNumber',
                id: 'auditNumber',
                show: true,
                minWidth: 100
            },

            {
                Header: 'Company',
                accessor: 'companyName',
                id: 'companyName',
                show: true,
                minWidth: 100,
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                        return true;
                    }
                    return row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        {this.state.companys && this.state.companys.length > 0 &&
                            this.state.companys.map((item, index) => {
                                return <option value={item.companyName}>{item.companyName}</option>
                            })
                        }
                    </select>
            },
            {
                Header: 'Plant',
                accessor: 'plantName',
                id: 'plantName',
                show: true,
                minWidth: 100,
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                        return true;
                    }
                    return row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        {this.state.plants && this.state.plants.length > 0 &&
                            this.state.plants.map((item, index) => {
                                return <option value={item.plantName}>{item.plantName}</option>
                            })
                        }
                    </select>
            },
            {
                Header: 'Audit Year',
                accessor: 'yearName',
                id: 'yearName',
                show: true,
                minWidth: 100
            },
            {
                Header: 'Plan Remarks',
                accessor: 'auditPlanRemarks',
                id: 'auditPlanRemarks',
                show: true,
                minWidth: 100
            },
            {
                Header: 'Audit Date',
                accessor: item => `${moment(new Date(item.auditFromDate)).format("DD-MMM-YYYY")}`, //'auditFromDate',
                id: 'auditFromDate',
                show: true,
                minWidth: 100
            },
            {
                Header: 'Is Audit Cancelled',
                accessor: item => `${item.isAuditCancelled && (item.isAuditCancelled === true || item.isAuditCancelled === 1) ? 'Yes' : 'No'}`,
                id: 'isAuditCancelled',
                show: true,
                minWidth: 100
            },
            {
                Header: 'Is Audit Executed',
                accessor: item => `${item.isAuditExecuted && (item.isAuditExecuted === true || item.isAuditExecuted === 1) ? 'Yes' : 'No'}`,
                id: 'isAuditExecuted',
                show: true,
                minWidth: 100
            },
            {
                Header: 'Corporate Auditor Team',
                accessor: 'multiCorporateAuditorTeam',
                id: 'multiCorporateAuditorTeam',
                show: true,
                minWidth: 100
            },
            {
                Header: 'Plant Auditee Team',
                accessor: 'multiPlantAuditeeTeam',
                id: 'multiPlantAuditeeTeam',
                show: true,
                minWidth: 100
            },
        ]
        this.setState({ columns: columns });
    }
    onClickReviewActionPlan = (auditPlanDetailsId) => {
        this.props.router.push(
            {
                pathName: '/plantHrHead',
                tab: 'review-final-audit-action-plan',
                query: {
                    tab: 'review-final-audit-action-plan',
                    id: auditPlanDetailsId,
                    auditPlanDetailsId: auditPlanDetailsId,
                    pageName: 'Review Final Audit Action Plan',
                }
            }, 'plantHrHead/review-final-audit-action-plan'
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


    componentDidMount() {
        saveSelfAuditPlanId(undefined);
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        if (this.props && this.props.auditFlowMasterId && this.props.auditFlowMasterId != this.state.auditFlowMasterId) {
            this.setState({
                auditFlowMasterId: this.props.auditFlowMasterId,
            })
        }
        if (this.props && this.props.processFlowMasterId && this.props.processFlowMasterId != this.state.processFlowMasterId) {
            this.setState({
                processFlowMasterId: this.props.processFlowMasterId,
            })
        }
        //console.log("processFlowCode 0 : ", this.props.processFlowCode);
        if (this.props && this.props.processFlowCode && this.props.processFlowCode != this.state.processFlowCode) {
            this.setState({
                processFlowCode: this.props.processFlowCode,
            })
        }
        if (this.props && this.props.processFlowName && this.props.processFlowName != this.state.processFlowName) {
            this.setState({
                processFlowName: this.props.processFlowName,
            })
        }
        this.props.getFinalAuditDetailsByResponsibilityWiseDetails(0, constants.ALL_ROWS_LIST, undefined, undefined, this.props.processFlowCode, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.responsibilityWiseFinalAuditDetails && nextProps.responsibilityWiseFinalAuditDetails != this.state.responsibilityWiseFinalAuditDetails) {
            this.setState({
                responsibilityWiseFinalAuditDetails: nextProps.responsibilityWiseFinalAuditDetails
            });
        }
        if (nextProps.processFlowCode && nextProps.processFlowCode !== this.state.processFlowCode) {
            this.props.getFinalAuditDetailsByResponsibilityWiseDetails(0, constants.ALL_ROWS_LIST, undefined, undefined, nextProps.processFlowCode, undefined);

            this.setState({ processFlowCode: nextProps.processFlowCode });
        }
        if (nextProps && nextProps.companys && nextProps.companys != this.state.companys) {
            this.setState({
                companys: nextProps.companys,
            })
        }
        if (nextProps && nextProps.plants && nextProps.plants != this.state.plants) {
            this.setState({
                plants: nextProps.plants,
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
    onClickUpdateActionPlanButton = (auditPlanDetailsId) => {
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'action-plan-update';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';
        this.props.router.push(
            {
                pathname: 'plantHrHead',
                tab: 'update-observation-action-plan',
                auditPlanDetailsId: auditPlanDetailsId,
                query: {
                    tab: 'update-observation-action-plan',
                    id: processFlowMasterId,
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName,
                    processFlowCode: processFlowCode,
                    pageName: 'Update Observation Action Plan',
                    auditFlowMasterId: auditFlowMasterId,
                    auditPlanDetailsId: auditPlanDetailsId
                }
            },
            'plantHrHead/update-observation-action-plan'
        );
    }
    onClickUpdateMonthlyReviewButton = (auditPlanDetailsId) => {
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'action-plan-update';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';
        this.props.router.push(
            {
                pathname: 'plantHrHead',
                tab: 'monthly-review-update',
                auditPlanDetailsId: auditPlanDetailsId,
                query: {
                    tab: 'monthly-review-update',
                    id: processFlowMasterId,
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName,
                    processFlowCode: processFlowCode,
                    pageName: 'Monthly Review',
                    auditFlowMasterId: auditFlowMasterId,
                    auditPlanDetailsId: auditPlanDetailsId
                }
            },
            'plantHrHead/monthly-review-update'
        );
    }
    onClickViewActionPlanButton = (auditPlanDetailsId) => {

        const CurrentRole = this.getLoggedUserRole_JSONConverted();
        const roleCode = CurrentRole && CurrentRole.roleCode;

        let p_pathname = 'plantHrHead';
        let p_Url = 'plantHrHead/view-action-plan-details';
        if (roleCode === "Corporate_Coordinator") {
            p_pathname = "corporateCoordinator";
            p_Url = 'corporateCoordinator/view-action-plan-details';
        }
        else if (roleCode === "Auditor") {
            p_pathname = "auditor";
            p_Url = 'auditor/view-action-plan-details';
        }
        else if (roleCode === "Management") {
            p_pathname = "management";
            p_Url = 'management/view-action-plan-details';
        }

        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'action-plan-update';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';

        this.props.router.push(
            {
                pathname: p_pathname,
                tab: 'view-action-plan-details',
                auditPlanDetailsId: auditPlanDetailsId,
                query: {
                    tab: 'view-action-plan-details',
                    id: processFlowMasterId,
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName,
                    processFlowCode: processFlowCode,
                    pageName: 'View Action Plan ',
                    auditFlowMasterId: auditFlowMasterId,
                    auditPlanDetailsId: auditPlanDetailsId
                }
            },
            p_Url
        );
    }
    onClickViewAudit = (auditPlanDetailsId, multiSectionMasterId) => {
        saveSelfAuditPlanId(auditPlanDetailsId);
        saveSelfAuditMultiSectionID(multiSectionMasterId);
        this.props.router.push(
            {
                pathname: 'plantHrHead',
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
    updateColumns = (column) => {
        this.setState({
            columns: column
        })
    }
    render() {
        const { responsibilityWiseFinalAuditDetails, columns } = this.state;
        const dataRow = responsibilityWiseFinalAuditDetails && responsibilityWiseFinalAuditDetails.length > 0 ? responsibilityWiseFinalAuditDetails : [];
        console.log("ResponsibilityWiseFinalAuditDetails", responsibilityWiseFinalAuditDetails);

        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                <MainWrapper>
                    <ReactTable
                        Data={dataRow}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumns}
                        columns={columns}
                        width={'100%'}
                    />
                </MainWrapper>
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { responsibilityWiseFinalAuditDetails } = state.workingReducer;
    const { companys, plants } = state.adminReducer;
    return { responsibilityWiseFinalAuditDetails, companys, plants };
};
export default withRouter(connect(mapStateToProps, { getFinalAuditDetailsByResponsibilityWiseDetails, hideError, connect, getCompanyMaster, getPlantMaster })(finalAuditIndex));
