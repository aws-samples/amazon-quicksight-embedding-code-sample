import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify, API } from 'aws-amplify';
import awsExports from './aws-exports';

import { ThemeProvider } from '@aws-amplify/ui-react'
import { studioTheme } from './components'
import '@aws-amplify/ui-react/styles.css';
import './styles/globals.css'

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={studioTheme}>
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
