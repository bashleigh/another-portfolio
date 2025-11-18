// Background music manager for Pokemon Battle
// Handles intro track (plays once) then loop track (plays continuously)

class BattleMusicManager {
  private introAudio: HTMLAudioElement | null = null
  private loopAudio: HTMLAudioElement | null = null
  private isPlaying = false
  private volume: number = 0.3 // Default volume (0.0 to 1.0)

  load(introUrl: string, loopUrl: string) {
    // Clean up existing audio if any
    this.stop()

    // Create intro audio element
    this.introAudio = new Audio(introUrl)
    this.introAudio.volume = this.volume
    this.introAudio.preload = "auto"

    // Create loop audio element
    this.loopAudio = new Audio(loopUrl)
    this.loopAudio.loop = true
    this.loopAudio.volume = this.volume
    this.loopAudio.preload = "auto"

    // When intro ends, start the loop
    this.introAudio.addEventListener("ended", () => {
      if (this.loopAudio && this.isPlaying) {
        this.loopAudio.play().catch(err => {
          console.warn("Failed to play loop music:", err)
        })
      }
    })

    // Handle errors
    this.introAudio.addEventListener("error", e => {
      console.warn("Failed to load intro music:", e)
    })

    this.loopAudio.addEventListener("error", e => {
      console.warn("Failed to load loop music:", e)
    })
  }

  async play() {
    if (!this.introAudio || !this.loopAudio) {
      console.warn("Music not loaded. Call load() first.")
      return
    }

    if (this.isPlaying) {
      return // Already playing
    }

    this.isPlaying = true

    try {
      // Start with intro
      await this.introAudio.play()
    } catch (e) {
      console.warn("Failed to play intro music:", e)
      // If intro fails, try loop as fallback
      try {
        await this.loopAudio.play()
      } catch (err) {
        console.warn("Failed to play loop music:", err)
        this.isPlaying = false
      }
    }
  }

  stop() {
    this.isPlaying = false

    if (this.introAudio) {
      this.introAudio.pause()
      this.introAudio.currentTime = 0
      this.introAudio = null
    }

    if (this.loopAudio) {
      this.loopAudio.pause()
      this.loopAudio.currentTime = 0
      this.loopAudio = null
    }
  }

  pause() {
    if (this.introAudio && !this.introAudio.paused) {
      this.introAudio.pause()
    }
    if (this.loopAudio && !this.loopAudio.paused) {
      this.loopAudio.pause()
    }
    this.isPlaying = false
  }

  resume() {
    if (!this.introAudio || !this.loopAudio) {
      return
    }

    if (this.isPlaying) {
      // Resume based on which track should be playing
      if (
        this.introAudio.currentTime > 0 &&
        this.introAudio.currentTime < this.introAudio.duration
      ) {
        this.introAudio.play().catch(err => {
          console.warn("Failed to resume intro music:", err)
        })
      } else if (this.loopAudio) {
        this.loopAudio.play().catch(err => {
          console.warn("Failed to resume loop music:", err)
        })
      }
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))

    if (this.introAudio) {
      this.introAudio.volume = this.volume
    }
    if (this.loopAudio) {
      this.loopAudio.volume = this.volume
    }
  }

  getVolume(): number {
    return this.volume
  }
}

// Export a singleton instance
export const battleMusicManager = new BattleMusicManager()
