import React from 'react';
import { connect } from 'react-redux';
import * as CommonStyle from '../../commonStyle'
import { Input  } from '../../formStyle';
import { getActionPlanUpdate_NotRequiredObservation } from '../../../actions/working.action';
import Wrapper from '../../shared/Wrapper';
import { withRouter } from 'next/router';
import moment from 'moment';

class actionRequiredObservationIndex extends Wrapper { 

    constructor(props) {
        super(props);

        this.state = {
            actionRequiredObservations: props.actionRequiredObservations ? props.actionRequiredObservations : []
        };
    };

    componentDidMount() {
        if (this.props && this.props.actionRequiredObservations && this.props.actionRequiredObservations != this.state.actionRequiredObservations) {
            this.setState({
                actionRequiredObservations: this.props.actionRequiredObservations,
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.actionRequiredObservations && nextProps.actionRequiredObservations != this.state.actionRequiredObservations) {
            this.setState({
                actionRequiredObservations: nextProps.actionRequiredObservations
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

 
    returnIdsFunction = (data) => {
        const state = {};
        const datstring = data && data.join();
        return datstring;
    }
    render() {
        const { actionRequiredObservations } = this.state;
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
                    </tr>
                    {actionRequiredObservations && actionRequiredObservations.length > 0 && actionRequiredObservations.map((item, index) => {
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
                            {item.targetDate && item.targetDate !== null && moment(new Date(item.targetDate)).format("DD-MMM-YYYY")}
                            </td>
                        </tr>
                    })
                    }
                </CommonStyle.TABLE>
            </CommonStyle.MainDiv >
        )
    }
} 
export default withRouter(connect(null, {   getActionPlanUpdate_NotRequiredObservation })(actionRequiredObservationIndex));
