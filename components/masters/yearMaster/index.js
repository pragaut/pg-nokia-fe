import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getYearMasterData, getYearMasterDataById, saveYearMasterData, deleteYearMasterData, initYearMaster, getYearTypeMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import YearAddEdit from './yearMaster.add.edit';
import * as CommonStyle from '../../commonStyle';
import DatatableView from '../../ReactTableComponent';



class Groups extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            years: [],
            year: {},
            showEditPopup: false,
            type: AdminTypes.GROUPMASTER_INIT,
            columns: [
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
                                <button className="danger" value={propss.original.id} onClick={() => this.onClickDelete(propss.original.id)}>
                                  Delete
                                </button> 
                        </React.Fragment>
                    )
                },
                {
                    Header: 'Year Type',
                    accessor: 'yearType.yearTypeName',
                    id: 'yearTypeName',
                    minWidth: 100,
                    show: true,
                },
                {
                    Header: 'Year Name',
                    accessor: 'yearName',
                    id: 'yearName',
                    minWidth: 100,
                    show: true,
                },
                {
                    Header: 'Year Code',
                    accessor: 'yearCode',
                    id: 'yearCode',
                    minWidth: 100,
                    show: true,
                },
                {
                    Header: 'Start Date',
                    accessor: 'startDate',
                    id: 'startDate',
                    minWidth: 100,
                    show: true,
                },
                {
                    Header: 'End date',
                    accessor: 'enddate',
                    id: 'enddate',
                    minWidth: 100,
                    show: true,
                },
                // {
                //     Header: 'Highest Score Applicable',
                //     accessor: d => `${d.isHighestScoreApplicable === true || d.isHighestScoreApplicable === 1 ? 'Yes' : 'No'}`,
                //     id: 'isHighestScoreApplicable',
                //     show: true,
                //     minWidth: 150,
                // }
            ]
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.years && nextProps.years !== null && nextProps.years != this.state.years) {
            this.setState({ years: nextProps.years })
        }
        if (nextProps.yearActiontype && nextProps.yearActiontype === AdminTypes.YEARMASTER_SAVE_SUCCESS && this.state.showEditPopup === true) {
            setTimeout(() => {
                this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.setState({ showEditPopup: false })
            }, 500);
        }
        if (nextProps.yearActiontype && nextProps.yearActiontype === AdminTypes.YEARMASTER_SAVE_SUCCESS && this.state.showEditPopup !== true) {
            setTimeout(() => {
                this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    };


    onClickAdd = (year) => {
        this.setState({ year: year, showEditPopup: true })
    }
    onClickDelete = (id) => {
        if (confirm('are you sure want to delete this year')) {
            this.props.deleteYearMasterData(id);
            setTimeout(() => {
                this.onClickReferesh();
            }, 200);
        }

    }
    onClickReferesh = (async) => {
        this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onClickCancel = () => {
        this.setState({ showEditPopup: false })
    }
    render() {
        const { showEditPopup, columns, year, years } = this.state;

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
                        <YearAddEdit
                            baseObject={year}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveYearMasterData}
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
                        Data={years}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumn}
                        columns={columns}
                    />
                </div>
            </CommonStyle.MainDiv>


            {/* <div id='groupTable' className={style.table_wapper} >
                 <ListTable
                    recordsCount={this.props.recordsCount}
                    EditForm={YearAddEdit}
                    onRefresh={this.props.getYearMasterData}
                    onSave={this.props.saveYearMasterData}
                    getById={this.props.getYearMasterDataById}
                    onDelete={this.props.deleteYearMasterData}
                    actionType={this.props.yearActiontype}
                    dataRows={this.props.years}
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
                        name: 'yearType.yearTypeName',
                        displayName: "year Type",
                        type: 'string'
                    }, {
                        name: 'yearName',
                        displayName: "year",
                        type: 'string'
                    },
                    {
                        name: 'yearCode',
                        displayName: "Code",
                        type: 'string'
                    },
                    {
                        name: 'startDate',
                        displayName: "Start Date",
                        type: 'string'
                    },
                    {
                        name: 'enddate',
                        displayName: "End Date",
                        type: 'string'
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
    //const groupActiontype = state.adminReducer.groupActiontype;
    const { yearType, yearTypes, years, year, yearRecordsCount, yearActiontype } = state.adminReducer;

    return { yearType, yearTypes, years, year, yearRecordsCount, yearActiontype };
};

export default connect(mapStateToProps, { getYearTypeMasterData, getYearMasterData, getYearMasterDataById, saveYearMasterData, deleteYearMasterData, initYearMaster })(Groups);