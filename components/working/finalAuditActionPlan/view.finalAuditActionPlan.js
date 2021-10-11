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
//import { getYearTypeMasterData, getYearMasterData, getCompanyMaster, getPlantMaster, getPlantMasterByGroupCompanyId } from '../../../actions/admin.action';
import { getFinalAuditActionPlanDetails } from '../../../actions/working.action';
import ListTable from '../../shared/ListTable';
import ReactTable from '../../ReactTableComponent';
import dynamic from 'next/dynamic';
import { minWidth } from '@material-ui/system';
import styled from 'styled-components';
import moment from 'moment';
import * as CommonStyle from '../../commonStyle';
import Select from 'react-select';
import FinalAuditBasicDetails from '../viewDetails/finalAuditBasicDetails';

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
export const FormDiv = styled.div` 
  width:${props => props.width ? props.width : "100%"}; 
  display : ${props => props.display ? props.display : 'flex'};
  flex-wrap : ${props => props.flexwrap ? props.flexwrap : 'wrap'};
  flex-direction :  ${props => props.flexdirection ? props.flexdirection : 'row'};
  padding:0px 0px 0px 0px;

  @media(max-width : 768px)
  {
    width : 100;
  }
`;

class FinalAuditPlan extends Wrapper {

    constructor(props) {
        super(props);

        this.state = {
            errortype: '',
            errorMessage: '',
            finalAuditActionPlandetails: [],
            columns: [],
            auditDataType: 'actionPlanApproved', ////all, executed, actionPlanUpdated, actionPlanApproved, actionPlanReviewCompleted                       
            auditPlanDetailsId: ''
        };
    };

    updateColumnWhenPropsUpdate = () => {
        let columns = [
            // {
            //     Header: 'Action',
            //     accessor: 'id',
            //     id: 'id',
            //     show: true,
            //     Cell: p => (
            //         <React.Fragment>
            //             {(!p.original.isAuditCancelled && p.original.isAuditCancelled !== 1 && (p.original.isActionPlanUpdated || p.original.isActionPlanUpdated === 1 || p.original.isActionPlanUpdated === true)) &&
            //                 <button className="primary" value={p.original.id} onClick={() =>
            //                     this.onClickViewActionPlan(p.original.id, 'Active')
            //                 }>
            //                     View Action Plan
            //                 </button>
            //             }
            //         </React.Fragment>
            //     ),
            //     minWidth: 150
            // },
            // {
            //     Header: 'Self Audit Number',
            //     accessor: 'selfAuditNumber',
            //     id: 'selfAuditNumber',
            //     show: true,
            //     minWidth: 100
            // },
            {
                Header: 'Section',
                accessor: 'sectionName',
                id: 'sectionName',
                show: true,
                minWidth: 80
            },
            {
                Header: 'Sub Section',
                accessor: 'subSectionName',
                id: 'subSectionName',
                show: true,
                minWidth: 80
            },
            {
                Header: 'Question',
                accessor: 'question',
                id: 'question',
                show: true,
                minWidth: 200
            },
            {
                Header: 'Audit Observation',
                accessor: 'observationName',
                id: 'observationName',
                show: false,
                minWidth: 80
            },
            {
                Header: 'Observation Remarks',
                accessor: 'auditObservationRemarks',
                id: 'auditObservationRemarks',
                show: true,
                minWidth: 80
            },
            {
                Header: 'Observation Date',
                accessor: item => `${moment(new Date(item.auditObservationDate)).format("DD-MMM-YYYY")}`, //'auditFromDate',
                id: 'auditObservationDate',
                show: false,
                minWidth: 80
            },
            {
                Header: 'action Plan Date',
                accessor: item => `${moment(new Date(item.auditObservationDate)).format("DD-MMM-YYYY")}`, //'auditFromDate',
                id: 'actionPlanSubmittedOn',
                show: true,
                minWidth: 80
            },
            {
                Header: 'Action Proposed',
                accessor: 'actionProposed',
                id: 'actionProposed',
                show: true,
                minWidth: 80
            },
            {
                Header: 'Outcome Expected',
                accessor: 'outcomeExpected',
                id: 'outcomeExpected',
                show: true,
                minWidth: 80
            },
            {
                Header: 'Responsibility',
                accessor: 'responsibility',
                id: 'responsibility',
                show: false,
                minWidth: 80
            },
            {
                Header: 'Target Date',
                accessor: item => `${moment(new Date(item.targetDate)).format("DD-MMM-YYYY")}`, //'auditFromDate',
                id: 'targetDate',
                show: true,
                minWidth: 80
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log("NP finalAuditActionPlandetails : ", nextProps);

        if (nextProps && nextProps.finalAuditActionPlandetails && nextProps.finalAuditActionPlandetails != this.state.finalAuditActionPlandetails) {
            this.setState({
                finalAuditActionPlandetails: nextProps.finalAuditActionPlandetails,
            });
        }
        if (nextProps && nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanId: nextProps.auditPlanId,
                auditPlanDetailsId: nextProps.auditPlanDetailsId,
            });
            let filters = {
                auditPlanDetailsId: nextProps.auditPlanDetailsId,
                'auditDataType': this.state.auditDataType //all, executed, actionPlanUpdated, actionPlanApproved, actionPlanReviewCompleted           
            }
            this.props.getFinalAuditActionPlanDetails(filters, undefined, 0, constants.ALL_ROWS_LIST);
            setTimeout(() => {
                this.updateColumnWhenPropsUpdate();
            }, 100);
        }
    }

