import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../commonStyle'
import { getSelfVsFinalScorePlantWiseDetails } from '../../actions/report.action';
import Wrapper from '../shared/Wrapper';
import { getSectionMasterData, getYearTypeMasterData, getYearMasterData } from '../../actions/admin.action';

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
            onlyPlantArray: [],
            yearTypes: [],
            years: []
        };

    };
    componentDidMount() {
        const currentSessionDetails = this.getCurrent_YearType_Year_IsCentralPlantCompany();

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
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selfVsFinalPlantWiseScores && nextProps.selfVsFinalPlantWiseScores != this.state.selfVsFinalPlantWiseScores) {
            this.NewArrayFunction(nextProps.selfVsFinalPlantWiseScores)
            this.setState({
                selfVsFinalPlantWiseScores: nextProps.selfVsFinalPlantWiseScores
            });
        }
        if (nextProps.sections && nextProps.sections !== null && nextProps.sections != this.state.sections) {
            this.setState({ sections: nextProps.sections });
        }
        // if (nextProps && nextProps.yearTypes && nextProps.yearTypes !== this.state.yearTypes) {
        //     this.setState({ yearTypes: nextProps.yearTypes })
        // }
        if (nextProps.years && nextProps.years !== null && nextProps.years != this.state.years) {
            this.setState({ years: nextProps.years })
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
        const { selfVsFinalPlantWiseScores, filterParameter, years, currentSessionDetails, plantAndAuditTypeWiseArray, sections, columns } = this.state;
        let OnySectionName = sections && sections.length > 0 && sections.map(item => item.sectionName);
        let ColumnName = ['Audit Type']
        ColumnName = ColumnName.concat(OnySectionName);
        let chartArrayData = [];
        plantAndAuditTypeWiseArray && plantAndAuditTypeWiseArray.length > 0 && plantAndAuditTypeWiseArray.forEach(element => {
            let onlySectionData = element && element.sectionWiseScore && element.sectionWiseScore.length > 0 && element.sectionWiseScore.map(item => parseFloat(item.score || 0));
            let ColumnData = [element.auditFlow];
            ColumnData = ColumnData.concat(onlySectionData);
            chartArrayData.push(ColumnData)
        });
        let chartData = [ColumnName];
        chartData = chartData.concat(chartArrayData);
        var options = {
            isStacked: true,
            'legend': {
                'position': 'top',
                'alignment': 'start',
                'textStyle': { 'fontName': 'Asap', 'color': '#000000' }
            },
        }
        let height = "450px";
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            ><CommonStyle.FormDiv>
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
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height={height}
                    data={chartData}
                    options={options}
                    legendToggle
                />
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { selfVsFinalPlantWiseScores } = state.reportReducer;
    const { sections, years, yearTypes } = state.adminReducer;
    // const {companys, plants} = state.adminReducer;
    return { sections, selfVsFinalPlantWiseScores, years, yearTypes };
};
export default withRouter(connect(mapStateToProps, { getSectionMasterData, getYearTypeMasterData, getYearMasterData, getSelfVsFinalScorePlantWiseDetails })(SelfVsFinalScore));
