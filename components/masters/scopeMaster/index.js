import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getScopeMasterData, getScopeMasterDataById, saveScopeMasterData, getAuditObservationMasterData, deleteScopeMasterData, initScopeMaster, getSectionMasterData, getSubSectionMasterData_BySectionID, getCriticalityMasterData } from '../../../actions/admin.action';
import { getMasterDetailsBymasterCategoryCode } from '../../../actions/masterDetails.actions';
import ScopeDetails from './scopeDetails';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import TextArea from '../../shared/textArea';
import { SELECT, SpanLabelForDDl } from '../../formStyle';
//import Select from 'react-select'
import Gap from '../../Gap';
import { Overlay, Wrapper_OnOverlay, MainDiv, Button_Warning_AddNewItem, Button_Success_AddNewItem } from '../../commonStyle';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { tr } from 'date-fns/locale';
import * as CommonStyle from '../../commonStyle';
import moment from 'moment';
import DatatableView from '../../ReactTableComponent';
import MultiSelectDDL from "react-multi-select-component";

const SPAN = styled.div` 
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 13px;
    font-family: Asap;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em; 
`;




class ScopeMasterAddEdit extends Wrapper {


    configs = [{
        name: 'subSectionMasterId',
        displayname: 'Sub Section',
        type: 'string',
        required: true
    },
    {
        name: 'criticalityMasterId',
        displayname: 'Criticality',
        type: 'string',
        required: true
    },
    {
        name: 'question',
        displayname: 'Question',
        type: 'string',
        required: true
    },
    {
        name: 'maxScore',
        displayname: 'Max Score',
        type: 'number',
        required: true
    }
    ];

