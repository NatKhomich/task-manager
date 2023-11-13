import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import App from './app/App';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {store} from 'app/store';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter basename={'/task-manager'}>
            <App/>
        </BrowserRouter>
    </Provider>
);
