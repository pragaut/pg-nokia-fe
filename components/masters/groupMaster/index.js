import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getGroupMasterData, saveGroupMasterData, getGroupMasterDataById, deleteGroupMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import GroupAddEdit from './group.add.edit';
import * as CommonStyle from '../../commonStyle';
import GroupMasterDetails from '../../ReactTableComponent';


class GroupIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            group: {},
            showEditPopup: false,
            type: AdminTypes.GROUPMASTER_INIT,
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
                Header: 'Group',
                accessor: 'groupName',
                id: 'groupName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Group Code',
                accessor: 'groupCode',
                id: 'groupCode',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Logo Name',
                accessor: 'logoUrl',
                id: 'auditType',
                minWidth: 100,
                show: true
            },
            {
                Header: 'Logo Height',
                accessor: 'logoHeight',
                id: 'logoHeight',
                minWidth: 100,
                show: true
            },
            {
                Header: 'Logo Width',
                accessor: 'logoWidth',
                id: 'logoWidth',
                minWidth: 100,
                show: true
            },
            {
                Header: 'Theme Color',
                minWidth: 50,
                id: 'themeColor',
                show: true,
                Cell: row => (
                    <React.Fragment>
                        <div style={{ background: row.original.themeColor, padding: "3px 5px" }}>
                            {row.original.themeColor}
                        </div>
                    </React.Fragment>
                ),
                sortable: false,
                filterable: false
            }
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.groups && nextProps.groups !== null && nextProps.groups != this.state.groups) {
            this.setState({ groups: nextProps.groups })
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
        this.props.getGroupMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteGroupMasterData(ids);
            setTimeout(() => {
                this.props.getGroupMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (group) => {
        this.setState({ group: group, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getGroupMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, groups, group } = this.state;
        return (<div id='groupTable' className={style.table_wapper} >
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
                        <GroupAddEdit
                            baseObject={group}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveGroupMasterData}
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
                    <GroupMasterDetails
                        Data={groups}
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
    const { group, groups, groupRecordsCount, groupActiontype } = state.adminReducer;

    return { group, groups, groupRecordsCount, groupActiontype };
};

export default connect(mapStateToProps, { getGroupMasterData, saveGroupMasterData, getGroupMasterDataById, deleteGroupMasterData })(GroupIndex);