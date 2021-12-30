import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import { getDeviceBatteryStatusLog, getTowerNotificationDetails, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails } from '../../../../actions/tmc/working.action';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';
import DeviceBatteryStatus from './deviceBatteryStatusLogDetails';
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
            deviceBatteryStatusLogs: [],
            deviceStatusDetails: [],
            isViewDetailsPageVisible: props.isViewDetailsPageVisible ? props.isViewDetailsPageVisible : false,
            towerMonitoringDetail: props.towerMonitoringDetail ? props.towerMonitoringDetail : {},
            parameterWithValues: props.parameterWithValues ? props.parameterWithValues : {}
        }
    };
    componentDidMount() {
        let counter = 1;
        let filterValue = this.state.parameterWithValues;
        this.props.getDeviceBatteryStatusLog(filterValue);
        this.props.getDeviceStatusDetails(filterValue);
        // this.props.getNetworkConnectivityStatuDetails(filterValue);
        this.props.getTowerMonitoringSubDetails(filterValue);
        this.props.getTowerNotificationDetails(filterValue, undefined, undefined, undefined);

        // setInterval(() => {
        //     counter = counter + 1;
        //     console.log("---------counter---------", counter);
        //     let filterValuenew = this.state.parameterWithValues;
        //     if (this.state.isViewDetailsPageVisible === true) {
        //         this.props.getDeviceBatteryStatus(filterValuenew);
        //         this.props.getDeviceStatusDetails(filterValuenew);
        //         this.props.getNetworkConnectivityStatuDetails(filterValuenew);
        //         this.props.getTowerMonitoringSubDetails(filterValuenew);
        //         this.props.getTowerNotificationDetails(filterValuenew, undefined, undefined, undefined);
        //     }
        // }, 60000);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.deviceBatteryStatusLogs && nextProps.deviceBatteryStatusLogs !== this.state.deviceBatteryStatusLogs) {
            this.setState({ deviceBatteryStatusLogs: nextProps.deviceBatteryStatusLogs })
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
        const { pageCallFromPage } = this.props;
        const { deviceBatteryStatusLogs, towerNotificationDetails, towerMonitoringSubDetails, networkConnectivityStatuDetails, deviceStatusDetails, towerMonitoringDetail } = this.state;
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
                        width={'5%'}
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
                            onClick={() => this.props.onClickBackButton()}
                        >
                            Back
                    </Button>
                    </CommonStyle.MainDiv>
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        height="30px"
                        flexdirection="row"
                        justifycontent={'center'}
                        width={'35%'}
                        color={"#fff"}
                        bgColor={"#0d3e99"}
                    >
                        <b>Work Start Time - </b>    {towerMonitoringDetail && towerMonitoringDetail.startDateTime && towerMonitoringDetail.startDateTime !== null ? moment(towerMonitoringDetail.startDateTime).format("DD-MMM-YYYY hh:mm:ss a") : ''}
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
                        height="30px"
                        flexdirection="row"
                        justifycontent={'center'}
                        width={'38%'}
                        color={"#fff"}
                        bgColor={"#0d3e99"}
                    >
                        <b>Work End Time - </b>    {towerMonitoringDetail && towerMonitoringDetail.endDateTime && towerMonitoringDetail.endDateTime !== null ? moment(towerMonitoringDetail.endDateTime).format("DD-MMM-YYYY hh:mm:ss a") : 'WIP'}
                    </CommonStyle.MainDiv>
                </CommonStyle.MainDiv>
                {/* <CommonStyle.MainDiv
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
                    </CommonStyle.MainDiv>
                    
                </CommonStyle.MainDiv> */}
                <CommonStyle.MainDiv
                    padding="0px 0px"
                    flexdirection="row"
                    justifycontent={"space-between"}
                    alignitems={"baseline"}
                    width={'100%'}
                >
                    <TowerMonitoringSubDetails
                        towerMonitoringSubDetails={towerMonitoringSubDetails}
                    />
                </CommonStyle.MainDiv>
                <Gap h="10px" />
                {pageCallFromPage === "pragaut"
                    ?
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
                            <DeviceBatteryStatus
                                deviceBatteryStatusLogs={deviceBatteryStatusLogs}
                            />
                        </CommonStyle.MainDiv>
                        <CommonStyle.MainDiv
                            padding="0px 0px"
                            flexdirection="row"
                            width={'49%'}
                        >
                            <AlarmNotificationDetails
                                towerNotificationDetails={towerNotificationDetails}
                            />
                        </CommonStyle.MainDiv>
                    </CommonStyle.MainDiv>
                    :
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        width={'100%'}
                    >
                        <AlarmNotificationDetails
                            towerNotificationDetails={towerNotificationDetails}
                        />
                    </CommonStyle.MainDiv>


                }

                <Gap h="60px" />
            </CommonStyle.MainDiv>
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    const { deviceBatteryStatusLogs, deviceStatusDetails, towerNotificationDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails } = state.workingReducerTmc;
    return { errorType, errorMessage, towerNotificationDetails, deviceBatteryStatusLogs, deviceStatusDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails };
};
export default withRouter(connect(mapStateToProps, { getTowerNotificationDetails, getDeviceBatteryStatusLog, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails })(TowerMonitoringDetailedIndex));
