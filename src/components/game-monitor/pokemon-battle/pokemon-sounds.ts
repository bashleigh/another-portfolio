// Pokemon sound manager for Pokemon Battle
// Handles Pokemon-specific sounds like selection and fainting

import { entranceSoundMap, faintSoundMap } from "./audio-registry"
import { EntranceSoundName, FaintSoundName } from "./types"

class PokemonSoundManager {
  private audioCache: Map<string, HTMLAudioElement> = new Map()
  private volume: number = 0.5

  private getAudio(cacheKey: string, url: string): HTMLAudioElement {
    const cached = this.audioCache.get(cacheKey)
    if (cached) {
      return cached
    }

    const audio = new Audio(url)
    audio.volume = this.volume
    audio.preload = "auto"

    audio.addEventListener("error", (e) => {
      console.warn(`Failed to load sound '${cacheKey}':`, e)
    })

    this.audioCache.set(cacheKey, audio)
    return audio
  }

  private async playFromMap(prefix: string, soundId: string | undefined, url: string | undefined) {
    if (!soundId || !url) {
      console.warn(`No audio file registered for ${prefix} sound '${soundId ?? "unknown"}'`)
      return
    }

    try {
      const cacheKey = `${prefix}-${soundId}`
      const audio = this.getAudio(cacheKey, url)
      audio.currentTime = 0
      await audio.play()
    } catch (e) {
      console.warn(`Failed to play ${prefix} sound '${soundId}':`, e)
    }
  }

  async playEntranceSound(entranceSound: EntranceSoundName) {
    await this.playFromMap("entrance", entranceSound, entranceSoundMap[entranceSound])
  }

  async playFaintSound(faintSound: FaintSoundName) {
    await this.playFromMap("faint", faintSound, faintSoundMap[faintSound])
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))

    this.audioCache.forEach((audio) => {
      audio.volume = this.volume
    })
  }

  getVolume(): number {
    return this.volume
  }
}

export const pokemonSoundManager = new PokemonSoundManager()

