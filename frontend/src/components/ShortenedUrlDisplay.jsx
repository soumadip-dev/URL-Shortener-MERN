import { Copy, Check, Link as LinkIcon } from 'lucide-react';

const ShortenedUrlDisplay = ({ shortUrl, handleCopy, copied }) => {
  return (
    <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center flex-1 min-w-0">
          <LinkIcon className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-700 hover:text-indigo-800 hover:underline font-medium text-sm truncate"
          >
            {shortUrl}
          </a>
        </div>
        <button
          onClick={handleCopy}
          className="p-2.5 rounded-xl bg-white border border-indigo-100 text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm hover:shadow-md"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
export default ShortenedUrlDisplay;
