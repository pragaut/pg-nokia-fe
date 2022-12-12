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
            deviceStatusDetails: props.deviceStatusDetails ? props.deviceStatusDetails : [],
        }
    };
    componentDidMount() {
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
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
        const { deviceStatusDetails } = this.state;
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                <CommonStyle.TABLE
                    tdPadding={"8px"}
                    thPadding={"8px"}
                >
                    <tr>
                        <th>
                            Device ID
                        </th>
                        <th>
                            Device Connectivity <br />With Internet
                        </th>
                        <th>
                            Child 1 Connectivity <br />With Device
                        </th>
                        <th>
                            Child 2 Connectivity <br />With Device
                        </th>
                        <th>
                            Height (M)
                        </th>
                        <th>
                            Height Status
                        </th>
                        <th>
                            Updated On
                        </th>
                    </tr>
                    {deviceStatusDetails && deviceStatusDetails.length > 0 && deviceStatusDetails.map((item, index) => {
                        let deviceStatus = item.deviceStatus && item.deviceStatus;
                        let child1Status = item.child1Status && item.child1Status;
                        let child2Status = item.child2Status && item.child2Status;
                        return <tr key={index}>
                            <td>
                                {item.uniqueId}
                            </td>
                            <td style={{ background: deviceStatus === 'Connected' ? 'green' : 'red', color: '#fff' }}>
                                {deviceStatus}
                            </td>
                            <td style={{ background: child1Status === 'Connected' ? 'green' : 'red', color: '#fff' }}>
                                {child1Status}
                            </td>
                            <td style={{ background: child2Status === 'Connected' ? 'green' : 'red', color: '#fff' }}>
                                {child2Status}
                            </td>
                            <td >
                                {item.userHeight1}
                            </td>
                            <td >
                                {item.heightStatus && item.heightStatus === 'Asc' ?
                                    <i className='fa fa-arrow-up' style={{ color: 'green', fontSize: '20px' }}  ></i>
                                    :
                                    <>
                                        {item.heightStatus && item.heightStatus === 'Desc' ?
                                            <i className='	fa fa-arrow-down' style={{ color: 'orange', fontSize: '20px' }}  ></i>
                                            :
                                            <span>{item.heightStatus == "Start" ? "Not Climbing" : item.heightStatus}</span>
                                        }
                                    </>
                                }
                            </td>
                            <td>
                                {item.lastUpdatedOn && item.lastUpdatedOn !== null ? moment(item.lastUpdatedOn).format("DD-MMM-YYYY | hh:mm:ss a") : ''}
                            </td>
                        </tr>
                    })}
                </CommonStyle.TABLE>
            </CommonStyle.MainDiv>
        )
    }
}
export default withRouter(connect(null, null)(DeviceBatteryStatusDetails));
