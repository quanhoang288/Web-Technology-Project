import React from 'react';
import './Pagination.css'
import {Link} from 'react-router-dom'
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  

  return (

    <div className='pagination'>
      <ul>
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'pageNumber active' : 'pageNumber'}>
            <Link onClick={() => paginate(number)} href='#'>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>


  );
};

export default Pagination;