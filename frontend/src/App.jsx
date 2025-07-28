import { Copy, Link as LinkIcon, Loader2, Check } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Header from './components/Header';
import UrlForm from './components/UrlForm';
import ShortenedUrlDisplay from './components/ShortenedUrlDisplay';

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
        <Header />
        <UrlForm
          originalUrl={originalUrl}
          setOriginalUrl={setOriginalUrl}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
        {shortUrl && (
          <ShortenedUrlDisplay shortUrl={shortUrl} copied={copied} handleCopy={handleCopy} />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;
