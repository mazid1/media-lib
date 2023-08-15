import React from "react";

type PaginatorProps = {
  currentPage: number;
  totalPages: number | null | undefined;
  onPageSelect: (selectedPage: number) => void;
};

function Paginator({ currentPage, totalPages, onPageSelect }: PaginatorProps) {
  if (totalPages == null) return null;

  const firstVisiblePage = Math.max(1, currentPage - 2);
  const lastVisiblePage = Math.min(totalPages, currentPage + 2);
  const isVisibleFirstPage = firstVisiblePage === 1;
  const isVisibleLastPage = lastVisiblePage === totalPages;

  return (
    <div className="join">
      {!isVisibleFirstPage && (
        <button
          className="join-item btn btn-primary btn-sm md:btn-md"
          onClick={() => onPageSelect(1)}
        >
          &lt;&lt;
        </button>
      )}
      {Array(5)
        .fill(0)
        .map((_, i) => {
          const thisPage = i + firstVisiblePage;
          if (thisPage > totalPages) return null;
          return (
            <button
              className={
                "join-item btn btn-primary btn-sm md:btn-md" +
                (currentPage === thisPage ? " btn-active" : "")
              }
              key={thisPage}
              onClick={() => onPageSelect(thisPage)}
            >
              {thisPage}
            </button>
          );
        })}
      {!isVisibleLastPage && (
        <button
          className="join-item btn btn-primary btn-sm md:btn-md"
          onClick={() => onPageSelect(totalPages)}
        >
          &gt;&gt;
        </button>
      )}
    </div>
  );
}

export default Paginator;
