import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import {  getSupportingDocumentMaster, getSupportingDocumentMasterById,saveSupportingDocumentMaster,deleteSupportingDocumentMaster,initSupportingDocumentMaster} from '../../../actions/admin.action';
import {getMasterDetailsBymasterCategoryCode, getMasterDetailsByMasterCategoryId} from '../../../actions/masterDetails.actions'

import ListTable from '../../shared/ListTable';
import SupportingDocumentMasterAddEdit from './supportingDocumentMaster.add.edit';


class SupportingDocumentMasterIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            supportingDocumentMasters: [],
            supportingDocumentMaster: {},
            showEditPopup: false,
            type: AdminTypes.SUPPORTINGDOCUMENTMASTER_INIT,
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {

    };


    componentDidMount() {
        // let's load the groups, for first time
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'Supporting_Document_Category');
        this.props.getSupportingDocumentMaster(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };


    render() {

      
        return (<div id='supportingDocumentMasterTable' className={style.table_wapper} >
            {/* <Gap h="5rem" /> */}
            <ListTable
                recordsCount={this.props.supportingDocumentMasterRecordsCount}
                EditForm={SupportingDocumentMasterAddEdit}
                onRefresh={this.props.getSupportingDocumentMaster}
                onSave={this.props.saveSupportingDocumentMaster}
                getById={this.props.getSupportingDocumentMasterById}
                onDelete={this.props.deleteSupportingDocumentMaster}
                actionType={this.props.supportingDocumentMasterActiontype}
                dataRows={this.props.supportingDocumentMasters}
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
                    name: 'category.value',
                    type: 'string',
                    displayName: 'document category'
                },
                {
                    name: 'documentName',
                    type: 'string'
                },
                {
                    name: 'documentCode',
                    type: 'string'
                },
                {
                    name: 'order',
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
    const {  supportingDocumentMaster, supportingDocumentMasters, supportingDocumentMasterActiontype, supportingDocumentMasterRecordsCount } = state.adminReducer;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;
   
    return { masterDetailsCategory,  supportingDocumentMaster, supportingDocumentMasters, supportingDocumentMasterActiontype, supportingDocumentMasterRecordsCount};
};

export default connect(mapStateToProps, {  getMasterDetailsBymasterCategoryCode, getMasterDetailsByMasterCategoryId, getSupportingDocumentMaster, getSupportingDocumentMasterById,saveSupportingDocumentMaster,deleteSupportingDocumentMaster,initSupportingDocumentMaster})(SupportingDocumentMasterIndex);