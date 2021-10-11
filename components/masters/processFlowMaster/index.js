import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getProcessFlowMasterData, saveProcessFlowMasterData, getProcessFlowMasterDataById, deleteProcessFlowMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import ProcessFlowAddEdit from './processFlow.add.edit';


class ProcessFlowsIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            processFlows: [],
            processFlow: {},
            showEditPopup: false,
            type: AdminTypes.PROCESSFLOWMASTER_INIT,
        };
 
    }


    UNSAFE_componentWillReceiveProps(nextProps) {

    };


    componentDidMount() { 
        this.props.getProcessFlowMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };

    onDeleteRecord = (ids) => {
        this.props.deleteProcessFlowMasterData(ids);
        setTimeout(() => {
            this.props.getProcessFlowMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        }, 500);
    }


    render() {
      
        return (<div id='processFlowMasterTable' className={style.table_wapper} >
            {/* <Gap h="5rem" /> */}
            <ListTable
                recordsCount={this.props.processFlowRecordsCount}
                EditForm={ProcessFlowAddEdit}
                onRefresh={this.props.getProcessFlowMasterData}
                onSave={this.props.saveProcessFlowMasterData}
                getById={this.props.getProcessFlowMasterDataById}
                onDelete={this.onDeleteRecord}
                actionType={this.props.processFlowActiontype}
                dataRows={this.props.processFlows}
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
                        name: 'auditFlow.auditFlow',
                        type: 'string',
                        displayName: 'Audit Flow'
                    },{
                    name: 'processFlowName',
                    type: 'string',
                    displayName: 'Process Flow'
                },
                {
                    name: 'processFlowCode',
                    type: 'string',
                    displayName: 'Process Flow Code'
                },
                {
                    name: 'leadTime',
                    type: 'string',
                    displayName: 'Lead Time'
                } ,
                {
                    name: 'uRL',
                    type: 'string',
                    displayName: 'URLl'
                } ,
                {
                    name: 'isUserTask',
                    type: 'bool',
                    displayName: 'Is User Task'
                } ,
                {
                    name: 'isAuditteeTask',
                    type: 'bool',
                    displayName: 'Is Audittee Task'
                } ,
                {
                    name: 'isAuditorTask',
                    type: 'bool',
                    displayName: 'Is Auditor Task'
                } ,
                {
                    name: 'isMonthlyReviewStep',
                    type: 'bool',
                    displayName: 'Is Monthly Review Step'
                } ,
                {
                    name: 'isApprovalRequired',
                    type: 'bool',
                    displayName: 'Is Approval Required'
                } ,
                {
                    name: 'isEmployeeWiseApplicable',
                    type: 'bool',
                    displayName: 'Is Employee Wise Applicable'
                } ,
                {
                    name: 'isPlantWiseApplicable',
                    type: 'bool',
                    displayName: 'Is Plant Wise Applicable'
                } ,
                {
                    name: 'isCompanyWiseApplicable',
                    type: 'bool',
                    displayName: 'Is Company Wise Applicable'
                } ,
                {
                    name: 'isGroupWiseApplicable',
                    type: 'bool',
                    displayName: 'Is Group Wise Applicable'
                } ,
                {
                    name: 'isFeedbackStep',
                    type: 'bool',
                    displayName: 'Is Feedback Step'
                } ,
                {
                    name: 'isDefaultProcess',
                    type: 'bool',
                    displayName: 'Is Default Process'
                } ,
                {
                    name: 'processFlow.processFlowName',
                    type: 'string',
                    displayName: 'Sendback Process Flow Name'
                } ,
                {
                    name: 'isCorporateTeamTask',
                    type: 'bool',
                    displayName: 'is Corporate Team Task'
                } ,
                {
                    name: 'isEditableBeforeNextStepCompletion',
                    type: 'bool',
                    displayName: 'is Editable Before Next Step Completion'
                } ,
                {
                    name: 'isEditableAfterNextStepCompletion',
                    type: 'bool',
                    displayName: 'is Editable After Next Step Completion'
                } ,
                {
                    name: 'isEditableAfterNextApproverApproval',
                    type: 'bool',
                    displayName: 'is Editable After Next Approver Approval'
                } ,
                {
                    name: 'isReopenManadatoryAfterNextApproverRejection',
                    type: 'bool',
                    displayName: 'is Re-open Manadatory After Next Approver Rejection'
                } 
                ]}
            />
            <Gap h="5rem" />
        </div>);
    }
}


const mapStateToProps = state => { 
    const { processFlow, processFlows, processFlowRecordsCount, processFlowActiontype } = state.adminReducer;

    return { processFlow, processFlows, processFlowRecordsCount, processFlowActiontype };
};

export default connect(mapStateToProps, { getProcessFlowMasterData, saveProcessFlowMasterData, getProcessFlowMasterDataById, deleteProcessFlowMasterData })(ProcessFlowsIndex);