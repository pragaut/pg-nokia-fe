import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import { getDeviceBatteryStatus, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails } from '../../../../actions/tmc/working.action';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';
import DeviceBatteryStatus from './deviceBatteryStatusDetails';
import DeviceStatus from './deviceStatus';
import NetworkConnectivityStatus from './networkConnectivityStatus';
import TowerMonitoringSubDetails from './towerMonitoringSubDetails';
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
            towerMonitoringDetail: props.towerMonitoringDetail ? props.towerMonitoringDetail : {},
            parameterWithValues: props.parameterWithValues ? props.parameterWithValues : {}
        }
    };
    componentDidMount() {
        let filterValue = this.state.parameterWithValues;
        this.props.getDeviceBatteryStatus(filterValue);
        this.props.getDeviceStatusDetails(filterValue);
        this.props.getNetworkConnectivityStatuDetails(filterValue);
        this.props.getTowerMonitoringSubDetails(filterValue);
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
        if (nextProps && nextProps.parameterWithValues && nextProps.parameterWithValues !== this.state.parameterWithValues) {
            let filterValue = nextProps.parameterWithValues;
            this.props.getDeviceBatteryStatus(filterValue);
            this.props.getDeviceStatusDetails(filterValue);
            this.props.getNetworkConnectivityStatuDetails(filterValue);
            this.props.getTowerMonitoringSubDetails(filterValue);
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
        const { deviceBatteryStatuss, towerMonitoringSubDetails, networkConnectivityStatuDetails, deviceStatusDetails, towerMonitoringDetail } = this.state;
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
                        width={'10%'}
                    >
                        <Button
                            width="90%"
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
                        flexdirection="row"
                        width={'30%'}
                    >
                        <NetworkConnectivityStatus
                            networkConnectivityStatuDetails={networkConnectivityStatuDetails}
                        />
                    </CommonStyle.MainDiv>
                    <CommonStyle.TextDiv
                        fontsize={"18px"}
                        fontweight={"bold"}
                        justifycontent={"center"}
                        width={'20%'}
                    >
                        {towerMonitoringDetail && towerMonitoringDetail.uniqueId}
                    </CommonStyle.TextDiv>
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        justifycontent={'flex-end'}
                        width={'40%'}
                    >
                        Work Start Time -  {towerMonitoringDetail && towerMonitoringDetail.startDateTime && towerMonitoringDetail.startDateTime !== null ? moment(towerMonitoringDetail.startDateTime).format("DD-MMM-YYYY hh:mm:ss a") : ''}
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
                        <DeviceBatteryStatus
                            deviceBatteryStatuss={deviceBatteryStatuss}
                        />
                    </CommonStyle.MainDiv>
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexdirection="row"
                        width={'49%'}
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
                >
                    <TowerMonitoringSubDetails
                        towerMonitoringSubDetails={towerMonitoringSubDetails}
                    />
                </CommonStyle.MainDiv>
                <Gap h="60px" />
            </CommonStyle.MainDiv>
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    const { deviceBatteryStatuss, deviceStatusDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails } = state.workingReducerTmc;
    return { errorType, errorMessage, deviceBatteryStatuss, deviceStatusDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails };
};
export default withRouter(connect(mapStateToProps, { getDeviceBatteryStatus, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails })(TowerMonitoringDetailedIndex));
