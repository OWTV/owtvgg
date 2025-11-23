import * as migration_20251114_180537 from './20251114_180537';
import * as migration_20251116_100402 from './20251116_100402';
import * as migration_20251123_214128 from './20251123_214128';
import * as migration_20251123_215226 from './20251123_215226';

export const migrations = [
  {
    up: migration_20251114_180537.up,
    down: migration_20251114_180537.down,
    name: '20251114_180537',
  },
  {
    up: migration_20251116_100402.up,
    down: migration_20251116_100402.down,
    name: '20251116_100402',
  },
  {
    up: migration_20251123_214128.up,
    down: migration_20251123_214128.down,
    name: '20251123_214128',
  },
  {
    up: migration_20251123_215226.up,
    down: migration_20251123_215226.down,
    name: '20251123_215226'
  },
];
