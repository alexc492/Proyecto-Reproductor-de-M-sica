import { Player } from './player.js';
import { Track } from './track.js';

async function loadTracks(): Promise<Track[]> {
  const res = await fetch('/api/tracks');
  const data = await res.json();
  console.log('Canciones cargadas:', data);
  return data.map(
    (item: any) => new Track(item.title, item.artist, item.src, item.duration),
  );
}

loadTracks().then((tracks) => {
  console.log('Tracks en el reproductor:', tracks);
  const player = new Player(tracks);

  document
    .getElementById('play')
    ?.addEventListener('click', () => player.play());
  document
    .getElementById('pause')
    ?.addEventListener('click', () => player.pause());
  document
    .getElementById('stop')
    ?.addEventListener('click', () => player.stop());
  document
    .getElementById('next')
    ?.addEventListener('click', () => player.next());
  document
    .getElementById('prev')
    ?.addEventListener('click', () => player.prev());
  document.getElementById('volume')?.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    player.setVolume(parseFloat(input.value));
  });

  const playlistContainer = document.getElementById('playlist');
  if (playlistContainer) {
    const buttons: HTMLButtonElement[] = [];

    tracks.forEach((track, index) => {
      const btn = document.createElement('button');
      btn.textContent = `${track.title} - ${track.artist}`;
      btn.addEventListener('click', () => {
        player.selectTrack(index);
        updateActiveTrack(index);
      });
      playlistContainer.appendChild(btn);
      buttons.push(btn);
    });

    function updateActiveTrack(activeIndex: number) {
      buttons.forEach((btn, i) => {
        if (i === activeIndex) {
          btn.classList.add('playing');
        } else {
          btn.classList.remove('playing');
        }
      });
    }

    // Actualizar visual al cambiar con next/prev
    const originalPlay = player.play.bind(player);
    player.play = () => {
      originalPlay();
      updateActiveTrack(player.getPlaylist().getCurrentIndex());
    };
  }

  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');

  // Formato mm:ss
  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  player['audio'].addEventListener('timeupdate', () => {
    if (currentTimeEl && durationEl) {
      currentTimeEl.textContent = formatTime(player.getCurrentTime());
      durationEl.textContent = formatTime(player.getDuration());
    }
  });

  const progressBar = document.getElementById(
    'progress-bar',
  ) as HTMLInputElement;

  player.onTimeUpdate(() => {
    if (progressBar) {
      progressBar.max = player.getDuration().toString();
      progressBar.value = player.getCurrentTime().toString();
    }
  });

  // Scrubbing: cuando el usuario cambia el valor de la barra
  progressBar?.addEventListener('input', () => {
    player.seek(parseFloat(progressBar.value));
  });
});
