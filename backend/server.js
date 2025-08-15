const express = require('express');
const cors = require('cors');
const { characters } = require('./data/characters.json');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/characters', (req, res) => {
  res.json(characters);
});

app.post('/characters', (req, res) => {
  const { name, realName, universe } = req.body;
  if (!name || !realName || !universe) {
    return res.status(400).json({ error: 'Name, realName, and universe are required' });
  }
  const newCharacter = {
    id: Date.now(),
    name,
    realName,
    universe
  };
  characters.push(newCharacter);
  res.status(201).json(newCharacter);
});

app.get('/characters/:id', (req, res) => {
  const character = characters.find(c => c.id === parseInt(req.params.id));
  if (!character) {
    return res.status(404).json({ error: 'Character not found' });
  }
  res.json(character);
});


app.put('/characters/:id', (req, res) => {
  const { name, realName, universe } = req.body;
  const characterIndex = characters.findIndex(c => c.id === parseInt(req.params.id));
  if (characterIndex === -1) {
    return res.status(404).json({ error: 'Character not found' });
  }
  if (!name || !realName || !universe) {
    return res.status(400).json({ error: 'Name, realName, and universe are required' });
  }
  characters[characterIndex] = { id: parseInt(req.params.id), name, realName, universe };
  res.json(characters[characterIndex]);
});

app.delete('/characters/:id', (req, res) => {
  const characterIndex = characters.findIndex(c => c.id === parseInt(req.params.id));
  if (characterIndex === -1) {
    return res.status(404).json({ error: 'Character not found' });
  }
  const deletedCharacter = characters.splice(characterIndex, 1)[0];
  res.json(deletedCharacter);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});