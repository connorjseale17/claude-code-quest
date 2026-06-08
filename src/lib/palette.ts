export const COLORS: ReadonlyArray<{ hex: string; label: string }> = [
  { hex: '#E8633D', label: 'orange' },
  { hex: '#3FB950', label: 'green' },
  { hex: '#6BA8DD', label: 'blue' },
  { hex: '#D94DFF', label: 'purple' },
  { hex: '#F0C040', label: 'gold' },
  { hex: '#FF6B8A', label: 'pink' },
  { hex: '#00D4AA', label: 'teal' },
  { hex: '#E8E8E8', label: 'white' },
];

export function colorIdxFromHex(hex: string): number {
  const idx = COLORS.findIndex(c => c.hex === hex);
  return idx >= 0 ? idx : 0;
}

export function colorHexFromIdx(idx: number): string {
  return COLORS[idx]?.hex ?? COLORS[0].hex;
}
