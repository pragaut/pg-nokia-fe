import React, { Component } from 'react';
import { connect } from 'react-redux';

import { constants } from '../../../../utils/constants';
import { getOrgRelationTypeMasterData, getGroupMasterData, getOrganisationDetailsData, saveOrganisationDetails, deleteOrganisationDetailsData, getOrganisationDetailsDataById, getCountryMasterData, getStateMasterData, getCityMasterData } from '../../../../actions/comman/admin.action';
import Wrapper from '../../../shared/Wrapper'
import Gap from '../../../comman/Gap';
import OrganisationDetails from './organisationDetails.add.edit'
import { hideError, showError } from '../../../../actions/comman/error.actions';
import * as AdminTypes from '../../../../action-types/comman/admin.action.types';
import * as errorTypes from '../../../../action-types/comman/error.action.types';
import * as commonTypes from '../../../../action-types/comman/common.action.types';
import { uniqueId } from '../../../../utils';
import * as CommonStyle from '../../commonStyle';
import DatatableView from '../../ReactTableComponent';

class Index extends Wrapper {
    configs = [];

    constructor(props) {

        super(props);
        this.state = {
            organisations: [],
            organisation: {},
            citys: [],
            states: [],
            countrys: [],
            groups :[],
            orgRelationTypes : [],
            showEditPopup: false,
            type: AdminTypes.ORGANISATIONDETAILS_INIT,
            columns: []
        };

        // let's load the data from the props
    }

    updateStateAfterStateUpdate = () => {
        let columns = [
            {
                Header: 'Action',
                accessor: 'id',
                id: 'id',
                show: true,
                minWidth: 130,
                Cell: propss => (
                    <React.Fragment>
                        <button className="warning" style={{ marginRight: '5px' }} value={propss.original.id} onClick={() => this.onClickAdd(propss.original)}>
                            Edit
                        </button> 

                        <button className="primary" style={{ marginRight: '5px' }} value={propss.original.id} onClick={() =>
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
                Header: 'Group Name',
                accessor: d => `${d.groupName}`,
                id: 'groupName',
                show: true,
                minWidth: 150,
            },
            {
                Header: 'Organisation Type',
                accessor: d => `${d.orgRelationType}`,
                id: 'orgRelationType',
                show: true
            },
            {
                Header: 'Organisation Name',
                accessor: d => `${d.orgName}`,
                id: 'orgName',
                show: true,
                minWidth: 150,
            },
            {
                Header: 'Organisation Code',
                accessor: d => `${d.orgCode}`,
                id: 'orgCode',
                show: true              
            }, 
            {
                Header: 'Email',
                accessor: d => `${d.email && d.email !== null ? d.email : ''} `,// 'LeadEmail',
                id: 'companyCode',
                show: true,
                minWidth: 150,
            },{
                Header: 'Phone',
                accessor: d => `${d.phone && d.phone !== null ? d.phone : ''} `,// 'LeadEmail',
                id: 'phone',
                show: true,
                minWidth: 150,
            },  {
                Header: 'Organisation GST',
                accessor: 'orgGST',
                id: 'orgGST',
                show: true,
                minWidth: 150,
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.groups && nextProps.groups !== this.state.groups) {
            this.setState({ groups: nextProps.groups })
        }
        if (nextProps && nextProps.orgRelationTypes && nextProps.orgRelationTypes !== this.state.orgRelationTypes) {
            this.setState({ orgRelationTypes: nextProps.orgRelationTypes })
        }
        if (nextProps && nextProps.organisations && nextProps.organisations !== null && nextProps.organisations !== undefined && nextProps.organisations !== 'undefined' && nextProps.organisations !== this.state.organisations) {
            this.setState({
                organisations: nextProps.organisations
            })
        }
        if (nextProps && nextProps.citys && nextProps.citys !== null && nextProps.citys !== undefined && nextProps.citys !== 'undefined' && nextProps.citys !== this.state.citys) {
            this.setState({
                citys: nextProps.citys
            })
        }
        if (nextProps && nextProps.states && nextProps.states !== null && nextProps.states !== undefined && nextProps.states !== 'undefined' && nextProps.states !== this.state.states) {
            this.setState({
                states: nextProps.states
            })
        }
        if (nextProps && nextProps.countrys && nextProps.countrys !== null && nextProps.countrys !== undefined && nextProps.countrys !== 'undefined' && nextProps.countrys !== this.state.countrys) {
            this.setState({
                countrys: nextProps.countrys
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
        this.props.getCityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getCountryMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getStateMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getGroupMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrgRelationTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined)
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteOrganisationDetailsData(ids);
            setTimeout(() => {
                this.props.getOrganisationDetailsData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }

    onClickAdd = (organisation) => {
        this.setState({ organisation: organisation, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getOrganisationDetailsData(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        console.log("organisation", this.state.organisations);
        const { showEditPopup, columns, organisation, organisations } = this.state;
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
                            top={"42%"}
                            height={"fit-content"}
                            visible={showEditPopup}
                        >
                              <CommonStyle.CloseButtonForModel
                            onClick={() => this.onClickCancel()}
                        >X</CommonStyle.CloseButtonForModel>
                            <OrganisationDetails
                                baseObject={organisation}
                                onCancel={this.onClickCancel}
                                onSave={this.props.saveOrganisationDetails}
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
                            Data={organisations}
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
    const { group, groups, orgRelationTypes ,citys, states, countrys, organisationActiontype, organisationRecordsCount, organisations, organisation } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return { group, groups, orgRelationTypes ,citys, states, countrys, organisationActiontype, organisationRecordsCount, organisations, organisation, errorType, errorMessage };
};

export default connect(mapStateToProps, { getOrgRelationTypeMasterData, getGroupMasterData, getOrganisationDetailsData, saveOrganisationDetails, deleteOrganisationDetailsData, getOrganisationDetailsDataById, getCountryMasterData, getStateMasterData, getCityMasterData, hideError })(Index);