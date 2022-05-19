import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import { getDeviceBatteryStatus, getTowerMonitoringDetails, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails } from '../../../../actions/tmc/working.action';
import { getDeviceRegistrationMasterData } from '../../../../actions/comman/admin.action';
import { Input } from '../../../comman/formStyle';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';
import { Button } from '../../../comman/formStyle';
import ReactTable from '../../../comman/ReactTableComponent';
import TowerMonitoringDetailsView from './towerMonitoringDetailsHistory';
import Select from 'react-select';
import { getTowerMasterData } from '../../../../actions/tmc/admin.action';
import { constants } from '../../../../utils/constants';


class TowerMonitoringHistoryDetailsIndex extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            towerMonitoringDetails: [],
            towerMonitoringDetail: {},
            columns: [],
            parameterWithValues: {},
            isViewDetailsPageVisible: false,
            towers: [],
            parametterValue: {},
            selectedTowerMasterOption: {},
            deviceRegistrations: [],
            selectedDeviceOption: {},
        }
    };
    functionToSetColumns = () => {
        let columns = [
            {
                Header: 'Action',
                accessor: 'id',
                id: 'id',
                show: true,
                Cell: propss => (
                    <React.Fragment>
                        <button className="info" style={{ marginRight: '10px' }} value={propss.original.id} onClick={() => this.onClickViewDetails(propss.original, propss.original.towerMonitoringDetailId, propss.original.deviceRegistrationDetailId, propss.original.macAddress)}>
                            View Details
                        </button>
                    </React.Fragment>
                ),
                sortable: false,
                filterable: false
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
                Header: 'Tower',
                accessor: 'towerName',
                id: 'towerName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Rigger',
                accessor: 'employeeName',
                id: 'employeeName',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Device Mac Address',
                accessor: 'macAddress',
                id: 'macAddress',
                minWidth: 100,
                show: false,
            },
            {
                Header: 'Device Unique ID',
                accessor: 'uniqueId',
                id: 'uniqueId',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Height',
                accessor: 'userHeight',
                id: 'userHeight',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Height Status',
                accessor: 'heightStatus',
                id: 'heightStatus',
                Cell: row => (
                    <React.Fragment>
                        {row.original.heightStatus && row.original.heightStatus === 'Asc' ?
                            <i className='fa fa-arrow-up' style={{ color: 'green', fontSize: '20px' }}  ></i>
                            :
                            <>
                                {row.original.heightStatus && row.original.heightStatus === 'Desc' ?
                                    <i className='	fa fa-arrow-down' style={{ color: 'orange', fontSize: '20px' }}  ></i>
                                    :
                                    <span>{row.original.heightStatus}</span>
                                }
                            </>
                        }
                    </React.Fragment>
                ),
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Clamp Status',
                accessor: 'ClampStatus',
                id: 'ClampStatus',
                minWidth: 100,
                Cell: row => (
                    <React.Fragment>
                        <div className={row.original.ClampStatus}>
                            <div>
                                {row.original.ClampStatus}
                            </div>
                        </div>
                    </React.Fragment>
                ),
                show: false,
            },
            {
                Header: 'Alarm Types',
                accessor: 'alarmTypes',
                id: 'alarmTypes',
                minWidth: 100,
                style: { 'white-space': "pre-wrap","text-align":'left' },
                show: true,
            },
            {
                Header: 'Start Time',
                accessor: d => `${d.startDateTime && d.startDateTime !== null ? moment(d.startDateTime).format("DD-MMM-YYYY hh:mm:ss a") : ''} `,
                id: 'startDateTime',
                minWidth: 100,
                show: true
            },
            {
                Header: 'End Time',
                accessor: d => `${d.endDateTime && d.endDateTime !== null ? moment(d.endDateTime).format("DD-MMM-YYYY hh:mm:ss a") : ''} `,
                id: 'endDateTime',
                minWidth: 100,
                show: true
            },
        ]
        this.setState({ columns: columns });
    }

    onClickViewDetails = (towerMonitoringDetail, towerMonitoringDetailId, deviceRegistrationDetailId, macAddress) => {
        let parameterWithValues = {
            towerMonitoringDetailId: towerMonitoringDetailId,
            deviceRegistrationDetailId: deviceRegistrationDetailId,
            macAddress: macAddress
        }
        this.setState({
            towerMonitoringDetail: towerMonitoringDetail,
            towerMonitoringDetailId: towerMonitoringDetailId,
            deviceRegistrationDetailId: deviceRegistrationDetailId,
            macAddress: macAddress,
            parameterWithValues: parameterWithValues,
            isViewDetailsPageVisible: true
        });
    }
    onClickBackButton = () => {
        this.setState({
            towerMonitoringDetail: {},
            towerMonitoringDetailId: null,
            deviceRegistrationDetailId: null,
            macAddress: null,
            parameterWithValues: {},
            isViewDetailsPageVisible: false
        });
    }
    componentDidMount() {
        let parametterValue = {
            isOnlyTodayDataRequired: 0
        }
        this.props.getTowerMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getTowerMonitoringDetails(parametterValue);
        this.props.getDeviceRegistrationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);

        // setInterval(() => { 
        //     this.props.getTowerMonitoringDetails();
        // }, 2000);
        this.functionToSetColumns();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.towerMonitoringDetails && nextProps.towerMonitoringDetails !== this.state.towerMonitoringDetails) {
            this.setState({ towerMonitoringDetails: nextProps.towerMonitoringDetails })
        }
        if (nextProps.towers !== null && nextProps.towers !== undefined && nextProps.towers !== this.state.towers) {
            this.setState({
                towers: nextProps.towers
            })
        }
        if (nextProps.deviceRegistrations && nextProps.deviceRegistrations !== null && nextProps.deviceRegistrations != this.state.deviceRegistrations) {
            this.setState({ deviceRegistrations: nextProps.deviceRegistrations })
        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }
    updateColumn = (column) => {
        this.setState({
            columns: column
        });
    }
    onValueChangeTower = selectedOption => {
        const existingState = Object.assign({}, this.state.parametterValue);
        existingState['towerMasterId'] = selectedOption.value;
        this.setState({ parametterValue: existingState, selectedTowerMasterOption: selectedOption });
    };
    onValueChanged = key => event => {
        const existingState = Object.assign({}, this.state.parametterValue);
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ parametterValue: existingState });
    };
    onValueChangeDevice = selectedOption => {
        const existingState = Object.assign({}, this.state.parametterValue);
        existingState['deviceRegistrationDetailId'] = selectedOption.value;
        this.setState({ parametterValue: existingState, selectedDeviceOption: selectedOption });
    };
    onClickSearch = () => {
        const parametterValue = this.state.parametterValue;
        this.props.getTowerMonitoringDetails(parametterValue);
    }
    refreshData = () => { 
        let parametterValue = {
            isOnlyTodayDataRequired: 0
        }
        this.props.getTowerMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getTowerMonitoringDetails(parametterValue);
        this.props.getDeviceRegistrationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);

        // setInterval(() => { 
        //     this.props.getTowerMonitoringDetails();
        // }, 2000);
        this.functionToSetColumns();
    }
    InputTextBoxDateField = props => {
        return <CommonStyle.InputControlsDiv
            width={props.width ? props.width : "15%"}
            padding="5px 10px 5px 5px"
        >
            <CommonStyle.InputLabel
                padding={"0px 0px 10px"}
                color={props.color ? props.color : "#000"}
            >
                {props.headerTitle}
            </CommonStyle.InputLabel>
            <CommonStyle.InputDiv>
                <Input
                    placeholderColor="#7c7c7c"
                    placeholder=""
                    value={props.SelectedValues}
                    paddingLeft="20px"
                    borderRadius="5px"
                    height="33px"
                    max={moment(new Date()).format("YYYY-MM-DD")}
                    type={props.type ? props.type : 'text'}
                    color="#000"
                    borderColor="#000"
                    style={{ backgroundColor: "transparent" }}
                    //  onBlur={this.onValueChanged(props.KeyName)} 
                    onChange={this.onValueChanged(props.KeyName)}
                />
            </CommonStyle.InputDiv>
        </CommonStyle.InputControlsDiv >
    }
    render() {
        const { pageCallFromPage } = this.props;
        const { columns, parametterValue, deviceRegistrations, selectedDeviceOption, towers, towerMonitoringDetails, towerMonitoringDetail, selectedTowerMasterOption, isViewDetailsPageVisible, parameterWithValues } = this.state;
        let towersOptions = [{ value: '', label: 'Select Tower' }]
        let towersOptionsnew = towers && towers.length > 0 ? towers.map((item, index) => {
            return { value: item.id, label: item.towerName }
        }) : [];
        towersOptions = towersOptions.concat(towersOptionsnew);

        let deviceOptions = [{ value: '', label: 'Select Device' }]
        let deviceOptionsnew = deviceRegistrations && deviceRegistrations.length > 0 ? deviceRegistrations.map((item, index) => {
            let labelv = item.uniqueId + " - " + item.macAddress;
            return { value: item.id, label: labelv }
        }) : [];
        deviceOptions = deviceOptions.concat(deviceOptionsnew);
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                {(!isViewDetailsPageVisible || isViewDetailsPageVisible === false) &&
                    <CommonStyle.MainDiv
                        justifycontent="flex-start"
                    >
                        <CommonStyle.InputControlsDiv
                            width="20%"
                            padding="5px 10px 5px 5px"
                        >
                            <span>Tower</span>
                            <Select
                                className="width100p"
                                value={selectedTowerMasterOption && selectedTowerMasterOption}
                                onChange={this.onValueChangeTower}
                                options={towersOptions}
                                closeMenuOnSelect={true}
                                isMulti={false}
                            />
                        </CommonStyle.InputControlsDiv>
                        <CommonStyle.InputControlsDiv
                            width="20%"
                            padding="5px 10px 5px 5px"
                        >
                            <span>Device</span>
                            <Select
                                className="width100p"
                                value={selectedDeviceOption && selectedDeviceOption}
                                onChange={this.onValueChangeDevice}
                                options={deviceOptions}
                                closeMenuOnSelect={true}
                                isMulti={false}
                            />
                        </CommonStyle.InputControlsDiv>
                        <this.InputTextBoxDateField
                            headerTitle={'From Date'}
                            SelectedValues={parametterValue.fromDate ? parametterValue.fromDate : ''} //{this.state.selfAuditPlan.auditFromDate}
                            KeyName="fromDate"
                            type="date"
                            width="15%"
                            color="#000"
                        />
                        <this.InputTextBoxDateField
                            headerTitle="To Date"
                            SelectedValues={parametterValue.toDate ? parametterValue.toDate : ''} //{this.state.selfAuditPlan.auditToDate}
                            KeyName="toDate"
                            type="date"
                            width="15%"
                            color="#000"
                        />
                        <CommonStyle.ButtonDiv
                            width="15%"
                            padding={"25px 0px 0px 0px"}
                        >
                            <Button
                                bgColor="#358856"
                                color="#ffffff"
                                height="35px"
                                width="48%"
                                lineheight="1"
                                bgChangeHover="#4FA64F"
                                hoverColor="#ffffff"
                                borderRadius={"10px"}
                                margin={"0px 5px 0px 0px"}
                                border="solid 1px #358856"
                                zIndex="0"
                                onClick={() => this.onClickSearch()}
                            >
                                Search
                    </Button>
                    
                        </CommonStyle.ButtonDiv>
                        <CommonStyle.ButtonDiv
                            width="15%"
                            padding={"30px 0px 0px 0px"}
                            justifycontent="flex-end"
                        >
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
                        </CommonStyle.ButtonDiv>
                    </CommonStyle.MainDiv>
                }
                {isViewDetailsPageVisible === true ?
                    <TowerMonitoringDetailsView
                        parameterWithValues={parameterWithValues}
                        isViewDetailsPageVisible={isViewDetailsPageVisible}
                        towerMonitoringDetail={towerMonitoringDetail}
                        onClickBackButton={this.onClickBackButton}
                        pageCallFromPage={pageCallFromPage}
                    />
                    :
                    <ReactTable
                        Data={towerMonitoringDetails ? towerMonitoringDetails : []}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumn}
                        columns={columns}
                    />
                }

            </CommonStyle.MainDiv>
        )
    }
}

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    const { towers, tower } = state.adminReducerTmc;
    const { deviceRegistrations } = state.adminReducer;

    const { deviceBatteryStatuss, towerMonitoringDetails, deviceStatusDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails } = state.workingReducerTmc;
    return { towers, tower, deviceRegistrations, errorType, errorMessage, deviceBatteryStatuss, towerMonitoringDetails, deviceStatusDetails, networkConnectivityStatuDetails, towerMonitoringSubDetails };
};
export default withRouter(connect(mapStateToProps, { getDeviceRegistrationMasterData, getTowerMasterData, getDeviceBatteryStatus, getTowerMonitoringDetails, getDeviceStatusDetails, getNetworkConnectivityStatuDetails, getTowerMonitoringSubDetails })(TowerMonitoringHistoryDetailsIndex));
