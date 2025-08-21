import type { VideoManifest } from "$lib/types/video";

export function loadVideoManifests(): VideoManifest[] {
  // Finn alle manifest.{ts,js,json} under src/routes/video/**/
  const modules = import.meta.glob(
    "/src/routes/video/**/manifest.{ts,js,json}",
    { eager: true }
  );

  const out: VideoManifest[] = [];
  for (const path in modules) {
    const mod = modules[path] as any;
    const manifest: VideoManifest = (mod?.default ?? mod) as VideoManifest;
    if (manifest?.category && Array.isArray(manifest.items)) {
      out.push(manifest);
    }
  }

  // Stabil sortering (valgfritt)
  out.sort((a, b) => a.category.localeCompare(b.category));
  return out;
}
