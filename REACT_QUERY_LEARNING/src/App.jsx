import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api/api.js';

const App = () => {
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  console.log('Data:', data, 'Loading:', isLoading, 'Error: ', isError, 'Status: ', status);

  return <div>App</div>;
};
export default App;
