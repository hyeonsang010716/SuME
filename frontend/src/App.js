import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
// import Homepage from "./pages/homepage/Homepage";
import Mainpage from "./pages/mainpage/Mainpage";
import Header from "./pages/Header";
import Login from "./pages/login/login";

function App() {
  return (
    <Router>
      <div className="flex h-screen items-center justify-center gap-0 p-20 pt-10 pb-10 bg-cyan-100">
        <div id="div1" className="h-5/6 w-1/3 flex items-center justify-center -mr-20">
          <Header />
        </div>
        <div id="div2" className="h-5/6 w-5/6 flex items-center justify-center -ml-20">
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