import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getDueDaysMasterData, saveDueDaysMasterData, getDueDaysMasterDataById, deleteDueDaysMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import DueDaysAddEdit from './dueDays.add.edit';


class DueDays extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            dueDays: [],
            dueDay: {},
            showEditPopup: false,
            type: AdminTypes.GROUPMASTER_INIT,
            recordsCount:0
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.dueDaysRecordsCount && nextProps.dueDaysRecordsCount != this.state.recordsCount) {
            this.setState({
                recordsCount: nextProps.dueDaysRecordsCount
            })
        }
    };


    componentDidMount() {
        // let's load the dueDays, for first time
        this.props.getDueDaysMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };


    render() {
        //console.log("this.props.dueDays : ", this.props.dueDays)
        return (<div id='dueDayTable' className={style.table_wapper} >
            {/* <Gap h="5rem" /> */}
            <ListTable
                recordsCount={this.state.recordsCount}
                EditForm={DueDaysAddEdit}
                onRefresh={this.props.getDueDaysMasterData}
                onSave={this.props.saveDueDaysMasterData}
                getById={this.props.getDueDaysMasterDataById}
                onDelete={this.props.deleteDueDaysMasterData}
                actionType={this.props.dueDayActiontype}
                dataRows={this.props.dueDays}
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
                    name: 'category',
                    type: 'string'
                },
                {
                    name: 'dueDate',
                    type: 'string',
                    displayName: 'Due Date',
                },
                {
                    name: 'description',
                    type: 'string'
                },
                ]}
            />
            <Gap h="5rem" />
        </div>);
    }
}


const mapStateToProps = state => {
    //const dueDayActiontype = state.adminReducer.dueDayActiontype;
    const { dueDays, dueDay, dueDaysRecordsCount, dueDayActiontype } = state.adminReducer;

    return { dueDayActiontype, dueDays, dueDay, dueDaysRecordsCount };
};

export default connect(mapStateToProps, { getDueDaysMasterData, saveDueDaysMasterData, getDueDaysMasterDataById, deleteDueDaysMasterData })(DueDays);