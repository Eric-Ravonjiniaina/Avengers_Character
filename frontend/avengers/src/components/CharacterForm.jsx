import React, { useState, useEffect } from 'react';

function CharacterForm({ addCharacter, editingCharacter, updateCharacter, setEditingCharacter }) {
  const [name, setName] = useState(editingCharacter ? editingCharacter.name : '');
  const [realName, setRealName] = useState(editingCharacter ? editingCharacter.realName : '');
  const [universe, setUniverse] = useState(editingCharacter ? editingCharacter.universe : '');

  useEffect(() => {
    if (editingCharacter) {
      setName(editingCharacter.name);
      setRealName(editingCharacter.realName);
      setUniverse(editingCharacter.universe);
    } else {
      setName('');
      setRealName('');
      setUniverse('');
    }
  }, [editingCharacter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !realName || !universe) return;

    if (editingCharacter) {
      updateCharacter({ id: editingCharacter.id, name, realName, universe });
    } else {
      addCharacter({ name, realName, universe });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{editingCharacter ? 'Edit Character' : 'Add Character'}</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Character Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Real Name"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Universe"
          value={universe}
          onChange={(e) => setUniverse(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editingCharacter ? 'Update Character' : 'Add Character'}
        </button>
        {editingCharacter && (
          <button
            onClick={() => setEditingCharacter(null)}
            className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
export default CharacterForm;