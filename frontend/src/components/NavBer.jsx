import { Link } from '@tanstack/react-router';
const NavBer = () => {
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
            <Link
              to="/auth"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBer;
