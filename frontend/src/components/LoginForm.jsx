import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/user.api.js';
import { useState } from 'react';
import toast from 'react-hot-toast';

//* Login form component
const LoginForm = () => {
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mutations and handlers of react query
  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('Login successful');
    },
    onError: err => {
      toast.error('Login error:', err);
      console.log(err);
    },
  });

  // Submit handler function
  const handleSubmit = async e => {
    e.preventDefault();
    mutate({ email, password });
  };
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center">
        Login
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="email"
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
            required
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-80 shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="text-center space-y-3 text-sm">
        <div className="text-gray-500">
          Don't have an account?
          <span className="cursor-pointer text-indigo-600 hover:text-indigo-800 hover:underline ml-1">
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
