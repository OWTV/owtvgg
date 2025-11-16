import * as migration_20251114_180537 from './20251114_180537';
import * as migration_20251116_100402 from './20251116_100402';

export const migrations = [
  {
    up: migration_20251114_180537.up,
    down: migration_20251114_180537.down,
    name: '20251114_180537',
  },
  {
    up: migration_20251116_100402.up,
    down: migration_20251116_100402.down,
    name: '20251116_100402'
  },
];
