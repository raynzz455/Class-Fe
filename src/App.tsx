import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Layout from './layout/Layout';
import LoginAdmin from './pages/auth/LoginAdmin';
import LoginUser from './pages/auth/Login';
import DashboardAdmin from './pages/admin/dashboard/DashboardAdmin';
import DashboardUser from './pages/students/DashboardStudents';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProtectedRouteAdmin from './components/auth/AdminRouteProtect';
import { AuthProvider } from './context/AuthContext';
import { AdminSidebar } from '@/components/admin-sidebar';
import StudentSidebar from '@/components/student-sidebar';

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
                  <SidebarProvider>
                  <ProtectedRoute> {/* using auth route */}
                  <ProtectedRouteAdmin>
                    <AdminSidebar />
                    <div className="w-full">
                      <div className="p-5 flex justify-between">
                        <SidebarTrigger />
                      </div>
                      <DashboardAdmin />
                    </div>
                    </ProtectedRouteAdmin>
                  </ProtectedRoute>
                  </SidebarProvider>
                }
              />


              <Route
                path="/dashboard/students"
                element={
                  <ProtectedRoute>
                    <Layout sidebar={<StudentSidebar />}>
                      <DashboardUser />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        
      </AuthProvider>
  );
}

export default App;
