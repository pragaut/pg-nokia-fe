import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants';
import { getAntennaRotataionDetails} from '../../../../actions/aisu/working.action';
import Wrapper from '../../../shared/Wrapper'
import Gap from '../../../comman/Gap';
import { hideError, showError } from '../../../../actions/comman/error.actions';
import * as WorkingTypes from '../../../../action-types/aisu/working.action.types'; 
import * as CommonStyle from '../../../comman/commonStyle';
import DatatableView from '../../../comman/ReactTableComponent';
import AntennaRotationDetailLogs from './antennaRotationDetailLogs';
import style from '../../../../theme/app.scss';
class AntennaRotationDetails extends Wrapper {
    configs = [];

    constructor(props) {

        super(props);
        this.state = {
            antennaRotationDetails: [],
            antennaRotationDetail: {},
            isAnteenaRotationDetailLogs:false,
            antennaRotationDetailId : null,
            towerName : null,
            antennaName : null,
            type: WorkingTypes.ANTENNAROTATIONDETAILS_INIT,
            columns: []
        };

        // let's load the data from the props
    }

    onClickViewDetailLogDetails = (id, towerName, antennaName) =>{
                this.setState({
                    isAnteenaRotationDetailLogs : true,
                    antennaRotationDetailId : id,
                    towerName : towerName,
                    antennaName : antennaName,
                }) 
    }

    onClickBackButton = () =>{
        this.setState({
                    isAnteenaRotationDetailLogs : false,
                    antennaRotationDetailId : null,
                    towerName : null,
                    antennaName : null,
        })
    }

    updateStateAfterStateUpdate = () => {
        let columns = [   
            {
                Header: 'Action',
                accessor: 'id',
                id: 'id',
                show: true,
                filterable: false,
                Cell: p => (
                    <React.Fragment>

                        {p.original.id  && p.original.id !==null &&
                            <button className="primary" value={p.original.id} onClick={() =>
                                this.onClickViewDetailLogDetails(p.original.id, p.original.towerName, p.original.antennaName )
                            }>
                                View Details
                            </button>
                        }
                    </React.Fragment>
                ), 
            },       
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
                Header: 'Update On',
                accessor: d => `${d.modifiedOn}`,
                id: 'modifiedOn',
                show: true, 
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
        //console.log("Antenna Rotataion Details", this.state.antennaRotationDetails);
        const { showEditPopup, columns, antennaRotationDetails, isAnteenaRotationDetailLogs, antennaRotationDetailId ,antennaName, towerName} = this.state;
        return ( 
            <CommonStyle.MainDiv
                flexdirection={"column"}
                width={"100%"}
                textalign={"left"}
                justifycontent={"flex-start"}
                alignitems={"baseline"}
            > 
            {isAnteenaRotationDetailLogs && isAnteenaRotationDetailLogs ===true && 
            <>
             <div className={style.back_button} >
            
                    <button
                        style={{ width: '100px', marginRight: '10px', paddingTop : '0px !important' }}
                        className={style.primary_btn}  
                        onClick={() =>this.onClickBackButton()}>Back</button>    
            </div>
                 {/* <button className="primary" onClick={() =>
                                this.onClickBackButton()
                            }>
                               Back
                            </button> */}
            </>
            }
            {isAnteenaRotationDetailLogs && isAnteenaRotationDetailLogs ===true ? 
            <AntennaRotationDetailLogs 
            antennaRotationDetailId = {antennaRotationDetailId}
            antennaName = {antennaName}
            towerName = {towerName}
            /> :
       
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
                            Data={antennaRotationDetails}
                            isColumnUpdate={true}
                            updateColumn={this.updateColumn}
                            columns={columns}
                        />
                    </div>
                </CommonStyle.MainDiv>
            }
                <Gap h="2rem" />
            </CommonStyle.MainDiv>
        );
    }
}



const mapStateToProps = state => {
    const {  antennaRotationDetails, antennaRotationDetail } = state.workingReducerAisu;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return {  antennaRotationDetails, antennaRotationDetail, errorType, errorMessage };
};

export default connect(mapStateToProps, { getAntennaRotataionDetails, hideError })(AntennaRotationDetails);