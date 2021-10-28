import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Wrapper from '../shared/Wrapper';
import { data, data2 } from "./highCharts/data";
//import LineChart from "./lineChart";
//import LineChart from "./demoLineChart";
import HighChart from "./highCharts/demoLineChart2";
import { getSectionMasterData, getAuditFlowMasterData, getYearTypeMasterData, getYearMasterData } from '../../actions/admin.action';
import { GetSelfVsFinalAuditScoreCompanySectionWise } from '../../actions/report.action';
import * as CommonStyle from '../commonStyle';
import { constants } from '../../utils/constants';
import { SELECT } from '../formStyle';
import Gap from '../Gap';

export class ReportSelfVsFinalAuditScoreCompanyWise extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data2: [],
            selfVsFinalCompanySectionWiseScores: [],
            sections: [],
            yearTypes: [],
            years: [],
            filterParameter: [],
            reportData: []
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log("nextProps.selfVsFinalCompanySectionWiseScores : ", nextProps.selfVsFinalCompanySectionWiseScores);

        if (nextProps.sections && nextProps.sections !== null && nextProps.sections != this.state.sections) {
            this.setState({ sections: nextProps.sections });
        }
        if (nextProps.years && nextProps.years !== null && nextProps.years != this.state.years) {
            this.setState({ years: nextProps.years })
        }
        if (nextProps && nextProps.auditFlows && nextProps.auditFlows !== null && nextProps.auditFlows !== 'undefined' && nextProps.auditFlows !== this.state.auditFlows) {
            this.setState({ auditFlows: nextProps.auditFlows });
        }
        if (nextProps.selfVsFinalCompanySectionWiseScores && nextProps.selfVsFinalCompanySectionWiseScores != this.state.selfVsFinalCompanySectionWiseScores) {

            this.setState({
                selfVsFinalCompanySectionWiseScores: nextProps.selfVsFinalCompanySectionWiseScores
            });
            setTimeout(() => {
                this.reportDataArray(nextProps.selfVsFinalCompanySectionWiseScores)
            }, 200);
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }

    reportDataArray(selfVsFinalCompanySectionWiseScores) {
        console.log("selfVsFinalCompanySectionWiseScores : ", selfVsFinalCompanySectionWiseScores);
        let reportData = [];
        let reportCategories = [];
        selfVsFinalCompanySectionWiseScores.forEach(element => {
            let score = element.scorePercentage && element.scorePercentage.split(',');
            let categories = element.Companys && element.Companys;
            console.log("finalCategories : ", categories);
            //let finalCategories = categories.split(',').removeDuplicates();
            let data = {
                name: element.sectionName,
                data: score, //[5, 3, 4, 7, 2],
                stack: element.auditType
            }
            //console.log("finalCategories : ", finalCategories);
            console.log("Report data const : ", data);
            reportData.push(data);
            //reportCategories.push(data);
            console.log("Report data array : ", reportData);
        });

        this.setState({
            reportData: reportData,
        });
    }


    componentDidMount() {
        const currentSessionDetails = this.getCurrent_YearType_Year_IsCentralPlantCompany();
        this.props.getAuditFlowMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        let isCentralCompany = currentSessionDetails && currentSessionDetails.isCentralGroupCompany;
        let isCentralFunctionPlant = currentSessionDetails && currentSessionDetails.isCentralFunctionPlant;
        let plantMasterId = currentSessionDetails && currentSessionDetails.plantMasterId;
        let companyMasterId = currentSessionDetails && currentSessionDetails.companyMasterId;
        let yearTypeMasterId = currentSessionDetails && currentSessionDetails.yearTypeMasterId;
        let yearMasterId = currentSessionDetails && currentSessionDetails.yearMasterId;

        const existingState = Object.assign({}, this.state.filterParameter);
        if (isCentralCompany && (isCentralCompany === 1 || isCentralCompany === "1" || isCentralCompany === true)) {
            // existingState["plantMasterId"] = plantMasterId;
        }
        else if (isCentralFunctionPlant && (isCentralFunctionPlant === 1 || isCentralFunctionPlant === "1" || isCentralFunctionPlant === true)) {
            existingState["companyMasterId"] = companyMasterId;
        }
        else {
            existingState["plantMasterId"] = plantMasterId;
        }
        existingState["yearTypeMasterId"] = yearTypeMasterId;
        existingState["yearMasterId"] = yearMasterId;

        let where = [];
        if (yearTypeMasterId) {
            where.push({ key: 'yearTypeMasterId', value: yearTypeMasterId })
        }
        console.log("yearMasterId : ", yearMasterId);
        this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, where);
        this.props.GetSelfVsFinalAuditScoreCompanySectionWise(existingState);
        // this.props.getYearTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.setState({ currentSessionDetails: currentSessionDetails, filterParameter: existingState });
        this.setState({ data, data2 });
    }

    onValueChanged = key => event => {
        const existingState = Object.assign({}, this.state.filterParameter);
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.props.GetSelfVsFinalAuditScoreCompanySectionWise(existingState);
        this.setState({ filterParameter: existingState });
    };

    render() {
        const { onlyPlantArray, selfVsFinalPlantWiseScores, filterParameter, years, currentSessionDetails, plantAndAuditTypeWiseArray, sections, columns } = this.state;
        console.log(plantAndAuditTypeWiseArray);
        console.log(onlyPlantArray);
        let reportData = this.state.reportData && this.state.reportData.length > 0 ? this.state.reportData : data;
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            ><CommonStyle.FormDiv
                justifyContent={"center"}
            >
                    <CommonStyle.InputControlsDiv
                        width="15%"
                        padding="0px 150px"
                    >
                        <CommonStyle.InputLabel>
                            Year
                        </CommonStyle.InputLabel>
                        <CommonStyle.InputDiv>
                            <SELECT
                                value={filterParameter.yearMasterId && filterParameter.yearMasterId ? filterParameter.yearMasterId : ''}
                                paddingLeft="20px"
                                borderRadius="5px"
                                height="35px"
                                type="text"
                                color="#000"
                                borderColor="#000"
                                style={{ backgroundColor: "transparent" }}
                                onChange={this.onValueChanged('yearMasterId')}
                            >
                                <option value=''>--Select--</option>
                                {years &&
                                    years.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.yearName}</option>
                                    })
                                }
                            </SELECT>
                        </CommonStyle.InputDiv>
                    </CommonStyle.InputControlsDiv>

                </CommonStyle.FormDiv>
                <Gap h="40px" />
                <HighChart
                    chartData={reportData}
                    axisData={onlyPlantArray}
                />
                {/* <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height={height}
                    data={chartData}
                    options={options}
                    legendToggle
                /> */}
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        );
    }
}
const mapStateToProps = state => {

    const { selfVsFinalCompanySectionWiseScores } = state.reportReducer;
    const { sections, auditFlows, years, yearTypes } = state.adminReducer;

    return { sections, auditFlows, selfVsFinalCompanySectionWiseScores, years, yearTypes };
}
export default connect(mapStateToProps, { GetSelfVsFinalAuditScoreCompanySectionWise, getSectionMasterData, getAuditFlowMasterData, getYearTypeMasterData, getYearMasterData })(ReportSelfVsFinalAuditScoreCompanyWise);
