import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { SELECT, SpanLabelForDDl } from '../../formStyle'
import {getOrgRelationTypeMasterData, getOrganisationDetailsData,getGenderMasterData, getOrganisationEmployeeDetailsData, saveOrganisationEmployeeDetails, deleteOrganisationEmployeeDetailsData, getOrganisationEmployeeDetailsDataById} from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import * as adminActionType from '../../../action-types/admin.action.types';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import styledComponentsCjs from 'styled-components';
import Gap from '../../Gap'

const SPAN = styledComponentsCjs.div` 
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 13px;
    font-family: Asap;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em; 
`;

class OrganisationEmployeeDetailsAddEdit extends Wrapper {


    configs = [{
        name: 'orgDetailsId',
        type: 'string',
        required: true
    }, {
        name: 'employeeName',
        type: 'string',
        required: true
    }, {
        name: 'employeeCode',
        type: 'string',
        required: true
    }, {
        name: 'genderId',
        type: 'string',
        required: true
    }
    , {
        name: 'email',
        type: 'string',
        required: true
    }
    , {
        name: 'mobile',
        type: 'string',
        required: true
    }
    ];

    constructor(props) {
        super(props);


        this.state = {
            orgEmployee: props.baseObject ? props.baseObject : {},
            orgRelationTypes: [],
            organisations: [],
            genders: [],
            isOtherNationalityTBVisible:null
        };
    };


    onValueChanged = key => event => {
        const existingState = Object.assign({}, this.state.orgEmployee);
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
       this.setState({ orgEmployee: existingState });
    };
    onValueChangedNationality = key => event => {
        const existingState = Object.assign({}, this.state.orgEmployee);
        let SelectedValue = event.target.value && event.target.value;
        
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;       
        if(SelectedValue && SelectedValue==="false")
        {
            this.setState({ isOtherNationalityTBVisible: true });
            existingState["isIndian"] = false; 
        }
        else
        {
            this.setState({ isOtherNationalityTBVisible: false });
            existingState["isIndian"] = true; 
            existingState["otherNationality"] = null;
        }
        this.setState({ orgEmployee: existingState });
    };

    onValueChangedOrgRelationType = key => event => {
        const existingState = Object.assign({}, this.state.orgEmployee);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingState[key] = SelectedValue;

        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, existingState);    
        this.setState({ orgEmployee: existingState });
    };

    componentDidMount() {
        this.props.getOrgRelationTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getGenderMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationEmployeeDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);      
      
       
        // let's pull the relational (child) tables
    };


    UNSAFE_componentWillReceiveProps(nextProps) {
        // this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'City_Master');
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
        if (nextProps.companyActiontype && nextProps.organisationActiontype === adminActionType.ORGANISATIONDETAILS_SAVE_SUCCESS) {
            this.props.onCancel();
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
        let isIndian = "";
        let isOther = "";
        if(this.state.orgEmployee && (this.state.orgEmployee.isIndian===false || this.state.orgEmployee.isIndian===0))
        {
             isOther = true;
        }
        else{
            isIndian = true;
        }
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
                                <SpanLabelForDDl>Organisation Relation Type</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.orgEmployee.orgRelationTypeId} paddingLeft="10px" borderRadius="14px" height="51px"
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
                                    value={this.state.orgEmployee.orgDetailsId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('orgDetailsId')}
                                >
                                    <option key="a0" value="" >--- Select Organisation ---</option>

                                    {this.state.organisations &&
                                        this.state.organisations.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.orgName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Employee Name:" focusbordercolor="#f90707" type='text' defaultValue={this.state.orgEmployee.employeeName} onChange={this.onValueChanged('employeeName')} />
                            <Input label="Employee Code:" focusbordercolor="#f90707" type='text' defaultValue={this.state.orgEmployee.employeeCode} onChange={this.onValueChanged('employeeCode')} />
                            <Input label="Email:" focusbordercolor="#f90707" type='email' defaultValue={this.state.orgEmployee.email} onChange={this.onValueChanged('email')} />
                            <Input label="Mobile:" focusbordercolor="#f90707" type='number' defaultValue={this.state.orgEmployee.mobile} onChange={this.onValueChanged('mobile')} />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <Input label="Date of Birth:" focusbordercolor="#f90707" type='date' defaultValue={this.state.orgEmployee.dateOfBirth} onChange={this.onValueChanged('dateOfBirth')} />
                            <Input label="Father Name: (optional)" focusbordercolor="#f90707" type='text' defaultValue={this.state.orgEmployee.fatherName} onChange={this.onValueChanged('fatherName')} />
                            <Input label="Mother Name: (optional)" type='text' defaultValue={this.state.orgEmployee.motherName} onChange={this.onValueChanged('motherName')} />
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Gender</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.orgEmployee.genderId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('genderId')}
                                >
                                    <option key="a0" value="" >--- Select gender ---</option>

                                    {this.state.genders &&
                                        this.state.genders.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.genderName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>                           
                            <Gap h="15px" />
                            <div style={{ padding: '10px 10px 20px 10px', width: '100%', display: 'flex' }}>
                                {/* <input type="checkbox" checked={this.state.orgEmployee.isIndian} onChange={this.onValueChanged('isIndian')} />
                                <SpanLabelForDDl>Is Indian:</SpanLabelForDDl> */}
                                <input type="radio" value="true" onChange={this.onValueChangedNationality('isIndian')} name="gender" checked={isIndian}/> Is Indian
                                <input type="radio" value="false" onChange={this.onValueChangedNationality('isIndian')} name="gender" checked={isOther}/> Other
                            </div>
                            {this.state.orgEmployee && (this.state.orgEmployee.isIndian===false || this.state.orgEmployee.isIndian===0) && 
                            <>
                             <Input label="Other Nationality" focusbordercolor="#f90707" type='text' defaultValue={this.state.orgEmployee.otherNationality} onChange={this.onValueChanged('otherNationality')} />
                            </>                            
                            }
                           
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', margin: '10px 0px' }}>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.primary_btn} onClick={() => {
                            const validationText = validateInputs(this.state.orgEmployee, this.configs);
                            if (validationText) {
                                return alert(validationText);
                            }
                            const existinorganisationEmployee = Object.assign({}, this.state.orgEmployee);
                            this.props.saveOrganisationEmployeeDetails(existinorganisationEmployee, this.props.index);
                        }}>save</button>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

OrganisationEmployeeDetailsAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {

    const { genders, orgRelationTypes ,organisations, orgEmployees,orgEmployee,orgEmployeeeActiontype, orgEmployeeRecordsCount } = state.adminReducer;

    return { genders, orgRelationTypes ,organisations, orgEmployees,orgEmployee,orgEmployeeeActiontype, orgEmployeeRecordsCount };

}


export default connect(mapStateToProps, { getOrgRelationTypeMasterData, getOrganisationDetailsData,getGenderMasterData, getOrganisationEmployeeDetailsData, saveOrganisationEmployeeDetails, deleteOrganisationEmployeeDetailsData, getOrganisationEmployeeDetailsDataById})(OrganisationEmployeeDetailsAddEdit)