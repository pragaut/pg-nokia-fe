import React from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../commonStyle'
import { Input, Button } from '../../formStyle';
import { getActionPlanUpdate_NotRequiredObservation, updateActionPlanDetails } from '../../../actions/working.action';
import { getUserDetailsP, getUserByPlantId } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper';
import { withRouter } from 'next/router';
import moment from 'moment';

class actionRequiredObservationIndex extends Wrapper {

    constructor(props) {
        super(props);

        this.state = {
            actionRequiredObservations: props.actionRequiredObservations ? props.actionRequiredObservations : []
        };
    };

    componentDidMount() {
        if (this.props && this.props.actionRequiredObservations && this.props.actionRequiredObservations != this.state.actionRequiredObservations) {
            this.setState({
                actionRequiredObservations: this.props.actionRequiredObservations,
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
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


    onChangeValue = (Key, id, auditPlanDetailsId, auditObservationDetailsId) => event => {
        const actionRequiredObservations = this.state.actionRequiredObservations;
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const index = actionRequiredObservations && actionRequiredObservations.length > 0 && actionRequiredObservations.findIndex(item => item.auditPlanDetailsId === auditPlanDetailsId && item.auditObservationDetailsId === auditObservationDetailsId);
        const ExistingState = [...actionRequiredObservations]

        if (index > -1) {
            if (Key === "actionProposed") {
                ExistingState[index].actionProposed = selectedValue;
                if (selectedValue !== null && selectedValue !== "") {
                    ExistingState[index].isActionPlanSelected = true;
                    ExistingState[index].isActionPlanSubmitted = true;
                    ExistingState[index].actionPlanSubmittedOn = new Date();
                }
                else {
                    ExistingState[index].isActionPlanSelected = false;
                    ExistingState[index].isActionPlanSubmitted = false;
                    ExistingState[index].actionPlanSubmittedOn = null;
                }
            }
            else if (Key === "outcomeExpected") {
                ExistingState[index].outcomeExpected = selectedValue;
            }
            else if (Key === "responsibility") {
                ExistingState[index].responsibility = selectedValue;
            }
            else if (Key === "targetDate") {
                ExistingState[index].targetDate = selectedValue;
            }
            this.setState({ actionRequiredObservations: ExistingState })
        }
    }
    onSubmit = async () => {
        const actionRequiredObservations = this.state.actionRequiredObservations;
        let outcomeExpectedLength = 0;
        let responsibilityLength = 0;
        let targetDateLength = 0;
        let without_actionProposed_outcomeExpectedLength = 0;
        let without_actionProposed_responsibilityLength = 0;
        let without_actionProposed_targetDate = 0;

        let totalCount = actionRequiredObservations && actionRequiredObservations.length > 0 ? actionRequiredObservations.length : 0;

        let actionProposedCount = actionRequiredObservations && actionRequiredObservations.length > 0 && actionRequiredObservations.filter(item => item.actionProposed !== null && item.actionProposed !== "");

        actionRequiredObservations && actionRequiredObservations.length > 0 && actionRequiredObservations.forEach(element => {

            if (element && element.actionProposed && element.actionProposed !== null && element.actionProposed !== "") {
                if (element.outcomeExpected === null || element.outcomeExpected === "") {
                    outcomeExpectedLength = outcomeExpectedLength + 1;
                }
                if (element.responsibility === null || element.responsibility === "") {
                    responsibilityLength = responsibilityLength + 1;
                }
                if (element.targetDate === null || element.targetDate === "") {
                    targetDateLength = targetDateLength + 1;
                }
            }
            else {
                if (element.outcomeExpected !== null && element.outcomeExpected !== "") {
                    without_actionProposed_outcomeExpectedLength = without_actionProposed_outcomeExpectedLength + 1;
                }
                if (element.responsibility !== null && element.responsibility !== "") {
                    without_actionProposed_responsibilityLength = without_actionProposed_responsibilityLength + 1;
                }
                if (element.targetDate !== null && element.targetDate !== "") {
                    without_actionProposed_targetDate = without_actionProposed_targetDate + 1;
                }
            }
        });
        if (without_actionProposed_outcomeExpectedLength > 0) {
            return alert('without action Proposed outcome Expected  not be accepted')
        }
        else if (without_actionProposed_responsibilityLength > 0) {
            return alert('without action Proposed responsibility  not be accepted')
        }
        else if (without_actionProposed_targetDate > 0) {
            return alert('without action Proposed target date not be accepted')
        }
        else if (outcomeExpectedLength > 0) {
            return alert('Outcome expected  mandatory in case of action proposed')
        }
        else if (responsibilityLength > 0) {
            return alert('Responsibility mandatory in case of action proposed')
        }
        else if (targetDateLength > 0) {
            return alert('Target date is mandatory in case of action proposed')
        }
        else if (!actionProposedCount || actionProposedCount.length === 0 || actionProposedCount === null) {
            return alert('Fill atleast one row')
        }
        else if (actionProposedCount && actionProposedCount.length < totalCount) {
            alert("Please complete all the action plan")
        }
        else if (actionProposedCount && actionProposedCount.length > 0) { 
            this.props.onSubmitOrSave(actionRequiredObservations, 'Submit');
        }
    }
    onSave = async () => {
        const actionRequiredObservations = this.state.actionRequiredObservations;
        let outcomeExpectedLength = 0;
        let responsibilityLength = 0;
        let targetDateLength = 0;
        let without_actionProposed_outcomeExpectedLength = 0;
        let without_actionProposed_responsibilityLength = 0;
        let without_actionProposed_targetDate = 0;
        let actionProposedCount = actionRequiredObservations && actionRequiredObservations.length > 0 && actionRequiredObservations.filter(item => item.actionProposed !== null && item.actionProposed !== "");

        actionRequiredObservations && actionRequiredObservations.length > 0 && actionRequiredObservations.forEach(element => {

            if (element && element.actionProposed && element.actionProposed !== null && element.actionProposed !== "") {
                if (element.outcomeExpected === null || element.outcomeExpected === "") {
                    outcomeExpectedLength = outcomeExpectedLength + 1;
                }
                if (element.responsibility === null || element.responsibility === "") {
                    responsibilityLength = responsibilityLength + 1;
                }
                if (element.targetDate === null || element.targetDate === "") {
                    targetDateLength = targetDateLength + 1;
                }
            }
            else {
                if (element.outcomeExpected !== null && element.outcomeExpected !== "") {
                    without_actionProposed_outcomeExpectedLength = without_actionProposed_outcomeExpectedLength + 1;
                }
                if (element.responsibility !== null && element.responsibility !== "") {
                    without_actionProposed_responsibilityLength = without_actionProposed_responsibilityLength + 1;
                }
                if (element.targetDate !== null && element.targetDate !== "") {
                    without_actionProposed_targetDate = without_actionProposed_targetDate + 1;
                }
            }
        });
        if (without_actionProposed_outcomeExpectedLength > 0) {
            return alert('without action Proposed outcome Expected  not be accepted')
        }
        else if (without_actionProposed_responsibilityLength > 0) {
            return alert('without action Proposed responsibility  not be accepted')
        }
        else if (without_actionProposed_targetDate > 0) {
            return alert('without action Proposed target date not be accepted')
        }
        else if (outcomeExpectedLength > 0) {
            return alert('Outcome expected  mandatory in case of action proposed')
        }
        else if (responsibilityLength > 0) {
            return alert('Responsibility mandatory in case of action proposed')
        }
        else if (targetDateLength > 0) {
            return alert('Target date is mandatory in case of action proposed')
        }
        else if (!actionProposedCount || actionProposedCount.length === 0 || actionProposedCount === null) {
            return alert('fill atleast one action plan')
        }
        else if (actionProposedCount && actionProposedCount.length > 0) {
            this.props.onSubmitOrSave(actionRequiredObservations, 'Save');
        }
    }
    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    render() {
        const { actionRequiredObservations } = this.state;

        //console.log("actionRequiredObservations", actionRequiredObservations);
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
                justifycontent="flex-start"
                alignitems="baseline"
                style={{ overflow: 'visible' }}
            >
                <CommonStyle.TABLE>
                    <tr>
                        <th>Sr#</th>
                        <th>Section Name</th>
                        <th>Sub Section</th>
                        <th>Question</th>
                        <th> Non compliance/Gap Identified</th>
                        <th>Action Proposed</th>
                        <th>Outcome Expected</th>
                        <th>Responsibility</th>
                        <th>Target Date</th>
                    </tr>
                    {actionRequiredObservations && actionRequiredObservations.length > 0 && actionRequiredObservations.map((item, index) => {
                        return <tr key={index} >
                            <td>{index + 1}</td>
                            <td className="textalignleft">{item.sectionName}</td>
                            <td className="textalignleft">{item.subSectionName}</td>
                            <td className="textalignleft"
                                style={{ width: '200px' }}
                            >{item.question}</td>
                            <td className="textalignleft">{item.observationRemarks}</td>
                            <td className="textalignleft">
                                <textarea
                                    style={{ width: '150px' }}
                                    defaultValue={item.actionProposed}
                                    onChange={this.onChangeValue('actionProposed', item.id, item.auditPlanDetailsId, item.auditObservationDetailsId)}
                                    rows={5} ></textarea>
                            </td>
                            <td className="textalignleft">
                                <textarea
                                    style={{ width: '150px' }}
                                    disabled={(item.isActionPlanSelected === null || item.isActionPlanSelected === false || item.isActionPlanSelected === 0) ? true : false}
                                    onChange={this.onChangeValue('outcomeExpected', item.id, item.auditPlanDetailsId, item.auditObservationDetailsId)}
                                    defaultValue={item.outcomeExpected}
                                    rows={5} ></textarea>
                            </td>
                            <td className="textalignleft">
                                <textarea
                                    style={{ width: '150px' }}
                                    disabled={(item.isActionPlanSelected === null || item.isActionPlanSelected === false || item.isActionPlanSelected === 0) ? true : false}
                                    defaultValue={item.responsibility}
                                    onChange={this.onChangeValue('responsibility', item.id, item.auditPlanDetailsId, item.auditObservationDetailsId)}
                                    rows={5} ></textarea>
                            </td>
                            <td className="textalignleft">
                                <Input
                                    borderRadius={"5px"}
                                    width={"150px"}
                                    type="date"
                                    disabled={(item.isActionPlanSelected === null || item.isActionPlanSelected === false || item.isActionPlanSelected === 0) ? true : false}
                                    height={"40px"}
                                    onChange={this.onChangeValue('targetDate', item.id, item.auditPlanDetailsId, item.auditObservationDetailsId)}
                                    value={item.targetDate && item.targetDate !== null && moment(new Date(item.targetDate)).format("YYYY-MM-DD")}
                                    paddingLeft={"10px"} />
                            </td>
                        </tr>
                    })

                    }
                </CommonStyle.TABLE>
                <CommonStyle.MainDiv
                    justifycontent={"center"}
                    width={'100%'}
                >
                    <CommonStyle.ButtonDiv
                        style={{ paddingTop: '44px' }}
                        width="40%"
                    >
                        <Button
                            bgColor="#FFA701"
                            color="#ffffff"
                            height="40px"
                            zIndex={"0"}
                            width="48%"
                            bgChangeHover="#ffffff"
                            hoverColor="#FFBA01"
                            border="solid 1px #FFA701"
                            onClick={() => this.onSave()}
                        >
                            Save
                        </Button>
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
                            onClick={() => this.onSubmit()}
                        // onClick={() => this.resetValues()}
                        >
                            Submit
                        </Button>
                    </CommonStyle.ButtonDiv>
                </CommonStyle.MainDiv>
            </CommonStyle.MainDiv >
        )
    }
}

export default withRouter(connect(null, { getUserDetailsP, updateActionPlanDetails, getActionPlanUpdate_NotRequiredObservation, getUserByPlantId })(actionRequiredObservationIndex));
