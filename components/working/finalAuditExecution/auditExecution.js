import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Wrapper from '../../shared/Wrapper';
import { Input, Button } from '../../formStyle';
import Gap from '../../Gap';
import { constants } from '../../../utils/constants';
import { getSectionMasterData } from '../../../actions/admin.action';
import { getFinalAuditPlanForExecution, getFinalAuditScopeForExecution } from '../../../actions/working.action';
import ReactTable from '../../ReactTableComponent';
import styled from 'styled-components';
import moment from 'moment';
import AuditScopeDetails from './auditScopeDetails';

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

class AuditExecution extends Wrapper {
    constructor(props) {
        super(props)
        this.state = {
            finalAuditPlanDetailsForExecution: [],
            finalAuditScopeDetailsForExecution: [],
            sections: [],
            auditPlanId: '',
            auditPlanDetailsId: '',
            auditFlowMasterId: '',
            processFlowMasterId: '',
            processFlowCode: '',
            processFlowName: '',
            columns: [
                // {
                //     Header: 'Action',
                //     accessor: 'id',
                //     id: 'id',
                //     show: false,
                //     Cell: p => (
                //         <React.Fragment>
                //             {(!p.original.isAuditCancelled && !p.original.isAuditExecuted) &&
                //                 <button className="primary" value={p.original.id} onClick={() =>
                //                     this.onClickUpdateObservation(p.original.id, 'Active')
                //                 }>
                //                    View Details
                //                 </button>
                //             }
                //         </React.Fragment>
                //     ),
                //     minWidth: 150
                // },
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
                },
                {
                    Header: 'Plant',
                    accessor: 'plantName',
                    id: 'plantName',
                    show: true,
                    minWidth: 100,
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
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.finalAuditPlanDetailsForExecution && nextProps.finalAuditPlanDetailsForExecution != this.state.finalAuditPlanDetailsForExecution) {
            this.setState({
                finalAuditPlanDetailsForExecution: nextProps.finalAuditPlanDetailsForExecution,
            })
        }
        if (nextProps && nextProps.finalAuditScopeDetailsForExecution && nextProps.finalAuditScopeDetailsForExecution != this.state.finalAuditScopeDetailsForExecution) {
            this.setState({
                finalAuditScopeDetailsForExecution: nextProps.finalAuditScopeDetailsForExecution,
            })
        }
        if (nextProps && nextProps.sections && nextProps.sections != this.state.sections) {
            this.setState({
                sections: nextProps.sections,
            })
        }
    }

    componentDidMount() {
        if (this.props && this.props.auditPlanDetailsId && this.props.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanId: this.props.auditPlanId,
                auditPlanDetailsId: this.props.auditPlanDetailsId,
            })
        }
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
        setTimeout(() => {
            this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            let filters = {
                auditDetailsId: this.state.auditPlanDetailsId,
                auditPlanDetailsId: this.state.auditPlanDetailsId,
            }
            this.props.getFinalAuditPlanForExecution(filters, undefined, 0, constants.ALL_ROWS_LIST);
            //this.props.getFinalAuditScopeForExecution(filters, undefined, 0, constants.ALL_ROWS_LIST);
        }, 200);
    }

    updateColumns = (column) => {
        this.setState({
            columns: column
        })
    }

    onBackClick() {
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : '';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';

        this.props.router.push(
            {
                pathname: '/auditor',
                query: {
                    tab: 'final-audit-execution-index',
                    id: processFlowMasterId,
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName,
                    processFlowCode: processFlowCode,
                    pageName: 'Audit Observation',
                    auditFlowMasterId: auditFlowMasterId
                },
                tab: 'final-audit-execution-index',
            },
            'auditor/final-audit-execution-index'
        )
    }

    render() {
        const { finalAuditPlanDetailsForExecution, columns, processFlowMasterId, processFlowCode, auditFlowMasterId, processFlowName, auditPlanDetailsId } = this.state;
        const dataRow = finalAuditPlanDetailsForExecution ? finalAuditPlanDetailsForExecution : [];
        //console.log("processFlowCode 1 : ", this.props.processFlowCode);
        //console.log("processFlowCode 2 : ", processFlowCode);

        return (
            <MainWrapper
                flexdirection="column"
                textalign="left"
                justifycontent="left"
                alignitems="left"
            >
                <Button
                    width="75px"
                    height="35px"
                    borderRadius="6px"
                    bgColor="teal"
                    onClick={() =>
                        this.onBackClick()
                    }
                >
                    Back
                </Button>
                <Gap h="5px" />
                <ReactTable
                    Data={dataRow}
                    isColumnUpdate={true}
                    isFilterRequired={false}
                    updateColumn={this.updateColumns}
                    columns={columns}
                    width={'100%'}
                    minRows={1}
                    showPaginationBottom={false}
                    showPageSizeOptions={false}
                    showPagination={false}
                />
                <Gap h="20px" />
                <AuditScopeDetails
                    processFlowMasterId={processFlowMasterId}
                    processFlowCode={processFlowCode}
                    auditFlowMasterId={auditFlowMasterId}
                    processFlowName={processFlowName}
                    auditPlanDetailsId={auditPlanDetailsId}
                >
                </AuditScopeDetails>
            </MainWrapper>
        );
    } 
}
const mapStateToProps = state => {
    const { finalAuditPlanDetailsForExecution, finalAuditScopeDetailsForExecution } = state.workingReducer;
    const { sections } = state.adminReducer;
    const errorType = state.errorReducer.error;
    const errorMessage = state.errorReducer.error;

    return { errorType, errorMessage, finalAuditPlanDetailsForExecution, finalAuditScopeDetailsForExecution, sections };
}
export default withRouter(connect(mapStateToProps, { getSectionMasterData, getFinalAuditPlanForExecution, getFinalAuditScopeForExecution })(AuditExecution));