    constructor(props) {
        super(props);


        this.multiselectRef = React.createRef();
        this.state = {
            isAddnewScopeScreenVisible: false,
            isScopeClosureModelVisible: false,
            scopeClosureType: 'closure',
            users: [],
            auditModes: [],
            showEditPopup: false,
            criticalitys: [],
            sections: [],
            filterparameter: {},
            auditObservations: [],
            auditTypeAuditorRelation: props.baseObject ? props.baseObject : {},
            subSections: [],
            scopes: [],
            selectedObservations: [],
            scope: {},
            observationDDL: [],
            scopeFilter: {},
            auditTypeAuditorRelationSelectedUsers: null,
            selectedUsers: [{}],
            options: [{}],
            columns: [
                {
                    Header: 'Action',
                    accessor: 'id',
                    minWidth: 100,
                    id: 'id',
                    show: true,
                    Cell: propss => (
                        <React.Fragment>
                            {(propss.original.isScopeClosed !== 1 && propss.original.isScopeClosed !== true) &&
                                <button className="warning width80px" value={propss.original.id} onClick={() => this.onclickEdit(propss.original)}>
                                    Edit
                                </button>
                            }
                            <br />
                            {(propss.original.isScopeClosed && (propss.original.isScopeClosed === 1 || propss.original.isScopeClosed === true)) ?
                                <button className="disabled width80px" value={propss.original.id} onClick={() =>
                                    //  props.onClickScopeClosureButton(propss.original,'re-open')
                                    alert("question already closed")
                                }>
                                    In-Active
                               </button>
                                :
                                <button className="danger width80px" value={propss.original.id} onClick={() => this.onClickScopeClosureButton(propss.original, 'closure')}>
                                    In-Active
                                </button>
                            }
                        </React.Fragment>
                    ),
                    sortable: false,
                    filterable: false
                },
                {
                    Header: 'Sr#',
                    minWidth: 50,
                    id: 'srnumber',
                    show: true,
                    Cell: row => (
                        <React.Fragment>
                            {row.index + 1}
                        </React.Fragment>
                    ),
                    sortable: true,
                    filterable: false
                },
                {
                    Header: 'Scope Id',
                    accessor: 'scopeNumber',
                    id: 'scopeNumber',
                    show: true,
                },
                {
                    Header: 'Section',
                    accessor: 'section.sectionName',
                    id: 'sectionName',
                    show: true,
                },
                {
                    Header: 'Section Order',
                    accessor: 'section.sectionOrder',
                    id: 'sectionOrder',
                    show: false,
                },
                {
                    Header: 'Sub Section',
                    accessor: 'subsection.subSectionName',
                    id: 'subSectionName',
                    show: true,
                },
                {
                    Header: 'Sub Section Order',
                    accessor: 'subsection.subSectionOrder',
                    id: 'subSectionOrder',
                    show: false,
                },
                {
                    Header: 'Criticality',
                    accessor: 'criticality.criticalityName',
                    id: 'criticalityName',
                    show: true,
                },
                {
                    Header: 'Audit Focus Mode',
                    accessor: 'auditMode.value',
                    id: 'auditModeName',
                    show: true,
                },
                {
                    Header: 'Question',
                    accessor: d => `${d.question}`,
                    id: 'question',
                    style: { 'white-space': "pre-wrap" },
                    minWidth: 400,
                    show: true
                }, {
                    Header: 'Expected Standard',
                    accessor: d => `${d.expectedStandard} `,// 'LeadEmail',
                    id: 'expectedStandard',
                    style: { 'white-space': "pre-wrap" },
                    minWidth: 500,
                    show: false
                }, {
                    Header: 'Reference Document To Be Checked',
                    accessor: 'referenceDocumentToBeChecked',
                    style: { 'white-space': "pre-wrap" },
                    minWidth: 500,
                    id: 'referenceDocumentToBeChecked',
                    show: false,
                }, {
                    Header: 'Audit Observation',
                    accessor: 'auditObservations',
                    style: { 'white-space': "pre-wrap" },
                    minWidth: 200,
                    id: 'auditObservations',
                    show: false,
                },
                {
                    Header: 'Max Score',
                    accessor: 'maxScore',
                    id: 'maxScore',
                    show: false
                }, {
                    Header: 'Scope Order',
                    accessor: 'scopeOrder',
                    id: 'scopeOrder',
                    show: false
                }, {
                    Header: 'Scope Closure Date',
                    accessor: 'scopeClosureDate',
                    id: 'scopeClosureDate',
                    show: false
                }, {
                    Header: 'Scope Closure Remarks',
                    accessor: 'scopeClosureRemarks',
                    id: 'scopeClosureRemarks',
                    show: false
                },
                {
                    Header: 'Scope Created On',
                    accessor: d => `${d && d.createdAt ? moment(new Date(d.createdAt)).format("DD-MMM-YYYY hh:mm") : ''} `,// 'LeadEmail',
                    id: 'createdAt',
                    minWidth: 130,
                    show: true
                },
            ]
        };
    };


    onValueChanged = key => event => {

        const existingScope = Object.assign({}, this.state.scope);
        let value = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingScope[key] = value;
        if (key === "sectionMasterId") {
            this.props.getSubSectionMasterData_BySectionID(0, constants.ALL_ROWS_LIST, undefined, undefined, value);
            existingScope["subSectionMasterId"] = '';
        }

        this.setState({ scope: existingScope });
    };
    onValueChangedDDL = key => event => {

        const existingScope = Object.assign({}, this.state.scope);
        let value = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingScope[key] = value;
        if (key === "sectionMasterId") {
            this.props.getSubSectionMasterData_BySectionID(0, constants.ALL_ROWS_LIST, undefined, undefined, value);
            existingScope["subSectionMasterId"] = '';
        }
        // this.props.getScopeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined, existingScope);

        this.setState({ scope: existingScope });
    };
    onValueChangedDDL_Filter = key => event => {

        const existingScope = Object.assign({}, this.state.scopeFilter);
        let value = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingScope[key] = value;
        if (key === "sectionMasterId") {
            this.props.getSubSectionMasterData_BySectionID(0, constants.ALL_ROWS_LIST, undefined, undefined, value);
            existingScope["subSectionMasterId"] = '';
        }
        this.props.getScopeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined, existingScope);

