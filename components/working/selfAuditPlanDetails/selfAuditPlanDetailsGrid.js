import Wrapper from '../../shared/Wrapper';
import ReactTable from "react-table-6";
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import "react-table-6/react-table.css"

import Gap from '../../Gap';
import CustomPagination from "../../ReactTableComponent/CustomPagination.js";
import { exportTableToCSV } from '../../ReactTableComponent/export.js';
import { exportTableToJSON } from '../../ReactTableComponent/export.js';
import { MainDivForReactTable } from '../../commonStyle';
import { withRouter } from 'next/router';
import moment from 'moment';
import React from 'react';

class SelfAuditDetails extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            RoleBox: null,
            row: "",
            filter: true,
            Data: [],
            columns: [],
        }
        this.changeFilter = this.changeFilter.bind(this);
        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.handleDownloadToJson = this.handleDownloadToJson.bind(this);
        this.columns = [
            {
                Header: 'Action',
                accessor: 'id',
                id: 'id',
                show: false,
                Cell: propss => (
                    <React.Fragment>

                        {(propss.original.isAuditExecuted !== 1 && propss.original.isAuditExecuted !== true && propss.original.isAuditCancelled !== 1 && propss.original.isAuditCancelled !== true) &&

                            <button className="warning width120px" value={propss.original.id} onClick={() => this.props.onClickCancelSelfAudit(propss.original.id, propss.original)}>
                                Cancel
                            </button>
                        }
                        <br />
                        {(propss.original.isAuditExecuted !== 1 && propss.original.isAuditExecuted !== true && propss.original.isAuditCancelled !== 1 && propss.original.isAuditCancelled !== true) &&

                            <button className="primary width120px" value={propss.original.id} onClick={() => this.props.onClickModifySelfAudit(propss.original.id, propss.original)}>
                                Modify
                            </button>
                        }
                        {(propss.original.isAuditCancelled === 1 || propss.original.isAuditCancelled === true) &&
                            <span style={{ color: 'red' }}>Cancelled</span>
                        }
                        <br />
                        {(propss.original.id) && 
                            <button className="info width120px"  onClick={() => this.props.onClickViewAuditSummaryDetails(propss.original.id)}>
                                View Details
                            </button>
                        }
                    </React.Fragment>
                ),
                sortable: false,
                filterable: false
            },
            {
                Header: 'Sr#',
                minWidth: 50,
                id: 'srnumber',
                style: { 'text-align': "center" },
                show: false,
                Cell: row => (
                    <React.Fragment>
                        {row.index + 1}
                    </React.Fragment>
                ),
                sortable: true,
                filterable: false
            },
            {
                Header: 'Audit Id',
                accessor: 'selfAuditNumber',
                id: 'selfAuditNumber',
                show: false,
            },
            {
                Header: 'Company',
                accessor: 'companyName',
                id: 'companyName',
                show: false,
            },
            {
                Header: 'Plant',
                accessor: 'plantName',
                id: 'plantName',
                show: false,
            },
            {
                Header: 'Section',
                accessor: 'sectionName',
                id: 'sectionName',
                style: { 'white-space': "pre-wrap" },
                minWidth: 200,
                show: false,
            },
            {
                Header: 'From Date',
                //accessor: 'auditFromDate',
                id: 'auditFromDate',
                show: false,
                Cell: row => (
                    <React.Fragment>
                        {row && row.original && row.original.auditFromDate && moment(new Date(row.original.auditFromDate)).format("DD-MMM-YYYY")}
                    </React.Fragment>
                )
            },
            {
                Header: 'To Date',
                // accessor: 'auditToDate',
                id: 'auditToDate',
                show: false,
                Cell: row => (
                    <React.Fragment>
                        {row && row.original && row.original.auditToDate && moment(new Date(row.original.auditToDate)).format("DD-MMM-YYYY")}
                    </React.Fragment>
                )
            },
            {
                Header: 'Planned Date',
                accessor: 'auditPlannedOn',
                id: 'auditPlannedOn',
                show: false,
                Cell: row => (
                    <React.Fragment>
                        {row && row.original && row.original.auditPlannedOn && moment(new Date(row.original.auditPlannedOn)).format("DD-MMM-YYYY")}
                    </React.Fragment>
                )
            },
            {
                Header: 'Plan Remarks',
                accessor: d => `${d.auditPlanRemarks ? d.auditPlanRemarks : ''}`,
                id: 'auditPlanRemarks',
                style: { 'white-space': "pre-wrap" },
                minWidth: 100,
                show: false
            }, {
                Header: 'Cancelled',
                accessor: d => `${d.isAuditCancelled && (d.isAuditCancelled === 1 || d.isAuditCancelled === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
                id: 'isAuditCancelled',
                show: true
            },
            {
                Header: 'Cancellation Remarks',
                accessor: 'cancellationRemarks',
                id: 'cancellationRemarks',
                show: true,
            },
            {
                Header: 'Audit Rescheduled',
                accessor: d => `${d.isAuditRescheduled && d.isAuditRescheduled === 1 ? 'Yes' : 'No'} `,// 'LeadEmail',
                id: 'isAuditRescheduled',
                show: true
            },
            {
                Header: 'Rescheduled On',
                accessor: 'auditRescheduledOn',
                id: 'auditRescheduledOn',
                show: true,
            }, {
                Header: 'Executed',
                accessor: d => `${d.isAuditExecuted && (d.isAuditExecuted === 1 || d.isAuditExecuted === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
                id: 'isAuditExecuted',
                show: true
            },

            {
                Header: 'Reason Of Reschedule',
                accessor: 'reasonOfReschedule',
                style: { 'white-space': "pre-wrap" },
                minWidth: 200,
                id: 'reasonOfReschedule',
                show: true,
            },
        ]

    }
    componentDidMount() {

        const columns1 = [];
        this.columns && this.columns.map((item, index) => {
            this.toggleColumnChooser(index);
        })
    }
    handleRowChange = row => event => {
        if (event.target.value !== 0) {
            this.setState({
                row: event.target.value,

            });
            console.log(this.state.data);
        }

    };
    onclickEdit = (item) => {
        this.props.onclickEdit(item);
        console.log("item edit", item);
    }
    handleDownload() {
        const data = this.reactTable.getResolvedState().sortedData;
        exportTableToCSV(data, this.columns, "data.csv")
        //console.log(data);
    };
    handleDownloadToJson() {
        const data = this.reactTable.getResolvedState().sortedData;
        exportTableToJSON(data, "data.json")
        //console.log(data[0]._original);
    }
    handleRowClick() {
        rowSize = parseInt(this.state.row);

        //console.log(parseInt(rowSize)); console.log(typeof rowSize);
    }
    changeFilter() {
        this.setState({
            filter: !this.state.filter,
        })

    };
    toggleColumnChooser = (index) => {
        this.setState(
            prevState => {
                const columns1 = [];
                const columns = this.columns;
                columns1.push(...columns);
                console.log(columns1);
                columns1[index].show = !columns1[index].show;
                if (columns1[index].columns) {
                    columns1[index].columns.forEach(item => {
                        item.show = !item.show
                    })
                }
                return {
                    columns: columns1,
                };
            }, () => {
                console.log(this.state.columns)
            }
        );
    };
    filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        const content = row[id];
        if (typeof content !== 'undefined') {
            // filter by text in the table or if it's a object, filter by key
            if (typeof content === 'object' && content !== null && content.key) {
                return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
            } else {
                return String(content).toLowerCase().includes(filter.value.toLowerCase());
            }
        }
        return true;
    };
    render() {
        const { Data } = this.props;

        let Count = Data && Data.length;
        return (
            <div style={{ width: '100%' }}>
                {/* {Count > 0 ? */}
                <MainDivForReactTable>
                    <ReactTable
                        ref={r => this.reactTable = r}
                        data={Data ? Data : undefined}
                        filterable={this.state.filter}
                        changeFilter={this.changeFilter}
                        handleDownloadToJson={this.handleDownloadToJson}
                        handleDownload={this.handleDownload}
                        columns={this.state.columns}
                        defaultFilterMethod={this.filterCaseInsensitive}
                        onColumnUpdate={this.toggleColumnChooser}
                        showPageSizeOptions={true}
                        //defaultPageSize={3}
                        showPaginationBottom={true}
                        PaginationComponent={CustomPagination}
                        pageSizeOptions={[3, 5, 10, 20, 50, 100, 500, 1000, 5000, 10000, 20000, 50000]}

                        minRows={3}
                        defaultPageSize={100}
                    // style={{
                    //     height: "450px" // This will force the table body to overflow and scroll, since there is not enough room
                    // }}
                    //className="-striped -highlight"
                    //pageSizeOptions={[10, 20, 50, 100, 500, 1000]}
                    />
                </MainDivForReactTable>
            </div>
        );
    }
};
const mapStateToProps = state => {
    const staticUndefined = undefined;
    return { staticUndefined };
}
//export default connect(mapStateToProps, {})(SelfAuditDetails)
export default withRouter(connect(mapStateToProps, null)(SelfAuditDetails));
