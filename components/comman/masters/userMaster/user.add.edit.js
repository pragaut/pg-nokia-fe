import Wrapper from '../../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs, validateInputsWithDisplayName } from '../../../../utils/editFormHelper'; 
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants'; 
import {  getUserData, getUserDetailsP, saveUserData,   getOrgRelationTypeMasterData, getOrganisationDetailsData,getOrganisationEmployeeDetailsData, getUserDataById, deleteUserData, getRoleMasterData  } from '../../../../actions/comman/admin.action';
import style from '../../../../theme/app.scss'; 
import ModalHeader from '../../../shared/ModalHeader';  
import Input from '../../../shared/InputBox';
import { SELECT, SelectDiv, SpanLabelForDDl } from '../../../comman/formStyle'; 
import dynamic from 'next/dynamic';
//const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })
//import {MultiSelectDDL} from "react-multi-select-component"; 
import styled from 'styled-components';
import Gap from '../../../comman/Gap'
const MultiSelectDiv = styled.div` 
width:100%;
padding:0px 10px;
.dropdown-content{
    height:200px !important;
}
`;

const customStyles = {
    control: base => ({
      ...base,
      height: 100,
      minHeight: 50
    })
  };

class UserAddEdit extends Wrapper {

    configs = [{
        name: 'userName',
        displayname: 'User Name',
        type: 'string',
        required: true
    }, {
        name: 'orgDetailsId',
        type: 'string',
        displayname: 'Organisation',
        required: true
    },
    {
        name: 'employeeId',
        type: 'string',
        displayname: 'Employee',
        required: true
    },
        // {
        //     name: 'companyMasterId',
        //     type: 'string',
        //     displayname:'Company',
        //     required: true
        // }
    ];

    constructor(props) {
        super(props);

        this.roleMasterIdRefs = React.createRef();
        this.multiselectRef = React.createRef();

        this.state = {
            user: props.baseObject ? props.baseObject : {},
            userSelectedRoles: null, //props.baseObject ? props.baseObject.userRoles : {},
            selectedRoleForSelectedUser: props.selectedRoleForSelectedUser ? props.selectedRoleForSelectedUser : undefined,
           
            roles: null,
            organisations: [],
            orgEmployees :[],
            orgRelationTypes :[],
            options: [{}],
            selectedRoles: [{}],
            isValidPassword: false,
            passwordFocusBorderColor: "#f90707",
            mobileValidateMSG: "",
            mobileFocusBorderColor: "#f90707",
            emailValidateMSG: "Please enter valid email.",
            emailFocusBorderColor: "#f90707",
            roleDDLVal: [],
            roleCategory: '',
            selectedRoleItems: []
        };
    };

   
  
