import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import CharacterForm from './components/CharacterForm';
import CharacterList from './components/CharactereList'

function App() {
  const [characters, setCharacters] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/characters')
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);

  const addCharacter = (character) => {
    axios.post('http://localhost:3000/characters', character)
      .then((response) => {
        setCharacters([...characters, response.data]);
        
        setEditingCharacter(null); 
      })
      .catch((error) => console.error('Error adding character:', error));
  };

  const updateCharacter = (updatedCharacter) => {
    axios.put(`http://localhost:3000/characters/${updatedCharacter.id}`, updatedCharacter)
      .then((response) => {
        setCharacters(
          characters.map((character) =>
            character.id === updatedCharacter.id ? response.data : character
          )
        );
        setEditingCharacter(null);
      })
      .catch((error) => console.error('Error updating character:', error));
  };

  const deleteCharacter = (id) => {
    axios.delete(`http://localhost:3000/characters/${id}`)
      .then(() => {
        setCharacters(characters.filter((character) => character.id !== id));
      })
      .catch((error) => console.error('Error deleting character:', error));
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container mx-auto p-4">
        <CharacterForm
          addCharacter={addCharacter}
          editingCharacter={editingCharacter}
          updateCharacter={updateCharacter}
          setEditingCharacter={setEditingCharacter}
        />
        <CharacterList
          characters={characters}
          deleteCharacter={deleteCharacter}
          setEditingCharacter={setEditingCharacter}
        />
      </div>
    </div>
  );
}

export default App;