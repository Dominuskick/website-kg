import React, { useState } from "react";
import styles from "./style.js";
import Navbar from "./components/Navbar.jsx";
import Footbar from "./components/Footbar.jsx";
import HomePage from "./components/HomePage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fractals from "./pages/Fractals.jsx";
import Fractals_zsinz from "./pages/Fractal_zsinz.jsx";

const App = () => {

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <Router>
        <div className={`${styles.flexCenter} bg-secondary flex-col`}>
          <Routes>
            <Route
              path="/fractals-serpinsky"
              element={
                <Fractals/>
              }
            />
            <Route
              path="/fractals-zsinz"
              element={
                <Fractals_zsinz/>
              }
            />
            <Route path="/" element={<HomePage />} exact />
          </Routes>
        </div>
      </Router>

      <div className={`${styles.flexCenter} bg-primary`}>
        <Footbar
        />
      </div>
    </div>
  );
};

export default App;
