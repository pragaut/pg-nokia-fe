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
                            Device Status
                        </th>
                        <th>
                            Child 1 Status
                        </th>
                        <th>
                            Child 2 Status
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
                            <td style={{ background: deviceStatus === 'Connected' ? 'green' : 'red' }}>
                                {deviceStatus}
                            </td>
                            <td style={{ background: child1Status === 'Connected' ? 'green' : 'red' }}>
                                {child1Status}
                            </td>
                            <td style={{ background: child2Status === 'Connected' ? 'green' : 'red' }}>
                                {child2Status}
                            </td>
                            <td>
                                {item.lastUpdatedOn && item.lastUpdatedOn !== null ? moment(item.startDateTime).format("DD-MMM-YYYY hh:mm:ss a") : ''}
                            </td>
                        </tr>
                    })  }
                </CommonStyle.TABLE>
            </CommonStyle.MainDiv>
        )
    }
}
export default withRouter(connect(null, null)(DeviceBatteryStatusDetails));
