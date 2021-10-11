import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validateInputs } from '../../../utils/editFormHelper';

import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../commonStyle'
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle'
import { getMasterCategorys, getMasterCategorysById, saveMasterCategorys, deleteMasterCategorys, initMasterCategoryType } from '../../../actions/masterCategory.actions';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import MasterCategoryDetails from './masterCategoryDetails'
import { hideError, showError } from '../../../actions/error.actions';


import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';


class Index extends Wrapper {
    configs = [{
        name: 'masterCategoryName',
        type: 'string',
        required: true
    }, {
        name: 'masterCategoryCode',
        type: 'string',
        required: true
    }, {
        name: 'componentName',
        type: 'string',
        required: false
    }];

    constructor() {
        super();
        this.state = {
            PageErro: '',
            TextColor: '',
            errorMessage: '',
            errortype: '',
            masterCategorys: [],
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
            masterCategory: {
                id: undefined,
                moduleMasterID: 'b667648e-1838-11eb-aecb-24770383f624',
                masterCategoryName: '',
                masterCategoryCode: '',
                parentMasterCategoryId: '',
                isChildApplicable: 'false',
                isParentApplicable: 'false',
                componentName: '',
                pageName: '',
                description: '',
                isLinkVisible: 'true',
                isCommonForAllModule: 'true',
                order: ''
            },
            showEditPopup: false
        };
    }


