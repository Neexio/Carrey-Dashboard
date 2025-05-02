import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { UserExperienceProvider } from './contexts/UserExperienceContext';
import LoadingScreen from './components/LoadingScreen';
import Auth from './pages/Auth';

// Lazy load components
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Onboarding = React.lazy(() => import('./pages/Onboarding'));

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UserExperienceProvider>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
                <Route path="/*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              </Routes>
            </Suspense>
          </UserExperienceProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;