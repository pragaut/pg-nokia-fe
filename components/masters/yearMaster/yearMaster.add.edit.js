import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs,validateInputsWithDisplayName } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants'; 
import { getYearTypeMasterData } from '../../../actions/admin.action';
//import { getRolesByGroupId } from '../../../actions/admin.action';
import {saveYearMasterData } from '../../../actions/admin.action';
import { SELECT,SpanLabelForDDl } from '../../formStyle';
import style from '../../../theme/app.scss';
import styledComponentsCjs from 'styled-components';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
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
        name: 'yearTypeMasterId',
        displayname:'Year Type',
        type: 'string',
        required: true
    },{
        name: 'yearName',
        displayname:'Year Name',
        type: 'string',
        required: true
    },
    {
        name: 'yearCode',
        displayname:'Year Code',
        type: 'string',
        required: true
    },
    {
        name: 'startDate',
        displayname:'Start Date',
        type: 'string',
        required: true
    },
    {
        name: 'enddate',
        displayname:'End Date',
        type: 'string',
        required: true
    }
];

    constructor(props) {
        super(props);


        this.state = {
            year: props.baseObject ? props.baseObject : {},

        };
    };


    onValueChanged = key => event => {
        const existingGroup = Object.assign({}, this.state.year);
        existingGroup[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ year: existingGroup });
    };


    componentDidMount() {
        // let's pull the relational (child) tables
        this.props.getYearTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };


    UNSAFE_componentWillReceiveProps(nextProps) {

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
                        <SpanLabelForDDl>Year Type</SpanLabelForDDl>
                            <Gap h="5px" />
                            <SELECT 
                                value={this.state.year.yearTypeMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('yearTypeMasterId')}
                            >
                                <option key="a0" value="" >--- Select Type ---</option>
                                
                                {this.props.yearTypes &&
                                    this.props.yearTypes.map((item, index) => {
                                     
                                        return <option key={index} value={item.id}>{item.yearTypeName}</option>
                                    })
                                }
                            </SELECT>
                            </div>
                            <Input label="Year Name:"  focusbordercolor="#f90707"  type='text' defaultValue={this.state.year.yearName} onChange={this.onValueChanged('yearName')} />
                            <Input label=" Code:"  focusbordercolor="#f90707"  type='text' defaultValue={this.state.year.yearCode} onChange={this.onValueChanged('yearCode')} />
                                              </div>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <Input label="Start Date:"  focusbordercolor="#f90707"  type='date' defaultValue={this.state.year.startDate} onChange={this.onValueChanged('startDate')} />
                            <Input label="End date:" focusbordercolor="#f90707"  type='date' defaultValue={this.state.year.enddate} onChange={this.onValueChanged('enddate')} />
                        </div>
                        
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', margin: '10px 0px' }}>
                    <button className={style.primary_btn} 
                    style={{width:'100px',marginRight:'10px'}}
                    onClick={() => {
                        console.log("this.configs",this.configs);
                        const validationText = validateInputs(this.state.year, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        
                        this.props.saveYearMasterData(this.state.year, this.props.index);
                        //this.props.onSave(this.state.group, this.props.index);
                        setTimeout(() => {
                            const existingyear = Object.assign({}, this.state.year);
                            existingyear["id"] =undefined; 
                             this.setState({ year: existingyear });
                       
                        }, 500); 
                    }}>save</button>
                    <button   style={{width:'100px',marginRight:'10px'}} className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

GroupAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { yearTypes } = state.adminReducer;
    return { yearTypes };
}


export default connect(mapStateToProps, { saveYearMasterData, getYearTypeMasterData })(GroupAddEdit)