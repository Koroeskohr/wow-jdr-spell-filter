import { CastDurations, Spell, SpellComponents, SpellRanges } from "./Spell";

export const spells: Partial<Spell>[] = [
  {
    name: "Rayon de givre",
    castDuration: CastDurations.Action,
    level: 0,
    range: SpellRanges.meters(18),
    components: SpellComponents.builder()
      .withVerbal()
      .withSomatic()
      .addMaterial("water or ice")
      .build()
  },
  {
    name: "Protection contre les armes",
    castDuration: CastDurations.Action,
    level: 0,
    range: SpellRanges.Personal
  },
  {
    name: "Projectile magique",
    castDuration: CastDurations.Action,
    level: 1,
    range: SpellRanges.meters(36)
  },
  {
    name: "Armure de mage",
    castDuration: CastDurations.Action,
    level: 1,
    range: SpellRanges.Contact,
    duration: CastDurations.minutes(60 * 8),
    components: SpellComponents.builder()
      .withVerbal()
      .withSomatic()
      .addMaterial("cuir tanné")
      .build()
  },
  {
    name: "Nova de givre",
    castDuration: CastDurations.Action,
    level: 1,
    range: SpellRanges.Personal,
    components: SpellComponents.builder().withVerbal().withSomatic().build()
  },
  {
    name: "Bouclier",
    castDuration: CastDurations.Reaction,
    level: 1,
    range: SpellRanges.Personal,
    components: SpellComponents.builder().withVerbal().withSomatic().build()
  },
  {
    name: "Couteau de glace",
    castDuration: CastDurations.BonusAction,
    level: 1,
    range: SpellRanges.meters(18),
    components: SpellComponents.builder()
      .withSomatic()
      .addMaterial("water or ice")
      .build()
  },
  {
    name: "Image silencieuse",
    castDuration: CastDurations.Action,
    level: 1,
    range: SpellRanges.Personal,
    duration: CastDurations.minutes(10),
    components: SpellComponents.builder()
      .withVerbal()
      .withSomatic()
      .addMaterial("laine de mouton")
      .build()
  },
  {
    name: "Transfert",
    castDuration: CastDurations.BonusAction,
    level: 2,
    range: SpellRanges.meters(9),
    components: SpellComponents.builder().withVerbal().build()
  },
  {
    name: "Image miroir",
    castDuration: CastDurations.Action,
    duration: CastDurations.minutes(1),
    level: 2,
    range: SpellRanges.Personal,
    components: SpellComponents.builder().withVerbal().withSomatic().build()
  },
  {
    name: "Flou",
    castDuration: CastDurations.Action,
    level: 2,
    range: SpellRanges.Personal,
    components: SpellComponents.builder().withVerbal().withSomatic().build()
  },
  {
    name: "Chute lente",
    castDuration: CastDurations.Reaction,
    level: 1,
    duration: CastDurations.minutes(1),
    range: SpellRanges.meters(18),
    components: SpellComponents.builder()
      .withVerbal()
      .withSomatic()
      .addMaterial("cuir tanné")
      .build()
  }
];
