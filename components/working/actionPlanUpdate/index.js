import React from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Button } from '../../formStyle';
import { getActionPlanUpdate_NotRequiredObservation, updateActionPlanDetails, initActionPlanUpdate } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import Gap from '../../Gap';
import * as WorkingType from '../../../action-types/working.action.types';
import ViewFinalAuditBasicDetails from '../viewDetails/finalAuditBasicDetails';
import ActionRequiredObservationIndex from './observationIndex';
import { withRouter } from 'next/router';
import ViewFinalAuditObservation from '../viewDetails/viewFinalAuditScore';

class actionPlanUpdateIndex extends Wrapper {

    companyMasterIdRefs = undefined;
    plantMasterIdRefs = undefined;
    sectionMasterIdRefs = undefined;
    constructor(props) {
        super(props);
        this.companyMasterIdRefs = React.createRef();
        this.plantMasterIdRefs = React.createRef();
        this.sectionMasterIdRefs = React.createRef();
        //  const multiselectRef = useRef();
        this.state = {
            selectedAuditPlanDetailsId: props.selectedAuditPlanDetailsId ? props.selectedAuditPlanDetailsId : undefined,
            auditFlowMasterId: '',
            processFlowMasterId: '',
            processFlowCode: props.processFlowCode ? props.processFlowCode : 'action-plan-update',
            processFlowName: '',
            isActionPlanSubmitted: false,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            actionRequiredObservations: null,
            actionPlanRemarks: ''
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
        if (nextProps && nextProps.actionPlanDetailActiontype && nextProps.actionPlanDetailActiontype === WorkingType.ACTIONPLANUPDATE_SAVE_SUCCESS && this.state.isActionPlanSubmitted === true) {
            setTimeout(() => {
                this.onClickBackButton();
            }, 500);
        }
        if (nextProps && nextProps.actionPlanDetailActiontype && nextProps.actionPlanDetailActiontype === WorkingType.ACTIONPLANUPDATE_SAVE_SUCCESS && (!this.state.isActionPlanSubmitted || this.state.isActionPlanSubmitted === false)) {
            setTimeout(() => {
                let Filter = {
                    auditPlanDetailsId: this.state.auditPlanDetailsId
                }
                this.props.getActionPlanUpdate_NotRequiredObservation(Filter, undefined, 0, constants.ALL_ROWS_LIST);
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

    onSubmitOrSave = async (data, save_or_Submit) => {
        let existingState = null;
        if (save_or_Submit === "Save") {
            existingState = {
                auditObservationActionPlanDetails: data,
                isActionPlanSubmitted: false,
                isActionPlanSaved: true,
                auditPlanDetailsId: this.state.auditPlanDetailsId,
                roleMasterId: this.state.roleMasterId,
                companyMasterId: this.state.companyMasterId,
                plantId: this.state.plantId,
                processFlowCode: this.state.processFlowCode,
                processFlowMasterId: this.state.processFlowMasterId
            }
            this.setState({ isActionPlanSubmitted: false });
        }
        else if (save_or_Submit === "Submit") {
            existingState = {
                auditObservationActionPlanDetails: data,
                isActionPlanSubmitted: true,
                isActionPlanSaved: true,
                auditPlanDetailsId: this.state.auditPlanDetailsId,
                roleMasterId: this.state.roleMasterId,
                companyMasterId: this.state.companyMasterId,
                plantId: this.state.plantId,
                processFlowCode: this.state.processFlowCode,
                processFlowMasterId: this.state.processFlowMasterId,
                actionPlanRemarks: this.state.actionPlanRemarks
            }
            this.setState({ isActionPlanSubmitted: true });
        }
        if (existingState && existingState !== null && existingState !== '') {
            setTimeout(() => {
                this.props.updateActionPlanDetails(existingState, undefined);
            }, 100);
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
                    tab: 'action-plan-update',
                    pageName: 'Action Plan Update',
                    id: processFlowMasterId,
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName,
                    processFlowCode: processFlowCode,
                    auditFlowMasterId: auditFlowMasterId,
                    //auditPlanDetailsId: auditPlanDetailsId
                },
                tab: 'action-plan-update',
            },
            'plantHrHead/action-plan-update'
        )
    }
    onChangeValue = (Key) => event => {
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ actionPlanRemarks: selectedValue })
    }
    render() {
        const { actionRequiredObservations, multiSectionMasterId, auditPlanDetailsId, processFlowCode } = this.state;
        return (
            <CommonStyle.MainDiv
                padding="10px 0px"
                flexdirection="column"
                justifycontent="flex-start"
                alignitems="baseline"
                style={{ overflow: 'visible' }}
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
                {actionRequiredObservations && actionRequiredObservations.length > 0 ?
                    <ActionRequiredObservationIndex
                        onSubmitOrSave={this.onSubmitOrSave}
                        actionRequiredObservations={actionRequiredObservations}
                    />
                    :
                    <ViewFinalAuditObservation 
                    auditPlanDetailsId={this.state.auditPlanDetailsId}
                    />
                }
                {(!actionRequiredObservations || actionRequiredObservations.length === 0) &&
                    <CommonStyle.MainDiv
                        padding="10px 0px"
                        flexdirection="row"
                        justifycontent="flex-start"
                        alignitems="baseline"
                        style={{ overflow: 'visible' }}
                    >
                        <CommonStyle.MainDiv
                            width="50%"
                        >
                            <textarea
                                style={{ width: '100%' }}
                                defaultValue={this.state.actionPlanRemarks}
                                placeholder="*Write Your Remarks Here"
                                onChange={this.onChangeValue('actionPlanRemarks')}
                                rows={3} ></textarea>
                        </CommonStyle.MainDiv>
                        <CommonStyle.ButtonDiv
                            style={{ paddingLeft: '44px' }}
                            width="40%"
                        > 
                            <Button
                                bgColor="358856"
                                color="#ffffff"
                                borderRadius="10px"
                                height="40px"
                                zIndex={"0"}
                                width="48%"
                                bgChangeHover="#4FA64F"
                                hoverColor="ffffff"
                                border="solid 1px 358856" 
                                onClick={() => this.onSubmitOrSave(undefined, 'Submit')}
                            // onClick={() => this.resetValues()}
                            >
                                Submit
                        </Button>
                        </CommonStyle.ButtonDiv>
                    </CommonStyle.MainDiv>
                }

                <Gap h="100px" />

            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { actionRequiredObservationActiontype, actionPlanDetailActiontype, actionRequiredObservation, actionRequiredObservations, actionRequiredRecordsCount } = state.workingReducer;
    return { actionPlanDetailActiontype, actionRequiredObservationActiontype, actionRequiredObservation, actionRequiredObservations, actionRequiredRecordsCount };

};
export default withRouter(connect(mapStateToProps, { updateActionPlanDetails, initActionPlanUpdate, getActionPlanUpdate_NotRequiredObservation })(actionPlanUpdateIndex));
