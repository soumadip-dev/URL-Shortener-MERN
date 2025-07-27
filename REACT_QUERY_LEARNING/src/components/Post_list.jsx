import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPost, fetchPosts, fetchTags } from '../api/api';
import { useState } from 'react';

const PostList = () => {
  const [page, setPage] = useState(1);
  const {
    data: postData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    gcTime: 0,
    refetchInterval: 1000 * 10,
  });

  const {
    data: tagsData,
    isError: isTagError,
    error: tagError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
    reset,
  } = useMutation({
    mutationFn: addPost,
    onMuted: () => {
      return { id: 1 };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: true,
      });
    },
    // onError: () => {},
    // onSettled: () => {},
  });

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const tags = formData.getAll('tags'); // Get all selected checkboxes
    mutate({ title, tags });
    e.target.reset(); // Optional: reset form after submit
  };

  return (
    <div className="post-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your post..."
          className="postbox"
          name="title"
          required
        />

        <div className="tags">
          {tagsData?.map(tag => (
            <div className="tag-option" key={tag}>
              <input type="checkbox" id={tag} name="tags" value={tag} />
              <label htmlFor={tag}>{tag}</label>
            </div>
          ))}
        </div>

        <button type="submit" disabled={isPending} className="post-button">
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {isLoading && <p className="loading">Loading posts...</p>}
      {isError && <p className="error">Error loading posts: {error?.message}</p>}
      {isTagError && <p className="error">Error loading tags: {tagError?.message}</p>}
      {isPostError && (
        <p onClick={() => reset()} className="error">
          Error submitting post: {postError?.message}
        </p>
      )}
      <div className="pages">
        <button>Previous Page</button>
        <span>{page}</span>
        <button>Next Page</button>
      </div>
      {postData?.map(post => (
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

export default PostList;
