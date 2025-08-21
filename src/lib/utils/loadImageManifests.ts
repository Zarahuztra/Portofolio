// src/lib/utils/loadImageManifests.ts
import type { MediaManifest } from "$lib/types/media";
export function loadImageManifests(): MediaManifest[] {
  const mods = import.meta.glob("/src/routes/bilder/**/manifest.{ts,js,json}", {
    eager: true,
  });
  const out: MediaManifest[] = [];
  for (const k in mods) {
    const m = (mods[k] as any).default ?? mods[k];
    if (m?.category && Array.isArray(m.items)) out.push(m);
  }
  return out.sort((a, b) => a.category.localeCompare(b.category));
}

// src/lib/utils/loadFeatureManifests.ts
import type { MediaManifest } from "$lib/types/media";
export function loadFeatureManifests(): MediaManifest[] {
  const mods = import.meta.glob(
    "/src/routes/frontend/**/manifest.{ts,js,json}",
    { eager: true }
  );
  const out: MediaManifest[] = [];
  for (const k in mods) {
    const m = (mods[k] as any).default ?? mods[k];
    if (m?.category && Array.isArray(m.items)) out.push(m);
  }
  return out.sort((a, b) => a.category.localeCompare(b.category));
}
