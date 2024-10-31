import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContentPage from "./pages/ContentPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes without header and footer */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Routes with header and footer */}
        <Route
          path="/content"
          element={
            <PrivateRoute>
              <Layout>
                <ContentPage />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
