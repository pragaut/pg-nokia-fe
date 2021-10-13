import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getTowerMasterData, saveTowerMasterData, getTowerMasterDataById, deleteTowerMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import TowerAddEdit from './tower.add.edit';
import * as CommonStyle from '../../commonStyle';
import TowerMasterDetails from '../../ReactTableComponent';


class TowerIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            tower: [],
            towers: {},
            showEditPopup: false,
            type: AdminTypes.TOWERMASTER_INIT,
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
                Header: 'Org Details',
                accessor: 'orgDetailsId',
                id: 'orgDetailsId',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Tower Name',
                accessor: 'towerName',
                id: 'towerName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Site Name',
                accessor: 'siteName',
                id: 'siteName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'city Name',
                accessor: 'cityId',
                id: 'cityId',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Longitute',
                accessor: 'longitude',
                id: 'longitude',
                minWidth: 100,
                show: true
            },
            {
                Header: 'Latitude',
                accessor: 'latitude',
                id: 'latitude',
                minWidth: 100,
                show: true
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.towers && nextProps.towers !== null && nextProps.towers != this.state.towers) {
            this.setState({ towers: nextProps.towers })
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
        this.props.getTowerMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteTowerMasterData(ids);
            setTimeout(() => {
                this.props.getTowerMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (tower) => {
        this.setState({ tower: tower, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getTowerMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, towers, tower } = this.state;
        return (<div id='towerTable' className={style.table_wapper} >
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
                        <TowerAddEdit
                            baseObject={tower}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveTowerMasterData}
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
                    <TowerMasterDetails
                        Data={towers}
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
    const { tower, towers, towerRecordsCount, towerActiontype } = state.adminReducer;

    return { tower, towers, towerRecordsCount, towerActiontype };
};

export default connect(mapStateToProps, { getTowerMasterData, saveTowerMasterData, getTowerMasterDataById, deleteTowerMasterData })(TowerIndex);