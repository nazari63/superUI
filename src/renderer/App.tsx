import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './styles/App.css';
import ProjectRoute from './routes/ProjectRoute';
import Layout from './components/layout/Layout';
import DashboardAccountRoute from './routes/DashboardAccountRoute';
import { Provider as ReduxToolkitProvider } from 'react-redux';
import { store } from './states/store';

export default function App() {
  return (
    <ReduxToolkitProvider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProjectRoute />} />
            <Route
              path="/dashboard/account"
              element={<DashboardAccountRoute />}
            />
          </Routes>
        </Layout>
      </Router>
    </ReduxToolkitProvider>
  );
}
