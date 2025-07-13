import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/user.api.js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Mail, Key, ArrowRight, User } from 'lucide-react';

//* Utility function for extracting error messages
const getErrorMessage = err => {
  if (err.response) {
    return err.response.data?.message || err.response.statusText;
  } else if (err.request) {
    return 'No response from server';
  } else {
    return err.message;
  }
};

//* Login form component
const LoginForm = ({ changePage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setFormData({ email: '', password: '' });
      toast.success('Login successful');
    },
    onError: err => {
      toast.error(getErrorMessage(err));
      console.error(err);
    },
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      return toast.error('Please enter a valid email address');
    }

    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    mutate(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all hover:shadow-2xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-30"></div>
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-indigo-100 rounded-full opacity-30"></div>

      <div className="relative z-10">
        <div className="flex justify-center mb-2">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <User className="h-6 w-6 text-indigo-600" strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mt-1">Sign in to continue</p>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-5 pr-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
                required
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              <Key className="h-4 w-4 mr-1" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-5 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-80 shadow-lg hover:shadow-indigo-200 active:scale-[0.98] group"
          >
            {isPending ? (
              'Logging in...'
            ) : (
              <>
                Login
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center space-y-3 text-sm mt-6">
          <div className="text-gray-500 flex items-center justify-center">
            Don't have an account?
            <span
              className="cursor-pointer text-indigo-600 hover:text-indigo-800 hover:underline ml-1 flex items-center"
              onClick={() => changePage('register')}
            >
              Register <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
