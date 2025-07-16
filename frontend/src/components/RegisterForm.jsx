import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/user.api.js';
import { useState } from 'react';
import toast from 'react-hot-toast';

//* Register form component
const RegisterForm = () => {
  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mutations and handlers of react query
  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setName('');
      setEmail('');
      setPassword('');
      toast.success('Registration successful');
    },
    onError: err => {
      let errorMessage;
      if (err.response) {
        // The request was made and the server responded with a status code
        errorMessage = err.response.data?.message || err.response.statusText;
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server';
      } else {
        // Something happened in setting up the request
        errorMessage = err.message;
      }
      toast.error(errorMessage);
      console.log(error);
    },
  });

  // Submit handler function
  const handleSubmit = async e => {
    e.preventDefault();
    mutate({ name, email, password });
  };
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center">
        Register
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="fullname">
            Full Name
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            id="fullname"
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="password"
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
            required
            placeholder="Create a password"
          />
        </div>
        <button
          type="submit"
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
