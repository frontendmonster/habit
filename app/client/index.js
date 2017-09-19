import React from 'react';
import { render as renderDOM } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Root } from './modules/root';
import '../public/style.scss';

const render = Component => {
  renderDOM(
    <AppContainer>
      <Component/>
    </AppContainer>, document.getElementById('app'));
};

render(Root);
console.log(Root);
if (module.hot) {
  module.hot.accept('./modules/root/root', () => {
    const NextApp = require('./modules/root/root');
    render(NextApp);
  });
}
