import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import 'simplebar-react/dist/simplebar.min.css';

import {ThemeProvider} from '@mui/material/styles'
import lightTheme from './pages/themes/lightTheme';

import AuthState from './context/auth_context/AuthState'; //providing data to the child components of appln
import BlogState from './context/blog_context/BlogState';

const root = ReactDOM.createRoot(document.getElementById('root')); //asynchronous rendering of the app
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>  
      <AuthState> 
        <BlogState>
        <App />
        </BlogState>
      </AuthState>
    </ThemeProvider>
  
  </React.StrictMode>
);