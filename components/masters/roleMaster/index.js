import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getRoleMasterData, saveRoleMasterData, getRoleMasterDataById, deleteRoleMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import RoleAddEdit from './role.add.edit';
import * as CommonStyle from '../../commonStyle';
import RoleMasterDetails from '../../ReactTableComponent';


class RoleIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            role: {},
            showEditPopup: false,
            type: AdminTypes.ROLEMASTER_INIT,
            columns: []
        };


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
                Header: 'Module Name',
                accessor: 'module.moduleName',
                id: 'module.moduleName',
                minWidth: 100,
                show: true
            },
            {
                Header: 'Role Name',
                accessor: 'roleName',
                id: 'roleName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Role Order',
                accessor: 'roleOrder',
                id: 'roleOrder',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'DashBoard URL',
                accessor: 'dashboardUrl',
                id: 'dashboardUrl',
                minWidth: 100,
                show: true
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.roles && nextProps.roles !== null && nextProps.roles != this.state.roles) {
            this.setState({ roles: nextProps.roles })
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
        this.props.getRoleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteRoleMasterData(ids);
            setTimeout(() => {
                this.props.getRoleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (role) => {
        this.setState({ role: role, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getRoleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, roles, role } = this.state;
        return (<div id='roleTable' className={style.table_wapper} >
            {showEditPopup === true &&
                <>
                    <CommonStyle.Overlay
                    // onClick={() => this.onClickCancel()}
                    />
                    <CommonStyle.Wrapper_OnOverlay
                        width={"50%"}
                        height={"fit-content"}
                        visible={showEditPopup}
                    >
                        <CommonStyle.CloseButtonForModel
                            onClick={() => this.onClickCancel()}
                        >X</CommonStyle.CloseButtonForModel>
                        <RoleAddEdit
                            baseObject={role}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveRoleMasterData}
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
                    <RoleMasterDetails
                        Data={roles}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumn}
                        columns={columns}
                    />
                </div>
            </CommonStyle.MainDiv>
        </div>);
    }
}


const mapStateToProps = state => {
    const { role, roles, roleRecordsCount, roleActiontype } = state.adminReducer;

    return { role, roles, roleRecordsCount, roleActiontype };
};

export default connect(mapStateToProps, { getRoleMasterData, saveRoleMasterData, getRoleMasterDataById, deleteRoleMasterData })(RoleIndex);