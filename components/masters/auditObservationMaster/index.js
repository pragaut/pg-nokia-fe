import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getAuditObservationMasterData, saveAuditObservationMasterData, getAuditObservationMasterDataById, deleteAuditObservationMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import AuditObservationAddEdit from './auditObservation.add.edit';
import * as CommonStyle from '../../commonStyle';
import DatatableView from '../../ReactTableComponent';


class AuditObservationsIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            auditObservations: [],
            auditObservation: {},
            showEditPopup: false,
            type: AdminTypes.AUDITOBSERVATIONMASTER_INIT,
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
                    Header: 'Audit Observation Name',
                    accessor: 'observationName',
                    id: 'observationName',
                    minWidth: 150,
                    show: true,
                },
                {
                    Header: 'Audit Observation Code',
                    accessor: 'observationCode',
                    id: 'observationCode',
                    minWidth: 150,
                    show: false,
                },
                {
                    Header: 'Highest Score Applicable',
                    accessor: d => `${d.isHighestScoreApplicable === true || d.isHighestScoreApplicable === 1 ? 'Yes' : 'No'}`,
                    id: 'isHighestScoreApplicable',
                    show: true,
                },
                {
                    Header: 'Score  Applicable',
                    accessor: d => `${d.isScoreApplicable === true || d.isScoreApplicable === 1 ? 'Yes' : 'No'}`,
                    id: 'isScoreApplicable',
                    show: true,
                },
                {
                    Header: 'Action Plan Required',
                    accessor: d => `${d.isActionPlanRequired === true || d.isActionPlanRequired === 1 ? 'Yes' : 'No'}`,
                    id: 'isActionPlanRequired',
                    show: true,
                },
                {
                    Header: 'Comments Required',
                    accessor: d => `${d.isCommentRequired === true || d.isCommentRequired === 1 ? 'Yes' : 'No'}`,
                    id: 'isCommentRequired',
                    show: true,
                },
            ]
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auditObservations && nextProps.auditObservations !== null && nextProps.auditObservations != this.state.auditObservations) {
            this.setState({ auditObservations: nextProps.auditObservations })
        }
        if (nextProps.auditObservationActiontype && nextProps.auditObservationActiontype === AdminTypes.AUDITOBSERVATIONMASTER_SAVE_SUCCESS && this.state.showEditPopup === true) {
            setTimeout(() => {
                this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.setState({ showEditPopup: false })
            }, 500);
        }
        if (nextProps.auditObservationActiontype && nextProps.auditObservationActiontype === AdminTypes.AUDITOBSERVATIONMASTER_SAVE_SUCCESS && this.state.showEditPopup !== true) {
            setTimeout(() => {
                this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    };

    onDeleteRecord = (ids) => {
        this.props.deleteAuditObservationMasterData(ids);
        setTimeout(() => {
            this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        }, 500);
    }
    onClickAdd = (auditObservation) => {
        this.setState({ auditObservation: auditObservation, showEditPopup: true })
    }
    onClickActiveInActive = (id, valueactiveInActive) => {
        if (valueactiveInActive === "Active") {
            if (confirm('are you sure active this audit observation ')) {
                let data = {
                    id: id,
                    isInOperativeRecord: false
                }
                this.props.saveAuditObservationMasterData(data, undefined);
            }
        }
        else if (valueactiveInActive === "InActive") {
            if (confirm('are you sure in-active this audit observation ')) {
                let data = {
                    id: id,
                    isInOperativeRecord: true
                }
                this.props.saveAuditObservationMasterData(data, undefined);
            }
        }
    }
    onClickReferesh = (async) => {
        this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onClickCancel = () => {
        this.setState({ showEditPopup: false })
    }
    render() {
        const { showEditPopup, columns, auditObservation, auditObservations } = this.state;

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
                        <AuditObservationAddEdit
                            baseObject={auditObservation}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveAuditObservationMasterData}
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
                        Data={auditObservations}
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
    const { auditObservation, auditObservations, auditObservationRecordsCount, auditObservationActiontype } = state.adminReducer;

    return { auditObservation, auditObservations, auditObservationRecordsCount, auditObservationActiontype };
};

export default connect(mapStateToProps, { getAuditObservationMasterData, saveAuditObservationMasterData, getAuditObservationMasterDataById, deleteAuditObservationMasterData })(AuditObservationsIndex);