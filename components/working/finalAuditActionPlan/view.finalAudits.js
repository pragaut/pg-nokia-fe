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
import { getYearTypeMasterData, getYearMasterData, getCompanyMaster, getPlantMaster, getPlantMasterByGroupCompanyId } from '../../../actions/admin.action';
import { getFinalAuditDetails } from '../../../actions/working.action';
import ListTable from '../../shared/ListTable';
import ReactTable from '../../ReactTableComponent';
import dynamic from 'next/dynamic';
import { minWidth } from '@material-ui/system';
import styled from 'styled-components';
import moment from 'moment';
import * as CommonStyle from '../../commonStyle';
import Select from 'react-select';

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

class FinalAuditPlan extends Wrapper {

    constructor(props) {
        super(props);

        this.state = {
            errortype: '',
            errorMessage: '',
            finalAuditPlans: [],
            yearTypes: [],
            years: [],
            companys: [],
            plants: [],
            selectedYearTypeMasterId: null,
            selectedCompany: null,
            selectedCompanyIds: [],
            selectedPlant: null,
            selectedPlantIds: [],
            columns: [],
            auditDataType: 'actionPlanApproved', ////all, executed, actionPlanUpdated, actionPlanApproved, actionPlanReviewCompleted           
            yearTypes: [],
            selectedYearIds: [],
            selectedYearTypeMasterId: null,
            year: null,
            years: [],
            selectedYearMasterId: null,
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
                Cell: p => (
                    <React.Fragment>
                        {(!p.original.isAuditCancelled && p.original.isAuditCancelled !== 1 && (p.original.isActionPlanUpdated || p.original.isActionPlanUpdated === 1 || p.original.isActionPlanUpdated === true)) &&
                            <button style={{ width: "125px" }} className="primary" value={p.original.id} onClick={() =>
                                this.onClickViewActionPlan(p.original.id, 'Active')
                            }>
                                View Action Plan
                            </button>
                        }
                       
                        <br/>
                        {(!p.original.isAuditCancelled && p.original.isAuditCancelled !== 1 && (p.original.isAuditClosed || p.original.isAuditClosed === 1 || p.original.isAuditClosed === true)) &&
                            <button style={{ width: "125px" }} className="info" value={p.original.id} onClick={() =>
                                this.onClickReviewActionPlan(p.original.id, 'Active')
                            }>
                                Monthly Review
                            </button>
                        }
                    </React.Fragment>
                ),
                minWidth: 110
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
                Header: 'Is Action Plan Updated',
                accessor: item => `${item.isActionPlanUpdated && (item.isActionPlanUpdated === true || item.isActionPlanUpdated === 1) ? 'Yes' : 'No'}`,
                id: 'isActionPlanUpdated',
                show: true,
                minWidth: 100
            },
            {
                Header: 'Is Audit Closed',
                accessor: item => `${item.isAuditClosed && (item.isAuditClosed === true || item.isAuditClosed === 1) ? 'Yes' : 'No'}`,
                id: 'isActionPlanUpdated',
                show: true,
                minWidth: 100
            },
            {
                Header: 'action Plan Remarks',
                accessor: 'auditApprovalRemarks',
                id: 'auditApprovalRemarks',
                show: false,
                minWidth: 100
            },
            {
                Header: 'Corporate Auditor Team',
                accessor: 'multiCorporateAuditorTeam',
                id: 'multiCorporateAuditorTeam',
                show: false,
                minWidth: 100
            },
            {
                Header: 'Plant Auditee Team',
                accessor: 'multiPlantAuditeeTeam',
                id: 'multiPlantAuditeeTeam',
                show: false,
                minWidth: 100
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.finalAuditPlans && nextProps.finalAuditPlans != this.state.finalAuditPlans) {
            this.setState({
                finalAuditPlans: nextProps.finalAuditPlans,
            })
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
        if (nextProps.yearTypes && nextProps.yearTypes != this.state.yearTypes) {
            this.setState({
                yearTypes: nextProps.yearTypes
            });
        }
        if (nextProps.years && nextProps.years != this.state.years) {
            let selectedYearId = nextProps.years && nextProps.years.filter(item => (item.isCurrentYear === 1 || item.isCurrentYear === true)).map(item => item.id);
            this.setState({
                years: nextProps.years,
                selectedYearIds: selectedYearId,
                selectedYearMasterId: selectedYearId
            });
            // let filters = {
            //     companyMasterId: this.state.selectedCompanyIds,
            //     plantMasterId: this.state.selectedPlantIds,
            //     auditDataType: this.state.auditDataType,
            //     yearMasterId: selectedYearId,
            // }
            // this.props.getFinalAuditDetails(filters, undefined, 0, constants.ALL_ROWS_LIST);
        }
    }

    componentDidMount() {
        this.props.getYearTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        //this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        let filters = {
            'auditDataType': this.state.auditDataType //all, executed, actionPlanUpdated, actionPlanApproved, actionPlanReviewCompleted           
        }
        this.props.getFinalAuditDetails(filters, undefined, 0, constants.ALL_ROWS_LIST);
        //console.log("finalAuditPlans 2 : ", this.props.finalAuditPlans);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    }

    updateColumns = (column) => {
        this.setState({
            columns: column
        })
    }

    onCompanySelection = selectedOption => {
        let selecteddata = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selecteddata) {
            selecteddata = [''];
        }
        console.log("selecteddata : ", selecteddata);
        let filters = {
            companyMasterId: selecteddata,
            plantMasterId: this.state.selectedPlantIds,
            auditDataType: this.state.auditDataType,
            yearMasterId: this.state.selectedYearMasterId,
        }
        this.props.getFinalAuditDetails(filters, undefined, 0, constants.ALL_ROWS_LIST);

        this.props.getPlantMasterByGroupCompanyId(selecteddata);
        this.setState({ selectedCompany: selectedOption, selectedCompanyIds: selecteddata });
    };

