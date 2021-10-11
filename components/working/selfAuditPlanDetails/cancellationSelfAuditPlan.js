import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { cancelSelfAuditPlan, getSelfAuditPlanDetails } from '../../../actions/working.action';
import style from '../../../theme/app.scss';
import Input from '../../shared/InputBox';
import dynamic from 'next/dynamic';


class cancellationSelfAuditPlan extends Wrapper {

    configs = [{
        name: 'id',
        type: 'string',
        required: true
    }, {
        name: 'cancellationRemarks',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.state = {
            selfAuditPlan: props.baseObject ? props.baseObject : {},
            cancellationRemarks: ""
        };
    };

    onValueChanged = key => event => {
        const existingSelfAuditPlan = Object.assign({}, this.state.selfAuditPlan);
        existingSelfAuditPlan[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (key === "cancellationRemarks") {
            this.setState({ cancellationRemarks: event.target.value });
        }
        this.setState({ selfAuditPlan: existingSelfAuditPlan });
    };
    componentDidMount() {     
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
            <div className={style.modal_dialog} style={{ overflow: 'visible', width: '80%', height: '120px', width: 'auto' }}>
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper} style={{ overflow: 'visible' }}>
                        <div className={style.field_flex_new} style={{ width: '100%', color: "rgba(0,0,0,0.54)", fontSize: "13px", overflow: 'visible' }}>
                            <Input label="Cancellation Remarks" required="required" type='text' defaultValue={this.state.selfAuditPlan.cancellationRemarks} onChange={this.onValueChanged('cancellationRemarks')} />
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.btn_submit} onClick={() => {
                        const validationText = validateInputs(this.state.selfAuditPlan, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        this.props.cancelSelfAuditPlan(this.state.selfAuditPlan, this.props.index);
                        // setTimeout(() => {
                        //     this.props.getSelfAuditPlanDetails();
                        // }, 100);
                    }}>Submit  </button>
                     <button className={style.btn_danger} onClick={() => { 
                        this.props.onClose(); 
                    }}>Close  </button>
                </div>
            </div>
        );
    }
};

cancellationSelfAuditPlan.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;


    const errorMessage = state.errorReducer.error;
    return { errorType, errorMessage };
}

export default connect(mapStateToProps, { cancelSelfAuditPlan, getSelfAuditPlanDetails })(cancellationSelfAuditPlan)