/**
 * Source: https://github.com/vercel/next.js/blob/f6998e30a815e976173501a62e6e481f92699d81/packages/next/src/build/babel/plugins/amp-attributes.ts
 */

import type { NodePath, PluginObj, types } from '@babel/core';

export default function AmpAttributePatcher(): PluginObj {
  return {
    visitor: {
      JSXOpeningElement(path: NodePath<types.JSXOpeningElement>) {
        const openingElement = path.node;

        const { name, attributes } = openingElement;
        if (!(name && name.type === 'JSXIdentifier')) {
          return;
        }

        if (!name.name.startsWith('amp-')) {
          return;
        }

        for (const attribute of attributes) {
          if (attribute.type !== 'JSXAttribute') {
            continue;
          }

          if (attribute.name.name === 'className') {
            attribute.name.name = 'class';
          }
        }
      }
    }
  };
}
