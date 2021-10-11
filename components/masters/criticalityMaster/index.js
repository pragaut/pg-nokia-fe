import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getCriticalityMasterData, saveCriticalityMasterData, getCriticalityMasterDataById, deleteCriticalityMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import CriticalityAddEdit from './criticality.add.edit';
import * as CommonStyle from '../../commonStyle';
import DatatableView from '../../ReactTableComponent';


class CriticalityIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            criticalitys: [],
            criticality: {},
            showEditPopup: false,
            type: AdminTypes.CRITICALITYMASTER_INIT,
            columns: [
                {
                    Header: 'Action',
                    // accessor: 'id',
                    id: 'id',
                    show: true,
                    minWidth: 130,
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
                    minWidth:50,
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
                    Header: 'Criticality Name',
                    accessor: 'criticalityName',
                    id: 'criticalityName',
                    minWidth: 150,
                    show: true,
                },
                {
                    Header: 'Criticality Code',
                    accessor: 'criticalityCode',
                    id: 'criticalityCode',
                    minWidth: 150,
                    show: true,
                }, {
                    Header: 'is Critical',
                    accessor: d => `${d.isCritical === true || d.isCritical === 1 ? 'Yes' : 'No'} `,// 'LeadEmail',
                    id: 'isCritical',
                    show: true, 
                }
            ]
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.criticalitys && nextProps.criticalitys !== null && nextProps.criticalitys != this.state.criticalitys) {
            this.setState({ criticalitys: nextProps.criticalitys })
        }
        if (nextProps.criticalityActiontype && nextProps.criticalityActiontype === AdminTypes.CRITICALITYMASTER_SAVE_SUCCESS && this.state.showEditPopup === true) {
            setTimeout(() => {
                this.props.getCriticalityMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.setState({ showEditPopup: false })
            }, 500);
        }
        if (nextProps.criticalityActiontype && nextProps.criticalityActiontype === AdminTypes.CRITICALITYMASTER_SAVE_SUCCESS && this.state.showEditPopup !== true) {
            setTimeout(() => {
                this.props.getCriticalityMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        // let's load the roles, for first time
        this.props.getCriticalityMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    };

    onDeleteRecord = (ids) => {
        this.props.deleteCriticalityMasterData(ids);
        setTimeout(() => {
            this.props.getCriticalityMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        }, 500);
    }
    onClickAdd = (criticality) => {
        this.setState({ criticality: criticality, showEditPopup: true })
    }
    onClickActiveInActive = (id, valueactiveInActive) => {
        if (valueactiveInActive === "Active") {
            if (confirm('are you sure active this criticality')) {
                let data = {
                    id: id,
                    isInOperativeRecord: false
                }
                this.props.saveCriticalityMasterData(data, undefined);
            }
        }
        else if (valueactiveInActive === "InActive") {
            if (confirm('are you sure in-active this criticality')) {
                let data = {
                    id: id,
                    isInOperativeRecord: true
                }
                this.props.saveCriticalityMasterData(data, undefined);
            }
        }
    }
    onClickReferesh = (async) => {
        this.props.getCriticalityMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onClickCancel = () => {
        this.setState({ showEditPopup: false })
    }
    render() {
        const { showEditPopup, columns, criticality, criticalitys } = this.state;

        return (<CommonStyle.MainDiv
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
                        <CriticalityAddEdit
                            baseObject={criticality}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveCriticalityMasterData}
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
                        Data={criticalitys}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumn}
                        columns={columns}
                    />
                </div>
            </CommonStyle.MainDiv>
            {/* <div id='auditObservationTable' className={style.table_wapper} >
             
                <ListTable
                    recordsCount={this.props.auditObservationRecordsCount}
                    EditForm={AuditObservationAddEdit}
                    onRefresh={this.props.getAuditObservationMasterData}
                    onSave={this.props.saveAuditObservationMasterData}
                    getById={this.props.getAuditObservationMasterDataById}
                    onDelete={this.onDeleteRecord} //{this.props.deleteAuditObservationMasterData}
                    actionType={this.props.auditObservationActiontype}
                    dataRows={this.props.auditObservations}
                    pickEditFromMemory={true}
                    maxHeight='400px'
                    hideAdd={false}
                    hideRefresh={false}
                    hideChooseColumns={false}
                    hideSortingColumns={true}
                    hideCopy={true}
                    hideTrash={true}
                    hideAddFilters={true}
                    hideClearFilters={true}
                    hideGridMoveUp={true}
                    hideGridCheckBox={true}
                    columnHeadings={[{
                        name: 'observationName',
                        type: 'string',
                        displayName: 'Audit Observation Name'
                    },
                    {
                        name: 'observationCode',
                        type: 'string',
                        displayName: 'Audit Observation Code'
                    },
                    {
                        name: 'isHighestScoreApplicable',
                        type: 'bool',
                        displayName: 'Is Highest Score Applicable'
                    },
                    {
                        name: 'isScoreNotApplicable',
                        type: 'bool',
                        displayName: 'Is Score Not Applicable'
                    },
                    {
                        name: 'isActionPlanRequired',
                        type: 'bool',
                        displayName: 'Is Action Plan Required'
                    },
                    ]}
                />
                <Gap h="5rem" />
            </div> */}
        </CommonStyle.MainDiv>
        );
    }
}


const mapStateToProps = state => {
    //const roleActiontype = state.adminReducer.roleActiontype;
    const { criticality, criticalitys, criticalityRecordsCount, criticalityActiontype } = state.adminReducer;

    return { criticality, criticalitys, criticalityRecordsCount, criticalityActiontype };
};

export default connect(mapStateToProps, { getCriticalityMasterData, saveCriticalityMasterData, getCriticalityMasterDataById, deleteCriticalityMasterData })(CriticalityIndex);