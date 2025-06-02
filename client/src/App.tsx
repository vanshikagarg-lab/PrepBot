import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Interview from './pages/Interview';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/interview" element={<Interview />} />
    </Routes>
  );
};

export default App;
