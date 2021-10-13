import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getAlarmTypeMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT , SpanLabelForDDl} from '../../formStyle';
import config from '../../../config';
//import Select from 'react-select'
import * as sessionHelper from '../../../utils/session.helper';
import * as helper from '../../../helper';
class AlarmTypeAddEdit extends Wrapper {

    configs = [{
        name: 'alarmTypeName',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            alarm: props.baseObject ? props.baseObject : {},
            loadershow: 'false',
        };
    };

    onValueChanged = key => event => {
        const existingAlarm = Object.assign({}, this.state.alarm);
        existingAlarm[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ alarm: existingAlarm });
    };
    onTextChange = key => event => {
        const existingAlarm = Object.assign({}, this.state.alarm);
        existingAlarm[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ alarm: existingAlarm });
    };

    componentDidMount() {
        this.props.getAlarmTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
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
         console.log("this.state.alarm",this.state.alarm);
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
                            <Input label="Alarm Type:" type='text' defaultValue={this.state.alarm.alarmTypeName} onChange={this.onValueChanged('alarmTypeName')} />
                            <Input label="Code:" type='text' defaultValue={this.state.alarm.alarmTypeCode} onChange={this.onValueChanged('alarmTypeCode')} />
                            <Input label="Order:" type='number' defaultValue={this.state.alarm.alarmTypeOrder} onChange={this.onValueChanged('alarmTypeOrder')} />
                            
                            {/* <Input
                                focusbordercolor={'#f90707'}
                                label={'Media'}
                                type='file'
                                onChange={this.onMediaChange('media')}
                            />        */}
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <Input label="Color Code:" type='color' defaultValue={this.state.alarm.colorCode} onChange={this.onValueChanged('colorCode')} />
                            <Input label="BG Color Code:" type='color' defaultValue={this.state.alarm.bgColorCode} onChange={this.onValueChanged('bgColorCode')} />
                            <Input label="Is Required:" type='number' defaultValue={this.state.alarm.isRemarksRequired} onChange={this.onValueChanged('isRemarksRequired')} />
                                             
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        console.log(this.state.alarm);
                        const validationText = validateInputs(this.state.alarm, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.alarm, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

AlarmTypeAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {   } = state.adminReducer;
    return {   };
}
export default connect(mapStateToProps, { getAlarmTypeMasterData })(AlarmTypeAddEdit)