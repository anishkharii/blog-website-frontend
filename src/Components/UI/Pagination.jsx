import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pagination = ({ currPage, limit=10, totalBlogs }) => {
  const totalPages = Math.ceil(totalBlogs / limit);

  const generatePageNumbers = () => {
    if (totalPages <= 6) {
      // Show all pages if total pages <= 6
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    if (currPage <= 4) {
      // Show first 3 pages and last 3 when current page is near the start
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currPage >= totalPages - 3) {
      // Show first 3 pages and last 3 when current page is near the end
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Show surrounding pages with ellipses in between
      pages.push(1, '...', currPage - 1, currPage, currPage + 1, '...', totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      {/* Previous Page Button */}
      {currPage > 1 && (
        <Button variant="outline">
          <Link to={`?page=${currPage - 1}`}>
            <ArrowLeft />
          </Link>
        </Button>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span key={index} className="text-gray-500 px-2">
            ...
          </span>
        ) : (
          <Button
            key={index}
            variant={`${currPage === page ? 'outline' : 'default'}`}
          >
            <Link to={`?page=${page}`}>{page}</Link>
          </Button>
        )
      )}

      {/* Next Page Button */}
      {currPage < totalPages && (
        <Button variant="outline">
          <Link to={`?page=${currPage + 1}`}>
            <ArrowRight />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Pagination;
