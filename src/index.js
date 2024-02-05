import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/goit-react-hw-08-phonebook">
        <App />
        <ToastContainer 
        position="top-center"
        autoClose={3500}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
