import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {StarWarsApp,  StarWarsStore} from './StarWars/';

require('./sass/app.scss');

ReactDOM.render(
  <Provider store={ StarWarsStore }>
    <StarWarsApp />
  </Provider>,
  document.getElementById('app')
);