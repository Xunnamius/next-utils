[**@-xun/api**](../../README.md)

***

[@-xun/api](../../README.md) / [types](../README.md) / MiddlewareFactorySignatureModern

# Type Alias: MiddlewareFactorySignatureModern()\<Options, Heap\>

> **MiddlewareFactorySignatureModern**\<`Options`, `Heap`\> = (`handler`, `options`) => [`ModernApiHandler`](ModernApiHandler.md)

Defined in: [packages/api/src/types.ts:434](https://github.com/Xunnamius/api-utils/blob/6a746e11b580c02067e3fd8cc5b99bc103d3eed8/packages/api/src/types.ts#L434)

middlewareFactory

## Type Parameters

### Options

`Options` *extends* `Record`\<`string`, `unknown`\>

### Heap

`Heap` *extends* `Record`\<`PropertyKey`, `unknown`\>

## Parameters

### handler

[`ModernApiHandlerWithHeap`](ModernApiHandlerWithHeap.md)\<`Heap`\> | `undefined`

### options

[`FactoriedMiddlewareOptions`](FactoriedMiddlewareOptions.md)\<`Options`, `Heap`, [`ModernMiddleware`](ModernMiddleware.md)\<`Options`, `Heap`\>\>

## Returns

[`ModernApiHandler`](ModernApiHandler.md)
