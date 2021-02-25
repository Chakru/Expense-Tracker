import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from './context/context';
import { SpeechProvider } from '@speechly/react-client';
import App from './App';
import './index.css';

ReactDom.render(
  <SpeechProvider appId="538e999c-8395-426d-ae83-68035a377d56" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root')
);
