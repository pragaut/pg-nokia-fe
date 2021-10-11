import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs,validateInputsWithDisplayName } from '../../../utils/editFormHelper';
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
//import MultiSelect from '../../shared/MultiSelect';
import dynamic from 'next/dynamic';
const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })




const SPAN = styledComponentsCjs.div` 
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 13px;
    font-family: Asap;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em; 
`;

class NotifiicationAddEdit extends Wrapper {


    configs = [{
        name: 'notificationName',
        displayname:'Notification Name',
        type: 'string',
        required: true
    },
    {
        name: 'notificationCode',
        displayname:'Notification Code',
        type: 'string',
        required: true
    },
    {
        name: 'subject',
        displayname:'Subject',
        type: 'string',
        required: true
    },
    {
        name: 'forType',
        displayname:'Notification For',
        type: 'string',
        required: true
    }
    ];

    constructor(props) {
        super(props);

        this.roleMasterIdRefs = React.createRef();
        this.multiselectRef = React.createRef();
        this.state = {
            notification: props.baseObject ? props.baseObject : {},
            selectedIds: [],
            roles: null,
            notificationSelectedRoles: null,
            selectedRoles: [{}],
            options: [{}],
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
            notificationForDDL: [
                {
                    text: 'Acceptance',
                    value: 'Acceptance'
                },
                {
                    text: 'Payment',
                    value: 'Payment'
                }
            ],
            roles: null,
        };
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.roles !== null && nextProps.roles !== undefined && nextProps.roles !== this.state.roles) {
            this.setState({
                roles: nextProps.roles
            })
        }
    }


    onValueChanged = key => event => {
        const existingnotification = Object.assign({}, this.state.notification);
        existingnotification[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ notification: existingnotification });
    };


    componentDidMount() {
        this.props.getRoleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);

        setTimeout(() => {
            let MultiRolesIds = this.state.notification && this.state.notification.multiRoleIds;
             let ConvertedMultselectRoles = this.ConvertStringToArrayRoleReturn(MultiRolesIds)
            // let SelectedRoles = this.state.notification.userRoles && this.state.user.userRoles.map((item) => item.roleMasterId);
             let notificationSelectedRoles = [];
            if (this.state.roles && ConvertedMultselectRoles) {
                ConvertedMultselectRoles.forEach(item =>
                    notificationSelectedRoles = notificationSelectedRoles.concat(this.state.roles.filter(role => role.id === item))
                );
                // ConvertedMultselectRoles.forEach(item =>
                //     userSelectedRoles = userSelectedRoles.concat(this.state.roles.filter(role => role.id === item))
                // );
            }
            this.setState({
                notificationSelectedRoles: notificationSelectedRoles //userSelectedRoles
            })
        }, 300);

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

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.roles !== null && nextProps.roles !== undefined && nextProps.roles !== this.state.roles) {
            this.setState({
                roles: nextProps.roles
            })
        }
    }

    getItems() {
        // By calling the belowe method will reset the selected values programatically
        this.multiselectRef.current.getSelectedItems();
    };


    onSelect = (selectedList, selectedItem) => {
        //console.log("selectedList", selectedList);
        //console.log("selectedItem", selectedItem);

        const listItems = selectedList.map((item) => item.id);
        //console.log("listItems", listItems);
        let returndata = this.returnIdsFunction(listItems);
        const existingnotification = Object.assign({}, this.state.notification);
        existingnotification["multiRoleIds"] = returndata //this.roleMasterIdRefs.current.value;
        this.setState({
            notification: existingnotification,
            selectedRoles: listItems
        });
    };

    onRemove = (selectedList, removedItem) => {
        //console.log("selectedList", selectedList.id);
        //console.log("removedItem", removedItem);

        const listItems = selectedList.map((item) => item.id);
        //console.log("listItems", listItems);
        let returndata = this.returnIdsFunction(listItems);
        const existingnotification = Object.assign({}, this.state.notification);
        existingnotification["multiRoleIds"] = returndata //this.roleMasterIdRefs.current.value;
        this.setState({
            notification: existingnotification,
            selectedRoles: listItems
        });
    };

    FunctionSetIDs = (data) => {
        const state = {};
        const datstring = data && data.join();
        this.state.notification.multiRoleIds = datstring;
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });

    }
    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;

    }
    ConvertStringToArrayRole = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        this.state.selectedIds = data;
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });

    }

    ConvertStringToArrayRoleReturn = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring;
    }
    render() {
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
                            <div style={{ padding: '10px 0px', width: '100%' }}>
                                <SPAN>Group</SPAN>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT 
                                label="Notification Type:" defaultValue={this.state.notification.notificationType} onChange={this.onValueChanged('notificationType')}>
                                    <option>Select Notification Type</option>
                                    {
                                        this.state.notificationTypeDDL.map((item, index) => {
                                            return <option key={index} value={item.value} selected={item.value === this.state.notification.notificationType ? true : false} >{item.text}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Notification Name:" focusbordercolor="#f90707"  type='text' defaultValue={this.state.notification.notificationName} onChange={this.onValueChanged('notificationName')} />
                            <Input label="Notification Code:" focusbordercolor="#f90707"  type='text' defaultValue={this.state.notification.notificationCode} onChange={this.onValueChanged('notificationCode')} />
                            <Input label="Subject:" focusbordercolor="#f90707"  type='text' defaultValue={this.state.notification.subject} onChange={this.onValueChanged('subject')} />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <Input label="Body Content :" focusbordercolor="#f90707"  type='text' defaultValue={this.state.notification.bodyContent} onChange={this.onValueChanged('bodyContent')} />
                            <div style={{ padding: '5px', width: '100%' }}>
                                <SPAN>For </SPAN>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT label="Notification For:"  defaultValue={this.state.notification.forType} onChange={this.onValueChanged('forType')}>
                                    <option>Select Notification Type</option>
                                    {
                                        this.state.notificationForDDL.map((item, index) => {
                                            return <option key={index} value={item.value} selected={item.value === this.state.notification.forType ? true : false} >{item.text}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SPAN>Role (Only For Event Notification) </SPAN>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />

                                <Multiselect
                                    options={this.state.roles ? this.state.roles : this.state.options} // Options to display in the dropdown
                                    selectedValues={this.state.notificationSelectedRoles} // Preselected value to persist in dropdown
                                    onSelect={this.onSelect} // Function will trigger on select event
                                    onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="roleName" // Property name to display in the dropdown options
                                    ref={this.multiselectRef}
                                    closeIcon={"cancel"}
                                    showCheckbox={true}
                                    placeholder={"Select Roles"}
                                    closeOnSelect={false}
                                    style={{
                                        multiselectContainer: { // To change input field position or margin
                                            margin: '8px'
                                        },
                                        inputField: { // To change input field position or margin
                                            paddingLeft: '8px'
                                        }
                                    }}
                                />
                                {/* <MultiSelect
                            style={{ width: '100% !important', color: '#000000' }}
                            dataRows={this.props.roles}
                    selectedIds={this.state.selectedIds && this.state.selectedIds.length > 0 ? this.state.selectedIds : this.ConvertStringToArrayRoleReturn(this.state.notification.multiRoleIds)}
                           
                          valueFieldName='roleName'
                           // selectedValues={this.state.selectedIds  && this.state.selectedIds.length > 0 ? this.state.selectedIds : this.ConvertStringToArrayRoleReturn(this.state.notification.multiRoleIds)}
                           selectedValues={this.state.selectedIds }
                           faIcon='fas fa-caret-down'
                            onItemSelectionStateChanged={(selectionData) => {
                                let Datta = selectionData.checkedData.map(data => data.id);
                                this.setState({
                                    ...this.state,
                                    selectedIds: selectionData.checkedData.map(data => data.id)
                                });
                                 this.FunctionSetIDs(Datta);
                            }}

                        /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        const validationText = validateInputsWithDisplayName(this.state.notification, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }

                        // this.props.saveCompanyPlantMasterData(this.state.companyPlant, this.props.index);
                        this.props.onSave(this.state.notification, this.props.index);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

NotifiicationAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {

    const { roles } = state.adminReducer;

    return { roles };

}


export default connect(mapStateToProps, { getNotificationMasterDetails, getNotificationMasterDetailsById, saveNotificationMasterDetails, deleteNotificationMasterDetails, initNotificationMasterDetails, getRoleMasterData })(NotifiicationAddEdit)