import { pluginTester } from 'babel-plugin-tester';
import type { NextBabelPresetOptions } from 'pkgverse/next-babel/src/index';

// eslint-disable-next-line jest/require-hook
pluginTester({
  preset: require('@xunnamius/next-babel').default,
  presetName: 'next/babel',
  presetOptions: {} satisfies NextBabelPresetOptions,
  tests: {
    'loads into Babel without incident': {
      code: 'const hello = "world"',
      output: "const hello = 'world';"
    }
  }
});
