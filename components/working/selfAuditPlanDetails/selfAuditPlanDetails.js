import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import style from '../../../theme/app.scss';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getCompanyMaster, getYearTypeMasterData, getPlantMasterByGroupCompanyId, getPlantMaster } from '../../../actions/admin.action';
import { getSelfAuditPlanDetails, getSelfAuditPlanDetails_PlantAndCompanyMasterID, getSelfAuditPlanDetailsById, UpdateSelfAuditPlanDetails, deleteSelfAuditPlanDetails, initSelfAuditPlanDetails } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
//import SelfAuditPlanDetails from '../../masters/selfAuditPlans'
import { hideError, showError } from '../../../actions/error.actions';
import * as MasterType from '../../../action-types/admin.action.types';
import * as WorkingType from '../../../action-types/working.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';
import ListTable from '../../shared/ListTable';
import PlantList from './plant.select';
import CancellationSelfAuditPlan from './cancellationSelfAuditPlan';
import ModifySelfAuditDetails from './modifySelfAuditPlan';
import SelfAuditPlanDetails from './selfAuditPlanDetailsGrid';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import Select from 'react-select';
import moment from 'moment';
import { saveSelfAuditPlanId, saveSelfAuditMultiSectionID } from '../../../utils/session.helper';

const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })

class SelfAuditPlanningDetails extends Wrapper {
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
        this.companyMasterIdRefs = React.createRef();
        this.plantMasterIdRefs = React.createRef();
        this.ViewSummaryButton = this.onClickViewAuditSummaryDetails.bind(this);
        this.state = {
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            selfAuditPlans: [],
            selfAuditPlan: {},
            yearTypes: [],
            selfAuditPlanDetails: null,
            isCancelAuditSectionVisible: false,
            isModifiedSectionVisible: false,
            CancelSelfAuditPopup: false,
            years: [],
            companys: [],
            plants: [],
            auditStatus: [
                {
                    text: 'All',
                    value: null
                },
                {
                    text: 'Pending',
                    value: '0'
                },
                {
                    text: 'Executed',
                    value: '1'
                }
            ],
            showCancelPopup: false,
            selectedYearTypeMasterId: null,
            selectedCompany: null,
            stringSelectedCompanyMasterId: null,
            stringSelectedplantMasterId: null,
            selectedCompanyIds: [],
            selectedPlants: null,
            selectedPlantIds: [],
            openPopup: false,
            selectedyearTypes: [],
            selectedYearTypeId: [],
            FilterDetails: null,
            auditFlowMasterId: props.auditFlowMasterId ? props.auditFlowMasterId : '',
            processFlowMasterId: props.processFlowMasterId ? props.processFlowMasterId : '',
            processFlowName: props.processFlowName ? props.processFlowName : '',
            processFlowCode: props.processFlowCode ? props.processFlowCode : 'self-audit-planning',
        };

    };

    componentDidMount() {
        saveSelfAuditPlanId(undefined);
        saveSelfAuditMultiSectionID(undefined);
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getYearTypeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        // this.props.getSelfAuditPlanDetails(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSelfAuditPlanDetails_PlantAndCompanyMasterID(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined, undefined);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.companys && nextProps.companys != this.state.companys) {
            this.setState({
                companys: nextProps.companys
            });
        }
        if (nextProps.plants && nextProps.plants != this.state.plants) {
            this.setState({
                plants: nextProps.plants
            });
        }
        if (nextProps.yearTypes && nextProps.yearTypes != this.state.yearTypes) {
            this.setState({
                yearTypes: nextProps.yearTypes
            });
        }
        if (nextProps.processFlowCode && nextProps.processFlowCode !== this.state.processFlowCode) {
            this.setState({ processFlowCode: nextProps.processFlowCode });
        }
        if (nextProps.processFlowName && nextProps.processFlowName != this.state.processFlowName) {
            this.setState({
                processFlowName: nextProps.processFlowName
            });
        }
        if (nextProps && nextProps.auditFlowMasterId && nextProps.auditFlowMasterId != this.state.auditFlowMasterId) {
            this.setState({
                auditFlowMasterId: nextProps.auditFlowMasterId,
            })
        }
        if (nextProps && nextProps.processFlowMasterId && nextProps.processFlowMasterId != this.state.processFlowMasterId) {
            this.setState({
                processFlowMasterId: nextProps.processFlowMasterId,
            })
        }
        if (nextProps.selfAuditPlanActiontype && nextProps.selfAuditPlanActiontype === WorkingType.SELFAUDITPLANDETAILS_SAVE_SUCCESS && (this.state.isCancelAuditSectionVisible === true || this.state.isModifiedSectionVisible === true)) {
            setTimeout(() => {
                this.setState({
                    openPopup: false,
                    selfAuditPlanDetails: null,
                    isCancelAuditSectionVisible: false,
                    isModifiedSectionVisible: false
                });
                this.onSelfAuditCancelled();
            }, 2000);

        }
        setTimeout(() => {
            console.log("this.state.openPopup 2 : ", this.state.openPopup);
        }, 200);

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }

    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    onClickCancelSelfAudit = (id, selfAuditPlanDetails) => {
        this.setState({ isCancelAuditSectionVisible: true, isModifiedSectionVisible: false, selfAuditPlanDetails: selfAuditPlanDetails, selectedSelfAuditPlantDetailsId: id })
    }
    onClickModifySelfAudit = (id, selfAuditPlanDetails) => {
        this.setState({ isModifiedSectionVisible: true, isCancelAuditSectionVisible: false, selfAuditPlanDetails: selfAuditPlanDetails, selectedSelfAuditPlantDetailsId: id })
    }
    onClickCloseModel = () => {
        this.setState({ isModifiedSectionVisible: false, isCancelAuditSectionVisible: false, selfAuditPlanDetails: null, selectedSelfAuditPlantDetailsId: undefined })
    }
    onClickResetButton = async => {
        this.onClickCancelButton();
        this.setState({
            selectedCompany: [], selectedPlants: [],
            selectedyearTypes: {},
            selectedYearTypeId: '',
        });
        // this.companyMasterIdRefs.current.resetSelectedValues()  
    }
    onSelfAuditCancelled = () => {
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSelfAuditPlanDetails_PlantAndCompanyMasterID(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined, undefined, undefined);
    }
    onClickCancelButton = () => {
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSelfAuditPlanDetails_PlantAndCompanyMasterID(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined, undefined, undefined);
    }
    onClickCancelAudit = (isPopupOpen) => {
        console.log("Is popup opened : ", isPopupOpen);
        this.setState({
            openPopup: isPopupOpen
        });
    }
    onClickGoToRescheduleAudit = () => {
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
                query: {
                    tab: 'self-audit-reschedule',
                    id: 'dv-PG_krkc36z4krkc3al2',
                    pageName: 'Self Audit Reschedule',
                    auditFlowMasterId: 'ac7d34b0-crcvxcgdslsunita',
                },
                tab: 'self-audit-reschedule',
            },
            'corporateCoordinator/self-audit-reschedule'
        )
    }
    onClickGoToPlanAudit = () => {
        this.props.router.push(
            {
                pathname: 'corporateCoordinator',
                query: {
                    tab: 'self-audit-planning',
                    id: 'dv-PG_krkc36z4krkc3al2',
                    pageName: 'Self Audit Plan',
                    auditFlowMasterId: 'ac7d34b0-crcvxcgdslsunita',
                },
                tab: 'self-audit-planning',
            },
            'corporateCoordinator/self-audit-planning'
        )
    }

    onValueChangedCompany = selectedOption => {
        let selecteddata = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        if (!selecteddata) {
            selecteddata = ['pb'];
        }
        const strindata = this.returnIdsFunction(selecteddata);
        this.props.getSelfAuditPlanDetails_PlantAndCompanyMasterID(0, constants.ALL_ROWS_LIST, undefined, undefined, strindata, this.state.stringSelectedplantMasterId, strindata, this.state.FilterDetails);

        this.props.getPlantMasterByGroupCompanyId(selecteddata);
        this.setState({
            selectedCompany: selectedOption,
            selectedCompanyIds: selecteddata,
            stringSelectedCompanyMasterId: strindata,
            selectedPlants: [],
            selectedPlantsId: [],
            stringSelectedplantMasterId: null
        });
    };
    onValueChangedPlant = selectedOption => {
        let selectedPlant = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);

        const strindata = this.returnIdsFunction(selectedPlant);
        this.props.getSelfAuditPlanDetails_PlantAndCompanyMasterID(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.stringSelectedCompanyMasterId, strindata, this.state.FilterDetails);
        this.setState({
            selectedPlants: selectedOption,
            selectedPlantsId: selectedPlant,
            stringSelectedplantMasterId: strindata
        });
    };
    onValueChangedYearType = selectedOption => {
        let selecteddata = selectedOption && selectedOption.value;// > 0 && selectedOption.map((item) => item.value);

        let where = [];
        if (selecteddata) {
            where.push({ key: 'yearTypeMasterId', value: selecteddata })
        }
        else if (!selecteddata || selecteddata === '') {
            where.push({ key: 'yearTypeMasterId', value: 'na' })
        }
        let FilterDetails = {
            yearTypeMasterId: selecteddata
        }
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, where);
        this.props.getSelfAuditPlanDetails_PlantAndCompanyMasterID(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined, undefined, FilterDetails);

        this.setState({
            selectedCompany: [],
            selectedCompanyIds: [],
            selectedyearTypes: selectedOption,
            selectedYearTypeId: selecteddata,
            selectedPlants: [],
            selectedPlantsId: [],
            FilterDetails: FilterDetails
        });
    };
    onClickViewAuditSummaryDetails = (auditPlanDetailsId) => {
        saveSelfAuditPlanId(auditPlanDetailsId);
        setTimeout(() => {
            let processFlowMasterId = this.state.processFlowMasterId ? this.state.processFlowMasterId : '';
            let processFlowName = this.state.processFlowName ? this.state.processFlowName : '';
            let processFlowCode = this.state.processFlowCode ? this.state.processFlowCode : 'action-plan-update';
            let auditFlowMasterId = this.state.auditFlowMasterId ? this.state.auditFlowMasterId : '';

            this.props.router.push(
                {
                    pathName: '/corporateCoordinator',
                    tab: 'view-audit-complete-summary',
                    query: {
                        tab: 'view-audit-complete-summary',
                        //  id: auditPlanDetailsId,
                        auditPlanDetailsId: auditPlanDetailsId,
                        pageName: 'Audit Summary Details',
                        processFlowMasterId: processFlowMasterId,
                        processFlowName: processFlowName,
                        auditFlowMasterId: auditFlowMasterId,
                        processFlowCode: processFlowCode
                    }
                }, 'corporateCoordinator/view-audit-complete-summary'
            );
        }, 50);
    }
    render() {
        const { companys, plants, yearTypes, selectedyearTypes, openPopup, isModifiedSectionVisible, isCancelAuditSectionVisible, selfAuditPlanDetails } = this.state;
        // console.log("this.state.selectedCompany", this.state.selectedCompany);
        // console.log("this.companyMasterIdRefs",this.companyMasterIdRefs);
        const isOverlayVisible = (isModifiedSectionVisible === true || isCancelAuditSectionVisible === true) ? true : false;
        //this.onSelfAuditCancelled();
        const options = plants && plants.length > 0 ? plants.map((item, index) => {
            return { value: item.id, label: item.plantName }
        }) : [{ value: "-1", label: 'Select Plant' }];

        const Companyoption = companys && companys.length > 0 ? companys.map((item, index) => {
            return { value: item.id, label: item.companyName }
        }) : [{ value: "-1", label: 'Select Company' }];

        let nulloption = [{ value: '', label: 'select list' }]
        const yearTypeOption = yearTypes && yearTypes.length > 0 ? yearTypes.map((item, index) => {
            return { value: item.id, label: item.yearTypeName }
        }) : [];
        const finalYearTypeDDL = nulloption.concat(yearTypeOption);
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                textalign={"left"}
                flexdirection="column"
            >
                {(isModifiedSectionVisible === true || isCancelAuditSectionVisible === true) &&
                    <>
                        <CommonStyle.Overlay
                        // onClick={() => this.onClickCloseModel()} 
                        />
                        <CommonStyle.Wrapper_OnOverlay
                            width={isCancelAuditSectionVisible === true ? "50%" : "80%"}
                            height={"fit-content"}
                            visible={isOverlayVisible}
                        >
                            <CommonStyle.CloseButtonForModel
                                onClick={() => this.onClickCloseModel()}
                            >X</CommonStyle.CloseButtonForModel>
                            {isCancelAuditSectionVisible === true &&
                                <CancellationSelfAuditPlan
                                    baseObject={selfAuditPlanDetails}
                                    onClose={this.onClickCloseModel}
                                />
                            }
                            {isModifiedSectionVisible === true &&
                                <ModifySelfAuditDetails
                                    onSave={this.props.UpdateSelfAuditPlanDetails}
                                    onClose={this.onClickCloseModel}
                                    baseObject={selfAuditPlanDetails}
                                />
                            }
                        </CommonStyle.Wrapper_OnOverlay>
                    </>
                }
                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="20%"
                        padding="21px 10px 5px 5px"
                        style={{ zIndex: '5' }}
                    >
                        <span style={{ marginLeft: "8px" }}>Audit Cycle</span>
                        <Select
                            className="width100p"
                            value={selectedyearTypes ? selectedyearTypes : {}}
                            onChange={this.onValueChangedYearType}
                            options={finalYearTypeDDL}
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="20%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "5px" }}>Company</span>
                        <Select
                            className="width100p"
                            value={this.state.selectedCompany && this.state.selectedCompany}
                            onChange={this.onValueChangedCompany}
                            options={Companyoption}
                            closeMenuOnSelect={false}
                            isMulti={true}
                        />
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="20%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "5px" }}>Plant</span>
                        <Select
                            className="width100p"
                            value={this.state.selectedPlants && this.state.selectedPlants}
                            onChange={this.onValueChangedPlant}
                            options={options}
                            closeMenuOnSelect={false}
                            isMulti={true}
                        />
                    </CommonStyle.InputControlsDiv>
                    {/* <CommonStyle.InputControlsDiv
                        width="15%"
                        padding="21px 10px 5px 10px"
                    >
                        <span style={{ marginLeft: "8px" }}>Audit Status</span>
                        <SELECT margin="5px"
                            value={''} paddingLeft="8px" borderRadius="5px" height="35px"
                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                            style={{ backgroundColor: "transparent", border: "1px solid #cccccc" }}

                        >
                            {this.state.auditStatus &&
                                this.state.auditStatus.map((item, index) => {
                                    return <option key={index} value={item.value}>{item.text}</option>
                                })
                            }
                        </SELECT>
                    </CommonStyle.InputControlsDiv> */}
                    <CommonStyle.InputControlsDiv
                        width="5%"
                        padding="21px 2px 5px 2px"
                    >
                        <span style={{ marginLeft: "8px" }}> &nbsp;</span>
                        <Button
                            bgColor="#ad0000"
                            color="#ffffff"
                            height="35px"
                            borderRadius={"5px"}
                            width="100%"
                            bgChangeHover="#ffffff"
                            hoverColor="#ad0000"
                            border="solid 1px #ad0000"
                            style={{ marginTop: "3px", fontSize: "11px", }}
                            onClick={() => this.onClickResetButton()}
                        >
                            RESET
                        </Button>
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="8%"
                        padding="21px 2px 5px 2px"
                    >
                        <span style={{ marginLeft: "8px" }}> &nbsp;</span>
                        <Button
                            bgColor="teal"
                            color="#ffffff"
                            height="35px"
                            borderRadius={"5px"}
                            width="100%"
                            bgChangeHover="#ffffff"
                            hoverColor="teal"
                            border="solid 1px teal"
                            style={{ marginTop: "3px", fontSize: "10px", }}
                            onClick={() => this.onClickGoToRescheduleAudit()}
                        >
                            Reschedule
                        </Button>
                    </CommonStyle.InputControlsDiv>
                    <CommonStyle.InputControlsDiv
                        width="8%"
                        padding="21px 2px 5px 2px"
                    >
                        <span style={{ marginLeft: "8px" }}> &nbsp;</span>
                        <Button
                            bgColor="teal"
                            color="#ffffff"
                            height="35px"
                            borderRadius={"5px"}
                            width="100%"
                            bgChangeHover="#ffffff"
                            hoverColor="teal"
                            border="solid 1px teal"
                            style={{ marginTop: "3px", fontSize: "10px", }}
                            onClick={() => this.onClickGoToPlanAudit()}
                        >
                            Add New Plan
                        </Button>
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>
                <CommonStyle.FormDiv>
                    <CommonStyle.InputControlsDiv
                        width="100%"
                        padding="0px 0px 0px 0px"
                    >
                        <SelfAuditPlanDetails
                            Data={this.props.selfAuditPlans}
                            onClickCancelSelfAudit={this.onClickCancelSelfAudit}
                            onClickModifySelfAudit={this.onClickModifySelfAudit}
                            onClickViewAuditSummaryDetails={this.ViewSummaryButton}
                        />
                    </CommonStyle.InputControlsDiv>
                </CommonStyle.FormDiv>

                <CommonStyle.ButtonDiv>
                    {this.props.errorType === errorTypes.DISPLAY_ERROR &&
                        <div>
                            {this.props.errorMessage}
                            {this.hideError()}
                        </div>
                    }
                </CommonStyle.ButtonDiv>
                {/* <CommonStyle.DetailsList width="100%">
                    <SelfAuditPlanDetails
                        MasterName={MasterName}
                        ParentMasterName={ParentMasterName}
                        data={this.props.selfAuditPlansCategory}
                        EditSelfAuditPlanDetails={this.EditSelfAuditPlanDetails}
                        deleteSelfAuditPlanDetails={this.deleteSelfAuditPlanDetails}
                    />
                </CommonStyle.DetailsList> */}
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        )
    }
}

