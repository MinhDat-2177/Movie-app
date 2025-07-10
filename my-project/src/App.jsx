import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login';
import Home from './pages/home/Home';
import Movies from './pages/auth/Movies';
import Description from './pages/auth/Description';
import Watch from './pages/auth/Watch';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Movies />} />
          <Route path="movies" element={<Movies />} />
          <Route path="description/:id" element={<Description />} />
          <Route path="watch/:id" element={<Watch />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;