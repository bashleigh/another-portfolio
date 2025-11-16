import { abilitySoundMap } from "./audio-registry"
import { AbilitySoundName } from "./types"

class AttackSoundManager {
  private audioFileCache: Map<AbilitySoundName, HTMLAudioElement> = new Map()
  private volume: number = 0.3

  private getAudio(soundType: AbilitySoundName): HTMLAudioElement | null {
    const cached = this.audioFileCache.get(soundType)
    if (cached) {
      return cached
    }

    const audioUrl = abilitySoundMap[soundType]
    if (!audioUrl) {
      console.warn(`No audio file registered for attack sound '${soundType}'`)
      return null
    }

    const audio = new Audio(audioUrl)
    audio.preload = "auto"
    this.audioFileCache.set(soundType, audio)
    return audio
  }

  async playAttackSound(soundType: AbilitySoundName) {
    const audio = this.getAudio(soundType)
    if (!audio) return
    audio.volume = this.volume

    try {
      audio.currentTime = 0
      await audio.play()
    } catch (e) {
      console.warn(`Failed to play attack sound '${soundType}':`, e)
    }
  }
}

export const attackSoundManager = new AttackSoundManager()