const mapStateToProps = state => {
    const { selfAuditPlan, selfAuditPlans, selfAuditPlanRecordsCount, selfAuditPlanActiontype } = state.workingReducer;
    const { plants, companys, yearTypes } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { companys, yearTypes, plants, selfAuditPlan, selfAuditPlanActiontype, selfAuditPlans, errorType, errorMessage, selfAuditPlanRecordsCount, selfAuditPlanActiontype };
};

//export default connect(mapStateToProps, { getCompanyMaster,getSelfAuditPlanDetails_PlantAndCompanyMasterID, getSelfAuditPlanDetailsById, getPlantMaster, UpdateSelfAuditPlanDetails, deleteSelfAuditPlanDetails, initSelfAuditPlanDetails, getSelfAuditPlanDetails, hideError })(SelfAuditPlanningDetails);
export default withRouter(connect(mapStateToProps, { getCompanyMaster, getYearTypeMasterData, getPlantMasterByGroupCompanyId, getSelfAuditPlanDetails_PlantAndCompanyMasterID, getSelfAuditPlanDetailsById, getPlantMaster, UpdateSelfAuditPlanDetails, deleteSelfAuditPlanDetails, initSelfAuditPlanDetails, getSelfAuditPlanDetails, hideError })(SelfAuditPlanningDetails));
