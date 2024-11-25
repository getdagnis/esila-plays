'use client';
import React, { use, useEffect } from 'react';
import styles from './animations.module.css';
import { getColorBySoundName } from './helpers';

interface AliseAnimationsProps {
  animation: string;
  id: number;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
  onStop: (characterId: number) => void;
}

const AliseAnimations = ({ animation, id, onDrop, onDragOver, onStop }: AliseAnimationsProps) => {
  console.log('🎈🎈🎈 animation', animation);

  useEffect(() => {
    resetAll();
    let cleanup: (() => void) | null = null;

    switch (animation) {
      case 'normal':
        animateNormal();
        break;
      case 'beat':
        cleanup = animateBeat(animation);
        break;
      case 'beat3':
        cleanup = animateBeat3(animation);
        break;
      case 'choir':
        cleanup = animateChoir(animation);
        break;
      case 'goat':
        cleanup = animateGoat(animation);
        break;
      case 'laugh':
        cleanup = animateLaugh(animation);
        break;
      case 'cry':
        cleanup = animateCry(animation);
        break;
      case 'laugh2':
        cleanup = animateLaugh2(animation);
        break;
      case 'beat2':
        cleanup = animateBeat2(animation);
        break;
      case 'giggle':
        cleanup = animateGiggle(animation);
        break;
      case 'laugh3':
        cleanup = animateLaugh3(animation);
        break;
      case 'cow':
        cleanup = animateCow(animation);
        break;
      case 'horror':
        cleanup = animateHorror(animation);
        break;
      case 'monks':
        cleanup = animateMonks(animation);
        break;
      case 'applause':
        cleanup = animateApplause(animation);
        break;
      case 'christmas':
        cleanup = animateChristmas(animation);
        break;
      case 'trombone':
        cleanup = animateTrombone(animation);
        break;
      case 'violins':
        cleanup = animateViolins(animation);
        break;
      case 'polyphon':
        cleanup = animatePolyphon(animation);
        break;
      case 'guitar':
        cleanup = animateGuitar(animation);
        break;
      case 'drums1':
        cleanup = animateDrums1(animation);
        break;
      case 'drums2':
        cleanup = animateDrums2(animation);
        break;
      default:
        break;
    }

    console.log('🍌🥕 use effect triggered');

    return () => {
      if (cleanup) cleanup();
    };
  }, [animation]);

  const combinedWrapperClasses = `${styles.animationWrapper} ${styles.grayscale}`;

  return (
    <div
      key={id}
      id={`alise-animations`}
      className={combinedWrapperClasses}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => onStop(id)}
    >
      <div id="alise-background" className={styles.animationBackground}></div>
      <img id="alise-teja" className={`${styles.partOnTop}`} src="/characters/alise/alise-teja.svg" alt="" />
      <img id="alise-kermenis" className={styles.partOnTop} src="/characters/alise/alise-kermenis.svg" alt="" />
      <img
        id="alise-galva-bez-mutes"
        className={styles.partOnTop}
        src="/characters/alise/alise-galva-bez-mutes.svg"
        alt=""
      />
      <img
        id="alise-mute-vala"
        style={{ display: 'none' }}
        className={styles.partOnTop}
        src="/characters/alise/alise-mute-vala.svg"
        alt=""
      />
      <img id="alise-acis-ciet" className={styles.partOnTop} src="/characters/alise/alise-acis-ciet.svg" alt="" />
      <img
        id="alise-kakis"
        className={styles.partOnTop}
        src="/characters/alise/alise-kakis.svg"
        style={{ display: 'none' }}
        alt=""
      />
      <img id="alise-mute-ciet" className={`${styles.partOnTop}`} src="/characters/alise/alise-mute-ciet.svg" alt="" />
    </div>
  );
};

export default AliseAnimations;

// Timer tracking
const timers: NodeJS.Timeout[] = [];
const intervals: NodeJS.Timeout[] = [];

function resetAll() {
  const background = document.getElementById('alise-background');
  const wrapper = document.getElementById('alise-animations');
  const eyelids = document.getElementById('alise-acis-ciet');
  const tea = document.getElementById('alise-teja');
  const mouth = document.getElementById('alise-mute-ciet');

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
      element.className = '';
      element.classList.add(styles.partOnTop);
      element.style.animation = '';
    }
  });

  background?.classList.remove(styles.pulse);
  background?.classList.remove(styles.animationActive);
  background?.classList.add(styles.grayscale);
  wrapper?.classList.remove(styles.noGrayscale);
  wrapper?.classList.add(styles.grayscale);
  tea?.classList.remove(styles.drinkTea);
  mouth?.classList.remove(styles.moveMouth);
  eyelids?.classList.remove(styles.blink);

  // Clear any global timers
  while (timers.length) {
    clearTimeout(timers.pop());
  }

  while (intervals.length) {
    clearInterval(intervals.pop());
  }

  if (eyelids) {
    eyelids.style.display = 'block';
    eyelids.style.opacity = '1';
  }
}

