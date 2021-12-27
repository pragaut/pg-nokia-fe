import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../../comman/commonStyle';
import Wrapper from '../../../shared/Wrapper';
import moment from 'moment';
import { withRouter } from 'next/router';
import ReactTable from '../../../comman/ReactTableComponent/simpleReactTable';

class AlarmNotificationDetailsIndex extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            towerNotificationDetails:props.towerNotificationDetails ? props.towerNotificationDetails : [],
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
                Header: 'Alarm Type',
                accessor: d => `${d.alarmTypeName}`,
                id: 'alarmTypeName',
                show: true,
            },
            {
                Header: 'Notification',
                accessor: d => `${d.notificationName}`,
                id: 'notificationName',
                show: true,
            },
            {
                Header: 'Date', 
                id: 'notificationDate',
                accessor: d => `${d.notificationDate && d.notificationDate !== null ? moment(d.notificationDate).format("DD-MMM-YYYY hh:mm:ss a") : ''} `,
                 show: true,
            }, 
        ]
        this.setState({ columns: columns });
    }
   

    componentDidMount() {
        this.functionToSetColumns();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.towerNotificationDetails && nextProps.towerNotificationDetails !== this.state.towerNotificationDetails) {
            this.setState({ towerNotificationDetails: nextProps.towerNotificationDetails })
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
        const { columns, towerNotificationDetails } = this.state;

        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
            >
                <ReactTable
                    defaultPageSize={20}
                    Data={towerNotificationDetails ? towerNotificationDetails : []}
                    filter={true}
                    updateColumn={this.updateColumn}
                    columns={columns}
                />
            </CommonStyle.MainDiv>
        )
    }
}
export default withRouter(connect(null, null)(AlarmNotificationDetailsIndex));
