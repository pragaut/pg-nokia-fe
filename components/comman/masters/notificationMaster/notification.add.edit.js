import Wrapper from '../../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants';
import { getNotificationMasterData, getAlarmTypeMasterData } from '../../../../actions/comman/admin.action';
import style from '../../../../theme/app.scss';
import ModalHeader from '../../../shared/ModalHeader';
import Input from '../../../shared/InputBox';
import { SELECT, SpanLabelForDDl } from '../../../comman/formStyle';
import config from '../../../../config';
//import Select from 'react-select'
import * as sessionHelper from '../../../../utils/session.helper';
import * as helper from '../../../../helper';
import Gap from '../../../comman/Gap';
import styledComponentsCjs from 'styled-components';

const SPAN = styledComponentsCjs.div` 
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 13px;
    font-family: Asap;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em; 
`;

class NotificationAddEdit extends Wrapper {

    configs = [{
        name: 'notificationName',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.alarmTypeMasterIdRefs = React.createRef();

        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            notification: props.baseObject ? props.baseObject : {},
            alarms: [],
            loadershow: 'false',

        };
    };

    onValueChanged = key => event => {
        const existingNotification = Object.assign({}, this.state.notification);
        existingNotification[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ notification: existingNotification });
    };
    onTextChange = key => event => {
        const existingNotification = Object.assign({}, this.state.notification);
        existingNotification[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ notification: existingNotification });
    };

    componentDidMount() {
        const state = {};
        this.props.getNotificationMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getAlarmTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
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
        console.log("this.state.notification", this.state.notification);
        return (
            <div className={style.modal_dialog} style={{ width: '90%', maxHeight: '120vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="Notification Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '100%' }}>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Alarm Type</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.notification.alarmTypeId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('alarmTypeId')}
                                >
                                    <option key="a0" value="" >--- Select Alarm Type ---</option>
                                    {this.state.alarms &&
                                        this.state.alarms.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.alarmTypeName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Notification Name:" type='text' defaultValue={this.state.notification.notificationName} onChange={this.onValueChanged('notificationName')} />
                            <Input label="Code:" type='text' defaultValue={this.state.notification.notificationCode} onChange={this.onValueChanged('notificationCode')} />
                            <Input label="Order:" type='text' defaultValue={this.state.notification.notificationOrder} onChange={this.onValueChanged('notificationOrder')} />

                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button 
                    style={{ width: '100px', marginRight: '10px' }}
                    className={style.primary_btn} onClick={() => {
                        console.log(this.state.notification);
                        const validationText = validateInputs(this.state.notification, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.notification, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button 
                    style={{ width: '100px', marginRight: '10px' }}
                    className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

NotificationAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { alarm, alarms } = state.adminReducer;
    return { alarm, alarms };
}
export default connect(mapStateToProps, { getNotificationMasterData, getAlarmTypeMasterData })(NotificationAddEdit)