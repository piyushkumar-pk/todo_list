import React from 'react';
import ReactDOM from 'react-dom/client';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes';
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Routes />
);

