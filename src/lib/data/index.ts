export const videoCategories = [
  "Nature",
  "Face",
  "Figure",
  "Food",
  "Drive",
  "Texture",
  "Other",
] as const;
export const imageCategories = [
  "products",
  "logo",
  "tekstur",
  "miniatyr",
  "landskap",
  "bygninger",
  "fartøy",
  "karakterdesign",
  "spilledesign",
  "creatures",
  "kunst",
  "underholdning",
  "webdesign",
] as const;

export type FrontendDemo = { file: string; desc: string; interactive: boolean };

export const frontendDemos: FrontendDemo[] = [
  // fylles senere – vi filtrerer på interactive=true/false
];

export const projects = [
  "bwgames",
  "craftsvilla",
  "framerate",
  "dzstreetwear",
  "neptune",
  "flyhigh?",
  "oldcar",
];
export const miniProjects = [
  "herotextimage",
  "elegant",
  "spin",
  "tear1",
  "drumkit",
];
export const tracks = [
  "Prometheus",
  "Torn strings",
  "Urdu-låt",
  "Eksperimentell elektronisk",
  "Whispers of the rain",
];
export const roles = [
  "Tekstforfatter",
  "Korrekturleser",
  "Oversetter",
  "Lokalisering",
  "Team-leder",
  "Country manager",
  "Musikkjournalist",
  "Webredaktør",
  "IT-journalist",
  "SEO",
  "Tekstanalyse",
  "Research",
];
