import React from 'react';
import cssModules from 'react-css-modules';

import Example from 'components/Example';

import styles from './styles.scss';

const App = () => (
  <div styleName="app">
    <h1>React Starter</h1>
    <p>Insert app here</p>
    <Example />
  </div>
);

export default cssModules(App, styles);
