import { Track } from './track';
import { Playlist } from './playlist';

export class Player {
  private audio: HTMLAudioElement = new Audio();
  private playlist: Playlist;

  constructor(tracks: Track[]) {
    this.playlist = new Playlist(tracks);
    const current = this.playlist.getCurrentTrack();
    if (current) this.audio.src = current.src;

    this.audio.addEventListener('ended', () => this.next());
  }

  play(): void {
    this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  next(): void {
    const nextTrack = this.playlist.next();
    if (nextTrack) {
      this.audio.src = nextTrack.src;
      this.play();
    }
  }

  prev(): void {
    const prevTrack = this.playlist.previous();
    if (prevTrack) {
      this.audio.src = prevTrack.src;
      this.play();
    }
  }

  setVolume(value: number): void {
    this.audio.volume = value;
  }

  mute(): void {
    this.audio.muted = !this.audio.muted;
  }

  seek(time: number): void {
    this.audio.currentTime = time;
  }

  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  getDuration(): number {
    return this.audio.duration;
  }

  getPlaylist(): Playlist {
    return this.playlist;
  }

  selectTrack(index: number): void {
    this.playlist.setCurrentIndex(index);
    const track = this.playlist.getCurrentTrack();
    if (track) {
      this.audio.src = track.src;
      this.play();
    }
  }
}
