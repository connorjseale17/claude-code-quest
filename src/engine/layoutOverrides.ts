import type { SerializedChamber } from './roomConfigs';

// ============================================================================
// Layout overrides — the committed, deployed-default chamber layouts produced
// by Layout Mode (the dev editor). When a chamber id appears here, its editable
// fields (tiles / items / npcs / doors / decorations / spawn / keySpawn) REPLACE
// the hand-authored builder output at module load.
//
// Workflow: design a chamber in Layout Mode → "Save as default" downloads JSON →
// paste the chamber entry here → commit → deploy. Delete an entry to revert that
// chamber to its hand-authored builder layout.
//
// `import type` above is erased at runtime, so there is no import cycle with
// roomConfigs.ts (which imports the LAYOUT_OVERRIDES *value* from here).
// ============================================================================

export const LAYOUT_OVERRIDES: Record<string, SerializedChamber> = {};
