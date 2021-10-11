import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Wrapper from '../../shared/Wrapper';
import style from '../../../theme/app.scss';
import * as commanStyle from '../../commonStyle';
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle';
import Gap from '../../Gap';
import { constants } from '../../../utils/constants';
import { uniqueId } from '../../../utils';
import * as  adminTypes from '../../../action-types/admin.action.types';
import * as workingTypes from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import * as windowTypes from '../../../action-types/window.action.types';
import { hideError, showError } from '../../../actions/error.actions';
import { getCompanyMaster, getPlantMaster } from '../../../actions/admin.action';
import { getFinalAuditPlanForExecution } from '../../../actions/working.action';
import ListTable from '../../shared/ListTable';
import ReactTable from '../../ReactTableComponent';
import dynamic from 'next/dynamic';
import { minWidth } from '@material-ui/system';
import styled from 'styled-components'
import moment from 'moment';

const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false });

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

class FinalAuditExecutionIndex extends Wrapper {

    constructor(props) {
        super(props);

        this.state = {
            errortype: '',
            errorMessage: '',
            finalAuditPlanDetailsForExecution: [],
            yearTypes: [],
            years: [],
            companys: [],
            plants: [],
            selectedYearTypeMasterId: null,
            selectedCompany: null,
            selectedCompanyIds: [],
            selectedPlant: null,
            selectedPlantIds: [],
            columns: []
        };
    };

    updateColumnWhenPropsUpdate = () => {
        let columns = [
            {
                Header: 'Action',
                accessor: 'id',
                id: 'id',
                show: true,
                Cell: p => (
                    <React.Fragment>
                        {(!p.original.isAuditCancelled && p.original.isAuditCancelled !== 1 && !p.original.isAuditExecuted && p.original.isAuditExecuted !== 1 && !p.original.isAuditExecutedByAuditor && p.original.isAuditExecutedByAuditor !== 1) &&

                        <>
                            <button className="primary" value={p.original.id} onClick={() =>
                                this.onClickUpdateObservation(p.original.id, 'Active')
                            }>
                                Update Execution
                            </button><br/>
                            </>
                        }
                        <br />
                        <div className="info width120px" onClick={() =>
                                    this.onClickViewAudit(p.original.id)
                                }
                                >
                                    View Final Score
                        </div>
                    </React.Fragment>
                ),
                minWidth: 150,
                sortable: true,
                filterable: false
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.finalAuditPlanDetailsForExecution && nextProps.finalAuditPlanDetailsForExecution != this.state.finalAuditPlanDetailsForExecution) {
            this.setState({
                finalAuditPlanDetailsForExecution: nextProps.finalAuditPlanDetailsForExecution,
            })
        }
        if (nextProps && nextProps.companys && nextProps.companys != this.state.companys) {
            this.setState({
                companys: nextProps.companys,
            });
            setTimeout(() => {
                this.updateColumnWhenPropsUpdate();
            }, 50);
        }
        if (nextProps && nextProps.plants && nextProps.plants != this.state.plants) {
            this.setState({
                plants: nextProps.plants,
            });
            setTimeout(() => {
                this.updateColumnWhenPropsUpdate();
            }, 50);
        }

    }

    componentDidMount() {
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        let filters = {}
        this.props.getFinalAuditPlanForExecution(filters, undefined, 0, constants.ALL_ROWS_LIST);
        //console.log("finalAuditPlanDetailsForExecution 2 : ", this.props.finalAuditPlanDetailsForExecution);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    }

    updateColumns = (column) => {
        this.setState({
            columns: column
        })
    }

    onClickUpdateObservation = (auditPlanId) => {
        //console.log("id : ", auditPlanId);
        let processFlowMasterId = this.props.processFlowMasterId;
        let processFlowCode = this.props.processFlowCode;
        let auditFlowMasterId = this.props.auditFlowMasterId;
        let processFlowName = this.props.processFlowName;

        this.props.router.push(
            {
                pathName: '/auditor',
                tab: 'update-final-audit-observations',
                query: {
                    tab: 'update-final-audit-observations',
                    id: auditPlanId && auditPlanId,
                    auditPlanDetailsId: auditPlanId,
                    auditFlowMasterId: auditFlowMasterId,
                    pageName: 'Update Final Audit Execution',
                    processFlowMasterId: processFlowMasterId,
                    processFlowCode: processFlowCode,
                }
            }, 'auditor/update-final-audit-execution'
        );
    }
    onClickViewAudit = (auditPlanDetailsId) => {       
        this.props.router.push(
            {
                pathname: 'auditor',
                tab: 'view-final-audit-score',
                auditPlanDetailsId: auditPlanDetailsId,
                query: {
                    tab: 'view-final-audit-score',
                    id: undefined,
                    pageName: 'Audit Execution',
                    auditFlowMasterId: undefined,
                    auditPlanDetailsId: auditPlanDetailsId,
                }
            },
            'auditor/view-final-audit-score'
        );
    }

    render() {
        //console.log("finalAuditPlanDetailsForExecution : ", this.props.finalAuditPlanDetailsForExecution);
        const { finalAuditPlanDetailsForExecution, columns } = this.state;
        const dataRow = finalAuditPlanDetailsForExecution ? finalAuditPlanDetailsForExecution : [];
        //console.log("this.props.companys : ", this.props.companys);
        //console.log("processFlowCode 1 : ", this.props.processFlowCode);
        return (
            <MainWrapper>
                <ReactTable
                    Data={dataRow}
                    isColumnUpdate={true}
                    updateColumn={this.updateColumns}
                    columns={columns}
                    width={'100%'}
                />
            </MainWrapper>
        );
    }

}

const mapStateToProps = state => {
    const { finalAuditPlans, finalAuditPlanDetailsForExecution } = state.workingReducer;
    const { companys, plants } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { errorType, errorMessage, companys, plants, finalAuditPlans, finalAuditPlanDetailsForExecution };
}

export default withRouter(connect(mapStateToProps, { getFinalAuditPlanForExecution, getCompanyMaster, getPlantMaster })(FinalAuditExecutionIndex));