import { useCallback, useEffect, useRef, type ReactNode } from 'react';

import { Loader } from '../Loader/Loader';

type TInfiniteScrollProps = {
  children: ReactNode;
  hasNext?: boolean;
  isLoading: boolean;
  loadMore: () => void;
};

export const InfiniteScroll = ({
  children,
  hasNext,
  isLoading,
  loadMore
}: TInfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNext && !isLoading) {
        loadMore();
      }
    },
    [hasNext, isLoading, loadMore]
  );

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '100px',
      threshold: 0.5
    });

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <>
      {children}
      {hasNext && (
        <div
          ref={sentinelRef}
          className='h-1 invisible'
        />
      )}
      {isLoading && (
        <div className='flex justify-center py-8'>
          <Loader size='small' />
        </div>
      )}
    </>
  );
};
