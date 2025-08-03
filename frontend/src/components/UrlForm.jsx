import { Loader2 } from 'lucide-react';
const UrlForm = ({ handleSubmit, originalUrl, setOriginalUrl, isLoading }) => {
  return (
    <>
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
    </>
  );
};
export default UrlForm;
