import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import './App.css';
import Mainpage from "./pages/mainpage/Mainpage";
import Header from "./pages/Header";
import Login from "./pages/login/login";

const AppContent = () => {
  const location = useLocation();
  const isMainPage = location.pathname === "/" || location.pathname === "";
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth < 768);
  const [isxl, setIsxl] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth < 768);
      setIsxl(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`flex flex-col xl:flex-row h-screen w-full ${isMainPage ? "justify-center h-full xl:h-screen" : ""} items-center gap-0 p-0 bg-white md:bg-cyan-100`}>
      
      <motion.div
        id="div1"
        initial={{ x: isxl ? 0 : 550, y: 0 }}
        animate={{ x: isMainPage ? 0 : (isxl ? 0 : 300), y: isxl ? 50 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18}}
        className={`w-full h-[525px] xl:h-[700px] flex items-start md:w-[800px] md:items-center ${isMainPage ? "justify-center" : ""}`}
      >
        <Header isMainPage={isMainPage} />
      </motion.div>

      {!isMainPage && (
        <motion.div
          id="div2" 
          initial={{ opacity: 0, x: isxl ? 0 : 100, y:0 }}
          animate={{ opacity: 1, x: isxl ? 0 : 0, y: isxl ? 100 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="w-full h-[700px] pb-20 xl:pb-0 xl:w-[1000px] flex items-center justify-center xl:justify-start"
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
