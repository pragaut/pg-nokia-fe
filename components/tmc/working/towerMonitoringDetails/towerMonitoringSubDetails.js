import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';
import ReactTable from '../../../comman/ReactTableComponent';

class TowerMonitoringSubDetailsIndex extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            towerMonitoringSubDetails:props.towerMonitoringSubDetails ? props.towerMonitoringSubDetails : [],
            columns: []
        }
    };
    functionToSetColumns = () => {
        let columns = [
            {
                Header: 'Sr#',
                minWidth: 40,
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
            // {
            //     Header: 'Sr#',
            //     accessor: 'dataOrder',
            //     id: 'dataOrder',
            //     minWidth: 100,
            //     show: true,
            // },
            {
                Header: 'User Height',
                accessor: 'userHeight1',
                id: 'userHeight1',
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
                            <i className='fa fa-arrow-up' style={{color:'green' , fontSize:'20px'}}  ></i>
                            :
                            <>
                                {row.original.heightStatus && row.original.heightStatus === 'Desc' ?
                                    <i className='	fa fa-arrow-down'  style={{color:'orange' , fontSize:'20px'}}  ></i>
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
                minWidth: 70,
                Cell: row => (
                    <React.Fragment>
                        <div className={row.original.ClampStatus}>
                            <div>
                                {row.original.ClampStatus}
                            </div>
                        </div>
                    </React.Fragment>
                ),
                show: true,
            },
            {
                Header: 'Clamp 1 Status',
                accessor: 'clamp1Status',
                id: 'clamp1Status',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Clamp 2 Status',
                accessor: 'clamp2Status',
                id: 'clamp2Status',
                minWidth: 100,
                show: true,
            },
            {
                Header: 'Rigger Height New 1',
                accessor: 'userHeight',
                id: 'userHeight',
                minWidth: 100,
                show: false,
            },
            // {
            //     Header: 'Rigger Height New 2',
            //     accessor: 'userHeight2',
            //     id: 'userHeight2',
            //     minWidth: 100,
            //     show: true,
            // },
            // {
            //     Header: 'Rigger Height New 3',
            //     accessor: 'userHeight3',
            //     id: 'userHeight3',
            //     minWidth: 100,
            //     show: true,
            // },
            // {
            //     Header: 'Height Margin',
            //     accessor: 'heightMargin',
            //     id: 'heightMargin',
            //     minWidth: 100,
            //     show: true,
            // },
            // {
            //     Header: 'Working Minutes',
            //     accessor: 'workingMinutes',
            //     id: 'workingMinutes',
            //     minWidth: 100,
            //     show: true,
            // },
            {
                Header: 'Working Time',
                accessor: d => `${d.statusOn && d.statusOn !== null ? moment(d.statusOn).format("DD-MMM-YYYY | hh:mm:ss a") : ''} `,
                id: 'statusOn',
                minWidth: 100,
                show: true
            }
        ]
        this.setState({ columns: columns });
    }

    componentDidMount() {
        this.functionToSetColumns();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.towerMonitoringSubDetails && nextProps.towerMonitoringSubDetails !== this.state.towerMonitoringSubDetails) {
            this.setState({ towerMonitoringSubDetails: nextProps.towerMonitoringSubDetails })
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
        const { columns, towerMonitoringSubDetails } = this.state;

        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                <ReactTable
                    defaultPageSize={10}
                    Data={towerMonitoringSubDetails ? towerMonitoringSubDetails : []}
                    isColumnUpdate={true}
                    updateColumn={this.updateColumn}
                    columns={columns}
                />
            </CommonStyle.MainDiv>
        )
    }
}
export default withRouter(connect(null, null)(TowerMonitoringSubDetailsIndex));
