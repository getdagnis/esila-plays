import { SOUNDS } from '../constants';
import styles from './animations.module.css';

export const getColorBySoundName = (name: string): string | undefined => {
  const sound = SOUNDS.find((sound) => sound.name === name);
  const color = sound?.color;
  console.log('🍌🥕 color', color);
  return color;
};
