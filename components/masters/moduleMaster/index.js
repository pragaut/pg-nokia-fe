import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getModuleMasterData, saveModuleMasterData, getModuleMasterDataById, deleteModuleMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import ModuleAddEdit from './module.add.edit';


class Modules extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            modules: [],
            module: {},
            showEditPopup: false,
            type: AdminTypes.GROUPMASTER_INIT,
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {

    };


    componentDidMount() {
        // let's load the modules, for first time
        this.props.getModuleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };


    render() {
        return (<div id='moduleTable' className={style.table_wapper} >
            {/* <Gap h="5rem" /> */}
            <ListTable
                recordsCount={this.props.recordsCount}
                EditForm={ModuleAddEdit}
                onRefresh={this.props.getModuleMasterData}
                onSave={this.props.saveModuleMasterData}
                getById={this.props.getModuleMasterDataById}
                onDelete={this.props.deleteModuleMasterData}
                actionType={this.props.moduleActiontype}
                dataRows={this.props.modules}
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
                    name: 'moduleName',
                    type: 'string'
                },
                {
                    name: 'moduleCode',
                    type: 'string'
                },
                {
                    name: 'moduleUrl',
                    type: 'string'
                },
                ]}
            />
            <Gap h="5rem" />
        </div>);
    }
}


const mapStateToProps = state => {
    //const moduleActiontype = state.adminReducer.moduleActiontype;
    const { modules, module, moduleRecordsCount, moduleActiontype } = state.adminReducer;

    return { moduleActiontype, modules, module, moduleRecordsCount };
};

export default connect(mapStateToProps, { getModuleMasterData, saveModuleMasterData, getModuleMasterDataById, deleteModuleMasterData })(Modules);