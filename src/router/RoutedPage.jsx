import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Artist from '../views/Artist';
import NotFound from '../views/NotFound';
import Index from '../Index';
import Album from '../views/Album';

function RoutedPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/artist/:id/:artistName" element={<Artist />} />
        <Route path="/album/:id/:artistName" element={<Album />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default RoutedPage;
