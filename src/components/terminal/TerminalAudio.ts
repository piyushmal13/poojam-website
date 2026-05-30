/**
 * TerminalAudio.ts - Web Audio API Retro Sound Synthesizer
 * Synthesizes realistic mechanical keyboard clicks, mainframe humming, 
 * command error beeps, and success arpeggios purely in code.
 */

class TerminalAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private humOscillator: OscillatorNode | null = null;
  private humGain: GainNode | null = null;

  // Initialize browser AudioContext lazily on user gesture
  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    
    // Resume context if suspended (common browser restriction)
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    if (mute) {
      this.stopHum();
    } else {
      this.startHum();
    }
  }

  public getMutedStatus(): boolean {
    return this.isMuted;
  }

  /**
   * Synthesizes a realistic mechanical key switch click.
   * Utilizes a combination of high-pass filtered white noise
   * and a fast sine wave sweep to mimic the contact bounce & plastic snap.
   */
  public playKeyClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // --- 1. Tactile Snap (High Frequency Wave Sweep) ---
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();

    clickOsc.type = "sine";
    // Slightly randomize frequency to simulate variance in key pressure/position
    const baseFreq = 800 + Math.random() * 400;
    clickOsc.frequency.setValueAtTime(baseFreq, now);
    clickOsc.frequency.exponentialRampToValueAtTime(100 + Math.random() * 50, now + 0.04);

    clickGain.gain.setValueAtTime(0.04, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);

    // --- 2. Metal Contact Bounce (Short Noise Burst) ---
    // Create buffer for white noise
    const bufferSize = this.ctx.sampleRate * 0.02; // 20ms burst
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(1500, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.02, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    // Play both components
    clickOsc.start(now);
    clickOsc.stop(now + 0.05);

    noiseSource.start(now);
    noiseSource.stop(now + 0.02);
  }

  /**
   * Synthesizes a low 60Hz hum with minor harmonics to emulate electromagnetic
   * feedback from a cathode ray tube (CRT) monitor.
   */
  public startHum() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    if (this.humOscillator) return; // Hum is already active

    const now = this.ctx.currentTime;
    
    // Core low-frequency oscillator
    this.humOscillator = this.ctx.createOscillator();
    this.humGain = this.ctx.createGain();
    
    this.humOscillator.type = "triangle";
    this.humOscillator.frequency.setValueAtTime(55, now); // A1 note (~55Hz hum)

    // Filter to suppress high frequencies and make it a cozy background rumble
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(100, now);

    // Keep it extremely quiet so it remains atmospheric and non-disruptive
    this.humGain.gain.setValueAtTime(0.003, now);

    this.humOscillator.connect(filter);
    filter.connect(this.humGain);
    this.humGain.connect(this.ctx.destination);

    this.humOscillator.start(now);
  }

  public stopHum() {
    if (this.humOscillator) {
      try {
        this.humOscillator.stop();
      } catch (e) {}
      this.humOscillator.disconnect();
      this.humGain?.disconnect();
      
      this.humOscillator = null;
      this.humGain = null;
    }
  }

  /**
   * Play a standard short low-pitched retro error beep.
   */
  public playErrorBeep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.setValueAtTime(90, now + 0.08); // downward pitch step

    // Low-pass to smooth out the sawtooth edge
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.18);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  /**
   * Play a pleasant electronic arpeggio when a command completes successfully.
   */
  public playSuccessChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    const ctx = this.ctx;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + index * 0.07;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.025, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.18);
    });
  }

  /**
   * Play a boot sound sequence (ascending computer blip).
   */
  public playBootSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [220, 440, 880, 1760];
    const ctx = this.ctx;
    
    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + index * 0.09;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.03, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.3);
    });
  }
}

// Export a singleton instance of the sound engine
export const TerminalAudio = new TerminalAudioEngine();
