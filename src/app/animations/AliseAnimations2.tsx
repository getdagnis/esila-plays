'use client';
import React, { use, useEffect } from 'react';
import styles from './animations.module.css';

interface AliseAnimationsProps {
  animation: string;
  id: number;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
  onStop: (characterId: number) => void;
}

const AliseAnimations = ({ animation, id, onDrop, onDragOver, onStop }: AliseAnimationsProps) => {
  useEffect(() => {
    resetAll();
    let cleanup: (() => void) | null = null;

    switch (animation) {
      case 'normal':
        animateNormal();
        break;
      case 'beat':
        cleanup = animateBeat();
        break;
      default:
        break;
    }

    console.log('🍌🥕 use effect triggered');

    return () => {
      if (cleanup) cleanup();
    };
  }, [animation]);

  const combinedWrapperClasses = `${styles.animationWrapper} ${styles.grayscale} ${styles.animationWrapperBefore}`;

  return (
    <div
      key={id}
      id={`alise-animations`}
      className={combinedWrapperClasses}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => onStop(id)}
    >
      <img id="alise-teja" className={styles.partOnTop} src="/characters/alise/alise-teja.svg" alt="" />
      <img id="alise-kermenis" className={styles.partOnTop} src="/characters/alise/alise-kermenis.svg" alt="" />
      <img
        id="alise-galva-bez-mutes"
        className={styles.partOnTop}
        src="/characters/alise/alise-galva-bez-mutes.svg"
        alt=""
      />
      <img id="alise-mute-ciet" className={styles.partOnTop} src="/characters/alise/alise-mute-ciet.svg" alt="" />
      <img
        id="alise-acis-ciet"
        className={styles.partOnTop}
        src="/characters/alise/alise-acis-ciet.svg"
        style={{ display: 'block' }}
        alt=""
      />
      <img
        id="alise-kakis"
        className={styles.partOnTop}
        src="/characters/alise/alise-kakis.svg"
        style={{ display: 'none' }}
        alt=""
      />
      <img
        id="alise-mute-ciet"
        className={styles.partOnTop}
        src="/characters/alise/alise-mute-ciet.svg"
        style={{ display: 'none' }}
        alt=""
      />
    </div>
  );
};

export default AliseAnimations;

function resetAll() {
  const ids = [
    'alise-mute-ciet',
    'alise-galva-bez-mutes',
    'alise-acis-ciet',
    'alise-kermenis',
    'alise-kakis',
    'alise-teja',
  ];

  // Remove classes and inline styles
  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.className = ''; // Remove all dynamically applied classes
      element.classList.add(styles.partOnTop);
      element.style.animation = ''; // Reset inline styles
    }
  });

  // Clear any global timers
  while (timers.length) {
    clearTimeout(timers.pop());
  }
}

// Timer tracking
const timers: NodeJS.Timeout[] = [];

function animateNormal() {
  console.log('🍌🥕 normal');

  const eyes = document.getElementById('alise-acis-ciet');
  console.log('🍌🥕 eyes', eyes);
  if (!eyes) return () => {};
  eyes.style.display = 'block';

  // const intervalId = setInterval(() => {
  //   setTimeout(() => {
  //     eyes.style.display = 'none';
  //   }, 2800);
  // }, 3000);

  // return () => {
  //   clearInterval(intervalId);
  // };
}

function animateBeat() {
  console.log('🍌🥕 beat');
  const mouth = document.getElementById('alise-mute-ciet');
  const head = document.getElementById('alise-galva-bez-mutes');
  const eyes = document.getElementById('alise-acis-ciet');
  const wrapper = document.getElementById('alise-animations');

  if (!mouth || !head || !eyes || !wrapper) return () => {};

  eyes.style.display = 'block';
  eyes.style.opacity = '1';

  const intervalId = setInterval(() => {
    eyes.style.opacity = '0';
    setTimeout(() => {
      eyes.style.opacity = '1';
    }, 2800);
  }, 3000);

  wrapper.classList.add(styles.pulse);
  wrapper.classList.add(styles.animationActive);
  wrapper.classList.remove(styles.grayscale);

  setTimeout(() => {
    console.log('🍌🥕 mute', mouth);
    console.log('🍌🥕 galva', head);

    console.log('🍌🥕 applying infinite animation');
    mouth.classList.add(styles.beat);
    head.classList.add(styles.beat);
    eyes.classList.add(styles.beat);
  }, 3000);

  return () => {
    clearInterval(intervalId);
  };
}
