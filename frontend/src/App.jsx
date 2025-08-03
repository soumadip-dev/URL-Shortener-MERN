import { Copy, Link as LinkIcon, Loader2, Check } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setShortUrl(''); // Reset previous short URL
    try {
      const response = await axios.post('http://localhost:8080/shorturl/create', {
        url: originalUrl,
      });
      setShortUrl(response.data.shortUrl);
      toast.success('Short URL created successfully');
    } catch (error) {
      console.error('Error creating short URL:', error);
      toast.error('Failed to create short URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 transition-all hover:shadow-2xl">
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="url"
              value={originalUrl}
              onChange={e => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very-long-url..."
              className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300"
              required
              pattern="https?://.+"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-80 shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Shortening...
              </>
            ) : (
              'Shorten URL'
            )}
          </button>
        </form>

        {shortUrl && (
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
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-gray-400 pt-2">
          <p>A free tool to shorten and share URLs instantly</p>
        </div>
      </div>
    </div>
  );
};

export default App;
