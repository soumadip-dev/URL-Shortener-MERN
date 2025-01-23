import { Outlet } from '@tanstack/react-router';

import NavBer from './components/NavBer';

const RootLayout = () => {
  return (
    <>
      <NavBer />
      <Outlet />
    </>
  );
};

export default RootLayout;
