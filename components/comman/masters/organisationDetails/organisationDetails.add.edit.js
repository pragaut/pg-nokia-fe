import Wrapper from '../../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants';
import { SELECT, SpanLabelForDDl } from '../../../comman/formStyle'
//import { getRolesByGroupId } from '../../../actions/admin.action';
import { getOrgRelationTypeMasterData, getGroupMasterData, getOrganisationDetailsData, saveOrganisationDetails, deleteOrganisationDetailsData, getOrganisationDetailsDataById, getCountryMasterData, getStateMasterData, getCityMasterData } from '../../../../actions/comman/admin.action';
import style from '../../../../theme/app.scss';
import * as adminActionType from '../../../../action-types/comman/admin.action.types';
import ModalHeader from '../../../shared/ModalHeader';
import Input from '../../../shared/InputBox';
import styledComponentsCjs from 'styled-components';
import Gap from '../../../comman/Gap'

const SPAN = styledComponentsCjs.div` 
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 13px;
    font-family: Asap;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em; 
`;

class OrganisationDetailsAddEdit extends Wrapper {


    configs = [{
        name: 'groupId',
        displayname: 'Group',
        type: 'string',
        required: true
    }, {
        name : 'orgRelationTypeId',
        displayname: 'Org Relation Type',
        type: 'string',
        required: true
    }, {
        name: 'orgName',
        displayname: 'Organisation Name',
        type: 'string',
        required: true
    },
    {
        name: 'orgCode',
        displayname: 'Organisation Code',
        type: 'string',
        required: true
    },
    {
        name: 'email',
        displayname: 'Email',
        type: 'string',
        required: true
    },
    {
        name: 'phone',
        displayname: 'phone',
        type: 'string',
        required: true
    }
    ];

    constructor(props) {
        super(props);


        this.state = {
            organisation: props.baseObject ? props.baseObject : {},
            groups: [],
            orgRelationTypes: [],
            parentOrganisations: [],
            citys: [],
            states: [],
            countrys: []
        };
    };


