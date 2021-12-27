import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';


class NetworkConnectivityStatuDetailsIndex extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            networkConnectivityStatuDetails: props.networkConnectivityStatuDetails ? props.networkConnectivityStatuDetails : [],
        }
    };
    componentDidMount() {
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.networkConnectivityStatuDetails && nextProps.networkConnectivityStatuDetails !== this.state.networkConnectivityStatuDetails) {
            this.setState({ networkConnectivityStatuDetails: nextProps.networkConnectivityStatuDetails })
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
        const { networkConnectivityStatuDetails } = this.state;
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                <CommonStyle.TABLE
                 tdPadding={"6px"}
                 thPadding={"6px"}
                >
                    {networkConnectivityStatuDetails && networkConnectivityStatuDetails.length > 0 && networkConnectivityStatuDetails.map((item, index) => {
                        let wifi = item.wlanStatus && item.wlanStatus;
                        let dongle = item.wwanStatus && item.wwanStatus;
                        return <tr key={index}> 
                            <td style={{ background: wifi === 'Connected' ? 'green' : 'red' }}>
                                Mobile Hotspot
                            </td>
                            <td style={{ background: dongle === 'Connected' ? 'green' : 'red' }}>
                                Dongle
                            </td>
                        </tr>
                    })}
                </CommonStyle.TABLE>
            </CommonStyle.MainDiv>
        )
    }
}
export default withRouter(connect(null, null)(NetworkConnectivityStatuDetailsIndex));
