import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SELECT } from '../../formStyle';
import { getSelfAudit_ScopeDetails,getAuditObservationData, saveSelfAuditScoreDetails, getSelfAudit_ScoreDetails } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import moment from 'moment';
import Gap from '../../Gap';
import { hideError } from '../../../actions/error.actions';
import * as WorkingType from '../../../action-types/working.action.types';
import { getAuditObservationMasterData, getScoringRuleMasterData } from '../../../actions/admin.action';
import * as helper from '../../../helper';
import config from '../../../config';
import * as sessionHelper from '../../../utils/session.helper';
import Loader from '../../shared/loader';
import { withRouter } from 'next/router';
import * as _ from "lodash";


class scopeDetails extends Wrapper {


    constructor(props) {
        super(props);

        this.state = {
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            loadershow: 'false',
            auditObservations: [],
            
            processFlowCode: props.processFlowCode ? props.processFlowCode : '',
            selfAuditScopeDetails: [],
            scoringRules: [],
            mediaDetails: [],
            observations:[],
            observationDetails: {
                processFlowCode: props.processFlowCode ? props.processFlowCode : 'self-audit-team-assigment-and-audit-execution'

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
                    isMediaInputVisible: false
                }
            ],
            userId: '',
            isScoreSubmitted: false,
            isTeamAssignmentPopupVisible: false,
            selectedAuditPlanDetailsId: undefined,
            multiSectionMasterId: props.multiSectionMasterId ? props.multiSectionMasterId : undefined,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined
        };
    };

    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    componentDidMount() {
        let MultiSectionIDs = ['pg'];
        const LoggedUser = this.loggedUser();
        const CurrentRole = this.getLoggedUserRole_JSONConverted()
        const UserId = LoggedUser && LoggedUser.id;
        const roleID = CurrentRole && CurrentRole.id;
        const companyMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.companyMasterID;
        const plantMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.id;

        if (this.state.multiSectionMasterId) {
            MultiSectionIDs = this.ConvertStringToArrayRoleReturn(this.state.multiSectionMasterId)
        }
        this.props.getScoringRuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);

        this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);

        this.props.getSelfAudit_ScopeDetails(this.state.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSelfAudit_ScoreDetails(this.state.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
        this.setState({
            userId: UserId,
            roleMasterId: roleID,
            companyMasterId: companyMasterId,
            plantId: plantMasterId
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selfAuditScopeDetails && nextProps.selfAuditScopeDetails != this.state.selfAuditScopeDetails) {
            this.setState({
                selfAuditScopeDetails: nextProps.selfAuditScopeDetails
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
        if (nextProps.auditPlanDetailsId && nextProps.auditPlanDetailsId != this.state.auditPlanDetailsId) {
            let MultiSectionIDs = ['pg'];
            if (this.state.multiSectionMasterId) {
                MultiSectionIDs = this.ConvertStringToArrayRoleReturn(this.state.multiSectionMasterId)
            }
            this.props.getSelfAudit_ScopeDetails(nextProps.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);
            this.props.getSelfAudit_ScoreDetails(nextProps.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId
            });
        }
        if (nextProps.multiSectionMasterId && nextProps.multiSectionMasterId != this.state.multiSectionMasterId) {
            let MultiSectionIDs = this.ConvertStringToArrayRoleReturn(nextProps.multiSectionMasterId)

            this.props.getSelfAudit_ScopeDetails(this.state.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);
            this.setState({
                multiSectionMasterId: nextProps.multiSectionMasterId
            });
        }
        if (nextProps && nextProps.selfAuditScoreDetailActiontype && nextProps.selfAuditScoreDetailActiontype === WorkingType.SA_TEAMASSIGNMENTANDEXECUTION_SAVE_SUCCESS && this.state.isScoreSubmitted === true) {
            setTimeout(() => {
                this.onClickBackButton_ToMainPage();
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

    ConvertStringToArrayRoleReturn = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring;
    }
    onClickAssignTeamButton = (id) => {
        this.setState({ isTeamAssignmentPopupVisible: true, selectedAuditPlanDetailsId: id })
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

    onClickBackButton_ToMainPage = () => {
        this.props.router.push(
            {
                pathname: 'plantHrHead',
                query: {
                    tab: 'self-audit-team-assigment-and-audit-execution',
                    id: undefined,
                    pageName: 'Team Assigment & Audit Execution',
                    auditFlowMasterId: undefined,
                },
                tab: 'self-audit-team-assigment-and-audit-execution',
            },
            'plantHrHead/self-audit-team-assigment-and-audit-execution'
        )
    }
    onChangeHandlerMultiNew = (scopeDetailsId, SelectedObservationID) => event => {

        if (SelectedObservationID && SelectedObservationID !== null && SelectedObservationID !== undefined) {
            const Mulfiles = event.target.files;
            var multipledata = [];
            const mediaDetails = Object.assign({}, this.state.mediaDetails);
            this.handleLoad("1");
            const auditPlanDetailsId = this.state.auditPlanDetailsId ? this.state.auditPlanDetailsId : '';
            const datan = new FormData();
            this.handleLoad("1");
            for (const file of Mulfiles) {
                const MediaNameSplit = file && file && file.name.split('.');
                datan.append('image', file);
            }
            let FileSize = Mulfiles && Mulfiles && Mulfiles.size;
            let MaxFileSize = 100 * 1024 * 1024;
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
            alert("please select observation first");
        }

    }
    onChangeValue_Comments = (tindex, id, observationDetailsId) => event => {
        let auditPlanDetailsId = this.state.auditPlanDetailsId;
        const userId = this.state.userId;
        const auditObservationDetils = this.state.auditObservationDetils;
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
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
    }
    onChangeValue_Observation = (tindex, id, sectionMasterID, criticalityMasterId, maxScore, observationDetailsId) => event => {
        const auditPlanDetailsId = this.state.auditPlanDetailsId;
        const ObservationMaster = this.state.auditObservations;
        const scoringRules = this.state.scoringRules;
        const userId = this.state.userId;
        let MaxScore = maxScore;
        let ActualScore = undefined;
        let HighestScore = undefined;
        let ScoringRuleMaster = undefined;
        let SelectedObservationDetails = undefined;
        let ScoreDetails = undefined;
        let isObservationSelected = true;
        let isMediaInputVisible = false;
        const CurrentDate = moment(new Date()).format("YYYY-MM-DD");
        const auditObservationDetils = this.state.auditObservationDetils;
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (selectedValue && selectedValue !== '-1' && selectedValue !== "Select Observation") {
            SelectedObservationDetails = ObservationMaster && ObservationMaster.length > 0 && ObservationMaster.filter(item => item.id === selectedValue)[0];
            ScoreDetails = scoringRules && scoringRules.length > 0 && scoringRules.filter(item => item.observationMasterId === selectedValue && item.sectionMasterid === sectionMasterID && item.criticalityMasterId === criticalityMasterId)[0];

            if (SelectedObservationDetails && SelectedObservationDetails.isHighestScoreApplicable && (SelectedObservationDetails.isHighestScoreApplicable === 1 || SelectedObservationDetails.isHighestScoreApplicable === true)) {
                HighestScore = MaxScore;
                ActualScore = MaxScore;
                isMediaInputVisible = true;
            }
            else if (SelectedObservationDetails && SelectedObservationDetails.isScoreNotApplicable && (SelectedObservationDetails.isScoreNotApplicable === 1 || SelectedObservationDetails.isScoreNotApplicable === true)) {
                HighestScore = 0;
                ActualScore = 0;
                isMediaInputVisible = true;
            }
            else if (ScoreDetails && ScoreDetails.actualScore) {
                HighestScore = MaxScore;
                ActualScore = ScoreDetails.actualScore;
                isMediaInputVisible = true;
            }
            else {
                HighestScore = MaxScore;
                ActualScore = undefined;
                isMediaInputVisible = false;
            }
            isObservationSelected = true;
        }
        else {
            HighestScore = MaxScore;
            ActualScore = 0;
            isMediaInputVisible = false;
            isObservationSelected = false;
        }

        if (parseInt(HighestScore) > -1) {
            const index = auditObservationDetils && auditObservationDetils.length > 0 && auditObservationDetils.findIndex(item => item.scopeMasterId === id);
            if (index > -1) {
                //alert("exist");
                //alert(isObservationSelected);
                const ExistingAuditObservationDetils = [...auditObservationDetils]
                ExistingAuditObservationDetils[index].id = observationDetailsId;
                ExistingAuditObservationDetils[index].auditorId = userId;
                ExistingAuditObservationDetils[index].auditPlanDetailsId = auditPlanDetailsId;
                ExistingAuditObservationDetils[index].scopeMasterId = id;
                ExistingAuditObservationDetils[index].auditObservationMasterId = isObservationSelected && isObservationSelected === true ? selectedValue : null;
                ExistingAuditObservationDetils[index].actualScore = parseInt(ActualScore);
                ExistingAuditObservationDetils[index].maxScore = parseInt(HighestScore);
                ExistingAuditObservationDetils[index].observationDate = CurrentDate;
                ExistingAuditObservationDetils[index].isSubmitted = isObservationSelected;
                ExistingAuditObservationDetils[index].isMediaInputVisible = isMediaInputVisible;
                this.setState({ auditObservationDetils: ExistingAuditObservationDetils })
            }
            else if (auditObservationDetils && auditObservationDetils.length === 1 && (!auditObservationDetils[0].scopeMasterId || auditObservationDetils[0].scopeMasterId === undefined || auditObservationDetils[0].scopeMasterId === 'undefined' || auditObservationDetils[0].scopeMasterId === null)) {
                //  alert("exist 2");
                const ExistingAuditObservationDetils = [...auditObservationDetils]
                ExistingAuditObservationDetils[0].id = observationDetailsId;
                ExistingAuditObservationDetils[0].auditorId = userId;
                ExistingAuditObservationDetils[0].auditPlanDetailsId = auditPlanDetailsId;
                ExistingAuditObservationDetils[0].scopeMasterId = id;
                ExistingAuditObservationDetils[0].auditObservationMasterId = isObservationSelected && isObservationSelected === true ? selectedValue : null;
                ExistingAuditObservationDetils[0].actualScore = parseInt(ActualScore || 0);
                ExistingAuditObservationDetils[0].maxScore = parseInt(HighestScore || 0);
                ExistingAuditObservationDetils[0].observationDate = CurrentDate;
                ExistingAuditObservationDetils[0].isSubmitted = isObservationSelected;
                ExistingAuditObservationDetils[0].isMediaInputVisible = isMediaInputVisible;
                this.setState({ auditObservationDetils: ExistingAuditObservationDetils })
            }
            else {
                //  alert("New");
                let Data = {
                    id: observationDetailsId,
                    auditorId: userId,
                    auditPlanDetailsId: auditPlanDetailsId,
                    scopeMasterId: id,
                    auditObservationMasterId: isObservationSelected && isObservationSelected === true ? selectedValue : null,
                    observationRemarks: '',
                    actualScore: parseInt(ActualScore || 0),
                    maxScore: parseInt(HighestScore),
                    observationDate: CurrentDate,
                    isSubmitted: isObservationSelected,
                    isMediaInputVisible: isMediaInputVisible
                }
                let ExistingData = auditObservationDetils && auditObservationDetils.length > 0 ? auditObservationDetils.concat(Data) : [Data];
                this.setState({ auditObservationDetils: ExistingData })
            }
        }

    }
    onClickSubmit = () => {
        const existingState = Object.assign({}, this.state.observationDetails);

        let lengthSubmit = this.state.auditObservationDetils && this.state.auditObservationDetils.length > 0 && this.state.auditObservationDetils.filter(item => item.scopeMasterId !== null && item.scopeMasterId !== undefined && item.scopeMasterId !== '-1' && item.auditObservationMasterId !== "Select Observation" && item.auditObservationMasterId !== null && item.auditObservationMasterId !== '' && item.auditObservationMasterId !== '-1').length;
        lengthSubmit = lengthSubmit ? lengthSubmit : 0;
        const ScopeLength = this.state.selfAuditScopeDetails && this.state.selfAuditScopeDetails.length;
        if (lengthSubmit < ScopeLength) {
            return alert("Complete all scope to submit. Else you can click on save");
        }
        else {
            existingState["mediaDetails"] = this.state.mediaDetails;
            existingState["auditObservationDetils"] = this.state.auditObservationDetils;
            existingState["isScoreSubmitted"] = true;
            existingState["isScoreSaved"] = true;
            existingState["auditPlanDetailsId"] = this.state.auditPlanDetailsId;
            existingState["roleMasterId"] = this.state.roleMasterId;
            existingState["companyMasterId"] = this.state.companyMasterId;
            existingState["plantId"] = this.state.plantId;
            existingState["processFlowCode"] = this.state.processFlowCode;
            this.setState({ isScoreSubmitted: true });

            this.props.saveSelfAuditScoreDetails(existingState, undefined);
            setTimeout(() => {
                let MultiSectionIDs = ['pg'];
                if (this.state.multiSectionMasterId) {
                    MultiSectionIDs = this.ConvertStringToArrayRoleReturn(this.state.multiSectionMasterId)
                }
                this.props.getSelfAudit_ScoreDetails(this.state.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
                this.props.getSelfAudit_ScopeDetails(this.state.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.setState({ mediaDetails: [] });
            }, 2000);
        }
    }

    onClickSave = () => {
        const existingState = Object.assign({}, this.state.observationDetails);
        existingState["mediaDetails"] = this.state.mediaDetails;
        existingState["auditObservationDetils"] = this.state.auditObservationDetils;
        existingState["isScoreSubmitted"] = false;
        existingState["auditPlanDetailsId"] = this.state.auditPlanDetailsId;
        existingState["isScoreSaved"] = true;
        existingState["roleMasterId"] = this.state.roleMasterId;
        existingState["companyMasterId"] = this.state.companyMasterId;
        existingState["plantId"] = this.state.plantId;
        existingState["processFlowCode"] = this.state.processFlowCode;
        this.props.saveSelfAuditScoreDetails(existingState, undefined);
        setTimeout(() => {
            let MultiSectionIDs = ['pg'];
            if (this.state.multiSectionMasterId) {
                MultiSectionIDs = this.ConvertStringToArrayRoleReturn(this.state.multiSectionMasterId)
            }
            this.props.getSelfAudit_ScoreDetails(this.state.auditPlanDetailsId, 0, constants.ALL_ROWS_LIST);
            this.props.getSelfAudit_ScopeDetails(this.state.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);
            this.setState({ mediaDetails: [] });
        }, 2000);
    }

    getFileName = (str) => {
        return str.split('\\').pop().split('/').pop();
    }

    orderBydatafun = (key, data) => {
        const datad = data && data.length > 0 && _.sortBy(data, ["section.sectionName", "subsection.subSectionName"]).map(application => {
            return application;
        }
        )
        return datad;
    }

    render() {
        const { selfAuditScopeDetails, auditPlanDetailsId, auditObservationDetils, auditObservations, multiSectionMasterId } = this.state;
        const sortedState = this.orderBydatafun('', selfAuditScopeDetails);
        // const sortedState = selfAuditScopeDetails && selfAuditScopeDetails.length > 0 && selfAuditScopeDetails.sort((a, b) => a.section.sectionName.localeCompare(b.section.sectionName)).sort((c, d) => c.subsection.subSectionName.localeCompare(d.subsection.subSectionName)).sort((e, f) => (e.scopeOrder < f.scopeOrder));
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
                        <th>Section</th>
                        <th>Sub Section</th>
                        <th>Question</th>
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
                    {sortedState && sortedState.length > 0 && sortedState.map((item, index) => {
                        let observation = auditObservationDetils && auditObservationDetils.length > 0 && auditObservationDetils.filter(m => m.scopeMasterId === item.id && m.auditPlanDetailsId === auditPlanDetailsId);
                        let isSubmitted = observation && observation.length > 0 && observation[0].isSubmitted;
                        let SelectedMaxScore = observation && observation.length > 0 && observation[0].maxScore;
                        let SelectedActualScore = observation && observation.length > 0 && observation[0].actualScore;
                        let SelectedObservationID = observation && observation.length > 0 ? observation[0].auditObservationMasterId : item.scopeAuditobservation && item.scopeAuditobservation.auditObservationMasterId;
                        let SelectedObservationRemarks = observation && observation.length > 0 ? observation[0].observationRemarks : '';
                        let isMediaInputVisible = observation && observation.length > 0 && observation[0].isMediaInputVisible;
                        const ObsevationDetailsId = item.scopeAuditobservation && item.scopeAuditobservation.id;
                        let BackgroundColot = SelectedObservationID && SelectedObservationID ? '#c4eebb' : 'transparent';
                        let ObSelectedVal = isSubmitted === true ? (SelectedObservationID !== null && SelectedObservationID !== false && SelectedObservationID !== 'false' && SelectedObservationID !== undefined ? SelectedObservationID : item.scopeAuditobservation ? item.scopeAuditobservation.auditObservationMasterId : '') : '';
                        // console.log("isSubmitted" + index, isSubmitted);
                        return <tr style={{ backgroundColor: BackgroundColot }} key={index}>
                            <td>{index + i}</td>
                            <td>{item.section && item.section.sectionName}</td>
                            <td>{item.subsection && item.subsection.subSectionName}
                            </td>
                            <td>{item.question}</td>
                            <td>{item.criticality && item.criticality.criticalityName}</td>
                            <td>{item.auditMode && item.auditMode.value}</td>
                            <td>{item.expectedStandard}</td>
                            <td>{item.referenceDocumentToBeChecked}</td>
                            <td>
                                <SELECT
                                    borderRadius={"5px"}
                                    bgColor={"#fff"}
                                    width={"100px"}
                                    height={"40px"}
                                    value={ObSelectedVal}
                                    paddingLeft={"10px"}
                                    onChange={this.onChangeValue_Observation(index, item.id, item.sectionMasterId, item.criticalityMasterId, item.maxScore, ObsevationDetailsId)}
                                >
                                    <option key={"-1"} >Select Observation</option>
                                    {auditObservations && auditObservations.length > 0 && auditObservations.map((obs, index) => {
                                        return <option selected={ObSelectedVal === obs.id ? true : false} key={index} value={obs.id} >{obs.observationName}</option>
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
                                    value={SelectedActualScore !== null && SelectedActualScore !== false && SelectedActualScore !== 'false' && SelectedActualScore !== undefined ? SelectedActualScore : item.scopeAuditobservation ? item.scopeAuditobservation.actualScore : ''}
                                    paddingLeft={"10px"} />

                            </td>
                            <td>
                                <Input
                                    borderRadius={"5px"}
                                    width={"50px"}
                                    height={"40px"}
                                    readOnly={true}
                                    value={SelectedMaxScore !== null && SelectedMaxScore !== false && SelectedMaxScore !== 'false' && SelectedMaxScore !== undefined ? SelectedMaxScore : item.scopeAuditobservation ? item.scopeAuditobservation.maxScore : item.maxScore}
                                    paddingLeft={"10px"} />
                            </td>
                            <td>
                                <textarea
                                    style={{ width: '100px' }}
                                    onChange={this.onChangeValue_Comments(index, item.id, ObsevationDetailsId)}
                                    defaultValue={SelectedObservationRemarks && SelectedObservationRemarks !== null && SelectedObservationRemarks !== false && SelectedObservationRemarks !== 'false' && SelectedObservationRemarks !== undefined ? SelectedObservationRemarks : item.scopeAuditobservation ? item.scopeAuditobservation.observationRemarks : ''}
                                    disabled={((isSubmitted && isSubmitted === true)) ? false : true}

                                    rows={5} ></textarea>
                            </td>
                            <td style={{ width: '120px !important' }}>
                                <input type="file" name="file"
                                    className=''
                                    style={{ width: '120px !important' }}
                                    multiple={true}
                                    disabled={((isSubmitted && isSubmitted === true)) ? false : true}
                                    onChange={this.onChangeHandlerMultiNew(item.id, SelectedObservationID)}
                                />
                                <br />
                                {item.scoreMedia && item.scoreMedia.length > 0 && item.scoreMedia.map((media, mindex) => {
                                    console.log('media.mediaName', media.mediaName)
                                    let imageAddress = '';
                                    if (media && media.mediaName) {
                                        if (media.mediaFullsizeAddress.indexOf('https://') > -1) {
                                            imageAddress = media.mediaFullsizeAddress;
                                        }
                                        else {
                                            imageAddress = config.AUDIT_URL + constants.END_POINTS.IMAGES + media.mediaFullsizeAddress;
                                        }
                                    }
                                    return <a title={this.getFileName(imageAddress)} href={imageAddress} target='_blank'>
                                        <img style={{ width: '20px', height: '20px', marginRight: '3px', border: '1px solid white' }} src="../../../static/downloadicon.png"></img>
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
                            bgChangeHover="#4FA64F"
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
                            bgChangeHover="#ffffff"
                            hoverColor="#f4d413"
                            border="solid 1px #f4d413"
                            onClick={() => this.onClickSubmit()}
                        // onClick={() => this.resetValues()}
                        >
                            Submit
                        </Button>
                    </CommonStyle.ButtonDiv>
                </CommonStyle.MainDiv>
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { selfAuditScopeDetailActiontype,observations, selfAuditScoreDetailActiontype, selfAuditScoreDetails, selfAuditScopeDetailRecordsCount, selfAuditScopeDetails } = state.workingReducer;
    const { auditObservations, scoringRules } = state.adminReducer;

    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { selfAuditScopeDetailActiontype,observations, selfAuditScoreDetailActiontype, selfAuditScoreDetails, scoringRules, auditObservations, selfAuditScopeDetailRecordsCount, selfAuditScopeDetails, errorType, errorMessage };
};

//export default connect(mapStateToProps, { getSelfAudit_ScopeDetails, getSelfAudit_ScoreDetails, saveSelfAuditScoreDetails, getScoringRuleMasterData, getAuditObservationMasterData, hideError })(scopeDetails);

export default withRouter(connect(mapStateToProps, { getSelfAudit_ScopeDetails,getAuditObservationData, getSelfAudit_ScoreDetails, saveSelfAuditScoreDetails, getScoringRuleMasterData, getAuditObservationMasterData, hideError })(scopeDetails));
