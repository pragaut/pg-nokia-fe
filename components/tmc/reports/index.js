import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Wrapper from '../../shared/Wrapper';
import { withRouter } from 'next/router';
import { constants } from '../../../utils/constants';
import * as CommonStyle from '../../comman/commonStyle';
import { processFlowSelection } from '../../../actions/comman/common.actions';
import { numberFormat } from '../../../helper'
import Gap from '../../comman/Gap';
import DoughnutChart from "./doughnut.chart";
import LineChart from "./line.chart";
import BarChart from "./bar.chart";

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

    render() {

        const ScreenWidth = this.props.width;
        const small = this.props.width < 768;
        const { loginUserId } = this.state;
        const user = this.loggedUser();
        const UserId = user && user.id;

        const UserPlant = user && user.plantMaster && user.plantMaster.plantName;

        return (
            <CommonStyle.MainWrapper
                width="100%"
                justifyContent="flex-start"
                flexDirection="row"
                bgColor="#cccdd9"
                margin={ScreenWidth > 1500 ? "-90px -45px 0 -28px" : ScreenWidth > 1200 ? "50px -35px 0 -28px" : ScreenWidth > 900 ? "0px -28px 0 -25px" : ScreenWidth > 600 ? "0px -25px 0 -22px" : "0px -10px 0 -20px"}
                minHeight="600px"
                padding="30px 2px 0px 20px"
            >
                <CommonStyle.MainDiv
                    width={ScreenWidth > 1300 ? "75%" : "95%"}
                    justifycontent="flex-start"
                    flexdirection="column"
                    textalign="left"
                    alignitems="left"
                >
                    <CommonStyle.MainDiv
                        width="100%"
                        justifycontent="flex-start"
                        flexdirection="column"
                        borderradius="15px"
                        textalign="left"
                    >
                        <CommonStyle.TextDiv
                            fontsize="20px"
                            width="100%"
                            color="#000"
                        >
                            Hello {user && user.employeeName ? user.employeeName : "User"}!
                        </CommonStyle.TextDiv>
                        <Gap h="10px" />
                        <CommonStyle.TextDiv
                            fontsize="14px"
                            color='#2a474b'
                            width="100%"
                        >
                            Monitor and control the SYMDE infra
                        </CommonStyle.TextDiv>
                    </CommonStyle.MainDiv>
                    <Gap h="20px" />
                    <CommonStyle.MainDiv
                        width="100%"
                        justifycontent="flex-start"
                        flexdirection="row"
                    >
                        <CommonStyle.MainDiv
                            width="13%"
                            justifycontent="flex-start"
                            flexdirection="column"
                            borderradius="15px"
                            minHeight="150px"
                            bgColor="#fff"
                            padding="20px"
                        >
                            <CommonStyle.TextDiv
                                fontsize="20px"
                                width="100%"
                            >
                                SYMDE
                            </CommonStyle.TextDiv>
                            <Gap h="20px" />
                            <CommonStyle.TextDiv
                                fontsize="40px"
                                color="#0d3e99"
                                width="100%"
                            >
                                1245
                            </CommonStyle.TextDiv>
                            <Gap h="15px" />
                            <CommonStyle.TextDiv
                                fontsize="14px"
                                color='#5e5e5e'
                                width="100%"
                            >
                                Total SYMDE
                            </CommonStyle.TextDiv>
                        </CommonStyle.MainDiv>
                        <Gap w="20px" />
                        <CommonStyle.MainDiv
                            width="15%"
                            justifycontent="flex-start"
                            flexdirection="column"
                            borderradius="15px"
                            minHeight="150px"
                            bgColor="#fff"
                            padding="20px"
                        >
                            <CommonStyle.TextDiv
                                fontsize="20px"
                            >
                                Allocation
                            </CommonStyle.TextDiv>
                            <Gap h="1px" />
                            <CommonStyle.TextDiv
                                fontsize="40px"
                                color="#0d3e99"
                            >
                                <DoughnutChart />
                            </CommonStyle.TextDiv>
                            <Gap h="15px" />
                            <CommonStyle.TextDiv
                                fontsize="20px"
                                color='#0d3e99'
                                alignitems="center"
                                textalign="center"
                                margin="-70px 0px 0px 0px"
                            >
                                1099
                            </CommonStyle.TextDiv>
                        </CommonStyle.MainDiv>
                        <Gap w="20px" />
                        <CommonStyle.MainDiv
                            width="15%"
                            justifycontent="flex-start"
                            flexdirection="column"
                            borderradius="15px"
                            minHeight="150px"
                            bgColor="#fff"
                            padding="20px"
                        >
                            <CommonStyle.TextDiv
                                fontsize="20px"
                                width="100%"
                            >
                                Active on Ground
                            </CommonStyle.TextDiv>
                            <Gap h="20px" />
                            <CommonStyle.TextDiv
                                fontsize="40px"
                                color="#0d3e99"
                                width="100%"
                            >
                                <LineChart />
                            </CommonStyle.TextDiv>
                            <CommonStyle.TextDiv
                                fontsize="20px"
                                color='#0d3e99'
                                alignitems="center"
                                textalign="center"
                                margin="-20px 0px 0px 0px"
                            >
                                789
                            </CommonStyle.TextDiv>
                        </CommonStyle.MainDiv>
                        <Gap w="20px" />
                        <CommonStyle.MainDiv
                            width="15%"
                            justifycontent="flex-start"
                            flexdirection="column"
                            borderradius="15px"
                            minHeight="150px"
                            bgColor="#fff"
                            padding="20px"
                        >
                            <CommonStyle.TextDiv
                                fontsize="20px"
                                width="100%"
                            >
                                SYMDE-R on Ground
                            </CommonStyle.TextDiv>
                            <Gap h="1px" />
                            <CommonStyle.TextDiv
                                fontsize="40px"
                                color="#0d3e99"
                            >
                                <DoughnutChart />
                            </CommonStyle.TextDiv>
                            <Gap h="15px" />
                            <CommonStyle.TextDiv
                                fontsize="20px"
                                color='#0d3e99'
                                alignitems="center"
                                textalign="center"
                                margin="-70px 0px 0px 0px"
                            >
                                234
                            </CommonStyle.TextDiv>
                        </CommonStyle.MainDiv>
                        <Gap w="20px" />
                        <CommonStyle.MainDiv
                            width="15%"
                            justifycontent="flex-start"
                            flexdirection="column"
                            borderradius="15px"
                            minHeight="150px"
                            bgColor="#fff"
                            padding="20px"
                        >

                            <Gap h="20px" />
                            <CommonStyle.TextDiv
                                fontsize="40px"
                                color="#0d3e99"
                                width="100%"
                            >
                                20%
                            </CommonStyle.TextDiv>
                            <Gap h="15px" />
                            <CommonStyle.TextDiv
                                fontsize="14px"
                                color='#5e5e5e'
                                width="100%"
                            >
                                Active SYMDE
                            </CommonStyle.TextDiv>
                        </CommonStyle.MainDiv>
                    </CommonStyle.MainDiv>
                    <Gap h="20px" />
                    <CommonStyle.MainDiv
                        width="94.5%"
                        justifycontent="flex-start"
                        flexdirection="column"
                        borderradius="15px"
                        textalign="left"
                        bgColor="#fff"
                        padding="20px"
                    >
                        <CommonStyle.TextDiv
                            fontsize="20px"
                            width="100%"
                        >
                            SYMDE Working Time
                        </CommonStyle.TextDiv>
                        <Gap h="10px" />
                        <CommonStyle.TextDiv
                            fontsize="14px"
                            color='#2a474b'
                            width="100%"
                        >
                            Average worling time per day 8.7hrs
                        </CommonStyle.TextDiv>
                        {ScreenWidth &&
                            <BarChart
                                width={ScreenWidth > 1500 ? "1000" : ScreenWidth > 1100 ? "800" : 700}
                            />
                        }
                    </CommonStyle.MainDiv>

                </CommonStyle.MainDiv>
                <CommonStyle.MainDiv
                    width={ScreenWidth > 1300 ? "25%" : "0px"}
                    display={ScreenWidth > 1300 ? "flex" : "none"}
                    justifycontent="flex-start"
                    flexdirection="column"
                    bgColor="#ffffff"
                    borderradius="25px 25px 0px 0px"
                    padding="20px 10px 10px 10px"
                    fontsize="20px"
                >
                    <CommonStyle.TextDiv
                        fontsize="20px"
                        alignitems="center"
                        textalign="center"
                        padding="10px 10px 20px 10px"
                    //width="100%"
                    >
                        General Information
                    </CommonStyle.TextDiv>
                    <CommonStyle.MainDiv
                        width="70%"
                        justifycontent="flex-start"
                        flexdirection="column"
                        borderradius="15px"
                        minHeight="150px"
                        bgColor="#cccdd9"
                        padding="20px"
                    >
                        <CommonStyle.TextDiv
                            fontsize="20px"
                            width="100%"
                        >
                            Total Tower
                        </CommonStyle.TextDiv>
                        <Gap h="20px" />
                        <CommonStyle.TextDiv
                            fontsize="40px"
                            color="#fff"
                            width="100%"
                        >
                            1245
                        </CommonStyle.TextDiv>
                        <Gap h="15px" />
                        <CommonStyle.TextDiv
                            fontsize="14px"
                            color='#5e5e5e'
                            width="100%"
                        >
                            Total Tower
                        </CommonStyle.TextDiv>
                    </CommonStyle.MainDiv>
                    <Gap h="20px" />
                    <CommonStyle.MainDiv
                        width="70%"
                        justifycontent="flex-start"
                        flexdirection="column"
                        borderradius="15px"
                        minHeight="150px"
                        bgColor="#cccdd9"
                        padding="20px"
                    >
                        <CommonStyle.TextDiv
                            fontsize="20px"
                        >
                            Active Tower
                        </CommonStyle.TextDiv>
                        <Gap h="1px" />
                        <CommonStyle.TextDiv
                            fontsize="40px"
                            color="#0d3e99"
                        >
                            <DoughnutChart />
                        </CommonStyle.TextDiv>
                        <Gap h="15px" />
                        <CommonStyle.TextDiv
                            fontsize="20px"
                            color='#0d3e99'
                            alignitems="center"
                            textalign="center"
                            margin="-70px 0px 0px 0px"
                        >
                            1099
                        </CommonStyle.TextDiv>
                    </CommonStyle.MainDiv>
                </CommonStyle.MainDiv>

            </CommonStyle.MainWrapper>
        );
    }
}





const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    const { pendingTaskDetails } = state.workingReducer;

    return { width, pendingTaskDetails };
};


export default withRouter(connect(mapStatetoProps, { processFlowSelection })(index));
