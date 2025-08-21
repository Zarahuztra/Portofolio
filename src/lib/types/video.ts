export type VideoItem = {
  src: string; // URL til .mp4 (helst under /static/video/<kategori>/)
  title?: string;
  poster?: string; // valgfri thumbnail
  loop?: boolean;
  muted?: boolean;
};

export type VideoManifest = {
  category: string; // f.eks. "Nature"
  items: VideoItem[];
};
