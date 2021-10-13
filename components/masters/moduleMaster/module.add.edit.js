import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getModuleMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT , SpanLabelForDDl} from '../../formStyle';
import config from '../../../config';
//import Select from 'react-select'
import * as sessionHelper from '../../../utils/session.helper';
import * as helper from '../../../helper';
class ModuleAddEdit extends Wrapper {

    configs = [{
        name: 'moduleName',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.alarmTypeMasterIdRefs = React.createRef();

        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            module: props.baseObject ? props.baseObject : {},
            alarms: [],
            loadershow: 'false',
            
        };
    };

    onValueChanged = key => event => {
        const existingModule = Object.assign({}, this.state.module);
        existingModule[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ module: existingModule });
    };
    onTextChange = key => event => {
        const existingModule = Object.assign({}, this.state.module);
        existingModule[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ module: existingModule });
    };

    componentDidMount() {
        const state = {};
        this.props.getModuleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.alarms !== null && nextProps.alarms !== undefined && nextProps.alarms !== this.state.alarms) {
            this.setState({
                alarms: nextProps.alarms
            })
        }
    }

    onFileChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                selectedFile: event.target.files[0]
            });
        }
    };

    handleLoad = (valuede) => {
        if (valuede === "1" || valuede === 1) {
            this.setState({ loadershow: 'true' })
        }
        else {
            this.setState({ loadershow: 'false' })
        }
    }
    
    render() {
         console.log("this.state.module",this.state.module);
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
                            <Input label="Module Name:" type='text' defaultValue={this.state.module.moduleName} onChange={this.onValueChanged('moduleName')} />
                            <Input label="Code:" type='text' defaultValue={this.state.module.moduleCode} onChange={this.onValueChanged('moduleCode')} />
                                
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                        <lable style={{ marginLeft: "8px" }}>Org Details</lable>
                            <SELECT margin="8px" ref={this.alarmTypeMasterIdRefs}
                                value={this.state.module.alarmTypeId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('alarmTypeId')}
                            >
                                 <option>Select Org Details</option>
                                {this.state.alarms &&
                                    this.state.alarms.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.alarmTypeName}</option>
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
                        console.log(this.state.module);
                        const validationText = validateInputs(this.state.module, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.module, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

ModuleAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { alarm,alarms  } = state.adminReducer;
    return { alarm,alarms   };
}
export default connect(mapStateToProps, { getModuleMasterData })(ModuleAddEdit)