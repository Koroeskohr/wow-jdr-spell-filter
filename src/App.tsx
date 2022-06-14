import {
  createTable,
  getCoreRowModel,
  useTableInstance
} from "@tanstack/react-table";
import React from "react";
import { Character } from "./Character";
import { Spell } from "./Spell";
import { spells } from "./spells";

import "./styles.css";

const canCharacterCast = (character: Character, spell: Spell) => {
  const hasLevel = character.level >= (spell.unlockLevel ?? 0);

  const materialComponent = spell.components?.material;
  const needsMaterials =
    materialComponent !== undefined && materialComponent !== false;
  const hasMaterials =
    needsMaterials &&
    materialComponent
      .map((c) => c.name)
      .every((c) => character.inventory.includes(c));

  console.table({
    character,
    spell,
    hasLevel,
    needsMaterials,
    hasMaterials
  });

  return hasLevel && (!needsMaterials || hasMaterials);
};

const table = createTable().setRowType<Spell>();
const defaultSpells: Spell[] = spells as Spell[];

const defaultColumns = [
  table.createGroup({
    header: "Spells",
    footer: (props) => props.column.id,
    columns: [
      table.createDataColumn("name", {
        header: () => "Nom",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      }),
      table.createDataColumn("castDuration", {
        header: () => "Temps d'incantation",
        cell: (info) => {
          const castDuration = info.getValue();

          return castDuration === "Action"
            ? "Action"
            : castDuration === "BonusAction"
            ? "Action bonus"
            : castDuration === "Reaction"
            ? "Réaction"
            : "???";
        },
        footer: (props) => props.column.id
      }),
      table.createDataColumn("duration", {
        header: () => <span>Durée</span>,
        cell: (info) => {
          const duration = info.getValue();

          if (!duration) return "";

          return duration.kind === "InMinutes"
            ? `${duration.duration} min`
            : `Instant`;
        },
        footer: (props) => props.column.id
      }),
      table.createDataColumn("range", {
        header: () => <span>Portée</span>,
        cell: (info) => {
          const range = info.getValue();

          return range.kind === "Contact"
            ? "Contact"
            : range.kind === "Personal"
            ? "Personal"
            : `${range.distance} mètres`;
        },
        footer: (props) => props.column.id
      }),
      table.createGroup({
        header: "Composants",
        columns: [
          table.createDataColumn((i) => i.components?.verbal, {
            id: "verbal",
            header: "V",
            cell: (info) => (info.getValue() ? "V" : "")
          }),
          table.createDataColumn((i) => i.components?.somatic, {
            id: "somatic",
            header: "S",
            cell: (info) => (info.getValue() ? "S" : "")
          }),
          table.createDataColumn((i) => i.components?.material, {
            id: "material",
            header: "M",
            cell: (info) => (info.getValue() ? "M" : "")
          })
        ]
      }),
      table.createDataColumn("level", {
        header: "Niveau",
        cell: (info) => {
          const level = info.getValue();

          return level === 0 ? "Cantrip" : level;
        },
        footer: (props) => props.column.id
      })
    ]
  })
];

export default function App() {
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns
  ]);

  const [inventory, setInventory] = React.useState<string[]>(() => []);

  const character = React.useMemo(
    () => ({
      name: "Kelesil",
      level: 11,
      inventory
    }),
    [inventory]
  );

  const spells = React.useMemo(
    () => defaultSpells.filter((spell) => canCharacterCast(character, spell)),
    [character]
  );

  const materialsRaw = defaultSpells
    .map((sp) => {
      const materialComponent = sp.components?.material;

      return materialComponent === undefined || materialComponent === false
        ? []
        : materialComponent.map((i) => i.name);
    })
    // .flat()
    .reduce((acc, val) => acc.concat(val), []);

  const materials = [...new Set(materialsRaw)];

  const rerender = React.useReducer(() => ({}), {})[1];

  const instance = useTableInstance(table, {
    data: spells,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return (
    <div className="p-2">
      <table>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {instance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>

      <ul>
        {materials.map((m) => (
          <li>
            <input
              type="checkbox"
              name={m}
              checked={inventory.includes(m)}
              onChange={(e) => {
                setInventory((inv) => {
                  const on = e.target.checked;
                  return on ? [...inv, m] : inv.filter((item) => item !== m);
                });
              }}
            />
            <label htmlFor={m}>{m}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
