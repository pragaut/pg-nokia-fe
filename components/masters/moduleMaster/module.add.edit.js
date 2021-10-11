import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';

import RolesAddEdit from '../roleMaster/role.add.edit';
//import { getRolesByModuleId } from '../../../actions/admin.action';
import { getModuleMasterData, saveModuleMasterData, getModuleMasterDataById, deleteModuleMasterData, getGroupMasterData } from '../../../actions/admin.action';

import style from '../../../theme/app.scss';

import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT } from '../../formStyle';

class ModuleAddEdit extends Wrapper {

    configs = [{
        name: 'moduleName',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.groupMasterIdRefs = React.createRef();

        this.state = {
            module: props.baseObject ? props.baseObject : {},
            ddlData: [
                {
                    text: 'No',
                    id: 0,
                    selected: true,
                    lable: 'No',
                    value: false,
                    key: 'isSuperAdmin',
                },
                {
                    text: 'Yes',
                    id: true,
                    selected: false,
                    lable: 'Yes',
                    value: true,
                    key: 'isSuperAdmin'
                }
            ]
        };
    };

    onValueChanged = key => event => {
        const existingModule = Object.assign({}, this.state.module);
        existingModule[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ module: existingModule });
    };

    componentDidMount() {
        this.props.getGroupMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
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
            <div className={style.modal_dialog} style={{ width: '97%', maxHeight: '90vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="Module Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '30%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <lable style={{ marginLeft: "8px" }}>Select Group</lable>
                            <SELECT margin="8px" ref={this.groupMasterIdRefs}
                                value={this.state.module.groupMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('groupMasterId')}
                            >
                                {this.props.groups &&
                                    this.props.groups.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.groupName}</option>
                                    })
                                }
                            </SELECT>
                            <Input label="Name:" type='text' defaultValue={this.state.module.moduleName} onChange={this.onValueChanged('moduleName')} />
                            <Input label="Code:" type='text' defaultValue={this.state.module.moduleCode} onChange={this.onValueChanged('moduleCode')} />
                            <Input label="Module Url:" type='text' defaultValue={this.state.module.moduleUrl} onChange={this.onValueChanged('moduleUrl')} />
                            <Input label="Email-Id:" type='text' defaultValue={this.state.module.emailId} onChange={this.onValueChanged('emailId')} />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '30%' , color: "rgba(0,0,0,0.54)", fontSize: "13px"}}>
                            <Input label="Password:" type='text' defaultValue={this.state.module.password} onChange={this.onValueChanged('password')} />
                            <Input label="Host Name:" type='text' defaultValue={this.state.module.hostName} onChange={this.onValueChanged('hostName')} />
                            <Input label="Port No.:" type='text' defaultValue={this.state.module.portNo} onChange={this.onValueChanged('portNo')} />
                            {/* <Input label="ssl:" type='text' defaultValue={this.state.module.ssl} onChange={this.onValueChanged('ssl')} /> */}
                            <lable style={{ marginLeft: "8px" }}>Is Superadmin</lable>
                            <SELECT margin="8px"
                                value={this.state.module.ssl} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('ssl')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                        </div>
                        <div className={style.field_flex_new} style={{ width: '30%' }}>
                            <Input label="SMTP UserName:" type='text' defaultValue={this.state.module.smtpUserName} onChange={this.onValueChanged('smtpUserName')} />
                            <Input label="SMTP Password:" type='text' defaultValue={this.state.module.smptPassword} onChange={this.onValueChanged('smptPassword')} />
                            <Input label="SMTP PasswordSalt:" type='text' defaultValue={this.state.module.smtpPasswordSalt} onChange={this.onValueChanged('smtpPasswordSalt')} />
                            <Input label="Order:" type='number' defaultValue={this.state.module.order} onChange={this.onValueChanged('order')} />
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        const validationText = validateInputs(this.state.module, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        if (this.state.module.groupMasterId == null) {
                         //   console.log("this.groupMasterIdRefs.current", this.groupMasterIdRefs.current.value);

                            const existingModule = Object.assign({}, this.state.module);
                            existingModule["moduleMasterId"] = this.groupMasterIdRefs.current.value;
                            this.setState({ module: existingModule });
                        }
                        setTimeout(() => {
                            //this.props.saveModuleMasterData(this.state.module, this.props.index);
                            this.props.onSave(this.state.module, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

ModuleAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { groups } = state.adminReducer;
    return { groups };
}


export default connect(mapStateToProps, { getModuleMasterData, saveModuleMasterData, getModuleMasterDataById, deleteModuleMasterData, getGroupMasterData })(ModuleAddEdit)