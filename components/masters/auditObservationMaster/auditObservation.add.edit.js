import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getAuditObservationMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT, SpanLabelForDDl } from '../../formStyle';
//import Select from 'react-select'

class AuditObservationAddEdit extends Wrapper {

    configs = [{
        name: 'observationName',
        type: 'string',
        required: true
    }, {
        name: 'observationCode',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.state = {
            auditObservation: props.baseObject ? props.baseObject : {},
            ddlData: [
                {
                    text: 'No',
                    id: 0,
                    selected: true,
                    lable: 'No',
                    value: false,
                    key: 'YesNo_DDl',
                },
                {
                    text: 'Yes',
                    id: 1,
                    selected: false,
                    lable: 'Yes',
                    value: true,
                    key: 'YesNo_DDl'
                }
            ]
        };
    };

    onValueChanged = key => event => {
        const existingAuditObservation = Object.assign({}, this.state.auditObservation);
        existingAuditObservation[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ auditObservation: existingAuditObservation });
    };
    onTextChange = key => event => {
        const existingAuditObservation = Object.assign({}, this.state.auditObservation);
        existingAuditObservation[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ auditObservation: existingAuditObservation });
    };
    onChangeIsScoreApplicable = key => event => {

        const existingAuditObservation = Object.assign({}, this.state.auditObservation);
        const value = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        let notApplicableValue = 'true';
        if (value === true) {
            notApplicableValue = 'false';
        }
        else {
            notApplicableValue = 'true';
        }
        existingAuditObservation[key] = value;
        existingAuditObservation["isScoreNotApplicable"] = notApplicableValue;
        this.setState({ auditObservation: existingAuditObservation });
    };

    componentDidMount() {
        // const auditObservation = this.state.auditObservation;
        // let isScoreNotApplicable = undefined;
        // console.log("auditObservation", auditObservation);
        // if (auditObservation && (auditObservation.isScoreNotApplicable === 1 || auditObservation.isScoreNotApplicable === true)) {
        //     isScoreNotApplicable = false;
        // }
        // else if (auditObservation && (auditObservation.isScoreNotApplicable === 0 || auditObservation.isScoreNotApplicable === false || auditObservation.isScoreNotApplicable === null)) {
        //     isScoreNotApplicable = true;
        // }
        // const existingAuditObservation = Object.assign({}, this.state.auditObservation);
        // existingAuditObservation["isScoreNotApplicable"] = isScoreNotApplicable;
        // this.setState({ auditObservation: existingAuditObservation });
        // this.props.getAuditObservationMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };

    render() {

        const { auditObservation } = this.state;

        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <Input label="Observation Name:" type='text' defaultValue={this.state.auditObservation.observationName} onChange={this.onValueChanged('observationName')} />
                            <Input label=" Code:" type='text' defaultValue={this.state.auditObservation.observationCode} onChange={this.onValueChanged('observationCode')} />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl>Is Highest Score Applicable</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.auditObservation.isHighestScoreApplicable} paddingLeft="20px" borderRadius="14px" height="51px"
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
                            <SpanLabelForDDl>Is Score Applicable</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.auditObservation.isScoreApplicable} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onChangeIsScoreApplicable('isScoreApplicable')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl>Is Action Plan Required</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.auditObservation.isActionPlanRequired} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isActionPlanRequired')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl>Comment Required</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.auditObservation.isCommentRequired} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isCommentRequired')}
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
                        console.log(this.state.auditObservation);
                        const validationText = validateInputs(this.state.auditObservation, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        if (!this.state.auditObservation.isActionPlanRequired || this.state.auditObservation.isActionPlanRequired === null || this.state.auditObservation.isActionPlanRequired === 'undefined') {
                            const existingAuditObservation = Object.assign({}, this.state.auditObservation);
                            existingAuditObservation["isActionPlanRequired"] = false;
                            this.setState({ auditObservation: existingAuditObservation });
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.auditObservation, this.props.index);
                        }, 100);
                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

AuditObservationAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { auditTypes } = state.adminReducer;
    return { auditTypes };
}
export default connect(mapStateToProps, { getAuditObservationMasterData })(AuditObservationAddEdit)