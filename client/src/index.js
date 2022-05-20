import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

// console.log("hii");
root.render(
    // <AuthContextProvider>
    <AuthContextProvider>
    <App />

    </AuthContextProvider>
  
);

