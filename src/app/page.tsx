'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Characters from './components/Characters';
import { soundFiles } from './constants';

export default function Home() {
  const [characterSounds, setCharacterSounds] = useState<{ [key: number]: HTMLAudioElement[] }>({});
  const isCharacterActive = (characterId: number) => {
    return characterSounds[characterId] && characterSounds[characterId].length > 0;
  };

  const handleSoundDrop = (characterId: number, sound: string) => {
    if (soundFiles[Number(sound)]) {
      const newAudio = new Audio(soundFiles[Number(sound)].path);
      newAudio.loop = true;
      newAudio.play();
      setCharacterSounds((prev) => {
        const updatedSounds = { ...prev };
        if (!updatedSounds[characterId]) {
          updatedSounds[characterId] = [];
        }
        updatedSounds[characterId].push(newAudio);
        return updatedSounds;
      });
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
  };

  const handleDragStart = (event: React.DragEvent, sound: string) => {
    event.dataTransfer.setData('text/plain', sound);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Alise's Soundboard 👾</h1>
        <Characters
          onDrop={handleSoundDrop}
          onStop={handleStopSound}
          activeCharacters={Object.keys(characterSounds)
            .filter((id) => characterSounds[+id]?.length > 0)
            .map(Number)}
        />
        <div className={styles.btns}>
          {soundFiles.map((sound) => (
            <a
              key={sound.id}
              className={styles.btnSound}
              data-swapy-item={sound.id}
              onDragStart={(e) => handleDragStart(e, sound.id.toString())}
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
