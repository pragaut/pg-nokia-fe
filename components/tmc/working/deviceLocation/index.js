import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getDeviceLocationDetails } from '../../../../actions/tmc/working.action'
import MyMap from './deviceMap';
import * as CommonStyle from '../../../comman/commonStyle';
import { Button } from '../../../comman/formStyle';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  padding: 0px 20px;
`;

class Index extends Component {

    state = {
        deviceLocationDetail: {},
        deviceLocationDetails: []
    };

    // componentWillMount() {
    //     //this.setCurrentLocation();
    // }

    componentDidMount() {
        this.props.getDeviceLocationDetails();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.deviceLocationDetails && nextProps.deviceLocationDetails !== null && nextProps.deviceLocationDetails != this.state.deviceLocationDetails) {
            this.setState({ deviceLocationDetails: nextProps.deviceLocationDetails })
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };

    refreshData = () => { 
        this.props.getDeviceLocationDetails();
    }

    render() {
        const {
            places, mapApiLoaded, mapInstance, mapApi, deviceLocationDetails
        } = this.state;
        const APIKEY = process.env.GOOGLE_MAP_KEY;
        // console.log("Tower Active Details : >>>>>>>>", towerActiveDetails);
        return (
            <Wrapper>
                 <div style={{ zIndex: '100', position: 'fixed', top: '100px', left: '40px' }}>
                    <div style={{ backgroundColor: '#ffffff', color: '#000000', height: '40px', width: '170px' }}>
                        <div style={{ paddingTop: '5px',paddingLeft: '10px', display: 'flex', flexDirection: 'row', alignContent: 'left', justifyContent: 'flext-start', alignItems: 'center' }}>
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
                        </div>

                    </div>
                </div>
                <div style={{ zIndex: '100', position: 'fixed', bottom: '50px', left: '40px' }}>
                    <div style={{ backgroundColor: '#ffffff', color: '#000000', height: '40px', width: '170px' }}>
                        <div style={{ paddingTop: '5px', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                            /> Passive
                             <img
                                src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                            /> Active
                        </div>

                    </div>
                </div>
                <MyMap MapData={deviceLocationDetails} />

            </Wrapper >
        );
    }
}
const mapStateToProps = state => {
    const { deviceLocationDetail, deviceLocationDetails } = state.workingReducerTmc;

    return { deviceLocationDetails, deviceLocationDetail };
};

export default connect(mapStateToProps, { getDeviceLocationDetails })(Index);