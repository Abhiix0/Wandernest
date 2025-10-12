import { Suspense, lazy, ComponentType } from 'react';
import { LoadingSpinner } from './common/LoadingSpinner';

interface LazyRouteProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
}

export const LazyRoute = ({ component, fallback }: LazyRouteProps) => {
  const LazyComponent = lazy(component);

  return (
    <Suspense fallback={fallback || <LoadingSpinner size="lg" text="Loading..." />}>
      <LazyComponent />
    </Suspense>
  );
};
