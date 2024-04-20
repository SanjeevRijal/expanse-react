import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


// Example items, to simulate fetching from another resources.

function Items({ currentItems }) {
  return (
    <>
      {
        <>{currentItems.length==0?<p className='no_bills_text'>You have no bills</p>:currentItems}
        </>  
          
      }
    </>
  );
}

export default function PaginatedItems({ itemsPerPage, items }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate className='pagination'
        breakLabel ="..."
        nextLabel=" >>"
        nextClassName='nav-text'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        pageClassName="nav-text"
        previousLabel="<<"
        previousClassName='nav-text'
        renderOnZeroPageCount={null}
        activeLinkClassName="activePage"
      />
    </>
  );
}