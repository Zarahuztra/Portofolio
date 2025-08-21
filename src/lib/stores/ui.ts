import { writable } from 'svelte/store';

export const modalOpen = writable(false); // start lukket
export const modalSection = writable<'video' | 'bilder' | 'frontend' | 'tekst' | 'musikk'>('video');
