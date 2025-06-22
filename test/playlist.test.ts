import { Track } from '../src/track';
import { Playlist } from '../src/playlist';

describe('Playlist', () => {
  const track1 = new Track('Canción 1', 'Artista 1', '/1.mp3', 180);
  const track2 = new Track('Canción 2', 'Artista 2', '/2.mp3', 200);

  let playlist: Playlist;

  beforeEach(() => {
    playlist = new Playlist([track1, track2]);
  });

  test('debería obtener la canción actual', () => {
    expect(playlist.getCurrentTrack()).toBe(track1);
  });

  test('debería avanzar a la siguiente canción', () => {
    playlist.next();
    expect(playlist.getCurrentTrack()).toBe(track2);
  });

  test('debería retroceder a la canción anterior (con wrap)', () => {
    playlist.previous();
    expect(playlist.getCurrentTrack()).toBe(track2);
  });
});
