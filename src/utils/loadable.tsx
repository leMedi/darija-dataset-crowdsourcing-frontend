import React, { lazy, ReactPropTypes, Suspense } from 'react';

type DynamicImportType = () => Promise<{ default: React.ComponentType<any>; }>;
const loadable = (importFunc: DynamicImportType, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);

  return (props: ReactPropTypes) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;