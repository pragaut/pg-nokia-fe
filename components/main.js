import React, { Component } from 'react';
import Wrapper from './shared/Wrapper';
import { connect } from 'react-redux';
import newStyle from '../theme/app.scss';
import { hideNotification, hideSticky, hideAlert } from '../actions/common.actions';
import { hideError } from '../actions/error.actions';
import { NOTIFICATION_SHOW, SHOW_ALERT, STICKY_SHOW, LOADING_SHOW } from '../action-types/common.action.types';
import { SHOW_ERROR } from '../action-types/error.action.types';
import Head from 'next/head'
import { changeWidth, changeHeight } from '../actions/window.actions';
import style from "../static/scss/main.scss";
//import config from '../config'; 
//import style from '../static/scss/main.scss';
import Loader from '../components/shared/loader';
function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}
//const style = lazyWithPreload(() => import("../static/scss/main.scss"));
// import { NOTIFICATION_HIDE, NOTIFICATION_SHOW, LOADING_HIDE, LOADING_SHOW, STICKY_SHOW } from '../action-types/sticky.popup.action.types';


class Main extends Wrapper {

  _shouldHideOrNot = true;

  _shouldPromoHideOrNot = false;

  async componentDidMount() {
    // now, let's make sure we have userinfo in our state

    if (process.browser === true && window.addEventListener) {
      const _this = this;
      window.addEventListener('resize', function () {
        _this.windowResized();
      });

      window.addEventListener('click', function () {
        _this.windowClicked();
      });
    }
    else {
    }
    this.windowResized();
  }


  componentWillUnmount() {
    // if (window.removeEventListener) {
    //   window.removeEventListener('resize', this.windowResized());
    //   window.removeEventListener('click', this.windowClicked());
    // };    
  }

  windowResized = () => {
    this.props.changeWidth(window.innerWidth);
    setTimeout(() => {
      this.props.changeHeight(window.innerHeight);
    }, 50);

  }
  closeAlert = () => {
    this.props.hideAlert();
  }


  windowClicked = () => {
    this.setState({
      clicked: true
    });

    setTimeout(() => {
      this.setState({
        clicked: false
      });
    }, 100)
  }




  render() {
    const { type, message, error, errorType, showPaymentWindow } = this.props;


    const plans = (this.props.plans && this.props.plans.items) ? this.props.plans.items : [];

    const _message = JSON.parse(JSON.stringify(message));
    console.log("type", type);
    if (type === NOTIFICATION_SHOW) {
      setTimeout(() => {
        this.props.hideNotification();
      }, 2000);
    }
    if (type === STICKY_SHOW) {
      setTimeout(() => {
        this.props.hideSticky();
      }, 2000);
    }

    if (type === NOTIFICATION_SHOW) {
      this._shouldHideOrNot = true;
    }


    const html = `
        ${message}
        `;


    //      console.log("Main message", message)
    return (
      <div>
        {/* <Head>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
                </Head> */}

        <div>
          {type === NOTIFICATION_SHOW ? (<div className={style.message_overlay} >
            <div className={style.message_new}>
              {_message.title ? <h1>{_message.title}</h1> : null}
              <p _ dangerouslySetInnerHTML={{ __html: _message.msg ? _message.msg : (!_message.image && !_message.title && !_message.msg ? message : 'Updated Successfully') }}>
                {/* {_message.msg ? _message.msg : (!_message.image && !_message.title && !_message.msg ? message : 'Updated Successfully')} */}
              </p>
            </div>
          </div>
          ) : ''}
          {type === SHOW_ALERT ?
            (<div className={style.message_overlay} style={{ overflow: 'scroll' }} >

              <div className={style.message_new}>
                <div style={{ width: '100%', height: '35px', }}><div onClick={() => this.closeAlert()} style={{ width: '30px', background: '#ffffff', float: 'right', height: '30px', display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', cursor: 'pointer', borderRadius: '50%', fontSize: '20px', color: '#000000' }} >X</div></div>

                {_message && _message.title ? <h1>{_message.title}</h1> : null}
                <p _ dangerouslySetInnerHTML={{ __html: _message && _message.msg ? _message.msg : (_message && !_message.image && !_message.title && !_message.msg ? message : 'Updated Successfully') }}>
                  {/* {_message.msg ? _message.msg : (!_message.image && !_message.title && !_message.msg ? message : 'Updated Successfully')} */}
                </p>
              </div>
            </div>
            ) : ''
          }
          <>

            {type === STICKY_SHOW ? (<div className={[newStyle.message, newStyle.snack].join(' ')}>
              {message} </div>) : ''}
          </>


          {errorType === SHOW_ERROR && this.showError(error, '', () => {
            this.props.hideError();
          })}
          {/* {type && type === LOADING_SHOW && this.showLoader('loading')} */}
          {type && type === LOADING_SHOW &&
            <Loader />
          }


        </div>
        <div>
        </div>
      </div>
    );
  }
};


const mapStateToProps = (state) => {
  const { message, notification, type } = state.commonReducer;
  const errorType = state.errorReducer.type;
  const error = state.errorReducer.error;
  const width = state.windowReducer.width;
  const height = state.windowReducer.height;


  return { type, message, notification, error, errorType, width, height };
};



export default connect(mapStateToProps, { hideAlert, hideNotification, hideSticky, hideError, changeHeight, changeWidth })(Main);