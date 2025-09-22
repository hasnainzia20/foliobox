import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/login/Login";
import Builder from "../pages/builder/Builder";
import Dashboard from "../pages/dashboard/Dashboard";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null; // or loading spinner
  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Router basename="/foliobox">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/builder/:templateId"
          element={
            <PrivateRoute>
              <Builder />
            </PrivateRoute>
          }
        />
        {/* <Route path="/u/:slug" element={<Portfolio />} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
