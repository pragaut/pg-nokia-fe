import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Link from "next/link";
import Head from 'next/head';
import { withRouter } from "next/router";
import Wrapper from "../../shared/Wrapper";

import * as CommonStyle from '../../comman/commonStyle'
import { isThisHour } from "date-fns";

export class AppHeader extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {

        }
    } 
    LinkDiv =  props  => {
      return  <React.Fragment>
            <CommonStyle.TextDiv
                fontsize="18px"
                color="#ffffff"
                minheight="35px"
                style={{cursor:'pointer'}}
            >
                {props.name}
            </CommonStyle.TextDiv>
        </React.Fragment>
    }

    render() {


        const small = this.props.width < 768;
        const smallTab = this.props.width < 1000 && this.props.width > 768;
        const windowInnerHeight = this.state.windowInnerHeight
        let profilePic = '';

        return (
            <div>

                <CommonStyle.MainDiv
                    flexdirection="column"
                    padding="120px 20px"
                >
                    <Link href="#">
                        <this.LinkDiv  name="Department Master" /> 
                    </Link>
                    <Link href="#">
                    <this.LinkDiv  name="Designation Master" /> 
                    </Link>
                    <Link href="#">
                    <this.LinkDiv  name="Country Master" /> 
                    </Link>
                    <Link href="#">
                    <this.LinkDiv  name="State Master" /> 
                    </Link>
                </CommonStyle.MainDiv>
            </div>
        );
    }
}

const mapStateToProps = state => {

    const width = state.windowReducer.width;


    return { width };
};



export default withRouter(connect(mapStateToProps, null)(AppHeader));
