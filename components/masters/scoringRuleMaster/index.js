import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gap from '../../Gap';
import style from '../../../theme/app.scss';
import Wrapper from '../../shared/Wrapper';
import { constants } from '../../../utils/constants';
import * as AdminTypes from '../../../action-types/admin.action.types';
import { getSectionMasterData, getAuditObservationMasterData, getCriticalityMasterData, getScoringRuleMasterData, saveScoringRuleMasterData, getScoringRuleMasterDataById, deleteScoringRuleMasterData } from '../../../actions/admin.action';
import ListTable from '../../shared/ListTable';
import ScoringRuleAddEdit from './scoringRule.add.edit';
import * as CommonStyle from '../../commonStyle';
import DatatableView from '../../ReactTableComponent';


class ScoringRulesIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            sections: props.sections ? props.sections : [],
            criticalitys: props.criticalitys ? props.criticalitys : [],
            auditObservations: props.auditObservations ? props.auditObservations : [],
            scoringRules: [],
            scoringRule: {},
            showEditPopup: false,
            type: AdminTypes.SCORINGRULEMASTER_INIT,
            columns: []
        };

        // let's load the data from the props
    }

    updateColumnOnPropsUpdate = () => {
        let columns = [
            {
                Header: 'Action',
                // accessor: 'id',
                id: 'id',
                show: true,
                minWidth: 150,
                Cell: propss => (
                    <React.Fragment>
                        <button className="warning" style={{ marginRight: '10px' }} value={propss.original.id} onClick={() => this.onClickAdd(propss.original)}>
                            Edit
                        </button>
                        {(propss.original.isInOperativeRecord && (propss.original.isInOperativeRecord === 1 || propss.original.isInOperativeRecord === true)) ?
                            <button className="primary" value={propss.original.id} onClick={() =>
                                this.onClickActiveInActive(propss.original.id, 'Active')
                            }>
                                Active
                           </button>
                            :
                            <button className="danger" value={propss.original.id} onClick={() => this.onClickActiveInActive(propss.original.id, 'InActive')}>
                                In-Active
                            </button>
                        }
                    </React.Fragment>
                ),
                sortable: false,
                filterable: false
            },
            {
                Header: 'Sr#',
                minWidth: 50,
                id: 'srnumber',
                show: true,
                Cell: row => (
                    <React.Fragment>
                        {row.index + 1}
                    </React.Fragment>
                ),
                sortable: true,
                filterable: false
            },
            {
                Header: 'Section',
                accessor: 'section.sectionName',
                id: 'sectionName',
                minWidth: 180,
                show: true,
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                        return true;
                    }
                    return row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        {this.state.sections && this.state.sections.length > 0 &&
                            this.state.sections.map((item, index) => {
                                return <option value={item.sectionName}>{item.sectionName}</option>
                            })
                        }
                    </select>
            },
            {
                Header: 'Criticiality',
                accessor: 'criticality.criticalityName',
                id: 'criticalityName',
                minWidth: 150,
                show: true,
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                        return true;
                    }
                    return row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        {this.state.criticalitys && this.state.criticalitys.length > 0 &&
                            this.state.criticalitys.map((item, index) => {
                                return <option value={item.criticalityName}>{item.criticalityName}</option>
                            })
                        }
                    </select>

            },
            {
                Header: 'Observation',
                accessor: 'auditObservation.observationName',
                id: 'observationName',
                minWidth: 150,
                show: true,
                filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                        return true;
                    }
                    return row[filter.id] === filter.value;
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        {this.state.auditObservations && this.state.auditObservations.length > 0 &&
                            this.state.auditObservations.map((item, index) => {
                                return <option value={item.observationName}>{item.observationName}</option>
                            })
                        }
                    </select>
            },
            {
                Header: 'Highest Score',
                accessor: 'highestScore',
                id: 'highestScore',
                minWidth: 150,
                show: false,
            },
            {
                Header: 'Actual Score',
                accessor: 'actualScore',
                id: 'actualScore',
                minWidth: 150,
                show: true,
            },
            {
                Header: 'Highest Score Applicable',
                accessor: d => `${d.isHighestScoreApplicable === true || d.isHighestScoreApplicable === 1 ? 'Yes' : 'No'}`,
                id: 'isHighestScoreApplicable',
                show: false,
                minWidth: 150,
            }
        ]

        this.setState({ columns: columns })
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.sections && nextProps.sections !== null && nextProps.sections !== 'undefined' && nextProps.sections !== this.state.sections) {
            this.setState({ sections: nextProps.sections });
            setTimeout(() => {
                this.updateColumnOnPropsUpdate();
            }, 100);
        }
        if (nextProps && nextProps.criticalitys && nextProps.criticalitys !== null && nextProps.criticalitys !== 'undefined' && nextProps.criticalitys !== this.state.criticalitys) {
            this.setState({ criticalitys: nextProps.criticalitys });
            setTimeout(() => {
                this.updateColumnOnPropsUpdate();
            }, 100);
        }
        if (nextProps && nextProps.auditObservations && nextProps.auditObservations !== null && nextProps.auditObservations !== 'undefined' && nextProps.auditObservations !== this.state.auditObservations) {
            this.setState({ auditObservations: nextProps.auditObservations });
            setTimeout(() => {
                this.updateColumnOnPropsUpdate();
            }, 100);
        }
        if (nextProps.scoringRules && nextProps.scoringRules !== null && nextProps.scoringRules != this.state.scoringRules) {
            this.setState({ scoringRules: nextProps.scoringRules })
        }
        if (nextProps.scoringRuleActiontype && nextProps.scoringRuleActiontype === AdminTypes.SCORINGRULEMASTER_SAVE_SUCCESS && this.state.showEditPopup === true) {
            setTimeout(() => {
                this.props.getScoringRuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
                this.setState({ showEditPopup: false })
            }, 500);
        }
        if (nextProps.scoringRuleActiontype && nextProps.scoringRuleActiontype === AdminTypes.SCORINGRULEMASTER_SAVE_SUCCESS && this.state.showEditPopup !== true) {
            setTimeout(() => {
                this.props.getScoringRuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
            }, 500);
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };


    componentDidMount() {
        // let's load the roles, for first time
        this.props.getScoringRuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getCriticalityMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnOnPropsUpdate();
        }, 100);
    };

    onDeleteRecord = (ids) => {
        this.props.deleteScoringRuleMasterData(ids);
        setTimeout(() => {
            this.props.getScoringRuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        }, 500);
    }

    onClickAdd = (scoringRule) => {
        this.setState({ scoringRule: scoringRule, showEditPopup: true })
    }
    onClickActiveInActive = (id, valueactiveInActive) => {
        if (valueactiveInActive === "Active") {
            if (confirm('are you sure active this scoring rule')) {
                let data = {
                    id: id,
                    isInOperativeRecord: false
                }
                this.props.saveScoringRuleMasterData(data, undefined);
            }
        }
        else if (valueactiveInActive === "InActive") {
            if (confirm('are you sure in-active this scoring rule')) {
                let data = {
                    id: id,
                    isInOperativeRecord: true
                }
                this.props.saveScoringRuleMasterData(data, undefined);
            }
        }
    }
    onClickReferesh = (async) => {
        this.props.getScoringRuleMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateColumnOnPropsUpdate();
        }, 100);
    }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    onClickCancel = () => {
        this.props.getSectionMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.props.getAuditObservationMasterData(0, constants.ALL_ROWS_LIST, undefined, undefined);
        this.setState({ showEditPopup: false })
    }

    render() {
        const { showEditPopup, columns, scoringRule, scoringRules } = this.state;

        return (
            <CommonStyle.MainDiv
                flexdirection={"column"}
                width={"100%"}
                textalign={"left"}
                justifycontent={"flex-start"}
                alignitems={"baseline"}
            >
                {showEditPopup === true &&
                    <>
                        <CommonStyle.Overlay
                        //onClick={() => this.onClickCancel()} 
                        />
                        <CommonStyle.Wrapper_OnOverlay
                            width={"80%"}
                            height={"fit-content"}
                            visible={showEditPopup}
                        >
                            <CommonStyle.CloseButtonForModel
                                onClick={() => this.onClickCancel()}
                            >X</CommonStyle.CloseButtonForModel>
                            <ScoringRuleAddEdit
                                baseObject={scoringRule}
                                onCancel={this.onClickCancel}
                                onSave={this.props.saveScoringRuleMasterData}
                            />
                        </CommonStyle.Wrapper_OnOverlay>

                    </>
                }
                <CommonStyle.MainDiv
                    flexdirection={"column"}
                    width={"100%"}
                    justifycontent={"flex-start"}
                    alignitems={"baseline"}
                >
                    <CommonStyle.MainDiv
                        width={"100%"}
                        flexdirection={"row"}
                        justifycontent={"flex-start"}
                    >
                        <CommonStyle.Button_Header
                            onClick={() => this.onClickAdd()}
                        >
                            <i className="fas fa-plus"></i>
                        </CommonStyle.Button_Header>
                        <CommonStyle.Button_Header
                            onClick={() => this.onClickReferesh()}
                        >
                            <i className="fas fa-sync-alt"></i>
                        </CommonStyle.Button_Header>
                    </CommonStyle.MainDiv>
                    <div
                        style={{ width: '98%' }}
                    >
                        <DatatableView
                            Data={scoringRules}
                            isColumnUpdate={true}
                            updateColumn={this.updateColumn}
                            columns={columns}
                        />
                    </div>
                </CommonStyle.MainDiv>
            </CommonStyle.MainDiv>);
    }
}


const mapStateToProps = state => {
    //const roleActiontype = state.adminReducer.roleActiontype;
    const { section, sections, criticality, criticalitys, auditObservation, auditObservations, scoringRule, scoringRules, scoringRuleRecordsCount, scoringRuleActiontype } = state.adminReducer;

    return { section, sections, criticality, criticalitys, auditObservation, auditObservations, scoringRule, scoringRules, scoringRuleRecordsCount, scoringRuleActiontype };
};

export default connect(mapStateToProps, { getSectionMasterData, getAuditObservationMasterData, getCriticalityMasterData, getScoringRuleMasterData, saveScoringRuleMasterData, getScoringRuleMasterDataById, deleteScoringRuleMasterData })(ScoringRulesIndex);