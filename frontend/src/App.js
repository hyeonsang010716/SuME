import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Homepage from "./pages/homepage/Homepage";
import Mainpage from "./pages/mainpage/Mainpage";
import Header from "./pages/Header";
import Login from "./pages/login/login";

function App() {
  return (
    <Router>
      <div
        className="App relative h-screen lg:flex lg:flex-row flex-col"
      >
        <div className="lg:h-full">
          <Header />
        </div>
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/main" element={<Mainpage />} />
            <Route path="/note/:id" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;