import { Toaster } from 'react-hot-toast';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useState } from 'react';

const AuthPage = () => {
  const [pageName, setPageName] = useState('login');
  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <Toaster position="bottom-center" reverseOrder={false} />
      {pageName === 'login' ? (
        <LoginForm changePage={setPageName} />
      ) : (
        <RegisterForm changePage={setPageName} />
      )}
    </div>
  );
};

export default AuthPage;
