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
class SelfAuditDetails extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            RoleBox: null,
            row: "",
            filter: false,
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

                        {(propss.original.isAuditTeamAssigned === 0 && (new Date() <= new Date(propss.original.auditToDate)) && (new Date() >= new Date(propss.original.auditFromDate))) &&

                            <button className="primary width120px" value={propss.original.id} onClick={() => this.props.onClickAssignTeamButton(propss.original.id)}>
                                Team Assigment
                            </button>
                        }
                        {((propss.original.isAuditTeamAssigned === 1) && (propss.original.isAuditExecuted === 0) && (new Date() <= new Date(propss.original.auditToDate)) && (new Date() >= new Date(propss.original.auditFromDate))) &&
                            <div className="warning width120px" onClick={() =>
                                props.onClickExecuteAudit(propss.original.id, propss.original.multiSectionMasterId)
                            }
                            >
                                Execute Audit
                            </div>
                        }
                        {/* { ((propss.original.isAuditTeamAssigned === 1) && (propss.original.isAuditExecuted === 1)
                            &&
                            <div className="info width120px" onClick={() =>
                                props.onClickViewAudit(propss.original.id, propss.original.multiSectionMasterId)
                            }
                            >
                                View Score
                                </div>

                        )} */}
                        <br />

                        { ((propss.original.isAuditTeamAssigned === 1) && (propss.original.isAuditExecuted === 1)
                            &&
                            <div className="info width120px" onClick={() =>
                                props.onClickViewAuditSummaryDetails(propss.original.id, propss.original.multiSectionMasterId)
                            }
                            >
                                View Summary
                                </div>

                        )}
                        {/* <button className="info width120px" value={propss.original.id} onClick={() => this.onclickEdit(propss.original)}>
                            View Details
                            </button> */}
                    </React.Fragment>
                )
            },
            {
                Header: 'Audit Id',
                accessor: 'selfAuditNumber',
                id: 'selfAuditNumber',
                show: false,
            },
            {
                Header: 'Plant',
                accessor: 'plantName',
                id: 'plantName',
                show: false,
            },
            {
                Header: 'From Date',
                accessor: 'auditFromDate',
                id: 'auditFromDate',
                show: false,
            },
            {
                Header: 'To Date',
                accessor: 'auditToDate',
                id: 'auditToDate',
                show: false,
            },
            {
                Header: 'Planned Date',
                accessor: 'auditPlannedOn',
                id: 'auditPlannedOn',
                show: false,
            },
            {
                Header: 'Plan Remarks',
                accessor: d => `${d.auditPlanRemarks ? d.auditPlanRemarks : ''}`,
                id: 'auditPlanRemarks',
                style: { 'white-space': "pre-wrap" },
                minWidth: 100,
                show: false
            }, {
                Header: 'Team Assigned',
                accessor: d => `${d.isAuditTeamAssigned && d.isAuditTeamAssigned === 1 ? 'Yes' : 'No'} `,// 'LeadEmail',
                id: 'isAuditTeamAssigned',
                show: true
            },
            {
                Header: 'Team Assigned On',
                accessor: 'teamAssignedOn',
                id: 'teamAssignedOn',
                show: true,
            },
            {
                Header: 'Auditor Team',
                //  accessor: 'auditorTeam',
                accessor: d => `${d.auditorTeam && d.auditorTeam ? d.auditorTeam.replace(',', " ") : ''}`,
                style: { 'white-space': "pre-wrap" },
                minWidth: 150,
                id: 'auditorTeam',
                show: true,
            },
            {
                Header: 'Auditee Team',
                // accessor: 'auditeeTeam',
                accessor: d => `${d.auditeeTeam && d.auditeeTeam ? d.auditeeTeam.replace(',', " ") : ''}`,
                style: { 'white-space': "pre-wrap" },
                minWidth: 150,
                id: 'auditeeTeam',
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
            },

            {
                Header: 'Reason Of Reschedule',
                accessor: 'reasonOfReschedule',
                style: { 'white-space': "pre-wrap" },
                minWidth: 200,
                id: 'reasonOfReschedule',
                show: true,
            }
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
                        pageSizeOptions={[10, 20, 50, 100, 500, 1000, 5000, 10000, 20000, 50000]}

                        minRows={3}
                        defaultPageSize={10}
                    //pageSizeOptions={[10, 20, 50, 100, 500, 1000]}
                    />
                </MainDivForReactTable>
                {/* :
                    <div>
                        No Data Found
                    </div>
                } */}

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
