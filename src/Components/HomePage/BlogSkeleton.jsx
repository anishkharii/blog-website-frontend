import React from 'react';

export const BlogSkeleton = () => {
  return (
    <div className="border border-white/50 rounded-lg shadow-md p-4 bg-[#060607] animate-pulse w-full h-68 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="h-6 bg-white/15 rounded mb-2"></div>
        <div className="flex flex-col">
          <div className="h-4 bg-white/15 rounded mb-2 w-1/2"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 white/15ay rounded-full"></div>
            <div className="h-4 bg-white/15 rounded w-1/6"></div>
          </div>
        </div>
        <div className="h-4 bg-white/15 rounded mt-2 w-full"></div>
        <div className="h-4 bg-white/15 rounded mt-2 w-5/6"></div>
        <div className="h-4 bg-white/15 rounded mt-2 w-4/6"></div>
      </div>
      <div className="h-6 bg-white/15 rounded mt-4 w-1/4"></div>
    </div>
  );
};
