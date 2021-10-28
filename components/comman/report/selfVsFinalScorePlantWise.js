import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../commonStyle'
import { getSelfVsFinalScorePlantWiseDetails } from '../../actions/report.action';
import Wrapper from '../shared/Wrapper';
import { getSectionMasterData, getAuditFlowMasterData, getYearTypeMasterData, getYearMasterData } from '../../actions/admin.action';
import HighChart from './selfVsFinalScoreChart';
import Chart from "react-google-charts";
import { constants } from '../../utils/constants';
import moment from 'moment';
import { SELECT } from '../formStyle'
import Gap from '../Gap';
import { withRouter } from 'next/router';
import _ from "lodash";
class SelfVsFinalScore extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            selfVsFinalPlantWiseScores: [],
            sections: [],
            plantAndAuditTypeWiseArray: [],
            currentSessionDetails: null,
            filterParameter: {
                yearMasterId: ''
            },
            auditFlows: [],
            onlyPlantArray: [],
            yearTypes: [],
            years: []
        };

    };
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
        let reportType = ""
        if (isCentralCompany && (isCentralCompany === 1 || isCentralCompany === "1" || isCentralCompany === true)) {
            // existingState["plantMasterId"] = plantMasterId;
        }
        else if (isCentralFunctionPlant && (isCentralFunctionPlant === 1 || isCentralFunctionPlant === "1" || isCentralFunctionPlant === true)) {
            existingState["companyMasterId"] = companyMasterId;
        }
        else {
            existingState["plantMasterId"] = plantMasterId;
            reportType = "Plant";
        }
        existingState["yearTypeMasterId"] = yearTypeMasterId;
        existingState["yearMasterId"] = yearMasterId;
        existingState["reportType"] = reportType;
        let where = [];
        if (yearTypeMasterId) {
            where.push({ key: 'yearTypeMasterId', value: yearTypeMasterId })
        }
        this.props.getYearMasterData(0, constants.ALL_ROWS_LIST, undefined, where);
        this.props.getSelfVsFinalScorePlantWiseDetails(existingState);
        // this.props.getYearTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.setState({ currentSessionDetails: currentSessionDetails, filterParameter: existingState });

    }
    NewArrayFunction = (data) => {
        let UniqueKey = ['plantName', 'plantMasterId', "auditFlow"];
        let UniqueKeyOnlyForPlant = ['plantName', 'plantMasterId'];
        const uniqueData = this.getUniqueArrayFromArrayObject(data, UniqueKey);
        const uniqueData_ForPlant = this.getUniqueArrayFromArrayObject(data, UniqueKeyOnlyForPlant);

        let uniquePlantarray = [];
        uniqueData_ForPlant && uniqueData_ForPlant.length > 0 && uniqueData_ForPlant.forEach(element => {
            let onlyPlantData = {
                plantMasterId: element.plantMasterId,
                plantName: element.plantName
            }
            uniquePlantarray.push(onlyPlantData);
        });
        let UniqueArray = [];
        uniqueData && uniqueData.length > 0 && uniqueData.forEach(element => {
            let DataNew = [];
            let plantWiseData = data && data.length > 0 && data.filter(item => item.plantMasterId === element.plantMasterId && item.auditFlow === element.auditFlow);
            plantWiseData && plantWiseData.length > 0 && plantWiseData.forEach(plantw => {
                let pd = {
                    sectionName: plantw.sectionName,
                    score: plantw.scorePercentage
                }
                DataNew.push(pd);
            });
            let SingleplantWise = {
                plantMasterId: element.plantMasterId,
                plantName: element.plantName,
                auditFlow: element.auditFlow,
                sectionWiseScore: DataNew
            }
            UniqueArray.push(SingleplantWise);
        });
        this.setState({ plantAndAuditTypeWiseArray: UniqueArray, onlyPlantArray: uniquePlantarray })
    }

    NewArrayFunction_CombinedData = (data) => {
        // let UniqueKey = ['plantName', 'plantMasterId', "auditFlow"];
        let UniqueKeyOnlyForPlant = ['plantName', 'plantMasterId'];
        let sectionMaster = this.state.sections;
        let auditFlows = this.state.auditFlows;
        //  const uniqueData = this.getUniqueArrayFromArrayObject(data, UniqueKey);
        const uniqueData_ForPlant = this.getUniqueArrayFromArrayObject(data, UniqueKeyOnlyForPlant);

        let uniquePlantarray = [];//['Total Score'];
        uniqueData_ForPlant && uniqueData_ForPlant.length > 0 && uniqueData_ForPlant.forEach(element => {
            // let onlyPlantData = {
            //     plantMasterId: element.plantMasterId,
            //     plantName: element.plantName
            // }
            uniquePlantarray.push(element.plantName);
        });
        let DataArray = [];
        auditFlows && auditFlows.length > 0 && auditFlows.forEach(flow => {
            sectionMaster && sectionMaster.length > 0 && sectionMaster.forEach(section => {
                let ScoreArray = [];
                let showInLegend = false;
                if (flow.auditFlow === "Self Audit") {
                    showInLegend = true;
                }
                const arrayData = data && data.length > 0 && data.filter(item => item.auditFlow === flow.auditFlow && item.sectionMasterId === section.id)
                arrayData && arrayData.length > 0 && arrayData.forEach(arr => {
                    ScoreArray.push(parseFloat(arr.scorePercentage || 0))
                });
                let SingleData = {
                    name: section.sectionName,
                    data: ScoreArray,
                    stack: flow.auditFlow,
                    color: section.barColor,
                    showInLegend: showInLegend
                }
                DataArray.push(SingleData)
            });
        });
        this.setState({ plantAndAuditTypeWiseArray: DataArray, onlyPlantArray: uniquePlantarray })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.sections && nextProps.sections !== null && nextProps.sections != this.state.sections) {
            this.setState({ sections: nextProps.sections });
        }
        // if (nextProps && nextProps.yearTypes && nextProps.yearTypes !== this.state.yearTypes) {
        //     this.setState({ yearTypes: nextProps.yearTypes })
        // }
        if (nextProps.years && nextProps.years !== null && nextProps.years != this.state.years) {
            this.setState({ years: nextProps.years })
        }
        if (nextProps && nextProps.auditFlows && nextProps.auditFlows !== null && nextProps.auditFlows !== 'undefined' && nextProps.auditFlows !== this.state.auditFlows) {
            this.setState({ auditFlows: nextProps.auditFlows });
        }
        if (nextProps.selfVsFinalPlantWiseScores && nextProps.selfVsFinalPlantWiseScores != this.state.selfVsFinalPlantWiseScores) {

            this.setState({
                selfVsFinalPlantWiseScores: nextProps.selfVsFinalPlantWiseScores
            });
            setTimeout(() => {
                this.NewArrayFunction_CombinedData(nextProps.selfVsFinalPlantWiseScores)
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

    onValueChanged = key => event => {
        const existingState = Object.assign({}, this.state.filterParameter);
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.props.getSelfVsFinalScorePlantWiseDetails(existingState);
        this.setState({ filterParameter: existingState });
    };


    render() {
        const { onlyPlantArray, selfVsFinalPlantWiseScores, filterParameter, years, currentSessionDetails, plantAndAuditTypeWiseArray, sections, columns } = this.state;
        console.log(plantAndAuditTypeWiseArray);
        console.log(onlyPlantArray);
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
                    chartData={plantAndAuditTypeWiseArray}
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
        )
    }
}

const mapStateToProps = state => {
    const { selfVsFinalPlantWiseScores } = state.reportReducer;
    const { sections, auditFlows, years, yearTypes } = state.adminReducer;
    // const {companys, plants} = state.adminReducer;
    return { sections, auditFlows, selfVsFinalPlantWiseScores, years, yearTypes };
};
export default withRouter(connect(mapStateToProps, { getAuditFlowMasterData, getSectionMasterData, getYearTypeMasterData, getYearMasterData, getSelfVsFinalScorePlantWiseDetails })(SelfVsFinalScore));
