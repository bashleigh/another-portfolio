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
import terminatorEntranceUrl from "./audio/dun-dun-dun-dun-dun.ogg?url"
import terminatorFaintUrl from "./audio/dun-dun-dun-dun-dun.ogg?url"
import illBeBackUrl from "./audio/ill-be-back.ogg?url"
import youHaveBeenTerminatedUrl from "./audio/you-are-terminated.ogg?url"
import iKnowKungFuUrl from "./audio/i-know-kung-fu.ogg?url"
import steveUrl from "./audio/steve.ogg?url"
import portalGunUrl from "./audio/portal-gun.ogg?url"
import wooVuLuvubDubDubDubUrl from "./audio/woo_vu_luvub_dub_dub.ogg?url"
import imRickUrl from "./audio/im-rick.ogg?url"
import borgTractorBeamUrl from "./audio/borg-tractor-beam.ogg?url"

import { AbilitySoundName, EntranceSoundName, FaintSoundName } from "./types"

export const abilitySoundMap: Record<AbilitySoundName, string> = {
  absorb: absorbUrl,
  assimilate: resistantIsFutileUrl,
  "beep-attack": biteUrl,
  "im-a-bender": programmedToDoUrl,
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
  "i-know-kung-fu": iKnowKungFuUrl,
  "power-grab": fireSpinUrl,
  "protocol-attack": benderEntranceUrl,
  "red-pill": recoverUrl,
  "release-virus": fireSpinUrl,
  sparks: fireSpinUrl,
  steve: steveUrl,
  "steve-excited": steveUrl,
  "steve-loud": steveUrl,
  "steve-soft": steveUrl,
  "system-override": programmedToDoUrl,
  thunder: thunderUrl,
  thunderbolt: thunderboltUrl,
  "virus-attack": absorbUrl,
  "virus-conversion": recoverUrl,
  "world-domination": fireSpinUrl,
  "quick-attack": quickAttackUrl,
  "resistance-is-futile": resistantIsFutileUrl,
  "we-are-the-borg": weAreTheBorgUrl,
  "ill-be-back": illBeBackUrl,
  "machine-gun": fireSpinUrl,
  "targeting-information": fireSpinUrl,
  terminate: youHaveBeenTerminatedUrl,
  "portal-gun": portalGunUrl,
  "woo-vu-luvub-dub-dub": wooVuLuvubDubDubDubUrl,
  "borg-tractor-beam": borgTractorBeamUrl,
  "bender-panic": benderPanicUrl,
}

export const entranceSoundMap: Record<EntranceSoundName, string> = {
  "rico-entrance": steveUrl,
  "captain-everton-entrance": recoverUrl,
  "alien-entity-entrance": fireSpinUrl,
  "bender-entrance": benderEntranceUrl,
  "locutus-entrance": locutusEntranceUrl,
  "morpheus-entrance": weAreTheBorgUrl,
  "neo-entrance": quickAttackUrl,
  "pikachu-entrance": pikachuEntranceUrl,
  "terminator-entrance": terminatorEntranceUrl,
  "rick-entrance": imRickUrl,
}

export const faintSoundMap: Record<FaintSoundName, string> = {
  "rico-faint": steveUrl,
  "captain-everton-faint": recoverUrl,
  "alien-entity-faint": absorbUrl,
  "bender-faint": benderPanicUrl,
  "locutus-faint": resistantIsFutileUrl,
  "morpheus-faint": imaBenderUrl,
  "neo-faint": quickAttackUrl,
  "pikachu-faint": pikachuFaintUrl,
  "rick-faint": steveUrl,
  "terminator-faint": terminatorFaintUrl,
}
