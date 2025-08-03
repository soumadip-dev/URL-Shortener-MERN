import { useState } from 'react';
import Post_list from './components/Post_list.jsx';

const App = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div>
      <h1>My Posts</h1>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      {toggle && <Post_list />}
    </div>
  );
};
export default App;
