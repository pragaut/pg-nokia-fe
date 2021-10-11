import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import {getEscalationMatrixDetails,getEscalationDurationDetails,getNotificationMasterDetails ,getEscalationMatrixDetailsById,saveEscalationMatrixDetails,deleteEscalationMatrixDetails,initEscalationMatrixDetails, getRoleMasterData} from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import EscalationMatrixAddEdit from './escalationMatrix.add.edit';
import {getMasterDetailsBymasterCategoryCode  } from '../../../actions/masterDetails.actions'


class EscalationMatrixIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            years: [],
            year: {},
            showEditPopup: false,
            type: AdminTypes.ESCALATIONMATRIXDETAILS_INIT,
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {

    };


    componentDidMount() {
        // let's load the groups, for first time
        this.props.getEscalationMatrixDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getRoleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'Frequency_Master');
        this.props.getEscalationDurationDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getNotificationMasterDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };


    render() {
 
        return (<div id='escalationMatrixTable' className={style.table_wapper} >
            {/* <Gap h="5rem" /> */}
            <ListTable
                recordsCount={this.props.escalationmatrixRecordsCount}
                EditForm={EscalationMatrixAddEdit}
                onRefresh={this.props.getEscalationMatrixDetails}
                onSave={this.props.saveEscalationMatrixDetails}
                getById={this.props.getEscalationMatrixDetailsById}
                onDelete={this.props.deleteEscalationMatrixDetails}
                actionType={this.props.escalationmatrixActiontype}
                dataRows={this.props.escalationmatrixs}
                pickEditFromMemory={true}               
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
                maxHeight='400px'
                columnHeadings={[{
                    name: 'notificationMaster.notificationName',
                    type: 'string'
                },
                {
                    name: 'frequency.value',
                    type: 'string',
                    displayName: 'frequency'
                },
                {
                    name: 'role.roleName',
                    type: 'string'
                },
                {
                    name: 'duration.durationName',
                    type: 'string'
                }
                ]}
            />
            <Gap h="5rem" />
        </div>);
    }
}


const mapStateToProps = state => {
    //const groupActiontype = state.adminReducer.groupActiontype;
    const {roles,escalationDurations,notifications, escalationmatrix, escalationmatrixs, escalationmatrixRecordsCount, escalationmatrixActiontype } = state.adminReducer;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;
   
    return {masterDetailsCategory, roles,escalationDurations,notifications, escalationmatrix, escalationmatrixs, escalationmatrixRecordsCount, escalationmatrixActiontype };
};

export default connect(mapStateToProps, {getEscalationDurationDetails, getMasterDetailsBymasterCategoryCode,getNotificationMasterDetails, getEscalationMatrixDetails,getEscalationMatrixDetailsById,saveEscalationMatrixDetails,deleteEscalationMatrixDetails,initEscalationMatrixDetails, getRoleMasterData})(EscalationMatrixIndex);