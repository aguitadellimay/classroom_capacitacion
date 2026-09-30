// Web Audio API Synthesizer for cheerful, responsive, 100% reliable audio without external asset loading

class SoundController {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stopLabAmbient();
      this.stopSpeaking();
    }
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  // Play a short click/pop sound
  public playClick() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignore audio failure
    }
  }

  // Play a joyful success chime (C5 - E5 - G5 - C6)
  public playSuccess() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + idx * 0.08;
        const duration = 0.25;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {
      // Ignore
    }
  }

  // Gentle soft oops / try again sound
  public playError() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch {
      // Ignore
    }
  }

  // Fanfare for level completion
  public playLevelComplete() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Arpeggio chord progression: C, E, G, G#, A, C
      const melody = [
        { f: 523.25, t: 0, d: 0.12 },
        { f: 659.25, t: 0.12, d: 0.12 },
        { f: 783.99, t: 0.24, d: 0.12 },
        { f: 1046.5, t: 0.36, d: 0.35 },
      ];

      melody.forEach(({ f, t, d }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + t;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + d);
      });
    } catch {
      // Ignore
    }
  }

  // Magical sparkle sound for badges & stars
  public playStarSparkle() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const freqs = [784, 988, 1175, 1319, 1568];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + idx * 0.05;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.16);
      });
    } catch {
      // Ignore
    }
  }

  // Byte Aura Farming victory sound
  public playAuraVictory() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [
        { f: 523.25, t: 0, d: 0.12 },
        { f: 659.25, t: 0.08, d: 0.12 },
        { f: 783.99, t: 0.16, d: 0.14 },
        { f: 880.00, t: 0.24, d: 0.16 },
        { f: 1046.50, t: 0.32, d: 0.45 },
        { f: 1318.51, t: 0.40, d: 0.40 },
      ];

      notes.forEach(({ f, t, d }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + t;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + d);
      });
    } catch {
      // Ignore
    }
  }

  // Special Final Aura Fanfare for Graduation
  public playFinalAuraFanfare() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const fanfare = [
        { f: 523.25, t: 0, d: 0.14 },
        { f: 523.25, t: 0.14, d: 0.14 },
        { f: 523.25, t: 0.28, d: 0.14 },
        { f: 659.25, t: 0.42, d: 0.35 },
        { f: 587.33, t: 0.77, d: 0.14 },
        { f: 659.25, t: 0.91, d: 0.14 },
        { f: 783.99, t: 1.05, d: 0.60 },
        { f: 1046.50, t: 1.05, d: 0.70 },
      ];

      fanfare.forEach(({ f, t, d }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + t;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + d);
      });
    } catch {
      // Ignore
    }
  }

  // Chest discovery and opening chime (cheerful ascending glockenspiel)
  public playChestOpen() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98]; // D5, F#5, A5, D6, F#6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.36);
      });
    } catch {
      // Ignore
    }
  }

  // Secret / Easter Egg discovered sound (sparkling harp flourish)
  public playSecretFound() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const freqs = [659.25, 830.61, 987.77, 1318.51, 1661.22]; // E5, G#5, B5, E6, G#6
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch {
      // Ignore
    }
  }

  // Cute robot greeting chirp for Byte
  public playByteHello() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const beeps = [
        { f: 587.33, t: 0, d: 0.08 }, // D5
        { f: 880.0, t: 0.09, d: 0.12 }, // A5
      ];
      beeps.forEach(({ f, t, d }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + t;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + d);
      });
    } catch {
      // Ignore
    }
  }

  // Short cheerful blip when clicking on Byte
  public playByteClick() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(784, now);
      osc.frequency.exponentialRampToValueAtTime(1046, now + 0.09);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Ignore
    }
  }

  // Upbeat mini groove when Byte dances
  public playByteDance() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.11);
      });
    } catch {
      // Ignore
    }
  }

  // Gentle magical chime for Byte's hint
  public playByteHint() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [659.25, 880.0, 1174.66]; // E5, A5, D6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.09;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.23);
      });
    } catch {
      // Ignore
    }
  }

  // Celebratory little flourish for Byte
  public playByteCheer() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const melody = [523.25, 659.25, 783.99, 1046.5];
      melody.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.06;

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.19);
      });
    } catch {
      // Ignore
    }
  }

  // Play microscene alert sound (gentle cartoonish "uh-oh" / attention call)
  public playMicrosceneAlert() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Note 1: E5
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.16);

      // Note 2: C5 (soft descending caution)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(523.25, now + 0.12);
      gain2.gain.setValueAtTime(0.14, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.33);
    } catch {
      // Ignore
    }
  }

  // Microscene slide / transition sound
  public playMicrosceneTransition() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(392, now);
      osc.frequency.exponentialRampToValueAtTime(784, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Ignore
    }
  }

  // Microscene resolution sound (cheerful, resolving harmonic chord)
  public playMicrosceneMagic() {
    if (!this.soundEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + idx * 0.05;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch {
      // Ignore
    }
  }

  private ambientInterval: number | null = null;
  private currentAmbientTheme: string | null = null;

  // Stop ambient sound loop
  public stopLabAmbient() {
    if (this.ambientInterval !== null) {
      window.clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    this.currentAmbientTheme = null;
  }

  // Play peaceful, non-invasive world ambient sounds (synthesized gently via Web Audio)
  public playLabAmbient(theme: 'forest' | 'care' | 'fortress' | 'cables' | 'team' | 'portal' | 'final') {
    if (!this.soundEnabled) return;
    if (this.currentAmbientTheme === theme && this.ambientInterval !== null) return;

    this.stopLabAmbient();
    this.currentAmbientTheme = theme;

    const playThemeNotes = () => {
      if (!this.soundEnabled) {
        this.stopLabAmbient();
        return;
      }
      try {
        this.initCtx();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        if (theme === 'forest') {
          // Soft nature birds / wind chimes (gentle pentatonic)
          const notes = [587.33, 783.99, 880.0, 1046.5]; // D5, G5, A5, C6
          notes.forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + i * 0.28;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.035, start + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0005, start + 0.9);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 0.95);
          });
        } else if (theme === 'care') {
          // Calm adventure warm chords
          const chord = [392.0, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
          chord.forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + i * 0.15;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.03, start + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0005, start + 1.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 1.25);
          });
        } else if (theme === 'fortress') {
          // Smooth futuristic digital pulses
          const freqs = [440.0, 659.25, 880.0, 1318.5]; // A4, E5, A5, E6
          freqs.forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + i * 0.2;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.025, start + 0.06);
            gain.gain.exponentialRampToValueAtTime(0.0005, start + 0.8);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 0.85);
          });
        } else if (theme === 'cables') {
          // Subtle curious mystery pulse
          const freqs = [329.63, 493.88, 659.25]; // E4, B4, E5
          freqs.forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + i * 0.3;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.03, start + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0005, start + 1.0);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 1.05);
          });
        } else if (theme === 'team') {
          // Warm harmonic friendship arpeggio (C4 - E4 - G4 - A4 - C5)
          const freqs = [261.63, 329.63, 392.0, 440.0, 523.25];
          freqs.forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + i * 0.16;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.025, start + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0005, start + 1.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 1.25);
          });
        } else if (theme === 'portal') {
          // Shimmering digital stars
          const freqs = [784.0, 987.77, 1174.66, 1567.98]; // G5, B5, D6, G6
          freqs.forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + i * 0.12;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.025, start + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0005, start + 0.7);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 0.75);
          });
        } else if (theme === 'final') {
          // Epic gentle fanfare
          const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
          notes.forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + i * 0.18;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.035, start + 0.07);
            gain.gain.exponentialRampToValueAtTime(0.0005, start + 1.1);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 1.15);
          });
        }
      } catch {
        // Ignore audio failures
      }
    };

    // Play once right away
    playThemeNotes();
    // Then loop softly every 5 seconds
    this.ambientInterval = window.setInterval(playThemeNotes, 5200);
  }

  // Text-To-Speech helper for 1st / 2nd graders
  public speak(text: string) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Clean up emojis from speech
      const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95; // Slightly slower for primary kids
      utterance.pitch = 1.1; // Friendly tone
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore
    }
  }

  public stopSpeaking() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }
}

export const soundManager = new SoundController();
