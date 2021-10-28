import React, { Component } from 'react';
import ReactTable from "react-table-6";
import { connect } from 'react-redux';
import Head from 'next/head'
import styled from 'styled-components'
import "react-table-6/react-table.css"
import { constants } from '../../../utils/constants';
import CustomPagination from "./CustomPagination.js";
import { exportTableToCSV } from './export.js';
import { exportTableToJSON } from './export.js';
import { MainDivForReactTable } from '../../comman/commonStyle'
import Wrapper from '../../shared/Wrapper';
//import { getSectionMasterData } from '../../actions/admin.action';
import { SELECT, SpanLabelForDDl } from '../../comman/formStyle';



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
        this.handleDownload = this.handleDownload.bind(this);
        this.handleDownloadToJson = this.handleDownloadToJson.bind(this);
    }
    componentDidMount() {

        const columns1 = [];
        this.setState({
            Data: this.props.Data,
            columns: this.props.columns,
        });
        this.props.columns && this.props.columns.length > 0 && this.props.columns.map((item, index) => {
            this.toggleColumnChooserwhenComponentDidMount(index)
            //this.toggleColumnChooser(index);
        });
        // setTimeout(() => {
        //     this.props.columns && this.props.columns.length > 0 && this.props.columns.map((item, index) => {
        //         this.toggleColumnChooser(index);
        //     });
        // }, 500);

        if (this.props && this.props.isFilterRequired !== undefined) {
            this.setState({
                filter: this.props.isFilterRequired,
            });
        }
        if (this.props && this.props.showPagination !== undefined) {
            this.setState({
                showPagination: this.props.showPagination,
            });
        }
        if (this.props && this.props.showPageSizeOptions !== undefined) {
            this.setState({
                showPageSizeOptions: this.props.showPageSizeOptions,
            });
        }
        if (this.props && this.props.minRows !== undefined) {
            this.setState({
                minRows: this.props.minRows,
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log("nextProps.masterDetails : ",nextProps.masterDetailsCategory);
        if (nextProps.columns && nextProps.columns !== null && nextProps.columns.length > 0 && nextProps.columns !== undefined && nextProps.columns !== this.state.columns) {
            // console.log("nextProps.columns", nextProps.columns);
            this.setState({
                columns: nextProps.columns
            });
            setTimeout(() => {
                nextProps.columns && nextProps.columns.length > 0 && nextProps.columns.map((item, index) => {
                    this.toggleColumnChooserwhenComponentDidMount(index);
                });
            }, 300);
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
            // console.log(this.state.Data);
        }

    };
    handleDownload() {
        const data = this.reactTable.getResolvedState().sortedData;
        exportTableToCSV(data, this.props.columns, "data.csv")
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
    toggleColumnChooserwhenComponentDidMount = (index) => {
        this.setState(
            prevState => {
                const columns1 = [];
                const columns = this.state.columns;
                columns1.push(...columns);
                //  console.log(columns1);
                //console.log("Columns loop", columns1);
                //console.log("Columns loop index", index)

                columns1[index].show = columns1[index].show;
                if (columns1[index].columns) {
                    columns1[index].columns.forEach(item => {
                        item.show = item.show
                    })
                }
                if (this.props.isColumnUpdate && this.props.isColumnUpdate === true) {
                    this.props.updateColumn(columns1)
                }
                return {
                    columns: columns1,
                };
            }, () => {
                // console.log(this.state.columns)
            }
        );
    };
    toggleColumnChooserwhenUpdateprops = (index) => {
        this.setState(
            prevState => {
                const columns1 = [];
                const columns = this.state.columns;
                columns1.push(...columns);
                // console.log(columns1);

                columns1[index].show = !columns1[index].show;
                if (columns1[index].columns) {
                    columns1[index].columns.forEach(item => {
                        item.show = item.show
                    })
                }
                return {
                    columns: columns1,
                };
            }, () => {
                // console.log(this.state.columns)
            }
        );
    };
    toggleColumnChooser = (index) => {
        this.setState(
            prevState => {
                const columns1 = [];
                const columns = this.state.columns;
                columns1.push(...columns);
                // console.log(columns1);
                //console.log("Columns loop", columns1);
                //console.log("Columns loop index", index)

                columns1[index].show = !columns1[index].show;
                if (columns1[index].columns) {
                    columns1[index].columns.forEach(item => {
                        item.show = !item.show
                    })
                }
                if (this.props.isColumnUpdate && this.props.isColumnUpdate === true) {
                    this.props.updateColumn(columns1)
                }
                return {
                    columns: columns1,
                };
            }, () => {
                //  console.log(this.state.columns)
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

    onValueChanged = key => event => {
        const existingState = Object.assign({}, this.state.dropdownValue);
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ dropdownValue: existingState });
    };

    render() {
        const { Data, isScorllApplicable } = this.props;

        let Count = Data && Data.length;
        let minRows = this.props.minRows ? this.props.minRows : 3;
        let defaultPageSize = this.props.defaultPageSize ? this.props.defaultPageSize : 100;
        let showPaginationBottom = this.props.showPaginationBottom ? this.props.showPaginationBottom : true;
        let showPageSizeOptions = this.props.showPageSizeOptions ? this.props.showPageSizeOptions : true;

        let showPagination = this.state.showPagination !== undefined && this.state.showPagination !== null ? this.state.showPagination : true;

        //console.log("this.state.showPagination : ", this.state.showPagination);

        return (
            <div style={{ width: this.props.width ? this.props.width : '100%' }}>
                <MainDivForReactTable>
                    <ReactTable
                        ref={r => this.reactTable = r}
                        data={this.state.Data}
                        filterable={this.state.filter}
                        changeFilter={this.changeFilter}
                        handleDownloadToJson={this.handleDownloadToJson}
                        handleDownload={this.handleDownload}
                        columns={this.state.columns}
                        onColumnUpdate={this.toggleColumnChooser}
                        defaultFilterMethod={this.filterCaseInsensitive}
                        showPageSizeOptions={showPageSizeOptions}
                        showPaginationBottom={showPaginationBottom}
                        PaginationComponent={CustomPagination}
                        pageSizeOptions={[3, 5, 10, 20, 50, 100, 500, 1000, 5000, 10000, 20000, 50000]}
                        style={{
                            height: isScorllApplicable === true ? "450px" : 'auto' // This will force the table body to overflow and scroll, since there is not enough room
                        }}
                        showPagination={showPagination}
                        minRows={minRows}
                        defaultPageSize={defaultPageSize}
                    //pageSizeOptions={[10, 20, 50, 100, 500, 1000]}
                    />
                </MainDivForReactTable>
            </div>
        )
    }
}

export default connect(null, null)(ReactTableIndex);
