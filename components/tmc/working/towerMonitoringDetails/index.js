import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import { getDeviceBatteryStatus, getTowerMonitoringDetails, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails } from '../../../../actions/tmc/working.action';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';
import { Button } from '../../../comman/formStyle';
import ReactTable from '../../../comman/ReactTableComponent';
import TowerMonitoringDetailsView from './towerMonitoringDetails';


class TowerMonitoringDetailsIndex extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            towerMonitoringDetails: [],
            towerMonitoringDetail: {},
            columns: [],
            parameterWithValues: {},
            isViewDetailsPageVisible: false
        }
    };
    functionToSetColumns = () => {
        let columns = [
            {
                Header: 'Action',
                accessor: 'id',
                id: 'id',
                show: true,
                Cell: propss => (
                    <React.Fragment>
                        <button className="info" style={{ marginRight: '10px' }} value={propss.original.id} onClick={() => this.onClickViewDetails(propss.original, propss.original.towerMonitoringDetailId, propss.original.deviceRegistrationDetailId, propss.original.macAddress)}>
                            View Details
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
                Header: 'Tower',
                accessor: 'towerName',
                id: 'towerName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Rigger',
                accessor: 'employeeName',
                id: 'employeeName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Device Mac Address',
                accessor: 'macAddress',
                id: 'macAddress',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Device Unique ID',
                accessor: 'uniqueId',
                id: 'uniqueId',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Height',
                accessor: 'userHeight',
                id: 'userHeight',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Height Status',
                accessor: 'heightStatus',
                id: 'heightStatus',
                Cell: row => (
                    <React.Fragment>
                        {row.original.heightStatus && row.original.heightStatus === 'Asc' ?
                            <i className='fa fa-arrow-up' style={{ color: 'green', fontSize: '20px' }}  ></i>
                            :
                            <>
                                {row.original.heightStatus && row.original.heightStatus === 'Desc' ?
                                    <i className='	fa fa-arrow-down' style={{ color: 'orange', fontSize: '20px' }}  ></i>
                                    :
                                    <span>{row.original.heightStatus}</span>
                                }
                            </>
                        }
                    </React.Fragment>
                ),
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Clamp Status',
                accessor: 'ClampStatus',
                id: 'ClampStatus',
                minWidth: 100,
                Cell: row => (
                    <React.Fragment>
                        <div className={row.original.ClampStatus}>
                            <div>
                                {row.original.ClampStatus}
                            </div>
                        </div>
                    </React.Fragment>
                ),
                show: true,
            },
            {
                Header: 'Start Time',
                accessor: d => `${d.startDateTime && d.startDateTime !== null ? moment(d.startDateTime).format("DD-MMM-YYYY hh:mm:ss a") : ''} `,
                id: 'startDateTime',
                minWidth: 100,
                show: true
            },
            {
                Header: 'End Time',
                accessor: d => `${d.endDateTime && d.endDateTime !== null ? moment(d.endDateTime).format("DD-MMM-YYYY hh:mm:ss a") : ''} `,
                id: 'endDateTime',
                minWidth: 100,
                show: true
            },
        ]
        this.setState({ columns: columns });
    }

    onClickViewDetails = (towerMonitoringDetail, towerMonitoringDetailId, deviceRegistrationDetailId, macAddress) => {
        let parameterWithValues = {
            towerMonitoringDetailId: towerMonitoringDetailId,
            deviceRegistrationDetailId: deviceRegistrationDetailId,
            macAddress: macAddress
        }
        this.setState({
            towerMonitoringDetail: towerMonitoringDetail,
            towerMonitoringDetailId: towerMonitoringDetailId,
            deviceRegistrationDetailId: deviceRegistrationDetailId,
            macAddress: macAddress,
            parameterWithValues: parameterWithValues,
            isViewDetailsPageVisible: true
        });
    }
    onClickBackButton = () => {
        this.setState({
            towerMonitoringDetail: {},
            towerMonitoringDetailId: null,
            deviceRegistrationDetailId: null,
            macAddress: null,
            parameterWithValues: {},
            isViewDetailsPageVisible: false
        });
    }
    componentDidMount() {
        this.props.getTowerMonitoringDetails();
        // setInterval(() => { 
        //     this.props.getTowerMonitoringDetails();
        // }, 2000);
        this.functionToSetColumns();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.towerMonitoringDetails && nextProps.towerMonitoringDetails !== this.state.towerMonitoringDetails) {
            this.setState({ towerMonitoringDetails: nextProps.towerMonitoringDetails })
        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }
    render() {
        const { columns, towerMonitoringDetails, towerMonitoringDetail, isViewDetailsPageVisible, parameterWithValues } = this.state;
        console.log("----render---isViewDetailsPageVisible------", isViewDetailsPageVisible)
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                {isViewDetailsPageVisible === true ?
                    <TowerMonitoringDetailsView
                        parameterWithValues={parameterWithValues}
                        towerMonitoringDetail={towerMonitoringDetail}
                        onClickBackButton={this.onClickBackButton}
                    />
                    :
                    <ReactTable
                        Data={towerMonitoringDetails ? towerMonitoringDetails : []}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumn}
                        columns={columns}
                    />
                }

            </CommonStyle.MainDiv>
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    const { deviceBatteryStatuss, towerMonitoringDetails, deviceStatusDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails } = state.workingReducerTmc;
    return { errorType, errorMessage, deviceBatteryStatuss, towerMonitoringDetails, deviceStatusDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails };
};
export default withRouter(connect(mapStateToProps, { getDeviceBatteryStatus, getTowerMonitoringDetails, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails })(TowerMonitoringDetailsIndex));
