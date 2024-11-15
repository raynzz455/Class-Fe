import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from './pages/auth/LoginAdmin';
import LoginUser from './pages/auth/Login';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import DashboardUser from './pages/students/DashboardStudents';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; 
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/login" element={<LoginUser />} />
          
          <Route 
            path="/dashboard/admin" 
            element={
              <ProtectedRoute>
                <DashboardAdmin />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/students" 
            element={
              <ProtectedRoute>
                <DashboardUser />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
