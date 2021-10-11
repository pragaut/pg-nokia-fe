import React from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Button } from '../../formStyle';
import { getActionPlanMonthlyReviewDetails } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import Gap from '../../Gap';
import * as WorkingType from '../../../action-types/working.action.types';
import ViewFinalAuditBasicDetails from '../viewDetails/finalAuditBasicDetails';
import ActionPlanDetails from './view.actionPlanReview';
import { withRouter } from 'next/router';
import MonthlyReviewLegend from '../FilterComponent/legends';

class ActionPlanReviewDetails extends Wrapper {

    constructor(props) {
        super(props);
        //  const multiselectRef = useRef();
        this.state = {
            selectedAuditPlanDetailsId: props.selectedAuditPlanDetailsId ? props.selectedAuditPlanDetailsId : undefined,
            auditFlowMasterId: '',
            processFlowMasterId: '',
            processFlowCode: props.processFlowCode ? props.processFlowCode : 'action-plan-update',
            processFlowName: '',
            isActionPlanSubmitted: false,
            monthlyReviewDetails: [],
            currentMonthReviewDetails: [],
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : 'no-auditplan',
            isfinalAuditMonthlyReviewVisible: true

        };

    };


    componentDidMount() {

        const LoggedUser = this.loggedUser();
        const CurrentRole = this.getLoggedUserRole_JSONConverted()
        const UserId = LoggedUser && LoggedUser.id;
        const roleID = CurrentRole && CurrentRole.id;
        const companyMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.companyMasterID;
        const plantMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.id;

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
        //console.log("processFlowCode 0 : ", this.props.processFlowCode);
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

        this.setState({
            userId: UserId,
            roleMasterId: roleID,
            companyMasterId: companyMasterId,
            plantId: plantMasterId
        })

        setTimeout(() => {
            let Filter = {
                auditPlanDetailsId: this.state.auditPlanDetailsId
            }
            this.props.getActionPlanMonthlyReviewDetails(Filter, 0, constants.ALL_ROWS_LIST);

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

        if (nextProps.monthlyReviewDetails && nextProps.monthlyReviewDetails != this.state.monthlyReviewDetails) {
            this.setState({
                monthlyReviewDetails: nextProps.monthlyReviewDetails
            });
        }
        if (nextProps && nextProps.monthlyReviewActiontype && nextProps.monthlyReviewActiontype === WorkingType.MONTHLYREVIEW_SAVE_SUCCESS) {
            setTimeout(() => {
                this.onClickBackButton();
            }, 500);
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }

    onClickBackButton = () => {
        let auditPlanDetailsId = this.state.auditPlanDetailsId;
        const CurrentRole = this.getLoggedUserRole_JSONConverted();

        const RoleCode = CurrentRole && CurrentRole.roleCode;
        if (RoleCode === "PlantHRHead") {
            let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
            let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
            let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'action-plan-update';
            let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';

            this.props.router.push(
                {
                    pathname: 'plantHrHead',
                    query: {
                        tab: 'monthly-review',
                        pageName: 'Monthly Review',
                        id: processFlowMasterId,
                        processFlowMasterId: processFlowMasterId,
                        processFlowName: processFlowName,
                        processFlowCode: processFlowCode,
                        auditFlowMasterId: auditFlowMasterId,
                        //auditPlanDetailsId: auditPlanDetailsId
                    },
                    tab: 'action-plan-update',
                },
                'plantHrHead/monthly-review'
            )
        }
        else {
            this.props.router.push(
                {
                    pathName: '/corporateCoordinator',
                    tab: 'view-final-audit-action-plan',
                    query: {
                        tab: 'view-final-audit-action-plan',
                        id: auditPlanDetailsId,
                        auditPlanDetailsId: auditPlanDetailsId,
                        pageName: 'Review Final Audit Action Plan',
                    }
                }, 'corporateCoordinator/review-final-audit-action-plan'
            );
        }

    }
    showHandler = (key) => {
        this.setState({
            [key]: !this.state[key],
        });
    }
    render() {
        const { isBackButtonHide, finalBasicDetailsHide } = this.props;
        const { monthlyReviewDetails, auditPlanDetailsId, isfinalAuditMonthlyReviewVisible } = this.state;
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
                        auditPlanDetailsId={auditPlanDetailsId}
                    />
                }
                {monthlyReviewDetails && monthlyReviewDetails.length > 0 &&
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
                                    onClick={() => this.showHandler('isfinalAuditMonthlyReviewVisible')}
                                    style={{ marginTop: '-15px', cursor: 'pointer', justifyContent: 'center', textAlign: 'center' }}

                                >
                                    {isfinalAuditMonthlyReviewVisible === true
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
                                    Final Audit  Month Review
                                </CommonStyle.TextDiv>
                            </CommonStyle.MainDiv>
                        </CommonStyle.MainDiv>
                        {isfinalAuditMonthlyReviewVisible === true &&
                            <> 
                                <ActionPlanDetails
                                    Data={monthlyReviewDetails}
                                    // auditFlowMasterId={this.state.auditFlowMasterId}
                                    // processFlowMasterId={this.state.processFlowMasterId}
                                    // processFlowCode={this.state.processFlowCode}
                                    // processFlowName={this.state.processFlowName}
                                    auditPlanDetailsId={auditPlanDetailsId}
                                />
                                 <MonthlyReviewLegend />
                            </>

                        }

                    </>
                }

                {(!finalBasicDetailsHide || finalBasicDetailsHide === false) ?
                    <Gap h="100px" />
                    :
                    <Gap h="20px" />
                }

            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { monthlyReviewDetails } = state.workingReducer;
    return { monthlyReviewDetails };

};
export default withRouter(connect(mapStateToProps, { getActionPlanMonthlyReviewDetails })(ActionPlanReviewDetails));
