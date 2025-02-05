import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './styles/App.css';
import ProjectRoute from './routes/ProjectRoute';
import Layout from './components/layout/Layout';
import DashboardAccountRoute from './routes/DashboardAccountRoute';
import { Provider as ReduxToolkitProvider } from 'react-redux';
import { store } from './states/store';
import DashboardMain from './routes/DashboardMain';
import Initialization from './Initialization';
import ProjectCreate from './routes/ProjectCreate';

export default function App() {
  return (
    <ReduxToolkitProvider store={store}>
      <Initialization />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProjectRoute />} />
            <Route
              path="/create"
              element={<ProjectCreate />}
            />
            <Route
              path="/dashboard/main"
              element={<DashboardMain />}
            />
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
