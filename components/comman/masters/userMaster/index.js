import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../../comman/Gap';
import style from '../../../../theme/app.scss';
import Wrapper from '../../../shared/Wrapper';
import { constants } from '../../../../utils/constants';
import * as AdminTypes from '../../../../action-types/comman/admin.action.types';
import { getUserData, getUserDetailsP, saveUserData, getOrgRelationTypeMasterData, getOrganisationDetailsData, getOrganisationEmployeeDetailsData, getUserDataById, deleteUserData, getRoleMasterData } from '../../../../actions/comman/admin.action';
import ListTable from '../../../shared/ListTable';
import { Button, SELECT, SelectDiv, SpanLabelForDDl } from '../../../comman/formStyle';
import * as CommonStyle from '../../../comman/commonStyle';
import UserAddEdit from './user.add.edit';
import UserList from './userlist';
import ReactTable from '../../../comman/ReactTableComponent';



class Users extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user: null,
            isOverlayAddedd: false,
            isUserAddEditModelvisible: false,
            userdata: {},
            showEditPopup: false,
            type: AdminTypes.USER_INIT,
            recordsCount: 0,
            roles: null,
            organisations: [],
            orgRelationTypes: [],
            orgEmployees: [],
            selectedRoleForSelectedUser: [],
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
                            <div className="warning width60px" style={{ marginRight: '5px' }} onClick={() => this.onClickEdit(propss.original)}>
                                Edit
                            </div>
                            <div className="primary width60px" style={{ marginRight: '3px' }} onClick={() => this.onclickDeleteUser(propss.original.id)}>
                                Delete
                            </div>     
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
                    Header: 'Organisation',
                    accessor: d => `${d.orgName}`,
                    id: 'org Name',
                    minWidth: 200,
                    show: true
                },
                {
                    Header: 'User Name',
                    accessor: d => `${d.userName}`,
                    id: 'userName',
                    minWidth: 200,
                    show: true
                },
                {
                    Header: 'Assigned Roles',
                    accessor: 'MultiRoleNames',
                    id: 'MultiRoleNames',
                    minWidth: 200,
                    show: true,
                }
        ]
        this.setState({ columns: columns });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.userRecordsCount && nextProps.userRecordsCount != this.state.recordsCount) {
            this.setState({
                recordsCount: nextProps.userRecordsCount
            })
        }
        if (nextProps.users && nextProps.users !== this.state.users) {
            this.setState({ users: nextProps.users })
        }
        if (nextProps && nextProps.orgRelationTypes && nextProps.orgRelationTypes !== this.state.orgRelationTypes) {
            this.setState({ orgRelationTypes: nextProps.orgRelationTypes })
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
        if (nextProps.roles && nextProps.roles !== null && nextProps.roles !== undefined && nextProps.roles !== this.state.roles) {
            this.setState({
                roles: nextProps.roles
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


    componentDidMount() {
        // let's load the roles, for first time  
        this.props.getRoleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getOrgRelationTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationEmployeeDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.userFilter)
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    };
    onclickDeleteUser = (id) => {
        alert(id);
        if (confirm('are you sure want to delete this user')) {
            this.props.deleteUserData(id);
            setTimeout(() => {
                this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.userFilter)
                // this.props.getUserData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 300);
        }

    }
    onValueChanged = key => event => {
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingUser = Object.assign({}, this.state.userFilter);
        existingUser[key] = SelectedValue;
        this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, existingUser)

        this.setState({ users: existingUser });
    };
    onClickEdit = (user) => {
        const multiUserRoleIds = user && user.MultiRoleIds;
        const convertedList = this.ConvertStringToArrayRoleReturn(multiUserRoleIds);
        this.setState({ user: user, selectedRoleForSelectedUser: convertedList, isOverlayAddedd: true, isUserAddEditModelvisible: true });
    }
    onClickCancel = () => {
        this.setState({ user: undefined, selectedRoleForSelectedUser: [], isOverlayAddedd: false, isUserAddEditModelvisible: false });
        this.onClickRefresh();
    }
    onClickRefresh = () => {
        this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.userFilter)
        console.log("On Click Refresh : ", "Refresh Page")
        // this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined)
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    }

    ConvertStringToArrayRoleReturn = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring;
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    render() {
        const { pageCallFromPage } = this.props;
        const { columns, users, selectedRoleForSelectedUser, userFilter, user, isOverlayAddedd, isUserAddEditModelvisible } = this.state;
        //console.log("userRecordsCount", this.props.userRecordsCount);
        let userRoleCategory = this.getLoggedUserRole();
        let LoggedUserCategory = userRoleCategory && userRoleCategory != null && userRoleCategory != '' && JSON.parse(userRoleCategory);
        let loggedUser = this.loggedUser();
        let RoleCategory = LoggedUserCategory ? LoggedUserCategory.roleCategory : undefined;
        let loggedplantMasterId = loggedUser ? loggedUser.plantMasterId : undefined;

        return (<div id='userTable' className={style.table_wapper} style={{ width: '100%' }} >
            <CommonStyle.MainDiv
                flexdirection={"column"}
            >
                {isOverlayAddedd && isOverlayAddedd === true &&
                    <>
                        <CommonStyle.Overlay
                        // onClick={() => this.onClickCancel()}
                        />
                        <CommonStyle.Wrapper_OnOverlay
                            width={isUserAddEditModelvisible ? "80vw" : "20vw"}
                            height={isUserAddEditModelvisible ? "70vh" : "40vh"}
                            alignitems={"baseline"}
                            visible={isOverlayAddedd}
                        >
                            <CommonStyle.CloseButtonForModel
                                onClick={() => this.onClickCancel()}
                            >X</CommonStyle.CloseButtonForModel>
                            {isUserAddEditModelvisible && isUserAddEditModelvisible === true &&
                                <UserAddEdit
                                    onSave={this.props.saveUserData}
                                    actionType={this.props.userActiontype}
                                    pageCallFromPage={pageCallFromPage}
                                    selectedRoleForSelectedUser={selectedRoleForSelectedUser}
                                    baseObject={user}
                                    onCancel={this.onClickCancel}
                                />
                            }
                        </CommonStyle.Wrapper_OnOverlay>
                    </>
                }

                <CommonStyle.MainDiv
                    width={"100%"}
                    flexdirection={"row"}
                    justifycontent={"flex-start"}
                >
                    <CommonStyle.Button_Header
                        onClick={() => this.onClickEdit()}
                    >
                        <i className="fas fa-plus"></i>
                    </CommonStyle.Button_Header>
                    <CommonStyle.Button_Header
                        onClick={() => this.onClickRefresh()}
                    >
                        <i className="fas fa-sync-alt"></i>
                    </CommonStyle.Button_Header>
                </CommonStyle.MainDiv>
                <div
                    style={{ width: '100%' }}
                >
                    <ReactTable
                        isScorllApplicable={true}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumn}
                        columns={columns}
                        Data={users}
                    />
                </div>

                {/* <UserList
                    onclickDeleteUser={this.onclickDeleteUser}
                    onClickEdit={this.onClickEdit}
                    onClickunlockuser={this.onClickunlockuser}
                    Data={users}
                /> */}
            </CommonStyle.MainDiv>
            <Gap h="5rem" />
        </div>);
    }
}


const mapStateToProps = state => {
    const { masterDetail, masterDetails } = state.masterDetailReducer;
    const { masterDetailCategory, masterDetailsCategory } = state.masterDetailByCategoryReducer;
    const { user, users, userActiontype, userRecordsCount, plants, companys, roles } = state.adminReducer;

    return { user, users, plants, companys, userActiontype, userRecordsCount, roles, masterDetail, masterDetails, masterDetailCategory, masterDetailsCategory };
};

export default connect(mapStateToProps, { getUserData, getUserDetailsP, getOrgRelationTypeMasterData, getOrganisationDetailsData, getOrganisationEmployeeDetailsData, saveUserData, getUserDataById, deleteUserData, getRoleMasterData })(Users);