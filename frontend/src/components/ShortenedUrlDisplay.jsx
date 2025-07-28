import { Copy, Check } from 'lucide-react';
const ShortenedUrlDisplay = ({ shortUrl, handleCopy, copied }) => {
  return (
    <>
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100 animate-fade-in">
        <div className="flex items-center justify-between gap-3">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-700 hover:text-indigo-800 hover:underline font-medium text-sm truncate flex-1"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white border border-indigo-100 text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </>
  );
};
export default ShortenedUrlDisplay;
