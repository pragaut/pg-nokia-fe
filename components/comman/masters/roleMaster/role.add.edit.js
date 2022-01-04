import Wrapper from '../../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants';
import { getRoleMasterData, getModuleMasterData } from '../../../../actions/comman/admin.action';
import style from '../../../../theme/app.scss';
import ModalHeader from '../../../shared/ModalHeader';
import Input from '../../../shared/InputBox';
import { SELECT, SpanLabelForDDl } from '../../../comman/formStyle';
import config from '../../../../config';
//import Select from 'react-select' 
import Gap from '../../../comman/Gap';
import styledComponentsCjs from 'styled-components';

const SPAN = styledComponentsCjs.div` 
    color: rgba(0, 0, 0, 0.54);
    padding: 0;
    font-size: 13px;
    font-family: Asap;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.00938em; 
`;

class RoleAddEdit extends Wrapper {

    configs = [{
        name: 'roleName',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.moduleMasterIdRefs = React.createRef();

        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            role: props.baseObject ? props.baseObject : {},
            modules: [],
            loadershow: 'false',

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
        const role = this.state.role;
        this.props.getRoleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getModuleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        if (!role || !role.isMappingWithDeviceRequired) {
            const existingRole = Object.assign({}, this.state.role);
            existingRole["isMappingWithDeviceRequired"] = false;
            this.setState({ role: existingRole });
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.modules !== null && nextProps.modules !== undefined && nextProps.modules !== this.state.modules) {
            this.setState({
                modules: nextProps.modules
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
    onFileChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                selectedFile: event.target.files[0]
            });
        }
    };

    handleLoad = (valuede) => {
        if (valuede === "1" || valuede === 1) {
            this.setState({ loadershow: 'true' })
        }
        else {
            this.setState({ loadershow: 'false' })
        }
    }

    render() {
        console.log("this.state.role", this.state.role);
        return (
            <div className={style.modal_dialog} style={{ width: '90%', maxHeight: '120vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="Role Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '100%' }}>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Module Name</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.role.grpModulesId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('grpModulesId')}
                                >
                                    <option key="a0" value="" >--- Select Module Name ---</option>
                                    {this.state.modules &&
                                        this.state.modules.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.moduleName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Role Name:" type='text' defaultValue={this.state.role.roleName} onChange={this.onValueChanged('roleName')} />
                            <Input label="Order:" type='number' defaultValue={this.state.role.roleOrder} onChange={this.onValueChanged('roleOrder')} />
                            <Input label="DashBoard URL:" type='text' defaultValue={this.state.role.dashboardUrl} onChange={this.onValueChanged('dashboardUrl')} />
                            <div style={{ padding: '10px 10px 20px 10px', width: '100%', display: 'flex' }}>
                                <input type="checkbox" value="true" checked={this.state.role.isMappingWithDeviceRequired} onChange={this.onValueChanged('isMappingWithDeviceRequired')} />
                                <SpanLabelForDDl>Is Mapping With Device Required</SpanLabelForDDl>

                                {/* <input type="radio" value="false" onChange={this.onValueRemarksRequired('isRemarksRequired')} name="gender" checked={isYes}/> Yes */}
                            </div>
                        </div>


                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.primary_btn} onClick={() => {
                            console.log(this.state.role);
                            const validationText = validateInputs(this.state.role, this.configs);
                            if (validationText) {
                                return alert(validationText);
                            }
                            setTimeout(() => {
                                this.props.onSave(this.state.role, this.props.index);
                            }, 200);

                        }}>save</button>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

RoleAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { module, modules } = state.adminReducer;
    return { module, modules };
}
export default connect(mapStateToProps, { getRoleMasterData, getModuleMasterData })(RoleAddEdit)