        this.setState({ scopeFilter: existingScope });
    };



    onclickAddItembutton = (value) => {
        this.setState({ isAddnewScopeScreenVisible: value, selectedObservations: [], })
    }

    componentDidMount() {
        this.props.getCriticalityMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined);
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSubSectionMasterData_BySectionID(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.scope.sectionMasterId);
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.ALL_ROWS_LIST, undefined, undefined, "Audit_Mode_Master");
        this.props.getScopeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.scopeFilter);
        this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);

    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.sections && nextProps.sections !== null && nextProps.sections !== undefined && nextProps.sections !== 'undefined' && nextProps.sections !== this.state.sections) {
            this.setState({
                sections: nextProps.sections
            })
        }
        if (nextProps.auditObservations && nextProps.auditObservations !== null && nextProps.auditObservations != this.state.auditObservations) {
            const options = nextProps.auditObservations && nextProps.auditObservations.length > 0 ? nextProps.auditObservations.map((item, index) => {
                return { value: item.id, label: item.observationName }
            }) : [];
            this.setState({ auditObservations: nextProps.auditObservations, observationDDL: options })
        }
        if (nextProps && nextProps.subSections && nextProps.subSections !== null && nextProps.subSections !== undefined && nextProps.subSections !== 'undefined' && nextProps.subSections !== this.state.subSections) {
            this.setState({
                subSections: nextProps.subSections
            })
        }
        if (nextProps && nextProps.criticalitys && nextProps.criticalitys !== null && nextProps.criticalitys !== undefined && nextProps.criticalitys !== 'undefined' && nextProps.criticalitys !== this.state.criticalitys) {
            this.setState({
                criticalitys: nextProps.criticalitys
            })
        }
        if (nextProps && nextProps.scopes && nextProps.scopes !== null && nextProps.scopes !== undefined && nextProps.scopes !== 'undefined' && nextProps.scopes !== this.state.scopes) {
            this.setState({
                scopes: nextProps.scopes
            })
        }
        if (nextProps.masterDetailsCategory !== null && nextProps.masterDetailsCategory !== undefined && nextProps.masterDetailsCategory !== this.state.auditModes) {
            this.setState({
                auditModes: nextProps.masterDetailsCategory
            })
        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;
            // this.ConvertStringToArrayRole(nextProps.userId);
            this.setState({ ...state });
        }
    }

    onValueChangedObservationOnPropsChange = selectedIds => {
        const auditObservations = this.state.auditObservations;
        let selectedAuditeeTeam = this.convertStringdataToArrayList(selectedIds);//selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        var data = [];
        auditObservations && auditObservations.length > 0 && auditObservations.forEach(element => {
            selectedAuditeeTeam && selectedAuditeeTeam.forEach(element2 => {
                if (element2 === element.id) {
                    data = data && data.length > 0 ? data.concat(element) : [element];// data.push(element);
                }
            });
        });
        const selectedOptions = data && data.length > 0 ? data.map((item, index) => {
            return { value: item.id, label: item.observationName }
        }) : [];
        this.setState({
            selectedObservations: selectedOptions
        });
    };

    onclickEdit = (items) => {
        console.log("items", items);
        if (items.sectionMasterId) {
            this.props.getSubSectionMasterData_BySectionID(0, constants.ALL_ROWS_LIST, undefined, undefined, items.sectionMasterId);
        }
        if (items.multiObservationMasterId && items.multiObservationMasterId !== null && items.multiObservationMasterId !== '') {
            this.onValueChangedObservationOnPropsChange(items.multiObservationMasterId);
        }
        setTimeout(() => {
            this.setState({
                scope: items,
                isAddnewScopeScreenVisible: true
            });
        }, 100);

    }
    onClickScopeClosureButton = (item, ctype) => {
        this.setState({
            scope: item,
            isScopeClosureModelVisible: true,
            scopeClosureType: ctype
        })
    }

    onclickCancelButton = () => {
        this.props.getScopeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.scopeFilter);
        const existingscope = Object.assign({}, this.state.scope);
        existingscope["sectionMasterId"] = '';
        existingscope["subSectionMasterId"] = '';
        existingscope["auditModeMasterId"] = '';
        existingscope["criticalityMasterId"] = '';
        existingscope["question"] = '';
        existingscope["expectedStandard"] = '';
        existingscope["referenceDocumentToBeChecked"] = '';
        existingscope["maxScore"] = '';
        existingscope["scopeClosureDate"] = undefined;
        existingscope["scopeClosureRemarks"] = '';
        existingscope["multiObservationMasterId"] = '';
        existingscope["isScopeClosed"] = false;
        existingscope["id"] = undefined;
        this.setState({ selectedObservations: [], scope: existingscope, isAddnewScopeScreenVisible: false, isScopeClosureModelVisible: false })
    }
    onclickResetButtonFilter = () => {
        this.props.getScopeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined, undefined);
        const existingscope = Object.assign({}, this.state.scopeFilter);
        existingscope["sectionMasterId"] = '';
        existingscope["subSectionMasterId"] = '';
        existingscope["auditModeMasterId"] = '';
        existingscope["criticalityMasterId"] = '';
        this.setState({ selectedObservations: [], scopeFilter: existingscope, isAddnewScopeScreenVisible: false, isScopeClosureModelVisible: false })
    }
    onclickDeleteButton = (id) => {
        this.props.deleteScopeMasterData(id);
        this.props.getScopeMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined, this.state.scopeFilter);
    }

    onClickReferesh = (async) => {
        this.props.getScoringRuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onClickCancel = () => {
        this.setState({ showEditPopup: false, selectedObservations: [] })
    }
    onValueObservation = selectedOption => {
        const listItems = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        const stringData = this.convertArrayListToStringData(listItems);
        const existinscope = Object.assign({}, this.state.scope);
        //   console.log("existinguser : ", existinguser)
        existinscope["multiObservationMasterId"] = stringData //this.roleMasterIdRefs.current.value;
        this.setState({
            scope: existinscope,
            selectedObservations: selectedOption
        });
    };

    filterOptions = (options, filter) => {
        if (!filter) {
            return options;
        }
        const re = new RegExp(filter, "i");
        return options.filter(({ value }) => value && value.match(re));
    };
    render() {

        const { sections, columns, selectedObservations, observationDDL, subSections, criticalitys, isAddnewScopeScreenVisible, scopeClosureType, auditModes, isScopeClosureModelVisible } = this.state;
        const sectionMasterForINDDL = sections && sections.length > 0 && sections.filter(item => item.isInOperativeRecord !== 1 && item.isInOperativeRecord !== true)
        const subSectionsForINDDL = subSections && subSections.length > 0 && subSections.filter(item => item.isInOperativeRecord !== 1 && item.isInOperativeRecord !== true)
        return (
            <div>
                {isScopeClosureModelVisible && isScopeClosureModelVisible === true &&
                    <>
                        <Overlay
                        //  onClick={() => this.onclickCancelButton()}
                        />
                        <Wrapper_OnOverlay
                            height={"auto"}
                            visible={isScopeClosureModelVisible}
                        >
                            <CommonStyle.CloseButtonForModel
                                onClick={() => this.onclickCancelButton()}
                            >X</CommonStyle.CloseButtonForModel>
                            <MainDiv
                                bgColor={"#fff"}
                                alignitems={"baseline"}
                                textalign={"left"}
                                flexdirection="column">
                                {scopeClosureType && scopeClosureType === "re-open" ?
                                    <div className={style.modal_dialog} style={{ width: '85%', overflow: 'visible' }}>
                                        <Input label="Scope Start Date:" type='date' value={this.state.scope.scopeStartDate} onChange={this.onValueChanged('scopeStartDate')} />
                                        <Gap h="10px" />
                                        <Input label="Re-Open Remarks:" type='text' value={this.state.scope.scopeClosureRemarks} onChange={this.onValueChanged('scopeClosureRemarks')} />
                                        <Gap h="20px" />
                                        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around', margin: '10px 0px' }}>
                                            <button style={{ width: '40%' }} className={style.primary_btn} onClick={() => {
                                                const validationText = validateInputsWithDisplayName(this.state.scope, this.configs);
                                                if (validationText) {
                                                    return alert(validationText);
                                                }
                                                else {
                                                    const existingScope = Object.assign({}, this.state.scope);
                                                    existingScope["isScopeClosed"] = false;
                                                    existingScope["scopeClosureDate"] = null;
                                                    this.setState({ scope: existingScope });
                                                    setTimeout(() => {
                                                        this.props.saveScopeMasterData(this.state.scope, this.props.index);
                                                        setTimeout(() => {
                                                            this.onclickCancelButton();
                                                        }, 500);
                                                    }, 100);
                                                }
                                            }}>save</button>
                                            <button style={{ width: '40%' }} className={style.btn_danger} onClick={() => this.onclickCancelButton()}>cancel</button>
                                        </div>
                                    </div>
                                    :
                                    <div className={style.modal_dialog} style={{ width: '85%', overflow: 'visible' }}>
                                        <Input label="Scope Close Date:" type='date' min={moment(new Date()).format("YYYY-MM-DD")} value={this.state.scope.scopeClosureDate} onChange={this.onValueChanged('scopeClosureDate')} />
                                        <Gap h="10px" />
                                        <Input label="Closure Remarks:" type='text' value={this.state.scope.scopeClosureRemarks} onChange={this.onValueChanged('scopeClosureRemarks')} />
                                        <Gap h="20px" />
                                        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around', margin: '10px 0px' }}>
                                            <button style={{ width: '40%' }} className={style.primary_btn} onClick={() => {
                                                const validationText = validateInputsWithDisplayName(this.state.scope, this.configs);
                                                if (validationText) {
                                                    return alert(validationText);
                                                }
                                                else {
                                                    const existingScope = Object.assign({}, this.state.scope);
                                                    existingScope["isScopeClosed"] = true;
                                                    this.setState({ scope: existingScope });
                                                    setTimeout(() => {
                                                        this.props.saveScopeMasterData(this.state.scope, this.props.index);
                                                        setTimeout(() => {
                                                            this.onclickCancelButton();
                                                        }, 500);
                                                    }, 100);
                                                }
                                            }}>save</button>
                                            <button style={{ width: '40%' }} className={style.btn_danger} onClick={() => this.onclickCancelButton()}>cancel</button>
                                        </div>
                                    </div>
                                }

                            </MainDiv>
                        </Wrapper_OnOverlay>
                    </>
                }
                <div className={style.modal_dialog} style={{ width: '100%', maxHeight: '120vh', overflow: 'visible', padding: '0px' }}>
                    {/* {isAddnewScopeScreenVisible === true ?
                        <Button_Warning_AddNewItem onClick={() => this.onclickAddItembutton(false)} className="button-success">Close Section</Button_Warning_AddNewItem>
                        :
                        <Button_Success_AddNewItem onClick={() => this.onclickAddItembutton(true)} className="button-warning" > Add New Scope</Button_Success_AddNewItem>
                    }
                    <br></br>
                    <br></br> */}
                    {isAddnewScopeScreenVisible === true ?
                        <div>
                            <CommonStyle.Overlay
                            // onClick={() => this.onclickAddItembutton(false)}
                            />
                            <CommonStyle.Wrapper_OnOverlay
                                width={"80%"}
                                height={"fit-content"}
                                visible={isAddnewScopeScreenVisible}
                            >
                                <CommonStyle.CloseButtonForModel
                                    onClick={() => this.onclickAddItembutton(false)}
                                >X</CommonStyle.CloseButtonForModel>
                                <div className={style.field_flex_wrapper} style={{ padding: '10px' }}>
                                    <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                        <SpanLabelForDDl >Section</SpanLabelForDDl>
                                        <SELECT margin="8px"
                                            value={this.state.scope.sectionMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                            onChange={this.onValueChangedDDL('sectionMasterId')}
                                        >
                                            <option key="a0" value="" >Select Section </option>
                                            {sectionMasterForINDDL &&
                                                sectionMasterForINDDL.map((item, index) => {
                                                    return <option key={index} value={item.id}>{item.sectionName}</option>
                                                })
                                            }
                                        </SELECT>
                                        <SpanLabelForDDl >Sub Section</SpanLabelForDDl>
                                        <SELECT margin="8px"
                                            value={this.state.scope.subSectionMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                            onChange={this.onValueChangedDDL('subSectionMasterId')}
                                        >
                                            <option key="a0" value="" >Select Sub Section </option>
                                            {subSectionsForINDDL &&
                                                subSectionsForINDDL.map((item, index) => {
                                                    return <option key={index} value={item.id}>{item.subSectionName}</option>
                                                })
                                            }
                                        </SELECT>
                                        <SpanLabelForDDl >Criticality</SpanLabelForDDl>
                                        <SELECT margin="8px"
                                            value={this.state.scope.criticalityMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                            onChange={this.onValueChangedDDL('criticalityMasterId')}
                                        >
                                            <option key="a0" value="" >Select Criticality </option>
                                            {this.state.criticalitys &&
                                                this.state.criticalitys.map((item, index) => {
                                                    return <option key={index} value={item.id}>{item.criticalityName}</option>
                                                })
                                            }
                                        </SELECT>
                                        <SpanLabelForDDl >Audit Mode</SpanLabelForDDl>
                                        <SELECT margin="8px"
                                            value={this.state.scope.auditModeMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                            onChange={this.onValueChangedDDL('auditModeMasterId')}
                                        >
                                            <option key="a0" value="" >Select Audit Mode </option>
                                            {this.state.auditModes &&
                                                this.state.auditModes.map((item, index) => {
                                                    return <option key={index} value={item.id}>{item.value}</option>
                                                })
                                            }
                                        </SELECT>
                                        <Input label="order:" type='text' value={this.state.scope.scopeOrder} onChange={this.onValueChanged('scopeOrder')} />
                                    </div>
                                    <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                        <SpanLabelForDDl >Observation</SpanLabelForDDl>
                                        <div style={{ width: '100%', padding: '0px 10px' }}>
                                            <MultiSelectDDL
                                                className="width100p"
                                                value={selectedObservations && selectedObservations.length > 0 ? selectedObservations : []}
                                                onChange={this.onValueObservation}
                                                options={observationDDL}
                                                hasSelectAll={false}
                                                labelledBy="Select"
                                                filterOptions={this.filterOptions()}
                                            />
                                        </div>
                                        <TextArea label="Question:" type='text' value={this.state.scope.question} onChange={this.onValueChanged('question')} />
                                        <TextArea label="expected Standard:" type='text' value={this.state.scope.expectedStandard} onChange={this.onValueChanged('expectedStandard')} />
                                        <TextArea label="Reference Document To Be Checked:" type='text' value={this.state.scope.referenceDocumentToBeChecked} onChange={this.onValueChanged('referenceDocumentToBeChecked')} />
                                        <Input label="Max Score:" type='text' value={this.state.scope.maxScore} onChange={this.onValueChanged('maxScore')} />

                                    </div>
                                </div>
                                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 20px' }}>
                                    <button className={style.primary_btn} onClick={() => {
                                        const validationText = validateInputsWithDisplayName(this.state.scope, this.configs);
                                        if (validationText) {
                                            return alert(validationText);
                                        }
                                        else {
                                            this.props.saveScopeMasterData(this.state.scope, this.props.index);
                                            setTimeout(() => {
                                                this.onclickCancelButton();
                                            }, 500);

                                        }
                                    }}>save</button>
                                    <button className={style.btn_danger} onClick={() => this.onclickCancelButton()}>cancel</button>
                                </div>
                            </CommonStyle.Wrapper_OnOverlay>

                        </div>
                        :
                        <div>
                            <div className={style.field_flex_wrapper}>
                                <div className={style.field_flex_new} style={{ width: '5%', paddingTop: '25px' }}>

                                    <CommonStyle.Button_Header
                                        onClick={() => this.onclickAddItembutton(true)}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </CommonStyle.Button_Header>
                                </div>
                                <div className={style.field_flex_new} style={{ width: '20%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <SpanLabelForDDl>Section</SpanLabelForDDl>
                                    <SELECT margin="8px"
                                        value={this.state.scopeFilter.sectionMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.onValueChangedDDL_Filter('sectionMasterId')}
                                    >
                                        <option key="a0" value="" >Select Section </option>
                                        {this.state.sections &&
                                            this.state.sections.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.sectionName}</option>
                                            })
                                        }
                                    </SELECT>
                                </div>
                                <div className={style.field_flex_new} style={{ width: '20%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <SpanLabelForDDl>Sub Section</SpanLabelForDDl>
                                    <SELECT margin="8px"
                                        value={this.state.scopeFilter.subSectionMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.onValueChangedDDL_Filter('subSectionMasterId')}
                                    >
                                        <option key="a0" value="" >Select Sub Section </option>
                                        {this.state.subSections &&
                                            this.state.subSections.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.subSectionName}</option>
                                            })
                                        }
                                    </SELECT>
                                </div>
                                <div className={style.field_flex_new} style={{ width: '20%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>

                                    <SpanLabelForDDl>Criticality</SpanLabelForDDl>
                                    <SELECT margin="8px"
                                        value={this.state.scopeFilter.criticalityMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.onValueChangedDDL_Filter('criticalityMasterId')}
                                    >
                                        <option key="a0" value="" >Select Criticality </option>
                                        {this.state.criticalitys &&
                                            this.state.criticalitys.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.criticalityName}</option>
                                            })
                                        }
                                    </SELECT>
                                </div>
                                <div className={style.field_flex_new} style={{ width: '20%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <SpanLabelForDDl>Audit Mode</SpanLabelForDDl>
                                    <SELECT margin="8px"
                                        value={this.state.scopeFilter.auditModeMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.onValueChangedDDL_Filter('auditModeMasterId')}
                                    >
                                        <option key="a0" value="" >Select Audit Mode </option>
                                        {this.state.auditModes &&
                                            this.state.auditModes.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.value}</option>
                                            })
                                        }
                                    </SELECT>
                                </div>
                                <div className={style.field_flex_new} style={{ width: '20%', paddingTop: '22px', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                                    <button className={style.btn_danger} onClick={() => this.onclickResetButtonFilter()}>Reset</button>
                                </div>
                            </div>
                        </div>
                    }
                    {/* {isAddnewScopeScreenVisible === true &&
                        <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                            <button className={style.primary_btn} onClick={() => {
                                const validationText = validateInputsWithDisplayName(this.state.scope, this.configs);
                                if (validationText) {
                                    return alert(validationText);
                                }
                                else {
                                    this.props.saveScopeMasterData(this.state.scope, this.props.index);
                                    setTimeout(() => {
                                        this.onclickCancelButton();
                                    }, 500);

                                }

                            }}>save</button>
                            <button className={style.btn_danger} onClick={() => this.onclickCancelButton()}>cancel</button>
                        </div>
                    } */}
                    <div
                        style={{ width: '98%' }}
                    >
                        <DatatableView
                            isScorllApplicable={true}
                            Data={this.state.scopes}
                            isColumnUpdate={true}
                            updateColumn={this.updateColumn}
                            columns={columns}
                        />
                    </div>
                    <Gap h="2em" />
                    {/* <ScopeDetails
                        Data={this.state.scopes}
                        onclickEdit={this.onclickEdit}
                        onClickScopeClosureButton={this.onClickScopeClosureButton}
                    /> */}
                </div>
            </div>
        );

    }
};
const mapStateToProps = state => {
    const { scope, scopes, auditObservations, scopeActiontype, scopeRecordsCount, sections, subSections, criticalitys } = state.adminReducer;
    //   const { masterDetail, masterDetails } = state.masterDetailReducer;
    const { masterDetailCategory, masterDetailsCategory } = state.masterDetailByCategoryReducer;
    return { masterDetailsCategory, auditObservations, masterDetailCategory, scope, scopes, scopeActiontype, scopeRecordsCount, sections, subSections, criticalitys };
}
export default connect(mapStateToProps, { getScopeMasterData, getScopeMasterDataById, getAuditObservationMasterData, saveScopeMasterData, deleteScopeMasterData, initScopeMaster, getSectionMasterData, getSubSectionMasterData_BySectionID, getCriticalityMasterData, getMasterDetailsBymasterCategoryCode })(ScopeMasterAddEdit)