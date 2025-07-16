import toast, { Toaster } from 'react-hot-toast';
import LoginForm from '../components/LoginForm';
const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <Toaster position="bottom-center" reverseOrder={false} />
      <LoginForm />
    </div>
  );
};
export default AuthPage;
