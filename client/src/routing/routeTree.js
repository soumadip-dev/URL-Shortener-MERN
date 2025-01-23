import { createRootRoute } from '@tanstack/react-router';
import RootLayout from '../RootLayout.jsx';
import { homeRoute } from './homePage.route.js';
import { authRoute } from './auth.route.js';
import { dashboardRoute } from './dashboard.route.js';

export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([homeRoute, authRoute, dashboardRoute]);
