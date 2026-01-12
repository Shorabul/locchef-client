import React from 'react';
import Skeleton from '../../../components/Skeleton';
import Container from '../../../components/Shared/Container';
import ReviewCardSkeleton from '../ReviewCardSkeleton/ReviewCardSkeleton';

const MealDetailsSkeleton = () => {
    return (
        <Container>
            <div className="py-8">
                {/* --- Top Section: Image and Details Card --- */}
                <div className="flex flex-col lg:flex-row gap-8 rounded-3xl border border-gray-100 dark:border-neutral-800 overflow-hidden mb-12">

                    {/* Left Column: Image placeholder */}
                    <div className="lg:w-1/2 h-[300px] lg:h-[500px]">
                        <Skeleton className="w-full h-full rounded-3xl" />
                    </div>

                    {/* Right Column: Info placeholder */}
                    <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-center space-y-6">
                        <div>
                            <Skeleton className="h-10 w-3/4 mb-4 rounded-lg" /> {/* Title */}
                            <Skeleton className="h-5 w-1/3 rounded-md" /> {/* Chef Name */}
                        </div>

                        <Skeleton className="h-8 w-24 rounded-lg" /> {/* Price */}

                        {/* Info Grid (3 items) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-3">
                                    <Skeleton className="w-10 h-10 rounded-lg" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Ingredients */}
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-24" />
                            <div className="flex gap-2">
                                <Skeleton className="h-7 w-16 rounded-full" />
                                <Skeleton className="h-7 w-20 rounded-full" />
                                <Skeleton className="h-7 w-14 rounded-full" />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 mt-auto">
                            <Skeleton className="h-14 flex-1 rounded-xl" />
                            <Skeleton className="h-14 w-32 rounded-xl" />
                        </div>
                    </div>
                </div>

                {/* --- Bottom Section: Reviews --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Review Form Skeleton (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 space-y-4">
                            <Skeleton className="h-7 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <div className="flex justify-center py-2">
                                <Skeleton className="h-8 w-40" />
                            </div>
                            <Skeleton className="h-32 w-full rounded-xl" />
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                    </div>

                    {/* Review List Skeleton */}
                    <div className="lg:col-span-2 space-y-4">
                        <Skeleton className="h-8 w-48 mb-6" />
                        {/* Rendering 3 ReviewCard Skeletons */}
                        <ReviewCardSkeleton />
                        <ReviewCardSkeleton />
                        <ReviewCardSkeleton />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MealDetailsSkeleton;