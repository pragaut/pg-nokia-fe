import React, { Component } from 'react';
import { connect } from 'react-redux';
import { constants } from '../../../../utils/constants';
import { getAlarmTypeMasterData } from '../../../../actions/comman/admin.action';
import { getTowerNotificationDetails, updateTowerNotificationDetails } from '../../../../actions/tmc/working.action';
import Wrapper from '../../../shared/Wrapper'
import Gap from '../../../comman/Gap';
import { hideError, showError } from '../../../../actions/comman/error.actions';
import * as WorkingTypes from '../../../../action-types/tmc/working.action.types';
import * as CommonStyle from '../../../comman/commonStyle';
import DatatableView from '../../../comman/ReactTableComponent';
import style from '../../../../theme/app.scss';
import Input from '../../../shared/InputBox';
import { SELECT, SpanLabelForDDl ,Button} from '../../../comman/formStyle';
import { validateInputs } from '../../../../utils/editFormHelper';
import { Icon } from "antd";
import { color } from 'highcharts'; 
import { withRouter } from "next/router";
class TowerNotificationDetails extends Wrapper {
    configs = [];

    constructor(props) {

        super(props);
        this.state = {
            towerNotificationDetails: [],
            towerNotificationDetail: {},
            isModalPopupOpen: false,
            towerNotificationDetailId: null,
            alarms: [],
            alarm: {},
            type: WorkingTypes.TOWERNOTIFICATIONDETAILS_LIST_SUCCESS,
            columns: []
        };

        // let's load the data from the props
    }


