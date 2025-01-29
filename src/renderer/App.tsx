import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './styles/App.css';
import ProjectRoute from './routes/ProjectRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectRoute />} />
      </Routes>
    </Router>
  );
}
