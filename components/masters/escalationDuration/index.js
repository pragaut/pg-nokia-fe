import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import {  getEscalationDurationDetails, getEscalationMatrixDurationById,saveEscalationDurationDetails,deleteEscalationDurationDetails,initEscalationDurationDetails} from '../../../actions/admin.action';
import {getMasterDetailsBymasterCategoryCode, getMasterDetailsByMasterCategoryId} from '../../../actions/masterDetails.actions'

import ListTable from '../../shared/ListTable';
import EscalationDurationAddEdit from './escalationDuration.add.edit';


class EscalationDurationIndex extends Wrapper {

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
        this.props.getEscalationDurationDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'Frequency_Master');
    };


    render() {
   return (<div id='escalationDurationTable' className={style.table_wapper} >
            {/* <Gap h="5rem" /> */}
            <ListTable
                recordsCount={this.props.escalationDurationRecordsCount}
                EditForm={EscalationDurationAddEdit}
                onRefresh={this.props.getEscalationDurationDetails}
                onSave={this.props.saveEscalationDurationDetails}
                getById={this.props.getEscalationMatrixDurationById}
                onDelete={this.props.deleteEscalationDurationDetails}
                actionType={this.props.escalationDurationActiontype}
                dataRows={this.props.escalationDurations}
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
                    name: 'frequency.value',
                    type: 'string',
                    displayName: 'frequency'
                },
                {
                    name: 'durationName',
                    type: 'string',
                    displayName: 'Duration'
                },
                {
                    name: 'durationCode',
                    type: 'string',
                    displayName: 'Code'
                },
                {
                    name: 'durationOrder',
                    type: 'string',
                    displayName: 'Order'
                }, 
                ]}
            />
            <Gap h="5rem" />
        </div>);
    }
}


const mapStateToProps = state => {
    //const groupActiontype = state.adminReducer.groupActiontype;
    const {  escalationDuration, escalationDurations, escalationDurationActiontype, escalationDurationRecordsCount } = state.adminReducer;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;
   
    return { masterDetailsCategory,escalationDuration, escalationDurations, escalationDurationActiontype, escalationDurationRecordsCount };
};

export default connect(mapStateToProps, {  getMasterDetailsBymasterCategoryCode, getMasterDetailsByMasterCategoryId, getEscalationDurationDetails, getEscalationMatrixDurationById,saveEscalationDurationDetails,deleteEscalationDurationDetails,initEscalationDurationDetails})(EscalationDurationIndex);