import React from 'react';
import Skeleton from '../../../components/Skeleton';

const ReviewCardSkeleton = () => {
    return (
        <div className="p-5 rounded-2xl border border-gray-100 dark:border-neutral-700 flex flex-col sm:flex-row gap-4">
            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
            <div className="flex-grow space-y-3">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-7 w-12 rounded-lg" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    );
};

export default ReviewCardSkeleton;