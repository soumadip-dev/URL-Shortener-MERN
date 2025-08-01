import { Copy, Link as LinkIcon, Loader2, Check } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // These would be replaced with your actual API calls
  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post('http://localhost:8080/shorturl/create', { url: originalUrl })
      .then(response => {
        setIsLoading(false);
        setShortUrl(response.data.shortUrl);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <LinkIcon className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">URL Shortener</h1>
          <p className="text-gray-600">Paste your long URL to make it shorter</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="url"
              value={originalUrl}
              onChange={e => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very-long-url..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition disabled:opacity-70"
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
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline truncate"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-indigo-600 transition"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="text-center text-sm text-gray-500">
          <p>Free tool to shorten and share URLs</p>
        </div>
      </div>
    </div>
  );
};

export default App;
