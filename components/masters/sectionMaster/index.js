import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getSectionMasterData, getAuditTypeMasterData, saveSectionMasterData, getSectionMasterDataById, deleteSectionMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import SectionAddEdit from './section.add.edit';
import * as CommonStyle from '../../commonStyle';
import SectionMasterDetails from '../../ReactTableComponent';


class SectionsIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            auditTypes: props.auditTypes ? props.auditTypes : [],
            section: {},
            showEditPopup: false,
            type: AdminTypes.SECTIONMASTER_INIT,
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
                accessor: 'sectionName',
                id: 'sectionName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Section Code',
                accessor: 'sectionCode',
                id: 'sectionCode',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Audit Type',
                accessor: 'auditType.auditType',
                id: 'auditType',
                minWidth: 100,
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
                        {this.state.auditTypes && this.state.auditTypes.length > 0 &&
                            this.state.auditTypes.map((item, index) => {
                                return <option value={item.auditType}>{item.auditType}</option>
                            })
                        }
                    </select>
            },
            {
                Header: 'Mandatory',
                accessor: d => `${d.isMandatorySection === true || d.isMandatorySection === 1 ? 'Yes' : 'No'}`,
                id: 'isMandatorySection',
                // style: { 'white-space': "pre-wrap" },
                minWidth: 100,
                show: true
            },
            {
                Header: 'Bar Color',
                minWidth: 50,
                id: 'barColor',
                show: true,
                Cell: row => (
                    <React.Fragment>
                        <div style={{ background: row.original.barColor, padding: "3px 5px" }}>
                            {row.original.barColor}
                        </div>
                    </React.Fragment>
                ),
                sortable: false,
                filterable: false
            },
            {
                Header: 'Section Order',
                accessor: 'sectionOrder',
                id: 'sectionOrder',
                minWidth: 100,
                show: true,
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auditTypes && nextProps.auditTypes !== null && nextProps.auditTypes != this.state.auditTypes) {
            this.setState({ auditTypes: nextProps.auditTypes });
            setTimeout(() => {
                this.updateColumnWhenPropsUpdate();
            }, 100);
        }
        if (nextProps.sections && nextProps.sections !== null && nextProps.sections != this.state.sections) {
            this.setState({ sections: nextProps.sections })
        }
        if (nextProps.sectionActiontype && nextProps.sectionActiontype === AdminTypes.SECTIONMASTER_SAVE_SUCCESS && this.state.showEditPopup === true) {
            setTimeout(() => {
                this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.setState({ showEditPopup: false })
            }, 500);
        }
        if (nextProps.sectionActiontype && nextProps.sectionActiontype === AdminTypes.SECTIONMASTER_SAVE_SUCCESS && this.state.showEditPopup !== true) {
            setTimeout(() => {
                this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        this.props.getAuditTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        this.props.deleteSectionMasterData(ids);
        setTimeout(() => {
            this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        }, 500);
    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (section) => {
        this.setState({ section: section, showEditPopup: true })
    }
    onClickActiveInActive = (id, valueactiveInActive) => {
        if (valueactiveInActive === "Active") {
            if (confirm('are you sure active this section')) {
                let data = {
                    id: id,
                    isInOperativeRecord: false
                }
                this.props.saveSectionMasterData(data, undefined);
            }
        }
        else if (valueactiveInActive === "InActive") {
            if (confirm('are you sure in-active this section')) {
                let data = {
                    id: id,
                    isInOperativeRecord: true
                }
                this.props.saveSectionMasterData(data, undefined);
            }
        }
    }
    onClickReferesh = (async) => {
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, sections, section } = this.state;
        return (<div id='sectionTable' className={style.table_wapper} >
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
                        <SectionAddEdit
                            baseObject={section}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveSectionMasterData}
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
                    <SectionMasterDetails
                        Data={sections}
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
    const { section, auditTypes, sections, sectionRecordsCount, sectionActiontype } = state.adminReducer;

    return { section, sections, auditTypes, sectionRecordsCount, sectionActiontype };
};

export default connect(mapStateToProps, { getAuditTypeMasterData, getSectionMasterData, saveSectionMasterData, getSectionMasterDataById, deleteSectionMasterData })(SectionsIndex);