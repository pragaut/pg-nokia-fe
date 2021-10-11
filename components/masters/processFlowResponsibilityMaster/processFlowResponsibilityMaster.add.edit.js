import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getProcessFlowMasterData, getProcessFlowMasterDataById, getCompanyMaster, getPlantMasterByGroupCompanyId, getUserDetailsP, getRoleMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT,SpanLabelForDDl } from '../../formStyle';
//import Select from 'react-select'

class ProcessFlowResponsibilityAddEdit extends Wrapper {

    configs = [{
        name: 'processFlowMasterId',
        type: 'string',
        required: true
    }, {
        name: 'roleMasterId',
        type: 'string',
        required: true
    }, {
        name: 'responsiblityOrder',
        type: 'number',
        required: true
    }];

    constructor(props) {
        super(props);

        this.moduleMasterIdRefs = React.createRef();

        this.state = {
            processFlowResponsibility: props.baseObject ? props.baseObject : {},
            sections: [],
            criticalitys: [],
            auditObservations: [],
            companys: [],
            plants: [],
            users: [],
            roles: [],
            processFlows: [],
            processFlow: null,
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

    onProcessFlowValueChanged = key => event => {
        let Values = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        const existingprocessFlowResponsibility = Object.assign({}, this.state.processFlowResponsibility);
        existingprocessFlowResponsibility[key] = Values; 
        this.props.getProcessFlowMasterDataById(Values);
        this.setState({ processFlowResponsibility: existingprocessFlowResponsibility });
    };
    ConvertStringToArrayRole = (data) => {
        const state = {};
        const datstring = data && data.split(',');
        return datstring; 
    }
    onCompanyValueChanged = key => event => {
        let Values = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingprocessFlowResponsibility = Object.assign({}, this.state.processFlowResponsibility);
        existingprocessFlowResponsibility[key] = Values;
        let listItem = this.ConvertStringToArrayRole(Values); 
        this.props.getPlantMasterByGroupCompanyId(listItem, 0, constants.DEFAULT_ROWS_LIST);
        if (this.state.processFlow && this.state.processFlow.isEmployeeWiseApplicable === true) {
            this.props.getUserDetailsP(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, existingprocessFlowResponsibility);
        }
        this.setState({ processFlowResponsibility: existingprocessFlowResponsibility });
    };

    onPlantValueChanged = key => event => {
        let Values = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingprocessFlowResponsibility = Object.assign({}, this.state.processFlowResponsibility);
        existingprocessFlowResponsibility[key] = Values;
        if (this.state.processFlow && this.state.processFlow.isEmployeeWiseApplicable === true) {
            this.props.getUserDetailsP(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, existingprocessFlowResponsibility);
        }
        this.setState({ processFlowResponsibility: existingprocessFlowResponsibility });
    };
    onRoleValueChanged = key => event => {
        let Values = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const existingprocessFlowResponsibility = Object.assign({}, this.state.processFlowResponsibility);
        existingprocessFlowResponsibility[key] = Values;
        if (this.state.processFlow && this.state.processFlow.isEmployeeWiseApplicable === true) {
            this.props.getUserDetailsP(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, existingprocessFlowResponsibility);
        }

        this.setState({ processFlowResponsibility: existingprocessFlowResponsibility });
    };
    onValueChanged = key => event => {
        const existingprocessFlowResponsibility = Object.assign({}, this.state.processFlowResponsibility);
        existingprocessFlowResponsibility[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ processFlowResponsibility: existingprocessFlowResponsibility });
    };

    onTextChange = key => event => {
        const existingprocessFlowResponsibility = Object.assign({}, this.state.processFlowResponsibility);
        existingprocessFlowResponsibility[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ processFlowResponsibility: existingprocessFlowResponsibility });
    };

