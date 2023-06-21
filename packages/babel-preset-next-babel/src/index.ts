import {
  type BabelPreset,
  type NextBabelPresetOptions,
  default as nextBabelPreset
} from './next-internals/preset';

export type { BabelPreset, NextBabelPresetOptions };

/**
 * This is a custom port of Next.js's `next/babel` package with support for the
   latest features of Babel and TypeScript.
 */
export default (api: unknown, options: NextBabelPresetOptions = {}): BabelPreset => {
  return nextBabelPreset(api, options);
};
