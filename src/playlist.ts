import { Track } from './track.js';

export class Playlist {
  private tracks: Track[] = [];
  private currentIndex: number = 0;

  constructor(initialTracks: Track[] = []) {
    this.tracks = initialTracks;
  }

  addTrack(track: Track): void {
    this.tracks.push(track);
  }

  removeTrack(index: number): void {
    if (index >= 0 && index < this.tracks.length) {
      this.tracks.splice(index, 1);
      if (this.currentIndex >= this.tracks.length) {
        this.currentIndex = 0;
      }
    }
  }

  getTracks(): Track[] {
    return this.tracks;
  }

  getCurrentTrack(): Track | null {
    if (this.tracks.length === 0) return null;
    return this.tracks[this.currentIndex] || null;
  }

  getNextTrack(): Track | null {
    if (this.tracks.length === 0) return null;
    const nextIndex = (this.currentIndex + 1) % this.tracks.length;
    return this.tracks[nextIndex] || null;
  }

  getPreviousTrack(): Track | null {
    if (this.tracks.length === 0) return null;
    const prevIndex =
      (this.currentIndex - 1 + this.tracks.length) % this.tracks.length;
    return this.tracks[prevIndex] || null;
  }

  next(): Track | null {
    if (this.tracks.length === 0) return null;
    this.currentIndex = (this.currentIndex + 1) % this.tracks.length;
    return this.getCurrentTrack();
  }

  previous(): Track | null {
    if (this.tracks.length === 0) return null;
    this.currentIndex =
      (this.currentIndex - 1 + this.tracks.length) % this.tracks.length;
    return this.getCurrentTrack();
  }

  setCurrentIndex(index: number): void {
    if (index >= 0 && index < this.tracks.length) {
      this.currentIndex = index;
    }
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  clear(): void {
    this.tracks = [];
    this.currentIndex = 0;
  }
}