    onValueChanged = key => event => {
        const existingUser = Object.assign({}, this.state.user);
        existingUser[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
      
        this.setState({ user: existingUser });
    };
    onTextChange = key => event => {
        const existingUser = Object.assign({}, this.state.user);
        existingUser[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
     
        this.setState({ user: existingUser });
    };

    componentDidMount() {
        //  console.log("user state c : ", this.state.user);
        this.props.getRoleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getOrgRelationTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationEmployeeDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        //this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, 'city');

        setTimeout(() => {
            // let SelectedRoles = this.state.user.userRoles && this.state.user.userRoles.map((item) => item.roleMasterId);
            let userSelectedRoles = [];
            if (this.state.roles && this.state.selectedRoleForSelectedUser) {
                this.state.selectedRoleForSelectedUser.forEach(item =>
                    userSelectedRoles = userSelectedRoles.concat(this.state.roles.filter(role => role.id === item))
                );
            }
            this.setState({
                userSelectedRoles: userSelectedRoles
            });
        }, 10);
        setTimeout(() => {
            let LoggedUserCategory = this.getLoggedUserRole_JSONConverted();
            let loggedUser = this.loggedUser();
            let RoleCategory = LoggedUserCategory ? LoggedUserCategory.roleCategory : undefined;
            let loggedplantMasterId = loggedUser ? loggedUser.plantMasterId : undefined;
         
            const RoleMaster = this.state.roles && this.state.roles;
            let roleDDLVal= RoleMaster && RoleMaster;        
            this.setState({ roleCategory: RoleCategory, roleDDLVal: roleDDLVal})
        }, 400);
    };

    onValueChangedRoleOnPropsChange = selectedIds => {
        const selectedRole = this.state.selectedRoleForSelectedUser;
        const roles = this.state.roles;
        // let selectedAuditeeTeam = this.ConvertStringToArrayRoleReturn(selectedIds);//selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        var data = [];
        roles && roles.length > 0 && roles.forEach(element => {
            selectedRole && selectedRole.forEach(element2 => {
                if (element2 === element.id) {
                    data = data && data.length > 0 ? data.concat(element) : [element];// data.push(element);
                }
            });
        });
        const roleOptions = data && data.length > 0 && data.map((item, index) => {
            return { value: item.id, label: item.roleName }
        });
        const existinguser = Object.assign({}, this.state.user);
        //   console.log("existinguser : ", existinguser)
        existinguser["roleMasterIds"] = selectedRole //this.roleMasterIdRefs.current.value;
        this.setState({
            user: existinguser,
            selectedRoles: selectedRole,
            selectedRoleItems: roleOptions
        });
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log("nextProps.masterDetails : ",nextProps.masterDetailsCategory);
     
        if (nextProps.roles && nextProps.roles !== null && nextProps.roles !== undefined && nextProps.roles !== this.state.roles) {

            let LoggedUserCategory = this.getLoggedUserRole_JSONConverted();
            let RoleCategory = LoggedUserCategory ? LoggedUserCategory.roleCategory : undefined;

            const RoleMaster = nextProps.roles;
            let roleDDLVal = null;

            if (RoleMaster) {
                roleDDLVal = RoleMaster && RoleMaster;
            }
            this.setState({
                roles: nextProps.roles,
                roleDDLVal: roleDDLVal
                //, userSelectedRoles: userSelectedRoles
            });
            setTimeout(() => {
                this.onValueChangedRoleOnPropsChange(this.state.selectedRoleForSelectedUser)
            }, 200);
        }
        if (nextProps.selectedRoleForSelectedUser !== null && nextProps.selectedRoleForSelectedUser !== undefined && nextProps.selectedRoleForSelectedUser !== this.state.selectedRoleForSelectedUser) {
            let userSelectedRoles = [];
            if (this.state.roles && nextProps.selectedRoleForSelectedUser) {
                nextProps.selectedRoleForSelectedUser.forEach(item =>
                    userSelectedRoles = userSelectedRoles.concat(this.state.roles.filter(role => role.id === item))
                );
            }
            this.setState({
                selectedRoleForSelectedUser: nextProps.selectedRoleForSelectedUser,
                userSelectedRoles: userSelectedRoles
            });
            setTimeout(() => {
                this.onValueChangedRoleOnPropsChange(nextProps.selectedRoleForSelectedUser)
            }, 200);
        }
        if (nextProps && nextProps.orgRelationTypes && nextProps.orgRelationTypes !== this.state.orgRelationTypes) {
            this.setState({ orgRelationTypes: nextProps.orgRelationTypes })
        }
        if (nextProps && nextProps.genders && nextProps.genders !== this.state.genders) {
            this.setState({ genders: nextProps.genders })
        }
        if (nextProps && nextProps.organisations && nextProps.organisations !== null && nextProps.organisations !== undefined && nextProps.organisations !== 'undefined' && nextProps.organisations !== this.state.organisations) {
            this.setState({
                organisations: nextProps.organisations
            })
        }
        if (nextProps && nextProps.orgEmployees && nextProps.orgEmployees !== null && nextProps.orgEmployees !== undefined && nextProps.orgEmployees !== 'undefined' && nextProps.orgEmployees !== this.state.orgEmployees) {
            this.setState({
                orgEmployees: nextProps.orgEmployees
            })
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };
    

    onValueChangedOrgRelationType = key => event => {
        const existingState = Object.assign({}, this.state.user);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingState[key] = SelectedValue;   
        if(!SelectedValue || SelectedValue =='') 
        {
            existingState[key] = 'No-Id';
        }
       let NullId = {
            orgDetailsId:'No-Id'
        }
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, existingState);
        this.props.getOrganisationEmployeeDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,NullId);
        this.setState({ user: existingState });
    };

    onValueChangedOrganisation = key => event => {
        const existingState = Object.assign({}, this.state.user);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingState[key] = SelectedValue;
        this.props.getOrganisationEmployeeDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, existingState);

        this.setState({ user: existingState });
    };
    onSelect = (selectedList, selectedItem) => {
        const listItems = selectedList.map((item) => item.id);
        const existinguser = Object.assign({}, this.state.user);
        //   console.log("existinguser : ", existinguser)
        existinguser["roleMasterIds"] = listItems //this.roleMasterIdRefs.current.value;
        this.setState({
            user: existinguser,
            selectedRoles: listItems
        });
    };

