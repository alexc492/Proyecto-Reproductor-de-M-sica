import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Sirve archivos estáticos desde /public
app.use(express.static('public'));

// Endpoint que devuelve la lista de canciones
app.get('/api/tracks', (req, res) => {
  const musicDir = path.join(__dirname, '../public/assets/music');
  const files = fs.readdirSync(musicDir);

  const tracks = files
    .filter(f => f.endsWith('.mp3'))
    .map((f, i) => ({
      id: i,
      title: path.parse(f).name,
      artist: 'Desconocido',
      src: `/assets/music/${f}`,
    }));

  res.json(tracks);
});

// Arranca el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
