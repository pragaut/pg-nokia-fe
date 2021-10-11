import React from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Button } from '../../formStyle';
import { getActionPlanDetails_forMonthlyReview, updateMonthlyReviewDetails, getCurrentMonthReview_MonthlyReview } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import Gap from '../../Gap';
import * as WorkingType from '../../../action-types/working.action.types';
import ViewFinalAuditBasicDetails from '../viewDetails/finalAuditBasicDetails';
import ActionPlanDetails from './actionPlanDetails';
import { withRouter } from 'next/router';
import MonthlyReviewLegend from '../FilterComponent/legends';

class monthlyActionplanIndex extends Wrapper {

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
            actionPlanForReviewDetails: [],
            currentMonthReviewDetails: [],
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : 'no-auditplan',

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
            this.props.getActionPlanDetails_forMonthlyReview(Filter, 0, constants.ALL_ROWS_LIST);
            this.props.getCurrentMonthReview_MonthlyReview(Filter, 0, constants.ALL_ROWS_LIST);

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
        if (nextProps.currentMonthReviewDetails && nextProps.currentMonthReviewDetails != this.state.currentMonthReviewDetails) {
            this.setState({
                currentMonthReviewDetails: nextProps.currentMonthReviewDetails
            });
        }
        if (nextProps.actionPlanForReviewDetails && nextProps.actionPlanForReviewDetails != this.state.actionPlanForReviewDetails) {
            this.setState({
                actionPlanForReviewDetails: nextProps.actionPlanForReviewDetails
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

    onClickSubmitReviewDetails = async (data) => {
        console.log(data);
        if (data && data.length > 0) {
            setTimeout(() => {
                this.props.updateMonthlyReviewDetails(data, undefined);
            }, 300);
        }
    }

    render() {
        const { actionPlanForReviewDetails, auditPlanDetailsId, currentMonthReviewDetails } = this.state;
        console.log("currentMonthReviewDetails", currentMonthReviewDetails);
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
                justifycontent="flex-start"
                alignitems="baseline"
              //  style={{ overflow: 'visible' }}
            >
                <Button
                    width="100px"
                    height="40px"
                    borderRadius="10px"
                    bgColor="teal"
                    onClick={() => this.onClickBackButton()}
                >
                    Back
                </Button>
                <ViewFinalAuditBasicDetails
                    auditPlanDetailsId={auditPlanDetailsId}
                />
                <Gap h="10px" />
                <MonthlyReviewLegend />
                <Gap h="5px" />
                <ActionPlanDetails
                    Data={actionPlanForReviewDetails}
                    auditFlowMasterId={this.state.auditFlowMasterId}
                    processFlowMasterId={this.state.processFlowMasterId}
                    processFlowCode={this.state.processFlowCode}
                    processFlowName={this.state.processFlowName}
                    auditPlanDetailsId={auditPlanDetailsId}
                    userId={this.state.UserId}
                    roleMasterId={this.state.roleID}
                    companyMasterId={this.state.companyMasterId}
                    plantId={this.state.plantMasterId}
                    onClickSubmitReviewDetails={this.onClickSubmitReviewDetails()}
                    currentMonthReviewDetails={currentMonthReviewDetails}
                />
                <Gap h="100px" />

            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { actionPlanForReviewDetails, currentMonthReviewDetails, monthlyReviewActiontype } = state.workingReducer;
    return { actionPlanForReviewDetails, currentMonthReviewDetails, monthlyReviewActiontype };

};
export default withRouter(connect(mapStateToProps, { updateMonthlyReviewDetails, getCurrentMonthReview_MonthlyReview, getActionPlanDetails_forMonthlyReview })(monthlyActionplanIndex));
