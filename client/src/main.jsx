import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import customFetch from './utils/customFetch';
import { StrictMode } from 'react';

const data = await customFetch.get('/test');
console.log(data);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position='top-center' />
  </StrictMode>,
);