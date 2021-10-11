import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getProcessFlowMasterData , getAuditFlowMasterData} from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT ,SpanLabelForDDl} from '../../formStyle';
//import Select from 'react-select'

class ProcessFlowAddEdit extends Wrapper {

    configs = [{
        name: 'auditFlowMasterId',
        type: 'string',
        required: true
    },{
        name: 'processFlowName',
        type: 'string',
        required: true
    }, {
        name: 'processFlowCode',
        type: 'string',
        required: true
    }, 
    , {
        name: 'leadTime',
        type: 'string',
        required: true
    },
    , {
        name: 'uRL',
        type: 'string',
        required: true
    },
    , {
        name: 'sendBackProcessFlowMasterId',
        type: 'string',
        required: false
    }];

    constructor(props) {
        super(props);

        this.moduleMasterIdRefs = React.createRef();

        this.state = {
            processFlow: props.baseObject ? props.baseObject : {},
            processFlows: [],
            auditFlows : [],
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
        const existingProcessFlow = Object.assign({}, this.state.processFlow);
        existingProcessFlow[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ processFlow: existingProcessFlow });
    };
    onTextChange = key => event => {
        const existingProcessFlow = Object.assign({}, this.state.processFlow);
        existingProcessFlow[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ processFlow: existingProcessFlow });
    };

    componentDidMount() {
        this.props.getProcessFlowMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getAuditFlowMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.processFlows && nextProps.processFlows !== null && nextProps.processFlows !== 'undefined' && nextProps.processFlows !== this.state.processFlows) {
            this.setState({ processFlows: nextProps.processFlows });
        }
        if (nextProps && nextProps.auditFlows && nextProps.auditFlows !== null && nextProps.auditFlows !== 'undefined' && nextProps.auditFlows !== this.state.auditFlows) {
            this.setState({ auditFlows: nextProps.auditFlows });
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
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>

                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '30%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>                           
                        <SpanLabelForDDl style={{ marginLeft: "8px" }}>Audit Flow</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.auditFlowMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('auditFlowMasterId')}
                            >
                                <option key="a0" value="" >Select Audit Flow </option>
                                {this.state.auditFlows &&
                                    this.state.auditFlows.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.auditFlow}</option>
                                    })
                                }
                            </SELECT>
                            <Input label="Process Flow Name:" type='text' defaultValue={this.state.processFlow.processFlowName} onChange={this.onValueChanged('processFlowName')} />
                            <Input label="Process Flow Code:" type='text' defaultValue={this.state.processFlow.processFlowCode} onChange={this.onValueChanged('processFlowCode')} />
                            <Input label="URL:" type='text' defaultValue={this.state.processFlow.uRl} onChange={this.onValueChanged('uRL')} />
                            <Input label="Lead Time:" type='number' defaultValue={this.state.processFlow.leadTime} onChange={this.onValueChanged('leadTime')} />
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Approval</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isApproval} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isApproval')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Corporate Team Task</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isCorporateTeamTask} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isCorporateTeamTask')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Editable After Next Approver Approval</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isEditableAfterNextApproverApproval} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isEditableAfterNextApproverApproval')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                        </div>
                        <div className={style.field_flex_new} style={{ width: '30%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>                           
                       
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is User Task</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isUserTask} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isUserTask')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Audittee Task</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isAuditteeTask} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isAuditteeTask')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Auditor Task</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isAuditorTask} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isAuditorTask')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Sendback Process Flow</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.sendBackProcessFlowMasterId} paddingLeft="10px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onValueChanged('sendBackProcessFlowMasterId')}
                            >
                                <option key="a0" value="" >Select Process Flow</option>
                                {this.state.processFlows &&
                                    this.state.processFlows.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.processFlowName}</option>
                                    })
                                }
                            </SELECT>
                        <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Monthly Review Step</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isMonthlyReviewStep} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isMonthlyReviewStep')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Approval Required</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isApprovalRequired} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isApprovalRequired')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Editable Before Next Step Completion</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isEditableBeforeNextStepCompletion} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isEditableBeforeNextStepCompletion')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Reopen Manadatory After Next Approver Rejection</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isReopenManadatoryAfterNextApproverRejection} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isReopenManadatoryAfterNextApproverRejection')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                        </div>
                        
                        <div className={style.field_flex_new} style={{ width: '30%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                      
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Employee Wise Applicable</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isEmployeeWiseApplicable} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isEmployeeWiseApplicable')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Plant Wise Applicable</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isPlantWiseApplicable} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isPlantWiseApplicable')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Company Wise Applicable</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isCompanyWiseApplicable} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isCompanyWiseApplicable')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Group Wise Applicable</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isGroupWiseApplicable} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isGroupWiseApplicable')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Feedback Step</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isFeedbackStep} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isFeedbackStep')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Default Process</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isDefaultProcess} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isDefaultProcess')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            <SpanLabelForDDl style={{ marginLeft: "8px" }}>Is Editable After Next Step Completion</SpanLabelForDDl>
                            <SELECT margin="8px"
                                value={this.state.processFlow.isEditableAfterNextStepCompletion} paddingLeft="20px" borderRadius="14px" height="51px"
                                type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                onChange={this.onTextChange('isEditableAfterNextStepCompletion')}
                            >
                                {this.state.ddlData &&
                                    this.state.ddlData.map((item, index) => {
                                        return <option key={index} value={item.value}>{item.text}</option>
                                    })
                                }
                            </SELECT>
                            
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        console.log(this.state.section);
                        const validationText = validateInputs(this.state.processFlow, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }

                       
                        setTimeout(() => {
                            this.props.onSave(this.state.processFlow, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

ProcessFlowAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {processFlows, auditFlows } = state.adminReducer;
    return { processFlows, auditFlows };
}
export default connect(mapStateToProps, { getProcessFlowMasterData,getAuditFlowMasterData })(ProcessFlowAddEdit)