    onTextChange = key => event => {
        const state = {};
        if (key === "isParentApplicable") {
            if (event.target.value === 'false') {
                this.state.masterCategory.parentMasterCategoryId = ''
            }
            this.state.isParentMasterCategoryDDLVisible = event.target.value;
        }

        this.state.masterCategory[key] = event.target.value;

        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });

    };

    onSubmit = async () => {

        try {
            const validationText = validateInputs(this.state.masterCategory, this.configs);
            if (validationText) {
                return alert(validationText);
            }
            const masterCategoryDetails = Object.assign({}, this.state.masterCategory);
            let Valuereturn = undefined;

            this.props.saveMasterCategorys(masterCategoryDetails, Valuereturn)


            this.state.masterCategory.id = undefined;
            this.state.masterCategory.masterCategoryName = '';
            this.state.masterCategory.masterCategoryCode = '';
            this.state.masterCategory.parentMasterCategoryId = '';
            this.state.masterCategory.isChildApplicable = 'false';
            this.state.masterCategory.isParentApplicable = 'false';
            this.state.masterCategory.componentName = '';
            this.state.masterCategory.pageName = '';
            this.state.masterCategory.description = '';
            this.state.masterCategory.isLinkVisible = 'true';
            this.state.masterCategory.isCommonForAllModule = 'true';
            this.state.masterCategory.order = (this.state.masterCategory.order + 1);
            this.state.isParentMasterCategoryDDLVisible = false;
          //  this.state.errorMessage = ' Master Category Master add successfully';
          //  this.state.errortype = 'success';

            setTimeout(() => {
                this.props.getMasterCategorys(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);

            }, 400);

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
        const state = {}
        const LasterOrder = this.props.masterCategorys && this.props.masterCategorys.length + 1;
        this.props.getMasterCategorys(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);

        this.state.masterCategory.order = LasterOrder;
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }
    deleteMasterCategory = (id) => {

        this.props.deleteMasterCategorys(id);

        setTimeout(() => {
            this.props.getMasterCategorys(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        }, 200);


    }
    EditMasterCategory = (Id) => {
        if (Id && Id !== null && Id !== undefined) {
            this.props.getMasterCategorysById(Id);

            setTimeout(() => {
                this.setState({ masterCategory: this.props.masterCategory, isParentMasterCategoryDDLVisible: this.props.masterCategory.isParentApplicable })
            }, 200);
        }
    }
    onClickCancel = () => {
        const state = {};

        this.state.masterCategory.id = undefined;
        this.state.masterCategory.masterCategoryName = '';
        this.state.masterCategory.masterCategoryCode = '';
        this.state.masterCategory.parentMasterCategoryId = '';
        this.state.masterCategory.isChildApplicable = 'false';
        this.state.masterCategory.isParentApplicable = 'false';
        this.state.masterCategory.componentName = '';
        this.state.masterCategory.pageName = '';
        this.state.masterCategory.description = '';
        this.state.masterCategory.isLinkVisible = 'true';
        this.state.masterCategory.isCommonForAllModule = 'true';
        this.state.isParentMasterCategoryDDLVisible = false;
        this.setState({
            ...state
        }, () => {
            // console.log("state", this.state)
        });
    }

    TextInputMasterDiv = props => {
        return <CommonStyle.InputControlsDiv>
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
        const ParentMasterCategoryData = this.props.masterCategorys && this.props.masterCategorys.length > 0 && this.props.masterCategorys.filter(item => item.isChildApplicable === "Yes")
        const ParentDDLVisible = this.state.isParentMasterCategoryDDLVisible;
        const LasterOrder = this.props.masterCategorys && this.props.masterCategorys.length + 1;


        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
                flexdirection="column"
            >
                {this.state.errortype === "success" &&
                    <SuccessMessage>
                        {this.state.errorMessage}
                    </SuccessMessage>
                }
                {this.state.errortype === "error" &&
                    <ErrorMessage>
                        {this.state.errorMessage}
                    </ErrorMessage>
                }
                <CommonStyle.MainDiv>
                    <CommonStyle.FormDiv>
                        <this.TextInputMasterDiv
                            headerTitle="Master Category Name"
                            SelectedValues={this.state.masterCategory.masterCategoryName}
                            KeyName="masterCategoryName"
                        />
                        <this.TextInputMasterDiv
                            headerTitle="Master Category Code"
                            SelectedValues={this.state.masterCategory.masterCategoryCode}
                            KeyName="masterCategoryCode"
                        />
                        <this.CommonSelectInputMasterDiv
                            headerTitle="Parent Applicable"
                            SelectedValues={this.state.masterCategory.isParentApplicable}
                            KeyName="isParentApplicable"
                            ddlData={this.state.boolValuesForDDL && this.state.boolValuesForDDL}
                        />

                        {ParentDDLVisible && (ParentDDLVisible === true || ParentDDLVisible === 'true') &&
                            <CommonStyle.InputControlsDiv>
                                <CommonStyle.InputLabel>
                                    Parent Category
                            </CommonStyle.InputLabel>
                                <CommonStyle.InputDiv>
                                    <SELECT
                                        value={this.state.masterCategory.parentMasterCategoryId}
                                        paddingLeft="20px"
                                        borderRadius="14px"
                                        height="51px"
                                        type="text"
                                        color="#000"
                                        borderColor="#000"
                                        style={{ backgroundColor: "transparent" }}
                                        onChange={this.onTextChange('parentMasterCategoryId')}
                                    >
                                        <option value=''>Select Parent Master Category</option>
                                        {ParentMasterCategoryData &&
                                            ParentMasterCategoryData.map((item, index) => {
                                                return <option key={index} value={item.id}>{item.masterCategoryName}</option>
                                            })

                                        }
                                    </SELECT>
                                </CommonStyle.InputDiv>
                            </CommonStyle.InputControlsDiv>

                        }
                        <this.CommonSelectInputMasterDiv
                            headerTitle="Child Applicable"
                            SelectedValues={this.state.masterCategory.isChildApplicable}
                            KeyName="isChildApplicable"
                            ddlData={this.state.boolValuesForDDL && this.state.boolValuesForDDL}
                        />
                        <this.TextInputMasterDiv
                            headerTitle="Component Name"
                            SelectedValues={this.state.masterCategory.componentName}
                            KeyName="componentName"
                        />
                        <this.TextInputMasterDiv
                            headerTitle="Page"
                            SelectedValues={this.state.masterCategory.pageName}
                            KeyName="pageName"
                        />

                        <this.TextInputMasterDiv
                            headerTitle="Description"
                            SelectedValues={this.state.masterCategory.description}
                            KeyName="description"
                        />
                        <this.CommonSelectInputMasterDiv
                            headerTitle="Link Visible"
                            SelectedValues={this.state.masterCategory.isLinkVisible}
                            KeyName="isLinkVisible"
                            ddlData={this.state.boolValuesForDDL && this.state.boolValuesForDDL}
                        />
                        <this.CommonSelectInputMasterDiv
                            headerTitle="Common For All"
                            SelectedValues={this.state.masterCategory.isCommonForAllModule}
                            KeyName="isCommonForAllModule"
                            ddlData={this.state.boolValuesForDDL && this.state.boolValuesForDDL}
                        />
                        <this.TextInputMasterDiv
                            headerTitle="Order"
                            SelectedValues={this.state.masterCategory.order && this.state.masterCategory.order !== '' ? this.state.masterCategory.order : LasterOrder}
                            type="number"
                            KeyName="order"
                        />
                    </CommonStyle.FormDiv>

                </CommonStyle.MainDiv>
                <Gap h="37px" />
                <CommonStyle.ButtonDiv
                    width="50%"
                >
                    <Button
                        bgColor="#005900"
                        color="#ffffff"
                        height="51px"
                        width="47%"
                        bgChangeHover="#ffffff"
                        hoverColor="#005900"
                        border="solid 1px #005900"
                        onClick={() => this.onSubmit()}
                    >
                        Create
                    </Button>
                    <Button
                        bgColor="#ad0000"
                        color="#ffffff"
                        height="51px"
                        width="47%"
                        bgChangeHover="#ffffff"
                        hoverColor="#ad0000"
                        border="solid 1px #ad0000"
                        onClick={() => this.onClickCancel()}
                    >
                        Cancel
                    </Button>
                </CommonStyle.ButtonDiv>
                <CommonStyle.ButtonDiv>
                    {this.props.errorType === errorTypes.DISPLAY_ERROR &&
                        <div>
                            {this.props.errorMessage}
                            {this.hideError()}
                        </div>
                    }
                </CommonStyle.ButtonDiv>
                <CommonStyle.DetailsList width="100%">
                    <MasterCategoryDetails
                        data={this.props.masterCategorys}
                        EditMasterCategory={this.EditMasterCategory}
                        deleteMasterCategory={this.deleteMasterCategory}
                    />
                </CommonStyle.DetailsList>
                <Gap h="100px" />
            </CommonStyle.MainDiv>
        )
    }
}

const mapStateToProps = state => {
    const { masterCategory, masterCategorys, recordsCount } = state.masterCategoryReducer;

    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;
    return { masterCategory, masterCategorys, errorType, errorMessage, recordsCount };
};

export default connect(mapStateToProps, { getMasterCategorys, getMasterCategorysById, hideError, saveMasterCategorys, deleteMasterCategorys, initMasterCategoryType })(Index);