    componentDidMount() {
        this.props.getProcessFlowMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getCompanyMaster(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    
       // let listItem = ['pb']; 
        //this.props.getPlantMasterByGroupCompanyId(listItem, 0, constants.DEFAULT_ROWS_LIST);
        //this.props.getUserDetailsP(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, undefined);
        this.props.getRoleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        if (this.state.processFlowResponsibility && this.state.processFlowResponsibility.processFlowMasterId) {
            this.props.getProcessFlowMasterDataById(this.state.processFlowResponsibility.processFlowMasterId);
        }
        if (this.state.processFlowResponsibility && this.state.processFlowResponsibility.companyMasterId) {
            let listItem = this.ConvertStringToArrayRole(this.state.processFlowResponsibility.companyMasterId); 
            this.props.getPlantMasterByGroupCompanyId(listItem, 0, constants.DEFAULT_ROWS_LIST);
        }
        if (this.state.processFlowResponsibility) {
            this.props.getUserDetailsP(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, this.state.processFlowResponsibility);
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.companys && nextProps.companys !== null && nextProps.companys !== 'undefined' && nextProps.companys !== this.state.companys) {
            this.setState({ companys: nextProps.companys });
        }
        if (nextProps && nextProps.plants && nextProps.plants !== null && nextProps.plants !== 'undefined' && nextProps.plants !== this.state.plants) {
            console.log("nextProps.plants ", nextProps.plants);
            this.setState({ plants: nextProps.plants });
        }
        if (nextProps && nextProps.users && nextProps.users !== null && nextProps.users !== 'undefined' && nextProps.users !== this.state.users) {
            this.setState({ users: nextProps.users });
        }
        if (nextProps && nextProps.roles && nextProps.roles !== null && nextProps.roles !== 'undefined' && nextProps.roles !== this.state.roles) {
            this.setState({ roles: nextProps.roles });
        }
        if (nextProps && nextProps.processFlows && nextProps.processFlows !== null && nextProps.processFlows !== 'undefined' && nextProps.processFlows !== this.state.processFlows) {
            this.setState({ processFlows: nextProps.processFlows });
        }
        if (nextProps && nextProps.processFlow && nextProps.processFlow !== null && nextProps.processFlow !== 'undefined' && nextProps.processFlow !== this.state.processFlow) {
            this.setState({ processFlow: nextProps.processFlow });
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
        const { processFlow } = this.state;
        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>

                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl>Process Flow</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlowResponsibility.processFlowMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onProcessFlowValueChanged('processFlowMasterId')}
                            >
                                <option key="a0" value="" >---Select Process--- </option>
                                {this.state.processFlows &&
                                    this.state.processFlows.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.processFlowName}</option>
                                    })
                                }
                            </SELECT>
                            {(processFlow && (processFlow.isCompanyWiseApplicable === true
                                || processFlow.isPlantWiseApplicable === true
                                || processFlow.isEmployeeWiseApplicable === true
                            )) && <>
                                    <SpanLabelForDDl>Company</SpanLabelForDDl>
                                    <SELECT margin="8px"
                                        value={this.state.processFlowResponsibility.companyMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.onCompanyValueChanged('companyMasterId')}
                                    >
                                        <option key="a0" value="" >---Select Company--- </option>
                                        {this.state.companys &&
                                            this.state.companys.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.companyName}</option>
                                            })
                                        }
                                    </SELECT>
                                </>
                            }

                            {(processFlow && (processFlow.isPlantWiseApplicable === true
                                || processFlow.isEmployeeWiseApplicable === true
                            )) &&
                                <>
                                    <SpanLabelForDDl>Plant</SpanLabelForDDl>
                                    <SELECT margin="8px"
                                        value={this.state.processFlowResponsibility.plantMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.onPlantValueChanged('plantMasterId')}
                                    >
                                        <option key="a0" value="" >---Select Plant--- </option>
                                        {this.state.plants && this.state.plants.length > 0 &&
                                            this.state.plants.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.plantName}</option>
                                            })
                                        }
                                    </SELECT>
                                </>
                            }
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <SpanLabelForDDl>Role</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlowResponsibility.roleMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onRoleValueChanged('roleMasterId')}
                            >
                                <option key="a0" value="" >---Select Role--- </option>
                                {this.state.roles &&
                                    this.state.roles.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.roleName}</option>
                                    })
                                }
                            </SELECT>
                            {(processFlow && (processFlow.isEmployeeWiseApplicable === true
                            )) &&
                                <>
                                    <SpanLabelForDDl>User</SpanLabelForDDl>
                                    <SELECT margin="8px"
                                        value={this.state.processFlowResponsibility.employeeMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                        type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                        style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                        onChange={this.onValueChanged('employeeMasterId')}
                                    >
                                        <option key="a0" value="" >---Select User--- </option>
                                        {this.state.users &&
                                            this.state.users.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.useFullName}</option>
                                            })
                                        }
                                    </SELECT>
                                </>
                            }
                            <Input label="Responsibility Order:" type='number' defaultValue={this.state.processFlowResponsibility.responsiblityOrder} onChange={this.onValueChanged('responsiblityOrder')} />

                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        const validationText = validateInputs(this.state.processFlowResponsibility, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }

                        setTimeout(() => {
                            this.props.onSave(this.state.processFlowResponsibility, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

ProcessFlowResponsibilityAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { companys, plants, users, roles, processFlows, processFlow } = state.adminReducer;
    return { companys, plants, users, roles, processFlows, processFlow };
}
export default connect(mapStateToProps, { getProcessFlowMasterData, getProcessFlowMasterDataById, getCompanyMaster, getPlantMasterByGroupCompanyId, getUserDetailsP, getRoleMasterData })(ProcessFlowResponsibilityAddEdit)