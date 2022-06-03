import React from 'react';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./services/store";
import {BrowserRouter as Router} from "react-router-dom"


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
            <App/>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
