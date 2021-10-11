import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getAuditTypeMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT , SpanLabelForDDl} from '../../formStyle';
//import Select from 'react-select'

class SectionAddEdit extends Wrapper {

    configs = [{
        name: 'sectionName',
        type: 'string',
        required: true
    }, {
        name: 'sectionCode',
        type: 'string',
        required: true
    }, {
        name: 'auditTypeId',
        type: 'string',
        required: true
    }, {
        name: 'sectionOrder',
        type: 'number',
        required: false
    }];

    constructor(props) {
        super(props);

        this.moduleMasterIdRefs = React.createRef();

        this.state = {
            section: props.baseObject ? props.baseObject : {},
            auditTypes:[],
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
        const existingSection = Object.assign({}, this.state.section);
        existingSection[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ section: existingSection });
    };
    onTextChange = key => event => {
        const existingSection = Object.assign({}, this.state.section);
        existingSection[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ section: existingSection });
    };

    componentDidMount() {
        this.props.getAuditTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auditTypes && nextProps.auditTypes !== null && nextProps.auditTypes != this.state.auditTypes) {
            this.setState({ auditTypes: nextProps.auditTypes })
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
         console.log("this.state.section",this.state.section);
        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="Role Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl  >Audit Type</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.section.auditTypeId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('auditTypeId')}
                            >
                                <option key="a0" value="" >Select Audit Type </option>
                                {this.state.auditTypes && this.state.auditTypes.length > 0 &&
                                    this.state.auditTypes.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.auditType}</option>
                                    })
                                }
                            </SELECT>
                            <Input label="Name:" type='text' defaultValue={this.state.section.sectionName} onChange={this.onValueChanged('sectionName')} />
                            <Input label="Order:" type='number' defaultValue={this.state.section.sectionOrder} onChange={this.onValueChanged('sectionOrder')} />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <Input label=" Code:" type='text' defaultValue={this.state.section.sectionCode} onChange={this.onValueChanged('sectionCode')} />

                            <SpanLabelForDDl >Is Mandatory Section</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.section.isMandatorySection} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isMandatorySection')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <Input label="Bar Color:" type='color' defaultValue={this.state.section.barColor} onChange={this.onValueChanged('barColor')} />

                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        console.log(this.state.section);
                        const validationText = validateInputs(this.state.section, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }

                        //this.props.saveRoleMasterData(this.state.role, this.props.index);
                        if (!this.state.section.isMandatorySection || this.state.section.isMandatorySection === null) {
                            // console.log("this.moduleMasterIdRefs.current", this.moduleMasterIdRefs.current.value);

                            const existingsection = Object.assign({}, this.state.section);
                            existingsection["isMandatorySection"] = '0';
                            this.setState({ section: existingsection });
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.section, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

SectionAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { auditTypes } = state.adminReducer;
    return { auditTypes };
}
export default connect(mapStateToProps, { getAuditTypeMasterData })(SectionAddEdit)