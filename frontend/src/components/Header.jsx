import { Link as LinkIcon, ArrowRight } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-2">
          <LinkIcon className="h-6 w-6 text-indigo-600" strokeWidth={2.5} />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
        URL Shortener
      </h1>
      <p className="text-gray-500 text-sm">Paste your long URL to make it magically shorter</p>
    </div>
  );
};
export default Header;
