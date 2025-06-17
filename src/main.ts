import { Player } from './player';
import { Track } from './track';

const tracks: Track[] = [
  new Track('Canción 1', 'Artista A', 'assets/music/cancion1.mp3', 0),
  new Track('Canción 2', 'Artista B', 'assets/music/cancion2.mp3', 0),
  new Track('Canción 3', 'Artista C', 'assets/music/cancion3.mp3', 0),
];

const player = new Player(tracks);

// Controles de reproducción
document.getElementById('play')?.addEventListener('click', () => player.play());
document.getElementById('pause')?.addEventListener('click', () => player.pause());
document.getElementById('stop')?.addEventListener('click', () => player.stop());
document.getElementById('next')?.addEventListener('click', () => player.next());
document.getElementById('prev')?.addEventListener('click', () => player.prev());
document.getElementById('volume')?.addEventListener('input', (e) => {
  const input = e.target as HTMLInputElement;
  player.setVolume(parseFloat(input.value));
});

// Generar lista de reproducción en el HTML
const playlistContainer = document.getElementById('playlist');
if (playlistContainer) {
  const playlist = player.getPlaylist().getTracks();
  playlist.forEach((track, index) => {
    const btn = document.createElement('button');
    btn.textContent = `${track.title} - ${track.artist}`;
    btn.addEventListener('click', () => player.selectTrack(index));
    playlistContainer.appendChild(btn);
  });
}
