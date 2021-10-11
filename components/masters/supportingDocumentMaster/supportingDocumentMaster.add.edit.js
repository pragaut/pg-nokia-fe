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

class SupportingDocumentMasterAddEdit extends Wrapper {


    configs = [{
        name: 'documentCategoryId',
        type: 'string',
        required: true
    },
    {
        name: 'documentName',
        type: 'string',
        required: true
    },
    {
        name: 'documentCode',
        type: 'string',
        required: true
    }
    ];

    constructor(props) {
        super(props);


        this.state = {
            supportingDocumentMaster: props.baseObject ? props.baseObject : {},
            masterDetailsCategory: [],
            selectedIds: [],
            fileRequiredTypeDDL: [
                {
                    text: 'Single',
                    value: 'Single'
                },
                {
                    text: 'Multiple',
                    value: 'Multiple'
                }
            ],
            boolValueDDL: [
                {
                    text: 'Yes',
                    value: 'true'
                },
                {
                    text: 'No',
                    value: 'false'
                }
            ],

        };
    };


    onValueChanged = key => event => {
        const existingGroup = Object.assign({}, this.state.supportingDocumentMaster);
        existingGroup[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ supportingDocumentMaster: existingGroup });
    };


    componentDidMount() {
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, 'Supporting_Document_Category');
        setTimeout(() => {
            this.setState({ masterDetailsCategory: this.props.masterDetailsCategory })
        }, 200);

    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.masterDetailsCategory !== null && nextProps.masterDetailsCategory !== undefined && nextProps.masterDetailsCategory !== this.state.masterDetailsCategory) {
            this.setState({
                masterDetailsCategory: nextProps.masterDetailsCategory
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,'City_Master');
        if (nextProps.masterDetailsCategory !== null && nextProps.masterDetailsCategory !== undefined && nextProps.masterDetailsCategory !== this.state.masterDetailsCategory) {
            this.setState({
                masterDetailsCategory: nextProps.masterDetailsCategory
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

    render() {
        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '95vw' }}>
                {/* <ModalHeader
                    heading="Group Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SPAN>Document Category</SPAN>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT label="Frequency:" defaultValue={this.state.supportingDocumentMaster.documentCategoryId} onChange={this.onValueChanged('documentCategoryId')}>
                                    <option>Select Category</option>
                                    {
                                        this.state.masterDetailsCategory && this.state.masterDetailsCategory.length > 0 && this.state.masterDetailsCategory.map((item, index) => {
                                            return <option key={index} value={item.id} selected={item.id === this.state.supportingDocumentMaster.documentCategoryId ? true : false} >{item.value}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Document Name:"  focusbordercolor="#f90707"  type='text' defaultValue={this.state.supportingDocumentMaster.documentName} onChange={this.onValueChanged('documentName')} />
                            <Input label="Document Code:"  focusbordercolor="#f90707"  type='text' defaultValue={this.state.supportingDocumentMaster.documentCode} onChange={this.onValueChanged('documentCode')} />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SPAN>Is Mandatory</SPAN>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT label="Mandatory:" defaultValue={this.state.supportingDocumentMaster.isMandatory} onChange={this.onValueChanged('isMandatory')}>
                                    {/* <option>Select</option> */}
                                    {
                                        this.state.boolValueDDL && this.state.boolValueDDL.map((item, index) => {
                                            return <option key={index} value={item.value} selected={item.value === this.state.supportingDocumentMaster.isMandatory ? true : false} >{item.text}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SPAN>File Required Type</SPAN>  {/* <Input label="City:" type='text' defaultValue={this.state.groupCompany.cityMasterId} onChange={this.onValueChanged('cityMasterId')} /> */}
                                <Gap h="5px" />
                                <SELECT label="File Required Type:" defaultValue={this.state.supportingDocumentMaster.fileRequiredType} onChange={this.onValueChanged('fileRequiredType')}>
                                    {/* <option>Select</option> */}
                                    {
                                        this.state.fileRequiredTypeDDL && this.state.fileRequiredTypeDDL.map((item, index) => {
                                            return <option key={index} value={item.value} selected={item.value === this.state.supportingDocumentMaster.fileRequiredType ? true : false} >{item.text}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Order: (optional)" type='number' defaultValue={this.state.supportingDocumentMaster.order} onChange={this.onValueChanged('order')} />
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        const validationText = validateInputs(this.state.supportingDocumentMaster, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        if (this.state.supportingDocumentMaster.isMandatory == null) {

                            const existingsupportingDocumentMaster = Object.assign({}, this.state.supportingDocumentMaster);
                            existingsupportingDocumentMaster["isMandatory"] = true;
                            this.setState({ supportingDocumentMaster: existingsupportingDocumentMaster });
                        }
                        if (this.state.supportingDocumentMaster.fileRequiredType == null) {

                            const existingsupportingDocumentMaster = Object.assign({}, this.state.supportingDocumentMaster);
                            existingsupportingDocumentMaster["fileRequiredType"] = 'Single';
                            this.setState({ supportingDocumentMaster: existingsupportingDocumentMaster });
                        }
                        // this.props.saveCompanyPlantMasterData(this.state.companyPlant, this.props.index);

                        setTimeout(() => {
                            this.props.onSave(this.state.supportingDocumentMaster, this.props.index);

                        }, 200);
                        setTimeout(() => {
                            const existingsupportingDocumentMaster = Object.assign({}, this.state.supportingDocumentMaster);
                            existingsupportingDocumentMaster["id"] = undefined;
                            existingsupportingDocumentMaster["order"] = parseInt(parseInt(this.state.supportingDocumentMaster.order) + parseInt(1));
                            this.setState({ supportingDocumentMaster: existingsupportingDocumentMaster });

                        }, 500);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

SupportingDocumentMasterAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {

    const { roles } = state.adminReducer;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;

    return { roles, masterDetailsCategory };

}


export default connect(mapStateToProps, { getMasterDetailsBymasterCategoryCode })(SupportingDocumentMasterAddEdit)