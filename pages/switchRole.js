import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Main from '../components/comman/main'
import Wrapper from "../components/shared/Wrapper";
import Header from '../components/comman/header'
import MainBanner from '../components/comman/switchRole'
import { changeWidth, hideRedirectionStatus } from '../actions/comman/window.actions';
import * as helper from '../helper'; 
import Footer from '../components/shared/Footer'
import Gap from '../components/comman/Gap'
const window = require('global/window');
import { removeLoggedUserRole } from '../utils/session.helper';

export class Index extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            removeIcon: false,
            scrolling: 0,
            windowInnerHeight: window.innerHeight,
            onHoverActive: false,
            isPokerreoureceActive: false,
            IsSelectedPokerGlossaryActive: false
        }
    }
    componentDidMount() {
        removeLoggedUserRole();
    }
    render() {

        return (
            <div>
                <Main />
                <Header
                    layout="loggedUser"
                />
                <MainBanner />
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(helper.mapStateToProps_for_page_wrappers, { changeWidth, hideRedirectionStatus })(Index));
