import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
}

export default Router;