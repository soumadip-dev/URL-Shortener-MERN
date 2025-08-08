import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './routeTree.js';
import DashboardPage from '../pages/DashboardPage.jsx';
import { checkAuth } from '../utils/helper.js';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  beforeLoad: checkAuth,
});