    onValueChanged = key => event => {
        const existingState = Object.assign({}, this.state.organisation);
        existingState[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ organisation: existingState });
    };
    onValueChangedCountry = key => event => {
        const existingState = Object.assign({}, this.state.organisation);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingState[key] = SelectedValue;
        existingState["stateId"] = null;
        existingState["cityId"] = null;       
        if(!SelectedValue && SelectedValue ==='')
        {
            SelectedValue = 'No-Id';
        }      
        this.props.getStateMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, SelectedValue);
        this.props.getCityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, 'No-Id');
        this.setState({ organisation: existingState });
    };
    onValueChangedState = key => event => {
        const existingCity = Object.assign({}, this.state.organisation);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingCity[key] = SelectedValue;
        this.props.getCityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, SelectedValue);

        this.setState({ organisation: existingCity });
    };
    onValueChangedGroup = key => event => {
        const existingState = Object.assign({}, this.state.organisation);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingState[key] = SelectedValue;
        this.props.getOrgRelationTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,SelectedValue);

        this.setState({ organisation: existingState });
    };

    componentDidMount() {
        // this.props.getCityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getCountryMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        //  this.props.getStateMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getGroupMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrgRelationTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined)
        if (this.state.organisation.countryId) {
            this.props.getStateMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, this.state.organisation.countryId);
        }
        if (this.state.organisation.stateId) {
            this.props.getCityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, this.state.organisation.stateId);
        }
        // let's pull the relational (child) tables
    };


    UNSAFE_componentWillReceiveProps(nextProps) {
        // this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'City_Master');
        if (nextProps && nextProps.groups && nextProps.groups !== this.state.groups) {
            this.setState({ groups: nextProps.groups })
        }
        if (nextProps && nextProps.orgRelationTypes && nextProps.orgRelationTypes !== this.state.orgRelationTypes) {
            this.setState({ orgRelationTypes: nextProps.orgRelationTypes })
        }
        if (nextProps && nextProps.citys && nextProps.citys !== null && nextProps.citys !== undefined && nextProps.citys !== 'undefined' && nextProps.citys !== this.state.citys) {
            this.setState({
                citys: nextProps.citys
            })
        }
        if (nextProps && nextProps.states && nextProps.states !== null && nextProps.states !== undefined && nextProps.states !== 'undefined' && nextProps.states !== this.state.states) {
            this.setState({
                states: nextProps.states
            })
        }
        if (nextProps && nextProps.countrys && nextProps.countrys !== null && nextProps.countrys !== undefined && nextProps.countrys !== 'undefined' && nextProps.countrys !== this.state.countrys) {
            this.setState({
                countrys: nextProps.countrys
            })
        }
        if (nextProps && nextProps.organisations && nextProps.organisations !== null && nextProps.organisations !== undefined && nextProps.organisations !== 'undefined' && nextProps.organisations !== this.state.organisations) {
            this.setState({
                organisations: nextProps.organisations
            })
            let organisations = nextProps.organisations;
            let parentOrganisationData = organisations && organisations.length > 0 && organisations.filter(item => (item.isParent === true || item.isParent === 1));
            this.setState({ parentOrganisations: parentOrganisationData })
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
console.log("this.state.organisation",this.state.organisation);
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
                           
                            <div style={{ padding: '7px', width: '100%' }}>
                                <SpanLabelForDDl>Group</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.organisation.groupId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChangedGroup('groupId')}
                                >
                                    <option key="a0" value="" >--- Select Group ---</option>

                                    {this.state.groups &&
                                        this.state.groups.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.groupName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Org Relation Type</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.organisation.orgRelationTypeId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('orgRelationTypeId')}
                                >
                                    <option key="a0" value="" >--- Select Org Type ---</option>

                                    {this.state.orgRelationTypes &&
                                        this.state.orgRelationTypes.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.orgRelationType}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Parent Organisation</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.organisation.orgDetailsParentId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('orgDetailsParentId')}
                                >
                                    <option key="a0" value="" >--- Select Organisation ---</option>

                                    {this.state.parentOrganisations &&
                                        this.state.parentOrganisations.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.orgName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Organisation :" focusbordercolor="#f90707" type='text' defaultValue={this.state.organisation.orgName} onChange={this.onValueChanged('orgName')} />
                            <Input label="Code: " focusbordercolor="#f90707" type='text' defaultValue={this.state.organisation.orgCode} onChange={this.onValueChanged('orgCode')} />
                            <Input label="Email: " focusbordercolor="#f90707" type='email' defaultValue={this.state.organisation.email} onChange={this.onValueChanged('email')} />
                            <Input label="Phone: " focusbordercolor="#f90707" type='number' defaultValue={this.state.organisation.phone} onChange={this.onValueChanged('phone')} />


                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <Input label="Registered Address: (optional)" focusbordercolor="#f90707" type='text' defaultValue={this.state.organisation.regOffAddress} onChange={this.onValueChanged('regOffAddress')} />
                            <Input label="Corporate Address: (optional)" focusbordercolor="#f90707" type='text' defaultValue={this.state.organisation.corpOffAddress} onChange={this.onValueChanged('corpOffAddress')} />
                            <Input label="GST Number: (optional)" type='text' defaultValue={this.state.organisation.orgGST} onChange={this.onValueChanged('orgGST')} />
                            <div style={{ padding: '10px 10px 20px 10px', width: '100%', display: 'flex' }}>
                                <input type="checkbox" checked={this.state.organisation.isParent} onChange={this.onValueChanged('isParent')} />
                                <SpanLabelForDDl>Is Parent: (optional)</SpanLabelForDDl>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Country</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.organisation.countryId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChangedCountry('countryId')}
                                >
                                    <option key="a0" value="" >--- Select Country ---</option>

                                    {this.state.countrys &&
                                        this.state.countrys.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.countryName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                           
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>State</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.organisation.stateId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChangedState('stateId')}
                                >
                                    <option key="a0" value="" >--- Select State ---</option>

                                    {this.state.states &&
                                        this.state.states.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.stateName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>City</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.organisation.cityId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('cityId')}
                                >
                                    <option key="a0" value="" >--- Select city ---</option>

                                    {this.state.states &&
                                        this.state.citys.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.cityName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '100%', alignItems: 'left', justifyContent: 'left', margin: '10px 0px' }}>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.primary_btn} onClick={() => {
                            const validationText = validateInputs(this.state.organisation, this.configs);
                            if (validationText) {
                                return alert(validationText);                            }
                            const existinorganisation = Object.assign({}, this.state.organisation);
                            if(this.state.organisation && (!this.state.organisation.isParent || this.state.organisation.isParent ==''))
                            existinorganisation["isParent"] = false;
                            this.props.saveOrganisationDetails(existinorganisation, this.props.index);
                        }}>save</button>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

OrganisationDetailsAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {

    const { groups, orgRelationTypes, organisationActiontype, citys, states, countrys, organisation, organisations } = state.adminReducer;

    return { groups, orgRelationTypes, organisationActiontype, citys, states, countrys, organisations };

}


export default connect(mapStateToProps, { getGroupMasterData, getOrgRelationTypeMasterData, getCountryMasterData, getStateMasterData, getCityMasterData, getOrganisationDetailsDataById, getOrganisationDetailsData, saveOrganisationDetails, deleteOrganisationDetailsData })(OrganisationDetailsAddEdit)