import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../../comman/Gap';
import style from '../../../../theme/app.scss';
import Wrapper from '../../../shared/Wrapper';
import { constants } from '../../../../utils/constants';
import * as AdminTypes from '../../../../action-types/comman/admin.action.types';
import { getDeviceRegistrationMasterData, saveDeviceRegistrationMasterData, getDeviceRegistrationMasterDataById, deleteDeviceRegistrationMasterData } from '../../../../actions/comman/admin.action';
import ListTable from '../../../shared/ListTable';
import DeviceRegistrationAddEdit from './deviceRegistration.add.edit';
import * as CommonStyle from '../../../comman/commonStyle';
import DeviceRegistrationMasterDetails from '../../../comman/ReactTableComponent';
import moment from 'moment';


class DeviceRegistrationIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            deviceRegistration: {},
            deviceRegistrations: [],
            showEditPopup: false,
            type: AdminTypes.DEVICEREGISTRATIONMASTER_INIT,
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
                Header: 'Org Details',
                accessor: 'orgName.orgName',
                id: 'orgName.orgName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'MAC Address',
                accessor: 'macAddress',
                id: 'macAddress',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Unique ID',
                accessor: 'uniqueId',
                id: 'uniqueId',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Registration Date',
                accessor: d => `${d.registrationDate && d.registrationDate !== null ?  moment(d.registrationDate).format("DD-MM-YYYY") : ''} `,//  'registrationDate',
                id: 'registrationDate',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Device Sequence',
                accessor: 'deviceSequence',
                id: 'deviceSequence',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Unique Code',
                accessor: 'uniqueCode',
                id: 'uniqueCode',
                minWidth: 100,
                show: true,
            },
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.deviceRegistrations && nextProps.deviceRegistrations !== null && nextProps.deviceRegistrations != this.state.deviceRegistrations) {
            this.setState({ deviceRegistrations: nextProps.deviceRegistrations })
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
        this.props.getDeviceRegistrationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnWhenPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        if (confirm('Would you like to delete the record?')) {
            this.props.deleteDeviceRegistrationMasterData(ids);
            setTimeout(() => {
                this.props.getDeviceRegistrationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({ showEditPopup: false })
    }
    onClickAdd = (deviceRegistration) => {
        this.setState({ deviceRegistration: deviceRegistration, showEditPopup: true })
    }
    onClickReferesh = (async) => {
        this.props.getDeviceRegistrationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.updateColumnWhenPropsUpdate();
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }

    render() {
        const { showEditPopup, columns, deviceRegistrations, deviceRegistration } = this.state;
        return (<div id='deviceRegistrationTable' className={style.table_wapper} >
            {showEditPopup === true &&
                <>
                    <CommonStyle.Overlay
                    // onClick={() => this.onClickCancel()}
                    />
                    <CommonStyle.Wrapper_OnOverlay
                        width={"80%"}
                        height={"fit-content"}
                        visible={showEditPopup}
                    >
                        <CommonStyle.CloseButtonForModel
                            onClick={() => this.onClickCancel()}
                        >X</CommonStyle.CloseButtonForModel>
                        <DeviceRegistrationAddEdit
                            baseObject={deviceRegistration}
                            onCancel={this.onClickCancel}
                            onSave={this.props.saveDeviceRegistrationMasterData}
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
                    <DeviceRegistrationMasterDetails
                        Data={deviceRegistrations ? deviceRegistrations : []}
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
    const { deviceRegistration, deviceRegistrations, deviceRegistrationRecordsCount, deviceRegistrationActiontype } = state.adminReducer;

    return { deviceRegistration, deviceRegistrations, deviceRegistrationRecordsCount, deviceRegistrationActiontype };
};

export default connect(mapStateToProps, { getDeviceRegistrationMasterData, saveDeviceRegistrationMasterData, getDeviceRegistrationMasterDataById, deleteDeviceRegistrationMasterData })(DeviceRegistrationIndex);