import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import UrlForm from '../components/UrlForm.jsx';
import ShortenedUrlDisplay from '../components/ShortenedUrlDisplay.jsx';
import { useMutation } from '@tanstack/react-query';
import { getShortUrl } from '../api/urlService.api.js';
import toast, { Toaster } from 'react-hot-toast';

const HomePage = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 transition-all hover:shadow-2xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-30"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-100 rounded-full opacity-30"></div>
        <Header />
        <UrlForm
          originalUrl={originalUrl}
          setOriginalUrl={setOriginalUrl}
          isLoading={isPending}
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
export default HomePage;
