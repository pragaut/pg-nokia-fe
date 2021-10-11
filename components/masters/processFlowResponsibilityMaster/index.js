import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import {  getProcessFlowResponsibilityMasterData, getProcessFlowResponsibilityMasterDataById,saveProcessFlowResponsibilityMasterData,deleteProcessFlowResponsibilityMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import ProcessFlowResponsibilityAddEdit from './processFlowResponsibilityMaster.add.edit';


class ProcessFlowResponsibilityIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            scoringRules: [],
            scoringRule: {},
            showEditPopup: false,
            type: AdminTypes.PROCESSFLOWRESPONSIBILITYMASTER_INIT,
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {

    };


    componentDidMount() {
        // let's load the roles, for first time
        this.props.getProcessFlowResponsibilityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };
    
    onDeleteRecord = (ids) => {
        this.props.deleteProcessFlowResponsibilityMasterData(ids);
        setTimeout(() => {
            this.props.getProcessFlowResponsibilityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        }, 500);
    }


    render() {
      console.log("processFlowResponsibilitys",this.props.processFlowResponsibilitys)
        return (<div id='processFlowResponsibilityTable' className={style.table_wapper} >
            {/* <Gap h="5rem" /> */}
            <ListTable
                recordsCount={this.props.processFlowResponsibilityRecordsCount}
                EditForm={ProcessFlowResponsibilityAddEdit}
                onRefresh={this.props.getProcessFlowResponsibilityMasterData}
                onSave={this.props.saveProcessFlowResponsibilityMasterData}
                getById={this.props.getProcessFlowResponsibilityMasterDataById}
                onDelete= {this.onDeleteRecord}
                actionType={this.props.processFlowResponsibilityActiontype}
                dataRows={this.props.processFlowResponsibilitys}
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
                    name: 'processFlow.processFlowName',
                    type: 'string',
                    displayName: 'Process Flow'
                },
                {
                    name: 'company.companyName',
                    type: 'string',
                    displayName: 'Company'
                },
                {
                    name: 'plant.plantName',
                    type: 'string',
                    displayName: 'Plant'
                } ,
                {
                    name: 'role.roleName',
                    type: 'string',
                    displayName: 'Role'
                } ,
                {
                    name: 'user.firstName',
                    type: 'string',
                    displayName: 'User First Name'
                } , 
                {
                    name: 'user.lastName',
                    type: 'string',
                    displayName: 'User Last Name'
                } 
                ]}
            />
            <Gap h="5rem" />
        </div>);
    }
}


const mapStateToProps = state => {
    //const roleActiontype = state.adminReducer.roleActiontype;
    const { processFlowResponsibility, processFlowResponsibilitys,processFlowResponsibilityActiontype,processFlowResponsibilityRecordsCount } = state.adminReducer;

    return {  processFlowResponsibility, processFlowResponsibilitys,processFlowResponsibilityActiontype,processFlowResponsibilityRecordsCount  };
};

export default connect(mapStateToProps, { getProcessFlowResponsibilityMasterData, getProcessFlowResponsibilityMasterDataById,saveProcessFlowResponsibilityMasterData,deleteProcessFlowResponsibilityMasterData  })(ProcessFlowResponsibilityIndex);