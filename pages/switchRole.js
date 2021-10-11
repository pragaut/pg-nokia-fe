import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Main from '../components/main'
import Wrapper from "../components/shared/Wrapper";
import Header from '../components/header'
import MainBanner from '../components/switchRole'
import { changeWidth, hideRedirectionStatus } from '../actions/window.actions';
import * as helper from '../helper';
import AboutRecon from '../components/homePage/aboutRecon'
import Footer from '../components/shared/Footer'
import Gap from '../components/Gap'
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
