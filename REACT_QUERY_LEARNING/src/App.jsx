import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api/api.js';
import Post_list from './components/Post_list.jsx';

const App = () => {
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  console.log('Data:', data, 'Loading:', isLoading, 'Error: ', isError, 'Status: ', status);

  return (
    <div>
      <h1>Soumadip Majila</h1>
      <Post_list />
    </div>
  );
};
export default App;
