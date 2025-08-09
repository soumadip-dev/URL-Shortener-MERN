import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getShortUrl } from '../api/urlService.api.js';
import toast, { Toaster } from 'react-hot-toast';
import { LinkIcon, Loader2, ArrowRight, Check, Copy } from 'lucide-react';
import { useSelector } from 'react-redux';

const UrlShortner = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [customSlug, setCustomSlug] = useState('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['shortUrl'],
    mutationFn: getShortUrl,
    onSuccess: data => {
      setShortUrl(data.shortUrl);
      toast.success('Short URL created successfully');
    },
    onError: error => {
      console.error('Error creating short URL:', error);
      toast.error('Failed to create short URL');
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setShortUrl('');
    mutate(originalUrl);
    setOriginalUrl('');
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[93vh] bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col justify-center items-center p-4 sm:p-6">
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 sm:space-y-8 transition-all hover:shadow-2xl relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-30 hidden sm:block"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-100 rounded-full opacity-30 hidden sm:block"></div>

        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
              <LinkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
            URL Shortener
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Paste your long URL to make it magically shorter
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="space-y-1">
            <div className="relative">
              <input
                type="url"
                id="url"
                value={originalUrl}
                onChange={e => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/very-long-url..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300 text-sm sm:text-base"
                required
                pattern="https?://.+"
              />
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {isAuthenticated && (
            <div className="space-y-1">
              <div className="relative">
                <input
                  type="text"
                  id="customSlug"
                  value={customSlug}
                  onChange={e => setCustomSlug(e.target.value)}
                  placeholder="Custom slug (optional)"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm hover:border-indigo-300 text-sm sm:text-base"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  /
                </span>
              </div>
              <p className="text-xs text-gray-500 pl-2">Only available for registered users</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-80 shadow-lg hover:shadow-indigo-200 active:scale-[0.98] group text-sm sm:text-base"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                Shortening...
              </>
            ) : (
              <>
                Shorten URL
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Result */}
        {shortUrl && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-indigo-50 rounded-xl border border-indigo-100 animate-fade-in">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center flex-1 min-w-0">
                <LinkIcon className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-500 mr-1 sm:mr-2 flex-shrink-0" />
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 hover:text-indigo-800 hover:underline font-medium text-xs sm:text-sm truncate"
                >
                  {shortUrl}
                </a>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white border border-indigo-100 text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm hover:shadow-md"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-3 sm:pt-4">
          <p>A free tool to shorten and share URLs instantly</p>
        </div>
      </div>
    </div>
  );
};

export default UrlShortner;
