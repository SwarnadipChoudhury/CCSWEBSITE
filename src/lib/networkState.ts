// Minimal shared mutable state connecting section-level hover interactions
// (currently: Domains) to the persistent 3D network background.
//
// Deliberately not React state — CCSNetwork reads this once per animation
// frame inside useFrame, so routing it through React state/context would
// trigger a re-render on every hover for no benefit.

let activeDomainIndex: number | null = null;

export function setActiveDomain(index: number | null) {
  activeDomainIndex = index;
}

export function getActiveDomain(): number | null {
  return activeDomainIndex;
}
