import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
// import Homepage from "./pages/homepage/Homepage";
import Mainpage from "./pages/mainpage/Mainpage";
import Header from "./pages/Header";
import Login from "./pages/login/login";

function App() {
  return (
    <Router>
      <div className="flex items-center justify-center p-10">
        <div id="div1">
          <Header />
        </div>
        <div id="div2" className="w-full">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/main" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;