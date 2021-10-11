import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs, validateInputsWithDisplayName } from '../../../utils/editFormHelper';

import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getMasterDetails, getMasterDetailsBymasterCategoryCode, getMasterDetailsByMasterCategoryId, getMasterDetailsById, saveMasterDetails, deleteMasterDetails, initMasterDetailsType } from '../../../actions/masterDetails.actions';
import { getMasterCategorys} from '../../../actions/masterCategory.actions';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import MasterDetails from './masterDetails'
import { hideError, showError } from '../../../actions/error.actions';
import * as MasterType from '../../../action-types/masterDetails.action.types'
const Router = require('next/router');

import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';


class Index extends Wrapper {
    // configs = [
    //     {
    //         name: 'value',
    //         displayname: 'Master Name ',
    //         type: 'string',
    //         required: true
    //     }, {
    //         name: 'code',
    //         displayname: 'Master Code ',
    //         type: 'string',
    //         required: true
    //     }
    // ];

    constructor(props) {
        super(props);
        this.state = {
            MasterCategoryCode : '',
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            masterDetails: [],
            ParentMasterCategoryID: '',
            isParentMasterCategoryDDLVisible: false,
            boolValuesForDDL: [
                {
                    text: 'Yes',
                    value: 'true'
                },
                {
                    text: 'No',
                    value: 'false'
                }
            ],
            masterDetail: {
                id: undefined,
                masterCategoryID: '',
                parentMasterID: '',
                value: '',
                code: '',
                other: '',
                //  order: null,
                MasterName: props.MasterName ? props.MasterName : 'Master Details',
                isInoperativeRecord: false
            },
            configs: [
                {
                    name: 'value',
                    displayname: props.MasterName ? props.MasterName + ' Name' : 'Master Name ',
                    type: 'string',
                    required: true
                }, {
                    name: 'code',
                    displayname: props.MasterName ? props.MasterName + ' Code' : 'Master Code ',
                    type: 'string',
                    required: true
                }, {
                    name: 'Order',
                    displayname: 'Order',
                    type: 'number',
                    required: false
                }
            ],
            showEditPopup: false
        };

    }


