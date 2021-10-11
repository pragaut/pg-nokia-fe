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
                        {(propss.original.isAuditTeamAssigned === 1 || propss.original.isAuditTeamAssigned === true) && (propss.original.isAuditExecuted === 1 || propss.original.isAuditExecuted === true) &&
                            <>
                                <div className="info width120px" onClick={() =>
                                    props.onClickViewAudit(propss.original.id, propss.original.multiSectionMasterId)
                                }
                                >
                                    View Self Score
                                </div>
                              
                                <br />
                                {(propss.original.finalAuditPlan && propss.original.finalAuditPlan.id)
                                    ?
                                    <div>
                                        Final Audit Planned
                                    </div>
                                    :
                                    <div className="primary width120px" onClick={() =>
                                        props.onClickPlanFinalAudit(propss.original.id, propss.original.multiSectionMasterId)
                                    }
                                    >
                                        Plan Final Audit
                                   </div>
                                }

                            </>
                        }
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
                accessor: 'plant.plantName',
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
                accessor: d => `${moment(new Date(d.auditPlannedOn)).format("YYYY-MM-DD")}`,
                id: 'auditPlannedOn',
                show: false,
            },
            {
                Header: 'Plan Remarks',
                accessor: d => `${d.auditPlanRemarks}`,
                id: 'auditPlanRemarks',
                style: { 'white-space': "pre-wrap" },
                minWidth: 100,
                show: false
            }, {
                Header: 'Team Assigned',
                accessor: d => `${(d.isAuditTeamAssigned === 1 || d.isAuditTeamAssigned === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
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
                accessor: d => `${d.auditorTeam ? d.auditorTeam.replace(',', " ") : ''}`,
                style: { 'white-space': "pre-wrap" },
                minWidth: 150,
                id: 'auditorTeam',
                show: true,
            },
            {
                Header: 'Auditee Team',
                // accessor: 'auditeeTeam',
                accessor: d => `${d.auditeeTeam ? d.auditeeTeam.replace(',', " ") : ''}`,
                style: { 'white-space': "pre-wrap" },
                minWidth: 150,
                id: 'auditeeTeam',
                show: true,
            },
            {
                Header: 'Audit Rescheduled',
                accessor: d => `${(d.isAuditRescheduled === 1 || d.isAuditRescheduled === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
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
            }, {
                Header: 'Executed',
                accessor: d => `${(d.isAuditExecuted === 1 || d.isAuditExecuted === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
                id: 'isAuditExecuted',
                show: true
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
    render() {
        const { Data } = this.props;
        console.log("Data", Data);
        let Count = Data && Data.length;
        return (
            <div style={{ width: '100%' }}>
                <MainDivForReactTable>
                    <ReactTable
                        ref={r => this.reactTable = r}
                        data={Data}
                        filterable={this.state.filter}
                        changeFilter={this.changeFilter}
                        handleDownloadToJson={this.handleDownloadToJson}
                        handleDownload={this.handleDownload}
                        columns={this.state.columns}
                        onColumnUpdate={this.toggleColumnChooser}
                        showPageSizeOptions={true}
                        //defaultPageSize={3}
                        showPaginationBottom={true}
                        PaginationComponent={CustomPagination}
                        pageSizeOptions={[10, 20, 50, 100, 500, 1000, 5000, 10000, 20000, 50000]}

                        minRows={3}
                        defaultPageSize={20}
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
