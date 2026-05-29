[**@-xun/api**](../../../README.md)

***

[@-xun/api](../../../README.md) / [middleware/enforce-limits](../README.md) / makeMiddleware

# Function: makeMiddleware()

> **makeMiddleware**(): (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`) => `Promise`\<`undefined` \| `Response`\>

Defined in: [packages/api/src/middleware/enforce-limits.ts:21](https://github.com/Xunnamius/api-utils/blob/6a746e11b580c02067e3fd8cc5b99bc103d3eed8/packages/api/src/middleware/enforce-limits.ts#L21)

Rejects requests from clients that have sent too many previous requests.

## Returns

> (`reqOrRequest`, `resOrModernContext`, `maybeLegacyContext`): `Promise`\<`undefined` \| `Response`\>

### Parameters

#### reqOrRequest

`Request` | [`NextApiRequestLike`](../../../index/interfaces/NextApiRequestLike.md)

#### resOrModernContext

[`NextApiResponseLike`](../../../index/type-aliases/NextApiResponseLike.md) | [`ModernMiddlewareContext`](../../../types/type-aliases/ModernMiddlewareContext.md)\<`EmptyObject`, `EmptyObject`\>

#### maybeLegacyContext

`undefined` | [`LegacyMiddlewareContext`](../../../types/type-aliases/LegacyMiddlewareContext.md)\<`EmptyObject`, `EmptyObject`\>

### Returns

`Promise`\<`undefined` \| `Response`\>
