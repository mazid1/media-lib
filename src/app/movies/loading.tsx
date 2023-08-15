import React from "react";

function PaginatorSkeleton() {
  return (
    <div className="join">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <button
            className={"join-item btn btn-primary btn-sm md:btn-md disabled"}
            key={i}
            disabled
          >
            {i + 1}
          </button>
        ))}
      <button
        className="join-item btn btn-primary btn-sm md:btn-md disabled"
        disabled
      >
        &gt;&gt;
      </button>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex flex-col m-6 gap-6">
      <div className="flex justify-center">
        <PaginatorSkeleton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {Array(20)
          .fill(0)
          .map((_, idx: number) => (
            <div key={idx} className="card shadow-xl bg-base-200 max-w-[342px]">
              <svg
                className="max-w-[342px] max-h-[513px] text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
              <div className="p-4 flex flex-col gap-2">
                <div className="h-2.5 bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-700 w-28 mb-2.5"></div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        <PaginatorSkeleton />
      </div>
    </div>
  );
}

export default Loading;
