import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getSectionMasterData_ExcluseInoperativeRecord } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT,SpanLabelForDDl } from '../../formStyle';
//import Select from 'react-select'

class SubSectionAddEdit extends Wrapper {

    configs = [{
        name: 'subSectionName',
        type: 'string',
        required: true
    }, {
        name: 'subSectionCode',
        type: 'string',
        required: true
    }, {
        name: 'sectionMasterId',
        type: 'string',
        required: true
    },{
        name: 'subSectionOrder',
        type: 'number',
        required: true
    }];

    constructor(props) {
        super(props);

        this.moduleMasterIdRefs = React.createRef();

        this.state = {
            subSection: props.baseObject ? props.baseObject : {}
        };
    };

    onValueChanged = key => event => {
        const existingSubSection= Object.assign({}, this.state.subSection);
        existingSubSection[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ subSection: existingSubSection });
    };
    onTextChange = key => event => {
        const existingSubSection = Object.assign({}, this.state.section);
        existingSubSection[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ subSection: existingSubSection });
    };

    componentDidMount() {
        this.props.getSectionMasterData_ExcluseInoperativeRecord(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        console.log(" this.props.sections", this.props.sections)
        // console.log("roleCategory");
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
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Section</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.subSection.sectionMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('sectionMasterId')}
                            >
                                <option key="a0" value="" >--- Select Section ---</option>
                                
                                {this.props.sections &&
                                    this.props.sections.map((item, index) => {
                                     
                                        return <option key={index} value={item.id}>{item.sectionName}</option>
                                    })
                                }
                            </SELECT>
                            <Input label="Sub Section Name" type='text' defaultValue={this.state.subSection.subSectionName} onChange={this.onValueChanged('subSectionName')} />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <Input label="Sub Section Code" type='text' defaultValue={this.state.subSection.subSectionCode} onChange={this.onValueChanged('subSectionCode')} />                            
                            <Input label="Sub Section Order" type='number' defaultValue={this.state.subSection.subSectionOrder} onChange={this.onValueChanged('subSectionOrder')} />  
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        console.log(this.state.subSection);
                        const validationText = validateInputs(this.state.subSection, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }

                        //this.props.saveRoleMasterData(this.state.role, this.props.index);                       
                        setTimeout(() => {
                            this.props.onSave(this.state.subSection, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

SubSectionAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { sections } = state.adminReducer;
    return { sections };
} 
export default connect(mapStateToProps, { getSectionMasterData_ExcluseInoperativeRecord })(SubSectionAddEdit)