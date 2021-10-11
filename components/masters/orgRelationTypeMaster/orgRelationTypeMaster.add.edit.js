import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getGroupMasterData} from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT,SpanLabelForDDl } from '../../formStyle';
//import Select from 'react-select'

class OrgRelationTypeAddEdit extends Wrapper {

    configs = [{
        name: 'orgRelationType',
        type: 'string',
        required: true
    }, {
        name: 'groupId',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.moduleMasterIdRefs = React.createRef();
        this.state = {
            orgRelationType: props.baseObject ? props.baseObject : {}
        };
    };

    onValueChanged = key => event => {
        const existingOrgRelationType= Object.assign({}, this.state.orgRelationType);
        existingOrgRelationType[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ orgRelationType: existingOrgRelationType });
    };
    onTextChange = key => event => {
        const existingOrgRelationType = Object.assign({}, this.state.orgRelationType);
        existingOrgRelationType[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ orgRelationType: existingOrgRelationType });
    };

    componentDidMount() {
        this.props.getGroupMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
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
        console.log(" this.props.groups", this.props.groups)
        // console.log("roleCategory");
        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
              
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Group</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.orgRelationType.groupId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('groupId')}
                            >
                                <option key="a0" value="" >--- Select Group ---</option>
                                
                                {this.props.groups &&
                                    this.props.groups.map((item, index) => {                                     
                                        return <option key={index} value={item.id}>{item.groupName}</option>
                                    })
                                }
                            </SELECT>                          
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                        <Input label="Org Relation Type" type='text' defaultValue={this.state.orgRelationType.orgRelationType} onChange={this.onValueChanged('orgRelationType')} /> 
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        console.log(this.state.orgRelationType);
                        const validationText = validateInputs(this.state.orgRelationType, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }

                        //this.props.saveRoleMasterData(this.state.role, this.props.index);                       
                        setTimeout(() => {
                            this.props.onSave(this.state.orgRelationType, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

OrgRelationTypeAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { groups } = state.adminReducer;
    return { groups };
} 
export default connect(mapStateToProps, { getGroupMasterData })(OrgRelationTypeAddEdit)