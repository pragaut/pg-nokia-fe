import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getTowerAllotmentMasterData, saveTowerAllotmentMasterData, getTowerAllotmentMasterDataById, deleteTowerAllotmentMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import TowerAllotmentAddEdit from './towerAllotment.add.edit';
import * as CommonStyle from '../../commonStyle';
import TowerAllotmentMasterDetails from '../../ReactTableComponent';


class TowerAllotmentIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            towerAllotment: {},
            towerAllotments: [],
            showEditPopup: false,
            type: AdminTypes.TOWERALLOTMENTMASTER_INIT,
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
                Header: 'Organisation Details',
                accessor: 'orgName.orgName',
                id: 'orgName.orgName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Tower Name',
                accessor: 'towerName.towerName',
                id: 'towerName.towerName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Relation Order',
                accessor: 'relationOrder',
                id: 'relationOrder',
                minWidth: 100,
                show: true,
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.towerAllotments && nextProps.towerAllotments !== null && nextProps.towerAllotments != this.state.towerAllotments) {
            this.setState({ towerAllotments: nextProps.towerAllotments })
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
        this.props.getTowerAllotmentMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteTowerAllotmentMasterData(ids);
            setTimeout(() => {
                this.props.getTowerAllotmentMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (towerAllotment) => {
        this.setState({ towerAllotment: towerAllotment, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getTowerAllotmentMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, towerAllotments, towerAllotment } = this.state;
        return (<div id='towerAllotmentTable' className={style.table_wapper} >
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
                        <TowerAllotmentAddEdit
                            baseObject={towerAllotment}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveTowerAllotmentMasterData}
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
                    <TowerAllotmentMasterDetails
                        Data={towerAllotments ? towerAllotments : []}
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
    const { towerAllotment, towerAllotments, towerAllotmentRecordsCount, towerAllotmentActiontype } = state.adminReducer;

    return { towerAllotment, towerAllotments, towerAllotmentRecordsCount, towerAllotmentActiontype };
};

export default connect(mapStateToProps, { getTowerAllotmentMasterData, saveTowerAllotmentMasterData, getTowerAllotmentMasterDataById, deleteTowerAllotmentMasterData })(TowerAllotmentIndex);