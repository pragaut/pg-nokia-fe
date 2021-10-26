import React, { Component } from 'react';
import { connect } from 'react-redux';

import { constants } from '../../../utils/constants';
import { getOrganisationDetailsData, saveOrganisationGroupModulesMasterData, getOrganisationGroupModulesMasterData, getModuleMasterData } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import { hideError, showError } from '../../../actions/error.actions';
import * as AdminTypes from '../../../action-types/admin.action.types';
import * as errorTypes from '../../../action-types/error.action.types';
import * as commonTypes from '../../../action-types/common.action.types';
import { uniqueId } from '../../../utils';
import * as CommonStyle from '../../commonStyle';
import style from '../../../theme/app.scss';
import DatatableView from '../../ReactTableComponent';
import { SELECT, SpanLabelForDDl } from '../../formStyle'
class Index extends Wrapper {
    configs = [];

    constructor(props) {

        super(props);
        this.state = {
            organisationGroupModule: {},
            organisationGroupModules: [],
            parentOrganisations: [],
            modules: [],
            selectedOrganisation: [],
            showEditPopup: false,
            type: AdminTypes.ORGANISATIONGROUPMODULEMASTER_INIT,
            columns: [],
            grpModuleId: ''
        }; 
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.organisations && nextProps.organisations !== null && nextProps.organisations !== undefined && nextProps.organisations !== 'undefined' && nextProps.organisations !== this.state.organisations) {
            this.setState({
                organisations: nextProps.organisations
            })
            let organisations = nextProps.organisations;
            let parentOrganisationData = organisations && organisations.length > 0 && organisations.filter(item => (item.isParent === true || item.isParent === 1));
            this.setState({ parentOrganisations: parentOrganisationData })
        }
        if (nextProps && nextProps.organisationGroupModules && nextProps.organisationGroupModules !== null && nextProps.organisationGroupModules !== undefined && nextProps.organisationGroupModules !== 'undefined' && nextProps.organisationGroupModules !== this.state.organisationGroupModules) {
            this.setState({
                organisationGroupModules: nextProps.organisationGroupModules
            })

        }
        if (nextProps && nextProps.modules && nextProps.modules !== null && nextProps.modules !== undefined && nextProps.modules !== 'undefined' && nextProps.modules !== this.state.modules) {
            this.setState({
                modules: nextProps.modules
            })

        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };

    async componentDidMount() {
        // let's load the groups, for first time
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getModuleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationGroupModulesMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        // setTimeout(() => {
        //     this.updateStateAfterStateUpdate();
        // }, 100);
    };

    onChangeValueNew = (index, id, orgDetailsId) => event => {
        //alert("DDl Changed"); 
        const grpModuleId = this.state.grpModuleId;
        const organisationGroupModules = this.state.organisationGroupModules;
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;

        const index = organisationGroupModules && organisationGroupModules.length > 0 && organisationGroupModules.findIndex(item => item.orgDetailsId === orgDetailsId);
        if ((selectedValue === "true" || selectedValue === true || selectedValue === "Yes")) {
            if (index > -1) {
                const ExistingState = [...organisationGroupModules]
                ExistingState[index].grpModuleId = grpModuleId;
                ExistingState[index].isActive = true;
                this.setState({ organisationGroupModules: ExistingState })
            }
        }
        else if ((selectedValue === "false" || selectedValue === false || selectedValue === "No")) {
            const ExistingState = [...organisationGroupModules]
            ExistingState[index].grpModuleId = grpModuleId;
            ExistingState[index].isActive = false;
            this.setState({ organisationGroupModules: ExistingState })
        }
    }
    onSaveDtaa = () => {
        const data = this.state.organisationGroupModules;
        let filterData = data && data.length > 0 && data.filter(item => (item.isActive === true || item.isActive === 1));
        let dataSend = {
            organisationModuleDetails: filterData,
            grpModuleId: this.state.grpModuleId
        }
        this.props.saveOrganisationGroupModulesMasterData(dataSend);
    }
    onDeleteRecord = (ids) => {
        // if (confirm('Would you like to delete the record?')) {
        //     this.props.deleteOrganisationEmployeeDetailsData(ids);
        //     setTimeout(() => {
        //         this.props.getOrganisationEmployeeDetailsData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        //     }, 500);
        // }

    }

