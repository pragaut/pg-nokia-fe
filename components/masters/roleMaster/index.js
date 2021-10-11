import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getRoleMasterData, saveRoleMasterData, getRoleMasterDataById, deleteRoleMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import RoleAddEdit from './role.add.edit';


class Roles extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            role: {},
            showEditPopup: false,
            type: AdminTypes.GROUPMASTER_INIT,
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {

    };


    componentDidMount() {
        // let's load the roles, for first time
        this.props.getRoleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };


    render() {
        console.log("this.props.roles",this.props.roles);
        return (<div id='roleTable' className={style.table_wapper} >
            {/* <Gap h="5rem" /> */}
            <ListTable
                recordsCount={this.props.recordsCount}
                EditForm={RoleAddEdit}
                onRefresh={this.props.getRoleMasterData}
                onSave={this.props.saveRoleMasterData}
                getById={this.props.getRoleMasterDataById}
                onDelete={this.props.deleteRoleMasterData}
                actionType={this.props.roleActiontype}
                dataRows={this.props.roles}
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
                    name: 'roleName',
                    type: 'string'
                },
                {
                    name: 'roleCode',
                    type: 'string'
                },
                {
                    name: 'roleOrder',
                    type: 'int'
                },
                ]}
            />
            <Gap h="5rem" />
        </div>);
    }
}


const mapStateToProps = state => {
    //const roleActiontype = state.adminReducer.roleActiontype;
    const { roles, role, roleRecordsCount, roleActiontype } = state.adminReducer;

    return { roleActiontype, roles, role, roleRecordsCount };
};

export default connect(mapStateToProps, { getRoleMasterData, saveRoleMasterData, getRoleMasterDataById, deleteRoleMasterData})(Roles);