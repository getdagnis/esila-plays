import React from 'react';
import styles from './Sounds.module.css';
import { characters } from '../constants';

interface SoundsProps {
  onDrop: (characterId: number, sound: string) => void;
  onStop: (characterId: number) => void;
  activeCharacters: number[];
}

export default function Sounds({ onDrop, onStop, activeCharacters }: CharactersProps) {
  const handleDrop = (event: React.DragEvent, characterId: number) => {
    event.preventDefault();
    const sound = event.dataTransfer.getData('text/plain');
    if (sound) {
      onDrop(characterId, sound);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className={styles.characters}>
      {characters.map((character) => (
        <div
          key={character.id}
          className={`${styles.character} ${activeCharacters.includes(character.id) ? styles.active : ''}`}
          onDrop={(e) => handleDrop(e, character.id)}
          onDragOver={handleDragOver}
          onClick={() => onStop(character.id)}
        >
          <p>{character.name}</p>
        </div>
      ))}
    </div>
  );
}
