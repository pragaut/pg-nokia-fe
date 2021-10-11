import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getCriticalityMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT, SpanLabelForDDl } from '../../formStyle';
//import Select from 'react-select'

class CriticalityAddEdit extends Wrapper {

    configs = [{
        name: 'criticalityName',
        type: 'string',
        required: true
    }, {
        name: 'criticalityCode',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.state = {
            criticality: props.baseObject ? props.baseObject : {}           
        };
    };

    onValueChanged = key => event => {
        const existingCriticality = Object.assign({}, this.state.criticality);
        existingCriticality[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ criticality: existingCriticality});
    };
    onTextChange = key => event => {
        const existingCriticality = Object.assign({}, this.state.criticality);
        existingCriticality[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ criticality: existingCriticality });
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

        const { criticality } = this.state;

        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '30%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <Input label="Criticality Name:" type='text' defaultValue={this.state.criticality.criticalityName} onChange={this.onValueChanged('criticalityName')} />
                            {/* <Input label=" Code:" type='text' defaultValue={this.state.criticality.criticalityCode} onChange={this.onValueChanged('criticalityCode')} /> */}
                        </div>
                        <div className={style.field_flex_new} style={{ width: '30%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <Input label=" Code:" type='text' defaultValue={this.state.criticality.criticalityCode} onChange={this.onValueChanged('criticalityCode')} /> 
                        </div>
                        <div    style={{ padding: '10px', width: '30%'  }}>
                               
                        <SpanLabelForDDl>Is Critical: </SpanLabelForDDl> <br />
                         <input type="checkbox" checked={this.state.criticality.isCritical} onChange={this.onValueChanged('isCritical')} />
                               
                            </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        console.log(this.state.criticality);
                        const validationText = validateInputs(this.state.criticality, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.criticality, this.props.index);
                        }, 100);
                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

CriticalityAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { criticalitys } = state.adminReducer;
    return { criticalitys };
}
export default connect(mapStateToProps, { getCriticalityMasterData })(CriticalityAddEdit)