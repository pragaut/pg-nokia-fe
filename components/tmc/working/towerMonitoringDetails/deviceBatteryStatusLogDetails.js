import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';
import ReactTable from '../../../comman/ReactTableComponent/simpleReactTable';


class DeviceBatteryStatusDetails extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            deviceBatteryStatusLogs: props.deviceBatteryStatusLogs ? props.deviceBatteryStatusLogs : [],
            columns: []

        }
    };
    functionToSetColumns = () => {
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
                Header: 'Main Device',
                accessor: 'mainDeviceBattery',
                id: 'mainDeviceBattery',
                Cell: singleData => (
                    <React.Fragment>
                        {singleData.original && singleData.original.mainDeviceBattery === 100
                            ?
                            <div className="divClassFlex">
                                <i className="fa fa-battery-full" style={{ fontSize: '24px', color: 'green' }}></i> {singleData.original.mainDeviceBattery}%
                            </div>
                            :
                            <>
                                {singleData.original && singleData.original.mainDeviceBattery === 70
                                    ?
                                    <div className="divClassFlex">
                                        <i className="fa fa-battery-three-quarters" style={{ fontSize: '24px', color: 'blue' }}></i>  {singleData.original.mainDeviceBattery}%

                                    </div>
                                    :
                                    <>
                                        <div className="divClassFlex">
                                            <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> {singleData.original.mainDeviceBattery}%
                                        </div>
                                        {/* {singleData.original && singleData.original.mainDeviceBattery <= 50 && singleData.original.mainDeviceBattery > 25
                                                    ?
                                                    <div className="divClassFlex">
                                                        <i className="fa fa-battery-half" style={{ fontSize: '24px', color: 'blue' }}></i>  {singleData.original.mainDeviceBattery}%
                                                    </div>
                                                    :
                                                    <>
                                                        {singleData.original && singleData.original.mainDeviceBattery <= 25 && singleData.original.mainDeviceBattery > 0
                                                            ?
                                                            <div className="divClassFlex">
                                                                <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> {singleData.original.mainDeviceBattery}%
                                                            </div>
                                                            :
                                                            <>
                                                                <div className="divClassFlex">
                                                                    <i className="fa fa-battery-0" style={{ fontSize: '24px' }}></i> 0%
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                } */}
                                    </>
                                }
                            </>

                        }
                    </React.Fragment>
                ),
                show: true,
            },
            {
                Header: 'child 1',
                accessor: 'child1DeviceBattery',
                id: 'child1DeviceBattery',
                Cell: singleData => (
                    <React.Fragment>
                        {singleData.original && singleData.original.child1DeviceBattery > 75
                            ?
                            <div className="divClassFlex">
                                <i className="fa fa-battery-full" style={{ fontSize: '24px', color: 'green' }}></i> 100%
                            </div>
                            :
                            <>
                                {singleData.original && singleData.original.child1DeviceBattery <= 75 && singleData.original.child1DeviceBattery > 50
                                    ?
                                    <div className="divClassFlex">
                                        <i className="fa fa-battery-three-quarters" style={{ fontSize: '24px', color: 'green' }}></i>  75%

                                    </div>
                                    :
                                    <>
                                        {singleData.original && singleData.original.child1DeviceBattery <= 50 && singleData.original.child1DeviceBattery > 25
                                            ?
                                            <div className="divClassFlex">
                                                <i className="fa fa-battery-half" style={{ fontSize: '24px', color: '#F0851B' }}></i>  50%
                                            </div>
                                            :
                                            <>
                                                {singleData.original && singleData.original.child1DeviceBattery <= 25 && singleData.original.child1DeviceBattery > 0
                                                    ?
                                                    <div className="divClassFlex">
                                                        <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> 25%
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="divClassFlex">
                                                            <i className="fa fa-battery-0" style={{ fontSize: '24px' }}></i> 0%
                                                        </div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </>

                        }
                    </React.Fragment>
                ),
                show: true,
            },
            {
                Header: 'child 2',
                accessor: 'child2DeviceBattery',
                id: 'child2DeviceBattery',
                Cell: singleData => (
                    <React.Fragment>
                        {singleData.original && singleData.original.child2DeviceBattery > 75
                            ?
                            <div className="divClassFlex">
                                <i className="fa fa-battery-full" style={{ fontSize: '24px', color: 'green' }}></i> 100%
                            </div>
                            :
                            <>
                                {singleData.original && singleData.original.child2DeviceBattery <= 75 && singleData.original.child2DeviceBattery > 50
                                    ?
                                    <div className="divClassFlex">
                                        <i className="fa fa-battery-three-quarters" style={{ fontSize: '24px', color: 'green' }}></i>  75%
                                    </div>
                                    :
                                    <>
                                        {singleData.original && singleData.original.child2DeviceBattery <= 50 && singleData.original.child2DeviceBattery > 25
                                            ?
                                            <div className="divClassFlex">
                                                <i className="fa fa-battery-half" style={{ fontSize: '24px', color: '#F0851B' }}></i>  50%
                                            </div>
                                            :
                                            <>
                                                {singleData.original && singleData.original.child2DeviceBattery <= 25 && singleData.original.child2DeviceBattery > 0
                                                    ?
                                                    <div className="divClassFlex">
                                                        <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> 25%
                                                    </div>
                                                    :
                                                    <>
                                                        <div className="divClassFlex">
                                                            <i className="fa fa-battery-0" style={{ fontSize: '24px' }}></i> 0%
                                                        </div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </>
                        }
                    </React.Fragment>
                ),
                show: true,
            },
            {
                Header: 'Updated At',
                id: 'createdOn',
                accessor: d => `${d.createdOn && d.createdOn !== null ? moment(d.createdOn).format("DD-MMM-YYYY hh:mm:ss a") : ''} `,
                show: true,
            },
        ]
        this.setState({ columns: columns });
    }
    componentDidMount() {
        this.functionToSetColumns();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.deviceBatteryStatusLogs && nextProps.deviceBatteryStatusLogs !== this.state.deviceBatteryStatusLogs) {
            this.setState({ deviceBatteryStatusLogs: nextProps.deviceBatteryStatusLogs })
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
    render() {
        const { deviceBatteryStatusLogs, columns } = this.state;
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                <ReactTable
                    defaultPageSize={10}
                    Data={deviceBatteryStatusLogs ? deviceBatteryStatusLogs : []}
                    filter={true}
                    updateColumn={this.updateColumn}
                    columns={columns}
                />
                {/* <CommonStyle.TABLE
                    tdPadding={"6px"}
                    thPadding={"6px"}
                >
                    <tr>
                        <th>
                            Main Device
                        </th>
                        <th>
                            Child 1
                        </th>
                        <th>
                            Child 2
                        </th>
                    </tr>
                    {deviceBatteryStatusLogs && deviceBatteryStatusLogs.length > 0 && deviceBatteryStatusLogs.map((singleData, index) => {
                        return <tr key={index} >
                            <td>
                                {singleData && singleData.mainDeviceBattery > 75
                                    ?
                                    <div className="divClassFlex">
                                        <i className="fa fa-battery-full" style={{ fontSize: '24px', color: 'green' }}></i> 100%
                                    </div>
                                    :
                                    <>
                                        {singleData && singleData.mainDeviceBattery <= 75 && singleData.mainDeviceBattery > 50
                                            ?
                                            <div className="divClassFlex">
                                                <i className="fa fa-battery-three-quarters" style={{ fontSize: '24px', color: 'green' }}></i>  75%

                                            </div>
                                            :
                                            <>
                                                {singleData && singleData.mainDeviceBattery <= 50 && singleData.mainDeviceBattery > 25
                                                    ?
                                                    <div className="divClassFlex">
                                                        <i className="fa fa-battery-half" style={{ fontSize: '24px', color: '#F0851B' }}></i>  50%
                                                    </div>
                                                    :
                                                    <>
                                                        {singleData && singleData.mainDeviceBattery <= 25 && singleData.mainDeviceBattery > 0
                                                            ?
                                                            <div className="divClassFlex">
                                                                <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> 25%
                                                            </div>
                                                            :
                                                            <>
                                                                <div className="divClassFlex">
                                                                    <i className="fa fa-battery-0" style={{ fontSize: '24px' }}></i> 0%
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                    </>

                                }
                            </td>
                            <td>
                                {singleData && singleData.child1DeviceBattery > 75
                                    ?
                                    <div className="divClassFlex">
                                        <i className="fa fa-battery-full" style={{ fontSize: '24px', color: 'green' }}></i> 100%
                                    </div>
                                    :
                                    <>
                                        {singleData && singleData.child1DeviceBattery <= 75 && singleData.child1DeviceBattery > 50
                                            ?
                                            <div className="divClassFlex">
                                                <i className="fa fa-battery-three-quarters" style={{ fontSize: '24px', color: 'green' }}></i>  75%

                                            </div>
                                            :
                                            <>
                                                {singleData && singleData.child1DeviceBattery <= 50 && singleData.child1DeviceBattery > 25
                                                    ?
                                                    <div className="divClassFlex">
                                                        <i className="fa fa-battery-half" style={{ fontSize: '24px', color: '#F0851B' }}></i>  50%
                                                    </div>
                                                    :
                                                    <>
                                                        {singleData && singleData.child1DeviceBattery <= 25 && singleData.child1DeviceBattery > 0
                                                            ?
                                                            <div className="divClassFlex">
                                                                <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> 25%
                                                            </div>
                                                            :
                                                            <>
                                                                <div className="divClassFlex">
                                                                    <i className="fa fa-battery-0" style={{ fontSize: '24px' }}></i> 0%
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                    </>

                                }
                            </td>
                            <td>
                                {singleData && singleData.child2DeviceBattery > 75
                                    ?
                                    <div className="divClassFlex">
                                        <i className="fa fa-battery-full" style={{ fontSize: '24px', color: 'green' }}></i> 100%
                                    </div>
                                    :
                                    <>
                                        {singleData && singleData.child2DeviceBattery <= 75 && singleData.child2DeviceBattery > 50
                                            ?
                                            <div className="divClassFlex">
                                                <i className="fa fa-battery-three-quarters" style={{ fontSize: '24px', color: 'green' }}></i>  75%

                                            </div>
                                            :
                                            <>
                                                {singleData && singleData.child2DeviceBattery <= 50 && singleData.child2DeviceBattery > 25
                                                    ?
                                                    <div className="divClassFlex">
                                                        <i className="fa fa-battery-half" style={{ fontSize: '24px', color: '#F0851B' }}></i>  50%
                                                    </div>
                                                    :
                                                    <>
                                                        {singleData && singleData.child2DeviceBattery <= 25 && singleData.child2DeviceBattery > 0
                                                            ?
                                                            <div className="divClassFlex">
                                                                <i className="fa fa-battery-quarter" style={{ fontSize: '24px', color: 'red' }}></i> 25%
                                                            </div>
                                                            :
                                                            <>
                                                                <div className="divClassFlex">
                                                                    <i className="fa fa-battery-0" style={{ fontSize: '24px' }}></i> 0%
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                    </>

                                }
                            </td>


                        </tr>
                    })

                    }

                </CommonStyle.TABLE> */}
            </CommonStyle.MainDiv>
        )
    }
}
export default withRouter(connect(null, null)(DeviceBatteryStatusDetails));
