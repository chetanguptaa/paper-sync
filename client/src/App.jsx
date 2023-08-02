import './App.css';
// import Document from './components/Document';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LandingPage } from './components/LandingPage';
import { Document } from './components/Document';
import  SignUp  from './components/auth/SignUp';
import  Login  from './components/auth/Login';
import { UserPage } from './components/UserPage';


function App() {
  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/document" element={<Document />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/user" element={<UserPage />} />
            </Routes>
      </Router> 
    </>
  );
}

export default App
