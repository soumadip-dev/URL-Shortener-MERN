import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/user.api.js';
import { useState } from 'react';
import toast from 'react-hot-toast';

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

//* Register form component
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setFormData({ name: '', email: '', password: '' });
      toast.success('Registration successful');
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
  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    isValidEmail(formData.email) &&
    formData.password.length >= 6;

  const handleSubmit = e => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      return toast.error('Please enter a valid email address');
    }

    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    mutate(formData);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center">
        Register
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            id="name"
            required
            placeholder="Enter your full name"
            autoComplete="name"
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            autoComplete="email"
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            id="password"
            required
            placeholder="Create a password"
            autoComplete="new-password"
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isPending}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-80 shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="text-center space-y-3 text-sm">
        <div className="text-gray-500">
          Already have an account?
          <span className="cursor-pointer text-indigo-600 hover:text-indigo-800 hover:underline ml-1">
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
