import "react";

export default function Pagination({
  prevPage,
  nextPage,
  page,
  totalPages,
}: any) {
  return (
    <div className="pagination">
      <button onClick={prevPage} disabled={page === 1}>
        Previous
      </button>
      <div>
        Page {page} of {totalPages}
      </div>
      <button onClick={nextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}
