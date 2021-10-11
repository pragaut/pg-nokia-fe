import React from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Button } from '../../formStyle';
import { getActionPlanUpdate_NotRequiredObservation } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import Gap from '../../Gap';
import ViewFinalAuditBasicDetails from './finalAuditBasicDetails';
import UpdateActionPlanObservationIndex from './actionPlanUpdatedObservation';
import { withRouter } from 'next/router';
class viewActionPlanIndex extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            selectedAuditPlanDetailsId: props.selectedAuditPlanDetailsId ? props.selectedAuditPlanDetailsId : undefined,
            auditFlowMasterId: '',
            processFlowMasterId: '',
            processFlowCode: props.processFlowCode ? props.processFlowCode : '',
            processFlowName: '',
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            isfinalAuditActionPlanVisible: true

        };
    };


    componentDidMount() {
        if (this.props && this.props.auditFlowMasterId && this.props.auditFlowMasterId != this.state.auditFlowMasterId) {
            this.setState({
                auditFlowMasterId: this.props.auditFlowMasterId,
            })
        }
        if (this.props && this.props.processFlowMasterId && this.props.processFlowMasterId != this.state.processFlowMasterId) {
            this.setState({
                processFlowMasterId: this.props.processFlowMasterId,
            })
        }
        if (this.props && this.props.processFlowCode && this.props.processFlowCode != this.state.processFlowCode) {
            this.setState({
                processFlowCode: this.props.processFlowCode,
            })
        }
        if (this.props && this.props.processFlowName && this.props.processFlowName != this.state.processFlowName) {
            this.setState({
                processFlowName: this.props.processFlowName,
            })
        }
        if (this.props && this.props.auditPlanDetailsId && this.props.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanDetailsId: this.props.auditPlanDetailsId,
            })
        }
        setTimeout(() => {
            let Filter = {
                auditPlanDetailsId: this.state.auditPlanDetailsId ? this.state.auditPlanDetailsId : 'no-id',
                onlyActionPlanUpdateObservation: 'Yes'
            }
            this.props.getActionPlanUpdate_NotRequiredObservation(Filter, undefined, 0, constants.ALL_ROWS_LIST);
        }, 100);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId
            });
        }
        if (nextProps.multiSectionMasterId && nextProps.multiSectionMasterId != this.state.multiSectionMasterId) {
            this.setState({
                multiSectionMasterId: nextProps.multiSectionMasterId
            });
        }
        if (nextProps.actionRequiredObservations && nextProps.actionRequiredObservations != this.state.actionRequiredObservations) {
            this.setState({
                actionRequiredObservations: nextProps.actionRequiredObservations
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


    onClickCancel = () => {
        const state = {};
        // this.state.selfAuditPlan = []; 
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }

    onClickBackButton = () => {

        const CurrentRole = this.getLoggedUserRole_JSONConverted();
        const roleCode = CurrentRole && CurrentRole.roleCode;
        console.log("roleCode : ", roleCode);

        let p_pathname = 'plantHrHead';
        let p_Url = 'plantHrHead/action-plan-update';
        let tab = 'action-plan-update';
        let pageName = 'Action Plan Update';

        if (roleCode === "Corporate_Coordinator") {
            p_pathname = "corporateCoordinator";
            p_Url = 'corporateCoordinator/action-plan-update';
        }
        else if (roleCode === "Auditor") {
            p_pathname = "auditor";
            p_Url = 'auditor/action-plan-update';
        }
        else if (roleCode === "Management") {
            p_pathname = "management";
            p_Url = 'management/action-plan-update';
        }
        else if (roleCode === "CompanyHRHead" || roleCode === "companyHRHead") {
            p_pathname = "companyHRHead";
            p_Url = 'companyHRHead/final-audit-closure';
            tab = 'final-audit-closure';
            pageName = 'Final Audit Closure';
        }
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'action-plan-update';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';

        this.props.router.push(
            {
                pathname: p_pathname,
                query: {
                    tab: tab, //'action-plan-update',
                    pageName: pageName, //'Action Plan Update',
                    id: processFlowMasterId,
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName,
                    processFlowCode: processFlowCode,
                    auditFlowMasterId: auditFlowMasterId,
                    //auditPlanDetailsId: auditPlanDetailsId
                },
                tab: tab, //'action-plan-update',
            },
            p_Url
        )
    }
    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    showHandler = (key) => {
        this.setState({
            [key]: !this.state[key],
        });
    }
    render() {
        const { isBackButtonHide, finalBasicDetailsHide } = this.props;
        const { isfinalAuditActionPlanVisible, actionRequiredObservations, multiSectionMasterId, auditPlanDetailsId, processFlowCode } = this.state;
        const finalAuditPlanDetailsId = auditPlanDetailsId && auditPlanDetailsId !== null && auditPlanDetailsId !== '' ? auditPlanDetailsId : 'no-id';
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
                justifycontent="flex-start"
                alignitems="baseline"
                style={{ overflow: 'visible' }}
            >
                {(!isBackButtonHide || isBackButtonHide === false) &&
                    <Button
                        width="100px"
                        height="40px"
                        borderRadius="10px"
                        bgColor="teal"
                        onClick={() => this.onClickBackButton()}
                    >
                        Back
                    </Button>
                }
                {(!finalBasicDetailsHide || finalBasicDetailsHide === false) &&
                    <ViewFinalAuditBasicDetails
                        auditPlanDetailsId={finalAuditPlanDetailsId}
                    />
                }
                {actionRequiredObservations && actionRequiredObservations.length > 0 &&
                    <>
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
                                    onClick={() => this.showHandler('isfinalAuditActionPlanVisible')}
                                    style={{ marginTop: '-15px', cursor: 'pointer', justifyContent: 'center', textAlign: 'center' }}

                                >
                                    {isfinalAuditActionPlanVisible === true
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
                                    Final Audit Action Plan
             </CommonStyle.TextDiv>
                            </CommonStyle.MainDiv>
                        </CommonStyle.MainDiv>
                        {isfinalAuditActionPlanVisible === true &&
                            <UpdateActionPlanObservationIndex
                                actionRequiredObservations={actionRequiredObservations}
                            />
                        }

                    </>
                }
                {finalBasicDetailsHide && finalBasicDetailsHide === true ?
                    <Gap h="0px" />
                    :
                    <Gap h="100px" />
                }
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { actionRequiredObservations, actionRequiredRecordsCount } = state.workingReducer;
    return { actionRequiredObservations, actionRequiredRecordsCount };

};
export default withRouter(connect(mapStateToProps, { getActionPlanUpdate_NotRequiredObservation })(viewActionPlanIndex));
