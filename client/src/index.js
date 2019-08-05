import React from 'react';
import { render } from 'react-dom';
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
// Containers/Components
import App from './App';
// Store
import { Provider } from 'react-redux';
import store from './store'
// React-Router
import { BrowserRouter } from 'react-router-dom'

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
