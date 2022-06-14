interface MaterialComponentItem {
  name: string;
  usedOnCast: boolean;
}

type MaterialComponent = MaterialComponentItem[];

interface Duration {
  kind: string;
}

interface InMinutes extends Duration {
  kind: "InMinutes";
  duration: number;
}

interface Instantaneous extends Duration {
  kind: "Instantaneous";
}

type CastDuration = "BonusAction" | "Action" | "Reaction" | InMinutes;

export const CastDurations = {
  BonusAction: "BonusAction" as CastDuration,
  Action: "Action" as CastDuration,
  Reaction: "Reaction" as CastDuration,
  minutes: (min: number): InMinutes => ({
    kind: "InMinutes",
    duration: min
  })
};

interface SpellRange {
  kind: string;
}

interface Contact extends SpellRange {
  kind: "Contact";
}

interface Personal extends SpellRange {
  kind: "Personal";
}

interface InMeters extends SpellRange {
  kind: "InMeters";
  distance: number;
}

export const SpellRanges = {
  Contact: { kind: "Contact" } as Contact,
  Personal: { kind: "Personal" } as Personal,
  meters: (m: number): InMeters => ({
    kind: "InMeters",
    distance: m
  })
};

interface SpellComponentBuilder {
  _verbal: boolean;
  _somatic: boolean;
  _material: MaterialComponent | false;
  withVerbal(): SpellComponentBuilder;
  withSomatic(): SpellComponentBuilder;
  withMaterial(
    m: MaterialComponent
  ): SpellComponentBuilder;
  addMaterial(
    name: string,
    usedOnCast?: boolean
  ): SpellComponentBuilder;

  build(): SpellComponent;
}

const spellComponentBuilder = function (): SpellComponentBuilder {
  return {
    _verbal: false,
    _somatic: false,
    _material: false,
    withVerbal() {
      return { ...this, _verbal: true };
    },
    withSomatic() {
      return { ...this, _somatic: true };
    },
    withMaterial(m: MaterialComponent) {
      return { ...this, _material: m };
    },
    addMaterial(name: string, usedOnCast: boolean = false) {
      const material = Array.isArray(this._material)
        ? [...this._material, { name, usedOnCast }]
        : [{ name, usedOnCast }];
      return { ...this, _material: material };
    },
    build() {
      return {
        verbal: this._verbal,
        somatic: this._somatic,
        material: this._material
      };
    }
  };
};

export const SpellComponents = {
  builder: spellComponentBuilder
};

type SpellComponent = {
  verbal: boolean;
  somatic: boolean;
  material: MaterialComponent | false;
};

export interface Spell {
  name: string;
  description: string;
  level: number;
  unlockLevel: number;
  range: Contact | Personal | InMeters;
  components: SpellComponent;
  duration: InMinutes | Instantaneous;
  castDuration: CastDuration;
}
