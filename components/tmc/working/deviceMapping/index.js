import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants';
import { getDeviceMappingDetails } from '../../../../actions/tmc/working.action';
import { getRoleMasterData } from '../../../../actions/comman/admin.action'
import Wrapper from '../../../shared/Wrapper'
import Gap from '../../../comman/Gap';
import { hideError, showError } from '../../../../actions/comman/error.actions';
import * as WorkingTypes from '../../../../action-types/tmc/working.action.types';
import * as CommonStyle from '../../../comman/commonStyle';
import DatatableView from '../../../comman/ReactTableComponent';
import style from '../../../../theme/app.scss'; 
import { Icon } from "antd";
import { color } from 'highcharts';
class DeviceMappingDetails extends Wrapper {
    configs = [];

    constructor(props) {

        super(props);
        this.state = {
            deviceMappingDetails: [],
            deviceMappingDetail: {},
            roles: [],
            role: {},
            type: WorkingTypes.DEVICEMAPPINGDETAILS_INIT,
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
                Header: 'Device ID',
                accessor: d => `${d.uniqueId}`,
                id: 'uniqueId',
                show: true,
            },
            {
                Header: 'MAC Address',
                accessor: d => `${d.macAddress}`,
                id: 'macAddress',
                show: true,
            },
            {
                Header: 'Date',
                accessor: d => `${d.startDateTime}`,
                id: 'startDateTime',
                show: true,
            }
        ]

        const rolesName = this.state.roles;
        const MappingWithDeviceReguiredRoles = rolesName && rolesName.length > 0 && rolesName.filter((item) => item.isMappingWithDeviceRequired == true);
        //console.log("MappingWithDeviceReguiredRoles >>>>>>>",MappingWithDeviceReguiredRoles);
        MappingWithDeviceReguiredRoles && MappingWithDeviceReguiredRoles.length > 0 && MappingWithDeviceReguiredRoles.forEach(element => {
            let RolesArray = {
                Header: element.roleName,
                accessor: element.id,
                id: element.id,
                minWidth: 100,
                show: true
            }
            columns.push(RolesArray);       
        });

        let DataArray = [];
        const deviceMappingDetailData = this.state.deviceMappingDetails;
        //console.log("deviceMappingDetailData >>>>>>>", deviceMappingDetailData);
        deviceMappingDetailData && deviceMappingDetailData.length > 0 && deviceMappingDetailData.forEach(element => {
            let Single = {
                uniqueId: element.uniqueId,
                macAddress: element.macAddress,
                startDateTime: element.startDateTime,
            }
            let RoleCombinedData = element.towerMonitoringUserDetails;            
            
            if (RoleCombinedData) {
                let RoleCombinedDatanew =RoleCombinedData && RoleCombinedData.split('|');
                
                RoleCombinedDatanew.forEach(_element2 => { 
                    let element2NewArray = _element2 && _element2.split(','); 
                    let key = element2NewArray[0];
                    let Value = element2NewArray[1];
                    let stringValue  = Value && Value == 0 ? <React.Fragment><Icon style={{color:'red', fontSize:'12px'}} type="close" title="Not mapped" /></React.Fragment> : <React.Fragment><Icon style={{color:'green', fontSize:'12px'}} type="check" title="Mapped" /></React.Fragment> ;
                    const existingState = Object.assign({}, Single);
                    existingState[key] = stringValue;
                    Single = existingState;
                }); 
            }
            DataArray.push(Single);
        });
        this.setState({ columns: columns,DataArray:DataArray });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        
        if (nextProps && nextProps.deviceMappingDetails && nextProps.deviceMappingDetails !== this.state.deviceMappingDetails) {            
            
                this.setState({ deviceMappingDetails: nextProps.deviceMappingDetails }); 
                setTimeout(() => {
                    this.updateStateAfterStateUpdate();
                }, 100);
        }
        if (nextProps && nextProps.roles && nextProps.roles !== this.state.roles) {             
            this.setState({ roles: nextProps.roles })
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
        this.props.getDeviceMappingDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getRoleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    };
    // onClickReferesh = (async) => {
    //     this.props.getDeviceMappingDetails(0, constants.ALL_ROWS_LIST, undefined, undefined);
    //     setTimeout(() => {
    //         this.updateStateAfterStateUpdate();
    //     }, 100);
    // }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    render() {
        //console.log("Antenna Rotataion Details", this.state.antennaRotationDetails);
        const { showEditPopup, columns,DataArray, deviceMappingDetails, roles } = this.state; 
        console.log("DataArray >>>>>>>", DataArray);
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
                        style={{ width: '98%', padding: "13px" }}
                    >
                        <DatatableView
                            Data={DataArray ? DataArray : []}
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
    const { deviceMappingDetails, deviceMappingDetail } = state.workingReducerTmc;
    const { roles, role } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return { deviceMappingDetails, deviceMappingDetail, roles, role, errorType, errorMessage };
};

export default connect(mapStateToProps, { getDeviceMappingDetails, getRoleMasterData, hideError })(DeviceMappingDetails);