    onPlantSelection = selectedOption => {
        let selectedPlant = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selectedPlant) {
            selectedPlant = [''];
        }
        let filters = {
            companyMasterId: this.state.selectedCompanyIds,
            plantMasterId: selectedPlant,
            auditDataType: this.state.auditDataType,
            yearMasterId: this.state.selectedYearMasterId,
        }
        this.props.getFinalAuditDetails(filters, undefined, 0, constants.ALL_ROWS_LIST);

        this.setState({ selectedPlants: selectedOption, selectedPlantsId: selectedPlant });
    };

    onValueChanged = key => event => {
        // console.log("key : ", key);
        let validInput = true;
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (key == "yearTypeMasterId") {
            this.setState({
                selectedYearTypeMasterId: selectedValue,
                selectedCompanyIds: null,
                selectedPlantIds: null,
                selectedPlants: null,
                selectedCompany: null,
            })
            let where = [];
            if (selectedValue) {
                where.push({ key: 'yearTypeMasterId', value: selectedValue })
            }
            this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, where);
            this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, where);
        }
        else if (key == "yearMasterId") {
            this.setState({
                selectedYearMasterId: selectedValue
            })
        }
        setTimeout(() => {
            let filters = {
                companyMasterId: this.state.selectedCompanyIds,
                plantMasterId: this.state.selectedPlantIds,
                auditDataType: this.state.auditDataType,
                yearMasterId: this.state.selectedYearMasterId,
            }
            this.props.getFinalAuditDetails(filters, undefined, 0, constants.ALL_ROWS_LIST);
        }, 500);
    };

    onClickReset = () => {
        const state = {};
        this.state.selectedPlants = null;
        this.state.selectedCompany = null;
        let filters = {
            'auditDataType': this.state.auditDataType //all, executed, actionPlanUpdated, actionPlanApproved, actionPlanReviewCompleted           
        }
        this.props.getFinalAuditDetails(filters, undefined, 0, constants.ALL_ROWS_LIST);

        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }

    onClickViewActionPlan = (auditPlanDetailsId) => {
        //console.log("id : ", auditPlanId);

        this.props.router.push(
            {
                pathName: '/corporateCoordinator',
                tab: 'view-final-audit-action-plan-details',
                query: {
                    tab: 'view-final-audit-action-plan-details',
                    id: auditPlanDetailsId,
                    auditPlanDetailsId: auditPlanDetailsId,
                    pageName: 'View Final Audit Action Plan',
                }
            }, 'corporateCoordinator/view-final-audit-action-plan-details'
        );
    }

    onClickReviewActionPlan = (auditPlanDetailsId) => {
        //console.log("id : ", auditPlanId);

        this.props.router.push(
            {
                pathName: '/corporateCoordinator',
                tab: 'review-final-audit-action-plan',
                query: {
                    tab: 'review-final-audit-action-plan',
                    id: auditPlanDetailsId,
                    auditPlanDetailsId: auditPlanDetailsId,
                    pageName: 'Review Final Audit Action Plan',
                }
            }, 'corporateCoordinator/review-final-audit-action-plan'
        );
    }

    render() {
        //console.log("finalAuditPlans : ", this.props.finalAuditPlans);
        const { finalAuditPlans, columns, companys, plants, yearTypes, years, } = this.state;

        //console.log("years : ", years);

        const dataRow = finalAuditPlans ? finalAuditPlans : [];

        const companyDDLOption = companys && companys.length > 0 ? companys.map((item, index) => {
            return { value: item.id, label: item.companyName }
        }) : [{ value: "-1", label: 'Select Company' }];

        const plantDDLOptions = plants && plants.length > 0 ? plants.map((item, index) => {
            return { value: item.id, label: item.plantName }
        }) : [{ value: "-1", label: 'Select Plant' }];

        //console.log("this.props.companys : ", this.props.companys);
        //console.log("processFlowCode 1 : ", this.props.processFlowCode);
        return (
            <MainWrapper
                flexdirection="column"
            >
                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="10%"
                    >
                        <CommonStyle.InputLabel>
                            Audit Cycle
                        </CommonStyle.InputLabel>
                        <CommonStyle.InputDiv>
                            <SELECT
                                value={this.state.selectedYearTypeMasterId ? this.state.selectedYearTypeMasterId : ''}
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
                        width="10%"
                    >
                        <CommonStyle.InputLabel>
                            Year
                        </CommonStyle.InputLabel>
                        <CommonStyle.InputDiv>
                            <SELECT
                                value={this.state.selectedYearMasterId ? this.state.selectedYearMasterId : ''}//{this.state.selfAuditPlan.yearMasterId}
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
                    <CommonStyle.InputControlsDiv
                        width="30%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "5px" }}>Company</span>
                        <Select
                            className="width100p"
                            value={this.state.selectedCompany && this.state.selectedCompany}
                            onChange={this.onCompanySelection}
                            options={companyDDLOption}
                            closeMenuOnSelect={false}
                            isMulti={true}
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="30%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "5px" }}>Plant</span>
                        <Select
                            className="width100p"
                            value={this.state.selectedPlants && this.state.selectedPlants}
                            onChange={this.onPlantSelection}
                            options={plantDDLOptions}
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
                            onClick={() => this.onClickReset()}
                        >
                            RESET
                        </Button>
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv>
                    <ReactTable
                        Data={dataRow}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumns}
                        columns={columns}
                        width={'100%'}
                    />
                </CommonStyle.FormDiv>
            </MainWrapper>
        );
    }

}

const mapStateToProps = state => {
    const { finalAuditPlans } = state.workingReducer;
    const { companys, plants, yearTypes, years } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { errorType, errorMessage, companys, plants, finalAuditPlans, yearTypes, years };
}

export default withRouter(connect(mapStateToProps, { getYearTypeMasterData, getYearMasterData, getFinalAuditDetails, getCompanyMaster, getPlantMaster, getPlantMasterByGroupCompanyId })(FinalAuditPlan));