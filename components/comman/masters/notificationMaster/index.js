import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../../comman/Gap';
import style from '../../../../theme/app.scss';
import Wrapper from '../../../shared/Wrapper';
import { constants } from '../../../../utils/constants';
import * as AdminTypes from '../../../../action-types/comman/admin.action.types';
import { getNotificationMasterData, saveNotificationMasterData, getNotificationMasterDataById, deleteNotificationMasterData } from '../../../../actions/comman/admin.action';
import ListTable from '../../../shared/ListTable';
import NotificationAddEdit from './notification.add.edit';
import * as CommonStyle from '../../../comman/commonStyle';
import NotificationMasterDetails from '../../../comman/ReactTableComponent';


class NotificationIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            notification: {},
            showEditPopup: false,
            type: AdminTypes.NOTIFICATIONMASTER_INIT,
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
                Header: 'Notification',
                accessor: 'notificationName',
                id: 'notificationName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Notification Code',
                accessor: 'notificationCode',
                id: 'notificationCode',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Notification Order',
                accessor: 'notificationOrder',
                id: 'notificationOrder',
                minWidth: 100,
                show: true
            },
            {
                Header: 'Alarm Type',
                accessor: 'alarmType.alarmTypeName',
                id: 'alarmType.alarmTypeName',
                minWidth: 100,
                show: true
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.notifications && nextProps.notifications !== null && nextProps.notifications != this.state.notifications) {
            this.setState({ notifications: nextProps.notifications })
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
        this.props.getNotificationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteNotificationMasterData(ids);
            setTimeout(() => {
                this.props.getNotificationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (notification) => {
        this.setState({ notification: notification, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getNotificationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, notifications, notification } = this.state;
        return (<div id='notificationTable' className={style.table_wapper} >
             {showEditPopup === true &&
                <>
                    <CommonStyle.Overlay
                    //  onClick={() => this.onClickCancel()}
                    />
                    <CommonStyle.Wrapper_OnOverlay
                        width={"50%"}
                        height={"fit-content"}
                        visible={showEditPopup}
                    >
                        <CommonStyle.CloseButtonForModel
                            onClick={() => this.onClickCancel()}
                        >X</CommonStyle.CloseButtonForModel>
                         <NotificationAddEdit
                            baseObject={notification}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveNotificationMasterData}
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
                    <NotificationMasterDetails
                        Data={notifications}
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
    const { notification, notifications, notificationRecordsCount, notificationActiontype } = state.adminReducer;

    return { notification, notifications, notificationRecordsCount, notificationActiontype };
};

export default connect(mapStateToProps, { getNotificationMasterData, saveNotificationMasterData, getNotificationMasterDataById, deleteNotificationMasterData })(NotificationIndex);