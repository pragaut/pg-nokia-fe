import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getTowerAllotmentMasterData, getOrganisationDetailsData, getTowerMasterData,getOrgRelationTypeMasterData } from '../../../actions/admin.action';
import style from '../../../theme/app.scss';
import ModalHeader from '../../shared/ModalHeader';
import Input from '../../shared/InputBox';
import { SELECT, SpanLabelForDDl } from '../../formStyle';
import config from '../../../config';
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


class TowerAllotmentAddEdit extends Wrapper {

    configs = [{
        name: 'relationOrder',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);
        this.organisationDetailsIdRefs = React.createRef();
        this.towerMatserIdRefs = React.createRef();

        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            towerAllotment: props.baseObject ? props.baseObject : {},
            organisations: [],
            orgRelationTypes: [],
            loadershow: 'false',
        };
    };

    onValueChanged = key => event => {
        const existingTowerAllotment = Object.assign({}, this.state.towerAllotment);
        existingTowerAllotment[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ towerAllotment: existingTowerAllotment });
    };
    onTextChange = key => event => {
        const existingTowerAllotment = Object.assign({}, this.state.towerAllotment);
        existingTowerAllotment[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ towerAllotment: existingTowerAllotment });
    };
    onValueChangedOrgRelationType = key => event => {
        const existingState = Object.assign({}, this.state.towerAllotment);
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        existingState[key] = SelectedValue;
        existingState["orgDetailsId"] = '';
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, existingState);    
        this.setState({ towerAllotment: existingState });
    };

    componentDidMount() {
        this.props.getTowerAllotmentMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getTowerMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
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
        if (nextProps.towers !== null && nextProps.towers !== undefined && nextProps.towers !== this.state.towers) {
            this.setState({
                towers: nextProps.towers
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
        console.log("this.state.towerAllotment", this.state.towerAllotment);
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
                                    value={this.state.towerAllotment.orgRelationTypeId} paddingLeft="10px" borderRadius="14px" height="51px"
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
                                    value={this.state.towerAllotment.orgDetailsId} paddingLeft="10px" borderRadius="14px" height="51px"
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
                            <div style={{ padding: '10px', width: '100%' }}>
                                <SpanLabelForDDl>Tower Name</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.towerAllotment.towerId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('towerId')}
                                >
                                    <option key="a0" value="" >--- Select Tower ---</option>
                                    {this.state.towers &&
                                        this.state.towers.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.towerName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Relation Order:" focusbordercolor="#f90707" type='text' defaultValue={this.state.towerAllotment.relationOrder} onChange={this.onValueChanged('relationOrder')} />

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
                    <button className={style.primary_btn} onClick={() => {
                        console.log(this.state.towerAllotment);
                        const validationText = validateInputs(this.state.towerAllotment, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.towerAllotment, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

TowerAllotmentAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { organisations, organisation, towers, tower,orgRelationTypes } = state.adminReducer;
    return { organisations, organisation, towers, tower,orgRelationTypes };
}
export default connect(mapStateToProps, { getTowerMasterData, getOrganisationDetailsData, getTowerAllotmentMasterData, getOrgRelationTypeMasterData })(TowerAllotmentAddEdit)