    onValueChanged = key => event => {
        let SelectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;        
        this.setState({ grpModuleId: SelectedValue });
        if(SelectedValue && SelectedValue !==null && SelectedValue !==""){
            this.props.getOrganisationGroupModulesMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined,SelectedValue);             
        }
    };
    onClickCancel = key => {
        this.setState({ grpModuleId: '' 
         });
        
        this.props.getOrganisationDetailsData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getModuleMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getOrganisationGroupModulesMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
    };
    updateColumn = (column) => {
        this.setState({ columns: column });
    }

    render() {
        console.log("organisationGroupModules", this.state.organisationGroupModules);
        console.log("Modules", this.state.modules);
        const { showEditPopup, columns, parentOrganisations, organisationGroupModule, organisationGroupModules } = this.state;
        return ( <>
            <CommonStyle.MainDiv
                flexdirection={"column"}
                width={"100%"}
                textalign={"left"}
                justifycontent={"flex-start"}
                alignitems={"baseline"}
            >
                <CommonStyle.MainDiv
                    flexdirection={"column"}
                    width={"100%"}
                    justifycontent={"flex-start"}
                    alignitems={"baseline"}
                    textalign={"left"}
                >
                    <div style={{ padding: '0px 0px 10px 0px', width: '30%' }}>
                        <SpanLabelForDDl>Module</SpanLabelForDDl>
                        <Gap h="5px" />
                        <SELECT
                            value={this.state.grpModuleId} paddingLeft="10px" borderRadius="14px" height="41px"
                            type="text" color="rgba(0,0,0,0.87)" borderColor="rgba(0,0,0,0.54)"
                            style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
                            onChange={this.onValueChanged('grpModuleId')}
                        >
                            <option key="a0" value="" >--- Select Module ---</option>

                            {this.state.modules &&
                                this.state.modules.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.moduleName}</option>
                                })
                            }
                        </SELECT>
                    </div>
                </CommonStyle.MainDiv>
                <div
                    style={{ width: '98%' }}
                >
                    {/* <DatatableView
                        Data={organisationGroupModules}
                        isColumnUpdate={true}
                        updateColumn={this.updateColumn}
                        columns={columns}
                    /> */}

                    <CommonStyle.TABLE>
                        <tr>
                            <th>Action</th>
                            <th>Organisation Name</th>
                            <th>Organisation Code</th>
                            <th>Email ID</th>
                            <th>Phone Number</th>
                        </tr>

                        {this.state.organisationGroupModules && this.state.organisationGroupModules.length > 0 && this.state.organisationGroupModules.map((item, index) => {
                            let isChecked = false;
                            if (item.isActive && this.state.grpModuleId && this.state.grpModuleId !==null && item.isActive !== null && (item.isActive === true || item.isActive === 1)) {
                                isChecked = true;
                            }
                            return <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={item.orgDetailsId}
                                        checked={isChecked}
                                        name="Section_Organisation"
                                        onChange={this.onChangeValueNew(index, item.id, item.orgDetailsId, item.isActive)} />                                 </td>
                                <td>{item.orgName}</td>
                                <td>{item.orgCode}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        })
                        }

                    </CommonStyle.TABLE>
                    {/* <div style={{ display: 'flex', width: '100%', alignItems: 'left', justifyContent: 'left', margin: '10px 0px' }}>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.primary_btn} onClick={() =>this.onSaveDtaa()}>save</button> 
                </div> */}
              
                </div> 
            </CommonStyle.MainDiv>
            <div className={style.modal_dialog} >
            <div style={{ display: 'flex', width: '100%', alignItems: 'left', justifyContent: 'left', margin: '10px 0px' }}>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.primary_btn}  
                        onClick={() =>this.onSaveDtaa()}>save</button>
                    <button
                        style={{ width: '100px', marginRight: '10px' }}
                        className={style.btn_danger}   onClick={() =>this.onClickCancel()}>cancel</button>
                </div>
            </div>

            </>
        );
    }
}



const mapStateToProps = state => {
    const { parentOrganisations, modules, organisationGroupModule, organisationGroupModules, organisationGroupModuleActiontype, organisationGroupModuleRecordsCount } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return { parentOrganisations, modules, organisationGroupModule, organisationGroupModules, organisationGroupModuleActiontype, organisationGroupModuleRecordsCount, errorType, errorMessage };
};

export default connect(mapStateToProps, {
    getOrganisationDetailsData, getModuleMasterData, saveOrganisationGroupModulesMasterData, getOrganisationGroupModulesMasterData, hideError
})(Index);