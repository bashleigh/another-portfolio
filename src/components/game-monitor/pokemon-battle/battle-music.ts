// 8-bit Pokemon Battle Theme using Web Audio API (no audio files needed!)

class BattleMusicManager {
  private audioContext: AudioContext | null = null
  private isPlaying: boolean = false
  private loopInterval: number | null = null
  private gainNode: GainNode | null = null
  private oscillators: OscillatorNode[] = []

  constructor() {
    // Don't create AudioContext in constructor - wait for user interaction
  }

  private initAudioContext() {
    try {
      // If context exists but is closed, create a new one
      if (this.audioContext && this.audioContext.state === "closed") {
        this.audioContext = null
      }
      
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        
        // Add error handler
        this.audioContext.addEventListener("statechange", () => {
          if (this.audioContext?.state === "interrupted" || this.audioContext?.state === "suspended") {
            this.audioContext.resume().catch(err => {
              console.warn("Failed to resume audio context:", err)
            })
          }
        })
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e)
      this.audioContext = null
    }
  }

  private async ensureAudioContext() {
    if (!this.audioContext || this.audioContext.state === "closed") {
      this.initAudioContext()
    }
    
    // Resume context if suspended (required by some browsers)
    if (this.audioContext?.state === "suspended") {
      try {
        await this.audioContext.resume()
      } catch (e) {
        console.warn("Failed to resume audio context:", e)
        // Try to recreate the context
        this.audioContext = null
        this.initAudioContext()
      }
    }
    
    // If context is in an error state, recreate it
    if (this.audioContext?.state === "interrupted") {
      try {
        await this.audioContext.resume()
      } catch (e) {
        console.warn("Audio context interrupted, recreating:", e)
        this.audioContext = null
        this.initAudioContext()
      }
    }
  }

  // Note frequencies for the melody (in Hz)
  private notes = {
    C2: 65.41,
    D2: 73.42,
    E2: 82.41,
    F2: 87.31,
    G2: 98.0,
    A2: 110.0,
    B2: 123.47,
    C3: 130.81,
    D3: 146.83,
    E3: 164.81,
    F3: 174.61,
    G3: 196.0,
    A3: 220.0,
    B3: 246.94,
    C4: 261.63,
    "C#4": 277.18,
    D4: 293.66,
    "D#4": 311.13,
    E4: 329.63,
    F4: 349.23,
    "F#4": 369.99,
    G4: 392.0,
    "G#4": 415.30,
    A4: 440.0,
    "A#4": 466.16,
    B4: 493.88,
    C5: 523.25,
    "C#5": 554.37,
    D5: 587.33,
    "D#5": 622.25,
    E5: 659.25,
    F5: 698.46,
    "F#5": 739.99,
    G5: 783.99,
    "G#5": 830.61,
    A5: 880.0,
    "A#5": 932.33,
    B5: 987.77,
  }

  // Play a note with square wave (8-bit style)
  private playNote(
    frequency: number,
    startTime: number,
    duration: number,
    volume: number = 0.3,
    type: OscillatorType = "square"
  ) {
    if (!this.audioContext || !this.gainNode || this.audioContext.state === "closed") return

    try {
      const oscillator = this.audioContext.createOscillator()
      const noteGain = this.audioContext.createGain()

      oscillator.connect(noteGain)
      noteGain.connect(this.gainNode)

      oscillator.type = type
      oscillator.frequency.setValueAtTime(frequency, startTime)

      // Envelope: quick attack, sustain, quick release
      noteGain.gain.setValueAtTime(0, startTime)
      noteGain.gain.linearRampToValueAtTime(volume, startTime + 0.01)
      noteGain.gain.setValueAtTime(volume, startTime + duration - 0.05)
      noteGain.gain.linearRampToValueAtTime(0, startTime + duration)

      oscillator.start(startTime)
      oscillator.stop(startTime + duration)

      this.oscillators.push(oscillator)
    } catch (e) {
      console.warn("Error playing note:", e)
    }
  }

  // Play a drum/kick sound
  private playKick(startTime: number) {
    if (!this.audioContext || !this.gainNode || this.audioContext.state === "closed") return

    try {
      const oscillator = this.audioContext.createOscillator()
      const kickGain = this.audioContext.createGain()

      oscillator.connect(kickGain)
      kickGain.connect(this.gainNode)

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(60, startTime)
      oscillator.frequency.exponentialRampToValueAtTime(30, startTime + 0.1)

      kickGain.gain.setValueAtTime(0.5, startTime) // Louder kick
      kickGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.1)

      this.oscillators.push(oscillator)
    } catch (e) {
      console.warn("Error playing kick:", e)
    }
  }

  // Play a snare/hihat sound
  private playSnare(startTime: number) {
    if (!this.audioContext || !this.gainNode || this.audioContext.state === "closed") return

    try {
      const noise = this.audioContext.createBufferSource()
      const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate)
      const data = buffer.getChannelData(0)

      // Generate white noise
      for (let i = 0; i < buffer.length; i++) {
        data[i] = Math.random() * 2 - 1
      }

      noise.buffer = buffer

      const snareGain = this.audioContext.createGain()
      noise.connect(snareGain)
      snareGain.connect(this.gainNode)

      snareGain.gain.setValueAtTime(0.4, startTime) // Louder snare
      snareGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1)

      noise.start(startTime)
      noise.stop(startTime + 0.1)
    } catch (e) {
      console.warn("Error playing snare:", e)
    }
  }

  // Play one loop of the battle theme
  private playLoop() {
    if (!this.audioContext || this.audioContext.state === "closed") {
      return
    }

    // Ensure context is running
    if (this.audioContext.state === "suspended" || this.audioContext.state === "interrupted") {
      this.audioContext.resume().catch(err => {
        console.warn("Failed to resume audio context in playLoop:", err)
      })
    }

    const now = this.audioContext.currentTime
    const tempo = 150 // Classic Pokemon battle tempo
    const beatDuration = 60 / tempo

    // Clear old oscillators
    this.oscillators = []

    // Create master gain node for volume control
    if (!this.gainNode) {
      this.gainNode = this.audioContext.createGain()
      this.gainNode.gain.setValueAtTime(0.4, now) // Overall volume
      this.gainNode.connect(this.audioContext.destination)
    }

    // Classic Pokemon Battle Theme with Flight of the Bumblebee-style chromatic runs
    // Main melody (the iconic E-E-E-C-E-G-G pattern)
    const melody = [
      // Phrase 1 - Slower, more deliberate
      { note: this.notes.E4, time: 0, dur: beatDuration * 0.5 },
      { note: this.notes.E4, time: beatDuration * 0.5, dur: beatDuration * 0.5 },
      { note: this.notes.E4, time: beatDuration * 1, dur: beatDuration * 0.5 },
      { note: this.notes.C4, time: beatDuration * 1.5, dur: beatDuration * 0.5 },
      { note: this.notes.E4, time: beatDuration * 2, dur: beatDuration * 1 },
      { note: this.notes.G4, time: beatDuration * 3, dur: beatDuration * 2 },
      { note: this.notes.G4, time: beatDuration * 5, dur: beatDuration * 2 },
      // Phrase 2 - Still slower
      { note: this.notes.C5, time: beatDuration * 7, dur: beatDuration * 1.5 },
      { note: this.notes.G4, time: beatDuration * 8.5, dur: beatDuration * 1.5 },
      { note: this.notes.E4, time: beatDuration * 10, dur: beatDuration * 1 },
      { note: this.notes.A4, time: beatDuration * 11, dur: beatDuration * 1 },
      { note: this.notes.B4, time: beatDuration * 12, dur: beatDuration * 1 },
      { note: this.notes.A4, time: beatDuration * 13, dur: beatDuration * 2 },
      // Phrase 3 - FAST CHROMATIC RUNS (Flight of the Bumblebee style!)
      { note: this.notes.G4, time: beatDuration * 15, dur: beatDuration * 0.25 },
      { note: this.notes["G#4"], time: beatDuration * 15.25, dur: beatDuration * 0.25 },
      { note: this.notes.A4, time: beatDuration * 15.5, dur: beatDuration * 0.25 },
      { note: this.notes["A#4"], time: beatDuration * 15.75, dur: beatDuration * 0.25 },
      { note: this.notes.B4, time: beatDuration * 16, dur: beatDuration * 0.25 },
      { note: this.notes.C5, time: beatDuration * 16.25, dur: beatDuration * 0.25 },
      { note: this.notes["C#5"], time: beatDuration * 16.5, dur: beatDuration * 0.25 },
      { note: this.notes.D5, time: beatDuration * 16.75, dur: beatDuration * 0.25 },
      { note: this.notes["D#5"], time: beatDuration * 17, dur: beatDuration * 0.25 },
      { note: this.notes.E5, time: beatDuration * 17.25, dur: beatDuration * 0.25 },
      { note: this.notes.F5, time: beatDuration * 17.5, dur: beatDuration * 0.25 },
      { note: this.notes["F#5"], time: beatDuration * 17.75, dur: beatDuration * 0.25 },
      { note: this.notes.G5, time: beatDuration * 18, dur: beatDuration * 0.5 },
      { note: this.notes.A5, time: beatDuration * 18.5, dur: beatDuration * 0.5 },
      // Descending chromatic run
      { note: this.notes.A5, time: beatDuration * 19, dur: beatDuration * 0.25 },
      { note: this.notes["G#5"], time: beatDuration * 19.25, dur: beatDuration * 0.25 },
      { note: this.notes.G5, time: beatDuration * 19.5, dur: beatDuration * 0.25 },
      { note: this.notes["F#5"], time: beatDuration * 19.75, dur: beatDuration * 0.25 },
      { note: this.notes.F5, time: beatDuration * 20, dur: beatDuration * 0.25 },
      { note: this.notes.E5, time: beatDuration * 20.25, dur: beatDuration * 0.25 },
      { note: this.notes["D#5"], time: beatDuration * 20.5, dur: beatDuration * 0.25 },
      { note: this.notes.D5, time: beatDuration * 20.75, dur: beatDuration * 0.25 },
      { note: this.notes.C5, time: beatDuration * 21, dur: beatDuration * 0.25 },
      { note: this.notes.B4, time: beatDuration * 21.25, dur: beatDuration * 0.25 },
      { note: this.notes.A4, time: beatDuration * 21.5, dur: beatDuration * 0.5 },
      // Phrase 4 (repeat opening - slower again)
      { note: this.notes.E4, time: beatDuration * 22, dur: beatDuration * 0.5 },
      { note: this.notes.E4, time: beatDuration * 22.5, dur: beatDuration * 0.5 },
      { note: this.notes.E4, time: beatDuration * 23, dur: beatDuration * 0.5 },
      { note: this.notes.C4, time: beatDuration * 23.5, dur: beatDuration * 0.5 },
      { note: this.notes.E4, time: beatDuration * 24, dur: beatDuration * 1 },
      { note: this.notes.G4, time: beatDuration * 25, dur: beatDuration * 2 },
      { note: this.notes.G4, time: beatDuration * 27, dur: beatDuration * 2 },
    ]

    melody.forEach(({ note, time, dur }) => {
      this.playNote(note, now + time, dur, 0.28, "square")
    })

    // Add a second layer with fast chromatic runs during the high energy section
    const chromaticLayer = [
      // Fast ascending run during phrase 3
      { note: this.notes.C4, time: beatDuration * 15, dur: beatDuration * 0.125 },
      { note: this.notes["C#4"], time: beatDuration * 15.125, dur: beatDuration * 0.125 },
      { note: this.notes.D4, time: beatDuration * 15.25, dur: beatDuration * 0.125 },
      { note: this.notes["D#4"], time: beatDuration * 15.375, dur: beatDuration * 0.125 },
      { note: this.notes.E4, time: beatDuration * 15.5, dur: beatDuration * 0.125 },
      { note: this.notes.F4, time: beatDuration * 15.625, dur: beatDuration * 0.125 },
      { note: this.notes["F#4"], time: beatDuration * 15.75, dur: beatDuration * 0.125 },
      { note: this.notes.G4, time: beatDuration * 15.875, dur: beatDuration * 0.125 },
      { note: this.notes["G#4"], time: beatDuration * 16, dur: beatDuration * 0.125 },
      { note: this.notes.A4, time: beatDuration * 16.125, dur: beatDuration * 0.125 },
      { note: this.notes["A#4"], time: beatDuration * 16.25, dur: beatDuration * 0.125 },
      { note: this.notes.B4, time: beatDuration * 16.375, dur: beatDuration * 0.125 },
      { note: this.notes.C5, time: beatDuration * 16.5, dur: beatDuration * 0.125 },
      { note: this.notes["C#5"], time: beatDuration * 16.625, dur: beatDuration * 0.125 },
      { note: this.notes.D5, time: beatDuration * 16.75, dur: beatDuration * 0.125 },
      { note: this.notes["D#5"], time: beatDuration * 16.875, dur: beatDuration * 0.125 },
      { note: this.notes.E5, time: beatDuration * 17, dur: beatDuration * 0.125 },
      { note: this.notes.F5, time: beatDuration * 17.125, dur: beatDuration * 0.125 },
      { note: this.notes["F#5"], time: beatDuration * 17.25, dur: beatDuration * 0.125 },
      { note: this.notes.G5, time: beatDuration * 17.375, dur: beatDuration * 0.125 },
    ]

    chromaticLayer.forEach(({ note, time, dur }) => {
      this.playNote(note, now + time, dur, 0.2, "square") // Slightly quieter layer
    })

    // Bass line - follows chord progression (C-C-G-G-A-A-E-A-D-G-C)
    const bass = [
      // Measure 1-2: C
      { note: this.notes.C3, time: 0, dur: beatDuration * 2 },
      { note: this.notes.C3, time: beatDuration * 2, dur: beatDuration * 2 },
      // Measure 3-4: G
      { note: this.notes.G3, time: beatDuration * 4, dur: beatDuration * 2 },
      { note: this.notes.G3, time: beatDuration * 6, dur: beatDuration * 2 },
      // Measure 5-6: A
      { note: this.notes.A3, time: beatDuration * 8, dur: beatDuration * 2 },
      { note: this.notes.A3, time: beatDuration * 10, dur: beatDuration * 2 },
      // Measure 7-8: E-A
      { note: this.notes.E3, time: beatDuration * 12, dur: beatDuration * 2 },
      { note: this.notes.A3, time: beatDuration * 14, dur: beatDuration * 2 },
      // Measure 9-10: D-G
      { note: this.notes.D3, time: beatDuration * 16, dur: beatDuration * 2 },
      { note: this.notes.G3, time: beatDuration * 18, dur: beatDuration * 2 },
      // Measure 11-12: C
      { note: this.notes.C3, time: beatDuration * 20, dur: beatDuration * 2 },
      { note: this.notes.C3, time: beatDuration * 22, dur: beatDuration * 2 },
      // Measure 13-14: G
      { note: this.notes.G3, time: beatDuration * 24, dur: beatDuration * 2 },
      { note: this.notes.G3, time: beatDuration * 26, dur: beatDuration * 2 },
    ]

    bass.forEach(({ note, time, dur }) => {
      this.playNote(note, now + time, dur, 0.32, "square")
    })

    // Drums - classic pattern: kick on 1 and 3, snare on 2 and 4
    // More intense during the chromatic section
    for (let i = 0; i < 29; i++) {
      // Kick on every beat
      this.playKick(now + i * beatDuration)
      // Snare on off-beats (2 and 4)
      if (i % 2 === 1) {
        this.playSnare(now + i * beatDuration)
      }
      // Extra snare hits during the fast chromatic section (Flight of the Bumblebee part)
      if (i >= 15 && i <= 21) {
        // More frequent snare during the intense section - add extra hits on even beats
        if (i % 2 === 0) {
          this.playSnare(now + i * beatDuration + beatDuration * 0.5)
        }
      }
    }
  }

  async start() {
    if (this.isPlaying) return
    
    await this.ensureAudioContext()
    if (!this.audioContext || this.audioContext.state === "closed") {
      console.warn("Cannot start music: AudioContext not available")
      return
    }

    this.isPlaying = true
    const loopDuration = (60 / 150) * 4 * 7.25 // Duration of one loop in seconds (7.25 measures at 150 BPM)

    // Play initial loop
    this.playLoop()

    // Set up looping
    this.loopInterval = window.setInterval(() => {
      if (this.isPlaying) {
        this.playLoop()
      }
    }, loopDuration * 1000)
  }

  stop() {
    this.isPlaying = false
    if (this.loopInterval) {
      clearInterval(this.loopInterval)
      this.loopInterval = null
    }

    // Stop all oscillators
    this.oscillators.forEach(osc => {
      try {
        osc.stop()
      } catch (e) {
        // Oscillator may already be stopped
      }
    })
    this.oscillators = []

    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(0, this.audioContext?.currentTime || 0)
    }
  }

  setVolume(volume: number) {
    if (this.gainNode && this.audioContext) {
      this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
    }
  }
}

// Export a singleton instance
export const battleMusicManager = new BattleMusicManager()

