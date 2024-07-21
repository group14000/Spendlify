import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoaderComponent from './components/shared/LoaderComponent';

const delayImport = <T extends React.ComponentType<any>>(importFunc: () => Promise<{ default: T }>, delay: number): Promise<{ default: T }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      importFunc().then(module => resolve(module));
    }, delay);
  });
};

const Login = lazy(() => delayImport(() => import('./components/Auth/Login/Login'), 2000));
const Signup = lazy(() => delayImport(() => import('./components/Auth/signup/Signup'), 2000));
const ExpenseTrackerForm = lazy(() => delayImport(() => import('./components/transactions/ExpenseTrackerForm'), 2000));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><LoaderComponent /></div>}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/add-transactions' element={<ExpenseTrackerForm />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