    componentDidMount() {
        if (this.props && this.props.auditPlanDetailsId && this.props.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanId: this.props.auditPlanId,
                auditPlanDetailsId: this.props.auditPlanDetailsId,
            });
        }
        setTimeout(() => {
            let filters = {
                auditPlanDetailsId: this.state.auditPlanDetailsId,
                'auditDataType': this.state.auditDataType //all, executed, actionPlanUpdated, actionPlanApproved, actionPlanReviewCompleted           
            }
            this.props.getFinalAuditActionPlanDetails(filters, undefined, 0, constants.ALL_ROWS_LIST);
        }, 200);
        //console.log("finalAuditActionPlandetails 2 : ", this.props.finalAuditActionPlandetails);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    }

    updateColumns = (column) => {
        this.setState({
            columns: column
        })
    }



    onClickReset = () => {
        const state = {};
        this.state.selectedPlants = null;
        this.state.selectedCompany = null;
        let filters = {
            auditPlanDetailsId: this.state.auditPlanDetailsId,
            'auditDataType': this.state.auditDataType //all, executed, actionPlanUpdated, actionPlanApproved, actionPlanReviewCompleted           
        }
        this.props.getFinalAuditActionPlanDetails(filters, undefined, 0, constants.ALL_ROWS_LIST);

        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }

    onBackClick = (auditPlanDetailsId) => {
        //console.log("id : ", auditPlanId);

        this.props.router.push(
            {
                pathName: '/corporateCoordinator',
                tab: 'view-final-audit-action-plan',
                query: {
                    tab: 'view-final-audit-action-plan',
                    id: auditPlanDetailsId,
                    auditPlanDetailsId: auditPlanDetailsId,
                    pageName: 'View Final Audit Action Plan',
                }
            }, 'corporateCoordinator/view-final-audit-action-plan'
        );
    }

    render() {
        //console.log("finalAuditActionPlandetails : ", this.props.finalAuditActionPlandetails);
        const { finalAuditActionPlandetails, columns, auditPlanDetailsId } = this.state;

        //console.log("finalAuditActionPlandetails : ", finalAuditActionPlandetails);

        const dataRow = finalAuditActionPlandetails ? finalAuditActionPlandetails : [];
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
                {auditPlanDetailsId &&
                    <FormDiv>
                        <FinalAuditBasicDetails
                            auditPlanDetailsId={auditPlanDetailsId}
                        />
                    </FormDiv>
                }
                <Gap h='15px' />
                <FormDiv>
                    <ReactTable
                        Data={dataRow}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumns}
                        columns={columns}
                        width={'100%'}
                    />
                </FormDiv>
                <Gap h="150px" />
            </MainWrapper>
        );
    }

}

const mapStateToProps = state => {
    const { finalAuditActionPlandetails, type } = state.workingReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { errorType, errorMessage, finalAuditActionPlandetails, type };
}

export default withRouter(connect(mapStateToProps, { getFinalAuditActionPlanDetails })(FinalAuditPlan));