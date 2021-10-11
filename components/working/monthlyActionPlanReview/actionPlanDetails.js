import Wrapper from '../../shared/Wrapper';
import ReactTable from "react-table-6";
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import Gap from '../../Gap';
import { getStatusMasterData_ByCategory } from '../../../actions/admin.action';
import * as CommonStyle from '../../commonStyle';
import { withRouter } from 'next/router';
import moment from 'moment';
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle';
import _ from "lodash";
import styled from 'styled-components';
import { updateMonthlyReviewDetails } from '../../../actions/working.action';
//import { StickyTable, Row, Cell } from 'react-sticky-table';


const RoundButton = styled.div`
width:20px;
height:20px;
background-color:${props => props.bgcolor ? props.bgcolor : 'red'} ;
border-radius:50%;
`;

class ActionPlanDetailsIndex extends Wrapper {

    constructor(props) {
        super(props);
        this.state = {
            RoleBox: null,
            row: "",
            filter: true,
            Data: [],
            statuss: [],
            columns: [],
            currentMonthReviewDetails: props.currentMonthReviewDetails ? props.currentMonthReviewDetails : [],
        }
    }

    componentDidMount() {
        this.props.getStatusMasterData_ByCategory(0, 'action_monthly_review', constants.ALL_ROWS_LIST, undefined, undefined);
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.statuss && nextProps.statuss != this.state.statuss) {
            this.setState({
                statuss: nextProps.statuss
            });
        }
        if (nextProps.currentMonthReviewDetails && nextProps.currentMonthReviewDetails != this.state.currentMonthReviewDetails) {
            this.setState({
                currentMonthReviewDetails: nextProps.currentMonthReviewDetails
            });
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return;
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        }
    }


    onChangeValue_StatusIdNew = (Key, id, auditPlanDetailsId, actionPlanDetailsId) => event => {
        const CurrentDate = moment(new Date()).format("YYYY-MM-DD");
        const currentMonthReviewDetails = this.state.currentMonthReviewDetails;
        // console.log("currentMonthReviewDetails 2 ", currentMonthReviewDetails);
        let selectedValue = Object.keys(event.target).indexOf('checked') > -1 ? event.target.checked : event.target.value;
        const index = currentMonthReviewDetails && currentMonthReviewDetails.length > 0 && currentMonthReviewDetails.findIndex(item => item.auditPlanDetailsId === auditPlanDetailsId && item.actionPlanDetailsId === actionPlanDetailsId);
        if (index > -1) {
            if (Key === "status_master") {
                const statusMasterData = this.state.statuss && this.state.statuss.length > 0 && this.state.statuss.filter(item => item.id === selectedValue)[0];
                const ExistingState = [...currentMonthReviewDetails]
                ExistingState[index].statusMasterId = selectedValue;
                ExistingState[index].reviewDate = CurrentDate;
                ExistingState[index].isPending = statusMasterData && statusMasterData.isPending;
                ExistingState[index].isWIP = statusMasterData && statusMasterData.isWIP;
                ExistingState[index].isAccepted = statusMasterData && statusMasterData.isAccepted;
                this.setState({ currentMonthReviewDetails: ExistingState });
            }
            else if (Key === "remarks") {
                const ExistingState = [...currentMonthReviewDetails]
                ExistingState[index].remarks = selectedValue;
                ExistingState[index].reviewDate = CurrentDate;
                this.setState({ currentMonthReviewDetails: ExistingState });
            }
        }
    }

    onSubmit = async () => {
        const currentMonthReviewDetails = this.state.currentMonthReviewDetails;
        const approvedMonthlyreview = currentMonthReviewDetails && currentMonthReviewDetails.filter(item => (item.isAccepted === true || item.isAccepted === 1))
        const LoggedUser = this.loggedUser();
        const CurrentRole = this.getLoggedUserRole_JSONConverted()
        const roleID = CurrentRole && CurrentRole.id;
        const companyMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.companyMasterID;
        const plantMasterId = LoggedUser && LoggedUser.plantMaster && LoggedUser.plantMaster.id;

        let dataSendToBackend = {
            currentMonthReviewDetails: currentMonthReviewDetails,
            approvedMonthlyreview: approvedMonthlyreview,
            auditPlanDetailsId: this.props.auditPlanDetailsId,
            roleMasterId: roleID,
            companyMasterId: companyMasterId,
            plantId: plantMasterId,
            processFlowCode: this.props.processFlowCode,
            processFlowMasterId: this.props.processFlowMasterId
        }
        if (currentMonthReviewDetails && currentMonthReviewDetails.length > 0) {
            this.props.updateMonthlyReviewDetails(dataSendToBackend, undefined);
        }
    }

    unique = (arr, keyProps) => {
        const kvArray = arr.map(entry => {
            const key = keyProps.map(k => entry[k]).join('|');
            return [key, entry];
        });
        const map = new Map(kvArray);
        return Array.from(map.values());
    }

    render() {
        const { Data } = this.props;
        const { currentMonthReviewDetails } = this.state;
        const { statuss } = this.state;
        const UniqueData = this.unique(Data, ['auditPlanDetailsId', 'scopeMasterId', 'sectionMasterId', 'sectionName'])
        let Count = Data && Data.length > 0 ? Data.length : 0;
        let uniqueCount = UniqueData && UniqueData.length > 0 ? UniqueData.length : 1;
        let reviewNumber = currentMonthReviewDetails && currentMonthReviewDetails.length > 0 && currentMonthReviewDetails[0].reviewNumber;
        let monthCount = Count / uniqueCount;
        return (
            <CommonStyle.MainDiv
                padding="0px 30px 0px 0px"
                flexdirection="column"
                justifycontent="flex-start"
                alignitems="baseline"
                style={{ overflow: 'visible' }}
            >
                <CommonStyle.TABLE>
                    <tr>
                        <th>Sr#</th>
                        <th>Section Name</th>
                        <th>Sub Section</th>
                        <th>Question</th>
                        <th> Non compliance/Gap Identified</th>
                        <th>Action Proposed</th>
                        <th>Outcome Expected</th>
                        <th>Responsibility</th>
                        <th>Target Date</th>
                        {reviewNumber > 0 && _.times(monthCount, (i) => (<>
                            <th >M {i + 1} Status</th>
                            <th  >M {i + 1} Remarks</th>
                        </>
                        ))}
                    </tr>
                    {UniqueData && UniqueData.length > 0 && UniqueData.map((item, index) => {
                        const filterdata = Data && Data.filter(fl => fl.scopeMasterId === item.scopeMasterId && fl.sectionMasterId === item.sectionMasterId && fl.auditPlanDetailsId === item.auditPlanDetailsId)
                        const filterCurrentReview = currentMonthReviewDetails && currentMonthReviewDetails.length > 0 && currentMonthReviewDetails.filter(dt => dt.actionPlanDetailsId === item.actionPlanDetailsId);
                        let selectedStatusId = filterCurrentReview && filterCurrentReview.length > 0 && filterCurrentReview[0].statusMasterId;
                        let selectedremarks = filterCurrentReview && filterCurrentReview.length > 0 && filterCurrentReview[0].remarks ? filterCurrentReview[0].remarks : '';

                        return <tr key={index} >
                            <td>{index + 1}</td>
                            <td className="textalignleft">{item.sectionName}</td>
                            <td className="textalignleft">{item.subSectionName}</td>
                            <td className="textalignleft"
                                style={{ width: '200px' }}
                            >{item.question}</td>
                            <td className="textalignleft">{item.observationRemarks}</td>
                            <td className="textalignleft">
                                {item.actionProposed}
                            </td>
                            <td className="textalignleft">
                                {item.outcomeExpected}
                            </td>
                            <td className="textalignleft"
                                style={{ width: '150px' }}
                            >
                                {item.responsibility}
                            </td>
                            <td className="textalignleft"
                                style={{ width: '100px' }}
                            >
                                {item.targetDate && item.targetDate !== null && moment(new Date(item.targetDate)).format("YYYY-MM-DD")}
                            </td>
                            {filterdata && filterdata.length > 0 && filterdata.map((mt, indexmt) => {
                                if (mt.row_num === reviewNumber) {
                                    return <>
                                        <td>
                                            <SELECT
                                                borderRadius={"5px"}
                                                bgColor={"#fff"}
                                                width={"140px"}
                                                height={"40px"}
                                                value={selectedStatusId}
                                                paddingLeft={"10px"}
                                                onChange={this.onChangeValue_StatusIdNew('status_master', mt.id, mt.auditPlanDetailsId, mt.actionPlanDetailsId)}
                                            >
                                                {statuss && statuss.length > 0 && statuss.map((st, stindex) => {
                                                    return <option key={stindex} value={st.id} >{st.statusName}</option>
                                                })
                                                }
                                            </SELECT>
                                        </td>
                                        <td>
                                            <Input
                                                borderRadius={"5px"}
                                                bgColor={"#ffffff"}
                                                width={"150px"}
                                                height={"40px"}
                                                value={selectedremarks}
                                                onChange={this.onChangeValue_StatusIdNew('remarks', mt.id, mt.auditPlanDetailsId, mt.actionPlanDetailsId)}
                                                paddingLeft={"10px"} />
                                        </td>
                                    </>
                                }
                                else if(mt.row_num < reviewNumber)  {
                                    return <>
                                        <td style={{ textAlign: 'center' }}>
                                            <RoundButton
                                                bgcolor={(mt.isAccepted === true || mt.isAccepted === 1) ? 'green' : ((mt.isWIP === true || mt.isWIP === 1) ? 'yellow' : 'red')}
                                            />
                                        </td>
                                        <td>
                                            {mt.remarks}
                                        </td>
                                    </>
                                }
                            })
                            }
                        </tr>
                    })
                    }
                </CommonStyle.TABLE>
                {/* <div style={{ width: '90%', height: '300px',display:'flex' }}>
                    <StickyTable borderWidth={'1px'} borderColor={'black'}>
                        <Row >
                        <Cell>Sr#</Cell>
                        <Cell>Section Name</Cell>
                        <Cell>Sub Section</Cell>
                        <Cell>Question</Cell>
                        <Cell> Non compliance/Gap Identified</Cell>
                        <Cell>Action Proposed</Cell>
                        <Cell>Outcome Expected</Cell>
                        <Cell>Responsibility</Cell>
                        <Cell>Target Date</Cell>
                        {_.times(monthCount, (i) => (<>
                            <Cell >M {i + 1} Status</Cell>
                            <Cell  >M {i + 1} Remarks</Cell>
                        </>
                        ))} 
                        </Row>
                        {UniqueData && UniqueData.length > 0 && UniqueData.map((item, index) => {
                        const filterdata = Data && Data.filter(fl => fl.scopeMasterId === item.scopeMasterId && fl.sectionMasterId === item.sectionMasterId && fl.auditPlanDetailsId === item.auditPlanDetailsId)
                        const filterCurrentReview = currentMonthReviewDetails && currentMonthReviewDetails.length > 0 && currentMonthReviewDetails.filter(dt => dt.actionPlanDetailsId === item.actionPlanDetailsId);
                        let selectedStatusId = filterCurrentReview && filterCurrentReview.length > 0 && filterCurrentReview[0].statusMasterId;
                        let selectedremarks = filterCurrentReview && filterCurrentReview.length > 0 && filterCurrentReview[0].remarks ? filterCurrentReview[0].remarks : '';

                        return <Row key={index} >
                            <Cell style={{border:'0px 1px 0px 1px'}} >{index + 1}</Cell>
                            <Cell  style={{border:'0px 1px 0px 1px'}}  className="textalignleft">{item.sectionName}</Cell>
                            <Cell className="textalignleft">{item.subSectionName}</Cell>
                            <Cell className="textalignleft"
                                style={{ width: '200px' }}
                            >{item.question}</Cell>
                            <Cell className="textalignleft">{item.observationRemarks}</Cell>
                            <Cell className="textalignleft">
                                {item.actionProposed}
                            </Cell>
                            <Cell className="textalignleft">
                                {item.outcomeExpected}
                            </Cell>
                            <Cell className="textalignleft"
                                style={{ width: '150px' }}
                            >
                                {item.responsibility}
                            </Cell>
                            <Cell className="textalignleft"
                                style={{ width: '100px' }}
                            >
                                {item.targetDate && item.targetDate !== null && moment(new Date(item.targetDate)).format("YYYY-MM-DD")}
                            </Cell>
                            {filterdata && filterdata.length > 0 && filterdata.map((mt, indexmt) => {
                                if (mt.row_num === reviewNumber) {
                                    return <>
                                        <Cell>
                                            <SELECT
                                                borderRadius={"5px"}
                                                bgColor={"#fff"}
                                                width={"140px"}
                                                height={"40px"}
                                                value={selectedStatusId}
                                                paddingLeft={"10px"}
                                                onChange={this.onChangeValue_StatusIdNew('status_master', mt.id, mt.auditPlanDetailsId, mt.actionPlanDetailsId)}
                                            >
                                                  {statuss && statuss.length > 0 && statuss.map((st, stindex) => {
                                                    return <option key={stindex} value={st.id} >{st.statusName}</option>
                                                })
                                                }
                                            </SELECT>
                                        </Cell>
                                        <Cell>
                                            <Input
                                                borderRadius={"5px"}
                                                bgColor={"#ffffff"}
                                                width={"150px"}
                                                height={"40px"}
                                                value={selectedremarks}
                                                onChange={this.onChangeValue_StatusIdNew('remarks', mt.id, mt.auditPlanDetailsId, mt.actionPlanDetailsId)}
                                                paddingLeft={"10px"} />
                                        </Cell>
                                    </>
                                }
                                else {
                                    return <>
                                        <Cell style={{ textAlign: 'center' }}>
                                            <RoundButton
                                                bgcolor={(mt.isAccepted === true || mt.isAccepted === 1) ? 'green' : ((mt.isWIP === true || mt.isWIP === 1) ? 'yellow' : 'red')}
                                            />
                                        </Cell>
                                        <Cell>
                                            {mt.remarks}
                                        </Cell>
                                    </>
                                }
                            })
                            }
                        </Row>
                    })
                    } 
                    </StickyTable>
                </div> */}
                <CommonStyle.MainDiv
                    justifycontent={"center"}
                    width={'100%'}
                >
                    <CommonStyle.ButtonDiv
                        style={{ paddingTop: '44px' }}
                        width="30%"
                    >
                        <Button
                            bgColor="#358856"
                            color="#ffffff"
                            height="40px"
                            zIndex={"0"}
                            width="48%"
                            borderRadius="10px"
                            bgChangeHover="#4FA64F"
                            hoverColor="#ffffff"
                            border="solid 1px #358856"
                            onClick={() => this.onSubmit()}
                        // onClick={() => this.resetValues()}
                        >
                            Submit
                        </Button>
                    </CommonStyle.ButtonDiv>
                </CommonStyle.MainDiv>
                <Gap h="100px" />
            </CommonStyle.MainDiv >
        );
    }
};
const mapStateToProps = state => {
    const staticUndefined = undefined;
    const { statuss } = state.adminReducer;
    return { staticUndefined, statuss };
}
//export default connect(mapStateToProps, {})(SelfAuditDetails)
export default withRouter(connect(mapStateToProps, { getStatusMasterData_ByCategory, updateMonthlyReviewDetails })(ActionPlanDetailsIndex));
