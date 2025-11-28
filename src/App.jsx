import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import LeftSidebar from "./layout/LeftSidebar";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import SignUp from "./components/SignUp";
import ProjectDetail from "./pages/ProjectDetail";
import TaskDetail from "./pages/TaskDetail";
import TeamDetail from "./pages/TeamDetail";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <LeftSidebar />
            </ProtectedRoute>
          }
        >
          <Route path="/home/dashboard" element={<Dashboard />} />
          <Route path="/home/projects" element={<Projects />} />
          <Route path="/home/projects/:id" element={<ProjectDetail />} />
          <Route path="/home/projects/:id/tasks/:id" element={<TaskDetail />} />
          <Route path="/home/teams" element={<Teams />} />
          <Route path="/home/teams/:teamId/members" element={<TeamDetail />} />
          <Route path="/home/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
