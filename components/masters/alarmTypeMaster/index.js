import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getAlarmTypeMasterData, saveAlarmTypeMasterData, getAlarmTypeMasterDataById, deleteAlarmTypeMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import AlarmTypeAddEdit from './alarm.add.edit';
import * as CommonStyle from '../../commonStyle';
import AlarmTypeMasterDetails from '../../ReactTableComponent';


class AlarmTypeIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            alarms: [],
            alarm: {},
            showEditPopup: false,
            type: AdminTypes.ALARMTYPEMASTER_INIT,
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
                Header: 'Alarm Type Name',
                accessor: 'alarmTypeName',
                id: 'alarmTypeName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Alarm Type Code',
                accessor: 'alarmTypeCode',
                id: 'alarmTypeCode',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Alarm Type Order',
                accessor: 'alarmTypeOrder',
                id: 'alarmTypeOrder',
                minWidth: 100,
                show: true
            },
            {
                Header: 'Color Code',
                minWidth: 50,
                id: 'colorCode',
                show: true,
                Cell: row => (
                    <React.Fragment>
                        <div style={{ background: row.original.themeColor, padding: "3px 5px" }}>
                            {row.original.themeColor}
                        </div>
                    </React.Fragment>
                ),
                sortable: false,
                filterable: false
            },
            {
                Header: 'BG Color Code',
                minWidth: 50,
                id: 'bgColorCode',
                show: true,
                Cell: row => (
                    <React.Fragment>
                        <div style={{ background: row.original.themeColor, padding: "3px 5px" }}>
                            {row.original.themeColor}
                        </div>
                    </React.Fragment>
                ),
                sortable: false,
                filterable: false
            },
            {
                Header: 'Is Remarks Required',
                accessor: 'isRemarksRequired',
                id: 'isRemarksRequired',
                minWidth: 100,
                show: true
            }
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.alarms && nextProps.alarms !== null && nextProps.alarms != this.state.alarms) {
            this.setState({ alarms: nextProps.alarms })
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
        this.props.getAlarmTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteAlarmTypeMasterData(ids);
            setTimeout(() => {
                this.props.getAlarmTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (alarm) => {
        this.setState({ alarm: alarm, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getAlarmTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, alarms, alarm } = this.state;
        return (<div id='alarmTypeTable' className={style.table_wapper} >
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
                        <AlarmTypeAddEdit
                            baseObject={alarm}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveAlarmTypeMasterData}
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
                    <AlarmTypeMasterDetails
                        Data={alarms}
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
    const { alarm, alarms, alarmRecordsCount, alarmActiontype } = state.adminReducer;

    return { alarm, alarms, alarmRecordsCount, alarmActiontype };
};

export default connect(mapStateToProps, { getAlarmTypeMasterData, saveAlarmTypeMasterData, getAlarmTypeMasterDataById, deleteAlarmTypeMasterData })(AlarmTypeIndex);