import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'client') {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm">
        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mb-4"></div>
        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="w-full animate-pulse">
        {/* Hero Skeleton */}
        <div className="h-[60vh] w-full bg-gray-200"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-3 mt-8">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="space-y-6 pt-2">
              <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-32 w-full bg-gray-100 rounded border border-gray-200 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default 'card' type
  return (
    <div className="w-full bg-white animate-pulse">
      <div className="h-64 bg-gray-200 w-full mb-4"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
