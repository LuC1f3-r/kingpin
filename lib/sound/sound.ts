'use client';

import { Howl } from 'howler';

let ambient: Howl | null = null;
const SOURCE =
  'https://cdn.pixabay.com/download/audio/2022/03/15/audio_de88e4ff1cd8b6a0ac1aedc6b0ec218f.mp3?filename=space-ambient-110249.mp3';

export function getAmbientSound() {
  if (typeof window === 'undefined') return null;
  if (!ambient) {
    ambient = new Howl({
      src: [SOURCE],
      loop: true,
      volume: 0.35,
      html5: true
    });
  }
  return ambient;
}

export function setAmbient(enabled: boolean) {
  const sound = getAmbientSound();
  if (!sound) return;
  if (enabled) {
    if (!sound.playing()) sound.play();
  } else {
    sound.pause();
  }
}
