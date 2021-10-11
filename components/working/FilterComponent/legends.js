import React, { Component } from 'react';
import styled from 'styled-components';

const InputWapper = styled.div`
    width:100%;
    margin: ${props => props.wapperMargin ? props.wapperMargin : "10px"};
    display: flex;
    flex-direction: row;
    justify-content:flex-end;
    position: relative; 
`;
const MaiDiv = styled.div`
width:${props => props.width ? props.width : "auto"};
display: flex;
flex-direction: row;
.colorEclipse{
    width:20px;
    height:20px;
    margin-right:10px;
    border-radius:50%;
    background-color:${props => props.bgColor ? props.bgColor : "auto"};
}
.legendName{
    width:auto;
    height:100%;
    display:flex;
    justify-content:flex-start;
    text-aling:center;
    align-items:center;

    font-size:12px;
    font-weight:normal;
}

`;

class legends extends Component {
    render() {
        return (
            <InputWapper focusbordercolor={this.props.focusbordercolor} wapperMargin={this.props.wapperMargin} inputPadding={this.props.inputPadding}>
                <MaiDiv bgColor="Yellow" width="150px">
                    <div className="colorEclipse"></div>
                    <div className="legendName">
                        WIP
                    </div>
                </MaiDiv>
                <MaiDiv bgColor="green" width="150px">
                    <div className="colorEclipse"></div>
                    <div className="legendName">
                        Closed
                    </div>
                </MaiDiv>
                <MaiDiv bgColor="red" width="150px">
                    <div className="colorEclipse"></div>
                    <div className="legendName">
                        Action Not Initiated
                    </div>
                </MaiDiv>
            </InputWapper>
        );
    }
}

export default legends;