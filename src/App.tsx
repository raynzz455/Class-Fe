import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Layout from './layout/Layout';
import LoginAdmin from './pages/auth/LoginAdmin';
import LoginUser from './pages/auth/Login';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import DashboardUser from './pages/students/DashboardStudents';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProtectedRouteAdmin from './components/auth/AdminRouteProtect';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { AdminSidebar } from '@/components/admin-sidebar';
import StudentSidebar from '@/components/student-sidebar';

import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        
          <Router>
            <Routes>
              <Route path="/loginAdmin" element={<LoginAdmin />} />
              <Route path="/login" element={<LoginUser />} />
              <Route
                path="/dashboard/admin"
                element={
                  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                  <SidebarProvider>
                  <ProtectedRoute> {/* using auth route */}
                  <ProtectedRouteAdmin>
                    <AdminSidebar />
                    <div className="w-full">
                      <div className="p-5 flex justify-between">
                        <SidebarTrigger />
                        <ModeToggle />
                      </div>
                      <DashboardAdmin />
                    </div>
                    </ProtectedRouteAdmin>
                  </ProtectedRoute>
                  </SidebarProvider>
                  </ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
