import { Link } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../api/auth.api.js';
import { useNavigate } from '@tanstack/react-router';
import { logout } from '../store/slice/authSlice.js';

const NavBer = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(logout());
      queryClient.invalidateQueries(['auth']);
      navigate({ to: '/' });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all">
                URL Shortener
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isLoading}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-rose-700 transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {logoutMutation.isLoading ? 'Logging out...' : 'Logout'}
              </button>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBer;
