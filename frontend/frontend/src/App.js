import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Mainpage from "./pages/mainpage/Mainpage";
import Header from "./pages/Header";
import Login from "./pages/login/login"; // 이름을 대문자로 변경

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/main" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
