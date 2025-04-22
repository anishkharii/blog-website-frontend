import React from 'react';
import Button from './Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pagination = ({ currPage, limit = 12, totalBlogs, onPageChange }) => {
  const totalPages = Math.ceil(totalBlogs / limit);

  const generatePageNumbers = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    if (currPage <= 4) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currPage - 1, currPage, currPage + 1, '...', totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (totalPages === 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Previous Button */}
      {
        currPage !== 1 && (
          <Button
            variant="simple"
            onClick={() => onPageChange(currPage - 1)}
          >
            <ArrowLeft />
          </Button>
        )
      }

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span key={index} className="text-gray-500 px-2">...</span>
        ) : (
          <Button
            key={index}
            variant={currPage === page ? 'primary' : 'simple'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        )
      )}

      {/* Next Button */}
      {
        currPage !== totalPages && (
          <Button
            variant="simple"
            onClick={() => onPageChange(currPage + 1)}
          >
            <ArrowRight />
          </Button>
        )
      }
    </div>
  );
};

export default Pagination;
