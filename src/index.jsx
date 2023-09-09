import 'macro-css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
