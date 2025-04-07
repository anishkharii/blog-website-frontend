import React from 'react';

export const BlogSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-[500px] flex-col justify-between overflow-hidden rounded-2xl animate-pulse border border-border bg-primary p-5 shadow-md transition duration-300 hover:shadow-xl">
      <div>
        <div className="h-6 bg-secondary opacity-10 rounded mb-2"></div>
        <div className="flex flex-col">
          <div className="h-4 bg-secondary opacity-10 rounded mb-2 w-1/2"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-secondary opacity-10 rounded-full"></div>
            <div className="h-4 bg-secondary opacity-10 rounded w-1/6"></div>
          </div>
        </div>
        <div className="h-4 bg-secondary opacity-10 rounded mt-2 w-full"></div>
        <div className="h-4 bg-secondary opacity-10 rounded mt-2 w-5/6"></div>
        <div className="h-4 bg-secondary opacity-10 rounded mt-2 w-4/6"></div>
      </div>
      <div className="h-6 bg-secondary opacity-10 rounded mt-4 w-1/4"></div>
    </div>
  );
};