    updateStateAfterStateUpdate = () => {
        let columns = [
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
                Header: 'Device ID',
                accessor: d => `${d.uniqueId}`,
                id: 'uniqueId',
                show: true,
            },
            {
                Header: 'MAC Address',
                accessor: d => `${d.macAddress}`,
                id: 'macAddress',
                show: true,
            },
            {
                Header: 'Notification',
                accessor: d => `${d.notificationName}`,
                id: 'notificationName',
                show: true,
            },
            {
                Header: 'Date',
                accessor: d => `${d.notificationDate}`,
                id: 'notificationDate',
                show: true,
            },
            {
                Header: 'Alarm Type',
                accessor: d => `${d.alarmTypeName}`,
                id: 'alarmTypeName',
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
                        {this.state.alarms && this.state.alarms.length > 0 &&
                            this.state.alarms.map((item, index) => {
                                return <option value={item.alarmTypeName}>{item.alarmTypeName}</option>
                            })
                        }
                    </select>
            },
            {
                Header: 'Action',
                accessor: 'id',
                id: 'id',
                show: true,
                filterable: false,
                Cell: p => (
                    <React.Fragment>

                        {p.original.id && p.original.id !== null && (p.original.isClosed === false && p.original.isClosed != null) &&
                            <button className="primary" value={p.original.id} onClick={() =>
                                this.onClickUpdateStatus(p.original.id)
                            }>
                                Update Status
                            </button>
                        }
                    </React.Fragment>
                ),
            },
        ]
        this.setState({ columns: columns });
    }

    async componentDidMount() {
        // let's load the groups, for first time
        let filters = {
            isClosed: 0
        }
        this.props.getTowerNotificationDetails(filters, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getAlarmTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        setTimeout(() => {
            this.updateStateAfterStateUpdate();
        }, 100);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.towerNotificationDetails && nextProps.towerNotificationDetails !== this.state.towerNotificationDetails) {
            this.setState({ towerNotificationDetails: nextProps.towerNotificationDetails });
            setTimeout(() => {
                this.updateStateAfterStateUpdate();
            }, 100);
        }
        if (nextProps && nextProps.alarms && nextProps.alarms !== this.state.alarms) {
            this.setState({ alarms: nextProps.alarms });
        }
        if (nextProps && nextProps.towerNotificationDetailActiontype && nextProps.towerNotificationDetailActiontype === WorkingTypes.TOWERNOTIFICATIONDETAILS_SAVE_SUCCESS) {
            setTimeout(() => {
                this.onClickCancel();
                this.setState({ towerNotificationDetail: {} });
            }, 300);
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    };

    onValueChanged = key => event => {
        const existingTowerNotification = Object.assign({}, this.state.towerNotificationDetail);
        existingTowerNotification[key] = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        //console.log("Remarks : >>>>>>>",event.target.value);
        this.setState({ towerNotificationDetail: existingTowerNotification });
    };

    onClickUpdateStatus = (id, isModalPopupOpen) => {
        const existingTowerNotification = Object.assign({}, this.state.towerNotificationDetail);
        existingTowerNotification['id'] = id;

        this.setState({
            isModalPopupOpen: true,
            towerNotificationDetailId: id,
            towerNotificationDetail: existingTowerNotification
        })
    }
    onClickCancel = () => {
        this.onClickReferesh();
        this.setState({
            isModalPopupOpen: false,
            towerNotificationDetailId: null
        })
    }
    onClickClosedNotificationPage = () => {
        let LinkData = {
            pathname: "/management",
            tab: "closed-tower-notification-details",
            pageName: 'Closed Notification Details',
            url: "/management/closed-tower-notification-details",
            activetabname: "tower-notification-details",
            isVisible: true,
            ApplicableFor: 'Working',
            linkName: 'Closed Notification',
            roleCode: 'Management',
        }
        this.props.router.push(
            {
                pathname: LinkData.pathname,
                tab: LinkData.tab,
                query: {
                    tab: LinkData.tab,
                    id: undefined,
                    pageName: LinkData.pageName,
                    page: LinkData.pageName,
                    MasterName: LinkData.pageName,
                    activetabname:LinkData.activetabname
                }
            },
            LinkData.url
        );
    }
    onClickReferesh = (async) => {
        let filters = {
            isClosed: 0
        }
        this.props.getTowerNotificationDetails(filters, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.props.getAlarmTypeMasterData(0, constants.DEFAULT_ROWS_LIST, undefined, undefined);
        this.updateStateAfterStateUpdate();
    }

    // onClickReferesh = (async) => {
    //     this.props.getDeviceMappingDetails(0, constants.ALL_ROWS_LIST, undefined, undefined);
    //     setTimeout(() => {
    //         this.updateStateAfterStateUpdate();
    //     }, 100);
    // }
    updateColumn = (column) => {
        this.setState({ columns: column });
    }
    render() {
        //console.log("Antenna Rotataion Details", this.state.antennaRotationDetails);
        const { showEditPopup, isModalPopupOpen, columns, towerNotificationDetails, alarms } = this.state;
        return (
            <CommonStyle.MainDiv
                flexdirection={"column"}
                width={"100%"}
                textalign={"left"}
                justifycontent={"flex-start"}
                alignitems={"baseline"}
            >
                <CommonStyle.MainDiv
                    padding="0px 0px"
                    flexdirection="row"
                    width={'100%'}
                    justifycontent="flex-start"
                >
                    <Button
                         width="200px"
                        height="30px"
                        borderRadius="5px"
                        bgColor="#fff"
                        color="#0d3e99"
                        padding="0px 10px"
                        lineheight="1"
                        border="1px solid #0d3e99"
                        fontsize="14px"
                        textTranform="capitalize"
                        hoverColor="#fff"
                        bgChangeHover="#0d3e99"
                        style={{marginRight:'10px'}}
                    >
                        Notification
                    </Button>
                    <Button
                        width="200px"
                        height="30px"
                        borderRadius="5px"
                        bgColor="#0d3e99"
                        fontsize="14px"
                        lineheight="1"
                        padding="0px 10px"
                        border="1px solid #0d3e99"
                        hoverColor="#0d3e99"
                        textTranform="capitalize"
                        bgChangeHover="#fff"
                        onClick={() => this.onClickClosedNotificationPage()}
                    >
                        Closed Notification
                    </Button>
                </CommonStyle.MainDiv>
                {isModalPopupOpen && isModalPopupOpen === true &&

                    <>
                        <CommonStyle.Overlay
                        // onClick={() => this.onClickCancel()}
                        />
                        <CommonStyle.Wrapper_OnOverlay
                            width={"80%"}
                            height={"fit-content"}
                            visible={isModalPopupOpen}
                        >
                            <CommonStyle.CloseButtonForModel
                                onClick={() => this.onClickCancel()}
                            >X</CommonStyle.CloseButtonForModel>
                            <div className={style.modal_dialog} style={{ width: '95%', maxHeight: '120vh', maxWidth: '80vw' }}>

                                <div>
                                    <div className={style.field_flex_wrapper}>
                                        <div className={style.field_flex_new} style={{ width: '45%' }}>
                                            <Input label="Remarks:" type='text' defaultValue={this.state.towerNotificationDetail.remarks} onChange={this.onValueChanged('remarks')} />
                                        </div>
                                    </div>
                                </div>
                                {/* container for save and cancel */}
                                <div style={{ display: 'flex', width: '200px', alignItems: 'left', justifyContent: 'left', margin: '10px 0px' }}>
                                    <button
                                        style={{ width: '100px', marginRight: '10px' }}
                                        className={style.primary_btn} onClick={() => {
                                            console.log(this.state.towerNotificationDetail);
                                            const validationText = validateInputs(this.state.towerNotificationDetail, this.configs);
                                            if (validationText) {
                                                return alert(validationText);
                                            }
                                            setTimeout(() => {
                                                this.props.updateTowerNotificationDetails(this.state.towerNotificationDetail, this.props.index);
                                            }, 200);

                                        }}>save</button>
                                    <button
                                        style={{ width: '100px', marginRight: '10px' }}
                                        className={style.btn_danger} onClick={() => this.onClickCancel()}>cancel</button>
                                </div>
                            </div>
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
                    </CommonStyle.MainDiv>
                    <div
                        style={{ width: '100%', padding: "0px" }}
                    >
                        <DatatableView
                            Data={towerNotificationDetails ? towerNotificationDetails : []}
                            isColumnUpdate={true}
                            updateColumn={this.updateColumn}
                            columns={columns}
                        />
                    </div>
                </CommonStyle.MainDiv>

                <Gap h="2rem" />
            </CommonStyle.MainDiv>
        );
    }
}



const mapStateToProps = state => {
    const { towerNotificationDetails, towerNotificationDetail, towerNotificationDetailActiontype } = state.workingReducerTmc;
    const { alarms, alarm } = state.adminReducer;
    const errorType = state.errorReducer.type;
    const errorMessage = state.errorReducer.error;

    return { towerNotificationDetails, towerNotificationDetail, towerNotificationDetailActiontype, alarms, alarm, errorType, errorMessage };
};
export default withRouter(connect(mapStateToProps, { getAlarmTypeMasterData, getTowerNotificationDetails, updateTowerNotificationDetails, hideError })(TowerNotificationDetails));
