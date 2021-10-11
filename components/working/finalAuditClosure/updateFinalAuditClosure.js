import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import style from '../../../theme/app.scss';
import Input from '../../shared/InputBox';
import { getObservationsToUpdateActionPlan, updateActionPlanDetails, UpdateFinalAuditClosureDetails } from '../../../actions/working.action';
import * as WorkingType from '../../../action-types/working.action.types';
import { withRouter } from 'next/router';
import FinalBasicDetailsaAndActionPlanDetails from '../viewDetails/viewActionPlanDetails';
import ActionRequiredObservationIndex from '../actionPlanUpdate/observationIndex';
import ViewFinalAuditBasicDetails from '../viewDetails/finalAuditBasicDetails';
import UpdateActionPlan from './update.actionPlan';
import Gap from '../../Gap';
import { constants } from '../../../utils/constants';
import { Button } from '../../formStyle';

class updateFinalAuditClosure extends Wrapper {

    configs = [{
        name: 'id',
        type: 'string',
        required: true
    }, {
        name: 'auditApprovalRemarks',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.state = {
            auditClosureDetails: props.baseObject ? props.baseObject : {},
            auditApprovalRemarks: "",
            processFlowMasterId: "",
            processFlowName: "",
            processFlowCode: "",
            auditFlowMasterId: "",
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : ''

        };
    };

    onValueChanged = key => event => {
        const existingClosureDetails = Object.assign({}, this.state.auditClosureDetails);
        existingClosureDetails[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (key === "auditApprovalRemarks") {
            this.setState({ auditApprovalRemarks: event.target.value });
        }
        this.setState({ auditClosureDetails: existingClosureDetails });
    };

    componentDidMount() {
        const loggedUser = this.loggedUser();// getLoggedUser();
        const CurrentRole = this.getLoggedUserRole_JSONConverted()
        const roleID = CurrentRole && CurrentRole.id;
        const companyMasterId = loggedUser && loggedUser.plantMaster && loggedUser.plantMaster.companyMasterID;
        const plantMasterId = loggedUser && loggedUser.plantMaster && loggedUser.plantMaster.id;
        this.setState({
            processFlowMasterId: this.props.processFlowMasterId,
            processFlowName: this.props.processFlowName,
            processFlowCode: this.props.processFlowCode,
            auditFlowMasterId: this.props.auditFlowMasterId,
            auditPlanDetailsId: this.props.auditPlanDetailsId,
            roleMasterId: roleID,
            companyMasterId: companyMasterId,
            plantId: plantMasterId,
            actionRequiredObservations: null
        })
        setTimeout(() => {
            let Filter = {
                auditPlanDetailsId: this.state.auditPlanDetailsId
            }
            this.props.getObservationsToUpdateActionPlan(Filter, undefined, 0, constants.ALL_ROWS_LIST);
        }, 100);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {


        if (nextProps.finalAuditPlanActiontype && nextProps.finalAuditPlanActiontype === WorkingType.FINALAUDITPLANDETAILS_SAVE_SUCCESS) {

            this.onSaveSuccess();
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

    };

    onSubmitOrSave = async (data, save_or_Submit) => {
        let existingState = null;
        if (save_or_Submit === "Submit") {
            existingState = {
                auditObservationActionPlanDetails: data,
                isActionPlanSubmitted: true,
                isActionPlanSaved: true,
                auditPlanDetailsId: this.state.auditPlanDetailsId,
                roleMasterId: this.state.roleMasterId,
                companyMasterId: this.state.companyMasterId,
                plantId: this.state.plantId,
                processFlowCode: this.state.processFlowCode,
                processFlowMasterId: this.state.processFlowMasterId
            }
            this.setState({ isActionPlanSubmitted: true });
        }
        if (existingState && existingState !== null && existingState !== '') {
            setTimeout(() => {
                this.props.updateActionPlanDetails(existingState, undefined);
            }, 100);
        }
    }

    onClickSubmit = (auditClosureDetails, auditObservationActionPlanDetails, auditApprovalRemarks) => {
        // console.log("auditClosureDetails : ", auditClosureDetails);
        // console.log("auditObservationActionPlanDetails : ", auditObservationActionPlanDetails);
        // console.log("auditApprovalRemarks : ", auditApprovalRemarks);
        let actionPlanCount = auditObservationActionPlanDetails ? auditObservationActionPlanDetails.length : 0;

        const existingState = Object.assign({}, this.state.auditClosureDetails);
        existingState["id"] = this.state.auditPlanDetailsId;
        existingState["auditObservationActionPlanDetails"] = auditObservationActionPlanDetails;
        existingState["auditApprovalRemarks"] = auditApprovalRemarks;
        const loggedUser = this.loggedUser();
        const CurrentRole = this.getLoggedUserRole_JSONConverted()
        const roleID = CurrentRole && CurrentRole.id;
        const companyMasterId = loggedUser && loggedUser.plantMaster && loggedUser.plantMaster.companyMasterID;
        const plantMasterId = loggedUser && loggedUser.plantMaster && loggedUser.plantMaster.id;
        const validationText = validateInputs(existingState, this.configs);
        if (validationText) {
            return alert(validationText);
        }
        else {
            existingState["roleMasterId"] = this.state.roleMasterId;
            existingState["companyMasterId"] = this.state.companyMasterId;
            existingState["plantId"] = this.state.plantId;
            existingState["processFlowMasterId"] = this.state.processFlowMasterId;
            existingState["processFlowName"] = this.state.processFlowName;
            existingState["processFlowCode"] = this.state.processFlowCode;
            existingState["auditFlowMasterId"] = this.state.auditFlowMasterId;
            existingState["auditPlanDetailsId"] = this.state.auditPlanDetailsId;
            this.props.UpdateFinalAuditClosureDetails(existingState, undefined);
        }
    }

    onSaveSuccess = () => {
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'final-audit-closure';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';
        this.props.router.push(
            {
                pathname: 'companyHRHead',
                tab: 'final-audit-closure',
                query: {
                    tab: 'final-audit-closure',
                    id: processFlowMasterId,
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName,
                    processFlowCode: processFlowCode,
                    pageName: 'Final Audit Closure',
                    auditFlowMasterId: auditFlowMasterId,
                }
            },
            'companyHRHead/final-audit-closure'
        );
    }

    onClickBackButton = () => {
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'final-audit-closure';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';
        this.props.router.push(
            {
                pathname: 'companyHRHead',
                tab: 'final-audit-closure',
                query: {
                    tab: 'final-audit-closure',
                    id: processFlowMasterId,
                    processFlowMasterId: processFlowMasterId,
                    processFlowName: processFlowName,
                    processFlowCode: processFlowCode,
                    pageName: 'Final Audit Closure',
                    auditFlowMasterId: auditFlowMasterId,
                }
            },
            'companyHRHead/final-audit-closure'
        );
    }

    render() {
        const { auditPlanDetailsId, actionRequiredObservations } = this.state;
        return (
            <>
                {/* <FinalBasicDetailsaAndActionPlanDetails
                    auditPlanDetailsId={auditPlanDetailsId}
                    isBackButtonHide={true}
                /> */}
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
                <UpdateActionPlan
                    onSubmitOrSave={this.onClickSubmit}
                    actionRequiredObservations={actionRequiredObservations}
                    auditApprovalRemarks={this.state.auditClosureDetails.auditApprovalRemarks}
                />
                {/* <div>
                    <div className={style.field_flex_wrapper} style={{ overflow: 'visible' }}>
                        <div className={style.field_flex_new} style={{ width: '100%', color: "rgba(0,0,0,0.54)", fontSize: "13px", overflow: 'visible' }}>
                            <Input label="Remarks" required="required" type='text' defaultValue={this.state.auditClosureDetails.auditApprovalRemarks} onChange={this.onValueChanged('auditApprovalRemarks')} />
                        </div>
                    </div>
                </div> */}
                <br></br>
                {/* container for save and cancel */}
                {/* <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn}
                        style={{ width: '150px', background: 'green', height: '44px', borderRadius: '10px', color: '#ffffff', cursor: 'pointer' }}
                        onClick={() => {
                            this.onClickSubmit()
                        }}>Submit  </button>
                </div> */}
                <Gap h="100px" />
            </>
        );
    }
};

updateFinalAuditClosure.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const { actionRequiredObservations, finalAuditPlan, finalAuditPlanActiontype, finalAuditSectionDetails } = state.workingReducer;


    const errorMessage = state.errorReducer.error;
    return { errorType, errorMessage, actionRequiredObservations, finalAuditPlan, finalAuditPlanActiontype, finalAuditSectionDetails };
}
export default withRouter(connect(mapStateToProps, { getObservationsToUpdateActionPlan, UpdateFinalAuditClosureDetails })(updateFinalAuditClosure));