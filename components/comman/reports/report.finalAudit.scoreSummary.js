import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../commonStyle'
import { getFinalAuditScoreSummaryDetails_SubSectionWise, getFinalAuditScoreSummaryDetails_SectionWise } from '../../actions/report.action';
import Wrapper from '../shared/Wrapper';
import Gap from '../Gap';
import { withRouter } from 'next/router';
import _ from "lodash";

class FinalAuditSummaryScore extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            finalAuditScoreSummarySubSections: [],
            finalAuditScoreSummarySections: [],
            isFinalAuditSummaryVisible: true,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            filterParameter: {
                auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            }
        };
    };
    componentDidMount() {
        const existingState = Object.assign({}, this.state.filterParameter);
        let auditPlanDetailsId = this.state.auditPlanDetailsId;
        existingState["auditPlanDetailsId"] = auditPlanDetailsId;
        this.props.getFinalAuditScoreSummaryDetails_SubSectionWise(existingState);
        this.props.getFinalAuditScoreSummaryDetails_SectionWise(existingState);
        this.setState({ filterParameter: existingState })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.finalAuditScoreSummarySubSections && nextProps.finalAuditScoreSummarySubSections !== null && nextProps.finalAuditScoreSummarySubSections != this.state.finalAuditScoreSummarySubSections) {
            this.setState({ finalAuditScoreSummarySubSections: nextProps.finalAuditScoreSummarySubSections });
        }
        if (nextProps.finalAuditScoreSummarySections && nextProps.finalAuditScoreSummarySections !== null && nextProps.finalAuditScoreSummarySections != this.state.finalAuditScoreSummarySections) {
            this.setState({ finalAuditScoreSummarySections: nextProps.finalAuditScoreSummarySections })
        }
        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId !== this.state.auditPlanDetailsId) {
            const existingState = Object.assign({}, this.state.filterParameter);
            let auditPlanDetailsId = nextProps.auditPlanDetailsId;
            existingState["auditPlanDetailsId"] = auditPlanDetailsId;
            this.props.getFinalAuditScoreSummaryDetails_SubSectionWise(existingState);
            this.props.getFinalAuditScoreSummaryDetails_SectionWise(existingState);
            this.setState({ auditPlanDetailsId: nextProps.auditPlanDetailsId })

        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }
    showHandler = (key) => {
        this.setState({
            [key]: !this.state[key],
        });
    }
    render() {
        const { finalAuditScoreSummarySubSections, finalAuditScoreSummarySections, isFinalAuditSummaryVisible } = this.state;
        let allSectionCount = finalAuditScoreSummarySections && finalAuditScoreSummarySections.length;
        let sectionCount = allSectionCount && allSectionCount > 1 && parseInt(allSectionCount - 1);
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
                justifycontent="flex-start"
                alignitems="baseline"
                border={"1px solid black"}
                style={{ overflow: 'visible' }}
            >
                <CommonStyle.MainDiv
                    padding="0px 0px"
                    flexdirection="column"
                    width="100%"
                >
                    <CommonStyle.MainDiv
                        flexwrap="wrap"
                        bgColor="#006666"
                        padding="10px 0px"
                        width='100%'
                        height="20px"
                        border="1px solid #006666"
                        justifycontent="start"
                    >
                        <CommonStyle.TextDiv
                            width="3%"
                            fontsize="30px"
                            color="#ffffff"
                            lineheight="1.5"
                            onClick={() => this.showHandler('isFinalAuditSummaryVisible')}
                            style={{ marginTop: '-15px', cursor: 'pointer', justifyContent: 'center', textAlign: 'center' }}

                        >
                            {isFinalAuditSummaryVisible === true
                                ? '-'
                                : '+'
                            }
                        </CommonStyle.TextDiv>
                        <CommonStyle.TextDiv
                            width="90%"
                            fontsize="20px"
                            textalign="left"
                            justifycontent="flex-start"
                            alignitems="baseline"
                            color="#ffffff"

                            style={{ marginTop: '-10px' }}

                        >
                            Final Audit Score  Summary
             </CommonStyle.TextDiv>
                    </CommonStyle.MainDiv>
                    <Gap h="10px" />
                </CommonStyle.MainDiv>
                {isFinalAuditSummaryVisible === true &&
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexwrap={"wrap"}
                        flexdirection="row"
                        justifycontent={"space-between"}
                        alignitems="baseline"

                    >
                        {finalAuditScoreSummarySections && finalAuditScoreSummarySections.length > 0 && finalAuditScoreSummarySections.map((item, index) => {

                            const filterSubSectionData = finalAuditScoreSummarySubSections && finalAuditScoreSummarySubSections.length > 0 && finalAuditScoreSummarySubSections.filter(d => d.sectionMasterId === item.sectionMasterId);
                            if (filterSubSectionData && filterSubSectionData.length > 0) {
                                return <CommonStyle.MainDiv
                                    padding="0px 0px"
                                    width={sectionCount > 2 ? "48%" : "48%"}
                                    key={index}
                                    style={{ marginBottom: '10px' }}
                                >
                                    <CommonStyle.TABLE>
                                        <thead>
                                            <tr>
                                                <th className="textalignleft" colSpan="2"> {item.sectionName}</th>
                                                <th>Max</th>
                                                <th>Score</th>
                                                <th>%</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterSubSectionData.map((sub, subIndex) => {
                                                return <tr key={"sub" + subIndex}>
                                                    <td>{(subIndex + 1)}</td>
                                                    <td className="textalignleft" >
                                                        {sub.subSectionName}
                                                    </td>
                                                    <td>{sub.totalMaxScoremaxScore}</td>
                                                    <td>{sub.totalactualScore}</td>
                                                    <td>{sub.ScorePercentage}</td>
                                                </tr>
                                            })}
                                            <tr>
                                                <td colSpan="2" className="textalignleft" >
                                                    Sub Total {item.sectionName}
                                                </td>
                                                <td>{item.totalMaxScoremaxScore}</td>
                                                <td>{item.totalactualScore}</td>
                                                <td>{item.ScorePercentage} %</td>
                                            </tr>
                                        </tbody>
                                    </CommonStyle.TABLE>
                                </CommonStyle.MainDiv>
                            }
                        })}
                    </CommonStyle.MainDiv >

                }
                <Gap h="10px" />
                {isFinalAuditSummaryVisible === true &&
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexwrap={"wrap"}
                        flexdirection="row"
                        justifycontent={"center"}
                        alignitems="baseline"

                    >
                        {(finalAuditScoreSummarySections && finalAuditScoreSummarySections.length > 1) &&
                            <CommonStyle.MainDiv
                                padding="0px 0px"
                                width={"48%"}
                                flexdirection="column"

                            >
                                <CommonStyle.TABLE>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: "center", backgroundColor: 'teal', fontSize: '28px', color: '#fff' }} colSpan="5">
                                                HR Final Audit Score
                                        </th>
                                        </tr>
                                        <tr>
                                            <th className="textalignleft" colSpan="2">  </th>
                                            <th>Max</th>
                                            <th>Score</th>
                                            <th>%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {finalAuditScoreSummarySections && finalAuditScoreSummarySections.length > 0 && finalAuditScoreSummarySections.map((item, index) => {
                                            return <tr key={"overall" + index}>
                                                <td colSpan="2" className="textalignleft" >
                                                    {index === sectionCount ?
                                                        <span>{item.sectionName}</span>
                                                        :
                                                        <span>
                                                            Sub Total {item.sectionName}
                                                        </span>
                                                    }

                                                </td>
                                                <td>{item.totalMaxScoremaxScore}</td>
                                                <td>{item.totalactualScore}</td>
                                                <td>{item.ScorePercentage} %</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </CommonStyle.TABLE>
                            </CommonStyle.MainDiv>
                        }
                    </CommonStyle.MainDiv >

                }
            </CommonStyle.MainDiv>)
    }
}

const mapStateToProps = state => {
    const { finalAuditScoreSummarySubSections, finalAuditScoreSummarySections } = state.reportReducer;
    return { finalAuditScoreSummarySubSections, finalAuditScoreSummarySections };
};
export default withRouter(connect(mapStateToProps, { getFinalAuditScoreSummaryDetails_SubSectionWise, getFinalAuditScoreSummaryDetails_SectionWise })(FinalAuditSummaryScore));
