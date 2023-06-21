@xunnamius/next-babel

# @xunnamius/next-babel

## Table of contents

### Type Aliases

- [BabelPreset](README.md#babelpreset)
- [NextBabelPresetOptions](README.md#nextbabelpresetoptions)

### Functions

- [default](README.md#default)

## Type Aliases

### BabelPreset

Ƭ **BabelPreset**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `overrides?` | { `test`: `RegExp`  } & `Omit`<[`BabelPreset`](README.md#babelpreset), ``"overrides"``\>[] |
| `plugins?` | `PluginItem`[] \| ``null`` |
| `presets?` | `PluginItem`[] \| ``null`` |
| `sourceType?` | ``"script"`` \| ``"module"`` \| ``"unambiguous"`` |

#### Defined in

[preset.ts:50](https://github.com/Xunnamius/next-utils/blob/94719c7/packages/next-babel/src/next-internals/preset.ts#L50)

___

### NextBabelPresetOptions

Ƭ **NextBabelPresetOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `class-properties?` | `any` |
| `preset-env?` | `any` |
| `preset-react?` | `any` |
| `preset-typescript?` | `any` |
| `styled-jsx?` | `StyledJsxBabelOptions` |
| `transform-runtime?` | `any` |

#### Defined in

[preset.ts:41](https://github.com/Xunnamius/next-utils/blob/94719c7/packages/next-babel/src/next-internals/preset.ts#L41)

## Functions

### default

▸ **default**(`api`, `options?`): [`BabelPreset`](README.md#babelpreset)

#### Parameters

| Name | Type |
| :------ | :------ |
| `api` | `any` |
| `options` | [`NextBabelPresetOptions`](README.md#nextbabelpresetoptions) |

#### Returns

[`BabelPreset`](README.md#babelpreset)

#### Defined in

[preset.ts:62](https://github.com/Xunnamius/next-utils/blob/94719c7/packages/next-babel/src/next-internals/preset.ts#L62)