    onRemove = (selectedList, removedItem) => {
        const listItems = selectedList.map((item) => item.id);
        const existinguser = Object.assign({}, this.state.user);
        existinguser["roleMasterIds"] = listItems //this.roleMasterIdRefs.current.value;
        this.setState({
            user: existinguser,
            selectedRoles: listItems
        });
    };
    onValueChangedRole = selectedOption => {

        const listItems = selectedOption && selectedOption.length > 0 && selectedOption.map((item) => item.value);
        const existinguser = Object.assign({}, this.state.user);
        //   console.log("existinguser : ", existinguser)
        existinguser["roleMasterIds"] = listItems //this.roleMasterIdRefs.current.value;
        this.setState({
            user: existinguser,
            selectedRoles: listItems,
            selectedRoleItems: selectedOption

        });

    };
    render() {
        const {  selectedRoleItems, roleCategory, roleDDLVal, organisations,orgRelationTypes, orgEmployees} = this.state;

        let FocusBorderColor = "#f90707";
        const roleOptions = roleDDLVal && roleDDLVal.length > 0 ? roleDDLVal.map((item, index) => {
            return { value: item.id, label: item.roleName }
        }) : [{ value: "-1", label: 'Select Role' }];

        console.log('this.state.user', this.state.user);
        return (
            <div className={style.modal_dialog} style={{ overflow: 'visible', width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>           
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper} style={{ overflow: 'visible' }}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px", overflow: 'visible', textAlign: 'left' }}>
                        <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Organisation Relation Type</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.user.orgRelationTypeId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChangedOrgRelationType('orgRelationTypeId')}
                                >
                                    <option key="a0" value="" >--- Select Relation Type ---</option>

                                    {this.state.orgRelationTypes &&
                                        this.state.orgRelationTypes.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.orgRelationType}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Organisation Name</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.user.orgDetailsId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChangedOrganisation('orgDetailsId')}
                                >
                                    <option key="a0" value="" >--- Select Organisation ---</option>

                                    {this.state.organisations &&
                                        this.state.organisations.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.orgName}</option>
                                        })
                                    }
                                </SELECT>                                
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Employee</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.user.employeeId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('employeeId')}
                                >
                                    <option key="a0" value="" >--- Select Employee ---</option>

                                    {this.state.orgEmployees &&
                                        this.state.orgEmployees.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.employeeName}</option>
                                        })
                                    }
                                </SELECT>
                                
                            </div>
                          
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px", overflow: 'visible', textAlign: 'left' }}>
                          
                        <div style={{ padding: '0px', width: '100%' }}>
                            <SpanLabelForDDl>Roles</SpanLabelForDDl>
                            <MultiSelectDiv >
                               {/* <MultiSelectDDL
                                    className="width100p"
                                    value={selectedRoleItems && selectedRoleItems.length > 0 ? selectedRoleItems : []}
                                    onChange={this.onValueChangedRole}
                                    options={roleOptions}
                                    hasSelectAll={false}
                                    labelledBy="Select"
                                    styles={customStyles} 
                                />*/}
                                {/* <ReactSelect
                                    className="width100p"
                                    value={selectedRoleItems && selectedRoleItems.length > 0 ? selectedRoleItems : []}
                                    onChange={this.onValueChangedRole}
                                    options={roleOptions}
                                    closeMenuOnSelect={false}
                                    isMulti={true}
                                /> */}
                            </MultiSelectDiv>
                            </div>
                            <Input label="User Name:" focusbordercolor="#4954f4" type='text' defaultValue={this.state.user.userName} onChange={this.onValueChanged('userName')} />
                            {this.state.user && this.state.user.id ?
                                '' :
                                <Input label="Password:" focusbordercolor={FocusBorderColor} required="required" type='password' autoComplete="new-password" defaultValue={this.state.user.password} onChange={this.onValueChanged('password')} />
                            }
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '100%', alignItems: 'left', justifyContent: 'left', margin: '10px 0px' }}>
                    <button className={style.primary_btn} style={{ width: '100px', marginRight: '10px' }} onClick={() => {
                        const validationText = validateInputsWithDisplayName(this.state.user, this.configs);
                
                        setTimeout(() => {
                            if (validationText) {
                                return alert(validationText);
                            }
                        }, 200);
                       
                        if (!this.state.userRoles || this.state.userRoles === null) {
                            const existinguser = Object.assign({}, this.state.user);
                            existinguser["userRoles"] = this.state.selectedRoles;
                            this.setState({ user: existinguser });
                        }
                        // console.log("this.state.user 4 : ", this.state.user);
                        if (this.state.selectedRoles && (this.state.selectedRoles).length > 0) {
                           
                                setTimeout(() => {
                                    this.props.onSave(this.state.user, this.props.index);
                                }, 200);
                        }
                        else {
                            alert("Please select atleast one role !!");
                        }

                    }}>save</button>
                    <button style={{ width: '100px' }} className={style.btn_danger} onClick={() => {
                        this.props.onCancel()
                    }}>Close</button>
                </div>
            </div>);
    }
};

UserAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { roles, organisations, orgEmployees,orgRelationTypes } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { roles, organisations, orgEmployees,orgRelationTypes, errorType, errorMessage };
}

export default connect(mapStateToProps, { getUserData, getUserDetailsP,   getOrgRelationTypeMasterData, getOrganisationDetailsData,getOrganisationEmployeeDetailsData, saveUserData, getUserDataById,  deleteUserData, getRoleMasterData })(UserAddEdit)
