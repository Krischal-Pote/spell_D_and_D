import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const middlePage = Math.ceil(maxVisiblePages / 2);
    const startPage =
      currentPage <= middlePage ? 1 : Math.max(1, currentPage - middlePage + 1);
    const endPage =
      currentPage >= totalPages - middlePage
        ? totalPages
        : Math.min(totalPages, currentPage + middlePage - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center mt-4 mb-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="mr-2 px-4 py-2 rounded bg-blue-500 text-white"
      >
        Previous
      </button>
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
          className={`mx-2 px-4 py-2 rounded ${
            pageNumber === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="ml-2 px-4 py-2 rounded bg-blue-500 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
