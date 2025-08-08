import { redirect } from '@tanstack/react-router';
import store from '../store/store';

export const checkAuth = async () => {
  const auth = store.getState().auth;
  if (!auth.isAuthenticated) {
    throw redirect({ to: '/auth' });
  }
};
