import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getSectionMasterData,getSectionMasterData_ExcluseInoperativeRecord, getAuditObservationMasterData_ExcludeInoperativeRecords, getCriticalityMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT,SpanLabelForDDl } from '../../formStyle';
//import Select from 'react-select'

class ScoringRuleAddEdit extends Wrapper {

    configs = [{
        name: 'sectionMasterid',
        type: 'string',
        required: true
    }, {
        name: 'criticalityMasterId',
        type: 'string',
        required: true
    }, {
        name: 'observationMasterId', 
        type: 'string',
        required: true
    }, {
        name: 'highestScore',
        type: 'string',
        required: true
    }, {
        name: 'actualScore',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.moduleMasterIdRefs = React.createRef();

        this.state = {
            scoringRule: props.baseObject ? props.baseObject : {},
            sections: [],
            criticalitys: [],
            auditObservations: [],
            ddlData: [
                {
                    text: 'No',
                    id: 0,
                    selected: true,
                    lable: 'No',
                    value: false,
                    key: 'isSuperAdmin',
                },
                {
                    text: 'Yes',
                    id: true,
                    selected: false,
                    lable: 'Yes',
                    value: true,
                    key: 'isSuperAdmin'
                }
            ]
        };
    };

    onValueChanged = key => event => {
        if (key && key === 'actualScore') {
            const ActualValue = event && event.target.value;
            const HighetScore = this.state.scoringRule && this.state.scoringRule.highestScore;
            if (ActualValue > HighetScore && HighetScore !==null && HighetScore !=='') {
                alert("OOPS : Actual score is not greater than highest score !")               
                event.target.value = null;
            }
            else {
                const existingScoringRule = Object.assign({}, this.state.scoringRule);
                existingScoringRule[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

                this.setState({ scoringRule: existingScoringRule });
            }
        }
        else if (key && key === 'highestScore') {
            const HighetScore = event && event.target.value;
            const ActualValue = this.state.scoringRule && this.state.scoringRule.actualScore;
            if (ActualValue > HighetScore && HighetScore !==null && HighetScore !=='')  {
                alert("OOPS : Actual score is not greater than highest score !")
                event.target.value = null;
            }
            else {
                const existingScoringRule = Object.assign({}, this.state.scoringRule);
                existingScoringRule[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

                this.setState({ scoringRule: existingScoringRule });
            }
        }
        else
        {
            const existingScoringRule = Object.assign({}, this.state.scoringRule);
            existingScoringRule[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

            this.setState({ scoringRule: existingScoringRule });
        }

    };
    onTextChange = key => event => {
        const existingScoringRule = Object.assign({}, this.state.scoringRule);
        existingScoringRule[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ scoringRule: existingScoringRule });
    };

    componentDidMount() {
        this.props.getSectionMasterData_ExcluseInoperativeRecord(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getAuditObservationMasterData_ExcludeInoperativeRecords(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getCriticalityMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.sections && nextProps.sections !== null && nextProps.sections !== 'undefined' && nextProps.sections !== this.state.sections) {
            this.setState({ sections: nextProps.sections });
        }
        if (nextProps && nextProps.criticalitys && nextProps.criticalitys !== null && nextProps.criticalitys !== 'undefined' && nextProps.criticalitys !== this.state.criticalitys) {
            this.setState({ criticalitys: nextProps.criticalitys });
        }
        if (nextProps && nextProps.auditObservations && nextProps.auditObservations !== null && nextProps.auditObservations !== 'undefined' && nextProps.auditObservations !== this.state.auditObservations) {
            this.setState({ auditObservations: nextProps.auditObservations });
        }
        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };

    render() {
        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>

                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl >Section</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.scoringRule.sectionMasterid} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('sectionMasterid')}
                            >
                                <option key="a0" value="" >---Select Section--- </option>
                                {this.state.sections &&
                                    this.state.sections.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.sectionName}</option>
                                    })
                                }
                            </SELECT>

                            <SpanLabelForDDl >Criticality</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.scoringRule.criticalityMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('criticalityMasterId')}
                            >
                                <option key="a0" value="" >---Select criticality--- </option>
                                {this.state.criticalitys &&
                                    this.state.criticalitys.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.criticalityName}</option>
                                    })
                                }
                            </SELECT>

                            <SpanLabelForDDl >Audit Observation</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.scoringRule.observationMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('observationMasterId')}
                            >
                                <option key="a0" value="" >---Select Audit Observation--- </option>
                                {this.state.auditObservations &&
                                    this.state.auditObservations.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.observationName}</option>
                                    })
                                }
                            </SELECT>
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <Input label="Highest Score:" type='number' defaultValue={this.state.scoringRule.highestScore} onChange={this.onValueChanged('highestScore')} />
                            <Input label="Actual Score:" type='number' defaultValue={this.state.scoringRule.actualScore} onChange={this.onValueChanged('actualScore')} />

                            <SpanLabelForDDl>Is Highest Score Applicable</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.scoringRule.isHighestScoreApplicable} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isHighestScoreApplicable')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        console.log("this.state.scoringRule", this.state.scoringRule);
                        const validationText = validateInputs(this.state.scoringRule, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }

                        setTimeout(() => {
                            this.props.onSave(this.state.scoringRule, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

ScoringRuleAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { sections, criticalitys, auditObservations } = state.adminReducer;
    return { sections, criticalitys, auditObservations };
}
export default connect(mapStateToProps, { getSectionMasterData_ExcluseInoperativeRecord, getAuditObservationMasterData_ExcludeInoperativeRecords, getCriticalityMasterData, })(ScoringRuleAddEdit)