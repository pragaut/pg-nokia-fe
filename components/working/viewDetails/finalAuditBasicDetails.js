import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Wrapper from '../../shared/Wrapper';
import { getFinalAuditPlanDetails } from '../../../actions/working.action';
import moment from 'moment';
import * as CommonStyle from '../../commonStyle';
import next from 'next';

class finalAuditBasicDetails extends Wrapper {
    constructor(props) {
        super(props)
        this.state = {
            finalAuditPlanDetailsForExecution: [],
            finalAuditPlanDetail: null,
            sections: [],
            auditPlanId: '',
            finalAuditBasicDetailsView: true,
            finalAuditPlans: [],
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : 'no-id',
            filterParameter: {
                executedAuditExclude: 'No',
                cancelledAuditExclude: 'Yes'
            },
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.finalAuditPlans && nextProps.finalAuditPlans !== null && nextProps.finalAuditPlans !== 'undefined' && nextProps.finalAuditPlans != this.state.finalAuditPlans) {
            const dataSingle = nextProps.finalAuditPlans && nextProps.finalAuditPlans.length > 0 && nextProps.finalAuditPlans[0];
            this.setState({
                finalAuditPlanDetail: dataSingle,
                finalAuditPlans: nextProps.finalAuditPlans,
            })
        }
        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId !== this.state.auditPlanDetailsId) {
            let filters = {
                finalAuditDetailsId: nextProps.auditPlanDetailsId,
                executedAuditExclude: 'No',
                cancelledAuditExclude: 'Yes'
            }
            this.props.getFinalAuditPlanDetails(filters);
            this.setState({
                auditPlanId: nextProps.auditPlanDetailsId,
                auditPlanDetailsId: nextProps.auditPlanDetailsId,
            });
        }
    }

    componentDidMount() {
        if (this.props && this.props.auditPlanDetailsId && this.props.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanId: this.props.auditPlanId,
                auditPlanDetailsId: this.props.auditPlanDetailsId,
            });
            let filters = {
                finalAuditDetailsId: this.props.auditPlanDetailsId,
                executedAuditExclude: 'No',
                cancelledAuditExclude: 'Yes'
            }
            this.props.getFinalAuditPlanDetails(filters);
        }
        else {
            const auditPlanDetailsId = this.state.auditPlanDetailsId;
            if (auditPlanDetailsId) {
                let filters = {
                    finalAuditDetailsId: auditPlanDetailsId,
                    executedAuditExclude: 'No',
                    cancelledAuditExclude: 'Yes'
                }
                this.props.getFinalAuditPlanDetails(filters);
            }
        }
    }

    updateColumns = (column) => {
        this.setState({
            columns: column
        })
    }
    showHandler = (key) => {
        this.setState({
            [key]: !this.state[key],
        });
    }
    render() {
        const { finalAuditPlanDetail, finalAuditBasicDetailsView, finalAuditPlanDetailsForExecution } = this.state;
        const dataRow = finalAuditPlanDetailsForExecution ? finalAuditPlanDetailsForExecution : [];
        console.log("finalAuditPlanDetail 2", finalAuditPlanDetail)
        return (
            <CommonStyle.MainDiv
                padding="10px 0px 20px 0px"
                flexdirection="column"
                width="100%"
            >
                <CommonStyle.MainDiv
                    padding="0px 10px"
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
                            onClick={() => this.showHandler('finalAuditBasicDetailsView')}
                            style={{ marginTop: '-15px', cursor: 'pointer', justifyContent: 'center', textAlign: 'center' }}

                        >
                            {finalAuditBasicDetailsView === true
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
                            Final Audit Basic Details
                </CommonStyle.TextDiv>
                    </CommonStyle.MainDiv>
                </CommonStyle.MainDiv>
                {finalAuditBasicDetailsView === true &&
                    <CommonStyle.TABLE_ONLYOUTER>
                        {/* <CommonStyle.TR_ONLY_OUTER>
       <CommonStyle.TH
           colSpan="4"
           bgColor={"teal"}
           color="#ffffff"
           fontsize="20px"
           textAlign={"center"}
       >
           Final Audit Basic Details
       </CommonStyle.TH>
   </CommonStyle.TR_ONLY_OUTER> */}
                        <CommonStyle.TR_ONLY_OUTER>
                            <CommonStyle.TH>
                                Audit Number
       </CommonStyle.TH>
                            <CommonStyle.TD>
                                {finalAuditPlanDetail && finalAuditPlanDetail.auditNumber}
                            </CommonStyle.TD>
                            <CommonStyle.TH>
                                Final Audit Date
       </CommonStyle.TH>
                            <CommonStyle.TD>
                                {finalAuditPlanDetail && moment(new Date(finalAuditPlanDetail.auditFromDate)).format("DD-MMM-YYYY")}
                            </CommonStyle.TD>
                        </CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TR_ONLY_OUTER>
                            <CommonStyle.TH>
                                Company
       </CommonStyle.TH>
                            <CommonStyle.TD>
                                {finalAuditPlanDetail && finalAuditPlanDetail.companyName}
                            </CommonStyle.TD>
                            <CommonStyle.TH>
                                Plant HR Head
       </CommonStyle.TH>
                            <CommonStyle.TD>
                                {finalAuditPlanDetail && finalAuditPlanDetail.plantHRHead}
                            </CommonStyle.TD>
                        </CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TR_ONLY_OUTER>
                            <CommonStyle.TH>
                                Plant
       </CommonStyle.TH>
                            <CommonStyle.TD>
                                {finalAuditPlanDetail && finalAuditPlanDetail.plantName}
                            </CommonStyle.TD>
                            <CommonStyle.TH>
                                Auditee Team
       </CommonStyle.TH>
                            <CommonStyle.TD>
                                {finalAuditPlanDetail && finalAuditPlanDetail.AuditeeTeamName}
                            </CommonStyle.TD>
                        </CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TR_ONLY_OUTER>
                            <CommonStyle.TH>
                                HR Auditor
       </CommonStyle.TH>
                            <CommonStyle.TD>
                                {finalAuditPlanDetail && finalAuditPlanDetail.hRAuditorName}
                            </CommonStyle.TD>
                            <CommonStyle.TH>
                                Operation Auditor
       </CommonStyle.TH>
                            <CommonStyle.TD>
                                {finalAuditPlanDetail && finalAuditPlanDetail.operationAuditorName}
                            </CommonStyle.TD>
                        </CommonStyle.TR_ONLY_OUTER>
                        <CommonStyle.TR_ONLY_OUTER>
                            <CommonStyle.TH>
                                Remarks
       </CommonStyle.TH>
                            <CommonStyle.TD  >
                                {finalAuditPlanDetail && finalAuditPlanDetail.auditPlanRemarks}
                            </CommonStyle.TD>
                            <CommonStyle.TH>
                                Corporate Auditor
       </CommonStyle.TH>
                            <CommonStyle.TD>
                                {finalAuditPlanDetail && finalAuditPlanDetail.CorporateAuditorTeamName}
                            </CommonStyle.TD>
                        </CommonStyle.TR_ONLY_OUTER>
                        {finalAuditPlanDetail && finalAuditPlanDetail.actionPlanRemarks && finalAuditPlanDetail.actionPlanRemarks !== null && finalAuditPlanDetail.actionPlanRemarks !== '' && finalAuditPlanDetail.actionPlanRemarks !== 'action plan submitted' &&
                            <CommonStyle.TR_ONLY_OUTER>
                                <CommonStyle.TH>
                                    Action Plan  Remarks
               </CommonStyle.TH>
                                <CommonStyle.TD colSpan="3"  >
                                    {finalAuditPlanDetail.actionPlanRemarks}
                                </CommonStyle.TD>
                            </CommonStyle.TR_ONLY_OUTER>
                        }
                    </CommonStyle.TABLE_ONLYOUTER>

                }
            </CommonStyle.MainDiv >
        );
    }

}
const mapStateToProps = state => {
    const { finalAuditPlans } = state.workingReducer;
    return { finalAuditPlans };
}
export default withRouter(connect(mapStateToProps, { getFinalAuditPlanDetails })(finalAuditBasicDetails));
