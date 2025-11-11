import absorbUrl from "./audio/Absorb.ogg?url"
import benderEntranceUrl from "./audio/bender.ogg?url"
import benderPanicUrl from "./audio/bender-panic.ogg?url"
import biteUrl from "./audio/Bite.ogg?url"
import blackjackHookersUrl from "./audio/blackjack&hookers.ogg?url"
import blizzardUrl from "./audio/Blizzard.ogg?url"
import bubblebeamUrl from "./audio/Bubblebeam.ogg?url"
import defenseCurlUrl from "./audio/DefenseCurl.ogg?url"
import fireSpinUrl from "./audio/FireSpin.ogg?url"
import imaBenderUrl from "./audio/im-a-bender.ogg?url"
import locutusEntranceUrl from "./audio/locutus.ogg?url"
import pikachuEntranceUrl from "./audio/pikachu.ogg?url"
import pikachuFaintUrl from "./audio/pikachu-dead.ogg?url"
import programmedToDoUrl from "./audio/programed-to-do.ogg?url"
import quickAttackUrl from "./audio/QuickAttack.ogg?url"
import recoverUrl from "./audio/Recover.ogg?url"
import resistantIsFutileUrl from "./audio/resistant-is-futile.ogg?url"
import thunderUrl from "./audio/Thunder.ogg?url"
import thunderboltUrl from "./audio/Thunderbolt.ogg?url"
import weAreTheBorgUrl from "./audio/we_are_the_borg.ogg?url"

import { AbilitySoundName, EntranceSoundName, FaintSoundName } from "./types"

export const abilitySoundMap: Record<AbilitySoundName, string> = {
  absorb: absorbUrl,
  assimilate: resistantIsFutileUrl,
  "beep-attack": programmedToDoUrl,
  bite: biteUrl,
  "blackjack-hookers": blackjackHookersUrl,
  blizzard: blizzardUrl,
  bubblebeam: bubblebeamUrl,
  buff: recoverUrl,
  "bullet-time": quickAttackUrl,
  debuff: defenseCurlUrl,
  "defensive-curl": defenseCurlUrl,
  joke: blackjackHookersUrl,
  "machine-swarm": fireSpinUrl,
  "matrix-punch": quickAttackUrl,
  "power-grab": fireSpinUrl,
  "protocol-attack": benderEntranceUrl,
  "red-pill": recoverUrl,
  "release-virus": fireSpinUrl,
  sparks: fireSpinUrl,
  steve: imaBenderUrl,
  "steve-excited": imaBenderUrl,
  "steve-loud": imaBenderUrl,
  "steve-soft": imaBenderUrl,
  "system-override": programmedToDoUrl,
  thunder: thunderUrl,
  thunderbolt: thunderboltUrl,
  "virus-attack": absorbUrl,
  "virus-conversion": recoverUrl,
  "world-domination": fireSpinUrl,
  "quick-attack": quickAttackUrl,
}

export const entranceSoundMap: Record<EntranceSoundName, string> = {
  "rico-entrance": programmedToDoUrl,
  "captain-everton-entrance": recoverUrl,
  "alien-entity-entrance": fireSpinUrl,
  "bender-entrance": benderEntranceUrl,
  "locutus-entrance": locutusEntranceUrl,
  "morpheus-entrance": weAreTheBorgUrl,
  "neo-entrance": quickAttackUrl,
  "pikachu-entrance": pikachuEntranceUrl,
  "rick-entrance": programmedToDoUrl,
}

export const faintSoundMap: Record<FaintSoundName, string> = {
  "rico-faint": programmedToDoUrl,
  "captain-everton-faint": recoverUrl,
  "alien-entity-faint": absorbUrl,
  "bender-faint": benderPanicUrl,
  "locutus-faint": resistantIsFutileUrl,
  "morpheus-faint": imaBenderUrl,
  "neo-faint": quickAttackUrl,
  "pikachu-faint": pikachuFaintUrl,
  "rick-faint": programmedToDoUrl,
}
