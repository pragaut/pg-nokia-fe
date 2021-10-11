import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { SELECT } from '../../formStyle'
//import { getRolesByGroupId } from '../../../actions/admin.action';
import { getEscalationDurationDetails, getNotificationMasterDetails, getRoleMasterData } from '../../../actions/admin.action';

import style from '../../../theme/app.scss';
import { getMasterDetailsBymasterCategoryCode } from '../../../actions/masterDetails.actions';

import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import styledComponentsCjs from 'styled-components';
import Gap from '../../Gap'
import MultiSelect from '../../shared/MultiSelect';


const SPAN = styledComponentsCjs.div` 
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 13px;
    font-family: Asap;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em; 
`;

class EscalationMatrixAddEdit extends Wrapper {


    configs = [{
        name: 'notificationMasterId',
        displayname: 'Notification Name',
        type: 'string',
        required: true
    },
    {
        name: 'roleId',
        displayname: 'Role Name',
        type: 'string',
        required: true
    },
    {
        name: 'frequencyMasterId',
        displayname: 'Frequency Name',
        type: 'string',
        required: true
    },
    {
        name: 'durationMasterId',
        displayname: 'Duration Name',
        type: 'string',
        required: true
    }
    ];

    constructor(props) {
        super(props);


        this.state = {
            escalationmatrix: props.baseObject ? props.baseObject : {},
            selectedIds: [],
            roles: [],
            notifications: [],
            frequencymaster: [],
            durations: []

        };
    };


    onValueChanged = key => event => {
        const existingGroup = Object.assign({}, this.state.escalationmatrix);
        existingGroup[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ escalationmatrix: existingGroup });
    };


    componentDidMount() {
        this.props.getRoleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.state.roles = this.props.roles && this.props.roles;
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, 'Frequency_Master');
        this.state.frequencymaster = this.props.masterDetailsCategory && this.props.masterDetailsCategory;
        this.props.getEscalationDurationDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.state.durations = this.props.escalationDurations && this.props.escalationDurations;
        this.props.getNotificationMasterDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.state.notifications = this.props.notifications && this.props.notifications;
        const state = {};
        this.state.escalationmatrix.notificationType = 'Scheduler';
        this.state.escalationmatrix.isNotificationOn = true;
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    };


    UNSAFE_componentWillReceiveProps(nextProps) {
        // this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'City_Master');

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;
            this.ConvertStringToArrayRole(nextProps.multiRoleIds);
            this.setState({ ...state });
        }
    };

    unsafe_componentWillReceiveProps(nextProps) {
        if (nextProps.roles !== null && nextProps.roles !== undefined && nextProps.roles !== this.state.roles) {
            this.setState({
                roles: nextProps.roles
            })
        }
        if (nextProps.masterDetailsCategory !== null && nextProps.masterDetailsCategory !== undefined && nextProps.masterDetailsCategory !== this.state.frequencymaster) {
            this.setState({
                frequencymaster: nextProps.masterDetailsCategory
            })
        }
        if (nextProps.escalationDurations !== null && nextProps.escalationDurations !== undefined && nextProps.escalationDurations !== this.state.durations) {
            this.setState({
                durations: nextProps.escalationDurations
            })
        }
        if (nextProps.notifications !== null && nextProps.notifications !== undefined && nextProps.notifications !== this.state.notifications) {
            this.setState({
                notifications: nextProps.notifications
            })
        }
    }


    // FunctionSetIDs = (data) => {
    //     const state = {};
    //     const datstring = data && data.join();
    //     this.state.notification.multiRoleIds = datstring;
    //     this.setState({
    //         ...state
    //     }, () => {
    //         // console.log("state", this.state)
    //     });

    // }

    // ConvertStringToArrayRole = (data) => {
    //     const state = {};
    //     const datstring = data && data.split(',');
    //     this.state.selectedIds = data;
    //     this.setState({
    //         ...state
    //     }, () => {
    //         // console.log("state", this.state)
    //     });

    // }

    // ConvertStringToArrayRoleReturn = (data) => {
    //     const state = {};
    //     const datstring = data && data.split(',');
    //     return data;
    // }
    render() {

        const NotificationDDl = this.state.notifications && this.state.notifications.length > 0 && this.state.notifications.filter(item => item.notificationType === 'Scheduler')
        const escalationDurationsDDL = this.state.escalationmatrix.frequencyMasterId && this.state.durations && this.state.durations.length > 0 && this.state.durations.filter(item => item.frequencyMasterId === this.state.escalationmatrix.frequencyMasterId)

        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="Group Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SPAN>Notification</SPAN>
                                <Gap h="5px" />
                                <SELECT label="Notification:" defaultValue={this.state.escalationmatrix.notificationMasterId} onChange={this.onValueChanged('notificationMasterId')}>
                                    <option>Select Notification  </option>
                                    {
                                        NotificationDDl && NotificationDDl.length > 0 && NotificationDDl.map((item, index) => {
                                            return <option key={index} value={item.id} selected={item.id === this.state.escalationmatrix.notificationMasterId ? true : false} >{item.notificationName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SPAN>Role</SPAN>
                                <Gap h="5px" />
                                <SELECT label="Role:" defaultValue={this.state.escalationmatrix.roleId} onChange={this.onValueChanged('roleId')}>
                                    <option>Select role  </option>
                                    {
                                        this.state.roles && this.state.roles.length > 0 && this.state.roles.map((item, index) => {
                                            return <option key={index} value={item.id} selected={item.id === this.state.escalationmatrix.roleId ? true : false} >{item.roleName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SPAN>Frequency</SPAN>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT label="Frequency:" defaultValue={this.state.escalationmatrix.frequencyMasterId} onChange={this.onValueChanged('frequencyMasterId')}>
                                    <option>Select Frequency</option>
                                    {
                                        this.state.frequencymaster && this.state.frequencymaster.length > 0 && this.state.frequencymaster.map((item, index) => {
                                            return <option key={index} value={item.id} selected={item.id === this.state.escalationmatrix.frequencyMasterId ? true : false} >{item.value}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SPAN>Duration </SPAN>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT label="Duration:" defaultValue={this.state.escalationmatrix.durationMasterId} onChange={this.onValueChanged('durationMasterId')}>
                                    <option>Select Duration</option>
                                    {
                                        escalationDurationsDDL && escalationDurationsDDL.length > 0 && escalationDurationsDDL.map((item, index) => {
                                            return <option key={index} value={item.id} selected={item.id === this.state.escalationmatrix.durationMasterId ? true : false} >{item.durationName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Due Days After Due Date:" type='number' defaultValue={this.state.escalationmatrix.dayAfterDueDate} onChange={this.onValueChanged('dayAfterDueDate')} />
                        </div>

                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        const validationText = validateInputsWithDisplayName(this.state.escalationmatrix, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }

                        // this.props.saveCompanyPlantMasterData(this.state.companyPlant, this.props.index);
                        this.props.onSave(this.state.escalationmatrix, this.props.index);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

EscalationMatrixAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {

    const { roles, escalationDurations, notifications, escalationmatrix, escalationmatrixs, escalationmatrixRecordsCount, escalationmatrixActiontype } = state.adminReducer;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;

    return { masterDetailsCategory, roles, escalationDurations, notifications, escalationmatrix, escalationmatrixs, escalationmatrixRecordsCount, escalationmatrixActiontype };

}


export default connect(mapStateToProps, { getNotificationMasterDetails, getEscalationDurationDetails, getMasterDetailsBymasterCategoryCode, getRoleMasterData })(EscalationMatrixAddEdit)