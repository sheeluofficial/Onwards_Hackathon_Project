import { Routes, Route } from "react-router-dom";
import LayoutWithRightSidebar from "./components/LayoutWithRightSidebar";
import NavbarBeforeLogin from "./components/NavbarBeforeLogin";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import LayoutWithoutRightSidebar from "./components/LayoutWithoutRightSidebar";
import MasaiOnboardingPage from "./components/Onboarding";
import Result from "./pages/Result";
import HomePage from "./pages/HomePage";
import ActivityDetails from "./components/Activities/ActivityDetails";
import Greetings from "./components/Greetings/Greetings";
import CouncellingBanner from "./components/Greetings/CouncellingBanner";
import PlainLayout from "./components/PlainLayout";
import MSATResult from "./components/MSATResult";
import MSATRetake from "./components/MSATRetake";
import MsatResultsPage from "./components/MsatResultsPage";
import MyProfilePage from "./components/MyProfilePage";
import Activities from "./pages/Activities";
import DashboardContent from "./components/DashboardContent";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <NavbarBeforeLogin />
            <HomePage />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardContent />
          </PrivateRoute>
        }
      />
      <Route
        path="/events"
        element={
          <LayoutWithRightSidebar>
            <PrivateRoute>
              <Activities />
            </PrivateRoute>
          </LayoutWithRightSidebar>
        }
      />
      <Route
        path="/events/:event_id"
        element={
          <LayoutWithoutRightSidebar>
            <PrivateRoute>
              <ActivityDetails />
            </PrivateRoute>
          </LayoutWithoutRightSidebar>
        }
      />

      <Route
        path="/courses"
        element={
          <LayoutWithRightSidebar>
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          </LayoutWithRightSidebar>
        }
      />

      <Route
        path="/courses/:course_id"
        element={
          <LayoutWithoutRightSidebar>
            <PrivateRoute>
              <CourseDetails />
            </PrivateRoute>
          </LayoutWithoutRightSidebar>
        }
      />

      <Route
        path="/profile"
        element={
          <LayoutWithoutRightSidebar>
            <PrivateRoute>
              <MyProfilePage />
            </PrivateRoute>
          </LayoutWithoutRightSidebar>
        }
      />

      <Route
        path="/msat-result"
        element={
          <PlainLayout>
            {/* <PrivateRoute> */}
            <MsatResultsPage />
            {/* </PrivateRoute> */}
          </PlainLayout>
        }
      />
    </Routes>
  );
}

export default App;
