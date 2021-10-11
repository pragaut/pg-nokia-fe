import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { SELECT, SpanLabelForDDl } from '../../formStyle'
//import { getRolesByGroupId } from '../../../actions/admin.action';
import { getGroupMasterData, getCompanyMasterById, getCompanyMaster, deleteCompanyMaster, saveCompanyMasterData, getCompanyMasterByGroupId, initCompanyMaster } from '../../../actions/admin.action';
import { getYearTypeMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import { getMasterDetailsBymasterCategoryCode } from '../../../actions/masterDetails.actions';
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

class GroupAddEdit extends Wrapper {


    configs = [{
        name: 'companyName',
        type: 'string',
        required: true
    }, {
        name: 'companyCode',
        type: 'string',
        required: true
    }, {
        name: 'yearTypeMasterId',
        displayname: 'Year Type',
        type: 'string',
        required: true
    }
    ];

    constructor(props) {
        super(props);


        this.state = {
            company: props.baseObject ? props.baseObject : {},
            groups: [],
            yearTypes: []

        };
    };


    onValueChanged = key => event => {
        const existingGroup = Object.assign({}, this.state.company);
        existingGroup[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ company: existingGroup });
    };


    componentDidMount() {
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, 'city');
        this.props.getGroupMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getYearTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        // let's pull the relational (child) tables
    };


    UNSAFE_componentWillReceiveProps(nextProps) {
        // this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'City_Master');
        if (nextProps && nextProps.groups && nextProps.groups !== this.state.groups) {
            this.setState({ groups: nextProps.groups })
        }
        if (nextProps && nextProps.yearTypes && nextProps.yearTypes !== this.state.yearTypes) {
            this.setState({ yearTypes: nextProps.yearTypes })
        }
        if (nextProps.companyActiontype && nextProps.companyActiontype === adminActionType.COMPANYMASTER_SAVE_SUCCESS) {
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
        const Group = this.state.groups && this.state.groups.length > 0 && this.state.groups[0].id;
        if (!this.state.company.groupMasterID || this.state.company.groupMasterID === '' || this.state.company.groupMasterID === undefined) {
            const state = {};
            this.state.company.groupMasterID = Group;
            setTimeout(() => {
                this.setState({
                    ...state
                }, () => {
                    // console.log("state", this.state)
                });
            }, 200);

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
                                <SpanLabelForDDl>Group</SpanLabelForDDl>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT value={this.state.company.groupMasterID} onChange={this.onValueChanged('groupMasterID')}>
                                    {
                                        this.state.groups && this.state.groups.length > 0 &&
                                        this.state.groups.map((item, index) => {
                                            console.log("Group Name", item.groupName);
                                            return <option key={index} value={item.id} >{item.groupName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Company Name:" focusbordercolor="#f90707" type='text' defaultValue={this.state.company.companyName} onChange={this.onValueChanged('companyName')} />
                            <Input label="Sort Name:" focusbordercolor="#f90707" type='text' defaultValue={this.state.company.companySortName} onChange={this.onValueChanged('companySortName')} />
                            {/* <Input label="Email: (optional)" type='text' defaultValue={this.state.company.companyEmail} onChange={this.onValueChanged('companyEmail')} /> */}


                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            {/* <Input label="GST Number: (optional)" type='text' defaultValue={this.state.company.GSTNumber} onChange={this.onValueChanged('GSTNumber')} />
                            <Input label="TAN Number: (Optional)" type='text' defaultValue={this.state.company.TANNumber} onChange={this.onValueChanged('TANNumber')} /> */}
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Audit Cycle</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.company.yearTypeMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('yearTypeMasterId')}
                                >
                                    <option key="a0" value="" >--- Select Type ---</option>

                                    {this.state.yearTypes &&
                                        this.state.yearTypes.map((item, index) => {

                                            return <option key={index} value={item.id}>{item.yearTypeName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label=" Code:" focusbordercolor="#f90707" type='text' defaultValue={this.state.company.companyCode} onChange={this.onValueChanged('companyCode')} />
                            {/* <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>City</SpanLabelForDDl> 
                                <Gap h="5px" />
                                <SELECT label="City:" defaultValue={this.state.company.cityMasterId} onChange={this.onValueChanged('cityMasterId')}>
                                    <option>Select City</option>
                                    {
                                        this.props.masterDetailsCategory && this.props.masterDetailsCategory.length > 0 &&
                                        this.props.masterDetailsCategory.map((item, index) => {
                                            return <option key={index} value={item.id} >{item.valueWithParent}</option>
                                        })
                                    }
                                </SELECT>
                            </div> */}

                            <Gap h="15px" />
                            {/* <Input label="Is Central Group: (optional)" type='checkbox' checked={this.state.company.isCentralGroup} onChange={this.onValueChanged('isCentralGroup')} /> */}
                            <div style={{ padding: '10px 10px 20px 10px', width: '100%', display: 'flex' }}>
                                <input type="checkbox" checked={this.state.company.isCentralGroup} onChange={this.onValueChanged('isCentralGroup')} />
                                <SpanLabelForDDl>Is Central Group: (optional)</SpanLabelForDDl>
                            </div>
                            {/* <div style={{ padding: '10px', width: '100%', display: 'flex' }}>
                                <input type="checkbox" checked={this.state.company.isPlantWiseDataRequired} onChange={this.onValueChanged('isPlantWiseDataRequired')} />
                                <SpanLabelForDDl>Plant Wise data Required: (optional)</SpanLabelForDDl>
                            </div>  */}
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', margin: '10px 0px' }}>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.primary_btn} onClick={() => {
                            const validationText = validateInputs(this.state.company, this.configs);
                            if (validationText) {
                                return alert(validationText);
                            }
                            const existincompany = Object.assign({}, this.state.company);
                            existincompany["isPlantWiseDataRequired"] = true;

                            this.props.saveCompanyMasterData(existincompany, this.props.index);
                            //this.props.onSave(this.state.group, this.props.index);
                            // setTimeout(() => {
                            //      existincompany["id"] = undefined;
                            //     this.setState({ company: existincompany });

                            // }, 500);
                        }}>save</button>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

GroupAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;

    const { groups, yearTypes, companyActiontype } = state.adminReducer;

    return { masterDetailsCategory, groups, companyActiontype, yearTypes };

}


export default connect(mapStateToProps, { getGroupMasterData, getMasterDetailsBymasterCategoryCode, getCompanyMasterById, getCompanyMaster, deleteCompanyMaster, saveCompanyMasterData, getCompanyMasterByGroupId, initCompanyMaster, getYearTypeMasterData })(GroupAddEdit)