import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import {getNotificationMasterDetails,getNotificationMasterDetailsById, saveNotificationMasterDetails, deleteNotificationMasterDetails, initNotificationMasterDetails, getRoleMasterData} from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import NotificationAddEdit from './notification.add.edit';


class NotificationIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            years: [],
            year: {},
            showEditPopup: false,
            type: AdminTypes.NOTIFICATIONMASTERDETAILS_INIT,
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {

    };


    componentDidMount() {
        // let's load the groups, for first time
        this.props.getNotificationMasterDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getRoleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };


    render() {
        return (<div id='notificationTable' className={style.table_wapper} >
            {/* <Gap h="5rem" /> */}
            <ListTable
                recordsCount={this.props.notificationRecordsCount}
                EditForm={NotificationAddEdit}
                onRefresh={this.props.getNotificationMasterDetails}
                onSave={this.props.saveNotificationMasterDetails}
                getById={this.props.getNotificationMasterDetailsById}
                onDelete={this.props.deleteNotificationMasterDetails}
                actionType={this.props.notificationActiontype}
                dataRows={this.props.notifications}
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
                    name: 'notificationName',
                    type: 'string'
                },
                {
                    name: 'notificationCode',
                    type: 'string'
                },
                {
                    name: 'notificationType',
                    type: 'string'
                },
                {
                    name: 'subject',
                    type: 'string'
                },
                {
                    name: 'Rolename',
                    type: 'string'
                },
                ]}
            />
            <Gap h="5rem" />
        </div>);
    }
}


const mapStateToProps = state => {
    //const groupActiontype = state.adminReducer.groupActiontype;
    const {roles, notification, notifications, notificationRecordsCount, notificationActiontype } = state.adminReducer;

    return { roles, notification, notifications, notificationRecordsCount, notificationActiontype };
};

export default connect(mapStateToProps, { getNotificationMasterDetails,getNotificationMasterDetailsById, saveNotificationMasterDetails, deleteNotificationMasterDetails, initNotificationMasterDetails, getRoleMasterData})(NotificationIndex);