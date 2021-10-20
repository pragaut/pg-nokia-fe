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
import * as CommonStyle from '../../commonStyle';
import ModuleMasterDetails from '../../ReactTableComponent';


class ModuleIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            modules: [],
            module: {},
            showEditPopup: false,
            type: AdminTypes.MODULEMASTER_INIT,
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
                Header: 'Organisation',
                accessor: 'orgName.orgName',
                id: 'orgName.orgName',
                minWidth: 100,
                show: true
            },
            {
                Header: 'Module Name',
                accessor: 'moduleName',
                id: 'moduleName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Module Code',
                accessor: 'moduleCode',
                id: 'moduleCode',
                minWidth: 100,
                show: true,
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.modules && nextProps.modules !== null && nextProps.modules != this.state.modules) {
            this.setState({ modules: nextProps.modules })
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
        this.props.getModuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteModuleMasterData(ids);
            setTimeout(() => {
                this.props.getModuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (module) => {
        this.setState({ module: module, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getModuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, modules, module } = this.state;
        return (<div id='moduleTable' className={style.table_wapper} >
            {showEditPopup === true &&
                <>
                    <CommonStyle.Overlay
                    // onClick={() => this.onClickCancel()}
                    />
                    <CommonStyle.Wrapper_OnOverlay
                        width={"50%"}
                        height={"fit-content"}
                        visible={showEditPopup}
                    >
                        <CommonStyle.CloseButtonForModel
                            onClick={() => this.onClickCancel()}
                        >X</CommonStyle.CloseButtonForModel>
                        <ModuleAddEdit
                            baseObject={module}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveModuleMasterData}
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
                    <ModuleMasterDetails
                        Data={modules}
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
    const { module, modules, moduleRecordsCount, moduleActiontype } = state.adminReducer;

    return { module, modules, moduleRecordsCount, moduleActiontype };
};

export default connect(mapStateToProps, { getModuleMasterData, saveModuleMasterData, getModuleMasterDataById, deleteModuleMasterData })(ModuleIndex);