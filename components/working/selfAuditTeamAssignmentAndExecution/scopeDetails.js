import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SELECT } from '../../formStyle';
import { getSelfAudit_ScopeDetails, getMediaDetailsbyAuditPlanDetailsId, getAuditObservationData, saveSelfAuditScoreDetails, getSelfAudit_ScoreDetails } from '../../../actions/working.action';
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
            supportingDocs: [],
            processFlowCode: props.processFlowCode ? props.processFlowCode : '',
            selfAuditScopeDetails: [],
            scoringRules: [],
            mediaDetails: [],
            observations: [],
            observationDetails: {
                processFlowCode: props.processFlowCode ? props.processFlowCode : 'self-audit-team-assigment-and-audit-execution'

            },
            userId: '',
            isScoreSubmitted: false,
            isTeamAssignmentPopupVisible: false,
            selectedAuditPlanDetailsId: undefined,
            multiSectionMasterId: props.multiSectionMasterId ? props.multiSectionMasterId : undefined,
            auditPlanDetailsId: props.auditPlanDetailsId ? props.auditPlanDetailsId : undefined,
            validMediaType: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint', 'application/vnd.ms-powerpoint.presentation.macroEnabled.12', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
            validMediaTypeMSG: "Only image(jpeg,jpg,png), PDF, Excel(xlsx,xls) & PPT(ppt,pptx,pptm) are allowed"
        };
    };
    componentDidMount() {
        let MultiSectionIDs = ['pg'];
        const LoggedUser = this.loggedUser();
        const CurrentRole = this.getLoggedUserRole_JSONConverted()
        const UserId = LoggedUser && LoggedUser.id;
        const roleID = CurrentRole && CurrentRole.id;
        const companyMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.companyMasterID;
        const plantMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.id;

        if (this.state.multiSectionMasterId) {
            MultiSectionIDs = this.convertStringdataToArrayList(this.state.multiSectionMasterId)
        }
        this.props.getScoringRuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getAuditObservationData(this.state.auditPlanDetailsId, 'Self_Audit');

        this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.auditPlanDetailsId)
        this.props.getSelfAudit_ScopeDetails(this.state.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        if (nextProps.observations && nextProps.observations != this.state.observations) {
            this.setState({
                observations: nextProps.observations
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
                MultiSectionIDs = this.convertStringdataToArrayList(this.state.multiSectionMasterId)
            }
            this.props.getSelfAudit_ScopeDetails(nextProps.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);
            this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, nextProps.auditPlanDetailsId)
            this.setState({
                auditPlanDetailsId: nextProps.auditPlanDetailsId
            });
        }
        if (nextProps.multiSectionMasterId && nextProps.multiSectionMasterId != this.state.multiSectionMasterId) {
            let MultiSectionIDs = this.convertStringdataToArrayList(nextProps.multiSectionMasterId)

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
        if (nextProps.supportingDocs && nextProps.supportingDocs != this.state.supportingDocs) {
            this.setState({
                supportingDocs: nextProps.supportingDocs
            });
        }
        if (nextProps && nextProps.selfAuditScoreDetailActiontype && nextProps.selfAuditScoreDetailActiontype === WorkingType.SA_TEAMASSIGNMENTANDEXECUTION_SAVE_SUCCESS && (!this.state.isScoreSubmitted || this.state.isScoreSubmitted === false)) {
            setTimeout(() => {
                let MultiSectionIDs = ['pg'];
                if (this.state.multiSectionMasterId) {
                    MultiSectionIDs = this.convertStringdataToArrayList(this.state.multiSectionMasterId)
                }
                this.props.getSelfAudit_ScopeDetails(this.state.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.props.getMediaDetailsbyAuditPlanDetailsId(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.auditPlanDetailsId)

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

    onChangeHandlerMultiNew = (scopeDetailsId, SelectedObservationID) => event => {

        if (SelectedObservationID && SelectedObservationID !== null && SelectedObservationID !== undefined) {
            const Mulfiles = event.target.files;
            //console.log("Mulfiles : ", Mulfiles);
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
                    const MediaNameSplit = file && file && file.name.split('.');
                    const MediaType = file && file && file.name.split('.');
                    // if (MediaType === "image/jpeg" || MediaType !== "image/jpg" || MediaType !== "" || MediaType !== "") {

                    // }
                    datan.append('image', file);
                }
                //let FileSize = Mulfiles && Mulfiles && Mulfiles.size;
                //let MaxFileSize = 100 * 1024 * 1024;
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
                            // this.handleLoad("0");
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

    onClickSubmit = () => {
        const existingState = Object.assign({}, this.state.observationDetails);
        const CurrentDataSave = this.state.selfAuditScopeDetails && this.state.selfAuditScopeDetails.length > 0 && this.state.selfAuditScopeDetails.filter(item => (item.isobservationSelected === 1 || item.isobservationSelected === true));
        let lengthSubmit = this.state.selfAuditScopeDetails && this.state.selfAuditScopeDetails.length > 0 && this.state.selfAuditScopeDetails.filter(item => (item.isSubmitted === 1 || item.isSubmitted === true)).length;
        lengthSubmit = lengthSubmit ? lengthSubmit : 0;
        let TotalCommentRequired = CurrentDataSave && CurrentDataSave.length > 0 && CurrentDataSave.filter(item => (item.isCommentRequired === true || item.isCommentRequired === 1)).length;
        let TotalUpdatedComments = CurrentDataSave && CurrentDataSave.length > 0 && CurrentDataSave.filter(item => (item.isCommentRequired === true || item.isCommentRequired === 1) && (item.observationRemarks !== null && item.observationRemarks !== "")).length;
       
        TotalCommentRequired = TotalCommentRequired ? TotalCommentRequired : 0;
        TotalUpdatedComments = TotalUpdatedComments ? TotalUpdatedComments : 0;
        const ScopeLength = this.state.selfAuditScopeDetails && this.state.selfAuditScopeDetails.length;
        if (lengthSubmit < ScopeLength) {
            return alert("Complete all scope to submit. Else you can click on save");
        }
        else if (TotalUpdatedComments < TotalCommentRequired) {
            return alert("pls specify your comment against negitive observation");
        }
        else {
            existingState["mediaDetails"] = this.state.mediaDetails;
            existingState["auditObservationDetils"] = CurrentDataSave;
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
                // let MultiSectionIDs = ['pg'];
                // if (this.state.multiSectionMasterId) {
                // MultiSectionIDs = this.convertStringdataToArrayList(this.state.multiSectionMasterId)
                // }
                // this.props.getSelfAudit_ScopeDetails(this.state.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);

                this.setState({ mediaDetails: [] });
            }, 2000);
        }
    }

    onClickSave = () => {
        const CurrentDataSave = this.state.selfAuditScopeDetails && this.state.selfAuditScopeDetails.length > 0 && this.state.selfAuditScopeDetails.filter(item => (item.isobservationSelected === 1 || item.isobservationSelected === true));
        let TotalCommentRequired = CurrentDataSave && CurrentDataSave.length > 0 && CurrentDataSave.filter(item => (item.isCommentRequired === true || item.isCommentRequired === 1)).length;
        let TotalUpdatedComments = CurrentDataSave && CurrentDataSave.length > 0 && CurrentDataSave.filter(item => (item.isCommentRequired === true || item.isCommentRequired === 1) && (item.observationRemarks !== null && item.observationRemarks !== "")).length;
        TotalCommentRequired = TotalCommentRequired ? TotalCommentRequired : 0;
        TotalUpdatedComments = TotalUpdatedComments ? TotalUpdatedComments : 0;
        if (TotalUpdatedComments < TotalCommentRequired) {
            return alert("pls specify your comment against negitive observation");
        }
        else {
            const existingState = Object.assign({}, this.state.observationDetails);
            existingState["mediaDetails"] = this.state.mediaDetails;
            existingState["auditObservationDetils"] = CurrentDataSave;
            existingState["isScoreSubmitted"] = false;
            existingState["auditPlanDetailsId"] = this.state.auditPlanDetailsId;
            existingState["isScoreSaved"] = true;
            existingState["roleMasterId"] = this.state.roleMasterId;
            existingState["companyMasterId"] = this.state.companyMasterId;
            existingState["plantId"] = this.state.plantId;
            existingState["processFlowCode"] = this.state.processFlowCode;
            this.props.saveSelfAuditScoreDetails(existingState, undefined);
            setTimeout(() => {
                // let MultiSectionIDs = ['pg'];
                // if (this.state.multiSectionMasterId) {
                // MultiSectionIDs = this.convertStringdataToArrayList(this.state.multiSectionMasterId)
                // }
                // this.props.getSelfAudit_ScopeDetails(this.state.auditPlanDetailsId, MultiSectionIDs, 0, constants.ALL_ROWS_LIST, undefined, undefined);

                this.setState({ mediaDetails: [] });
            }, 2000);
        }

    }

    onChangeValue_Observation_New = (index, maxScore, observation, sectionMasterID, criticalityMasterId) => event => {
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const ObservationMaster = observation;
        const scoringRules = this.state.scoringRules;
        const userId = this.state.userId;
        const CurrentDate = moment(new Date()).format("YYYY-MM-DD");
        const selfAuditScopeDetails = this.state.selfAuditScopeDetails;
        let MaxScore = maxScore;
        let ActualScore = undefined;
        let HighestScore = undefined;
        let isCommentRequired = false;
        let SelectedObservationDetails = undefined;
        let ScoreDetails = undefined;
        let isObservationSelected = true;
        if (selectedValue && selectedValue !== '-1' && selectedValue !== "Select Observation") {
            SelectedObservationDetails = ObservationMaster && ObservationMaster.length > 0 && ObservationMaster.filter(item => item.id === selectedValue)[0];
            isCommentRequired = SelectedObservationDetails && SelectedObservationDetails.isCommentRequired;
            ScoreDetails = scoringRules && scoringRules.length > 0 && scoringRules.filter(item => item.observationMasterId === selectedValue && item.sectionMasterid === sectionMasterID && item.criticalityMasterId === criticalityMasterId)[0];
            if (SelectedObservationDetails && SelectedObservationDetails.isHighestScoreApplicable && (SelectedObservationDetails.isHighestScoreApplicable === 1 || SelectedObservationDetails.isHighestScoreApplicable === true)) {
                HighestScore = MaxScore;
                ActualScore = MaxScore;
            }
            else if (SelectedObservationDetails && (SelectedObservationDetails.isScoreApplicable !== 1 && SelectedObservationDetails.isScoreApplicable !== true)) {

                HighestScore = 0;
                ActualScore = 0;
            }
            else if (ScoreDetails && ScoreDetails.actualScore) {

                HighestScore = MaxScore;
                ActualScore = ScoreDetails.actualScore;
            }
            else {
                HighestScore = MaxScore;
                ActualScore = undefined;
            }
            isObservationSelected = true;
        }
        else {
            HighestScore = MaxScore;
            ActualScore = 0;
            isObservationSelected = false;
        }
        if (isObservationSelected && isObservationSelected === true) {
            const ExistingAuditObservationDetils = [...selfAuditScopeDetails]
            ExistingAuditObservationDetils[index].auditorId = userId;
            ExistingAuditObservationDetils[index].auditObservationMasterId = selectedValue;
            ExistingAuditObservationDetils[index].actualScore = ActualScore ? parseInt(ActualScore) : 0;
            ExistingAuditObservationDetils[index].maxScore = parseInt(HighestScore);
            ExistingAuditObservationDetils[index].observationDate = CurrentDate;
            ExistingAuditObservationDetils[index].isSubmitted = isObservationSelected;
            ExistingAuditObservationDetils[index].isobservationSelected = true;
            ExistingAuditObservationDetils[index].isCommentRequired = isCommentRequired;
            this.setState({ selfAuditScopeDetails: ExistingAuditObservationDetils })
        }
        else {
            const ExistingAuditObservationDetils = [...selfAuditScopeDetails]
            ExistingAuditObservationDetils[index].auditorId = userId;
            ExistingAuditObservationDetils[index].auditObservationMasterId = '-1';
            ExistingAuditObservationDetils[index].actualScore = 0;
            ExistingAuditObservationDetils[index].maxScore = parseInt(HighestScore);
            ExistingAuditObservationDetils[index].observationDate = CurrentDate;
            ExistingAuditObservationDetils[index].isSubmitted = false;
            ExistingAuditObservationDetils[index].isobservationSelected = true;
            ExistingAuditObservationDetils[index].isCommentRequired = false;
            this.setState({ selfAuditScopeDetails: ExistingAuditObservationDetils })
        }
    }
    onChangeValue_Comments = (index) => event => {
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (index > -1) {
            const selfAuditScopeDetails = this.state.selfAuditScopeDetails;
            const ExistingAuditObservationDetils = [...selfAuditScopeDetails]
            ExistingAuditObservationDetils[index].observationRemarks = selectedValue;
            this.setState({ selfAuditScopeDetails: ExistingAuditObservationDetils })
        }
    }
    render() {
        const { selfAuditScopeDetails, supportingDocs, observations } = this.state;
        // const sortedState = this.orderBydatafun('', selfAuditScopeDetails);
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
                        <th style={{ width: "150px" }}>Sub Section</th>
                        <th style={{ width: "250px" }}>Question</th>
                        <th>Criticality</th>
                        <th>Audit Mode</th>
                        <th>Expected Standard</th>
                        <th style={{ width: "150px" }}>Reference Documents/Evidence to be Checked</th>
                        <th>Audit Observation</th>
                        <th>Equivalent Score</th>
                        <th>Max Marks</th>
                        <th>Comments from Auditor</th>
                        <th className="width120px">Evidence</th>
                    </tr>
                    {selfAuditScopeDetails && selfAuditScopeDetails.length > 0 && selfAuditScopeDetails.map((item, index) => {
                        let observation = observations && observations.length > 0 && observations.filter(m => m.scopeMasterId === item.scopeMasterId);
                        let isSubmitted = item.isSubmitted && (item.isSubmitted === true || item.isSubmitted === 1) ? true : false;
                        let BackgroundColot = item.isSubmitted && (item.isSubmitted === true || item.isSubmitted === 1) ? '#c4eebb' : 'transparent';
                        const filterMediaDeails = supportingDocs && supportingDocs.length > 0 && supportingDocs.filter(m => m.scopeMasterId === item.scopeMasterId)
                        // console.log("isSubmitted" + index, isSubmitted);
                        return <tr style={{ backgroundColor: BackgroundColot }} key={index}>
                            <td>{index + i}</td>
                            <td>{item.sectionName}</td>
                            <td>{item.subSectionName}
                            </td>
                            <td>{item.question}</td>
                            <td>{item.criticalityName}</td>
                            <td>{item.auditModeName}</td>
                            <td>{item.expectedStandard}</td>
                            <td>{item.referenceDocumentToBeChecked}</td>
                            <td>
                                <SELECT
                                    borderRadius={"5px"}
                                    bgColor={"#fff"}
                                    width={"100px"}
                                    height={"40px"}
                                    value={item.auditObservationMasterId}
                                    paddingLeft={"10px"}
                                    onChange={this.onChangeValue_Observation_New(index, item.scopeMaxScore, observation, item.sectionMasterId, item.criticalityMasterId)}
                                >
                                    <option key={"-1"} >Select Observation</option>
                                    {observation && observation.length > 0 && observation.map((obs, index) => {
                                        return <option selected={item.auditObservationMasterId === obs.id ? true : false} key={index} value={obs.id} >{obs.observationName}</option>
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
                                    value={item.actualScore ? item.actualScore : '0'}
                                    paddingLeft={"10px"} />

                            </td>
                            <td>
                                <Input
                                    borderRadius={"5px"}
                                    width={"50px"}
                                    height={"40px"}
                                    readOnly={true}
                                    value={item.maxScore ? item.maxScore : '0'}
                                    paddingLeft={"10px"} />
                            </td>
                            <td>
                                <textarea
                                    style={{ width: '100px', borderColor: item.isCommentRequired && (item.isCommentRequired === true || item.isCommentRequired === 1) ? 'red' : 'grey' }}
                                    onChange={this.onChangeValue_Comments(index)}
                                    defaultValue={item.observationRemarks ? item.observationRemarks : ''}
                                    disabled={(isSubmitted && isSubmitted === true) ? false : true}

                                    rows={5} ></textarea>
                            </td>
                            <td className="width120px">
                                <input 
                                    type="file" 
                                    name="file"
                                    className="input-type-file"
                                    style={{ width: '110px !important', maxWidth: '110px' }}
                                    multiple={true}
                                    disabled={(isSubmitted && isSubmitted === true) ? false : true}
                                    onChange={this.onChangeHandlerMultiNew(item.scopeMasterId, item.auditObservationMasterId)}
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
                                    return <a title={this.getFileNameFromPath(imageAddress)} href={imageAddress} target='_blank'>
                                        <img style={{ width: '20px', height: '20px', marginRight: '3px', border: '1px solid white' }} src="../../../static/downloadicon.png"></img>
                                    </a>
                                })}
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
    const { selfAuditScopeDetailActiontype, supportingDocs, observations, selfAuditScoreDetailActiontype, selfAuditScoreDetails, selfAuditScopeDetailRecordsCount, selfAuditScopeDetails } = state.workingReducer;
    const { auditObservations, scoringRules } = state.adminReducer;

    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { selfAuditScopeDetailActiontype, supportingDocs, observations, selfAuditScoreDetailActiontype, selfAuditScoreDetails, scoringRules, auditObservations, selfAuditScopeDetailRecordsCount, selfAuditScopeDetails, errorType, errorMessage };
};

//export default connect(mapStateToProps, { getSelfAudit_ScopeDetails, getSelfAudit_ScoreDetails, saveSelfAuditScoreDetails, getScoringRuleMasterData, getAuditObservationMasterData, hideError })(scopeDetails);

export default withRouter(connect(mapStateToProps, { getMediaDetailsbyAuditPlanDetailsId, getSelfAudit_ScopeDetails, getAuditObservationData, getSelfAudit_ScoreDetails, saveSelfAuditScoreDetails, getScoringRuleMasterData, getAuditObservationMasterData, hideError })(scopeDetails));