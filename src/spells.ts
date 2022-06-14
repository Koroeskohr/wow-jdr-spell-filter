import {
  CastDurations,
  Spell,
  SpellComponents,
  SpellDurations,
  SpellRanges,
} from "./Spell";

export const spells: Spell[] = [
  {
    name: "Rayon de givre",
    castDuration: CastDurations.Action,
    level: 0,
    range: SpellRanges.meters(18),
    components: SpellComponents.builder()
      .withVerbal()
      .withSomatic()
      .addMaterial("eau ou glace")
      .build(),
    duration: SpellDurations.Instantaneous,
    unlockLevel: 1,
  },
  {
    name: "Protection contre les armes",
    castDuration: CastDurations.Action,
    level: 0,
    range: SpellRanges.Personal,
    components: SpellComponents.builder().withVerbal().withSomatic().build(),
    duration: SpellDurations.rounds(1),
    unlockLevel: 2,
  },
  {
    name: "Projectile magique",
    castDuration: CastDurations.Action,
    level: 1,
    range: SpellRanges.meters(36),
    components: SpellComponents.builder().withVerbal().withSomatic().build(),
    duration: SpellDurations.Instantaneous,
    unlockLevel: 5,
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
      .build(),
    unlockLevel: 6,
  },
  {
    name: "Nova de givre",
    castDuration: CastDurations.Action,
    level: 1,
    range: SpellRanges.Personal,
    components: SpellComponents.builder().withVerbal().withSomatic().build(),
    unlockLevel: 7,
    duration: SpellDurations.rounds(1),
  },
  {
    name: "Bouclier",
    castDuration: CastDurations.Reaction,
    level: 1,
    range: SpellRanges.Personal,
    components: SpellComponents.builder().withVerbal().withSomatic().build(),
    unlockLevel: 7,
    duration: SpellDurations.rounds(1),
  },
  {
    name: "Couteau de glace",
    castDuration: CastDurations.BonusAction,
    level: 8,
    range: SpellRanges.meters(18),
    components: SpellComponents.builder()
      .withSomatic()
      .addMaterial("eau ou glace")
      .build(),
    unlockLevel: 7,
    duration: SpellDurations.rounds(1),
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
      .build(),
    unlockLevel: 8,
  },
  {
    name: "Transfert",
    castDuration: CastDurations.BonusAction,
    level: 2,
    range: SpellRanges.meters(9),
    components: SpellComponents.builder().withVerbal().build(),
    duration: SpellDurations.Instantaneous,
    unlockLevel: 9,
  },
  {
    name: "Image miroir",
    castDuration: CastDurations.Action,
    duration: CastDurations.minutes(1),
    level: 2,
    range: SpellRanges.Personal,
    components: SpellComponents.builder().withVerbal().withSomatic().build(),
    unlockLevel: 9,
  },
  {
    name: "Flou",
    castDuration: CastDurations.Action,
    level: 2,
    range: SpellRanges.Personal,
    components: SpellComponents.builder().withVerbal().build(),
    unlockLevel: 10,
    duration: SpellDurations.minutes(1),
  },
  {
    name: "Chute lente",
    castDuration: CastDurations.Reaction,
    level: 1,
    duration: CastDurations.minutes(1),
    range: SpellRanges.meters(18),
    components: SpellComponents.builder()
      .withVerbal()
      .addMaterial("plume ou duvet")
      .build(),
    unlockLevel: 7,
  },
];
