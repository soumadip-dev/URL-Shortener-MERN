import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/api';

const Post_list = () => {
  const {
    data: posstData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <div className="post-container">
      {isLoading && <p className="loading">Loading...</p>}
      {isError && <p className="error">{error?.message}</p>}

      {posstData?.map(post => (
        <div className="post-card" key={post.id}>
          <h2 className="post-title">{post.title}</h2>
          <div className="tag-container">
            {post.tags.map(tag => (
              <span className="tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post_list;
