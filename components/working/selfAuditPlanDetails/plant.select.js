import React, { Component } from 'react';
import { connect } from 'react-redux';

import { constants } from '../../../utils/constants';
import style from '../../../theme/app.scss';
import { getPlantMaster, getPlantMasterByGroupCompanyId, getPlantMasterByGroupCompanyId_UsingProcedure, initPlantMaster, getPlantMasterById } from '../../../actions/admin.action';
import Wrapper from '../../shared/Wrapper'
import Gap from '../../Gap';
import CompanyPlantDetails from '../../masters/plantMaster/plant.add.edit'
import { hideError, showError } from '../../../actions/error.actions';
import ListTable from '../../shared/ListTable';


import * as AdminTypes from '../../../action-types/admin.action.types';


class Index extends Wrapper {
    configs = [];
    constructor(props) {
        super(props);
        this.state = {
            plants: [],
            plant: {},
            showEditPopup: false,
            type: AdminTypes.PLANTMASTER_INIT,
            selectedCompanyIds: null,
            selectedYearMasterIds: null,
            selectedFromDate: null,
            selectedToDate: null,
            selectedPlants: []
        };

        // let's load the data from the props
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.selectedCompanyIds != undefined && nextProps.selectedCompanyIds != this.state.selectedCompanyIds) {
            this.setState({
                selectedCompanyIds: nextProps.selectedCompanyIds
            });
            let StringCompanyIds = this.returnIdsFunction(nextProps.selectedCompanyIds);
            setTimeout(() => {
                this.props.getPlantMasterByGroupCompanyId_UsingProcedure(StringCompanyIds,this.state.selectedYearMasterIds,this.state.selectedFromDate,this.state.selectedToDate,undefined)
                // this.props.getPlantMasterByGroupCompanyId(nextProps.selectedCompanyIds);
            }, 2);
        }
        if (nextProps && nextProps.selectedYearMasterIds != undefined && nextProps.selectedYearMasterIds != this.state.selectedYearMasterIds) {
            this.setState({
                selectedYearMasterIds: nextProps.selectedYearMasterIds
            });
            let StringCompanyIds = this.returnIdsFunction(this.state.selectedCompanyIds);
            setTimeout(() => {
                this.props.getPlantMasterByGroupCompanyId_UsingProcedure(StringCompanyIds,nextProps.selectedYearMasterIds,this.state.selectedFromDate,this.state.selectedToDate,undefined)
                // this.props.getPlantMasterByGroupCompanyId(nextProps.selectedCompanyIds);
            }, 2);
        }
        if (nextProps && nextProps.selectedFromDate != undefined && nextProps.selectedFromDate != this.state.selectedFromDate) {
            this.setState({
                selectedFromDate: nextProps.selectedFromDate
            });
            let StringCompanyIds = this.returnIdsFunction(this.state.selectedCompanyIds);
            setTimeout(() => {
                this.props.getPlantMasterByGroupCompanyId_UsingProcedure(StringCompanyIds,this.state.selectedYearMasterIds,nextProps.selectedFromDate,this.state.selectedToDate,undefined)
                // this.props.getPlantMasterByGroupCompanyId(nextProps.selectedCompanyIds);
            }, 2);
        }
        if (nextProps && nextProps.selectedToDate != undefined && nextProps.selectedToDate != this.state.selectedToDate) {
            this.setState({
                selectedToDate: nextProps.selectedToDate
            });
            let StringCompanyIds = this.returnIdsFunction(this.state.selectedCompanyIds);
            setTimeout(() => {
                this.props.getPlantMasterByGroupCompanyId_UsingProcedure(StringCompanyIds,this.state.selectedYearMasterIds,this.state.selectedFromDate,nextProps.selectedToDate,undefined)
                // this.props.getPlantMasterByGroupCompanyId(nextProps.selectedCompanyIds);
            }, 2);
        }
    };
    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    componentDidMount() {
        // let's load the groups, for first time
        //console.log("this.props.selectedCompanyIds : ", this.props.selectedCompanyIds);

        //this.props.getPlantMasterByGroupCompanyId(0, constants.ALL_ROWS_LIST, undefined, undefined);
        if (this.props.selectedCompanyIds != undefined) {
            this.setState({
                selectedCompanyIds: this.props.selectedCompanyIds
            })
        }
        setTimeout(() => {
            let StringCompanyIds = this.returnIdsFunction(this.state.selectedCompanyIds);
         
            this.props.getPlantMasterByGroupCompanyId_UsingProcedure(StringCompanyIds,this.state.selectedYearMasterIds,this.state.selectedFromDate,this.state.selectedToDate,undefined)
           
         //  this.props.getPlantMasterByGroupCompanyId(this.state.selectedCompanyIds);
        }, 200);
    };

    onPlantSelection = (plantIds, selectedData, companyIds, ids) => {
        //console.log("companyIds : ", companyIds);
        //console.log("plantIds : ", plantIds);
        //console.log("ids : ", ids);

        var selectedPlants = selectedData && selectedData.map(function (value, index) { return { 'plantMasterId': value['id'], 'companyMasterId': value['companyMasterID'] }; });
        console.log("SelectedPlants : ", selectedPlants);
        this.setState({
            selectedPlants: selectedPlants
        });
        this.props.onPlantSelection(selectedPlants, plantIds);
    }

    render() {
        let WindowHeight = this.props.windowHeight ? this.props.windowHeight : 836;
        //console.log("this.props.selectedCompanyIds : ", this.props.selectedCompanyIds);

        WindowHeight = (WindowHeight - 320);

        const dataRows = this.props.plants && this.props.plants.length > 0 ? this.props.plants : [];
        return (<div id='CompanyPlantTable' className={style.table_wapper} style={{ paddingTop: '0px', marginBottom: '0px', paddingBottom: '0px' }} >

            <ListTable
                recordsCount={this.props.plantRecordsCount}
                EditForm={CompanyPlantDetails}
                onRefresh={this.props.getPlantMaster}
                onSave={this.props.savePlantMasterData}
                getById={this.props.getPlantMasterById}
                onDelete={this.props.deletePlantMaster}
                actionType={this.props.plantActiontype}
                onSelection={this.onPlantSelection}
                needIdsOnCheckboxSelection={true} 
                isCheckboxVisibleOnlyPlanNoExistingPlan={true}
                dataRows={dataRows}
                pickEditFromMemory={true}
                isFilterRequired={true}
                showDateFilter={false}
                pickEditFromMemory={true}
                evidenceUpdateRequired={false}
                viewInvoiceButtonRequired={false}
                isCloseAfterSave={true}
                actionsWidth='55px'
                maxHeight={'300px'}
                isDateAndTimeRequired={false}
                hideAdd={true}
                hideRefresh={true}
                hideChooseColumns={true}
                hideSortingColumns={true}
                hideCopy={true}
                hideAddFilters={true}
                hideClearFilters={true}
                hideGridEdit={true}
                hideGridDelete={true}
                hideGridMoveUp={true}
                hideTrash={true}
                hideGridCheckBox={false}
                hideLoadMore={true}
                hideQuickSearch={true}
                rupaySignVisible={false}
                columnHeadings={[
                    {
                        name: 'companyName',
                        type: 'string',
                        displayName: 'Company',
                        width: "280px",
                        textAlign: "left"
                    },
                    {
                        name: 'plantName',
                        type: 'string',
                        displayName: 'Plant Name',
                        width: "280px"
                    },
                    {
                        name: 'plantCode',
                        type: 'string',
                        displayName: 'Plant Code'
                    },
                    {
                        name: 'plantEmail',
                        type: 'string',
                        displayName: 'Email',
                        width: "280px"
                    },
                    {
                        name: 'IsAlreadyPlanned',
                        type: 'string',
                        displayName: 'Is Already Planned' 
                    },
                    // {
                    //     name: 'GSTNumber',
                    //     type: 'string'
                    // },
                    // {
                    //     name: 'TANNumber',
                    //     type: 'string'
                    // },

                ]}
            />
            {/* <Gap h="5rem" /> */}
        </div>);
    }
}



const mapStateToProps = state => {
    const { plant, plants, plantActiontype, plantRecordsCount, companys, groups } = state.adminReducer;
    const masterDetailsCategory = state.masterDetailByCategoryReducer && state.masterDetailByCategoryReducer.masterDetailsCategory;
    const windowHeight = state.windowReducer.height;
    return { plant, plants, plantActiontype, plantRecordsCount, groups, masterDetailsCategory, companys, windowHeight };
};

export default connect(mapStateToProps, { getPlantMaster, getPlantMasterByGroupCompanyId, getPlantMasterByGroupCompanyId_UsingProcedure, initPlantMaster, getPlantMasterById, hideError })(Index);