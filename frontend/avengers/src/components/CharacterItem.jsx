import React from 'react';

function CharacterItem({ character, deleteCharacter, setEditingCharacter }) {
  const handleDelete = () => {
    const isConfirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer ${character.name} ?`);
    if (isConfirmed) {
      deleteCharacter(character.id);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
    
      <h3 className="text-lg font-semibold flex justify-center">{character.name}</h3>
      <p className="text-gray-600 flex justify-center">Real Name: {character.realName || 'Unknown'}</p>
      <p className="text-gray-600 flex justify-center">Universe: {character.universe || 'Unknown'}</p>
  
      <div className="mt-4 space-x-3 flex justify-center">
        <button
          onClick={() => setEditingCharacter(character)}
          className="bg-green-400 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CharacterItem;