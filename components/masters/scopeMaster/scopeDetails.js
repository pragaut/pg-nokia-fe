import Wrapper from '../../shared/Wrapper';
import ReactTable from "react-table-6";
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import "react-table-6/react-table.css" 
import Gap from '../../Gap';
import CustomPagination from "../../ReactTableComponent/CustomPagination.js";
import { exportTableToCSV } from '../../ReactTableComponent/export.js';
import { exportTableToJSON } from '../../ReactTableComponent/export.js';
import { MainDivForReactTable } from '../../commonStyle'
class scopeDetails extends Wrapper {

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
                        <button className="warning width80px" value={propss.original.id} onClick={() => this.onclickEdit(propss.original)}>
                            Edit
                            </button>
                        <br />
                        {(propss.original.isScopeClosed && (propss.original.isScopeClosed === 1 || propss.original.isScopeClosed === true)) ?
                            <button className="disabled width80px" value={propss.original.id} onClick={() =>
                                //  props.onClickScopeClosureButton(propss.original,'re-open')
                                alert("question already closed")
                            }>
                                In-Active
                           </button>
                            :
                            <button className="danger width80px" value={propss.original.id} onClick={() => props.onClickScopeClosureButton(propss.original, 'closure')}>
                                In-Active
                            </button>
                        }
                    </React.Fragment>
                )
            },
            {
                Header: 'Section',
                accessor: 'section.sectionName',
                id: 'sectionName',
                show: false,
            },
            {
                Header: 'Sub Section',
                accessor: 'subsection.subSectionName',
                id: 'subSectionName',
                show: false,
            },
            {
                Header: 'Criticality',
                accessor: 'criticality.criticalityName',
                id: 'criticalityName',
                show: false,
            },
            {
                Header: 'Audit Focus Mode',
                accessor: 'auditMode.value',
                id: 'auditModeName',
                show: false,
            },
            {
                Header: 'Question',
                accessor: d => `${d.question}`,
                id: 'question',
                style: { 'white-space': "pre-wrap" },
                minWidth: 400,
                show: false
            }, {
                Header: 'Expected Standard',
                accessor: d => `${d.expectedStandard} `,// 'LeadEmail',
                id: 'expectedStandard',
                style: { 'white-space': "pre-wrap" },
                minWidth: 500,
                show: true
            }, {
                Header: 'Reference Document To Be Checked',
                accessor: 'referenceDocumentToBeChecked',
                style: { 'white-space': "pre-wrap" },
                minWidth: 500,
                id: 'referenceDocumentToBeChecked',
                show: true,
            },
            {
                Header: 'Max Score',
                accessor: 'maxScore',
                id: 'maxScore',
                show: true
            }, {
                Header: 'Scope Order',
                accessor: 'scopeOrder',
                id: 'scopeOrder',
                show: true
            }, {
                Header: 'Scope Closure Date',
                accessor: 'scopeClosureDate',
                id: 'scopeClosureDate',
                show: true
            }, {
                Header: 'Scope Closure Remarks',
                accessor: 'scopeClosureRemarks',
                id: 'scopeClosureRemarks',
                show: true
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
            <div>
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
                        pageSizeOptions={[10, 20, 50, 100, 500, 1000, 5000, 10000, 20000, 50000]}
                        // style={{
                        //     height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
                        // }}
                        minRows={3}
                        defaultPageSize={10}
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
export default connect(mapStateToProps, {})(scopeDetails)