import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getTowerActiveDetails } from '../../../../actions/tmc/working.action'
import MyMap from './MyGoogleMap'
import { Button } from '../../../comman/formStyle';
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

class Index extends Component {

    state = {
        towerActiveDetail: {},
        towerActiveDetails: []
    };

    // componentWillMount() {
    //     //this.setCurrentLocation();
    // }

    componentDidMount() {
        this.props.getTowerActiveDetails(0, undefined, undefined, undefined);
    }

    refreshData = () => { 
        this.props.getTowerActiveDetails(0, undefined, undefined, undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.towerActiveDetails && nextProps.towerActiveDetails !== null && nextProps.towerActiveDetails != this.state.towerActiveDetails) {
            this.setState({ towerActiveDetails: nextProps.towerActiveDetails })
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };

    render() {
        const {
            places, mapApiLoaded, mapInstance, mapApi, towerActiveDetails
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
                {towerActiveDetails && towerActiveDetails.length > 0 &&
                    <MyMap MapData={towerActiveDetails} />
                }

            </Wrapper >
        );
    }
}
const mapStateToProps = state => {
    const { towerActiveDetail, towerActiveDetails } = state.workingReducerTmc;

    return { towerActiveDetail, towerActiveDetails };
};

export default connect(mapStateToProps, { getTowerActiveDetails })(Index);