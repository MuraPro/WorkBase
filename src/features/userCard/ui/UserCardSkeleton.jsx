import React from 'react';
import { Skeleton } from '@shared/ui/skeleton';

const UserCardSkeleton = () => (
  <div className="card mb-3">
    <div className="card-body d-flex align-items-center" style={{ gap: 16 }}>
      <Skeleton h={64} w={64} className="rounded-circle" />
      <div className="flex-grow-1">
        <Skeleton h={18} w="60%" className="mb-2" />
        <Skeleton h={14} w="40%" />
      </div>
    </div>
  </div>
);

export default UserCardSkeleton;
