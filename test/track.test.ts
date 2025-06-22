import { Track } from '../src/track';

describe('Track', () => {
  it('debería crear una instancia de Track', () => {
    const track = new Track('Canción', 'Artista', '/path.mp3', 180);
    expect(track.title).toBe('Canción');
    expect(track.artist).toBe('Artista');
    expect(track.src).toBe('/path.mp3');
    expect(track.duration).toBe(180);
  });
});
