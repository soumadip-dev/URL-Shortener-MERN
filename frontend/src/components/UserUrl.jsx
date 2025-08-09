import React, { useState } from 'react';
import { Copy, Check, BarChart2, ExternalLink } from 'lucide-react';

const UserUrl = () => {
  const [copiedId, setCopiedId] = useState(null);

  // Sample static data for UI preview
  const urls = [
    {
      _id: '1',
      full_url: 'https://example.com/some/very/long/path/that/needs/to/be/truncated',
      short_url: 'abc123',
      clicks: 5,
      createdAt: '2023-05-15',
    },
    {
      _id: '2',
      full_url: 'https://anotherexample.com/with/another/long/url/path',
      short_url: 'xyz789',
      clicks: 12,
      createdAt: '2023-06-20',
    },
  ];

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
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
                      href={`http://localhost:3000/${url.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900 hover:underline text-sm font-medium"
                    >
                      localhost:3000/{url.short_url}
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
                      onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
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

        {/* Mobile Cards */}
        <div className="md:hidden">
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
                      href={`http://localhost:3000/${url.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900 hover:underline text-sm"
                    >
                      localhost:3000/{url.short_url}
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
                      onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
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
