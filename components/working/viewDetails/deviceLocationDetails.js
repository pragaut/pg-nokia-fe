import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getDeviceLocationDetails} from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import { hideError, showError } from '../../../actions/error.actions';
import * as WorkingTypes from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';
import * as CommonStyle from '../../commonStyle';
import DatatableView from '../../ReactTableComponent';
import MapGeoLocation from '../map/MyGoogleMap';

class DeviceLocationDetails extends Wrapper {
    configs = [];

    constructor(props) {

        super(props);
        this.state = {
            deviceLocationDetails: [],
            deviceLocationDetail: {},
            type: WorkingTypes.DEVICELOCATIONDETAILS_INIT,
            columns: []
        };

        // let's load the data from the props
    }

    updateStateAfterStateUpdate = () => {
        let columns = [ ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.deviceLocationDetails && nextProps.deviceLocationDetails !== this.state.deviceLocationDetails) {
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


    async componentDidMount() {
        // let's load the groups, for first time
        this.props.getDeviceLocationDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    };  
    onClickReferesh = (async) => {
        this.props.getDeviceLocationDetails(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    } 
    render() {
        console.log("Antenna Rotataion Details", this.state.deviceLocationDetails);
        const { showEditPopup, columns, deviceLocationDetails } = this.state;
        return (
            <CommonStyle.MainDiv
                flexdirection={"column"}
                width={"100%"}
                textalign={"left"}
                justifycontent={"flex-start"}
                alignitems={"baseline"}
            > 
                <CommonStyle.MainDiv
                    flexdirection={"column"}
                    width={"100%"}
                    justifycontent={"flex-start"}
                    alignitems={"baseline"}
                > 
                        <CommonStyle.MainWrapper className="main-wrapper">
                            <MapGeoLocation 
                            >
                            </MapGeoLocation>
                        </CommonStyle.MainWrapper>
                </CommonStyle.MainDiv> 
            </CommonStyle.MainDiv>
        );
    }
}



const mapStateToProps = state => {
    const {  antennaRotationDetails, antennaRotationDetail } = state.workingReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return {  antennaRotationDetails, antennaRotationDetail, errorType, errorMessage };
};

export default connect(mapStateToProps, { getDeviceLocationDetails, hideError })(DeviceLocationDetails);