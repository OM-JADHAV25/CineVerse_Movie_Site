
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import MovieDetail from "./Pages/MovieDetail";
import Movies from "./Pages/Movies";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  );
};

export default App;
