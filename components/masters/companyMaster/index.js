import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs } from '../../../utils/editFormHelper';

import { constants } from '../../../utils/constants';
import style from '../../../theme/app.scss';
//import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getYearTypeMasterData, getGroupMasterData, getCompanyMasterById, getCompanyMaster, deleteCompanyMaster, saveCompanyMasterData, getCompanyMasterByGroupId, initCompanyMaster } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import GroupCompanyDetails from './company.add.edit'
import { hideError, showError } from '../../../actions/error.actions';
import ListTable from '../../shared/ListTable';
import { getMasterDetailsBymasterCategoryCode } from '../../../actions/masterDetails.actions';

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
            companys: [],
            company: {},
            yearTypes: [],
            showEditPopup: false,
            type: AdminTypes.COMPANYMASTER_INIT,
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
                Header: 'Name',
                accessor: d => `${d.companyName}`,
                id: 'companyName',
                show: true,
                minWidth: 250,
            },
            {
                Header: 'Audit Cycle',
                accessor: d => `${d.yearType && d.yearType.yearTypeName}`,
                id: 'yearTypeName',
                show: true,
                minWidth: 150,
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
                        {this.state.yearTypes && this.state.yearTypes.length > 0 &&
                            this.state.yearTypes.map((item, index) => {
                                return <option value={item.yearTypeName}>{item.yearTypeName}</option>
                            })
                        }
                    </select>
            }, {
                Header: 'Code',
                accessor: d => `${d.companyCode && d.companyCode !== null ? d.companyCode : ''} `,// 'LeadEmail',
                id: 'companyCode',
                show: true,
                minWidth: 150,
            }, {
                Header: 'Sort Name',
                accessor: 'companySortName',
                id: 'companySortName',
                show: true,
                minWidth: 150,
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.yearTypes && nextProps.yearTypes !== this.state.yearTypes) {
            this.setState({ yearTypes: nextProps.yearTypes })
            setTimeout(() => {
                this.updateStateAfterStateUpdate();
            }, 100);
        }
        if (nextProps.companys && nextProps.companys !== null && nextProps.companys != this.state.companys) {
            this.setState({ companys: nextProps.companys })
        }
        if (nextProps.companyActiontype && nextProps.companyActiontype === AdminTypes.COMPANYMASTER_SAVE_SUCCESS && this.state.showEditPopup === true) {
            setTimeout(() => {
                this.props.getCompanyMaster(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
                this.setState({ showEditPopup: false })
            }, 500);
        }
        if (nextProps.companyActiontype && nextProps.companyActiontype === AdminTypes.COMPANYMASTER_SAVE_SUCCESS && this.state.showEditPopup !== true) {
            setTimeout(() => {
                this.props.getCompanyMaster(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
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
        this.props.getYearTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.ALL_ROWS_LIST, undefined, undefined, 'city');
        this.props.getGroupMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    };

    onClickAdd = (company) => {
        this.setState({ company: company, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        console.log("yearTypes", this.state.yearTypes);
        const { showEditPopup, columns, company, companys } = this.state;
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
                            <GroupCompanyDetails
                                baseObject={company}
                                onCancel={this.onClickCancel}
                                onSave={this.props.saveCompanyMasterData}
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
                            Data={companys}
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
    const { yearType, yearTypes, company, companys, companyActiontype, companyRecordsCount, groups, group } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;

    return { yearType, yearTypes, company, masterDetailsCategory, companys, companyRecordsCount, groups, group, errorType, errorMessage, companyActiontype };
};

export default connect(mapStateToProps, { getYearTypeMasterData, getMasterDetailsBymasterCategoryCode, getGroupMasterData, getCompanyMasterById, getCompanyMaster, deleteCompanyMaster, saveCompanyMasterData, getCompanyMasterByGroupId, initCompanyMaster, hideError })(Index);