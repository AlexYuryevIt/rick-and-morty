export type Status = 'Alive' | 'Dead' | 'Unknown';

export const colorByStatus: Record<Status, 'green' | 'red' | 'orange'> = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange'
} as const;
