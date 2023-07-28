import './App.css';
// import Document from './components/Document';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LandingPage } from './components/LandingPage';
import { NewDoc } from './components/NewDoc';


function App() {
  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/document" element={<NewDoc />} />
            </Routes>
      </Router> 
    </>
  );
}

export default App
