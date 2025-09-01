import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import CraftThree from './Pages/Craftthree.jsx';
import Xelops from './Pages/Xelops.jsx';
import Test from './Pages/test.jsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/xelops" element={<Xelops />} />
      <Route path="/craftthree" element={<CraftThree />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default Router;