import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../../comman/Gap';
import style from '../../../../theme/app.scss';
import Wrapper from '../../../shared/Wrapper';
import { constants } from '../../../../utils/constants';
import * as AdminTypes from '../../../../action-types/aisu/admin.action.types';
import { getTowerAntennasMasterData, saveTowerAntennasMasterData, getTowerAntennasMasterDataById, deleteTowerAntennasMasterData } from '../../../../actions/aisu/admin.action'; 
import TowerAntennasAddEdit from './towerAntennas.add.edit';
import * as CommonStyle from '../../../comman/commonStyle';
import TowerAntennasMasterDetails from '../../../comman/ReactTableComponent';


class TowerAntennasIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            towerAntennas: {},
            towerAntennass: [],
            showEditPopup: false,
            type: AdminTypes.TOWERANTENNASMASTER_INIT,
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
                minWidth: 130,
                Cell: propss => (
                    <React.Fragment>
                        <button className="warning" style={{ marginRight: '5px' }} value={propss.original.id} onClick={() => this.onClickAdd(propss.original)}>
                            Edit
                        </button> 

                        <button className="primary" style={{ marginRight: '5px' }} value={propss.original.id} onClick={() =>
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
                Header: 'Tower ID',
                accessor: 'towerName.towerName',
                id: 'towerName.towerName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Antenna Name',
                accessor: 'antennaName',
                id: 'antennaName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Antenna Code',
                accessor: 'antennaCode',
                id: 'antennaCode',
                minWidth: 100,
                show: false,
            },
            {
                Header: 'MAC Address',
                accessor: 'macAddress',
                id: 'macAddress',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'AISU Device ID',
                accessor: 'aisuDeviceId',
                id: 'aisuDeviceId',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Unique ID',
                accessor: 'uniqueId',
                id: 'uniqueId',
                minWidth: 100,
                show: true,
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.towerAntennass && nextProps.towerAntennass !== null && nextProps.towerAntennass != this.state.towerAntennass) {
            this.setState({ towerAntennass: nextProps.towerAntennass })
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
        this.props.getTowerAntennasMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteTowerAntennasMasterData(ids);
            setTimeout(() => {
                this.props.getTowerAntennasMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (towerAntennas) => {
        this.setState({ towerAntennas: towerAntennas, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getTowerAntennasMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, towerAntennass, towerAntennas } = this.state;
        console.log("Tower Antennass : ---",towerAntennass)
        return (<div id='towerAntennasTable' className={style.table_wapper} >
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
                        <TowerAntennasAddEdit
                            baseObject={towerAntennas}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveTowerAntennasMasterData}
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
                    <TowerAntennasMasterDetails
                        Data={towerAntennass ? towerAntennass : []}
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
    const { towerAntennas, towerAntennass, towerAntennasRecordsCount, towerAntennasActiontype } = state.adminReducerAisu;

    return { towerAntennas, towerAntennass, towerAntennasRecordsCount, towerAntennasActiontype };
};

export default connect(mapStateToProps, { getTowerAntennasMasterData, saveTowerAntennasMasterData, getTowerAntennasMasterDataById, deleteTowerAntennasMasterData })(TowerAntennasIndex);