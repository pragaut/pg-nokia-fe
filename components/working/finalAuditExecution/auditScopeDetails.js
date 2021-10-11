import React, { Component, useState, useRef } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SELECT } from '../../formStyle';
import { getFinalAuditScopeForExecution, getAuditObservationData, getMediaDetailsbyAuditPlanDetailsId, saveFinalAuditObservationDetails, getFinalAuditObservationDetails } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import moment from 'moment';
import Gap from '../../Gap';
import { hideError, showError } from '../../../actions/error.actions';
import * as WorkingType from '../../../action-types/working.action.types';
import { getAuditObservationMasterData, getScoringRuleMasterData } from '../../../actions/admin.action';
import * as helper from '../../../helper';
import config from '../../../config';
import * as sessionHelper from '../../../utils/session.helper';
import Loader from '../../shared/loader';

class scopeDetails extends Wrapper {

    // configs = [
    //     {
    //         name: 'value',
    //         displayname: 'Master Name ',
    //         type: 'string',
    //         required: true
    //     }, {
    //         name: 'code',
    //         displayname: 'Master Code ',
    //         type: 'string',
    //         required: true
    //     }
    // ];
    constructor(props) {
        super(props);

        this.updateSelectedObservation = this.updateSelectedObservationDetails.bind(this);
        //  const multiselectRef = useRef();
        this.state = {
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            loadershow: 'false',
            auditObservations: [],
            processFlowCode: props.processFlowCode ? props.processFlowCode : '',
            finalAuditScopeDetailsForExecution: [],
            scoringRules: [],
            mediaDetails: [],
            observationDetails: {
                processFlowCode: props.processFlowCode ? props.processFlowCode : 'final-audit-execution-index'
            },
            auditObservationDetils: [
                {
                    id: undefined,
                    auditorId: undefined,
                    auditPlanDetailsId: undefined,
                    scopeMasterId: undefined,
                    auditObservationMasterId: undefined,
                    actualScore: undefined,
                    maxScore: undefined,
                    observationRemarks: undefined,
                    observationDate: undefined,
                    isSubmitted: false,
                    isInputEnabled: false,
                    isCommentRequired: false
                }
            ],
            userId: '',
            isTeamAssignmentPopupVisible: false,
            selectedAuditPlanDetailsId: undefined,
            multiSectionMasterId: props.multiSectionMasterId ? props.multiSectionMasterId : undefined,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            auditFlowMasterId: '',
            processFlowMasterId: '',
            processFlowCode: '',
            processFlowName: '',
            isObservationSaved: false,
            isObservationSubmitted: false,
            observations: [],
            supportingDocs: [],
            validMediaType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint', 'application/vnd.ms-powerpoint.presentation.macroEnabled.12', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
            validMediaTypeMSG: "Only image(jpeg,jpg,png), PDF, Excel(xlsx,xls) & PPT(ppt,pptx,pptm) are allowed"
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
            });
            // alert(this.props.auditPlanDetailsId)
            this.props.getAuditObservationData(this.props.auditPlanDetailsId, 'final_Audit');
            this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, this.props.auditPlanDetailsId)

        }
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
        //console.log("this.props.processFlowCode  22 : ", this.props.processFlowCode);
        if (this.props && this.props.processFlowCode && this.props.processFlowCode != this.state.processFlowCode) {
            this.setState({
                processFlowCode: this.props.processFlowCode,
            })
        }
        //console.log("this.props.processFlowName 22 : ", this.props.processFlowName);
        if (this.props && this.props.processFlowName && this.props.processFlowName != this.state.processFlowName) {
            this.setState({
                processFlowName: this.props.processFlowName,
            })
        }

        let MultiSectionIDs = ['pg'];
        const LoggedUser = this.loggedUser();
        const CurrentRole = this.getLoggedUserRole_JSONConverted()
        // console.log("LoggedUser", LoggedUser);
        const UserId = LoggedUser && LoggedUser.id;
        const roleID = CurrentRole && CurrentRole.id;
        const companyMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.companyMasterID;
        const plantMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.id;
        //console.log("roleID", roleID);
        const auditPlanDetalsId = this.state.auditPlanDetailsId;
        if (this.state.multiSectionMasterId) {
            MultiSectionIDs = this.ConvertStringToArrayRoleReturn(this.state.multiSectionMasterId)
        }
        this.props.getScoringRuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        // this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);

        // this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, auditPlanDetalsId)

        setTimeout(() => {

            let filters = {
                userId: UserId,
                auditDetailsId: this.state.auditPlanDetailsId,
                auditPlanDetailsId: this.state.auditPlanDetailsId,
            }
            this.props.getFinalAuditScopeForExecution(filters, undefined, 0, constants.ALL_ROWS_LIST);
            this.props.getFinalAuditObservationDetails(this.state.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
        }, 200);

        this.setState({
            userId: UserId,
            roleMasterId: roleID,
            companyMasterId: companyMasterId,
            plantId: plantMasterId
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log("finalAuditPlanExecutionDetailActiontype nextProps : ", nextProps.finalAuditPlanExecutionDetailActiontype);
        if (nextProps.finalAuditPlanExecutionDetailActiontype && nextProps.finalAuditPlanExecutionDetailActiontype === WorkingType.FINALAUDITPLANEXECUTIONDETALS_SAVE_SUCCESS && (this.state.isObservationSaved === true || this.state.isObservationSubmitted === true)) {
            //console.log("Saved Success!!");
            if (this.state.isObservationSubmitted === true) {
                this.backToCreatedPage();
            }
            else {
                this.setState({
                    isObservationSubmitted: false,
                    isObservationSaved: false,
                    auditObservationDetils: [
                        {
                            id: undefined,
                            auditorId: undefined,
                            auditPlanDetailsId: undefined,
                            scopeMasterId: undefined,
                            auditObservationMasterId: undefined,
                            actualScore: undefined,
                            maxScore: undefined,
                            observationRemarks: undefined,
                            observationDate: undefined,
                            isSubmitted: false,
                            isInputEnabled: false,
                            isCommentRequired: false
                        }
                    ],
                });

                let filters = {
                    auditDetailsId: this.state.auditPlanDetailsId,
                    auditPlanDetailsId: this.state.auditPlanDetailsId,
                }
                this.props.getFinalAuditScopeForExecution(filters, undefined, 0, constants.ALL_ROWS_LIST);
                this.props.getFinalAuditObservationDetails(this.state.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
                this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.auditPlanDetailsId)
                this.props.getAuditObservationData(this.state.auditPlanDetailsId, 'final_Audit');

            }
        }
        // if (nextProps && nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {
        //     this.setState({
        //         auditPlanId: nextProps.auditPlanDetailsId,
        //         auditPlanDetailsId: nextProps.auditPlanDetailsId,
        //     });

        //     this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, nextProps.auditPlanDetalsId)
        //     this.props.getAuditObservationData(nextProps.auditPlanDetailsId, 'final_Audit');
        // }
        if (nextProps.observations && nextProps.observations != this.state.observations) {
            this.setState({
                observations: nextProps.observations
            });
        }
        if (nextProps && nextProps.auditFlowMasterId && nextProps.auditFlowMasterId !== this.state.auditFlowMasterId) {
            this.setState({
                auditFlowMasterId: nextProps.auditFlowMasterId,
            })
        }
        if (nextProps && nextProps.processFlowMasterId && nextProps.processFlowMasterId !== this.state.processFlowMasterId) {
            this.setState({
                processFlowMasterId: nextProps.processFlowMasterId,
            })
        }
        //console.log("this.props.processFlowCode  23 : ", this.props.processFlowCode);
        if (nextProps && nextProps.processFlowCode && nextProps.processFlowCode !== this.state.processFlowCode) {
            this.setState({
                processFlowCode: nextProps.processFlowCode,
            })
        }
        //console.log("this.props.processFlowName 23 : ", this.props.processFlowName);
        if (nextProps && nextProps.processFlowName && nextProps.processFlowName != this.state.processFlowName) {
            this.setState({
                processFlowName: nextProps.processFlowName,
            })
        }
        if (nextProps.supportingDocs && nextProps.supportingDocs != this.state.supportingDocs) {
            this.setState({
                supportingDocs: nextProps.supportingDocs
            });
        }
        if (nextProps.finalAuditScopeDetailsForExecution && nextProps.finalAuditScopeDetailsForExecution != this.state.finalAuditScopeDetailsForExecution) {
            this.setState({
                finalAuditScopeDetailsForExecution: nextProps.finalAuditScopeDetailsForExecution
            });
        }
        if (nextProps.auditObservations && nextProps.auditObservations != this.state.auditObservations) {
            this.setState({
                auditObservations: nextProps.auditObservations
            });
        }
        if (nextProps.scoringRules && nextProps.scoringRules != this.state.scoringRules) {
            this.setState({
                scoringRules: nextProps.scoringRules
            });
        }
        if (nextProps.selfAuditScoreDetails && nextProps.selfAuditScoreDetails.length > 0 && nextProps.selfAuditScoreDetails != this.state.auditObservationDetils) {
            this.setState({
                auditObservationDetils: nextProps.selfAuditScoreDetails
            });
        }
        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId !== null && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            let MultiSectionIDs = ['pg'];
            if (this.state.multiSectionMasterId) {
                MultiSectionIDs = this.ConvertStringToArrayRoleReturn(this.state.multiSectionMasterId)
            }
            let filters = {
                auditDetailsId: nextProps.auditPlanDetailsId,
                auditPlanDetailsId: nextProps.auditPlanDetailsId,
            }
            this.props.getFinalAuditScopeForExecution(filters, undefined, 0, constants.ALL_ROWS_LIST);
            this.props.getFinalAuditObservationDetails(nextProps.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
            this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, nextProps.auditPlanDetailsId)
            this.props.getAuditObservationData(nextProps.auditPlanDetailsId, 'final_Audit');

            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId,
                auditPlanId: nextProps.auditPlanDetailsId
            });

        }
        if (nextProps.multiSectionMasterId && nextProps.multiSectionMasterId != this.state.multiSectionMasterId) {
            let MultiSectionIDs = this.ConvertStringToArrayRoleReturn(nextProps.multiSectionMasterId)

            let filters = {
                auditDetailsId: this.state.auditPlanDetailsId,
                auditPlanDetailsId: this.state.auditPlanDetailsId,
            }
            this.props.getFinalAuditScopeForExecution(filters, undefined, 0, constants.ALL_ROWS_LIST);
            this.setState({
                multiSectionMasterId: nextProps.multiSectionMasterId
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

    backToCreatedPage = () => {
        let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
        let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
        let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : '';
        let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';
        setTimeout(() => {
            this.props.router.push(
                {
                    pathname: '/auditor',
                    query: {
                        tab: 'final-audit-execution-index',
                        id: processFlowMasterId,
                        processFlowMasterId: processFlowMasterId,
                        processFlowName: processFlowName,
                        processFlowCode: processFlowCode,
                        pageName: 'Audit Observation',
                        auditFlowMasterId: auditFlowMasterId,

                    },
                    tab: 'final-audit-execution-index',
                },
                'auditor/final-audit-execution-index'
            )
        }, 500);
    }

    ConvertStringToArrayRoleReturn = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring;
    }

    onClickCloseButton = () => {
        this.setState({ isTeamAssignmentPopupVisible: false, selectedAuditPlanDetailsId: undefined })
    }

    handleLoad = (valuede) => {
        if (valuede === "1" || valuede === 1) {
            this.setState({ loadershow: 'true' })
        }
        else {
            this.setState({ loadershow: 'false' })
        }
    }
    onChangeValue_Observation = (tindex, id, sectionMasterID, criticalityMasterId, maxScore, observationDetailsId, observation) => event => {
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        //console.log("selectedValue 1 : ", selectedValue);
        //console.log("observationDetailsId : ", observationDetailsId);
        this.updateSelectedObservation(selectedValue, id, sectionMasterID, criticalityMasterId, maxScore, observationDetailsId, observation);
    }

    onChangeValue_Comments = (tindex, id, observationDetailsId, selectedObservationId, sectionMasterID, criticalityMasterId, maxScore, isobservationSelected) => event => {

        //console.log("scope id : ", id);
        // console.log("observationDetailsId : ", observationDetailsId);

        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        let timeOut = 0;
        if (isobservationSelected === null || isobservationSelected === undefined || isobservationSelected === false) {
            timeOut = 200;
            this.updateSelectedObservation(selectedObservationId, id, sectionMasterID, criticalityMasterId, maxScore, observationDetailsId);
        }
        setTimeout(() => {
            let auditPlanDetailsId = this.state.auditPlanDetailsId;
            const userId = this.state.userId;
            const auditObservationDetils = this.state.auditObservationDetils;
            // let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

            const finalAuditScopeDetails = this.state.finalAuditScopeDetailsForExecution;
            const ExistingfinalAuditScopeDetails = [...finalAuditScopeDetails]
            const selectedIndex = finalAuditScopeDetails && finalAuditScopeDetails.length > 0 && finalAuditScopeDetails.findIndex(item => item.scopeMasterId === id);
            if (selectedIndex > -1) {
                ExistingfinalAuditScopeDetails[selectedIndex].auditObservationRemarks = selectedValue;
                this.setState({ finalAuditScopeDetailsForExecution: ExistingfinalAuditScopeDetails });
            }

            const index = auditObservationDetils && auditObservationDetils.length > 0 && auditObservationDetils.findIndex(item => item.scopeMasterId === id);
            if (index > -1) {
                //alert("exist");
                const ExistingAuditObservationDetils = [...auditObservationDetils]
                ExistingAuditObservationDetils[index].id = observationDetailsId;
                ExistingAuditObservationDetils[index].auditorId = userId;
                ExistingAuditObservationDetils[index].auditPlanDetailsId = auditPlanDetailsId;
                ExistingAuditObservationDetils[index].scopeMasterId = id;
                ExistingAuditObservationDetils[index].observationRemarks = selectedValue;
                this.setState({ auditObservationDetils: ExistingAuditObservationDetils })
            }
            else if (auditObservationDetils && auditObservationDetils.length === 1 && (!auditObservationDetils[0].scopeMasterId || auditObservationDetils[0].scopeMasterId === undefined || auditObservationDetils[0].scopeMasterId === 'undefined' || auditObservationDetils[0].scopeMasterId === null)) {
                const ExistingAuditObservationDetils = [...auditObservationDetils]
                ExistingAuditObservationDetils[0].id = observationDetailsId;
                ExistingAuditObservationDetils[0].auditorId = userId;
                ExistingAuditObservationDetils[0].auditPlanDetailsId = auditPlanDetailsId;
                ExistingAuditObservationDetils[0].scopeMasterId = id;
                ExistingAuditObservationDetils[0].observationRemarks = selectedValue;
                this.setState({ auditObservationDetils: ExistingAuditObservationDetils })
            }
            else {
                //  alert("New");
                let Data = {
                    id: observationDetailsId,
                    auditorId: userId,
                    auditPlanDetailsId: auditPlanDetailsId,
                    scopeMasterId: id,
                    observationRemarks: selectedValue
                }
                let ExistingData = auditObservationDetils && auditObservationDetils.length > 0 ? auditObservationDetils.concat(Data) : [Data];
                this.setState({ auditObservationDetils: ExistingData })
            }
        }, timeOut);
    }

    updateSelectedObservationDetails = (selectedValue, id, sectionMasterID, criticalityMasterId, maxScore, observationDetailsId, observation) => {
        const auditPlanDetailsId = this.state.auditPlanDetailsId;
        //   const ObservationMaster = this.state.auditObservations;
        const ObservationMaster = observation && observation.length > 0 ? observation : this.state.observations;
        const scoringRules = this.state.scoringRules;
        const userId = this.state.userId;

        let MaxScore = maxScore;
        let ActualScore = undefined;
        let HighestScore = undefined;
        let ScoringRuleMaster = undefined;
        let selectedObservationDetails = undefined;
        let ScoreDetails = undefined;
        let isCommentRequiredparameter = undefined;
        let isInputEnabled = false;

        const CurrentDate = moment(new Date()).format("YYYY-MM-DD");
        const auditObservationDetils = this.state.auditObservationDetils;

        const finalAuditScopeDetails = this.state.finalAuditScopeDetailsForExecution;
        const ExistingfinalAuditScopeDetails = [...finalAuditScopeDetails]
        const selectedIndex = finalAuditScopeDetails && finalAuditScopeDetails.length > 0 && finalAuditScopeDetails.findIndex(item => item.scopeMasterId === id);
        console.log("selectedIndex : ", selectedIndex);
        //let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (selectedValue && selectedValue !== '-1' && selectedValue !== "Select Observation") {
            selectedObservationDetails = ObservationMaster && ObservationMaster.length > 0 && ObservationMaster.filter(item => item.id === selectedValue)[0];
            isCommentRequiredparameter = selectedObservationDetails && selectedObservationDetails.isCommentRequired;
            console.log("isCommentRequiredparameter", isCommentRequiredparameter);
            //alert(isCommentRequired);
            ScoreDetails = scoringRules && scoringRules.length > 0 && scoringRules.filter(item => item.observationMasterId === selectedValue && item.sectionMasterid === sectionMasterID && item.criticalityMasterId === criticalityMasterId)[0];

            if (selectedObservationDetails && selectedObservationDetails.isHighestScoreApplicable && (selectedObservationDetails.isHighestScoreApplicable === 1 || selectedObservationDetails.isHighestScoreApplicable === true)) {
                HighestScore = MaxScore;
                ActualScore = MaxScore;
                isInputEnabled = true;
            }
            else if (selectedObservationDetails && (selectedObservationDetails.isScoreApplicable !== 1 && selectedObservationDetails.isScoreApplicable !== true)) {
                HighestScore = 0;
                ActualScore = 0;
                isInputEnabled = true;
            }
            else if (ScoreDetails && ScoreDetails.actualScore) {
                HighestScore = MaxScore;
                ActualScore = ScoreDetails.actualScore;
                isInputEnabled = true;
            }
            else {
                HighestScore = MaxScore;
                ActualScore = undefined;
                isInputEnabled = false;
            }
            if (selectedIndex > -1) {
                ExistingfinalAuditScopeDetails[selectedIndex].isInputEnabled = isInputEnabled;
                ExistingfinalAuditScopeDetails[selectedIndex].auditObservationMasterId = selectedValue;
                ExistingfinalAuditScopeDetails[selectedIndex].auditMaxScore = HighestScore;
                ExistingfinalAuditScopeDetails[selectedIndex].auditActualScore = ActualScore;
                ExistingfinalAuditScopeDetails[selectedIndex].isobservationSelected = isInputEnabled;
                ExistingfinalAuditScopeDetails[selectedIndex].isCommentRequired = isCommentRequiredparameter ? isCommentRequiredparameter : 0;
            }
        }
        else {
            HighestScore = MaxScore;
            ActualScore = 0;
            isInputEnabled = false;
            if (selectedIndex > -1) {
                ExistingfinalAuditScopeDetails[selectedIndex].isInputEnabled = false;
                ExistingfinalAuditScopeDetails[selectedIndex].auditObservationMasterId = selectedValue;
                ExistingfinalAuditScopeDetails[selectedIndex].auditMaxScore = HighestScore;
                ExistingfinalAuditScopeDetails[selectedIndex].auditActualScore = ActualScore;
                ExistingfinalAuditScopeDetails[selectedIndex].isobservationSelected = isInputEnabled;
                ExistingfinalAuditScopeDetails[selectedIndex].isCommentRequired = isCommentRequiredparameter ? isCommentRequiredparameter : 0;
            }
        }
        this.setState({ finalAuditScopeDetailsForExecution: ExistingfinalAuditScopeDetails });
        if (parseInt(HighestScore) > -1) {
            const index = auditObservationDetils && auditObservationDetils.length > 0 && auditObservationDetils.findIndex(item => item.scopeMasterId === id);
            if (index > -1) {
                //alert("exist");
                const ExistingAuditObservationDetils = [...auditObservationDetils]
                ExistingAuditObservationDetils[index].id = observationDetailsId;
                ExistingAuditObservationDetils[index].auditorId = userId;
                ExistingAuditObservationDetils[index].auditPlanDetailsId = auditPlanDetailsId;
                ExistingAuditObservationDetils[index].scopeMasterId = id;
                ExistingAuditObservationDetils[index].auditObservationMasterId = selectedValue;
                ExistingAuditObservationDetils[index].actualScore = parseInt(ActualScore);
                ExistingAuditObservationDetils[index].maxScore = parseInt(HighestScore);
                ExistingAuditObservationDetils[index].observationDate = CurrentDate;
                ExistingAuditObservationDetils[index].isSubmitted = false;
                ExistingAuditObservationDetils[index].isInputEnabled = isInputEnabled;
                ExistingAuditObservationDetils[index].isCommentRequired = isCommentRequiredparameter ? isCommentRequiredparameter : 0;
                // console.log("ExistingAuditObservationDetils 1",ExistingAuditObservationDetils);
                this.setState({ auditObservationDetils: ExistingAuditObservationDetils })

            }
            else if (auditObservationDetils && auditObservationDetils.length === 1 && (!auditObservationDetils[0].scopeMasterId || auditObservationDetils[0].scopeMasterId === undefined || auditObservationDetils[0].scopeMasterId === 'undefined' || auditObservationDetils[0].scopeMasterId === null)) {
                const ExistingAuditObservationDetils = [...auditObservationDetils]
                ExistingAuditObservationDetils[0].id = observationDetailsId;
                ExistingAuditObservationDetils[0].auditorId = userId;
                ExistingAuditObservationDetils[0].auditPlanDetailsId = auditPlanDetailsId;
                ExistingAuditObservationDetils[0].scopeMasterId = id;
                ExistingAuditObservationDetils[0].auditObservationMasterId = selectedValue;
                ExistingAuditObservationDetils[0].actualScore = parseInt(ActualScore || 0);
                ExistingAuditObservationDetils[0].maxScore = parseInt(HighestScore || 0);
                ExistingAuditObservationDetils[0].observationDate = CurrentDate;
                ExistingAuditObservationDetils[0].isSubmitted = false;
                ExistingAuditObservationDetils[0].isInputEnabled = isInputEnabled;
                ExistingAuditObservationDetils[0].isCommentRequired = isCommentRequiredparameter ? isCommentRequiredparameter : 0;
                //   console.log("ExistingAuditObservationDetils 2",ExistingAuditObservationDetils);
                this.setState({ auditObservationDetils: ExistingAuditObservationDetils })


            }
            else {
                //  alert("New");

                let Data = {
                    id: observationDetailsId,
                    auditorId: userId,
                    auditPlanDetailsId: auditPlanDetailsId,
                    scopeMasterId: id,
                    auditObservationMasterId: selectedValue,
                    observationRemarks: '',
                    actualScore: parseInt(ActualScore || 0),
                    maxScore: parseInt(HighestScore),
                    observationDate: CurrentDate,
                    isSubmitted: false,
                    isInputEnabled: isInputEnabled,
                    isCommentRequired: isCommentRequiredparameter ? isCommentRequiredparameter : 0
                }

                let ExistingData = auditObservationDetils && auditObservationDetils.length > 0 ? auditObservationDetils.concat(Data) : [Data];
                //  console.log("ExistingAuditObservationDetils 3",Data);
                this.setState({ auditObservationDetils: ExistingData })

            }
        }
    }

    validateMediaType(SelectedMedia) {
        const validMediaType = this.state.validMediaType;
        for (const file of SelectedMedia) {
            const MediaType = file && file && file.type;
            if (validMediaType && validMediaType.indexOf(MediaType) === -1) {
                console.log("MediaType : ", MediaType);
                return "MediaNotValid";
            }
        }
        return "ValidMedia";
    }

    onChangeHandlerMultiNew = (scopeDetailsId, selectedObservationId) => event => {

        if (selectedObservationId && selectedObservationId !== null && selectedObservationId !== undefined) {
            const Mulfiles = event.target.files;
            let validateMedia = this.validateMediaType(Mulfiles);
            //console.log("validateMedia : ", validateMedia);
            if (validateMedia === "ValidMedia") {
                var multipledata = [];
                const mediaDetails = Object.assign({}, this.state.mediaDetails);
                this.handleLoad("1");
                const auditPlanDetailsId = this.state.auditPlanDetailsId ? this.state.auditPlanDetailsId : '';
                const datan = new FormData();
                this.handleLoad("1");
                for (const file of Mulfiles) {
                    // const MediaNameSplit = file && file && file.name.split('.');
                    datan.append('image', file);
                }

                fetch(config.AUDIT_URL + constants.END_POINTS.AUDIT.IMAGE_CHANGE + '?oprKey=' + process.env.OPR_KEY, {
                    method: 'POST',
                    headers: {
                        'x-access-token': sessionHelper.getToken()
                    },
                    body: datan,

                }).then(async result => {
                    if (result.status === 200) {
                        this.handleLoad("0");
                        const response = await helper.validateResponse(result);
                        const ResponseData = response && response !== null && response.data && response.data;
                        if (ResponseData && ResponseData.length > 0) {
                            ResponseData.forEach(element => {
                                const MediaNameSplit = element && element && element.originalname.split('.');
                                let suppdocc = {};
                                const newPicPath = element.filename;
                                suppdocc["mediaName"] = element.mimetype;
                                suppdocc["auditPlanDetailsId"] = auditPlanDetailsId;
                                suppdocc["scopeMasterId"] = scopeDetailsId;
                                suppdocc["mediaFullsizeAddress"] = newPicPath;
                                suppdocc["mediaThumbnailAddress"] = newPicPath;
                                suppdocc["isLatestMedia"] = 1;
                                suppdocc["isMultiMedia"] = 1;
                                multipledata = multipledata !== null && multipledata && multipledata !== '' ? multipledata.concat(suppdocc) : suppdocc;
                            });
                        }
                        var StateSupportDtaa = this.state.mediaDetails && this.state.mediaDetails;
                        let Datanew = null;
                        if (StateSupportDtaa) {
                            Datanew = StateSupportDtaa = StateSupportDtaa.filter(item => item.scopeMasterId !== scopeDetailsId)
                        }

                        setTimeout(() => {
                            //    this.handleLoad("0");
                            this.setState({ mediaDetails: StateSupportDtaa ? StateSupportDtaa.concat(multipledata) : multipledata });
                        }, 200);
                    }
                })
            }
            else {
                event.target.value = null;
                alert("Please select valid media type, " + this.state.validMediaTypeMSG + " !!")
            }
        }
        else {
            alert("please select observation first");
        }
    }

    onClickSubmit = (isFinalSubmission, isObservationSubmitted, isObservationSaved) => {
        const existingState = Object.assign({}, this.state.observationDetails);

        let lengthSubmit = this.state.auditObservationDetils && this.state.auditObservationDetils.length > 0 && this.state.auditObservationDetils.filter(item => item.scopeMasterId !== null && item.scopeMasterId !== undefined && item.scopeMasterId !== '-1' && item.auditObservationMasterId !== "-1" && item.auditObservationMasterId !== "Select Observation").length;
        lengthSubmit = lengthSubmit ? lengthSubmit : 0;
        const ScopeLength = this.state.finalAuditScopeDetailsForExecution && this.state.finalAuditScopeDetailsForExecution.length;
        const finalAuditScope = this.state.finalAuditScopeDetailsForExecution;
        const pendingObservation = finalAuditScope && finalAuditScope.filter(item => item.isInputEnabled !== true && item.isInputEnabled !== 1);
        const pendingObservationCount = pendingObservation.length;
        //console.log("finalAuditScope : ", finalAuditScope);
        //console.log("pendingObservation : ", pendingObservation);
        //console.log("pendingObservationCount : ", pendingObservationCount);
        if (pendingObservationCount > 0) {
            //if (lengthSubmit < ScopeLength) {
            //return alert("Please select, all scope audit observation to submit !!");
            //alert(pendingObservationCount);
            return alert("Please select all Scope 'Audit Observations' to submit, " + pendingObservationCount.toString() + " scope observation are still pending !!");
        }
        else {
            let auditObservationDetilsToSave = this.state.auditObservationDetils && this.state.auditObservationDetils.length > 0 && this.state.auditObservationDetils.filter(item => item.scopeMasterId !== null && item.scopeMasterId !== undefined && item.scopeMasterId !== '-1' && item.auditObservationMasterId !== "-1" && item.auditObservationMasterId !== "Select Observation");
            let TotalCommentRequired = auditObservationDetilsToSave && auditObservationDetilsToSave.length > 0 && auditObservationDetilsToSave.filter(item => (item.isCommentRequired === true || item.isCommentRequired === 1)).length;
            let TotalUpdatedComments = auditObservationDetilsToSave && auditObservationDetilsToSave.length > 0 && auditObservationDetilsToSave.filter(item => (item.isCommentRequired === true || item.isCommentRequired === 1) && (item.observationRemarks !== null && item.observationRemarks !== ""  && item.observationRemarks !== '')).length;
            TotalCommentRequired = TotalCommentRequired ? TotalCommentRequired : 0;
            TotalUpdatedComments =TotalUpdatedComments ? TotalUpdatedComments : 0;
           // alert(TotalUpdatedComments);
           // alert(TotalCommentRequired);
            if (TotalUpdatedComments < TotalCommentRequired) {
                return alert("pls specify your comment against negitive observation");
            }
            else {
                existingState["mediaDetails"] = this.state.mediaDetails;
                existingState["auditObservationDetils"] = auditObservationDetilsToSave; //this.state.auditObservationDetils;
                existingState["isFinalSubmission"] = isFinalSubmission;
                existingState["isScoreSubmitted"] = isObservationSubmitted;
                existingState["isScoreSaved"] = isObservationSaved;
                existingState["auditPlanDetailsId"] = this.state.auditPlanDetailsId;
                existingState["roleMasterId"] = this.state.roleMasterId;
                existingState["companyMasterId"] = this.state.companyMasterId;
                existingState["plantId"] = this.state.plantId;
                existingState["processFlowCode"] = this.state.processFlowCode;

                this.props.saveFinalAuditObservationDetails(existingState, undefined);
                this.setState({ isObservationSubmitted: isObservationSubmitted, isObservationSaved: isObservationSaved });

                setTimeout(() => {
                    let MultiSectionIDs = ['pg'];
                    if (this.state.multiSectionMasterId) {
                        MultiSectionIDs = this.ConvertStringToArrayRoleReturn(this.state.multiSectionMasterId)
                    }
                    this.props.getFinalAuditObservationDetails(this.state.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
                    let filters = {
                        auditDetailsId: this.state.auditPlanDetailsId,
                        auditPlanDetailsId: this.state.auditPlanDetailsId,
                    }
                    this.props.getFinalAuditScopeForExecution(filters, undefined, 0, constants.ALL_ROWS_LIST);
                    this.setState({ mediaDetails: [] });
                }, 2000);
            }
        }

    }

    onClickSave = () => {
        let AuditObservationCount = this.state.auditObservationDetils && this.state.auditObservationDetils.length > 0 && this.state.auditObservationDetils.filter(item => item.scopeMasterId !== null && item.scopeMasterId !== undefined && item.scopeMasterId !== '-1' && item.auditObservationMasterId !== "-1" && item.auditObservationMasterId !== "Select Observation").length;
        if (AuditObservationCount === 0) {
            return alert("Please select at least one Scope 'Audit Observations' to save !!");
        }
        else {
            let auditObservationDetilsToSave = this.state.auditObservationDetils && this.state.auditObservationDetils.length > 0 && this.state.auditObservationDetils.filter(item => item.scopeMasterId !== null && item.scopeMasterId !== undefined && item.scopeMasterId !== '-1' && item.auditObservationMasterId !== "-1" && item.auditObservationMasterId !== "Select Observation");
            //   console.log("auditObservationDetilsToSave", auditObservationDetilsToSave);
            let TotalCommentRequired = auditObservationDetilsToSave && auditObservationDetilsToSave.length > 0 && auditObservationDetilsToSave.filter(item => (item.isCommentRequired === true || item.isCommentRequired === 1)).length;
            let TotalUpdatedComments = auditObservationDetilsToSave && auditObservationDetilsToSave.length > 0 && auditObservationDetilsToSave.filter(item => (item.isCommentRequired === true || item.isCommentRequired === 1) && (item.observationRemarks && item.observationRemarks !== null && item.observationRemarks !== "")).length;
            TotalCommentRequired = TotalCommentRequired ? TotalCommentRequired : 0;
            TotalUpdatedComments =TotalUpdatedComments ? TotalUpdatedComments : 0;
           // alert(TotalUpdatedComments);
          //  alert(TotalCommentRequired);
            if (TotalUpdatedComments < TotalCommentRequired) {
                return alert("pls specify your comment against negitive observation");
            }
            else {
                const existingState = Object.assign({}, this.state.observationDetails);
                existingState["mediaDetails"] = this.state.mediaDetails;
                existingState["auditObservationDetils"] = auditObservationDetilsToSave; //this.state.auditObservationDetils;
                existingState["isFinalSubmission"] = false;
                existingState["isScoreSubmitted"] = false;
                existingState["auditPlanDetailsId"] = this.state.auditPlanDetailsId;
                existingState["isScoreSaved"] = true;
                existingState["roleMasterId"] = this.state.roleMasterId;
                existingState["companyMasterId"] = this.state.companyMasterId;
                existingState["plantId"] = this.state.plantId;
                existingState["processFlowCode"] = this.state.processFlowCode;
                this.props.saveFinalAuditObservationDetails(existingState, undefined);
                this.setState({ isObservationSaved: true, isObservationSubmitted: false });
                setTimeout(() => {
                    let MultiSectionIDs = ['pg'];
                    if (this.state.multiSectionMasterId) {
                        MultiSectionIDs = this.ConvertStringToArrayRoleReturn(this.state.multiSectionMasterId)
                    }
                    this.props.getFinalAuditObservationDetails(this.state.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
                    let filters = {
                        auditDetailsId: this.state.auditPlanDetailsId,
                        auditPlanDetailsId: this.state.auditPlanDetailsId,
                    }
                    this.props.getFinalAuditScopeForExecution(filters, undefined, 0, constants.ALL_ROWS_LIST);
                    this.setState({ mediaDetails: [] });
                }, 2000);
            }
        }
    }

    getFileName = (str) => {
        return str.split('\\').pop().split('/').pop();
    }

    render() {
        const { finalAuditScopeDetailsForExecution, observations, supportingDocs, auditPlanDetailsId, auditObservationDetils, auditObservations, multiSectionMasterId } = this.state;
        console.log("auditObservationDetils", auditObservationDetils);
        // console.log("finalAuditPlanExecutionDetailActiontype : ", this.props.finalAuditPlanExecutionDetailActiontype);
        // console.log("this.state.isObservationSubmitted  : ", this.state.isObservationSubmitted);
        if (this.props.finalAuditPlanExecutionDetailActiontype === WorkingType.FINALAUDITPLANEXECUTIONDETALS_SAVE_SUCCESS && this.state.isObservationSubmitted === true) {
            //console.log("Submitted Success!!");
            let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
            let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
            let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : '';
            let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';
            setTimeout(() => {
                this.props.router.push(
                    {
                        pathname: '/auditor',
                        query: {
                            tab: 'final-audit-execution-index',
                            id: processFlowMasterId,
                            processFlowMasterId: processFlowMasterId,
                            processFlowName: processFlowName,
                            processFlowCode: processFlowCode,
                            pageName: 'Audit Observation',
                            auditFlowMasterId: auditFlowMasterId,

                        },
                        tab: 'final-audit-execution-index',
                    },
                    'auditor/final-audit-execution-index'
                )
            }, 1500);
        }

        //console.log("finalAuditScopeDetailsForExecution r", finalAuditScopeDetailsForExecution);
        let i = 1;
        const loadershow = this.state.loadershow && this.state.loadershow ? this.state.loadershow : false;

        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                {loadershow === 'true' &&
                    <Loader />
                }

                <CommonStyle.TABLE_ForExecuteAudit

                >
                    <tr>
                        <th>Sr</th>
                        {/* <th>Section</th> */}
                        <th style={{ width: "150px" }}>Sub Section</th>
                        <th style={{ width: "250px" }}>Question</th>
                        {/* <th>Scope Order</th> */}
                        <th>Criticality</th>
                        <th>Audit Mode</th>
                        <th>Expected Standard</th>
                        <th style={{ width: "150px" }}>Reference Documents/Evidence to be Checked</th>
                        <th>Self Audit Observation</th>
                        <th>Audit Observation</th>
                        <th>Equivalent Score</th>
                        <th>Max Marks</th>
                        <th>Comments from Auditor</th>
                        <th style={{ width: '70px !important' }}>Evidence</th>
                    </tr>
                    {finalAuditScopeDetailsForExecution && finalAuditScopeDetailsForExecution.length > 0 && finalAuditScopeDetailsForExecution.map((item, index) => {
                        //let observation = auditObservationDetils && auditObservationDetils.length > 0 && auditObservationDetils.filter(m => m.scopeMasterId === item.id && m.auditPlanDetailsId === auditPlanDetailsId);
                        let observation = observations && observations.length > 0 && observations.filter(m => m.scopeMasterId === item.scopeMasterId);
                        const obsevationDetailsId = item.auditObservationId;
                        let selectedMaxScore = item.auditMaxScore !== null && item.auditMaxScore !== undefined && item.auditMaxScore !== '' ? item.auditMaxScore : item.maxScore;
                        let selectedActualScore = item.auditActualScore !== null && item.auditActualScore !== undefined && item.auditActualScore !== '' ? item.auditActualScore : '';
                        let selectedObservationId = item.auditObservationMasterId;
                        let selectedObservationRemarks = item.auditObservationRemarks;
                        let isInputEnabled = item.isInputEnabled;
                        let isCommentRequired = (item.isCommentRequired === true || item.isCommentRequired === 1) && (selectedObservationRemarks === null || selectedObservationRemarks === "") ? true : false;
                        let isobservationSelected = item.isobservationSelected ? item.isobservationSelected : false;
                        const filterMediaDeails = supportingDocs && supportingDocs.length > 0 && supportingDocs.filter(m => m.scopeMasterId === item.scopeMasterId)
                        let BackgroundColot = isInputEnabled && (isInputEnabled === true || isInputEnabled === 1) ? '#c4eebb' : 'transparent';
                        return <tr style={{ backgroundColor: BackgroundColot }} key={index}>
                            <td>{index + i}</td>
                            {/* <td>{item.section && item.section.sectionName}</td> */}
                            <td>{item.subSectionName}
                                <br />
                                ({item.sectionName})
                            </td>
                            <td>{item.question}</td>
                            {/* <td>
                            {item.sectionOrder} -
                            {item.subSectionOrder} -
                            {item.scopeOrder} 
                            </td> */}
                            <td>{item.criticalityName}</td>
                            <td>{item.auditModeName}</td>
                            <td>{item.expectedStandard}</td>
                            <td>{item.referenceDocumentToBeChecked}</td>
                            <td>{item.selfAuditObservationName ? item.selfAuditObservationName : 'N/A'}</td>
                            <td>
                                <SELECT
                                    borderRadius={"5px"}
                                    bgColor={"#fff"}
                                    width={"100px"}
                                    height={"40px"}
                                    value={selectedObservationId}
                                    paddingLeft={"10px"}
                                    onChange={this.onChangeValue_Observation(index, item.scopeMasterId, item.sectionMasterId, item.criticalityMasterId, item.maxScore, obsevationDetailsId, observation)}
                                >
                                    <option key={"-1"} >Select Observation</option>
                                    {observation && observation.length > 0 && observation.map((item, index) => {
                                        return <option key={index} value={item.id} >{item.observationName}</option>
                                    })
                                    }
                                </SELECT>
                            </td>
                            <td>
                                <Input
                                    borderRadius={"5px"}
                                    width={"50px"}
                                    height={"40px"}
                                    readOnly={true}
                                    value={selectedActualScore}
                                    paddingLeft={"10px"} />

                            </td>
                            <td>
                                <Input
                                    borderRadius={"5px"}
                                    width={"50px"}
                                    height={"40px"}
                                    readOnly={true}
                                    value={selectedMaxScore}
                                    paddingLeft={"10px"} />
                            </td>
                            <td>
                                <textarea
                                    style={{ width: '100px', borderColor: isCommentRequired === true ? 'red' : 'grey' }}
                                    onChange={this.onChangeValue_Comments(index, item.scopeMasterId, obsevationDetailsId, selectedObservationId, item.sectionMasterId, item.criticalityMasterId, item.maxScore, isobservationSelected)}
                                    defaultValue={selectedObservationRemarks}
                                    disabled={((isInputEnabled && (isInputEnabled === true || isInputEnabled === 1)) || (obsevationDetailsId && obsevationDetailsId !== undefined)) ? false : true}
                                    rows={5} ></textarea>
                            </td>
                            <td style={{ width: "150px !important" }}>
                                <input type="file"
                                    name="file"
                                    className="input-type-file"
                                    size="150"
                                    width={"150px"}
                                    style={{ width: "150px !important" }}
                                    multiple={true}
                                    disabled={((isInputEnabled && isInputEnabled === true) || (obsevationDetailsId && obsevationDetailsId !== undefined)) ? false : true}
                                    onChange={this.onChangeHandlerMultiNew(item.scopeMasterId, selectedObservationId)}
                                />
                                <br />
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

                <CommonStyle.MainDiv
                    justifycontent={"space-around"}
                    width={'50%'}
                >
                    <CommonStyle.ButtonDiv
                        style={{ paddingTop: '44px' }}
                        width="100%"
                    >
                        <Button
                            bgColor="#FFA701"
                            color="#ffffff"
                            height="40px"
                            zIndex={"0"}
                            width="48%"
                            bgChangeHover="#FFBA01"
                            hoverColor="#ffffff"
                            border="solid 1px #FFA701"
                            onClick={() => this.onClickSave()}
                        >
                            Save
                        </Button>
                        <Button
                            bgColor="#358856"
                            color="#ffffff"
                            height="40px"
                            zIndex={"0"}
                            width="48%"
                            bgChangeHover="#4FA64F"
                            hoverColor="#ffffff"
                            border="solid 1px #358856"
                            onClick={() => this.onClickSubmit(false, true, true)}
                        >
                            Submit
                        </Button>
                        {/* <Button
                            bgColor="#1b4f72"
                            color="#ffffff"
                            height="40px"
                            zIndex={"0"}
                            width="32%"
                            bgChangeHover="#ffffff"
                            hoverColor="#1b4f72"
                            border="solid 1px #1b4f72"
                            onClick={() => this.onClickSubmit(true, true,true)}
                        // onClick={() => this.resetValues()}
                        >
                            Finnal Submition
                        </Button> */}
                    </CommonStyle.ButtonDiv>
                </CommonStyle.MainDiv>
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { selfAuditScopeDetailActiontype, observations, selfAuditScoreDetails, supportingDocs, selfAuditScopeDetailRecordsCount, finalAuditScopeDetailsForExecution } = state.workingReducer;
    const { auditObservations, scoringRules } = state.adminReducer;
    const { finalAuditPlanExecutionDetailActiontype } = state.workingReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { selfAuditScopeDetailActiontype, observations, selfAuditScoreDetails, supportingDocs, scoringRules, auditObservations, selfAuditScopeDetailRecordsCount, finalAuditScopeDetailsForExecution, errorType, errorMessage, finalAuditPlanExecutionDetailActiontype };
};

export default withRouter(connect(mapStateToProps, { getAuditObservationData, getMediaDetailsbyAuditPlanDetailsId, getFinalAuditScopeForExecution, getFinalAuditObservationDetails, saveFinalAuditObservationDetails, getScoringRuleMasterData, getAuditObservationMasterData, hideError })(scopeDetails));