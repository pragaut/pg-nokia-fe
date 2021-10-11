import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { SELECT } from '../../formStyle'
//import { getRolesByGroupId } from '../../../actions/admin.action';
import { getNotificationMasterDetails, getNotificationMasterDetailsById, saveNotificationMasterDetails, deleteNotificationMasterDetails, initNotificationMasterDetails, getRoleMasterData } from '../../../actions/admin.action';

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

class EscalationDurationAddEdit extends Wrapper {


    configs = [{
        name: 'frequencyMasterId',
        type: 'string',
        required: true
    },
    {
        name: 'durationName',
        type: 'string',
        required: true
    },
    {
        name: 'durationOrder',
        type: 'number',
        required: true
    }
    ];

    constructor(props) {
        super(props);


        this.state = {
            escalationDuration: props.baseObject ? props.baseObject : {},
            selectedIds: [],
            notificationTypeDDL: [
                {
                    text: 'Event',
                    value: 'Event'
                },
                {
                    text: 'Scheduler',
                    value: 'Scheduler'
                }
            ],

        };
    };


    onValueChanged = key => event => {
        const existingGroup = Object.assign({}, this.state.escalationDuration);
        existingGroup[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ escalationDuration: existingGroup });
    };


    componentDidMount() {
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, 'Frequency_Master');

    };


    UNSAFE_componentWillReceiveProps(nextProps) {
        // this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'City_Master');

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
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '40vw' }}>
                {/* <ModalHeader
                    heading="Group Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '80%' }}>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SPAN>Frequency</SPAN>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT label="Frequency:" defaultValue={this.state.escalationDuration.frequencyMasterId} onChange={this.onValueChanged('frequencyMasterId')}>
                                    <option>Select Frequency</option>
                                    {
                                        this.props.masterDetailsCategory && this.props.masterDetailsCategory.length > 0 && this.props.masterDetailsCategory.map((item, index) => {
                                            return <option key={index} value={item.id} selected={item.id === this.state.escalationDuration.frequencyMasterId ? true : false} >{item.value}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Duration Name:" type='text' defaultValue={this.state.escalationDuration.durationName} onChange={this.onValueChanged('durationName')} />
                            <Input label="Duration Code:" type='text' defaultValue={this.state.escalationDuration.durationCode} onChange={this.onValueChanged('durationCode')} />
                            <Input label="Order:" type='number' defaultValue={this.state.escalationDuration.durationOrder} onChange={this.onValueChanged('durationOrder')} />
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        const validationText = validateInputs(this.state.escalationDuration, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }

                        // this.props.saveCompanyPlantMasterData(this.state.companyPlant, this.props.index);
                        this.props.onSave(this.state.escalationDuration, this.props.index);

                        setTimeout(() => {
                            const existingescalationDuration = Object.assign({}, this.state.escalationDuration);
                            existingescalationDuration["id"] =undefined;
                            existingescalationDuration["durationName"] ='';
                            existingescalationDuration["durationCode"] ='';
                             this.setState({ escalationDuration: existingescalationDuration });
                       
                        }, 500); 
                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

EscalationDurationAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {

    const { roles } = state.adminReducer;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;
   
    return { roles, masterDetailsCategory };

}


export default connect(mapStateToProps, { getMasterDetailsBymasterCategoryCode })(EscalationDurationAddEdit)