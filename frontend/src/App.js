import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import './App.css';
import Mainpage from "./pages/mainpage/Mainpage";
import Header from "./pages/Header";
import Login from "./pages/login/login";

const AppContent = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/" || location.pathname === "";

  return (
    <div className={`flex flex-col md:flex-row h-full md:h-screen w-full ${isMainPage ? "justify-center" : ""} items-center gap-0 p-0 bg-white md:bg-cyan-100`}>
      
      <motion.div
        id="div1"
        initial={{ x: 550 }}
        animate={{ x: isMainPage ? 0 : 300 }}
        transition={{ type: "spring", stiffness: 200, damping: 18}}
        className={`w-full h-[700px] flex items-center ${isMainPage ? "justify-center md:w-[800px]" : "md:w-[600px]"}`}
      >
        <Header isMainPage={isMainPage} />
      </motion.div>

      {!isMainPage && (
        <motion.div
          id="div2"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 200 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
          className="w-full h-[700px] md:w-[1000px] flex items-center"
        >
          <Routes>
            <Route path="/note" element={<Mainpage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </motion.div>
      )}
      
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
