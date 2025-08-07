// audio/index.js
const AudioManager = {
  bgMusic: new Audio("audio/music/bgMusic.mp3"),
  bgMusicTension: new Audio("audio/music/bgMusicTension.mp3"),
  bgMusicAlarm: new Audio("audio/music/bgMusicAlarm.mp3"),
  sounds: {
    pickup: new Audio("audio/sfx/pickup.mp3"),
    drop: new Audio("audio/sfx/drop.mp3"),
    bark: new Audio("audio/sfx/bark.mp3"),
    neighborAlert: new Audio("audio/sfx/neighborAlert.mp3"),
    gameOver: new Audio("audio/sfx/gameOver.mp3"),
  },

  init() {
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.5;
    this.bgMusicTension.loop = true;
    this.bgMusicTension.volume = 0;
    this.bgMusicAlarm.loop = true;
    this.bgMusicAlarm.volume = 0;
  },

  playSound(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  },

  startMusic() {
    this.bgMusic.play();
    this.bgMusicTension.play();
    this.bgMusicAlarm.play();
  },

  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  },

  toggleMute() {
    this.bgMusic.muted = !this.bgMusic.muted;
    for (let key in this.sounds) {
      this.sounds[key].muted = this.bgMusic.muted;
    }
  },

  setVolume(volume) {
    this.bgMusic.volume = volume;
    for (let key in this.sounds) {
      this.sounds[key].volume = volume;
    }
  },

  isMuted() {
    return this.bgMusic.muted;
  },

  fadeInTrack(track, targetVolume = 1, step = 0.05, interval = 100) {
    const fade = setInterval(() => {
      if (track.volume < targetVolume) {
        track.volume = Math.min(track.volume + step, targetVolume);
      } else {
        clearInterval(fade);
      }
    }, interval);
  },

  fadeOutTrack(track, step = 0.05, interval = 100) {
    const fade = setInterval(() => {
      if (track.volume > 0) {
        track.volume = Math.max(track.volume - step, 0);
      } else {
        track.pause();
        clearInterval(fade);
      }
    }, interval);
  }
};

export default AudioManager;