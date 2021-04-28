import React from 'react';
import './News.css'
import Minicard from '../Card/MiniCard'
const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='news'>
      {posts.map(post => (
        <li key={post.id} >
          <Minicard></Minicard>
        </li>
      ))}
    </ul>
  );
};

export default Posts;   