import React from 'react';
import CharacterItem from './CharacterItem';

function CharacterList({ characters, deleteCharacter, setEditingCharacter }) {
  return (
    <div className="container mx-auto mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((character) => (
        <CharacterItem
          key={character.id}
          character={character}
          deleteCharacter={deleteCharacter}
          setEditingCharacter={setEditingCharacter}
        />
      ))}
    </div>
  );
}

export default CharacterList;