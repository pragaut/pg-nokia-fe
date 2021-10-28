import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../commonStyle'
import { getSelfAuditScoreSummaryDetails_SubSectionWise, getSelfAuditScoreSummaryDetails_SectionWise } from '../../actions/report.action';
import Wrapper from '../shared/Wrapper';
import Gap from '../Gap';
import { withRouter } from 'next/router';
import _ from "lodash";

class SelfAuditSummaryScore extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            selfAuditScoreSummarySubSections: [],
            selfAuditScoreSummarySections: [],
            isSelfAuditSummaryVisible: true,
            filterParameter: {
                selfAuditPlanDetailsID: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            }
        };
    };
    componentDidMount() {
        const existingState = Object.assign({}, this.state.filterParameter);
        let selfAuditPlanDetailsID = this.state.selfAuditPlanDetailsID;
        existingState["selfAuditPlanDetailsID"] = selfAuditPlanDetailsID;
        this.props.getSelfAuditScoreSummaryDetails_SectionWise(existingState);
        this.props.getSelfAuditScoreSummaryDetails_SubSectionWise(existingState);
        this.setState({ filterParameter: existingState })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selfAuditScoreSummarySubSections && nextProps.selfAuditScoreSummarySubSections !== null && nextProps.selfAuditScoreSummarySubSections != this.state.selfAuditScoreSummarySubSections) {
            this.setState({ selfAuditScoreSummarySubSections: nextProps.selfAuditScoreSummarySubSections });
        }
        if (nextProps.selfAuditScoreSummarySections && nextProps.selfAuditScoreSummarySections !== null && nextProps.selfAuditScoreSummarySections != this.state.selfAuditScoreSummarySections) {
            this.setState({ selfAuditScoreSummarySections: nextProps.selfAuditScoreSummarySections })
        }
        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId !== this.state.selfAuditPlanDetailsID) {
            const existingState = Object.assign({}, this.state.filterParameter);
            let selfAuditPlanDetailsID = nextProps.auditPlanDetailsId;
            existingState["selfAuditPlanDetailsID"] = selfAuditPlanDetailsID;
            this.props.getSelfAuditScoreSummaryDetails_SectionWise(existingState);
            this.props.getSelfAuditScoreSummaryDetails_SubSectionWise(existingState);
            this.setState({ selfAuditPlanDetailsID: nextProps.auditPlanDetailsId })

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
        const { selfAuditScoreSummarySubSections, selfAuditScoreSummarySections, isSelfAuditSummaryVisible } = this.state;
        let allSectionCount = selfAuditScoreSummarySections && selfAuditScoreSummarySections.length;
        let sectionCount = allSectionCount && allSectionCount > 1 && parseInt(allSectionCount - 1);
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
                justifycontent="flex-start"
                alignitems="baseline"
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
                            onClick={() => this.showHandler('isSelfAuditSummaryVisible')}
                            style={{ marginTop: '-15px', cursor: 'pointer', justifyContent: 'center', textAlign: 'center' }}

                        >
                            {isSelfAuditSummaryVisible === true
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
                            Self Audit Score  Summary
             </CommonStyle.TextDiv>
                    </CommonStyle.MainDiv>
                </CommonStyle.MainDiv>
                {isSelfAuditSummaryVisible === true &&
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexwrap={"wrap"}
                        flexdirection="row"
                        justifycontent={"space-between"}
                        alignitems="baseline"
                       
                    >
                        {selfAuditScoreSummarySections && selfAuditScoreSummarySections.length > 0 && selfAuditScoreSummarySections.map((item, index) => {

                            const filterSubSectionData = selfAuditScoreSummarySubSections && selfAuditScoreSummarySubSections.length > 0 && selfAuditScoreSummarySubSections.filter(d => d.sectionMasterId === item.sectionMasterId);
                            if (filterSubSectionData && filterSubSectionData.length > 0) {
                                return <CommonStyle.MainDiv
                                    padding="0px 0px"
                                    width={sectionCount > 2 ? "48%" : "48%"}
                                    key={index}
                                    style={{marginBottom:'10px'}}
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
                        })

                        }
                    </CommonStyle.MainDiv >

                }
                <Gap h="10px" />
                {isSelfAuditSummaryVisible === true &&
                    <CommonStyle.MainDiv
                        padding="0px 0px"
                        flexwrap={"wrap"}
                        flexdirection="row"
                        justifycontent={"center"}
                        alignitems="baseline"

                    >

                        {(selfAuditScoreSummarySections && selfAuditScoreSummarySections.length > 0) &&
                            <CommonStyle.MainDiv
                                padding="0px 0px"
                                width={"48%"}

                            >
                                <CommonStyle.TABLE>
                                    <thead>
                                    <tr>
                                        <th style={{ textAlign: "center", backgroundColor: 'teal', fontSize: '28px', color: '#fff' }} colSpan="5">
                                            HR Self Audit Score
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
                                    {selfAuditScoreSummarySections && selfAuditScoreSummarySections.length > 0 && selfAuditScoreSummarySections.map((item, index) => {
                                        return <tr key={"overall"+index}>
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
    const { selfAuditScoreSummarySubSections, selfAuditScoreSummarySections } = state.reportReducer;
    return { selfAuditScoreSummarySubSections, selfAuditScoreSummarySections };
};
export default withRouter(connect(mapStateToProps, { getSelfAuditScoreSummaryDetails_SubSectionWise, getSelfAuditScoreSummaryDetails_SectionWise })(SelfAuditSummaryScore));
