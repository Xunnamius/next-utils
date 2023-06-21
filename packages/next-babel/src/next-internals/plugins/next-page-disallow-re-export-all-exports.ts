/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Source: https://github.com/vercel/next.js/blob/f6998e30a815e976173501a62e6e481f92699d81/packages/next/src/build/babel/plugins/next-page-disallow-re-export-all-exports.ts
 */
import type { NodePath, PluginObj, types } from '@babel/core';

export default function NextPageDisallowReExportAllExports(): PluginObj<any> {
  return {
    visitor: {
      ExportAllDeclaration(path: NodePath<types.ExportAllDeclaration>) {
        const error = new SyntaxError(
          `Using \`export * from '...'\` in a page is disallowed. Please use \`export { default } from '...'\` instead.\n` +
            `Read more: https://nextjs.org/docs/messages/export-all-in-page`
        );
        (error as any).code = 'BABEL_PARSE_ERROR';
        (error as any).loc = path.node.loc?.start ?? path.node.loc?.end ?? path.node.loc;
        throw error;
      }
    }
  };
}
