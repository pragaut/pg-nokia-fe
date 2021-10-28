import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Main from '../components/comman/main'
import Wrapper from "../components/shared/Wrapper";
import Header from '../components/comman/header'
import MainBanner from '../components/comman/homePage'
import { changeWidth, hideRedirectionStatus } from '../actions/comman/window.actions';
import { showNotification } from '../actions/comman/common.actions';
import * as helper from '../helper'; 
import Footer from '../components/shared/Footer';
import Gap from '../components/comman/Gap';
//import * as rdd from 'react-device-detect';
const publicIp = require('public-ip');
const window = require('global/window');

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
      IsSelectedPokerGlossaryActive: false,
      dataPublicIP: '',
    }
  }

  async componentDidMount() {
    var dataPublicIP = await publicIp.v4();
    // var dataV6 = await publicIp.v6();
    setTimeout(() => {
      this.setState({
        dataPublicIP: dataPublicIP
      })
    }, 200);

    let loggedIn = this.isLoggedIn();
    //  console.log("loggedIn : ", loggedIn);

    if (loggedIn === true) {
      this.props.router.push({
        pathname: '/switch-role',
        query: { page: 'switchRole' }
      }, '/switch-role');
    }
  }

  render() {

    let loggedIn = this.isLoggedIn();
    // console.log("loggedIn : ", loggedIn);

    // setTimeout(() => {
    //   if (loggedIn === true) {
    //     this.props.router.push({
    //       pathname: '/switch-role',
    //       query: { page: 'switchRole' }
    //     }, '/switch-role');
    //   }
    // }, 500);

    return (
      <div>
        <Main />
        <Header
          layout="home"
        />
        <MainBanner />
        {/* <AboutRecon /> */}
        {/* <Gap h="50px" /> */}
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(helper.mapStateToProps_for_page_wrappers, { changeWidth, showNotification, hideRedirectionStatus })(Index));
