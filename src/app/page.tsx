'use client';
import React, { useState } from 'react';
import { SOUNDS } from './constants';
import Characters from './components/Characters';
import styles from './page.module.css';
import soundStyles from './page.sounds.module.css';

export default function Home() {
  const [characterSounds, setCharacterSounds] = useState<{ [key: number]: HTMLAudioElement[] }>({});
  const [currentDraggedSound, setCurrentDraggedSound] = useState<string | null>(null); // For touch handling
  const [characterAnimations, setCharacterAnimations] = useState<{ [key: number]: string }>({});

  const isCharacterActive = (characterId: number) => {
    return characterSounds[characterId] && characterSounds[characterId].length > 0;
  };

  const handleSoundDrop = (characterId: number, sound: string) => {
    if (SOUNDS[Number(sound)]) {
      const newAudio = new Audio(SOUNDS[Number(sound)].path);
      newAudio.loop = true;

      setCharacterSounds((prev) => {
        const updatedSounds = { ...prev };

        // Stop currently playing sound for this character
        if (updatedSounds[characterId]) {
          updatedSounds[characterId].forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
          });
        }

        // Replace with the new sound
        updatedSounds[characterId] = [newAudio];

        return updatedSounds;
      });

      // Start the new sound
      newAudio.play();

      // Set the animation
      setCharacterAnimations((prev) => ({
        ...prev,
        [characterId]: SOUNDS[Number(sound)].name,
      }));
    }
  };

  const handleStopSound = (characterId: number) => {
    setCharacterSounds((prev) => {
      const updatedSounds = { ...prev };
      if (updatedSounds[characterId]) {
        updatedSounds[characterId].forEach((audio) => {
          audio.pause();
          audio.currentTime = 0;
        });
        updatedSounds[characterId] = [];
      }
      return updatedSounds;
    });
    setCharacterAnimations((prev) => ({
      ...prev,
      [characterId]: '',
    }));
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>,
    sound: string
  ) => {
    if ('dataTransfer' in event) {
      // Desktop drag-and-drop
      event.dataTransfer.setData('text/plain', sound);
    } else {
      // Mobile touch-and-hold
      setCurrentDraggedSound(sound);
    }
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.pageX, touch.pageY);
    const slotId = dropTarget?.getAttribute('data-swapy-slot');

    if (slotId && currentDraggedSound) {
      handleSoundDrop(Number(slotId), currentDraggedSound);
    }

    setCurrentDraggedSound(null); // Clear the dragged sound
  };

  return (
    <div className={styles.page} onTouchEnd={handleTouchEnd}>
      <main className={styles.main}>
        <h1>Alise&#39;s Soundboard 👾</h1>
        <Characters
          onDrop={handleSoundDrop}
          onStop={handleStopSound}
          activeCharacters={Object.keys(characterSounds)
            .filter((id) => isCharacterActive(+id))
            .map(Number)}
          animations={characterAnimations}
        />
        <div className={soundStyles.btns}>
          {SOUNDS.map((sound) => (
            <a
              key={sound.id}
              className={soundStyles.btnSound}
              data-swapy-item={sound.id}
              onDragStart={(e) => handleDragStart(e, sound.id.toString())}
              onTouchStart={(e) => handleDragStart(e, sound.id.toString())}
              style={{ backgroundColor: sound.color }}
              draggable
            >
              {sound.name}
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
