import { useState } from 'react';
import ShortUrlPage from './pages/ShortUrlPage.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <ShortUrlPage />
    </div>
  );
};

export default App;
