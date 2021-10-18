import React, { Component } from 'react';
import { connect } from 'react-redux';

import { constants } from '../../../utils/constants';
import { getOrgRelationTypeMasterData, getOrganisationDetailsData,getGenderMasterData, getOrganisationEmployeeDetailsData, saveOrganisationEmployeeDetails, deleteOrganisationEmployeeDetailsData, getOrganisationEmployeeDetailsDataById } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import OrganisationEmployeeDetails from './organisationEmployee.add.edit'
import { hideError, showError } from '../../../actions/error.actions';
import * as AdminTypes from '../../../action-types/admin.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';
import * as CommonStyle from '../../commonStyle';
import DatatableView from '../../ReactTableComponent';

class Index extends Wrapper {
    configs = [];

    constructor(props) {

        super(props);
        this.state = {
            orgEmployees: [],
            orgEmployee: {},
            organisations: [],
            orgRelationTypes: [],
            genders: [],
            showEditPopup: false,
            type: AdminTypes.ORGANISATIONEMPLOYEEDETAILS_INIT,
            columns: []
        };

        // let's load the data from the props
    }

    updateStateAfterStateUpdate = () => {
        let columns = [
            {
                Header: 'Action',
                // accessor: 'id',
                id: 'id',
                show: true,
                minWidth: 80,
                Cell: propss => (
                    <React.Fragment>
                        <button className="warning" style={{ marginRight: '10px' }} value={propss.original.id} onClick={() => this.onClickAdd(propss.original)}>
                            Edit
                        </button><br />
                        <button className="primary" style={{ marginRight: '10px' }} value={propss.original.id} onClick={() =>
                            this.onDeleteRecord(propss.original.id)
                        }>
                            Delete
                        </button>
                    </React.Fragment>
                ),
                sortable: false,
                filterable: false
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
                Header: 'Org Name',
                accessor: d => `${d.orgName}`,
                id: 'orgName',
                show: true,
                minWidth: 150,
            },
            {
                Header: 'Employee Name',
                accessor: d => `${d.employeeName}`,
                id: 'employeeName',
                show: true              
            }, 
            {
                Header: 'Employee Code',
                accessor: d => `${d.employeeCode}`,
                id: 'employeeCode',
                show: true              
            }, 
            {
                Header: 'Gender',
                accessor: d => `${d.genderName} `,
                id: 'genderName',
                show: true,
                minWidth: 150,
            },{
                Header: 'Date Of Birth',
                accessor: d => `${d.dateOfBirth && d.dateOfBirth !== null ? d.dateOfBirth : ''} `,// 'LeadEmail',
                id: 'dateOfBirth',
                show: true,
                minWidth: 150,
            },  {
                Header: 'Father Name',
                accessor: d => `${d.fatherName}`,
                id: 'fatherName',
                show: true              
            },{
                Header: 'Mobile',
                accessor: d => `${d.mobile}`,
                id: 'mobile',
                show: true              
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.orgRelationTypes && nextProps.orgRelationTypes !== this.state.orgRelationTypes) {
            this.setState({ orgRelationTypes: nextProps.orgRelationTypes })
        }
        if (nextProps && nextProps.genders && nextProps.genders !== this.state.genders) {
            this.setState({ genders: nextProps.genders })
        }
        if (nextProps && nextProps.organisations && nextProps.organisations !== null && nextProps.organisations !== undefined && nextProps.organisations !== 'undefined' && nextProps.organisations !== this.state.organisations) {
            this.setState({
                organisations: nextProps.organisations
            })
        }
        if (nextProps && nextProps.orgEmployees && nextProps.orgEmployees !== null && nextProps.orgEmployees !== undefined && nextProps.orgEmployees !== 'undefined' && nextProps.orgEmployees !== this.state.orgEmployees) {
            this.setState({
                orgEmployees: nextProps.orgEmployees
            })
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };

    async componentDidMount() {
        // let's load the groups, for first time
        this.props.getOrgRelationTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getGenderMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationEmployeeDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteOrganisationEmployeeDetailsData(ids);
            setTimeout(() => {
                this.props.getOrganisationEmployeeDetailsData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }

    onClickAdd = (orgEmployee) => {
        this.setState({ orgEmployee: orgEmployee, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getOrganisationEmployeeDetailsData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onClickCancel = () => {
        this.setState({ showEditPopup: false })
    }

    render() {
        console.log("organisation employees", this.state.orgEmployees);
        const { showEditPopup, columns, orgEmployee, orgEmployees } = this.state;
        return (
            <CommonStyle.MainDiv
                flexdirection={"column"}
                width={"100%"}
                textalign={"left"}
                justifycontent={"flex-start"}
                alignitems={"baseline"}
            >
                {showEditPopup === true &&
                    <>
                        <CommonStyle.Overlay
                        // onClick={() => this.onClickCancel()}
                        />
                      
                        <CommonStyle.Wrapper_OnOverlay
                            width={"80%"}
                            height={"fit-content"}
                            visible={showEditPopup}
                        >
                              <CommonStyle.CloseButtonForModel
                            onClick={() => this.onClickCancel()}
                        >X</CommonStyle.CloseButtonForModel>
                            <OrganisationEmployeeDetails
                                baseObject={orgEmployee}
                                onCancel={this.onClickCancel}
                                onSave={this.props.saveOrganisationEmployeeDetails}
                            />
                        </CommonStyle.Wrapper_OnOverlay>
                    </>
                }
                <CommonStyle.MainDiv
                    flexdirection={"column"}
                    width={"100%"}
                    justifycontent={"flex-start"}
                    alignitems={"baseline"}
                >
                    <CommonStyle.MainDiv
                        width={"100%"}
                        flexdirection={"row"}
                        justifycontent={"flex-start"}
                    >
                        <CommonStyle.Button_Header
                            onClick={() => this.onClickAdd()}
                        >
                            <i className="fas fa-plus"></i>
                        </CommonStyle.Button_Header>
                        <CommonStyle.Button_Header
                            onClick={() => this.onClickReferesh()}
                        >
                            <i className="fas fa-sync-alt"></i>
                        </CommonStyle.Button_Header>
                    </CommonStyle.MainDiv>
                    <div
                        style={{ width: '98%' }}
                    >
                        <DatatableView
                            Data={orgEmployees}
                            isColumnUpdate={true}
                            updateColumn={this.updateColumn}
                            columns={columns}
                        />
                    </div>
                </CommonStyle.MainDiv>
                <Gap h="2rem" />
            </CommonStyle.MainDiv>
        );
    }
}



const mapStateToProps = state => {
    const { genders, orgRelationTypes ,organisations, orgEmployees,orgEmployee,orgEmployeeeActiontype, orgEmployeeRecordsCount} = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return { genders, orgRelationTypes ,organisations, orgEmployees,orgEmployee,orgEmployeeeActiontype, orgEmployeeRecordsCount,errorType, errorMessage };
};

export default connect(mapStateToProps, { 
    getOrgRelationTypeMasterData, getOrganisationDetailsData,getGenderMasterData, getOrganisationEmployeeDetailsData, saveOrganisationEmployeeDetails, deleteOrganisationEmployeeDetailsData, getOrganisationEmployeeDetailsDataById, hideError })(Index);