import Wrapper from '../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs } from '../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import { getTowerAntennasMasterData, getTowerMasterData } from '../../../actions/admin.action';
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


class TowerAntennasAddEdit extends Wrapper {

    configs = [{
        name: 'antennaName',
        type: 'string',
        required: true
    }];

    constructor(props) {
        super(props);
        this.towerMatserIdRefs = React.createRef();

        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            towerAntennas: props.baseObject ? props.baseObject : {},
            loadershow: 'false',
        };
    };

    onValueChanged = key => event => {
        const existingTowerAntennas = Object.assign({}, this.state.towerAntennas);
        existingTowerAntennas[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ towerAntennas: existingTowerAntennas });
    };
    onTextChange = key => event => {
        const existingTowerAntennas = Object.assign({}, this.state.towerAntennas);
        existingTowerAntennas[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ towerAntennas: existingTowerAntennas });
    };

    componentDidMount() {
        this.props.getTowerAntennasMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getTowerMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
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
        
        if (nextProps.towers !== null && nextProps.towers !== undefined && nextProps.towers !== this.state.towers) {
            this.setState({
                towers: nextProps.towers
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
        console.log("this.state.towerAntennas", this.state.towerAntennas);
        console.log("this.state.towers", this.state.towers);
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
                                <SpanLabelForDDl>Tower Name</SpanLabelForDDl>
                                <Gap h="5px" />
                                <SELECT
                                    value={this.state.towerAntennas.towerId} paddingLeft="10px" borderRadius="14px" height="51px"
                                    type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                                    style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                                    onChange={this.onValueChanged('towerId')}
                                >
                                    <option key="a0" value="" >--- Select Tower ---</option>
                                    {this.state.towers &&
                                        this.state.towers.map((item, index) => {
                                            return <option key={index} value={item.towerId}>{item.towerName}</option>
                                        })
                                    }
                                </SELECT>
                            </div>
                            <Input label="Antenna Name:" focusbordercolor="#f90707" type='text' defaultValue={this.state.towerAntennas.antennaName} onChange={this.onValueChanged('antennaName')} />
                            <Input label="Antenna Code:" focusbordercolor="#f90707" type='text' defaultValue={this.state.towerAntennas.antennaCode} onChange={this.onValueChanged('antennaCode')} />
                        </div>

                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                            
                            <Input label="MAC Address:" focusbordercolor="#f90707" type='text' defaultValue={this.state.towerAntennas.macAddress} onChange={this.onValueChanged('macAddress')} />
                            <Input label="AISU Device Id:" focusbordercolor="#f90707" type='text' defaultValue={this.state.towerAntennas.aisuDeviceId} onChange={this.onValueChanged('aisuDeviceId')} />
                            <Input label="Unique Id:" focusbordercolor="#f90707" type='text' defaultValue={this.state.towerAntennas.uniqueId} onChange={this.onValueChanged('uniqueId')} />
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
                        console.log(this.state.towerAntennas);
                        const validationText = validateInputs(this.state.towerAntennas, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.towerAntennas, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

TowerAntennasAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { towers, tower } = state.adminReducer;
    return { towers, tower };
}
export default connect(mapStateToProps, { getTowerMasterData, getTowerAntennasMasterData })(TowerAntennasAddEdit)