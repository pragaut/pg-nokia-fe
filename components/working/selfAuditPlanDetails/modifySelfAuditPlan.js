import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import * as CommonStyle from '../../commonStyle';
//import { cancelSelfAuditPlan, getSelfAuditPlanDetails } from '../../../actions/working.action';
import { getSectionMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import Input from '../../shared/InputBox';
import dynamic from 'next/dynamic';
import { constants } from '../../../utils/constants';
import moment from 'moment';
//import Select from 'react-select'; 
const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })


class cancellationSelfAuditPlan extends Wrapper {

    configs = [{
        name: 'id',
        type: 'string',
        required: true
    }, {
        name: 'auditFromDate',
        type: 'string',
        displayname: 'Audit From Date',
        required: true
    }, {
        name: 'auditToDate',
        type: 'string',
        displayname: 'Audit To Date',
        required: true
    }
    ];

    constructor(props) {
        super(props);
        this.sectionMasterIdRefs = React.createRef();
        this.state = {
            selfAuditPlan: props.baseObject ? props.baseObject : {},
            selectedSection: null,
        };
    };

    onValueChanged = key => event => {
        const existingSelfAuditPlan = Object.assign({}, this.state.selfAuditPlan);
        existingSelfAuditPlan[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (key === "auditFromDate") {
            existingSelfAuditPlan["auditToDate"] = null;
        }
        this.setState({ selfAuditPlan: existingSelfAuditPlan });
    };
    componentDidMount() {
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            let SelectedSection = this.state.selfAuditPlan && this.state.selfAuditPlan.multiSectionMasterId && this.state.selfAuditPlan.multiSectionMasterId;
            if (SelectedSection) {
                const MultiIds = this.ConvertStringToArrayReturn(SelectedSection);

                const SelectedsectionIds = MultiIds && MultiIds.map((item) => item);

                let Selected_SectionMaster = [];
                if (this.state.sections && SelectedsectionIds) {
                    SelectedsectionIds.forEach(item =>
                        Selected_SectionMaster = Selected_SectionMaster.concat(this.state.sections.filter(section => section.id === item))
                    );
                }
                this.setState({
                    selectedSection: Selected_SectionMaster //userSelectedRoles
                })
            }
        }, 300);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.sections && nextProps.sections != this.state.sections) {
            let SelectedSection = this.state.selfAuditPlan && this.state.selfAuditPlan.multiSectionMasterId && this.state.selfAuditPlan.multiSectionMasterId;
            if (SelectedSection) {
                const MultiIds = this.ConvertStringToArrayReturn(SelectedSection);

                const SelectedsectionIds = MultiIds && MultiIds.map((item) => item);

                let Selected_SectionMaster = [];
                if (nextProps.sections && SelectedsectionIds) {
                    SelectedsectionIds.forEach(item =>
                        Selected_SectionMaster = Selected_SectionMaster.concat(nextProps.sections.filter(section => section.id === item))
                    );
                }
                this.setState({
                    selectedSection: Selected_SectionMaster
                });
            }
            this.setState({
                sections: nextProps.sections
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
    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    ConvertStringToArrayReturn = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring;
    }
    InputTextBox = props => {
        return <CommonStyle.InputControlsDiv
            width={props.width ? props.width : "15%"}

        >
            <CommonStyle.InputLabel
                color={props.color ? props.color : "#000"}
            >
                {props.headerTitle}
            </CommonStyle.InputLabel>
            <CommonStyle.InputDiv>
                <Input
                    placeholderColor="#7c7c7c"
                    placeholder=""
                    value={props.SelectedValues}
                    paddingLeft="20px"
                    borderRadius="5px"
                    height="33px"
                    min={props.min ? props.min : undefined}
                    max={props.max ? props.max : undefined}
                    type={props.type ? props.type : 'text'}
                    color="#000"
                    borderColor="#000"
                    style={{ backgroundColor: "transparent" }}
                    //  onBlur={this.onValueChanged(props.KeyName)} 
                    onChange={this.onValueChanged(props.KeyName)}
                />
            </CommonStyle.InputDiv>
        </CommonStyle.InputControlsDiv>
    }

    onSectionSelect = (selectedList, selectedItem) => {
        const listItems = selectedList.map((item) => item.id);

        const multiSectionIds = this.returnIdsFunction(listItems);
        const existingSelfAuditPlan = Object.assign({}, this.state.selfAuditPlan);
        existingSelfAuditPlan["multiSectionMasterId"] = multiSectionIds;

        // this.setState({ selfAuditPlan: existingSelfAuditPlan });
        this.setState({
            selectedSectionIds: listItems,
            selfAuditPlan: existingSelfAuditPlan
        });
    };

    onSectionRemove = (selectedList, removedItem) => {
        const listItems = selectedList.map((item) => item.id);
        const multiSectionIds = this.returnIdsFunction(listItems);
        const existingSelfAuditPlan = Object.assign({}, this.state.selfAuditPlan);
        existingSelfAuditPlan["multiSectionMasterId"] = multiSectionIds;
        this.setState({
            selectedSectionIds: listItems,
            selfAuditPlan: existingSelfAuditPlan
        });
    };
    // returnConvertedFormat = (locale, date) => formatDate(date, 'dd MMM YYYY');
    render() {
        const { sections, selfAuditPlan } = this.state;

        console.log("selfAuditPlan", selfAuditPlan);
        const currentDate = moment(new Date()).format("YYYY-MM-DD");
        let startDate = selfAuditPlan && selfAuditPlan.startDate ? selfAuditPlan.startDate : new Date();
        let endDate = selfAuditPlan && selfAuditPlan.endDate ? selfAuditPlan.endDate : new Date();
        let ValidateStartDate = startDate < currentDate ? currentDate : startDate;
        let ValidateEndDate = endDate;// < currentDate ? currentDate : endDate;
        return (
            <div className={style.modal_dialog} style={{ overflow: 'visible', width: '80%', height: 'auto', width: '60vw' }}>
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper} style={{ overflow: 'visible' }}>
                        <div className={style.field_flex_new} style={{ width: '100%', color: "rgba(0,0,0,0.54)", fontSize: "13px", overflow: 'visible' }}>
                            <this.InputTextBox
                                headerTitle={'From Date'}
                                SelectedValues={this.state.selfAuditPlan.auditFromDate ? moment(new Date(this.state.selfAuditPlan.auditFromDate)).format("YYYY-MM-DD") : ''} //{this.state.selfAuditPlan.auditFromDate}
                                //  SelectedValues={new Date()} // { this.returnConvertedFormat(new Date(this.state.selfAuditPlan.auditFromDate),new Date(this.state.selfAuditPlan.auditFromDate))}
                                min={moment(new Date(ValidateStartDate)).format("YYYY-MM-DD")}
                                max={moment(new Date(ValidateEndDate)).format("YYYY-MM-DD")}
                                KeyName="auditFromDate"
                                type="date"
                                width="45%"
                                color="#000"
                            />
                            <CommonStyle.InputControlsDiv
                                width="45%"
                                padding="15px 10px 5px 5px"
                                style={{ overflowX: 'visible' }}
                            >
                                <span style={{ marginLeft: "8px" }}>Section</span>
                                <Multiselect
                                    options={sections} // Options to display in the dropdown
                                    selectedValues={this.state.selectedSection} // Preselected value to persist in dropdown
                                    onSelect={this.onSectionSelect} // Function will trigger on select event
                                    onRemove={this.onSectionRemove} // Function will trigger on remove event
                                    displayValue="sectionName" // Property name to display in the dropdown options                               
                                    ref={this.sectionMasterIdRefs}
                                    closeIcon={"cancel"}
                                    showCheckbox={true}
                                    placeholder={"Select Section"}
                                    closeOnSelect={false}
                                    style={{
                                        multiselectContainer: { // To change input field position or margin
                                            margin: '8px',
                                            fontSize: '12px',
                                            border: '1px solid #000000',
                                            borderRadius: '5px',
                                            color: '#000',
                                        },
                                        inputField: { // To change input field position or margin
                                            paddingLeft: '8px',
                                            fontSize: '12px',
                                            paddingTop: '2px',
                                            //border:'1px solid #000000'
                                        },
                                        border: '1px solid #000000',
                                    }}
                                />
                            </CommonStyle.InputControlsDiv>
                            <this.InputTextBox
                                headerTitle="To Date"
                                SelectedValues={this.state.selfAuditPlan.auditToDate ? moment(new Date(this.state.selfAuditPlan.auditToDate)).format("YYYY-MM-DD") : ''} //{this.state.selfAuditPlan.auditToDate}
                                KeyName="auditToDate"
                                min={this.state.selfAuditPlan.auditFromDate && moment(new Date(this.state.selfAuditPlan.auditFromDate)).format("YYYY-MM-DD")}
                                max={moment(new Date(ValidateEndDate)).format("YYYY-MM-DD")}
                                type="date"
                                width="45%"
                                color="#000"
                            />
                            <this.InputTextBox
                                headerTitle="Remarks"
                                SelectedValues={this.state.selfAuditPlan.auditPlanRemarks ? this.state.selfAuditPlan.auditPlanRemarks : ''} //{this.state.selfAuditPlan.auditPlanRemarks}
                                KeyName="auditPlanRemarks"
                                type="text"
                                color="#000"
                                width="45%"
                            />
                            
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.btn_submit} onClick={() => {
                        const validationText = validateInputsWithDisplayName(this.state.selfAuditPlan, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        let ModifiedSelfAuditDetails = "Modified Self Audit ";
                        this.props.onSave(this.state.selfAuditPlan, this.props.index);
                        // setTimeout(() => {
                        //     this.props.getSelfAuditPlanDetails();
                        // }, 100);
                    }}>Submit  </button>
                    <button className={style.btn_danger} onClick={() => {
                        this.props.onClose();
                    }}>Close  </button>
                </div>
            </div>
        );
    }
};

cancellationSelfAuditPlan.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;

    const { sections } = state.adminReducer;
    const errorMessage = state.errorReducer.error;
    return { errorType, sections, errorMessage };
}

export default connect(mapStateToProps, { getSectionMasterData })(cancellationSelfAuditPlan)