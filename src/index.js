import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClientsStore from './stores/ClientsStore'
import InputsStore from './stores/InputsStore'
const clientsStore = new ClientsStore()
const inputsStore = new InputsStore()
const store = { clientsStore,inputsStore }
ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
