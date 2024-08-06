// components/features/token-pagination.js
"use client";

import { memo } from "react";

function TokenPagination({
  onPage,
  total = 0,
  loaded = 0,
  nextToken,
  content = "items",
}) {
  if (!total) return null;

  return (
    <div className="toolbox toolbox-pagination">
      <p className="show-info">
        Showing <span>{`1 - ${loaded} of ${total}`}</span> {content}
      </p>
      {!!nextToken && loaded < total && (
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link page-link-next"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPage();
              }}
            >
              Load More<i className="d-icon-arrow-right"></i>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default memo(TokenPagination);
