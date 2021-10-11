import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';

//import { getRolesByRoleId } from '../../../actions/admin.action';
import { getGroupMasterData, saveUserData, getRoleMasterData, getModuleMasterData, getCompanyMaster, getPlantMaster } from '../../../actions/admin.action';
import { getMasterDetailsBymasterCategoryCode } from '../../../actions/masterDetails.actions';

import style from '../../../theme/app.scss';

import ModalHeader from '../../shared/ModalHeader';
//import loadable from '@loadable/component'

import Input from '../../shared/InputBox';
import { SELECT, SelectDiv, SpanLabelForDDl } from '../../formStyle';

import dynamic from 'next/dynamic';
const Multiselect = dynamic(() => import('multiselect-react-dropdown').then(module => module.Multiselect), { ssr: false })
import MultiSelectDDL from "react-multi-select-component";
//import ReactSelect from 'react-select';
import styled from 'styled-components';

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
        name: 'departmentMasterId',
        type: 'string',
        displayname: 'Department',
        required: true
    }, {
        name: 'firstName',
        type: 'string',
        displayname: 'First Name',
        required: true
    }, {
        name: 'code',
        type: 'string',
        displayname: 'Employee Code',
        required: true
    },
    {
        name: 'email',
        type: 'string',
        displayname: 'Email',
        required: true
    },
    {
        name: 'plantMasterId',
        type: 'string',
        displayname: 'Plant',
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
        this.plantMasterIdRefs = React.createRef();
        this.departmentMasterIdRefs = React.createRef();
        this.multiselectRef = React.createRef();

        this.state = {
            user: props.baseObject ? props.baseObject : {},
            userSelectedRoles: null, //props.baseObject ? props.baseObject.userRoles : {},
            selectedRoleForSelectedUser: props.selectedRoleForSelectedUser ? props.selectedRoleForSelectedUser : undefined,
            plants: null,
            roles: null,
            companys: [],
            departments: null,
            options: [{}],
            selectedRoles: [{}],
            passwordStrength: "poor",
            isValidPassword: false,
            passwordFocusBorderColor: "#f90707",
            isValidMobileNumber: true,
            mobileValidateMSG: "",
            mobileFocusBorderColor: "#f90707",
            isValidEmail: false,
            emailValidateMSG: "Please enter valid email.",
            emailFocusBorderColor: "#f90707",
            PlantMasterDropDown: [],
            roleDDLVal: [],
            roleCategory: '',
            selectedRoleItems: []
        };
    };

    analyzePassword(value) {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (strongRegex.test(value)) {
            //alert("Strong password !!");
            this.setState({
                passwordStrength: "Strong",
                isValidPassword: true
            });
        } else if (mediumRegex.test(value)) {
            //alert("Medium password !!")
            this.setState({
                passwordStrength: "Medium",
                isValidPassword: false
            });
        } else {
            //alert("Poor password !!")
            this.setState({
                passwordStrength: "Poor",
                isValidPassword: false
            });
        }
    }
    validateMobileNumber(value) {
        //var pattern = new RegExp(/^[0-9\b]+$/);
        var pattern = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        let firstLetter = this.state.userName && this.state.userName.substring(0, 1);
        if (value && !pattern.test(value)) {
            this.setState({
                isValidMobileNumber: false,
                mobileValidateMSG: "Please enter only number.",
                mobileFocusBorderColor: "#f90707"
            });
        } else if (value && (value.length != 10) || firstLetter === "1") {
            this.setState({
                isValidMobileNumber: false,
                mobileValidateMSG: "Please enter valid phone number.",
                mobileFocusBorderColor: "#f90707"
            });
        }
        else {
            this.setState({
                isValidMobileNumber: true,
                mobileValidateMSG: "",
                mobileFocusBorderColor: "#228703"
            });
        }
    }
    validateEmail(value) {
        //var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        //alert(value);
        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (value && !regEmail.test(value)) {
            this.setState({
                isValidEmail: false,
                emailValidateMSG: "Please enter valid email.",
                emailFocusBorderColor: "#f90707"
            });
        }
        else {
            this.setState({
                isValidEmail: true,
                emailValidateMSG: "",
                emailFocusBorderColor: "#228703"
            });
        }
    }

    onValueChanged = key => event => {
        if (key === "mobile")
            this.validateMobileNumber(event.target.value);
        else if (key === "email")
            this.validateEmail(event.target.value);

        const existingUser = Object.assign({}, this.state.user);
        existingUser[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (key === "password") {
            this.analyzePassword(event.target.value);
        }
        this.setState({ user: existingUser });
    };
    onValueChangedCompany = key => event => {
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        let PlantMasterDropDown = this.state.plants && this.state.plants.length > 0 && this.state.plants.filter(item => item.companyMasterID === selectedValue);
        const existingUser = Object.assign({}, this.state.user);
        existingUser[key] = selectedValue;
        existingUser['plantMasterId'] = undefined;
        this.setState({ PlantMasterDropDown, PlantMasterDropDown, user: existingUser });
    };
    onValueChangedPlant = key => event => {
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        const existingUser = Object.assign({}, this.state.user);
        existingUser[key] = selectedValue && selectedValue !== '-1' && selectedValue !== null && selectedValue !== 'undefined' && selectedValue !== 'Select plant' ? selectedValue : undefined;

        this.setState({ user: existingUser });
    };
    onTextChange = key => event => {
        const existingUser = Object.assign({}, this.state.user);
        existingUser[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.analyzePassword(event.target.value);
        this.setState({ user: existingUser });
    };

    componentDidMount() {
        //  console.log("user state c : ", this.state.user);
        this.props.getPlantMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getRoleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.ALL_ROWS_LIST, undefined, undefined, "department");
        this.props.getCompanyMaster(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
            let CompanyMasterID = loggedUser && loggedUser.plantMaster ? loggedUser.plantMaster.companyMasterID : undefined
            let PlantDDL = this.state.plants && this.state.plants;
            // let CompanyDDl = this.state.companys && this.state.companys;
            let selectedCompanyId = this.state.user && this.state.user.companyMasterId && this.state.user.companyMasterId !== "-1" && this.state.user.companyMasterId;
            let PlantMasterDropDown = undefined;
            const RoleMaster = this.state.roles && this.state.roles;
            let roleDDLVal = null;
            if (RoleCategory === "Company Admin") {
                PlantMasterDropDown = PlantDDL && PlantDDL.filter(item => item.companyMasterID === CompanyMasterID);
                if (RoleMaster) {
                    roleDDLVal = RoleMaster && RoleMaster.length > 0 && RoleMaster.filter(item => item.roleCategory === 'User')
                }
            }
            else if (selectedCompanyId) {
                PlantMasterDropDown = PlantDDL && PlantDDL.filter(item => item.companyMasterID === selectedCompanyId);
                roleDDLVal = RoleMaster && RoleMaster;
            }
            else {
                roleDDLVal = RoleMaster && RoleMaster;
                PlantMasterDropDown = PlantDDL && PlantDDL;
            }
            if ((!this.state.user.plantMasterId || this.state.user.plantMasterId === null) && (loggedplantMasterId && loggedplantMasterId !== undefined)) {
                setTimeout(() => {
                    const existinguser = Object.assign({}, this.state.user);
                    existinguser["plantMasterId"] = loggedplantMasterId //this.roleMasterIdRefs.current.value;
                    this.setState({
                        user: existinguser
                    });
                }, 100);
            }
            this.setState({ roleCategory: RoleCategory, roleDDLVal: roleDDLVal, PlantMasterDropDown: PlantMasterDropDown })
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
        if (nextProps.plants !== null && nextProps.plants !== undefined && nextProps.plants !== this.state.plants) {
            this.setState({
                plants: nextProps.plants
            });
        }
        if (nextProps.roles && nextProps.roles !== null && nextProps.roles !== undefined && nextProps.roles !== this.state.roles) {

            let LoggedUserCategory = this.getLoggedUserRole_JSONConverted();
            let RoleCategory = LoggedUserCategory ? LoggedUserCategory.roleCategory : undefined;

            const RoleMaster = nextProps.roles;
            let roleDDLVal = null;

            if (RoleCategory === "Company Admin" && RoleMaster) {
                roleDDLVal = RoleMaster && RoleMaster.length > 0 && RoleMaster.filter(item => item.roleCategory === 'User')
            }
            else if (RoleMaster) {
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
        if (nextProps.companys !== null && nextProps.companys !== undefined && nextProps.companys !== this.state.companys) {
            this.setState({
                companys: nextProps.companys
            });
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
        if (nextProps.masterDetailsCategory !== null && nextProps.masterDetailsCategory !== undefined && nextProps.masterDetailsCategory !== this.state.departments) {
            this.setState({
                departments: nextProps.masterDetailsCategory
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
        const { companys, selectedRoleItems, roleCategory, roleDDLVal, PlantMasterDropDown } = this.state;

        let FocusBorderColor = "#f90707";
        if (this.state.passwordStrength === "Strong") {
            FocusBorderColor = "#228703";
        }
        else if (this.state.passwordStrength === "Medium") {
            FocusBorderColor = "#f0c615";
        }
        const roleOptions = roleDDLVal && roleDDLVal.length > 0 ? roleDDLVal.map((item, index) => {
            return { value: item.id, label: item.roleName }
        }) : [{ value: "-1", label: 'Select Role' }];

        console.log('this.state.user', this.state.user);
        return (
            <div className={style.modal_dialog} style={{ overflow: 'visible', width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="User Master"   
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper} style={{ overflow: 'visible' }}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px", overflow: 'visible', textAlign: 'left' }}>
                            {roleCategory !== "Company Admin" &&
                                <>
                                    <SpanLabelForDDl>Company</SpanLabelForDDl>
                                    <SELECT margin="8px"
                                        value={this.state.user.companyMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.onValueChangedCompany('companyMasterId')}

                                    >
                                        <option key={-1} value={undefined}> Select company</option>
                                        {companys && companys.length > 0 &&
                                            companys.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.companyCode + " - " + item.companyName}</option>
                                            })
                                        }
                                    </SELECT>
                                </>
                            }
                            <SpanLabelForDDl>Plant</SpanLabelForDDl>
                            <SELECT margin="8px" ref={this.plantMasterIdRefs}
                                value={this.state.user.plantMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChangedPlant('plantMasterId')}
                            >
                                <option key={-1} value={undefined}> Select plant</option>
                                {PlantMasterDropDown &&
                                    PlantMasterDropDown.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.plantCode + " - " + item.plantName}</option>
                                    })
                                }
                            </SELECT>

                            <Input label="First Name:" focusbordercolor="#4954f4" required={true} type='text' defaultValue={this.state.user.firstName} onChange={this.onValueChanged('firstName')} />
                            <Input label="Last Name:" focusbordercolor="#4954f4" required={true} type='text' defaultValue={this.state.user.lastName} onChange={this.onValueChanged('lastName')} />
                            <Input label="Emp. Code:" focusbordercolor="#4954f4" required={true} type='text' defaultValue={this.state.user.code} onChange={this.onValueChanged('code')} />
                            <Input label="Mobile: (Optional)" focusbordercolor={this.state.mobileFocusBorderColor} type='number' maxLength="10" defaultValue={this.state.user.mobile} onChange={this.onValueChanged('mobile')} />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px", overflow: 'visible', textAlign: 'left' }}>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Department</SpanLabelForDDl>
                            <SELECT margin="8px" ref={this.departmentMasterIdRefs}
                                value={this.state.user.departmentMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('departmentMasterId')}
                            >
                                <option key={"selectlist"} value={"-1"}>{"Select List"}</option>
                                {this.state.departments &&
                                    this.state.departments.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.value}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Roles</SpanLabelForDDl>
                            <MultiSelectDiv >
                                <MultiSelectDDL
                                    className="width100p"
                                    value={selectedRoleItems && selectedRoleItems.length > 0 ? selectedRoleItems : []}
                                    onChange={this.onValueChangedRole}
                                    options={roleOptions}
                                    hasSelectAll={false}
                                    labelledBy="Select"
                                    styles={customStyles} 
                                />
                                {/* <ReactSelect
                                    className="width100p"
                                    value={selectedRoleItems && selectedRoleItems.length > 0 ? selectedRoleItems : []}
                                    onChange={this.onValueChangedRole}
                                    options={roleOptions}
                                    closeMenuOnSelect={false}
                                    isMulti={true}
                                /> */}
                            </MultiSelectDiv>
                            <Input label="Email:" focusbordercolor={this.state.emailFocusBorderColor} required="required" type='email' defaultValue={this.state.user.email} onChange={this.onValueChanged('email')} />
                            <Input label="User Name:" focusbordercolor="#4954f4" type='text' defaultValue={this.state.user.userName} onChange={this.onValueChanged('userName')} />
                            {this.state.user && this.state.user.id ?
                                '' :
                                <Input label="Password:" focusbordercolor={FocusBorderColor} required="required" type='password' autoComplete="new-password" defaultValue={this.state.user.password} onChange={this.onValueChanged('password')} />
                            }


                            {/* <Multiselect
                                options={roleDDLVal ? roleDDLVal : this.state.options} // Options to display in the dropdown
                                selectedValues={this.state.userSelectedRoles} // Preselected value to persist in dropdown
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
                            /> */}
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', margin: '10px 0px' }}>
                    <button className={style.primary_btn} style={{ width: '100px', marginRight: '10px' }} onClick={() => {
                        const validationText = validateInputsWithDisplayName(this.state.user, this.configs);
                        this.analyzePassword(this.state.user.password);
                        this.validateEmail(this.state.user.email);
                        setTimeout(() => {
                            if (validationText) {
                                return alert(validationText);
                            }
                            else if (this.state.user && !this.state.user.id && !this.state.isValidPassword) {
                                return alert("Password strength is " + this.state.passwordStrength);
                            }
                            else if (!this.state.isValidMobileNumber) {
                                return alert(this.state.mobileValidateMSG);
                            }
                            else if (!this.state.isValidEmail) {
                                return alert(this.state.emailValidateMSG);
                            }
                        }, 200);

                        if (this.state.user.plantMasterId == null || this.state.user.plantMasterId === undefined) {
                            // return alert('select plant first!');
                            const existinguser = Object.assign({}, this.state.user);
                            if (this.plantMasterIdRefs.current.value && this.plantMasterIdRefs.current.value !== null) {
                                existinguser["plantMasterId"] = this.plantMasterIdRefs.current.value;
                            }
                            else {
                                existinguser["plantMasterId"] = loggedplantMasterId;
                            }
                            this.setState({ user: existinguser });
                        }
                        if (this.state.user.departmentMasterId == null) {
                            //console.log("this.departmentMasterIdRefs.current", this.departmentMasterIdRefs.current.value);

                            const existinguser = Object.assign({}, this.state.user);
                            existinguser["departmentMasterId"] = this.departmentMasterIdRefs.current.value;
                            this.setState({ user: existinguser });
                        }
                        if (!this.state.userRoles || this.state.userRoles === null) {
                            const existinguser = Object.assign({}, this.state.user);
                            existinguser["userRoles"] = this.state.selectedRoles;
                            this.setState({ user: existinguser });
                        }
                        // console.log("this.state.user 4 : ", this.state.user);
                        if (this.state.selectedRoles && (this.state.selectedRoles).length > 0) {
                            if ((this.state.isValidPassword && this.state.isValidPassword === true) || (this.state.user.id)) {
                                setTimeout(() => {
                                    this.props.onSave(this.state.user, this.props.index);
                                }, 200);
                            }
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
    const { roles, plants, companys } = state.adminReducer;
    const { masterDetail, masterDetails } = state.masterDetailReducer;
    const { masterDetailCategory, masterDetailsCategory } = state.masterDetailByCategoryReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { roles, plants, companys, masterDetail, masterDetails, masterDetailCategory, masterDetailsCategory, errorType, errorMessage };
}

export default connect(mapStateToProps, { saveUserData, getCompanyMaster, getPlantMaster, getRoleMasterData, getModuleMasterData, getMasterDetailsBymasterCategoryCode })(UserAddEdit)