    onTextChange = key => event => {
        const state = {};

        this.state.masterDetail[key] = event.target.value;

        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });

    };



    onSubmit = async () => {

        try {
            const validationText = validateInputsWithDisplayName(this.state.masterDetail, this.state.configs);
            if (validationText) {
                return alert(validationText);
            }
            const masterDetails = Object.assign({}, this.state.masterDetail);
            let Valuereturn = undefined;
            this.props.saveMasterDetails(masterDetails, Valuereturn)

            let MasterCategory_Code = this.GetMasterCategoryCode();

            setTimeout(() => {
                if (this.props.type === MasterType.MASTERDETAILS_SAVE_SUCCESS) {
                    this.state.masterDetail.id = undefined;
                    this.state.masterDetail.value = '';
                    this.state.masterDetail.code = '';
                    this.state.masterDetail.other = '';
                    // this.state.masterDetail.order = null;
                    this.state.masterDetail.isInoperativeRecord = false;
                    // this.state.errorMessage = ' Data Inserted/Updated successfully';
                    //  this.state.errortype = 'success';
                }
                //this.props.getMasterDetailsByMasterCategoryId(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, this.state.masterDetail.masterCategoryID);
                this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, MasterCategory_Code);
                this.props.getMasterDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
            }, 800);

            this.setState({
                ...state
            }, () => {
                // console.log("state", this.state)
            });

            setTimeout(() => {
                this.setState({ errorMessage: '', errortype: '' })
            }, 3000);
        }
        catch {
            const state = {};
            // this.state.errorMessage = 'Error in Master Category Master';
            //this.state.errortype = 'error';
            setTimeout(() => {
                this.setState({ errorMessage: '', errortype: '' })
            }, 3000);
        }

    }

    componentDidMount() {
        
        var configsn = [
            {
                name: 'value',
                displayname: this.props.MasterName ? this.props.MasterName + ' Name' : 'Master Name ',
                type: 'string',
                required: true
            }, {
                name: 'code',
                displayname: this.props.MasterName ? this.props.MasterName + ' Code' : 'Master Code ',
                type: 'string',
                required: true
            }
        ];
        
        const state = {};
        this.state.masterDetail.masterCategoryID = this.props.masterCateogyId;
        this.state.MasterCategoryCode = this.props.masterCategoryCode;
        this.state.masterDetail.MasterName = this.props.MasterName;
       // this.props.getMasterDetailsByMasterCategoryId(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, this.props.masterCateogyId);      
        this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, this.props.masterCategoryCode);
        this.props.getMasterDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);       
        this.state.configs = configsn;
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.masterCateogyId != this.props.masterCateogyId) {

            const state = {};
            this.state.masterDetail.masterCategoryID = nextProps.masterCateogyId;
            this.state.masterCategoryCode = nextProps.masterCategoryCode;
            this.state.masterDetail.id = undefined;
            this.state.masterDetail.value = '';
            this.state.masterDetail.code = '';
            this.state.masterDetail.other = '';
            //  this.state.masterDetail.order = null;
            this.state.masterDetail.isInoperativeRecord = false;
          //  this.props.getMasterDetailsByMasterCategoryId(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, nextProps.masterCateogyId);
            this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, nextProps.masterCategoryCode);
            this.props.getMasterDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
            this.setState({
                ...state
            }, () => {
                // console.log("state", this.state)
            });
        }
        if (nextProps.MasterName && nextProps.MasterName != this.state.masterDetail.MasterName) {
            const state = {};
            var configsn = [
                {
                    name: 'value',
                    displayname: nextProps.MasterName ? nextProps.MasterName + ' Name' : 'Master Name ',
                    type: 'string',
                    required: true
                }, {
                    name: 'code',
                    displayname: nextProps.MasterName ? nextProps.MasterName + ' Code' : 'Master Code ',
                    type: 'string',
                    required: true
                }
            ];
            this.state.configs = configsn;
            this.state.masterDetail.MasterName = nextProps.MasterName;
            this.setState({
                ...state
            }, () => {
                // console.log("state", this.state)
            });
        }
    }

    GetMasterCategoryCode = () => {
              const MasterCategoryCode = this.state.MasterCategoryCode;
              return MasterCategoryCode;
    }

    deleteMasterDetails = (id, masterCategoryID, MasterName) => {
        const state = {};
        this.props.deleteMasterDetails(id);
        
        let MasterCategory_Code = this.GetMasterCategoryCode();

        setTimeout(() => {
            //this.props.getMasterDetailsByMasterCategoryId(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, masterCategoryID);
            this.props.getMasterDetailsBymasterCategoryCode(0, constants.DEFAULT_ROWS_LIST, undefined, undefined, MasterCategory_Code);
            this.props.getMasterDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
            //  this.props.getMasterDetails(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        }, 200);
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }
    EditMasterDetails = (Id, masterCategoryID, MasterName) => {
        if (Id && Id !== null && Id !== undefined) {
            this.props.getMasterDetailsById(Id);

            // setTimeout(() => {
            //     this.setState({ masterDetail: this.props.masterDetail })
            // }, 200);
            setTimeout(() => {
                const existingmasterDetail = Object.assign({}, this.props.masterDetail);
                existingmasterDetail["MasterName"] = MasterName;
                this.setState({ masterDetail: existingmasterDetail })
            }, 300);
        }
    }
    onClickCancel = () => {
        const state = {};

        this.state.masterDetail.id = undefined;
        this.state.masterDetail.parentMasterID = '';
        this.state.masterDetail.value = '';
        this.state.masterDetail.code = '';
        this.state.masterDetail.other = '';
        // this.state.masterDetail.order = '';
        this.state.masterDetail.isInoperativeRecord = false;
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }

    TextInputMasterDiv = props => {
        return <CommonStyle.InputControlsDiv
            width="25%"
        >
            <CommonStyle.InputLabel>
                {props.headerTitle}
            </CommonStyle.InputLabel>
            <CommonStyle.InputDiv>
                <Input
                    placeholderColor="#7c7c7c"
                    placeholder=""
                    value={props.SelectedValues}
                    paddingLeft="20px"
                    borderRadius="14px"
                    height="51px"
                    type={props.type ? props.type : 'text'}
                    color="#000"
                    borderColor="#000"
                    style={{ backgroundColor: "transparent" }}
                    onChange={this.onTextChange(props.KeyName)} />
            </CommonStyle.InputDiv>

        </CommonStyle.InputControlsDiv>
    }

    CommonSelectInputMasterDiv = props => {
        return <CommonStyle.InputControlsDiv>
            <CommonStyle.InputLabel>
                {props.headerTitle}
            </CommonStyle.InputLabel>
            <CommonStyle.InputDiv>
                <SELECT
                    value={props.SelectedValues}
                    paddingLeft="20px"
                    borderRadius="14px"
                    height="51px"
                    type="text"
                    color="#000"
                    borderColor="#000"
                    style={{ backgroundColor: "transparent" }}
                    onChange={this.onTextChange(props.KeyName)}
                >
                    {props.ddlData &&
                        props.ddlData.map((item, index) => {
                            return <option key={index} value={item.value}>{item.text}</option>
                        })

                    }
                </SELECT>
            </CommonStyle.InputDiv>

        </CommonStyle.InputControlsDiv>
    }

    render() {

        const { masterCateogyId, MasterName, ParentMasterName, parentMasterCategoryId } = this.props;
        const ParentMasterDetailsData = this.props.masterDetails && this.props.masterDetails.length > 0 && this.props.masterDetails.filter(item => item.masterCategoryID === parentMasterCategoryId)
        //  const LasterOrder = 1; //this.props.masterDetailsCategory && this.props.masterDetailsCategory.length + 1;
        let NewMasterName = MasterName && MasterName.replace("Master", " ");

        console.log("this.state.masterDetail.order", this.state.masterDetail.order)
      
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >

                <CommonStyle.MainDiv>
                    <CommonStyle.FormDiv>
                        {ParentMasterName && ParentMasterName !== '' && ParentMasterName !== 'undefined' &&
                            <CommonStyle.InputControlsDiv
                                width="30%"
                            >
                                <CommonStyle.InputLabel>
                                    {ParentMasterName}
                                </CommonStyle.InputLabel>
                                <CommonStyle.InputDiv>
                                    <SELECT
                                        value={this.state.masterDetail.parentMasterID}
                                        paddingLeft="20px"
                                        borderRadius="14px"
                                        height="51px"
                                        type="text"
                                        color="#000"
                                        borderColor="#000"
                                        style={{ backgroundColor: "transparent" }}
                                        onChange={this.onTextChange('parentMasterID')}
                                    >
                                        <option value=''>Select {ParentMasterName}</option>
                                        {ParentMasterDetailsData &&
                                            ParentMasterDetailsData.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.valueWithParent}</option>
                                            })
                                        }
                                    </SELECT>
                                </CommonStyle.InputDiv>
                            </CommonStyle.InputControlsDiv>
                        }
                        <this.TextInputMasterDiv
                            headerTitle={NewMasterName + ' Name'}
                            SelectedValues={this.state.masterDetail.value}
                            KeyName="value"
                        />
                        <this.TextInputMasterDiv
                            headerTitle="Code"
                            SelectedValues={this.state.masterDetail.code}
                            KeyName="code"
                        />
                        <CommonStyle.ButtonDiv
                            width="40%"
                            padding={"50px 0px 0px 0px"}
                            justifycontent={'center'}
                        >
                            <Button
                                bgColor="#005900"
                                color="#ffffff"
                                height="51px"
                                zIndex="0"
                                width="40%"
                                borderRadius={"10px"}

                                bgChangeHover="#ffffff"
                                hoverColor="#005900"
                                border="solid 1px #005900"
                                style={{ marginRight: '10px' }}
                                onClick={() => this.onSubmit()}
                            >
                                Create
                    </Button>
                            <Button
                                bgColor="#ad0000"
                                color="#ffffff"
                                height="51px"
                                width="40%"
                                zIndex="0"
                                borderRadius={"10px"}
                                bgChangeHover="#ffffff"
                                hoverColor="#ad0000"
                                border="solid 1px #ad0000"
                                onClick={() => this.onClickCancel()}
                            >
                                Cancel
                    </Button>
                        </CommonStyle.ButtonDiv>
                        {/* <this.TextInputMasterDiv
                            headerTitle="Description : (optional)"
                            SelectedValues={this.state.masterDetail.other}
                            KeyName="other"
                        /> */}
                        {/* <this.TextInputMasterDiv
                            headerTitle="Order : (optional)"
                            SelectedValues={this.state.masterDetail.order && this.state.masterDetail.order !== '' ? this.state.masterDetail.order : undefined}
                            type="number"
                            KeyName="order"
                        /> */}
                    </CommonStyle.FormDiv>

                </CommonStyle.MainDiv>
                <Gap h="37px" />

                <CommonStyle.ButtonDiv>
                    {this.props.errorType === errorTypes.DISPLAY_ERROR &&
                        <div>
                            {this.props.errorMessage}
                            {this.hideError()}
                        </div>
                    }
                </CommonStyle.ButtonDiv>
                <CommonStyle.DetailsList width="100%">
                    <MasterDetails
                        MasterName={NewMasterName}
                        ParentMasterName={ParentMasterName}
                        data={this.props.masterDetailsCategory}
                        EditMasterDetails={this.EditMasterDetails}
                        deleteMasterDetails={this.deleteMasterDetails}
                    />
                </CommonStyle.DetailsList>
                <Gap h="100px" />
            </CommonStyle.MainDiv>
        )
    }
}

const mapStateToProps = state => {
    const { masterDetail, masterDetails, recordsCount, type } = state.masterDetailReducer;
    const { masterCategory, masterCategorys } = state.masterCategoryReducer;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { masterDetail, masterDetailsCategory, type, masterDetails, errorType, errorMessage, recordsCount,masterCategory, masterCategorys  };
};

export default connect(mapStateToProps, { getMasterDetails, getMasterCategorys,getMasterDetailsByMasterCategoryId,getMasterDetailsBymasterCategoryCode, getMasterDetailsById, saveMasterDetails, deleteMasterDetails, initMasterDetailsType, hideError })(Index);