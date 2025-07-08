import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Crowdfunding from "./pages/Crowdfunding";
import Traceability from "./pages/Traceability";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/crowdfunding" element={<Crowdfunding />} />
        <Route path="/traceability" element={<Traceability />} />
      </Routes>
    </Router>
  );
}

export default App;
