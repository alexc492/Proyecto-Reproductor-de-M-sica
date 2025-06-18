import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Sirve archivos estáticos
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/assets/music', express.static(path.join(__dirname, '..', 'music')));
app.use(express.static(path.join(__dirname, '..', 'public')));

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
      duration: 0 // lo pones en 0 si no conoces la duración de antemano
    }));

  res.json(tracks);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
