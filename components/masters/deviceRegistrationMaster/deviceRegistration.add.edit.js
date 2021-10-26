import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getDeviceRegistrationMasterData, getOrganisationDetailsData, getOrgRelationTypeMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT, SpanLabelForDDl } from '../../formStyle';
import config from '../../../config';
import moment from 'moment';
//import Select from 'react-select'
import styledComponentsCjs from 'styled-components';
import * as sessionHelper from '../../../utils/session.helper';
import * as helper from '../../../helper';
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


class DeviceRegistrationAddEdit extends Wrapper {

    configs = [{
        name: 'deviceSequence',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);
        this.organisationDetailsIdRefs = React.createRef();

        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            deviceRegistration: props.baseObject ? props.baseObject : {},
            orgRelationTypes: [],
            organisations: [],
            loadershow: 'false',
        };
    };

    onValueChanged = key => event => {
        const existingDeviceRegistration = Object.assign({}, this.state.deviceRegistration);
        existingDeviceRegistration[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ deviceRegistration: existingDeviceRegistration });
    };
    onTextChange = key => event => {
        const existingDeviceRegistration = Object.assign({}, this.state.deviceRegistration);
        existingDeviceRegistration[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ deviceRegistration: existingDeviceRegistration });
    };
    onValueChangedOrgRelationType = key => event => {
        const existingState = Object.assign({}, this.state.deviceRegistration);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingState[key] = SelectedValue;
        existingState["orgDetailsId"] = '';
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, existingState);
        this.setState({ deviceRegistration: existingState });
    };

    componentDidMount() {
        this.props.getDeviceRegistrationMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrgRelationTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.organisations !== null && nextProps.organisations !== undefined && nextProps.organisations !== this.state.organisations) {
            this.setState({
                organisations: nextProps.organisations
            })
        }
        if (nextProps && nextProps.orgRelationTypes && nextProps.orgRelationTypes !== null && nextProps.orgRelationTypes !== undefined && nextProps.orgRelationTypes !== 'undefined' && nextProps.orgRelationTypes !== this.state.orgRelationTypes) {
            this.setState({
                orgRelationTypes: nextProps.orgRelationTypes
            })
        }
    }

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

        console.log("this.state.deviceRegistration", this.state.deviceRegistration);
        let deviceRegistrationDate = this.state.deviceRegistration && this.state.deviceRegistration.registrationDate && this.state.deviceRegistration.registrationDate;
        deviceRegistrationDate = moment(deviceRegistrationDate).format("YYYY-MM-DD");
        deviceRegistrationDate = this.state.deviceRegistration && this.state.deviceRegistration.registrationDate ? deviceRegistrationDate : '';
        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="Role Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Organisation Relation Type</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.deviceRegistration.orgRelationTypeId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChangedOrgRelationType('orgRelationTypeId')}
                                >
                                    <option key="a0" value="" >--- Select Org Relation Type ---</option>
                                    {this.state.orgRelationTypes &&
                                        this.state.orgRelationTypes.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.orgRelationType}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Organisation Details</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.deviceRegistration.orgDetailsId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('orgDetailsId')}
                                >
                                    <option key="a0" value="" >--- Select Organisation Details ---</option>
                                    {this.state.organisations &&
                                        this.state.organisations.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.orgName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="MAC Address:" focusbordercolor="#f90707" type='text' defaultValue={this.state.deviceRegistration.macAddress} onChange={this.onValueChanged('macAddress')} />

                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <Input label="Unique Id:" focusbordercolor="#f90707" type='text' defaultValue={this.state.deviceRegistration.uniqueId} onChange={this.onValueChanged('uniqueId')} />
                            <Input label="Registration Date:" focusbordercolor="#f90707" type='date' defaultValue={deviceRegistrationDate} onChange={this.onValueChanged('registrationDate')} />
                            {/* <Input label="Device Sequence:" focusbordercolor="#f90707" type='text' defaultValue={this.state.deviceRegistration.deviceSequence} onChange={this.onValueChanged('deviceSequence')} /> */}
                            <Input label="Unique Code:" focusbordercolor="#f90707" type='text' defaultValue={this.state.deviceRegistration.uniqueCode} onChange={this.onValueChanged('uniqueCode')} />

                        </div>
                        {/* <Input
                                focusbordercolor={'#f90707'}
                                label={'Media'}
                                type='file'
                                onChange={this.onMediaChange('media')}
                            />        */}


                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button 
                    style={{ width: '100px', marginRight: '10px' }}
                    className={style.primary_btn} onClick={() => {
                        console.log(this.state.deviceRegistration);
                        const validationText = validateInputs(this.state.deviceRegistration, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.deviceRegistration, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button 
                    style={{ width: '100px', marginRight: '10px' }}
                    className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

DeviceRegistrationAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { organisations, organisation, orgRelationTypes } = state.adminReducer;
    return { organisations, organisation, orgRelationTypes };
}
export default connect(mapStateToProps, { getOrganisationDetailsData, getDeviceRegistrationMasterData, getOrgRelationTypeMasterData })(DeviceRegistrationAddEdit)