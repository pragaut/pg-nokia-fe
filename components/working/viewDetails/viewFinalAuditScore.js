import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { getFinalAuditScopeForExecution_ForAll, getFinalAuditObservationDetails, getMediaDetailsbyAuditPlanDetailsId } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import moment from 'moment';
import Gap from '../../Gap';
import config from '../../../config';
class ViewFinalAuditScore extends Wrapper {

    constructor(props) {
        super(props);
        //  const multiselectRef = useRef();
        this.state = {
            processFlowCode: props.processFlowCode ? props.processFlowCode : '',
            finalAuditScopeDetailsForExecution: [],
            mediaDetails: [],
            userId: '',
            supportingDocs: [],
            isfinalAuditScoreVisible: true,
            selectedAuditPlanDetailsId: undefined,
            multiSectionMasterId: props.multiSectionMasterId ? props.multiSectionMasterId : undefined,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,

        };
    };

    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }

    componentDidMount() {
        if (this.props && this.props.auditPlanDetailsId && this.props.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanId: this.props.auditPlanId,
                auditPlanDetailsId: this.props.auditPlanDetailsId,
            })
        }
        const LoggedUser = this.loggedUser();
        // console.log("LoggedUser", LoggedUser);
        let auditPlanDetalsId = this.state.auditPlanDetailsId ? this.state.auditPlanDetailsId : 'no-id';
        const UserId = LoggedUser && LoggedUser.id;

        setTimeout(() => {

            let filters = {
                userId: UserId,
                auditDetailsId: this.state.auditPlanDetailsId,
                auditPlanDetailsId: this.state.auditPlanDetailsId,
            }
            this.props.getFinalAuditScopeForExecution_ForAll(filters, undefined, 0, constants.ALL_ROWS_LIST);
            this.props.getFinalAuditObservationDetails(this.state.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
            this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, auditPlanDetalsId)
        }, 200);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log("finalAuditPlanExecutionDetailActiontype nextProps : ", nextProps.finalAuditPlanExecutionDetailActiontype);      
        if (nextProps && nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanId: nextProps.auditPlanDetailsId,
                auditPlanDetailsId: nextProps.auditPlanDetailsId,
            })
            let filters = {
                auditDetailsId: nextProps.auditPlanDetailsId,
                auditPlanDetailsId: nextProps.auditPlanDetailsId,
            }
            this.props.getFinalAuditScopeForExecution_ForAll(filters, undefined, 0, constants.ALL_ROWS_LIST);
            this.props.getFinalAuditObservationDetails(nextProps.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
            this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, nextProps.auditPlanDetailsId)
            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId
            });
        }

        if (nextProps.finalAuditScopeDetailsForExecution && nextProps.finalAuditScopeDetailsForExecution != this.state.finalAuditScopeDetailsForExecution) {
            this.setState({
                finalAuditScopeDetailsForExecution: nextProps.finalAuditScopeDetailsForExecution
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

    ConvertStringToArrayRoleReturn = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring;
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
        const { finalAuditScopeDetailsForExecution, supportingDocs, isfinalAuditScoreVisible } = this.state;
        let i = 1;

        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                {finalAuditScopeDetailsForExecution && finalAuditScopeDetailsForExecution.length > 0 &&
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
                                    onClick={() => this.showHandler('isfinalAuditScoreVisible')}
                                    style={{ marginTop: '-15px', cursor: 'pointer', justifyContent: 'center', textAlign: 'center' }}

                                >
                                    {isfinalAuditScoreVisible === true
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
                                    Final Audit Observation Details
             </CommonStyle.TextDiv>
                            </CommonStyle.MainDiv>
                        </CommonStyle.MainDiv>
                        {isfinalAuditScoreVisible === true &&
                            <CommonStyle.TABLE_ForExecuteAudit>
                                <tr>
                                    <th>Sr</th>
                                    {/* <th>Section</th> */}
                                    <th>Sub Section</th>
                                    <th>Question</th>
                                    <th>Criticality</th>
                                    <th>Audit Mode</th>
                                    <th>Expected Standard</th>
                                    <th>Reference Documents/Evidence to be Checked</th>
                                    <th>Self Audit Observation</th>
                                    <th>Audit Observation</th>
                                    <th>Equivalent Score</th>
                                    <th>Max Marks</th>
                                    <th>Comments from Auditor</th>
                                    <th style={{ width: '100px !important' }}>Evidence</th>
                                </tr>
                                {finalAuditScopeDetailsForExecution && finalAuditScopeDetailsForExecution.length > 0 && finalAuditScopeDetailsForExecution.map((item, index) => {
                                    const filterMediaDeails = supportingDocs && supportingDocs.length > 0 && supportingDocs.filter(m => m.scopeMasterId === item.scopeMasterId)
                                    return <tr key={index}>
                                        <td>{index + i}</td>
                                        {/* <td>{item.section && item.section.sectionName}</td> */}
                                        <td>{item.subSectionName}
                                            <br />
({item.sectionName})
</td>
                                        <td>{item.question}</td>
                                        <td>{item.criticalityName}</td>
                                        <td>{item.auditModeName}</td>
                                        <td>{item.expectedStandard}</td>
                                        <td>{item.referenceDocumentToBeChecked}</td>
                                        <td>{item.selfAuditObservationName ? item.selfAuditObservationName : 'N/A'}</td>
                                        <td>
                                            {item.observationName}
                                        </td>
                                        <td>
                                            {item.auditActualScore}
                                        </td>
                                        <td>
                                            {item.auditMaxScore}
                                        </td>
                                        <td>
                                            {item.auditObservationRemarks}
                                        </td>
                                        <td style={{ width: '120px !important' }}>
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
                                                return <a title={imageAddress && imageAddress !== '' && this.getFileName(imageAddress)} href={imageAddress} target='_blank'>
                                                    <img style={{ width: '20px', height: '20px', marginRight: '3px', border: '1px solid white' }} src="../../../static/downloadicon.png"></img>
                                                    {/* <img style={{ width: '20px', height: '20px', marginRight: '3px', border: '1px solid black' }} src={imageAddress} alt="score evidence" /> */}
                                                </a>
                                            })

                                            }
                                        </td>
                                    </tr>

                                })

                                }
                            </CommonStyle.TABLE_ForExecuteAudit>
                        }

                    </>
                }

                <Gap h="10px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { finalAuditScopeDetailsForExecution, supportingDocs } = state.workingReducer;
    return { supportingDocs, finalAuditScopeDetailsForExecution };
};

export default withRouter(connect(mapStateToProps, { getMediaDetailsbyAuditPlanDetailsId, getFinalAuditScopeForExecution_ForAll, getFinalAuditObservationDetails })(ViewFinalAuditScore));