import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import Wrapper from '../../shared/Wrapper';
import { withRouter } from 'next/router';
import * as CommonStyle from '../../comman/commonStyle';
import Gap from '../../comman/Gap'

class MasterIndex extends Wrapper {
    state = {
    }


    render() {

        const small = this.props.width < 768;

        return (
            <div>

                <Gap h="50px" />
                <CommonStyle.MainDiv
                    padding={small ? "0px 20px" : "0px 60px"}
                    flexdirection="column"
                    width={"90%"}
                >
                       <CommonStyle.TextDiv
                        textalign="center"
                        fontsize="18px"
                        color="#000000"
                        lineheight="1.71"
                        width="100%"
                        justifycontent="center"
                    >
                        Welcome To :  
                    </CommonStyle.TextDiv>
                    <CommonStyle.TextDiv
                        textalign="center"
                        fontsize="24px"
                        color="#000000"
                        lineheight="1.71"
                        width="100%"
                        justifycontent="center"
                    >
                         Nokia Corporation 
                    </CommonStyle.TextDiv>
                    <Gap h="5px" />
                    <CommonStyle.TextDiv
                        textalign="center"
                        fontsize="18px"
                        color="#1192c9"
                        lineheight="1.71"
                        width="100%"
                        justifycontent="center"
                    >
                        Karakaari 7
02610 Espoo, Finland

P.O.Box 226, FI-00045 Nokia Group
                    </CommonStyle.TextDiv>
                    <Gap h="20px" />
                    <CommonStyle.TextDiv
                        textalign="center"
                        fontsize="24px"
                        color="#000000"
                        lineheight="1.71"
                        width="100%"
                        justifycontent="center"
                    >
                        Contact Details
                    </CommonStyle.TextDiv>

                    <CommonStyle.TextDiv
                        textalign="center"
                        fontsize="18px"
                        color="#1192c9"
                        lineheight="1.71"
                        width="100%"
                        justifycontent="center"
                    >
                        Tel:    +358 10 44 88 000 <br /> 
                        Email:contact@nokiaindia.com
                    </CommonStyle.TextDiv>




                </CommonStyle.MainDiv>
            </div>
        );
    }
}





const mapStatetoProps = state => {
    const width = state.windowReducer.width;
    return { width };
};


export default withRouter(connect(mapStatetoProps, null)(MasterIndex));
