import Wrapper from '../../../shared/Wrapper';
import PropTypes from 'prop-types';
import { validateInputs ,validateInputsWithDisplayName_New} from '../../../../utils/editFormHelper';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../../../utils/editFormHelper';
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants';
import { getGroupMasterData } from '../../../../actions/comman/admin.action';
import style from '../../../../theme/app.scss';
import ModalHeader from '../../../shared/ModalHeader';
import Input from '../../../shared/InputBox';
import { SELECT , SpanLabelForDDl} from '../../../comman/formStyle';
import config from '../../../../config';
//import Select from 'react-select'
import * as sessionHelper from '../../../../utils/session.helper';
import * as helper from '../../../../helper';
class GroupAddEdit extends Wrapper {

    configs = [{
        name: 'groupName',
        type: 'string',
        required: true,
        displayname:'Group'
    }];

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.state = {
            group: props.baseObject ? props.baseObject : {},
            loadershow: 'false',
        };
    };

    onValueChanged = key => event => {
        const existingGroup = Object.assign({}, this.state.group);
        existingGroup[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        this.setState({ group: existingGroup });
    };
    onTextChange = key => event => {
        const existingGroup = Object.assign({}, this.state.group);
        existingGroup[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        this.setState({ group: existingGroup });
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

    onMediaChange = KEY => event => {

        const Mediafiles = event.target.files[0];
        // const invoiceid = this.props.invoiceDetailsId[0];
        let multipleMediadata = [];
        const multisupportDoc = Object.assign({}, this.state.multisupportDoc);
        let FileSize = Mediafiles && Mediafiles.size;
        let MaxFileSize = 5 * 1024 * 1024;

        console.log("Mediafiles : ", Mediafiles);
        const datan = new FormData();
        if (FileSize <= MaxFileSize) {
            datan.append('userId', '7163b4d5-183a-11eb-aecb-24770383f624');
            datan.append('image', Mediafiles);
            let media = {};
            this.handleLoad("1");
            const existingGroup = Object.assign({}, this.state.group);
            fetch(config.NOKIA_URL + constants.END_POINTS.NOKIA.IMAGE_CHANGE + '?oprKey=' + process.env.OPR_KEY, {
                method: 'POST',
                headers: {
                    'x-access-token': sessionHelper.getToken()
                },
                body: datan
            }).then(async result => {
                console.log("results",result)
                if (result.status === 200) {
                    this.handleLoad("0");
                    const response = await helper.validateResponse(result);
                    const newPicPath = response && response.data[0] && response.data[0].filename;
                    console.log("newPicPath : ",newPicPath)
                    existingGroup['logoName'] = Mediafiles.type;
                    existingGroup['logoUrl'] = newPicPath;
                    existingGroup['logoThumbUrl'] = newPicPath;
                    this.setState({ group: existingGroup });
                    console.log('group : ', this.state.group)
                }
            });
        }
        else {
            alert("file size can not be greater than 5MB");
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            this.handleLoad("0");
            this.setState({ multisupportDoc: [], supportingDoc: [] });
            return false;
        }
    }

    render() {
         console.log("this.state.group",this.state.group);
        return (
            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>
                {/* <ModalHeader
                    heading="Role Master"
                /> */}
                {/* container for the edit form here */}
                <div>
                    {/** idhar saare edit fields aayenge */}
                    <div className={style.field_flex_wrapper}>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>                           
                            <Input label="Group:" type='text' defaultValue={this.state.group.groupName} onChange={this.onValueChanged('groupName')} />
                            <Input label="Code:" type='text' defaultValue={this.state.group.groupCode} onChange={this.onValueChanged('groupCode')} />
                            <Input label="Theme Color:" type='color' defaultValue={this.state.group.themeColor} onChange={this.onValueChanged('themeColor')} />
                            {/* <Input label="Logo Name:" type='text' defaultValue={this.state.group.logoName} onChange={this.onValueChanged('logoName')} /> */}
                            <Input
                                focusbordercolor={'#f90707'}
                                label={'Media'}
                                type='file'
                                onChange={this.onMediaChange('media')}
                            />       
                        </div>
                        <div className={style.field_flex_new} style={{ width: '45%', color: "rgba(0,0,0,0.54)", fontSize: "13px" }}>
                            <Input label="Logo Height:" type='text' defaultValue={this.state.group.logoHeight} onChange={this.onValueChanged('logoHeight')} />
                            <Input label="Logo Width:" type='text' defaultValue={this.state.group.logoWidth} onChange={this.onValueChanged('logoWidth')} />
                            <Input label="Order:" type='number' defaultValue={this.state.group.groupOrder} onChange={this.onValueChanged('groupOrder')} />
                                             
                        </div>
                    </div>
                </div>
                <br></br>
                {/* container for save and cancel */}
                <div style={{ display: 'flex', width: '200px', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0px' }}>
                    <button 
                    style={{ width: '100px', marginRight: '10px' }}
                    className={style.primary_btn} onClick={() => {
                        console.log(this.state.group);
                        const validationText = validateInputsWithDisplayName_New(this.state.group, this.configs);
                        if (validationText) {
                            return alert(validationText);
                        }
                        setTimeout(() => {
                            this.props.onSave(this.state.group, this.props.index);
                        }, 200);

                    }}>save</button>
                    <button 
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.btn_danger} onClick={this.props.onCancel}>cancel</button>
                </div>
            </div>);
    }
};

GroupAddEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {   } = state.adminReducer;
    return {   };
}
export default connect(mapStateToProps, { getGroupMasterData })(GroupAddEdit)