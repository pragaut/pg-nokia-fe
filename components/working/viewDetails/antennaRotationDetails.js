import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getAntennaRotataionDetails} from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import { hideError, showError } from '../../../actions/error.actions';
import * as WorkingTypes from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';
import * as CommonStyle from '../../commonStyle';
import DatatableView from '../../ReactTableComponent';

class AntennaRotationDetails extends Wrapper {
    configs = [];

    constructor(props) {

        super(props);
        this.state = {
            antennaRotationDetails: [],
            antennaRotationDetail: {},
            type: WorkingTypes.ANTENNAROTATIONDETAILS_INIT,
            columns: []
        };

        // let's load the data from the props
    }

    updateStateAfterStateUpdate = () => {
        let columns = [          
            {
                Header: 'Sr#',
                minWidth: 50,
                id: 'srnumber',
                show: true,
                Cell: row => (
                    <React.Fragment>
                        {row.index + 1}
                    </React.Fragment>
                ),
                sortable: true,
                filterable: false
            },
            {
                Header: 'Tower Name',
                accessor: d => `${d.towerName}`,
                id: 'towerName',
                show: true, 
            },
            {
                Header: 'Antenna',
                accessor: d => `${d.antennaName}`,
                id: 'antennaName',
                show: true,
                minWidth: 150,
            },
            {
                Header: 'Azimuth Current',
                accessor: d => `${d.azimuth}`,
                id: 'azimuth',
                show: true              
            }, 
            {
                Header: 'Azimuth Previous',
                accessor: d => `${d.azimuthPrev}`,
                id: 'azimuthPrev',
                show: true              
            }, 
            {
                Header: 'Height Current',
                accessor: d => `${d.height}`,
                id: 'height',
                show: true              
            }, 
            {
                Header: 'Height Previous',
                accessor: d => `${d.heightPrev}`,
                id: 'heightPrev',
                show: true              
            }, 
            {
                Header: 'Direction Current',
                accessor: d => `${d.direction}`,
                id: 'direction',
                show: true              
            }, 
            {
                Header: 'Direction Previous',
                accessor: d => `${d.directionPrev}`,
                id: 'directionPrev',
                show: true              
            }, 
            {
                Header: 'TiltX Current',
                accessor: d => `${d.tiltX}`,
                id: 'tiltX',
                show: true              
            }, 
            {
                Header: 'TiltX Previous',
                accessor: d => `${d.tiltXPrev}`,
                id: 'tiltXPrev',
                show: true              
            }, 
            {
                Header: 'TiltY Current',
                accessor: d => `${d.tiltY}`,
                id: 'tiltY',
                show: true              
            }, 
            {
                Header: 'TiltY Previous',
                accessor: d => `${d.tiltYPrev}`,
                id: 'tiltYPrev',
                show: true              
            }, 
            {
                Header: 'TiltZ Current',
                accessor: d => `${d.tiltZ}`,
                id: 'tiltZ',
                show: true              
            }, 
            {
                Header: 'TiltZ Previous',
                accessor: d => `${d.tiltZPrev}`,
                id: 'tiltZPrev',
                show: true              
            }
        ]
        this.setState({ columns: columns });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.antennaRotationDetails && nextProps.antennaRotationDetails !== this.state.antennaRotationDetails) {
            this.setState({ antennaRotationDetails: nextProps.antennaRotationDetails })
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
        this.props.getAntennaRotataionDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    };  
    onClickReferesh = (async) => {
        this.props.getAntennaRotataionDetails(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    } 
    render() {
        console.log("Antenna Rotataion Details", this.state.antennaRotationDetails);
        const { showEditPopup, columns, antennaRotationDetails } = this.state;
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
                    <CommonStyle.MainDiv
                        width={"100%"}
                        flexdirection={"row"}
                        justifycontent={"flex-start"}
                    > 
                        <CommonStyle.Button_Header
                            onClick={() => this.onClickReferesh()}
                        >
                            <i className="fas fa-sync-alt"></i>
                        </CommonStyle.Button_Header>
                    </CommonStyle.MainDiv>
                    <div
                        style={{ width: '98%' }}
                    >
                        <DatatableView
                            Data={antennaRotationDetails}
                            isColumnUpdate={true}
                            updateColumn={this.updateColumn}
                            columns={columns}
                        />
                    </div>
                </CommonStyle.MainDiv>
                <Gap h="2rem" />
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

export default connect(mapStateToProps, { getAntennaRotataionDetails, hideError })(AntennaRotationDetails);