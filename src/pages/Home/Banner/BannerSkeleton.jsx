import React from 'react';
import Skeleton from '../../../components/Skeleton';
import Container from '../../../components/Shared/Container';

const BannerSkeleton = () => {
    return (
        <Container>
            <div className="relative w-full h-64 md:h-96 lg:h-[700px] rounded-2xl bg-neutral-200 dark:bg-neutral-800">
                <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-10 w-40 rounded-full" />
                </div>
            </div>
        </Container>
    );
};

export default BannerSkeleton;