import "./App.css";
import Home from "./components/Home/Home";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route
          path="/"
          element={
            <>
              <Sidebar />
              <Home />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
