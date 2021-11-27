import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants';
import { getAntennaRotataionDetailLogs} from '../../../../actions/aisu/working.action';
import Wrapper from '../../../shared/Wrapper'
import Gap from '../../../comman/Gap';
import { hideError, showError } from '../../../../actions/comman/error.actions';
import * as WorkingTypes from '../../../../action-types/aisu/working.action.types'; 
import * as CommonStyle from '../../../comman/commonStyle';
import DatatableView from '../../../comman/ReactTableComponent';

class AntennaRotationDetailLogs extends Wrapper {
    configs = [];

    constructor(props) {

        super(props);
        this.state = {
            antennaRotationDetailLogs: [],
            antennaRotationDetailLog: {},
            antennaRotationDetailId : props.antennaRotationDetailId ? props.antennaRotationDetailId : '',
            type: WorkingTypes.ANTENNAROTATIONDETAILLOGS_INIT,
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
        if(nextProps && nextProps.antennaRotationDetailLogs && nextProps.antennaRotationDetailLogs !== this.state.antennaRotationDetailLogs) {
            this.setState({ antennaRotationDetailLogs: nextProps.antennaRotationDetailLogs })
        }
        if(nextProps && nextProps.antennaRotationDetailId && nextProps.antennaRotationDetailId !== this.state.antennaRotationDetailId) {
            this.props.getAntennaRotataionDetailLogs(nextProps.antennaRotationDetailId);
            this.setState({ antennaRotationDetailId: nextProps.antennaRotationDetailId })
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
        this.props.getAntennaRotataionDetailLogs(this.state.antennaRotationDetailId); 
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    };  
    updateColumn = (column) => {
        this.setState({ columns: column });
    } 
    render() { 
        console.log("Antenna Rotataion Detail Logs :---->>>>>>", this.state.antennaRotationDetailLogs);
        const { showEditPopup, columns, antennaRotationDetailLogs } = this.state;
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
                    </CommonStyle.MainDiv>
                    <div
                        style={{ width: '98%' , padding: "13px"}}
                    >
                        <DatatableView
                            Data={antennaRotationDetailLogs}
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
    const {  antennaRotationDetailLogs, antennaRotationDetailLog } = state.workingReducerAisu;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return {  antennaRotationDetailLogs, antennaRotationDetailLog, errorType, errorMessage };
};

export default connect(mapStateToProps, { getAntennaRotataionDetailLogs, hideError })(AntennaRotationDetailLogs);