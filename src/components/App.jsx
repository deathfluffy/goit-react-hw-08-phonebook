import {  useDispatch } from 'react-redux';
import { Suspense, lazy, useEffect } from 'react';
import css from './App.module.css';
import  Layout  from './Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import Loader from './Loader/Loader';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { apiRefreshUser } from '../../src/redux/auth/authSlice';

const HomePage = lazy(() => import('pages/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ContactsPage = lazy(() => import('pages/ConctactsPage'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<Loader className={css.loader} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegisterPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}