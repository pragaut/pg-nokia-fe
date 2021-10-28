import Wrapper from '../../../shared/Wrapper';
import ReactTable from "react-table-6";
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants';
import "react-table-6/react-table.css"

import Gap from '../../Gap';
import CustomPagination from "../../ReactTableComponent/CustomPagination.js";
import { exportTableToCSV } from '../../ReactTableComponent/export.js';
import { exportTableToJSON } from '../../ReactTableComponent/export.js';
import { MainDivForReactTable } from '../../commonStyle';
import { withRouter } from 'next/router';
import moment from 'moment';
class userList extends Wrapper {

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
                minWidth: 150,
                Cell: propss => (
                    <React.Fragment>
                        <div className="warning width60px" onClick={() => this.onclickEdit(propss.original)}>
                            Edit
                        </div>
                        <div className="danger width60px" onClick={() => props.onclickDeleteUser(propss.original.id)}>
                            Delete
                        </div> <br />
                        {(propss.original.isUserLocked === 1 || propss.original.isUserLocked === true) &&
                            <div className="primary width120px" onClick={() =>
                                props.onClickunlockuser(propss.original)
                            }
                            >
                                Unlock Account
                            </div>
                        }

                    </React.Fragment>
                )
            },
            {
                Header: 'Employee',
                accessor: d => `${d.firstName} ${d.lastName}`,
                id: 'userName',
                minWidth: 100,
                show: false
            },
            {
                Header: 'Emp Code',
                accessor: 'code',
                id: 'code',
                show: false,
            },
            {
                Header: 'Plant',
                accessor: 'plantName',
                id: 'plantName',
                show: false,
            },
            {
                Header: 'Department',
                accessor: 'departmentName',
                id: 'department',
                show: false,
            },
            {
                Header: 'Email',
                accessor: 'email',
                id: 'email',
                show: false,
            },
            {
                Header: 'Mobile',
                accessor: 'mobile',
                id: 'mobile',
                show: true,
            }, {
                Header: 'User Locked',
                accessor: d => `${(d.isUserLocked === 1 || d.isUserLocked === true) ? 'Yes' : 'No'} `,// 'LeadEmail',
                id: 'isUserLocked',
                show: true
            },
            {
                Header: 'User Name',
                accessor: 'userName',
                id: 'loginUserName',
                show: true,
            },
            {
                Header: 'Assigned Roles',
                accessor: 'MultiRoleNames',
                id: 'MultiRoleNames',
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
        this.props.onClickEdit(item);
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
                        defaultFilterMethod={this.filterCaseInsensitive}
                        showPageSizeOptions={true}
                        //defaultPageSize={3}
                        showPaginationBottom={true}
                        PaginationComponent={CustomPagination}
                        pageSizeOptions={[5,10, 20, 50, 100, 500, 1000, 5000, 10000, 20000, 50000]}

                        minRows={3}
                        defaultPageSize={50}
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
export default withRouter(connect(mapStateToProps, null)(userList));
