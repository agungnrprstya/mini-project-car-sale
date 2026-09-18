import React from "react";

// Window halaman: 1 dan terakhir selalu tampil, sisanya sekitar halaman aktif.
function getPageItems(currentPage, totalPages) {
  if (!Number.isFinite(totalPages) || totalPages < 1) {
    return [];
  }

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const visible = [...new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items = [];
  visible.forEach((page, index) => {
    if (index > 0 && page - visible[index - 1] > 1) {
      items.push("gap");
    }
    items.push(page);
  });
  return items;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageItems = getPageItems(currentPage, totalPages);
  const controlClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-md border border-paper-line bg-white text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav aria-label="Pagination" className="flex w-full justify-center py-8">
      <ul className="flex items-center gap-1">
        <li>
          <button type="button" onClick={prevPage} disabled={currentPage <= 1} className={controlClass}>
            <span className="sr-only">Previous</span>
            <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>

        {pageItems.map((item, index) =>
          item === "gap" ? (
            <li key={`gap_${index}`} aria-hidden="true" className="px-1 text-ink-mute">
              &#8230;
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={currentPage === item ? "page" : undefined}
                className={`inline-flex h-11 min-w-11 items-center justify-center rounded-md border px-3 text-sm tabular-nums transition-colors duration-200 ${
                  currentPage === item
                    ? "border-ink bg-ink text-white"
                    : "border-paper-line bg-white text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {item}
              </button>
            </li>
          )
        )}

        <li>
          <button type="button" onClick={nextPage} disabled={currentPage >= totalPages} className={controlClass}>
            <span className="sr-only">Next</span>
            <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
