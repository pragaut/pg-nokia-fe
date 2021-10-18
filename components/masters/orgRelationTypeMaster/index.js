import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs } from '../../../utils/editFormHelper';

import { constants } from '../../../utils/constants';
import style from '../../../theme/app.scss';
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getGroupMasterData, getOrgRelationTypeMasterData, saveOrgRelationTypeMasterData, getOrgRelationTypeMasterDataById, deleteOrgRelationTypeMasterData } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import OrgRelationTypeDetails from './orgRelationTypeMaster.add.edit'
import { hideError, showError } from '../../../actions/error.actions';
import ListTable from '../../shared/ListTable';
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
            orgRelationTypes: [],
            groups: props.groups ? props.groups : [],
            orgRelationType: {},
            showEditPopup: false,
            columns: []
        };

        // let's load the data from the props
    }

    updateColumnWhenUpdateProps = () => {
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
                accessor: 'group.groupName',
                id: 'groupName',
                minWidth: 200,
                show: true,
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
                        {this.state.groups && this.state.groups.length > 0 &&
                            this.state.groups.map((item, index) => {
                                return <option value={item.groupName}>{item.groupName}</option>
                            })
                        }
                    </select>
            },
            {
                Header: 'Org Relation Type',
                accessor: 'orgRelationType',
                id: 'orgRelationType',
                minWidth: 200,
                show: true,
            }
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.groups && nextProps.groups !== null && nextProps.groups != this.state.groups) {
            this.setState({ groups: nextProps.groups });
            setTimeout(() => {
                this.updateColumnWhenUpdateProps();
            }, 100);
        }
        if (nextProps.orgRelationTypes && nextProps.orgRelationTypes !== null && nextProps.orgRelationTypes != this.state.orgRelationTypes) {
            this.setState({ orgRelationTypes: nextProps.orgRelationTypes })
        }
        if (nextProps.orgRelationTypeActiontype && nextProps.orgRelationTypeActiontype === AdminTypes.ORGRELATIONTYPEMASTER_SAVE_SUCCESS && this.state.showEditPopup === true) {
            setTimeout(() => {
                this.props.getOrgRelationTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.setState({ showEditPopup: false })
            }, 500);
        }
        if (nextProps.orgRelationTypeActiontype && nextProps.orgRelationTypeActiontype === AdminTypes.ORGRELATIONTYPEMASTER_SAVE_SUCCESS && this.state.showEditPopup !== true) {
            setTimeout(() => {
                this.props.getOrgRelationTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
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
        this.props.getGroupMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getOrgRelationTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenUpdateProps();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteOrgRelationTypeMasterData(ids);
            setTimeout(() => {
                this.props.getOrgRelationTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        };
    }
    onClickAdd = (orgRelationType) => {
        this.setState({ orgRelationType: orgRelationType, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getOrgRelationTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenUpdateProps();
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onClickCancel = () => {
        this.props.getGroupMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.setState({ showEditPopup: false })
    }
    render() {
        const { showEditPopup, columns, orgRelationType, orgRelationTypes } = this.state;
        console.log("orgRelationType" ,orgRelationTypes)

        return (<div id='orgRelationTypeTable' className={style.table_wapper} >
            {showEditPopup === true &&
                <>
                    <CommonStyle.Overlay
                    //  onClick={() => this.onClickCancel()}
                    />
                    <CommonStyle.Wrapper_OnOverlay
                        width={"50%"}
                        height={"fit-content"}
                        visible={showEditPopup}
                    >
                        <CommonStyle.CloseButtonForModel
                            onClick={() => this.onClickCancel()}
                        >X</CommonStyle.CloseButtonForModel>
                        <OrgRelationTypeDetails
                            baseObject={orgRelationType}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveOrgRelationTypeMasterData}
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
                        Data={orgRelationTypes}
                        groupFilterApplicable={true}
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
    const { groups, group, orgRelationTypes, orgRelationType, orgRelationTypeRecordsCount, orgRelationTypeActiontype } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return { groups, group, orgRelationTypes, orgRelationType, orgRelationTypeRecordsCount, orgRelationTypeActiontype, errorType, errorMessage };
};

export default connect(mapStateToProps, { getGroupMasterData, getOrgRelationTypeMasterData, saveOrgRelationTypeMasterData, getOrgRelationTypeMasterDataById, deleteOrgRelationTypeMasterData, hideError })(Index);