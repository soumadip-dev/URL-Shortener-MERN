import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { getUserUrl } from '../api/user.api';

const UserUrl = () => {
  const [copiedId, setCopiedId] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getUserUrl,
    gcTime: 60_000,
    staleTime: 0,
  });

  // Reverse the array to show newest URLs first
  const urls = data?.userUrls?.slice().reverse() || [];

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-8 text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-8 text-center text-red-500">
          Error loading URLs
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Original URL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Short URL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Clicks
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {urls.map(url => (
                  <tr key={url._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                          <ExternalLink className="h-4 w-4" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {url.full_url}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`${BACKEND_URL}/shorturl/${url.short_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-900 hover:underline text-sm font-medium"
                      >
                        localhost:8080/{url.short_url}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          url.clicks > 10
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          handleCopy(`${BACKEND_URL}/shorturl/${url.short_url}`, url._id)
                        }
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          copiedId === url._id
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {copiedId === url._id ? (
                          <>
                            <Check className="h-4 w-4 mr-1.5 text-green-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1.5 text-gray-500" />
                            Copy
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden max-h-[calc(100vh-200px)] overflow-y-auto">
          {urls.map(url => (
            <div key={url._id} className="p-4 border-b border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-1">
                  <ExternalLink className="h-4 w-4" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-sm font-medium text-gray-900 truncate">{url.full_url}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <a
                      href={`${BACKEND_URL}/shorturl/${url.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900 hover:underline text-sm"
                    >
                      localhost:8080/{url.short_url}
                    </a>
                    <span
                      className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        url.clicks > 10
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() =>
                        handleCopy(`${BACKEND_URL}/shorturl/${url.short_url}`, url._id)
                      }
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        copiedId === url._id
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {copiedId === url._id ? (
                        <>
                          <Check className="h-4 w-4 mr-1.5 text-green-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1.5 text-gray-500" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {urls.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="text-gray-400 mb-2 text-lg">No URLs created yet</div>
            <p className="text-sm text-gray-500">
              Shorten your first URL using the form on the left
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserUrl;
