import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getUserData, getUserDetailsP, saveUserData, getGroupMasterData, getCompanyMaster, getPlantMaster, getUserDataById, getUserByPlantId, getUserByPlantDepartmentId, deleteUserData, getRoleMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import { Button, SELECT, SelectDiv, SpanLabelForDDl } from '../../formStyle';
import * as CommonStyle from '../../commonStyle';
import UserAddEdit from './user.add.edit';
import UserList from './userlist';
import UnlockAcount from './unLockAccount';
import ReactTable from '../../ReactTableComponent';
import { getMasterDetailsBymasterCategoryCode } from '../../../actions/masterDetails.actions';



class Users extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user: null,
            isOverlayAddedd: false,
            isUserAddEditModelvisible: false,
            isUserUnlockModelVisible: false,
            userdata: {},
            showEditPopup: false,
            type: AdminTypes.USER_INIT,
            recordsCount: 0,
            userFilter: {
                companyMasterId: undefined,
                plantMasterId: undefined,
                departmentMasterId: undefined,
                roleMasterId: undefined
            },
            plants: null,
            roles: null,
            companys: [],
            departments: null,
            selectedRoleForSelectedUser: [],
            columns: [
                {
                    Header: 'Action',
                    accessor: 'id',
                    id: 'id',
                    show: true,
                    minWidth: 180,
                    Cell: propss => (
                        <React.Fragment>
                            <div className="warning width60px" style={{ marginRight: '10px' }} onClick={() => this.onClickEdit(propss.original)}>
                                Edit
                            </div>
                            <div className="danger width60px" onClick={() => this.onclickDeleteUser(propss.original.id)}>
                                Delete
                            </div> <br />
                            {(propss.original.isUserLocked === 1 || propss.original.isUserLocked === true) &&
                                <div className="primary width120px" onClick={() =>
                                    this.onClickunlockuser(propss.original)
                                }
                                >
                                    Unlock Account
                                </div>
                            }

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
                    Header: 'Employee',
                    accessor: d => `${d.firstName} ${d.lastName}`,
                    id: 'userName',
                    minWidth: 200,
                    show: true
                },
                {
                    Header: 'Emp Code',
                    accessor: 'code',
                    id: 'code',
                    minWidth: 150,
                    show: true,
                },
                {
                    Header: 'Plant',
                    accessor: 'plantName',
                    id: 'plantName',
                    minWidth: 150,
                    show: true,
                },
                {
                    Header: 'Department',
                    accessor: 'departmentName',
                    id: 'department',
                    minWidth: 150,
                    show: true,
                },
                {
                    Header: 'Email',
                    accessor: 'email',
                    id: 'email',
                    minWidth: 150,
                    show: true,
                },
                {
                    Header: 'Mobile',
                    accessor: 'mobile',
                    id: 'mobile',
                    minWidth: 150,
                    show: true,
                }, {
                    Header: 'User Locked',
                    accessor: d => `${(d.isUserLocked === 1 || d.isUserLocked === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
                    id: 'isUserLocked',
                    minWidth: 100,
                    show: true
                },
                {
                    Header: 'User Name',
                    accessor: 'userName',
                    id: 'loginUserName',
                    minWidth: 150,
                    show: false,
                },
                {
                    Header: 'Assigned Roles',
                    accessor: 'MultiRoleNames',
                    id: 'MultiRoleNames',
                    minWidth: 200,
                    show: false,
                }
            ]
        };
        // let's load the data from the props
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
        if (nextProps.plants !== null && nextProps.plants !== undefined && nextProps.plants !== this.state.plants) {
            this.setState({
                plants: nextProps.plants
            });

        }
        if (nextProps.roles && nextProps.roles !== null && nextProps.roles !== undefined && nextProps.roles !== this.state.roles) {
            this.setState({
                roles: nextProps.roles
            })
        }
        if (nextProps.companys !== null && nextProps.companys !== undefined && nextProps.companys !== this.state.companys) {
            this.setState({
                companys: nextProps.companys
            })
        }
        if (nextProps.masterDetailsCategory !== null && nextProps.masterDetailsCategory !== undefined && nextProps.masterDetailsCategory !== this.state.departments) {
            this.setState({
                departments: nextProps.masterDetailsCategory
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
        let userFilter = {
            companyMasterId: undefined,
            plantMasterId: undefined,
            departmentMasterId: undefined
        }
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getRoleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.ALL_ROWS_LIST, undefined, undefined, "department");
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, userFilter)
        // this.props.getUserData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        // const user = this.loggedUser();
        this.setState({ userFilter: userFilter })
    };
    onclickDeleteUser = (id) => {
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

        this.setState({ userFilter: existingUser });
    };
    onClickEdit = (user) => {
        const multiUserRoleIds = user && user.MultiRoleIds;
        const convertedList = this.ConvertStringToArrayRoleReturn(multiUserRoleIds);

        this.setState({ user: user, selectedRoleForSelectedUser: convertedList, isOverlayAddedd: true, isUserAddEditModelvisible: true });
    }
    onClickunlockuser = (user) => {
        this.setState({ user: user, isOverlayAddedd: true, isUserAddEditModelvisible: false, isUserUnlockModelVisible: true });
    }
    onClickCancel = () => {
        this.setState({ user: undefined, selectedRoleForSelectedUser: [], isOverlayAddedd: false, isUserAddEditModelvisible: false, isUserUnlockModelVisible: false });
        this.onClickRefresh();
    }
    onClickRefresh = () => {
        // this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.userFilter)
        //this.props.getUserData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        let userFilter = {
            companyMasterId: '',
            plantMasterId: '',
            departmentMasterId: '',
            roleMasterId: ''
        }
        this.props.getUserDetailsP(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined)
        this.setState({ userFilter: userFilter })
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
        const { columns, users, selectedRoleForSelectedUser, userFilter, user, isOverlayAddedd, isUserAddEditModelvisible, isUserUnlockModelVisible } = this.state;
        //console.log("userRecordsCount", this.props.userRecordsCount);
        let userRoleCategory = this.getLoggedUserRole();
        let LoggedUserCategory = userRoleCategory && userRoleCategory != null && userRoleCategory != '' && JSON.parse(userRoleCategory);
        let loggedUser = this.loggedUser();
        let RoleCategory = LoggedUserCategory ? LoggedUserCategory.roleCategory : undefined;
        let loggedplantMasterId = loggedUser ? loggedUser.plantMasterId : undefined;
        let CompanyMasterID = loggedUser && loggedUser.plantMaster ? loggedUser.plantMaster.companyMasterID : undefined
        let PlantDDL = this.state.plants && this.state.plants;
        let CompanyDDl = this.state.companys && this.state.companys;
        let selectedCompanyId = this.state.userFilter && this.state.userFilter.companyMasterId && this.state.userFilter.companyMasterId !== "-1" && this.state.userFilter.companyMasterId;
        let PlantMasterDropDown = undefined;
        const RoleMaster = this.state.roles && this.state.roles;
        let roleDDLVal = null;
        if (RoleCategory === "Company Admin") {
            PlantMasterDropDown = PlantDDL && PlantDDL.filter(item => item.companyMasterID === CompanyMasterID);
            if (RoleMaster) {
                roleDDLVal = RoleMaster && RoleMaster.length > 0 && RoleMaster.filter(item => item.roleCategory === 'User')
            }
        }
        else if (selectedCompanyId) {
            PlantMasterDropDown = PlantDDL && PlantDDL.filter(item => item.companyMasterID === selectedCompanyId);
            roleDDLVal = RoleMaster && RoleMaster;
        }
        else {
            roleDDLVal = RoleMaster && RoleMaster;
            PlantMasterDropDown = PlantDDL && PlantDDL;
        }
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
                                    selectedRoleForSelectedUser={selectedRoleForSelectedUser}
                                    baseObject={user}
                                    onCancel={this.onClickCancel}
                                />
                            }
                            {isUserUnlockModelVisible && isUserUnlockModelVisible === true &&
                                <UnlockAcount
                                    id={user && user.id}
                                    baseObject={user}
                                    onClose={this.onClickCancel}
                                />
                            }
                        </CommonStyle.Wrapper_OnOverlay>
                    </>
                }

                <CommonStyle.MainDiv
                    flexdirection={"row"}
                    justifycontent={"flex-start"}

                >
                    <Button
                        width={"150px"}
                        height={"40px"}
                        margin={"0px 10px 0px 0px"}
                        bgColor={"teal"}
                        borderRadius={"5px"}
                        onClick={() => this.onClickEdit(undefined)}
                    >
                        Add New User
                    </Button>
                    <Button
                        width={"50px"}
                        height={"40px"}
                        margin={"0px 10px 0px 0px"}
                        bgColor={"teal"}
                        borderRadius={"5px"}
                        onClick={() => this.onClickRefresh()}
                    >
                        <i class="fas fa-refresh"></i>
                    </Button>
                    <CommonStyle.InputControlsDiv>
                        <SpanLabelForDDl>Company</SpanLabelForDDl>
                        <SELECT margin="8px"
                            value={this.state.userFilter.companyMasterId} paddingLeft="10px" borderRadius="14px" height="44px"
                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                            onChange={this.onValueChanged('companyMasterId')}

                        >
                            <option key={-1} value={"-1"}> Select company</option>
                            {CompanyDDl &&
                                CompanyDDl.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.companyCode + " - " + item.companyName}</option>
                                })
                            }
                        </SELECT>
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv>
                        <SpanLabelForDDl>Plant</SpanLabelForDDl>
                        <SELECT margin="8px" ref={this.plantMasterIdRefs}
                            value={this.state.userFilter.plantMasterId} paddingLeft="10px" borderRadius="14px" height="44px"
                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                            onChange={this.onValueChanged('plantMasterId')}
                        >
                            <option key={-1} value={"-1"}> Select plant</option>
                            {PlantMasterDropDown &&
                                PlantMasterDropDown.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.plantCode + " - " + item.plantName}</option>
                                })
                            }
                        </SELECT>
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv>
                        <SpanLabelForDDl>Department</SpanLabelForDDl>
                        <SELECT margin="8px"
                            value={this.state.userFilter.departmentMasterId} paddingLeft="10px" borderRadius="14px" height="44px"
                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                            onChange={this.onValueChanged('departmentMasterId')}
                        >
                            <option key={"selectlist"} value={"-1"}>{"Select List"}</option>
                            {this.state.departments &&
                                this.state.departments.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.value}</option>
                                })
                            }
                        </SELECT>
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv>
                        <SpanLabelForDDl>Role</SpanLabelForDDl>
                        <SELECT margin="0px"
                            value={this.state.userFilter.roleMasterId} paddingLeft="10px" borderRadius="14px" height="44px"
                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                            onChange={this.onValueChanged('roleMasterId')}
                        >
                            <option key={"selectlist"} value={"-1"}>{"Select List"}</option>
                            {roleDDLVal &&
                                roleDDLVal.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.roleName}</option>
                                })
                            }
                        </SELECT>
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.MainDiv>
                <div
                    style={{ width: '98%' }}
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

export default connect(mapStateToProps, { getUserData, getMasterDetailsBymasterCategoryCode, getUserDetailsP, getGroupMasterData, getCompanyMaster, getPlantMaster, saveUserData, getUserDataById, getUserByPlantId, getUserByPlantDepartmentId, deleteUserData, getRoleMasterData })(Users);