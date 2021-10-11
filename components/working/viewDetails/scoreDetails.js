import React from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { getSelfAudit_ScoreDetails_WithAssicition, getMediaDetailsbyAuditPlanDetailsId, getSelfAudit_ScopeDetails } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import Gap from '../../Gap';
import config from '../../../config';
import * as _ from "lodash";

class scopeDetails extends Wrapper {
    constructor(props) {
        super(props);

        this.state = {
            auditObservations: [],
            processFlowCode: props.processFlowCode ? props.processFlowCode : '',
            selfAuditScopeDetails: [],
            scoringRules: [],
            mediaDetails: [],
            isSelfAuditScoreVisible: true,
            supportingDocs: [],
            selfAuditScopeDetails: [],
            observationDetails: {
                processFlowCode: props.processFlowCode ? props.processFlowCode : 'self-audit-team-assigment-and-audit-execution'

            },
            auditObservationDetils: [],
            userId: '',
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined
        };
    };
    componentDidMount() {
        this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.auditPlanDetailsId)
        this.props.getSelfAudit_ScopeDetails(this.state.auditPlanDetailsId, undefined, 0, constants.ALL_ROWS_LIST, undefined, undefined, 'Yes');
        // this.props.getSelfAudit_ScoreDetails_WithAssicition(this.state.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selfAuditScoreDetails && nextProps.selfAuditScoreDetails.length > 0 && nextProps.selfAuditScoreDetails != this.state.auditObservationDetils) {
            this.setState({
                auditObservationDetils: nextProps.selfAuditScoreDetails
            });
        }
        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {

            this.props.getSelfAudit_ScoreDetails_WithAssicition(nextProps.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId
            });
        }
        if (nextProps.selfAuditScopeDetails && nextProps.selfAuditScopeDetails != this.state.selfAuditScopeDetails) {
            this.setState({
                selfAuditScopeDetails: nextProps.selfAuditScopeDetails
            });
        }
        if (nextProps.supportingDocs && nextProps.supportingDocs != this.state.supportingDocs) {
            this.setState({
                supportingDocs: nextProps.supportingDocs
            });
        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }
    getFileName = (str) => {
        return str.split('\\').pop().split('/').pop();
    }
    showHandler = (key) => {
        this.setState({
            [key]: !this.state[key],
        });
    }
    render() {
        const { auditObservationDetils, selfAuditScopeDetails, isSelfAuditScoreVisible, supportingDocs } = this.state;
        let i = 1;
        //let KeyObject = ["scopeMaster.section.sectionOrder", "scopeMaster.subsection.subSectionOrder"];
        //  const sortedauditObservationDetils = auditObservationDetils && auditObservationDetils.length > 0 && this.orderByInArrayObject(KeyObject, auditObservationDetils);// auditObservationDetils && auditObservationDetils.length > 0 && auditObservationDetils.sort((a, b) => a.scopeMaster.section.sectionName.localeCompare(b.scopeMaster.section.sectionName)).sort((c, d) => c.scopeMaster.subsection.subSectionName.localeCompare(d.scopeMaster.subsection.subSectionName)).sort((e, f) => (e.scopeMaster.scopeOrder < f.scopeMaster.scopeOrder));

        const loadershow = this.state.loadershow && this.state.loadershow ? this.state.loadershow : false;

        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                {selfAuditScopeDetails && selfAuditScopeDetails.length > 0 &&
                    <>
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
                                    onClick={() => this.showHandler('isSelfAuditScoreVisible')}
                                    style={{ marginTop: '-15px', cursor: 'pointer', justifyContent: 'center', textAlign: 'center' }}

                                >
                                    {isSelfAuditScoreVisible === true
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
                                    Self Audit Observation Details
             </CommonStyle.TextDiv>
                            </CommonStyle.MainDiv>
                        </CommonStyle.MainDiv>
                        {isSelfAuditScoreVisible === true &&
                            <CommonStyle.TABLE>
                                <tr>
                                    <th>Sr</th>
                                    <th>Section</th>
                                    <th>Sub Section</th>
                                    <th>Question</th>
                                    {/* <th>Scope Order</th> */}
                                    <th>Criticality</th>
                                    <th>Audit Mode</th>
                                    <th>Expected Standard</th>
                                    <th>Reference Documents/Evidence to be Checked</th>
                                    <th>Audit Observation</th>
                                    <th>Equivalent Score</th>
                                    <th>Max Marks</th>
                                    <th>Comments from Auditor</th>
                                    <th style={{ width: '120px !important' }}>Evidence</th>
                                </tr>
                                {selfAuditScopeDetails && selfAuditScopeDetails.length > 0 && selfAuditScopeDetails.map((item, index) => {
                                    const filterMediaDeails = supportingDocs && supportingDocs.length > 0 && supportingDocs.filter(m => m.scopeMasterId === item.scopeMasterId)
                                    return <tr key={index}>
                                        <td className="textalignleft">{index + i}</td>
                                        <td className="textalignleft">
                                            {item.sectionName}
                                        </td>
                                        <td className="textalignleft">
                                            {item.subSectionName}
                                        </td>
                                        <td className="textalignleft">
                                            {item.question}</td>
                                        {/* <td className="textalignleft">
                                    {item.sectionOrder}-
                                    {item.subSectionOrder}-
                                    {item.scopeOrder}</td> */}

                                        <td className="textalignleft">
                                            {item.criticalityName}</td>
                                        <td className="textalignleft">{item.auditModeName}</td>
                                        <td className="textalignleft">{item.expectedStandard}</td>
                                        <td className="textalignleft">{item.referenceDocumentToBeChecked}</td>
                                        <td className="textalignleft">
                                            {item.observationName}
                                        </td>
                                        <td className="textalignleft">
                                            {item.actualScore}
                                        </td>
                                        <td className="textalignleft">
                                            {item.maxScore}
                                        </td>
                                        <td className="textalignleft">
                                            {item.observationRemarks}
                                        </td>
                                        <td className="textalignleft" style={{ width: '120px !important' }}>
                                            {filterMediaDeails && filterMediaDeails.length > 0 && filterMediaDeails.map((media, mindex) => {
                                                let imageAddress = '';
                                                if (media && media.mediaName) {
                                                    if (media.mediaFullsizeAddress.indexOf('https://') > -1) {
                                                        imageAddress = media.mediaFullsizeAddress;
                                                    }
                                                    else {
                                                        imageAddress = config.AUDIT_URL + constants.END_POINTS.IMAGES + media.mediaFullsizeAddress;
                                                    }
                                                }
                                                return <a title={this.getFileNameFromPath(imageAddress)} href={imageAddress} target='_blank'>
                                                    <img style={{ width: '20px', height: '20px', marginRight: '3px', border: '1px solid white' }} src="../../../static/downloadicon.png"></img>
                                                </a>
                                            })}
                                        </td>
                                    </tr>

                                })}
                            </CommonStyle.TABLE>
                        }

                    </>
                }
                <Gap h="10px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { selfAuditScoreDetails, selfAuditScopeDetailRecordsCount, supportingDocs, selfAuditScopeDetails } = state.workingReducer;
    return { selfAuditScoreDetails, selfAuditScopeDetailRecordsCount, supportingDocs, selfAuditScopeDetails };
};

export default connect(mapStateToProps, { getSelfAudit_ScoreDetails_WithAssicition, getMediaDetailsbyAuditPlanDetailsId, getSelfAudit_ScopeDetails })(scopeDetails);