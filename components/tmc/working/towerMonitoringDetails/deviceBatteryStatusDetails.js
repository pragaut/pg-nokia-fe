import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';


class DeviceBatteryStatusDetails extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            deviceBatteryStatuss: props.deviceBatteryStatuss ? props.deviceBatteryStatuss : [],
            deviceStatusDetails: props.deviceStatusDetails ? props.deviceStatusDetails : [],
        }
    };
    componentDidMount() {
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.deviceBatteryStatuss && nextProps.deviceBatteryStatuss !== this.state.deviceBatteryStatuss) {
            this.setState({ deviceBatteryStatuss: nextProps.deviceBatteryStatuss })
        }
        if (nextProps && nextProps.deviceStatusDetails && nextProps.deviceStatusDetails !== this.state.deviceStatusDetails) {
            this.setState({ deviceStatusDetails: nextProps.deviceStatusDetails })
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
        const { deviceBatteryStatuss, deviceStatusDetails } = this.state;
        const singleData = deviceBatteryStatuss && deviceBatteryStatuss.length > 0 && deviceBatteryStatuss[0];
        //console.log("-------------battery singleData ---------", singleData);
        //console.log("PB");
        //console.log("child 1 b : ",singleData.child1DeviceBattery);
        let deviceStatus = deviceStatusDetails && deviceStatusDetails.length > 0 ? deviceStatusDetails[0].deviceStatus : deviceStatusDetails.deviceStatus;
        let child1Status = deviceStatusDetails && deviceStatusDetails.length > 0 ? deviceStatusDetails[0].child1Status : deviceStatusDetails.child1Status;
        let child2Status = deviceStatusDetails && deviceStatusDetails.length > 0 ? deviceStatusDetails[0].child2Status : deviceStatusDetails.child2Status;
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                <CommonStyle.TABLE
                    tdPadding={"6px"}
                    thPadding={"6px"}
                >
                    <tr>
                        <th style={{ width: '34%' }}>
                            Main Device
                        </th>
                        <th style={{ width: '33%' }}>
                            Child 1
                        </th>
                        <th style={{ width: '33%' }}>
                            Child 2
                        </th>
                    </tr>
                    <tr>
                        <td>
                            {deviceStatus && (deviceStatus === "Not Connected" || deviceStatus === "InActive" || deviceStatus === "Inactive") ?
                                <div className="divClassFlex">
                                    <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> Not Connected
                                </div>
                                :
                                <>
                                    {singleData && singleData.mainDeviceBattery === 100
                                        ?
                                        <div className="divClassFlex">
                                            <i className="fa fa-battery-full" style={{ fontSize: '24px', color: 'green' }}></i> {singleData.mainDeviceBattery ? singleData.mainDeviceBattery : '1'}%
                                        </div>
                                        :
                                        <>
                                            {singleData && singleData.mainDeviceBattery === 70
                                                ?
                                                <div className="divClassFlex">
                                                    <i className="fa fa-battery-three-quarters" style={{ fontSize: '24px', color: 'blue' }}></i>  {singleData.mainDeviceBattery ? singleData.mainDeviceBattery : '1'}%
                                                </div>
                                                :
                                                <>
                                                    <div className="divClassFlex">
                                                        <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i>  {singleData.mainDeviceBattery ? singleData.mainDeviceBattery : '1'}%
                                                    </div>
                                                    {/* {singleData && singleData.mainDeviceBattery <= 50 && singleData.mainDeviceBattery > 25
                                                ?
                                                <div className="divClassFlex">
                                                    <i className="fa fa-battery-half" style={{ fontSize: '24px', color: 'blue' }}></i>   {singleData.mainDeviceBattery}50%
                                                </div>
                                                :
                                                <>
                                                    {singleData && singleData.mainDeviceBattery <= 25 && singleData.mainDeviceBattery > 0
                                                        ?
                                                        <div className="divClassFlex">
                                                            <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i>  {singleData.mainDeviceBattery}%
                                                        </div>
                                                        :
                                                        <>
                                                            <div className="divClassFlex">
                                                                <i className="fa fa-battery-0" style={{ fontSize: '24px' }}></i> 0%
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            } */}
                                                </>
                                            }
                                        </>

                                    }
                                </>
                            }
                        </td>
                        <td>
                            {singleData && (singleData.child1DeviceBattery === 'Inactive' || singleData.child1DeviceBattery === 'InActive' || (child1Status === "InActive" || child1Status === "Inactive")) ?
                                <div className="divClassFlex">
                                    <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> Inactive
                                </div>
                                :
                                <>
                                    {singleData && (singleData.child1DeviceBattery && parseInt(singleData.child1DeviceBattery) === 100 || singleData.child1DeviceBattery == '100')
                                        ?
                                        <div className="divClassFlex">
                                            <i className="fa fa-battery-full" style={{ fontSize: '24px', color: 'green' }}></i> 100%
                                        </div>
                                        :
                                        <>
                                            {singleData && (singleData.child1DeviceBattery && parseInt(singleData.child1DeviceBattery) === 70 || singleData.child1DeviceBattery == '70')
                                                ?
                                                <div className="divClassFlex">
                                                    <i className="fa fa-battery-three-quarters" style={{ fontSize: '24px', color: 'blue' }}></i>  70%

                                                </div>
                                                :
                                                <>
                                                    <div className="divClassFlex">
                                                        <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> 20%
                                                    </div>
                                                    {/* {singleData && singleData.child1DeviceBattery <= 50 && singleData.child1DeviceBattery > 25
                                                ?
                                                <div className="divClassFlex">
                                                    <i className="fa fa-battery-half" style={{ fontSize: '24px', color: '#F0851B' }}></i>  50%
                                                </div>
                                                :
                                                <>
                                                    {singleData && singleData.child1DeviceBattery <= 25 && singleData.child1DeviceBattery > 0
                                                        ?
                                                        <div className="divClassFlex">
                                                            <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> 25%
                                                        </div>
                                                        :
                                                        <>
                                                            <div className="divClassFlex">
                                                                <i className="fa fa-battery-0" style={{ fontSize: '24px' }}></i> 0%
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            } */}
                                                </>
                                            }
                                        </>

                                    }
                                </>
                            }
                        </td>
                        <td>
                            {singleData && (singleData.child2DeviceBattery === 'Inactive' || singleData.child2DeviceBattery === 'InActive' || (child2Status === "InActive" || child2Status === "Inactive")) ?
                                <div className="divClassFlex">
                                    <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> Inactive
                                </div>
                                :
                                <>
                                    {singleData && (singleData.child2DeviceBattery && parseInt(singleData.child2DeviceBattery) === 100 || singleData.child2DeviceBattery == '100')
                                        ?
                                        <div className="divClassFlex">
                                            <i className="fa fa-battery-full" style={{ fontSize: '24px', color: 'green' }}></i> 100%
                                        </div>
                                        :
                                        <>
                                            {singleData && (singleData.child2DeviceBattery && parseInt(singleData.child2DeviceBattery) === 70 || singleData.child2DeviceBattery == '70')
                                                ?
                                                <div className="divClassFlex">
                                                    <i className="fa fa-battery-three-quarters" style={{ fontSize: '24px', color: 'blue' }}></i>  70%

                                                </div>
                                                :
                                                <>
                                                    <div className="divClassFlex">
                                                        <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> 20%
                                                    </div>
                                                    {/* {singleData && singleData.child2DeviceBattery <= 50 && singleData.child2DeviceBattery > 25
                                                ?
                                                <div className="divClassFlex">
                                                    <i className="fa fa-battery-half" style={{ fontSize: '24px', color: '#F0851B' }}></i>  50%
                                                </div>
                                                :
                                                <>
                                                    {singleData && singleData.child2DeviceBattery <= 25 && singleData.child2DeviceBattery > 0
                                                        ?
                                                        <div className="divClassFlex">
                                                            <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> 25%
                                                        </div>
                                                        :
                                                        <>
                                                            <div className="divClassFlex">
                                                                <i className="fa fa-battery-0" style={{ fontSize: '24px' }}></i> 0%
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            } */}
                                                </>
                                            }
                                        </>
                                    }
                                </>
                            }
                        </td>


                    </tr>
                </CommonStyle.TABLE>
            </CommonStyle.MainDiv>
        )
    }
}
export default withRouter(connect(null, null)(DeviceBatteryStatusDetails));
