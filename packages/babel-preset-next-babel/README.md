<!-- badges-start -->

[![Black Lives Matter!][x-badge-blm-image]][x-badge-blm-link]
[![Last commit timestamp][x-badge-lastcommit-image]][x-badge-repo-link]
[![Codecov][x-badge-codecov-image]][x-badge-codecov-link]
[![Source license][x-badge-license-image]][x-badge-license-link]
[![Monthly Downloads][x-badge-downloads-image]][x-badge-npm-link]
[![NPM version][x-badge-npm-image]][x-badge-npm-link]
[![Uses Semantic Release!][x-badge-semanticrelease-image]][x-badge-semanticrelease-link]

<!-- badges-end -->

# @xunnamius/babel-preset-next-babel

This is a custom port of Next.js's [`next/babel`][1] package with support for
the latest features of Babel and TypeScript. Specifically, this package is an
attempt to fix the lack of support for `satisfies` (see
[vercel/next.js#43799][2]).

Thanks to [@valentinpalkovic from Storybook][3] for getting pointing me in the
right direction on where the problems are.

Best case scenario: Vercel has not completely abandoned Babel in favor of SWC
(Babel is still much more popular as of 2023!) and `next/babel` will be updated
in the near future effectively obsoleting this package.

---

<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

```bash
npm install --save-dev @xunnamius/babel-preset-next-babel
```

## Usage

TODO

## Contributing and Support

**[New issues][x-repo-choose-new-issue] and [pull requests][x-repo-pr-compare]
are always welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟
this project][x-badge-repo-link] to let me know you found it useful! ✊🏿 Thank
you!

See [CONTRIBUTING.md][x-repo-contributing] and [SUPPORT.md][x-repo-support] for
more information.

### Contributors

See the [table of contributors][x-repo-contributors].

[x-badge-blm-image]: https://xunn.at/badge-blm 'Join the movement!'
[x-badge-blm-link]: https://xunn.at/donate-blm
[x-badge-codecov-image]:
  https://img.shields.io/codecov/c/github/Xunnamius/next-utils/main?style=flat-square&token=HWRIOBAAPW
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/next-utils
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/@xunnamius/babel-preset-next-babel?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/next-utils?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/@xunnamius/babel-preset-next-babel?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/next-utils/blob/main/packages/babel-preset-next-babel/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/@xunnamius/babel-preset-next-babel
  'Install this package using npm or yarn!'
[x-badge-npm-link]:
  https://www.npmjs.com/package/@xunnamius/babel-preset-next-babel
[x-badge-repo-link]:
  https://github.com/xunnamius/next-utils/blob/main/packages/babel-preset-next-babel
[x-badge-semanticrelease-image]:
  https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
  'This repo practices continuous integration and deployment!'
[x-badge-semanticrelease-link]:
  https://github.com/semantic-release/semantic-release
[x-repo-choose-new-issue]:
  https://github.com/xunnamius/next-utils/issues/new/choose
[x-repo-contributing]: /CONTRIBUTING.md
[x-repo-contributors]: /README.md#contributors
[x-repo-pr-compare]: https://github.com/xunnamius/next-utils/compare
[x-repo-support]: /.github/SUPPORT.md
[1]:
  https://github.com/vercel/next.js/tree/f6998e30a815e976173501a62e6e481f92699d81/packages/next/src/build/babel
[2]: https://github.com/vercel/next.js/issues/43799
[3]:
  https://github.com/storybookjs/storybook/pull/21104/files#diff-366b9b4ce6510852e24f5353757f6ada22e638b703ad5cb06e5441ff6b65a4ef
