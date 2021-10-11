import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { SELECT, SpanLabelForDDl } from '../../formStyle'
//import { getRolesByGroupId } from '../../../actions/admin.action';
import { getGroupMasterData, getCompanyMasterById, getCompanyMaster, savePlantMasterData, getCompanyMasterByGroupId, initPlantMaster } from '../../../actions/admin.action';

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
        name: 'plantName',
        type: 'string',
        required: true
    },
    {
        name: 'plantCode',
        type: 'string',
        required: true
    }
    ];

    constructor(props) {
        super(props);


        this.state = {
            companys: [],
            plant: props.baseObject ? props.baseObject : {},

        };
    };


    onValueChanged = key => event => {
        const existingGroup = Object.assign({}, this.state.plant);
        existingGroup[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ plant: existingGroup });
    };


    componentDidMount() {
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, 'city');
        this.props.getGroupMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);

        const GroupID = this.props.groups && this.props.groups.length > 0 && this.props.groups[0].id;

        this.props.getCompanyMasterByGroupId(GroupID)
        // let's pull the relational (child) tables
    };


    UNSAFE_componentWillReceiveProps(nextProps) {
        // this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'City_Master');
        if (nextProps.companys && nextProps.companys !== null && nextProps.companys != this.state.companys) {
            this.setState({ companys: nextProps.companys })
        }
        if (nextProps.plantActiontype && nextProps.plantActiontype === adminActionType.PLANTMASTER_SAVE_SUCCESS) {
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
        //console.log("Company master ID", this.state.plant.companyMasterID)
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
                                <SpanLabelForDDl>Company</SpanLabelForDDl>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT label="Company:" defaultValue={this.state.plant.companyMasterID} onChange={this.onValueChanged('companyMasterID')}>
                                    <option>Select Group Company</option>
                                    {
                                        this.state.companys && this.state.companys.length > 0 &&
                                        this.state.companys.map((item, index) => {
                                            return <option key={index} value={item.id} selected={item.id === this.state.plant.companyMasterID ? true : false} >{item.companyName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Plant Name:" focusbordercolor="#f90707" type='text' defaultValue={this.state.plant.plantName} onChange={this.onValueChanged('plantName')} />
                            <Input label="Sort Name:" focusbordercolor="#f90707" type='text' defaultValue={this.state.plant.plantSortName} onChange={this.onValueChanged('plantSortName')} />
                            {/* <Input label="Plant Email: (optional)" type='email' defaultValue={this.state.plant.plantEmail} onChange={this.onValueChanged('plantEmail')} /> */}
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            {/* <Input label="GST Number: (optional)" type='text' defaultValue={this.state.plant.GSTNumber} onChange={this.onValueChanged('GSTNumber')} />
                            <Input label="TAN Number: (optional)" type='text' defaultValue={this.state.plant.TANNumber} onChange={this.onValueChanged('TANNumber')} />

                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>City</SpanLabelForDDl>  
                                <Gap h="5px" />
                                <SELECT label="City:" defaultValue={this.state.plant.cityMasterId} onChange={this.onValueChanged('cityMasterId')}>
                                    <option>Select City</option>
                                    {
                                        this.props.masterDetailsCategory && this.props.masterDetailsCategory.length > 0 &&
                                        this.props.masterDetailsCategory.map((item, index) => {
                                            return <option key={index} value={item.id} >{item.valueWithParent}</option>
                                        })
                                    }
                                </SELECT>
                            </div> */}
                            <Input label="Code:" focusbordercolor="#f90707" type='text' defaultValue={this.state.plant.plantCode} onChange={this.onValueChanged('plantCode')} />
                            <div style={{ padding: '10px', width: '100%', display: 'flex' }}>
                                <input type="checkbox" checked={this.state.plant.isCentralFunction} onChange={this.onValueChanged('isCentralFunction')} />
                                <SpanLabelForDDl>Is Central Plant: (check only in case of plant is central?)</SpanLabelForDDl>
                            </div>
                            {/* <Input label="Is Central Plant: (check only in case of plant is central?)" type='checkbox' checked={this.state.plant.isCentralFunction} onChange={this.onValueChanged('isCentralFunction')} /> */}

                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', margin: '10px 0px' }}>
                    <button className={style.primary_btn}
                        style={{ width: '100px', marginRight: '10px' }}
                        onClick={() => {
                            const validationText = validateInputs(this.state.plant, this.configs);
                            if (validationText) {
                                return alert(validationText);
                            }

                            // this.props.saveCompanyPlantMasterData(this.state.companyPlant, this.props.index);
                            this.props.onSave(this.state.plant, this.props.index);
                            // setTimeout(() => {
                            //     const existingplant = Object.assign({}, this.state.plant);
                            //     existingplant["id"] = undefined;
                            //     this.setState({ plant: existingplant });

                            // }, 500);
                        }}>save</button>
                    <button className={style.btn_danger}
                        style={{ width: '100px', marginRight: '10px' }}
                        onClick={this.props.onCancel}>cancel</button>
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

    const { groups, companys, plantActiontype } = state.adminReducer;

    return { masterDetailsCategory, plantActiontype, companys, groups };

}


export default connect(mapStateToProps, { getGroupMasterData, getCompanyMasterByGroupId, getMasterDetailsBymasterCategoryCode, getCompanyMasterById, getCompanyMaster, savePlantMasterData, getCompanyMasterByGroupId, initPlantMaster })(GroupAddEdit)