export const animateBackground = (animation: string) => {
  const background = document.getElementById('alise-background');
  const wrapper = document.getElementById('alise-animations');
  const backgroundColor = getColorBySoundName(animation);
  if (!background) return () => {};

  wrapper?.classList.add(styles.noGrayscale);
  wrapper?.classList.remove(styles.grayscale);
  background.classList.add(styles.animationActive);
  background.classList.add(styles.pulse);
  background.style.backgroundColor = backgroundColor || '#aaaaaa';
};

const blinkEyes = (animation: string) => {
  const eyelids = document.getElementById('alise-acis-ciet');

  if (!eyelids) return () => {};

  if (animation === 'beat') {
    eyelids.classList.add(styles.blinkAndBeat);
    return;
  }

  if (animation === 'bea3') {
    eyelids.classList.add(styles.blinkAndBeat3);
    return;
  }

  eyelids.classList.add(styles.blink);
};

const drinkTea = (repeat: boolean = true) => {
  const tea = document.getElementById('alise-teja');
  const mouthOpen = document.getElementById('alise-mute-vala');

  if (!tea || !mouthOpen) return () => {};

  if (!repeat) {
    tea.classList.add(styles.drinkTea);
    mouthOpen.style.display = 'block';
    setTimeout(() => {
      tea.classList.remove(styles.drinkTea);
      mouthOpen.style.display = 'none';
    }, 2000);
    return () => {};
  }

  const intervalId = setInterval(() => {
    tea.classList.add(styles.drinkTea);
    mouthOpen.style.display = 'block';

    setTimeout(() => {
      tea.classList.remove(styles.drinkTea);
      mouthOpen.style.display = 'none';
    }, 5000);
  }, 20000);

  intervals.push(intervalId);

  return () => {
    clearInterval(intervalId);
  };
};

const moveMouth = () => {
  const mouth = document.getElementById('alise-mute-ciet');

  if (!mouth) return () => {};

  mouth.classList.add(styles.moveMouth);
};

const wakeUpCharacter = (animation: string) => {
  animateBackground(animation);
  blinkEyes(animation);
};

function animateNormal() {
  console.log('🍌🥕 normal');

  const eyelids = document.getElementById('alise-acis-ciet');
  console.log('🍌🥕 eyelids', eyelids);
  if (!eyelids) return () => {};
  eyelids.style.display = 'block';

  // const intervalId = setInterval(() => {
  //   setTimeout(() => {
  //     eyelids.style.display = 'none';
  //   }, 2800);
  // }, 3000);

  // return () => {
  //   clearInterval(intervalId);
  // };
}

function animateBeat(animation: string) {
  const mouth = document.getElementById('alise-mute-ciet');
  const head = document.getElementById('alise-galva-bez-mutes');
  const eyelids = document.getElementById('alise-acis-ciet');

  if (!mouth || !head || !eyelids) return () => {};

  wakeUpCharacter(animation);

  eyelids.style.display = 'block';

  setTimeout(() => {
    eyelids.style.opacity = '0';
  }, 2000);

  setTimeout(() => {
    blinkEyes();
    console.log('🍌🥕 applying infinite animation');
    mouth.classList.add(styles.beat);
    head.classList.add(styles.beat);
    eyelids.classList.add(styles.beat);
  }, 2000);
}

function animateBeat3(animation: string) {
  const mouth = document.getElementById('alise-mute-ciet');
  const head = document.getElementById('alise-galva-bez-mutes');
  const eyelids = document.getElementById('alise-acis-ciet');

  if (!mouth || !head || !eyelids) return () => {};

  wakeUpCharacter(animation);

  eyelids.style.display = 'block';

  setTimeout(() => {
    eyelids.style.opacity = '0';
  }, 2000);

  setTimeout(() => {
    console.log('🍌🥕 applying infinite animation');
    mouth.classList.add(styles.beat3);
    head.classList.add(styles.beat3);
    eyelids.classList.add(styles.beat3);
  }, 3000);
}

function animateChoir(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateGoat(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateLaugh(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateCry(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateLaugh2(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateBeat2(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateGiggle(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateLaugh3(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateCow(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateHorror(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateMonks(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateApplause(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateChristmas(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateTrombone(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateViolins(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animatePolyphon(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateGuitar(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateDrums1(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}

function animateDrums2(animation: string): () => void {
  wakeUpCharacter(animation);
  drinkTea();
  return () => {};
}
