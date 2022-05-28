import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import { getDeviceBatteryStatus, getTowerNotificationDetails, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails } from '../../../../actions/tmc/working.action';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';
import DeviceBatteryStatus from './deviceBatteryStatusDetails';
import DeviceStatus from './deviceStatus';
import NetworkConnectivityStatus from './networkConnectivityStatus';
import TowerMonitoringSubDetails from './towerMonitoringSubDetails';
import AlarmNotificationDetails from './alarmNotificationDetails';
import Gap from '../../../comman/Gap';
import { Button } from '../../../comman/formStyle';


class TowerMonitoringDetailedIndex extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            towerMonitoringDetailId: props.towerMonitoringDetailId ? props.towerMonitoringDetailId : 'no-id',
            deviceRegistrationDetailId: props.deviceRegistrationDetailId ? props.deviceRegistrationDetailId : 'no-id',
            macAddress: props.macAddress ? props.macAddress : 'no-mac',
            deviceBatteryStatuss: [],
            deviceStatusDetails: [],
            isViewDetailsPageVisible: props.isViewDetailsPageVisible ? props.isViewDetailsPageVisible : false,
            towerMonitoringDetail: props.towerMonitoringDetail ? props.towerMonitoringDetail : {},
            parameterWithValues: props.parameterWithValues ? props.parameterWithValues : {}
        }
    };
    componentDidMount() {
        let counter = 1;
        let filterValue = this.state.parameterWithValues;
        this.props.getDeviceBatteryStatus(filterValue);
        this.props.getDeviceStatusDetails(filterValue);
        this.props.getNetworkConnectivityStatuDetails(filterValue);
        this.props.getTowerMonitoringSubDetails(filterValue);
        this.props.getTowerNotificationDetails(filterValue, undefined, undefined, undefined);

        setInterval(() => {
            counter = counter + 1;
            this.refreshData()
        }, 30000);
    }
    refreshData = () => {
        if (this.state.isViewDetailsPageVisible === true) {
            let filterValuenew = this.state.parameterWithValues;
            this.props.getDeviceBatteryStatus(filterValuenew);
            this.props.getDeviceStatusDetails(filterValuenew);
            this.props.getNetworkConnectivityStatuDetails(filterValuenew);
            this.props.getTowerMonitoringSubDetails(filterValuenew);
            this.props.getTowerNotificationDetails(filterValuenew, undefined, undefined, undefined);
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.deviceBatteryStatuss && nextProps.deviceBatteryStatuss !== this.state.deviceBatteryStatuss) {
            this.setState({ deviceBatteryStatuss: nextProps.deviceBatteryStatuss })
        }
        if (nextProps && nextProps.deviceStatusDetails && nextProps.deviceStatusDetails !== this.state.deviceStatusDetails) {
            this.setState({ deviceStatusDetails: nextProps.deviceStatusDetails })
        }
        if (nextProps && nextProps.networkConnectivityStatuDetails && nextProps.networkConnectivityStatuDetails !== this.state.networkConnectivityStatuDetails) {
            this.setState({ networkConnectivityStatuDetails: nextProps.networkConnectivityStatuDetails })
        }
        if (nextProps && nextProps.towerMonitoringSubDetails && nextProps.towerMonitoringSubDetails !== this.state.towerMonitoringSubDetails) {
            this.setState({ towerMonitoringSubDetails: nextProps.towerMonitoringSubDetails })
        }
        if (nextProps && nextProps.towerMonitoringDetail && nextProps.towerMonitoringDetail !== this.state.towerMonitoringDetail) {
            this.setState({ towerMonitoringDetail: nextProps.towerMonitoringDetail })
        }
        if (nextProps && nextProps.towerNotificationDetails && nextProps.towerNotificationDetails !== this.state.towerNotificationDetails) {
            this.setState({ towerNotificationDetails: nextProps.towerNotificationDetails });
        }
        if (nextProps && nextProps.parameterWithValues && nextProps.parameterWithValues !== this.state.parameterWithValues) {
            let filterValue = nextProps.parameterWithValues;
            this.props.getDeviceBatteryStatus(filterValue);
            this.props.getDeviceStatusDetails(filterValue);
            this.props.getNetworkConnectivityStatuDetails(filterValue);
            this.props.getTowerMonitoringSubDetails(filterValue);
            this.props.getTowerNotificationDetails(filterValue, undefined, undefined, undefined);

            this.setState({ parameterWithValues: nextProps.parameterWithValues })
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }
    render() {
        const { deviceBatteryStatuss, towerNotificationDetails, towerMonitoringSubDetails, networkConnectivityStatuDetails, deviceStatusDetails, towerMonitoringDetail } = this.state;
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                <CommonStyle.MainDiv
                    padding="0px 0px"
                    flexdirection="row"
                    justifycontent={"space-between"}
                    alignitems={"baseline"}
                >
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        width={'40%'}
                        justifycontent="flex-start"
                    >
                        <Button
                            width="80px"
                            height="30px"
                            borderRadius="5px"
                            bgColor="blue"
                            lineheight="1"
                            border="1px solid blue"
                            hoverColor="blue"
                            bgChangeHover="#fff"
                            style={{ marginRight: '10px' }}
                            onClick={() => this.props.onClickBackButton()}
                        >
                            Back
                    </Button>
                        <Button
                            width="50px"
                            height="30px"
                            borderRadius="5px"
                            bgColor="blue"
                            lineheight="1"
                            border="1px solid blue"
                            hoverColor="blue"
                            bgChangeHover="#fff"
                            onClick={() => this.refreshData()}
                        >
                            <i class="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </CommonStyle.MainDiv>
                    <CommonStyle.MainDiv
                        fontsize={"18px"}
                        fontweight={"bold"}
                        justifycontent={"center"}
                        fontWeight="bold"
                        bgColor={"#0d3e99"}
                        color={"#fff"}
                        height={"30px"}
                        width={'20%'}
                    >
                        {towerMonitoringDetail && towerMonitoringDetail.uniqueId}
                    </CommonStyle.MainDiv>
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        justifycontent={'flex-end'}
                        width={'40%'}
                    >
                    </CommonStyle.MainDiv>
                </CommonStyle.MainDiv>
                <CommonStyle.MainDiv
                    padding="0px 0px"
                    flexdirection="row"
                    justifycontent={"space-between"}
                    alignitems={"baseline"}
                >
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        width={'49%'}
                    >
                        <NetworkConnectivityStatus
                            networkConnectivityStatuDetails={networkConnectivityStatuDetails}
                        />
                    </CommonStyle.MainDiv>
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        height="30px"
                        flexdirection="row"
                        justifycontent={'center'}
                        width={'49%'}
                        color={"#fff"}
                        bgColor={"#0d3e99"}
                    >
                        <b>Work Start Time - </b>    {towerMonitoringDetail && towerMonitoringDetail.startDateTime && towerMonitoringDetail.startDateTime !== null ? moment(towerMonitoringDetail.startDateTime).format("DD-MMM-YYYY | hh:mm:ss a") : ''}
                    </CommonStyle.MainDiv>
                </CommonStyle.MainDiv>

                <CommonStyle.MainDiv
                    padding="0px 0px"
                    flexdirection="row"
                    justifycontent={"space-between"}
                    alignitems={"baseline"}
                >
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        width={'30%'}
                    >
                        <DeviceBatteryStatus
                            deviceBatteryStatuss={deviceBatteryStatuss}
                            deviceStatusDetails={deviceStatusDetails}
                        />
                    </CommonStyle.MainDiv>
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        width={'69%'}
                    >
                        <DeviceStatus
                            deviceStatusDetails={deviceStatusDetails}
                        />
                    </CommonStyle.MainDiv>
                </CommonStyle.MainDiv>
                <CommonStyle.MainDiv
                    padding="0px 0px"
                    flexdirection="row"
                    justifycontent={"space-between"}
                    alignitems={"baseline"}
                    width={'100%'}
                >
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        justifycontent={"space-between"}
                        alignitems={"baseline"}
                        width={'59%'}
                    >
                        <TowerMonitoringSubDetails
                            towerMonitoringSubDetails={towerMonitoringSubDetails}
                        />
                    </CommonStyle.MainDiv>
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        justifycontent={"space-between"}
                        alignitems={"baseline"}
                        width={'39%'}
                    >
                        <AlarmNotificationDetails
                            towerNotificationDetails={towerNotificationDetails}
                        />
                    </CommonStyle.MainDiv>
                </CommonStyle.MainDiv>

                <Gap h="10px" />

                <Gap h="60px" />
            </CommonStyle.MainDiv>
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    const { deviceBatteryStatuss, deviceStatusDetails, towerNotificationDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails } = state.workingReducerTmc;
    return { errorType, errorMessage, towerNotificationDetails, deviceBatteryStatuss, deviceStatusDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails };
};
export default withRouter(connect(mapStateToProps, { getTowerNotificationDetails, getDeviceBatteryStatus, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails })(TowerMonitoringDetailedIndex));
