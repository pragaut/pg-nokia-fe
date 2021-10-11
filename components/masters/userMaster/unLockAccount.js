import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
//import ListTable from '../../shared/ListTable';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';

import { unLockAccount, saveUserData } from '../../../actions/admin.action';

import style from '../../../theme/app.scss';

import ModalHeader from '../../shared/ModalHeader';
//import loadable from '@loadable/component'

import Input from '../../shared/InputBox';
import { SELECT, SelectDiv } from '../../formStyle';

import dynamic from 'next/dynamic';

//import Select from 'react-select'

class UnlockAcount extends Wrapper {

    configs = [{
        name: 'id',
        type: 'string',
        required: true
    }, {
        name: 'password',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);

        this.state = {
            user: props.baseObject ? props.baseObject : {},
            password: "",
            passwordStrength: "poor",
            isValidPassword: false,
            passwordFocusBorderColor: "#f90707"
        };
    };

    analyzePassword(value) {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (strongRegex.test(value)) {
            //alert("Strong password !!");
            this.setState({
                passwordStrength: "Strong",
                isValidPassword: true
            });
        } else if (mediumRegex.test(value)) {
            //alert("Medium password !!")
            this.setState({
                passwordStrength: "Medium",
                isValidPassword: false
            });
        } else {
            //alert("Poor password !!")
            this.setState({
                passwordStrength: "Poor",
                isValidPassword: false
            });
        }
        //alert(this.state.isValidPassword);
    }

    onValueChanged = key => event => {
        const existingUser = Object.assign({}, this.state.user);
        existingUser[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        if (key === "password") {
            this.analyzePassword(event.target.value);
            this.setState({ password: event.target.value });
        }
        this.setState({ user: existingUser });
    };
    onTextChange = key => event => {
        const existingUser = Object.assign({}, this.state.user);
        existingUser[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.analyzePassword(event.target.value);
        this.setState({ user: existingUser });
    };

    componentDidMount() {
        //  console.log("user state c : ", this.state.user);       
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
        //console.log("this.state.userSelectedRoles", this.state.user);
        let FocusBorderColor = "#f90707";
        if (this.state.passwordStrength === "Strong") {
            FocusBorderColor = "#228703";
        }
        else if (this.state.passwordStrength === "Medium") {
            FocusBorderColor = "#f0c615";
        }
        return (
            <div className={style.modal_dialog} style={{ overflow: 'visible', width: '80%', maxHeight: '120vh', maxWidth: '80vw' }}>
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper} style={{ overflow: 'visible' }}>
                        <div className={style.field_flex_new} style={{ width: '100%', color: "rgba(0,0,0,0.54)", fontSize: "13px", overflow: 'visible' }}>
                            <Input label="New Password:" focusbordercolor={FocusBorderColor} required="required" type='password' defaultValue={this.state.user.password} onChange={this.onValueChanged('password')} />
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button className={style.primary_btn} onClick={() => {
                        const validationText = validateInputs(this.state.user, this.configs);
                        this.analyzePassword(this.state.user.password);
                        if (validationText) {
                            return alert(validationText);
                        }
                        else if (this.state.user && !this.state.isValidPassword) {
                            return alert("Password strength is " + this.state.passwordStrength);
                        }
                        else{
                            this.props.unLockAccount(this.state.user, this.props.index);
                            //this.props.onSave(this.state.user, this.props.index);
                        }
                    }}>Unlock</button>
                    <button className={style.btn_danger} onClick={() => {
                        this.props.onClose()
                    }}>Close</button>
                </div>
            </div>);
    }
};

UnlockAcount.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { errorType, errorMessage };
}

export default connect(mapStateToProps, { unLockAccount, saveUserData })(UnlockAcount)