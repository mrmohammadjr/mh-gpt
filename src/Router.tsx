import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/Home"

const Routers: React.FC = () => {
  return<Routes>
        <Route path="/" element={<Home />} />
   
      </Routes>
};

export default Routers;