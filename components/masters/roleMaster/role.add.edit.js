import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';

import RolesAddEdit from './role.add.edit';
//import { getRolesByRoleId } from '../../../actions/admin.action';
import { getRoleMasterData, saveRoleMasterData, getRoleMasterDataById, deleteRoleMasterData, getModuleMasterData } from '../../../actions/admin.action';

import style from '../../../theme/app.scss';

import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT, SpanLabelForDDl } from '../../formStyle';
//import Select from 'react-select'

class RoleAddEdit extends Wrapper {

    configs = [{
        name: 'roleName',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.moduleMasterIdRefs = React.createRef();

        this.state = {
            role: props.baseObject ? props.baseObject : {},
            modules: [],
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
            ],
            isPraGautAdminDdlData: [
                {
                    text: 'No',
                    id: 0,
                    selected: true,
                    lable: 'No',
                    value: false,
                    key: 'isPraGautAdmin',
                },
                {
                    text: 'Yes',
                    id: true,
                    selected: false,
                    lable: 'Yes',
                    value: true,
                    key: 'isPraGautAdmin'
                }
            ],
            RoleCategoryDDL: [
                {
                    text: 'AAPL Admin',
                    value: 'AAPL Admin'
                },
                {
                    text: 'Company Admin',
                    value: 'Company Admin'
                },
                {
                    text: 'User',
                    value: 'User'
                }
            ]

        };
    };

    onValueChanged = key => event => {
        const existingRole = Object.assign({}, this.state.role);
        existingRole[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ role: existingRole });
    };
    onTextChange = key => event => {
        const existingRole = Object.assign({}, this.state.role);
        existingRole[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ role: existingRole });
    };

    componentDidMount() {
        this.props.getModuleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.modules && nextProps.modules !== this.state.modules) {
            this.setState({ modules: nextProps.modules });
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
        console.log("this.state.modules",this.state.modules);
        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="Role Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Module</SpanLabelForDDl>
                            <SELECT margin="8px" ref={this.moduleMasterIdRefs}
                                value={this.state.role.moduleMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('moduleMasterId')}
                            >
                                {this.state.modules &&
                                    this.state.modules.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.moduleName}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Role Category</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.role.roleCategory} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('roleCategory')}
                            >
                                <option key='s0' value='-1'>Select Category</option>
                                {this.state.RoleCategoryDDL &&
                                    this.state.RoleCategoryDDL.map((item, index) => {
                                        return <option selected={item.value === this.state.role.roleCategory ? true : false} key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <Input label="Name:" type='text' defaultValue={this.state.role.roleName} onChange={this.onValueChanged('roleName')} />
                            <Input label=" Code:" type='text' defaultValue={this.state.role.roleCode} onChange={this.onValueChanged('roleCode')} />
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Superadmin</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.role.isSuperAdmin} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isSuperAdmin')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is PraGaut Admin</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.role.isPraGautAdmin} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isPraGautAdmin')}
                            >
                                {this.state.isPraGautAdminDdlData &&
                                    this.state.isPraGautAdminDdlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            {/* <Input label="Is Superadmin:" type='text' defaultValue={this.state.isSuperAdmin} onChange={this.onValueChanged('isSuperAdmin')} /> 
                      <      Input label="Is PraGaut Admin:" type='text' defaultValue={this.state.isPraGautAdmin} onChange={this.onValueChanged('isPraGautAdmin')} />*/}
                            <Input label="Dashboard Url:" type='text' defaultValue={this.state.role.dashboardUrl} onChange={this.onValueChanged('dashboardUrl')} />
                            <Input label="Order:" type='number' defaultValue={this.state.role.roleOrder} onChange={this.onValueChanged('roleOrder')} />
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', margin: '10px 0px' }}>
                    <button className={style.primary_btn}
                        style={{ width: '100px', marginRight: '10px' }}
                        onClick={() => {
                            const validationText = validateInputs(this.state.role, this.configs);
                            if (validationText) {
                                return alert(validationText);
                            }

                            //this.props.saveRoleMasterData(this.state.role, this.props.index);
                            if (this.state.role.moduleMasterId == null) {
                                // console.log("this.moduleMasterIdRefs.current", this.moduleMasterIdRefs.current.value);

                                const existingRole = Object.assign({}, this.state.role);
                                existingRole["moduleMasterId"] = this.moduleMasterIdRefs.current.value;
                                this.setState({ role: existingRole });
                            }
                            setTimeout(() => {
                                this.props.onSave(this.state.role, this.props.index);
                            }, 200);

                        }}>save</button>
                    <button className={style.btn_danger}
                        style={{ width: '100px' }}
                        onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

RoleAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { modules } = state.adminReducer;
    return { modules };
}

export default connect(mapStateToProps, { getRoleMasterData, saveRoleMasterData, getRoleMasterDataById, deleteRoleMasterData, getModuleMasterData })(RoleAddEdit)