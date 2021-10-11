import Wrapper from '../../shared/Wrapper';
import ReactTable from "react-table-6";
import { connect } from 'react-redux';
import { constants } from '../../../utils/constants';
import Gap from '../../Gap';
import * as CommonStyle from '../../commonStyle';
import { withRouter } from 'next/router';
import moment from 'moment';
import { Input, Button, SuccessMessage, SELECT, ErrorMessage } from '../../formStyle';
import _ from "lodash";
import styled from 'styled-components';


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
        }
    }

    componentDidMount() {
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.statuss && nextProps.statuss != this.state.statuss) {
            this.setState({
                statuss: nextProps.statuss
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
        const { statuss } = this.state;
        const UniqueData = this.unique(Data, ['auditPlanDetailsId', 'scopeMasterId', 'sectionMasterId', 'sectionName'])
        let Count = Data && Data.length > 0 ? Data.length : 0;
        let uniqueCount = UniqueData && UniqueData.length > 0 ? UniqueData.length : 1;
        let monthCount = Count / uniqueCount;
        return (
            <CommonStyle.MainDiv
                padding="0px 0px"
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
                        {_.times(monthCount, (i) => (<>
                            <th >M {i + 1} Status</th>
                            <th  >M {i + 1} Remarks</th>
                        </>
                        ))}
                    </tr>
                    {UniqueData && UniqueData.length > 0 && UniqueData.map((item, index) => {
                        const filterdata = Data && Data.filter(fl => fl.scopeMasterId === item.scopeMasterId && fl.sectionMasterId === item.sectionMasterId && fl.auditPlanDetailsId === item.auditPlanDetailsId)
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
                            })
                            }
                        </tr>
                    })
                    }
                </CommonStyle.TABLE>
                <Gap h="10px" />
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
export default withRouter(connect(mapStateToProps, { })(ActionPlanDetailsIndex));
