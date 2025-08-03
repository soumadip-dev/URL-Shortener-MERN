import { Link as LinkIcon } from 'lucide-react';

const Header = () => {
  return (
    <>
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="p-3 bg-indigo-100 rounded-full">
            <LinkIcon className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          URL Shortener
        </h1>
        <p className="text-gray-500 text-sm">Paste your long URL to make it magically shorter</p>
      </div>
    </>
  );
};
export default Header;
