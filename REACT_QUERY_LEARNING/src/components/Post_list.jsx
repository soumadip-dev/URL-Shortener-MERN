import { useMutation, useQuery } from '@tanstack/react-query';
import { addPost, fetchPosts, fetchTags } from '../api/api';

const PostList = () => {
  const {
    data: postData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const {
    data: tagsData,
    isError: isTagError,
    isLoading: isTagLoading,
    error: tagError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
    reset,
  } = useMutation({
    mutationFn: addPost,
  });

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const tags = Array.from(formData.keys()).filter(key => formData.get(key) === 'on');
    console.log(title, tags);
  };

  return (
    <div className="post-container">
      <form className="post-form">
        <input type="text" placeholder="Enter your post..." className="postbox" name="title" />

        <div className="tags">
          {tagsData?.map(tag => (
            <div className="tag-option" key={tag}>
              <input type="checkbox" id={tag} name={tag} />
              <label htmlFor={tag}>{tag}</label>
            </div>
          ))}
        </div>
      </form>

      {isLoading && <p className="loading">Loading...</p>}
      {isError && <p className="error">{error?.message}</p>}

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
