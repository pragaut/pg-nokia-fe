import React, { Component } from 'react';
import ReactTable from "react-table-6";
import { connect } from 'react-redux'; 
import "react-table-6/react-table.css" ;
import { MainDivForReactTable } from '../../comman/commonStyle'
import Wrapper from '../../shared/Wrapper';
import CustomPagination from "./simplePageCustomePagination";

class ReactTableIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            RoleBox: null,
            row: "",
            sections: [],
            filter: true,
            dropdownValue: {
                sectionMasterid: ''
            },
            Data: [],
            filterData: [],
            columns: props.columns ? props.columns : undefined,
            minRows: 3,
            showPagination: true,
            showPageSizeOptions: true,
        }
        this.changeFilter = this.changeFilter.bind(this);
        this.handleRowChange = this.handleRowChange.bind(this);
    }
    componentDidMount() {  
        this.setState({
            Data: this.props.Data,
            columns: this.props.columns,
        });
        if (this.props && this.props.minRows !== undefined) {
            this.setState({
                minRows: this.props.minRows,
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.columns && nextProps.columns !== null && nextProps.columns.length > 0 && nextProps.columns !== undefined && nextProps.columns !== this.state.columns) {
             this.setState({
                columns: nextProps.columns
            });
        }
        if (nextProps.Data !== null && nextProps.Data !== undefined && nextProps.Data !== this.state.Data) {
            this.setState({
                Data: nextProps.Data,
                filterData: nextProps.Data
            })
        } 
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data; 
            this.setState({ ...state });
        }
    };


    handleRowChange = row => event => {
        if (event.target.value !== 0) {
            this.setState({
                row: event.target.value,
            }); 
        }

    };

    handleRowClick() {
        rowSize = parseInt(this.state.row); 
    }
    changeFilter() {
        this.setState({
            filter: !this.state.filter,
        })

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
        const { Data, isScorllApplicable, filter } = this.props;
        const { columns } = this.state;
        let minRows = this.props.minRows ? this.props.minRows : 3;
        let defaultPageSize = this.props.defaultPageSize ? this.props.defaultPageSize : 100;
        return (
            <div style={{ width: this.props.width ? this.props.width : '100%' }}>
                <MainDivForReactTable>
                    <ReactTable
                        ref={r => this.reactTable = r}
                        data={this.state.Data}
                        filterable={filter}
                        changeFilter={this.changeFilter}
                        columns={columns}
                        defaultFilterMethod={this.filterCaseInsensitive}
                        PaginationComponent={CustomPagination}
                        pageSizeOptions={[3, 5, 10, 20, 30, 50, 100, 500, 1000, 5000, 10000, 20000, 50000]}
                        minRows={minRows}
                        defaultPageSize={defaultPageSize}
                    />
                </MainDivForReactTable>
            </div>
        )
    }
}

export default connect(null, null)(ReactTableIndex);