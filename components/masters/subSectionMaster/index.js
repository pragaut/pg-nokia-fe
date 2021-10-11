import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs } from '../../../utils/editFormHelper';

import { constants } from '../../../utils/constants';
import style from '../../../theme/app.scss';
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getSectionMasterData, getSubSectionMasterData, saveSubSectionMasterData, getSubSectionMasterDataById, deleteSubSectionMasterData } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import SubSectionDetails from './subSection.add.edit'
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
            subSections: [],
            sections: props.sections ? props.sections : [],
            subSection: {},
            showEditPopup: false,
            type: AdminTypes.COMPANYMASTER_INIT,
            columns: []
        };

        // let's load the data from the props
    }

    updateColumnWhenUpdateProps = () => {
        let columns = [
            {
                Header: 'Action',
                // accessor: 'id',
                id: 'id',
                show: true,
                minWidth: 150,
                Cell: propss => (
                    <React.Fragment>
                        <button className="warning" style={{ marginRight: '10px' }} value={propss.original.id} onClick={() => this.onClickAdd(propss.original)}>
                            Edit
                        </button>
                        {(propss.original.isInOperativeRecord && (propss.original.isInOperativeRecord === 1 || propss.original.isInOperativeRecord === true)) ?
                            <button className="primary" value={propss.original.id} onClick={() =>
                                this.onClickActiveInActive(propss.original.id, 'Active')
                            }>
                                Active
                           </button>
                            :
                            <button className="danger" value={propss.original.id} onClick={() => this.onClickActiveInActive(propss.original.id, 'InActive')}>
                                In-Active
                            </button>
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
                Header: 'Section',
                accessor: 'section.sectionName',
                id: 'sectionName',
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
                        {this.state.sections && this.state.sections.length > 0 &&
                            this.state.sections.map((item, index) => {
                                return <option value={item.sectionName}>{item.sectionName}</option>
                            })
                        }
                    </select>
            },
            {
                Header: 'Sub Section',
                accessor: 'subSectionName',
                id: 'subSectionName',
                minWidth: 200,
                show: true,
            },
            {
                Header: 'Code',
                accessor: 'subSectionCode',
                id: 'subSectionCode',
                show: true,
            },
            {
                Header: 'Sub Section Order',
                accessor: 'subSectionOrder',
                id: 'subSectionOrder',
                show: true,
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.sections && nextProps.sections !== null && nextProps.sections != this.state.sections) {
            this.setState({ sections: nextProps.sections });
            setTimeout(() => {
                this.updateColumnWhenUpdateProps();
            }, 100);
        }
        if (nextProps.subSections && nextProps.subSections !== null && nextProps.subSections != this.state.subSections) {
            this.setState({ subSections: nextProps.subSections })
        }
        if (nextProps.subSectionActiontype && nextProps.subSectionActiontype === AdminTypes.SUBSECTIONMASTER_SAVE_SUCCESS && this.state.showEditPopup === true) {
            setTimeout(() => {
                this.props.getSubSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.setState({ showEditPopup: false })
            }, 500);
        }
        if (nextProps.subSectionActiontype && nextProps.subSectionActiontype === AdminTypes.SUBSECTIONMASTER_SAVE_SUCCESS && this.state.showEditPopup !== true) {
            setTimeout(() => {
                this.props.getSubSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSubSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenUpdateProps();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        this.props.deleteSubSectionMasterData(ids);
        setTimeout(() => {
            this.props.getSubSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        }, 500);
    }
    onClickAdd = (subSection) => {
        this.setState({ subSection: subSection, showEditPopup: true })
    }
    onClickActiveInActive = (id, valueactiveInActive) => {
        if (valueactiveInActive === "Active") {
            if (confirm('are you sure active this sub-section')) {
                let data = {
                    id: id,
                    isInOperativeRecord: false
                }
                this.props.saveSubSectionMasterData(data, undefined);
            }
        }
        else if (valueactiveInActive === "InActive") {
            if (confirm('are you sure in-active this sub-section')) {
                let data = {
                    id: id,
                    isInOperativeRecord: true
                }
                this.props.saveSubSectionMasterData(data, undefined);
            }
        }
    }
    onClickReferesh = (async) => {
        this.props.getSubSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenUpdateProps();
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onClickCancel = () => {
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.setState({ showEditPopup: false })
    }
    render() {
        const { showEditPopup, columns, subSection, subSections } = this.state;

        return (<div id='subSectionTable' className={style.table_wapper} >
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
                        <SubSectionDetails
                            baseObject={subSection}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveSubSectionMasterData}
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
                        Data={subSections}
                        sectionFilterApplicable={true}
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
    const { sections, section, subSections, subSection, subSectionRecordsCount, subSectionActiontype } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return { sections, section, subSections, subSection, subSectionRecordsCount, subSectionActiontype, errorType, errorMessage };
};

export default connect(mapStateToProps, { getSectionMasterData, getSubSectionMasterData, saveSubSectionMasterData, getSubSectionMasterDataById, deleteSubSectionMasterData, hideError })(Index);