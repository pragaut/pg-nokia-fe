import React, { Component } from 'react';
import { connect } from 'react-redux';

import { constants } from '../../../utils/constants';
import style from '../../../theme/app.scss';
import { getGroupMasterData, getPlantMaster, getCompanyMasterByGroupId, getCompanyMaster, deletePlantMaster, savePlantMasterData, getPlantMasterByGroupCompanyId, initPlantMaster, getPlantMasterById } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import CompanyPlantDetails from './plant.add.edit'
import { hideError, showError } from '../../../actions/error.actions';
import ListTable from '../../shared/ListTable';
import { getMasterDetailsBymasterCategoryCode } from '../../../actions/masterDetails.actions';


import * as AdminTypes from '../../../action-types/admin.action.types';
import * as CommonStyle from '../../commonStyle';
import DatatableView from '../../ReactTableComponent';


class Index extends Wrapper {
    configs = [];
    constructor(props) {
        super(props);
        this.state = {
            plants: [],
            companys: props.companys ? props.companys : [],
            plant: {},
            showEditPopup: false,
            type: AdminTypes.PLANTMASTER_INIT,
            columns: []
        };

        // let's load the data from the props
    }

    updateColumnWhenPropsUpdate = () => {
        let columns = [
            {
                Header: 'Action',
                // accessor: 'id',
                id: 'id',
                show: true,
                minWidth: 100,
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
                Header: 'Company Name',
                accessor: d => `${d.GroupCompany && d.GroupCompany.companyName}`,
                id: 'companyName',
                show: true,
                minWidth: 300,
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
                Header: 'Plant Name',
                accessor: d => `${d.plantName}`,
                id: 'plantName',
                show: true,
                minWidth: 300,
            },
            {
                Header: 'Plant Sort Name',
                accessor: d => `${d.plantSortName && d.plantSortName !== null && d.plantSortName !== 'null' ? d.plantSortName : ''}`,
                id: 'plantSortName',
                show: true,
                minWidth: 100,
            },
            {
                Header: 'Code',
                accessor: d => `${d.plantCode} `,// 'LeadEmail',
                id: 'plantCode',
                show: true,
                minWidth: 150,
            }, {
                Header: 'Central Function',
                accessor: d => `${d.isCentralFunction === true || d.isCentralFunction === 1 ? 'Yes' : 'No'} `,// 'LeadEmail',
                id: 'isCentralFunction',
                show: true,
                minWidth: 150,
            }

        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.companys && nextProps.companys !== null && nextProps.companys != this.state.companys) {
            this.setState({ companys: nextProps.companys });
            setTimeout(() => {
                this.updateColumnWhenPropsUpdate();
            }, 400);
        }
        if (nextProps.plants && nextProps.plants !== null && nextProps.plants != this.state.plants) {
            this.setState({ plants: nextProps.plants })
        }
        if (nextProps.plantActiontype && nextProps.plantActiontype === AdminTypes.PLANTMASTER_SAVE_SUCCESS && this.state.showEditPopup === true) {
            setTimeout(() => {
                this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.setState({ showEditPopup: false })
            }, 500);
        }
        if (nextProps.plantActiontype && nextProps.plantActiontype === AdminTypes.PLANTMASTER_SAVE_SUCCESS && this.state.showEditPopup !== true) {
            setTimeout(() => {
                this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
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


    componentDidMount() {
        // let's load the groups, for first time

        this.props.getMasterDetailsBymasterCategoryCode(0, constants.ALL_ROWS_LIST, undefined, undefined, 'city');
        this.props.getGroupMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);

        const GroupID = this.props.groups && this.props.groups.length > 0 && this.props.groups[0].id;

        this.props.getCompanyMasterByGroupId(GroupID)

        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };
    onClickAdd = (plant) => {
        this.setState({ plant: plant, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onClickCancel = () => {
        this.setState({ showEditPopup: false })
    }

    render() {
        const { showEditPopup, columns, plant, plants } = this.state;
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
                        //  onClick={() => this.onClickCancel()}
                        />
                        <CommonStyle.Wrapper_OnOverlay
                            width={"80%"}
                            height={"fit-content"}
                            visible={showEditPopup}
                        >
                            <CommonStyle.CloseButtonForModel
                                onClick={() => this.onClickCancel()}
                            >X</CommonStyle.CloseButtonForModel>
                            <CompanyPlantDetails
                                baseObject={plant}
                                onCancel={this.onClickCancel}
                                onSave={this.props.savePlantMasterData}
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
                            isScorllApplicable={true}
                            Data={plants}
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
    const { plant, plants, plantActiontype, plantRecordsCount, companys, groups } = state.adminReducer;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;
    return { plant, plants, plantActiontype, plantRecordsCount, groups, masterDetailsCategory, companys };
};

export default connect(mapStateToProps, { getGroupMasterData, getCompanyMasterByGroupId, getPlantMaster, getMasterDetailsBymasterCategoryCode, getCompanyMaster, deletePlantMaster, savePlantMasterData, getPlantMasterByGroupCompanyId, initPlantMaster, getPlantMasterById, hideError })(Index);