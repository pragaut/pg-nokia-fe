import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import theme from '../utils/anandGroupTheme';
// import GlobalStyle from '../components/styles/global.style';

class AnandGroupReco extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    )
  }
}

export default withReduxStore(AnandGroupReco)

