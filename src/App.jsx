import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Categories from './pages/Categories';
import CategoryView from './pages/CategoryView';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Thoughts from './pages/Thoughts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:currentCategory" element={<CategoryView />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
        <Route path="/thoughts" element={<Thoughts />} />
      </Routes>
    </Router>
  );
}

export default App;
