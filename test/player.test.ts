import { Track } from '../src/track';
import { Player } from '../src/player';

describe('Player', () => {
  const track = new Track('Canción Test', 'Artista', '/fake.mp3', 180);
  let player: Player;

  beforeEach(() => {
    player = new Player([track]);
  });

  test('play() debería llamar a audio.play()', () => {
    const playSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());
    player.play();
    expect(playSpy).toHaveBeenCalled();
    playSpy.mockRestore();
  });

  test('pause() debería llamar a audio.pause()', () => {
    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause');
    player.pause();
    expect(pauseSpy).toHaveBeenCalled();
    pauseSpy.mockRestore();
  });

  test('setVolume() debería ajustar el volumen', () => {
    player.setVolume(0.5);
    expect((player as any).audio.volume).toBe(0.5);
  });
});
