import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { Footer } from './components/Layout/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Auth/Login';
import { ClientsList } from './components/Clients/ClientsList';
import { ClientForm } from './components/Clients/ClientForm';
import { PetsList } from './components/Pets/PetsList';
import { PetForm } from './components/Pets/PetForm';
import { AppointmentsList } from './components/Appointments/AppointmentsList';
import { AppointmentForm } from './components/Appointments/AppointmentForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ToastProvider } from './components/Toast/ToastProvider';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { NotFound } from './components/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <Router>
                    <ToastProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/*"
                                element={
                                    <MainLayout>
                                        <Routes>
                                            <Route path="/" element={<Home />} />
                                            <Route
                                                path="/dashboard"
                                                element={
                                                    <ProtectedRoute>
                                                        <Dashboard />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="/clients"
                                                element={
                                                    <ProtectedRoute>
                                                        <ClientsList />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="/clients/new"
                                                element={
                                                    <ProtectedRoute>
                                                        <ClientForm />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="/clients/:id"
                                                element={
                                                    <ProtectedRoute>
                                                        <ClientForm />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="/pets"
                                                element={
                                                    <ProtectedRoute>
                                                        <PetsList />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="/pets/new"
                                                element={
                                                    <ProtectedRoute>
                                                        <PetForm />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="/pets/:id"
                                                element={
                                                    <ProtectedRoute>
                                                        <PetForm />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="/appointments"
                                                element={
                                                    <ProtectedRoute>
                                                        <AppointmentsList />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="/appointments/new"
                                                element={
                                                    <ProtectedRoute>
                                                        <AppointmentForm />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route
                                                path="/appointments/:id"
                                                element={
                                                    <ProtectedRoute>
                                                        <AppointmentForm />
                                                    </ProtectedRoute>
                                                }
                                            />
                                            <Route path="*" element={<NotFound />} />
                                        </Routes>
                                        <Footer />
                                    </MainLayout>
                                }
                            />
                        </Routes>
                    </ToastProvider>
                </Router>
            </AuthProvider>
            <ToastContainer position="bottom-right" />
        </ErrorBoundary>
    );
}; 
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
>>>>>>> accbadc64827a41985acc1227965f9c9da43f30f
