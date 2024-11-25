import React from 'react';
import styles from './Characters.module.css';
import { CHARACTERS } from '../constants';

interface CharactersProps {
  onDrop: (characterId: number, sound: string) => void;
  onStop: (characterId: number) => void;
  activeCharacters: number[];
  animations: string[];
}

export default function Characters({ onDrop, onStop, activeCharacters, animations }: CharactersProps) {
  console.log('🍌🥕 animations', animations);
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
      {CHARACTERS.map((character) => {
        const AnimationComponent = character.anim; // Dynamically get the correct animation component
        return (
          <div key={character.id}>
            {AnimationComponent ? (
              <AnimationComponent
                id={character.id}
                animation={animations[character.id] || 'normal'}
                onDrop={(e) => handleDrop(e, character.id)}
                onDragOver={handleDragOver}
                onStop={onStop}
              />
            ) : (
              <div
                key={character.id}
                className={`${styles.character} ${activeCharacters.includes(character.id) ? styles.active : ''}`}
                onDrop={(e) => handleDrop(e, character.id)}
                onDragOver={handleDragOver}
                onClick={() => onStop(character.id)}
              >
                <p>{character.name}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
