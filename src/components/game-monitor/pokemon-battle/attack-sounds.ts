// Sound effect generator for attack abilities using Web Audio API

class AttackSoundManager {
  private audioContext: AudioContext | null = null

  private initAudioContext() {
    try {
      if (this.audioContext && this.audioContext.state === "closed") {
        this.audioContext = null
      }
      
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
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
    
    if (this.audioContext?.state === "suspended") {
      try {
        await this.audioContext.resume()
      } catch (e) {
        console.warn("Failed to resume audio context:", e)
        this.audioContext = null
        this.initAudioContext()
      }
    }
  }

  // Play a sound effect based on parameters
  private playSound(
    frequency: number,
    duration: number,
    type: OscillatorType = "square",
    volume: number = 0.3,
    frequencyEnvelope?: { start: number; end: number }
  ) {
    if (!this.audioContext || this.audioContext.state === "closed") return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.type = type
      
      if (frequencyEnvelope) {
        oscillator.frequency.setValueAtTime(frequencyEnvelope.start, this.audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(
          frequencyEnvelope.end,
          this.audioContext.currentTime + duration
        )
      } else {
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
      }

      // Envelope: quick attack, sustain, quick release
      const now = this.audioContext.currentTime
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(volume, now + 0.01)
      gainNode.gain.setValueAtTime(volume, now + duration - 0.05)
      gainNode.gain.linearRampToValueAtTime(0, now + duration)

      oscillator.start(now)
      oscillator.stop(now + duration)
    } catch (e) {
      console.warn("Error playing sound:", e)
    }
  }

  // Play a multi-tone sound (chord or sequence)
  private playMultiTone(
    frequencies: number[],
    duration: number,
    type: OscillatorType = "square",
    volume: number = 0.2,
    simultaneous: boolean = false
  ) {
    if (simultaneous) {
      // Play all frequencies at once (chord)
      frequencies.forEach((freq) => {
        this.playSound(freq, duration, type, volume)
      })
    } else {
      // Play in sequence
      frequencies.forEach((freq, index) => {
        const delay = index * 0.05
        this.playSound(freq, duration - delay, type, volume)
      })
    }
  }

  // Play "Steve" sound using formants to approximate speech
  private playSteveSound(intensity: "normal" | "loud" | "soft" | "excited" = "normal") {
    if (!this.audioContext || this.audioContext.state === "closed") return

    const now = this.audioContext.currentTime
    const baseVolume = intensity === "loud" ? 0.4 : intensity === "soft" ? 0.25 : intensity === "excited" ? 0.35 : 0.3
    const duration = intensity === "excited" ? 0.3 : intensity === "soft" ? 0.12 : 0.2

    try {
      // "S" sound - high frequency noise
      const sOsc = this.audioContext.createOscillator()
      const sGain = this.audioContext.createGain()
      sOsc.connect(sGain)
      sGain.connect(this.audioContext.destination)
      sOsc.type = "square"
      sOsc.frequency.setValueAtTime(800, now)
      sGain.gain.setValueAtTime(0, now)
      sGain.gain.linearRampToValueAtTime(baseVolume * 0.3, now + 0.02)
      sGain.gain.setValueAtTime(baseVolume * 0.3, now + 0.05)
      sGain.gain.linearRampToValueAtTime(0, now + 0.05)
      sOsc.start(now)
      sOsc.stop(now + 0.05)

      // "T" sound - quick burst
      const tOsc = this.audioContext.createOscillator()
      const tGain = this.audioContext.createGain()
      tOsc.connect(tGain)
      tGain.connect(this.audioContext.destination)
      tOsc.type = "square"
      tOsc.frequency.setValueAtTime(400, now + 0.05)
      tGain.gain.setValueAtTime(0, now + 0.05)
      tGain.gain.linearRampToValueAtTime(baseVolume * 0.5, now + 0.06)
      tGain.gain.linearRampToValueAtTime(0, now + 0.07)
      tOsc.start(now + 0.05)
      tOsc.stop(now + 0.07)

      // "E" vowel - formant frequencies (first E)
      // Formant 1: ~500Hz, Formant 2: ~1700Hz, Formant 3: ~2500Hz
      const e1Formants = [500, 1700, 2500]
      e1Formants.forEach((freq, idx) => {
        const osc = this.audioContext!.createOscillator()
        const gain = this.audioContext!.createGain()
        osc.connect(gain)
        gain.connect(this.audioContext!.destination)
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, now + 0.07)
        const vol = baseVolume * (idx === 0 ? 0.6 : idx === 1 ? 0.4 : 0.2)
        gain.gain.setValueAtTime(0, now + 0.07)
        gain.gain.linearRampToValueAtTime(vol, now + 0.09)
        gain.gain.setValueAtTime(vol, now + 0.12)
        gain.gain.linearRampToValueAtTime(0, now + 0.14)
        osc.start(now + 0.07)
        osc.stop(now + 0.14)
      })

      // "V" sound - voiced fricative
      const vOsc = this.audioContext.createOscillator()
      const vGain = this.audioContext.createGain()
      vOsc.connect(vGain)
      vGain.connect(this.audioContext.destination)
      vOsc.type = "sawtooth"
      vOsc.frequency.setValueAtTime(200, now + 0.12)
      vGain.gain.setValueAtTime(0, now + 0.12)
      vGain.gain.linearRampToValueAtTime(baseVolume * 0.4, now + 0.13)
      vGain.gain.setValueAtTime(baseVolume * 0.4, now + 0.15)
      vGain.gain.linearRampToValueAtTime(0, now + 0.16)
      vOsc.start(now + 0.12)
      vOsc.stop(now + 0.16)

      // Final "E" vowel
      const e2Formants = [500, 1700, 2500]
      e2Formants.forEach((freq, idx) => {
        const osc = this.audioContext!.createOscillator()
        const gain = this.audioContext!.createGain()
        osc.connect(gain)
        gain.connect(this.audioContext!.destination)
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, now + 0.15)
        const vol = baseVolume * (idx === 0 ? 0.6 : idx === 1 ? 0.4 : 0.2)
        gain.gain.setValueAtTime(0, now + 0.15)
        gain.gain.linearRampToValueAtTime(vol, now + 0.17)
        gain.gain.setValueAtTime(vol, now + duration - 0.05)
        gain.gain.linearRampToValueAtTime(0, now + duration)
        osc.start(now + 0.15)
        osc.stop(now + duration)
      })

      // For excited version, add extra emphasis
      if (intensity === "excited") {
        const excitedOsc = this.audioContext.createOscillator()
        const excitedGain = this.audioContext.createGain()
        excitedOsc.connect(excitedGain)
        excitedGain.connect(this.audioContext.destination)
        excitedOsc.type = "square"
        excitedOsc.frequency.setValueAtTime(600, now + duration - 0.1)
        excitedOsc.frequency.exponentialRampToValueAtTime(800, now + duration)
        excitedGain.gain.setValueAtTime(0, now + duration - 0.1)
        excitedGain.gain.linearRampToValueAtTime(baseVolume * 0.5, now + duration - 0.05)
        excitedGain.gain.linearRampToValueAtTime(0, now + duration)
        excitedOsc.start(now + duration - 0.1)
        excitedOsc.stop(now + duration)
      }
    } catch (e) {
      console.warn("Error playing Steve sound:", e)
    }
  }

  // Generate unique sound effects for different attacks
  async playAttackSound(soundType: string) {
    await this.ensureAudioContext()
    if (!this.audioContext) return

    switch (soundType) {
      // Rico's "Steve" attacks - sound like "steve"!
      case "steve":
        this.playSteveSound("normal")
        break
      case "steve-loud":
        this.playSteveSound("loud")
        break
      case "steve-soft":
        this.playSteveSound("soft")
        break
      case "steve-excited":
        this.playSteveSound("excited")
        break

      // Captain Everton's attacks
      case "power-grab":
        this.playMultiTone([180, 220, 260], 0.3, "sawtooth", 0.25, true)
        this.playSound(180, 0.3, "sawtooth", 0.35, { start: 180, end: 100 })
        break
      case "virus-conversion":
        this.playMultiTone([150, 200, 250, 300], 0.4, "square", 0.3, true)
        this.playSound(100, 0.2, "sine", 0.2)
        break
      case "release-virus":
        this.playMultiTone([120, 150, 180], 0.35, "sawtooth", 0.3, true)
        this.playSound(120, 0.35, "sawtooth", 0.4, { start: 120, end: 200 })
        break
      case "world-domination":
        this.playMultiTone([100, 150, 200, 250, 300], 0.5, "square", 0.3, true)
        this.playSound(80, 0.3, "sine", 0.25)
        break

      // Virus attacks
      case "virus-attack":
        this.playMultiTone([80, 100, 120], 0.4, "sawtooth", 0.3, true)
        this.playSound(80, 0.4, "sawtooth", 0.4, { start: 80, end: 150 })
        break
      case "system-override":
        this.playMultiTone([100, 150, 200, 250], 0.5, "square", 0.3, true)
        this.playSound(60, 0.3, "sine", 0.2)
        this.playSound(40, 0.4, "sine", 0.15)
        break
      case "spare-parts":
        this.playMultiTone([90, 110, 130, 150], 0.35, "sawtooth", 0.3, true)
        this.playSound(90, 0.35, "sawtooth", 0.4, { start: 90, end: 180 })
        break

      // Player character attacks
      case "protocol-attack":
        this.playMultiTone([300, 400, 500, 600], 0.3, "square", 0.25, true)
        this.playSound(350, 0.2, "sine", 0.2)
        break
      case "beep-attack":
        this.playMultiTone([400, 500, 600, 700, 800], 0.25, "square", 0.3, true)
        break
      case "sparks":
        this.playMultiTone([600, 700, 800, 900], 0.2, "square", 0.25, true)
        this.playSound(1000, 0.15, "square", 0.2)
        break
      case "matrix-punch":
        this.playMultiTone([100, 150, 200], 0.2, "sine", 0.3, true)
        this.playSound(100, 0.2, "sine", 0.4, { start: 100, end: 50 })
        this.playSound(200, 0.15, "square", 0.3)
        break
      case "bullet-time":
        this.playMultiTone([150, 200, 250, 300, 350], 0.4, "square", 0.25, true)
        this.playSound(100, 0.3, "sine", 0.2)
        break
      case "red-pill":
        this.playMultiTone([250, 300, 350], 0.3, "sine", 0.25, true)
        this.playSound(250, 0.3, "sine", 0.35, { start: 250, end: 150 })
        break
      case "assimilate":
        this.playMultiTone([120, 150, 180, 210], 0.35, "sawtooth", 0.25, true)
        this.playSound(120, 0.35, "sawtooth", 0.35, { start: 120, end: 200 })
        break

      // Buff/Debuff sounds
      case "buff":
        this.playMultiTone([400, 500, 600, 700], 0.3, "sine", 0.2, true)
        this.playSound(350, 0.25, "sine", 0.15)
        break
      case "debuff":
        this.playMultiTone([200, 180, 160], 0.3, "sawtooth", 0.25, true)
        this.playSound(200, 0.3, "sawtooth", 0.3, { start: 200, end: 100 })
        break
      case "joke":
        this.playMultiTone([350, 400, 450], 0.2, "triangle", 0.15, true)
        this.playSound(300, 0.15, "triangle", 0.15)
        break

      // Default attack sound
      default:
        this.playSound(250, 0.2, "square", 0.3)
        break
    }
  }
}

// Export a singleton instance
export const attackSoundManager = new AttackSoundManager()

