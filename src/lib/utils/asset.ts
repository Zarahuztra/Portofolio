// src/lib/utils/asset.ts
import { base } from '$app/paths';

export const asset = (p: string) => `${base}/${p.replace(/^\/+/, '')}`;
