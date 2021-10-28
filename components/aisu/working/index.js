import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Wrapper from '../../shared/Wrapper';
import { withRouter } from 'next/router';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../comman/commonStyle';
import { processFlowSelection } from '../../actions/common.actions'; 
import { numberFormat } from '../../../helper'
import Gap from '../../comman/Gap';


class index extends Wrapper {
    state = {
        invoiceSummary: null,
        loginUserId: undefined,
    }

    componentDidMount() {
        const user = this.loggedUser();
        //console.log("user", user);
        this.setState({ loginUserId: user && user.id })

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log("nextProps.masterDetails : ",nextProps.masterDetailsCategory);
        if (nextProps.invoiceSummary !== null && nextProps.invoiceSummary !== undefined && nextProps.invoiceSummary !== this.state.invoiceSummary) {
            this.setState({
                invoiceSummary: nextProps.invoiceSummary
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


    HeadingMasterDiv = props => {
        return <CommonStyle.MainDiv
            width={props.width ? props.width : "18%"}
            flexdirection="column"
            padding="10px 0px"
            height="100px"
            borderradius="10px"
            bgColor={props.bgColor ? props.bgColor : "teal"}
        >
            <CommonStyle.TextDiv
                width={props.valuewidth ? props.valuewidth : "100%"}
                fontsize="27px"
                fontWeight="bold"
                justifycontent="center"
                alignitems="center"
                textalign="center"
                color="#fff"
            >
                {props.valuename}
            </CommonStyle.TextDiv>
            <Gap h="10px" />
            <CommonStyle.TextDiv
                width={props.headingwidth ? props.headingwidth : "100%"}
                fontsize="20px"
                justifycontent="center"
                alignitems="center"
                fontWeight="normal"
                textalign="center"
                color="#fff"
            >
                {props.headingname}
            </CommonStyle.TextDiv>
        </CommonStyle.MainDiv>
    }

    onProcessFlowSelection = (uRL, processFlowCode, id, processFlowName, auditFlowMasterId) => {
        let pathName = this.props.pathName ? this.props.pathName : uRL;
        //console.log("pathName", pathName);

        let processFlowMasterId = id;
        this.props.processFlowSelection(processFlowCode, processFlowMasterId, auditFlowMasterId, processFlowName, '');
        const selectedProcessFlow = {
            'processFlowCode': processFlowCode,
            'processFlowMasterId': processFlowMasterId,
            'auditFlowMasterId': auditFlowMasterId,
            'processFlowName': processFlowName,
            'auditPlanDetailsId': ''
        }
       // console.log("selectedProcessFlow page : ", selectedProcessFlow);
        this.saveSelectedProcessFlow(selectedProcessFlow);

        setTimeout(() => {
            this.props.router.push(
                {
                    pathname: pathName,
                    tab: processFlowCode,
                    query: {
                        tab: processFlowCode,
                        id: id && id,
                        processFlowMasterId: id,
                        processFlowName: processFlowName,
                        processFlowCode: processFlowCode,
                        pageName: processFlowName,
                        auditFlowMasterId: auditFlowMasterId
                    },
                },
                uRL
            );
        }, 300);
    }
    render() {

        const small = this.props.width < 768;
        const { loginUserId } = this.state;
        const user = this.loggedUser();
        const UserId = user && user.id;

        const UserPlant = user && user.plantMaster && user.plantMaster.plantName;


        return (
            <CommonStyle.MainDiv
                width="100%"
                justifycontent="flex-start"
                flexdirection="column"

            >
                <CommonStyle.TABLE>
                    {/* <tr>
                        <th colSpan="2">{UserPlant}</th>
                    </tr> */}
                    <tr>
                        <th>
                            Action
                        </th>
                        <th>Process Name</th>
                        <th>Total </th>
                        <th>Pending </th>
                    </tr>
                    {this.props.pendingTaskDetails && this.props.pendingTaskDetails.length > 0 &&
                        this.props.pendingTaskDetails.map((item, indexx) => {
                            let TRColorCode = item.TotalPendingTask && item.TotalPendingTask > 0 ? '#fff' : '#fff';
                            let textcolor = item.TotalPendingTask && item.TotalPendingTask > 0 ? 'red' : '#000';
                            return <tr key={indexx} style={{ background: TRColorCode }}>
                                <td className="textalignleft" style={{ color: '#000', width: '80px' }}>
                                    <button className="edit"
                                        onClick={() => {
                                            this.onProcessFlowSelection(item.uRL,
                                                item.processFlowCode,
                                                item.id,
                                                item.processFlowName,
                                                item.auditFlowMasterId)
                                        }}
                                    >View Page</button>
                                </td>
                                <td className="textalignleft" style={{ color: '#000' }}>{item.processFlowName}</td>
                                <td className="textalignleft" style={{ color: '#000' }}>{item.TotalTask ? item.TotalTask : 0}</td>
                                <td className="textalignleft" style={{ color: textcolor }}>{item.TotalPendingTask ? item.TotalPendingTask : 0}</td>
                            </tr>
                        })

                    }
                </CommonStyle.TABLE>
            </CommonStyle.MainDiv>
        );
    }
}





const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    const { pendingTaskDetails } = state.workingReducer;

    return { width, pendingTaskDetails };
};


export default withRouter(connect(mapStatetoProps, {processFlowSelection })(index));
