import { Provider as ReduxToolkitProvider } from 'react-redux';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardAccountRoute from './routes/DashboardAccountRoute';
import DashboardMain from './routes/DashboardMain';
import Initialization from './Initialization';
import ProjectCreate from './routes/ProjectCreate';
import ProjectRoute from './routes/ProjectRoute';
import DashboardTransactionsRoute from './routes/TransactionsRoute';
import { store } from './states/store';
import './styles/App.css';
import ProjectLoading from './routes/ProjectLoading';

export default function App() {
  return (
    <ReduxToolkitProvider store={store}>
      <Initialization />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProjectRoute />} />
            <Route path="/create" element={<ProjectCreate />} />
            <Route path="/loading" element={<ProjectLoading />} />

            {/* dashboard */}
            <Route path="/dashboard/main" element={<DashboardMain />} />
            <Route
              path="/dashboard/account/:layer/:chainId"
              element={<DashboardAccountRoute />}
            />
            <Route
              path="/dashboard/transactions"
              element={<DashboardTransactionsRoute />}
            />
          </Routes>
        </Layout>
      </Router>
    </ReduxToolkitProvider>
  );
}
