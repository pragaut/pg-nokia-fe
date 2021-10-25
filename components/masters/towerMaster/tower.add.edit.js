import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getTowerMasterData, saveTowerMasterData, deleteTowerMasterData, getTowerMasterDataById, getOrganisationDetailsData, getOrgRelationTypeMasterData, getCityMasterData, getCountryMasterData, getStateMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT, SpanLabelForDDl } from '../../formStyle';
import config from '../../../config';
//import Select from 'react-select'
import * as sessionHelper from '../../../utils/session.helper';
import * as helper from '../../../helper';
import styledComponentsCjs from 'styled-components';
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

class TowerAddEdit extends Wrapper {

    configs = [{
        name: 'towerName',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);
        this.organisationDetailsIdRefs = React.createRef();
        this.cityMatserIdRefs = React.createRef();

        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            tower: props.baseObject ? props.baseObject : {},
            citys: [],
            states: [],
            countrys: [],
            organisations: [],
            orgRelationTypes: [],
            loadershow: 'false',
        };
    };

    onValueChanged = key => event => {
        const existingTower = Object.assign({}, this.state.tower);
        existingTower[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ tower: existingTower });
    };
    onValueChangedCountry = key => event => {
        const existingState = Object.assign({}, this.state.tower);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingState[key] = SelectedValue;
        existingState["stateId"] = null;
        existingState["cityId"] = null;
        if(!SelectedValue && SelectedValue ==='')
        {
            SelectedValue = 'No-Id';
        }   
        this.props.getStateMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, SelectedValue);
        this.props.getCityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, 'No-Id');
        this.setState({ tower: existingState });
    };
    onValueChangedState = key => event => {
        const existingCity = Object.assign({}, this.state.tower);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingCity[key] = SelectedValue;
        this.props.getCityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, SelectedValue);

        this.setState({ tower: existingCity });
    };
    onValueChangedOrgRelationType = key => event => {
        const existingState = Object.assign({}, this.state.tower);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingState[key] = SelectedValue;
        existingState["orgDetailsId"] = '';
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, existingState);    
        this.setState({ tower: existingState });
    };

    componentDidMount() {
        this.props.getTowerMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrgRelationTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getCountryMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        //this.props.getCityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        if (this.state.tower.countryId) {
            this.props.getStateMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, this.state.tower.countryId);
        }
        if (this.state.tower.stateId) {
            this.props.getCityMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, this.state.tower.stateId);
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.organisations !== null && nextProps.organisations !== undefined && nextProps.organisations !== this.state.organisations) {
            this.setState({
                organisations: nextProps.organisations
            })
        }
        if (nextProps && nextProps.citys && nextProps.citys !== null && nextProps.citys !== undefined && nextProps.citys !== 'undefined' && nextProps.citys !== this.state.citys) {
            this.setState({
                citys: nextProps.citys
            })
        }
        if (nextProps && nextProps.states && nextProps.states !== null && nextProps.states !== undefined && nextProps.states !== 'undefined' && nextProps.states !== this.state.states) {
            this.setState({
                states: nextProps.states
            })
        }
        if (nextProps && nextProps.orgRelationTypes && nextProps.orgRelationTypes !== null && nextProps.orgRelationTypes !== undefined && nextProps.orgRelationTypes !== 'undefined' && nextProps.orgRelationTypes !== this.state.orgRelationTypes) {
            this.setState({
                orgRelationTypes: nextProps.orgRelationTypes
            })
        }
        if (nextProps && nextProps.countrys && nextProps.countrys !== null && nextProps.countrys !== undefined && nextProps.countrys !== 'undefined' && nextProps.countrys !== this.state.countrys) {
            this.setState({
                countrys: nextProps.countrys
            })
        }

        if (nextProps.companyActiontype && nextProps.organisationActiontype === adminActionType.ORGANISATIONDETAILS_SAVE_SUCCESS) {
            this.props.onCancel();
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
        console.log("this.state.tower", this.state.tower);
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
                                    value={this.state.tower.orgRelationTypeId} paddingLeft="10px" borderRadius="14px" height="51px"
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
                                    value={this.state.tower.orgDetailsId} paddingLeft="10px" borderRadius="14px" height="51px"
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
                            <Input label="Tower Name:" type='text' defaultValue={this.state.tower.towerName} onChange={this.onValueChanged('towerName')} />
                            <Input label="Site Name:" type='text' defaultValue={this.state.tower.siteName} onChange={this.onValueChanged('siteName')} />
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Country</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.tower.countryId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChangedCountry('countryId')}
                                >
                                    <option key="a0" value="" >--- Select Country ---</option>

                                    {this.state.countrys &&
                                        this.state.countrys.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.countryName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                        </div>

                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>State</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.tower.stateId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChangedState('stateId')}
                                >
                                    <option key="a0" value="" >--- Select State ---</option>

                                    {this.state.states &&
                                        this.state.states.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.stateName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>City Name</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.tower.cityId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('cityId')}
                                >
                                    <option key="a0" value="" >--- Select City ---</option>
                                    {this.state.citys &&
                                        this.state.citys.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.cityName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Longitude:" type='number' defaultValue={this.state.tower.longitude} onChange={this.onValueChanged('longitude')} />
                            <Input label="Latitude:" type='number' defaultValue={this.state.tower.latitude} onChange={this.onValueChanged('latitude')} />


                            {/* <Input
                                focusbordercolor={'#f90707'}
                                label={'Media'}
                                type='file'
                                onChange={this.onMediaChange('media')}
                            />        */}
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'left', justifyContent: 'left', margin: '10px 0px' }}>
                    <button 
                    style={{ width: '100px', marginRight: '10px' }}
                    className={style.primary_btn} onClick={() => {
                        console.log(this.state.tower);
                        const validationText = validateInputs(this.state.tower, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.tower, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button 
                    style={{ width: '100px', marginRight: '10px' }}
                    className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

TowerAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { organisations, organisation, citys, city, states, countrys, orgRelationTypes } = state.adminReducer;
    return { organisations, organisation, citys, city, states, countrys, orgRelationTypes };
}
export default connect(mapStateToProps, { getTowerMasterData, saveTowerMasterData, deleteTowerMasterData, getTowerMasterDataById, getOrganisationDetailsData, getOrgRelationTypeMasterData, getCountryMasterData, getStateMasterData, getCityMasterData })(TowerAddEdit)