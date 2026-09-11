import { Suspense, lazy, useEffect, useState } from 'react';
import NetworkFallback from '@/components/NetworkFallback';

// The full CCS network (Three.js + react-three-fiber) is a meaningful
// download and a real GPU/battery cost, so it's only ever requested on
// tablet/desktop viewports. The dynamic import below only executes once
// this component actually renders it, so phones never fetch the chunk.
const CCSNetwork = lazy(() => import('@/components/CCSNetwork'));

export default function NetworkBackground() {
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setEnable3D(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {enable3D ? (
        <Suspense fallback={<NetworkFallback />}>
          <CCSNetwork />
        </Suspense>
      ) : (
        <NetworkFallback />
      )}
    </div>
  );
}
