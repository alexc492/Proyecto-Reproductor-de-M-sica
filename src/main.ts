import { Player } from './player';
import { Track } from './track';

async function loadTracks(): Promise<Track[]> {
  const res = await fetch('/api/tracks');
  const data = await res.json();
  console.log("Canciones cargadas:", data);
  return data.map((item: any) => new Track(item.title, item.artist, item.src, item.id));
}

loadTracks().then((tracks) => {
  console.log("Tracks en el reproductor:", tracks);
  const player = new Player(tracks);

  document.getElementById('play')?.addEventListener('click', () => player.play());
  document.getElementById('pause')?.addEventListener('click', () => player.pause());
  document.getElementById('stop')?.addEventListener('click', () => player.stop());
  document.getElementById('next')?.addEventListener('click', () => player.next());
  document.getElementById('prev')?.addEventListener('click', () => player.prev());
  document.getElementById('volume')?.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    player.setVolume(parseFloat(input.value));
  });

  const playlistContainer = document.getElementById('playlist');
  if (playlistContainer) {
    tracks.forEach((track, index) => {
      const btn = document.createElement('button');
      btn.textContent = `${track.title} - ${track.artist}`;
      btn.addEventListener('click', () => player.selectTrack(index));
      playlistContainer.appendChild(btn);
    });
  }
});
