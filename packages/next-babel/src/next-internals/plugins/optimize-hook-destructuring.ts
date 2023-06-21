/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Source: https://github.com/vercel/next.js/blob/f6998e30a815e976173501a62e6e481f92699d81/packages/next/src/build/babel/plugins/optimize-hook-destructuring.ts
 */
import type { NodePath, PluginObj, types as BabelTypes } from '@babel/core';

// matches any hook-like (the default)
const isHook = /^use[A-Z]/;

// matches only built-in hooks provided by React et al
const isBuiltInHook =
  /^use(Callback|Context|DebugValue|Effect|ImperativeHandle|LayoutEffect|Memo|Reducer|Ref|State)$/;

export default function optimizeHookDestructuring({
  types: t
}: {
  types: typeof BabelTypes;
}): PluginObj<any> {
  const visitor = {
    CallExpression(path: NodePath<BabelTypes.CallExpression>, state: any) {
      const { onlyBuiltIns, lib } = state.opts;

      // if specified, options.lib is a list of libraries that provide hook functions
      const libs = lib && (lib === true ? ['react', 'preact/hooks'] : [lib].flat());

      // skip function calls that are not the init of a variable declaration:
      if (!t.isVariableDeclarator(path.parent)) return;

      // skip function calls where the return value is not Array-destructured:
      if (!t.isArrayPattern(path.parent.id)) return;

      // name of the (hook) function being called:
      const hookName = (path.node.callee as BabelTypes.Identifier).name;

      if (libs) {
        const binding = path.scope.getBinding(hookName);
        // not an import
        if (!binding || binding.kind !== 'module') return;

        const specifier = (binding.path.parent as BabelTypes.ImportDeclaration).source
          .value;
        // not a match
        if (!libs.includes(specifier)) return;
      }

      // only match function calls with names that look like a hook
      if (!(onlyBuiltIns ? isBuiltInHook : isHook).test(hookName)) return;

      path.parent.id = t.objectPattern(
        // eslint-disable-next-line unicorn/no-array-reduce
        path.parent.id.elements.reduce<Array<BabelTypes.ObjectProperty>>(
          (patterns, element, index) => {
            if (element === null) {
              return patterns;
            }

            return patterns.concat(
              t.objectProperty(t.numericLiteral(index), element as any)
            );
          },
          []
        )
      );
    }
  };

  return {
    name: 'optimize-hook-destructuring',
    visitor: {
      // this is a workaround to run before preset-env destroys destructured assignments
      Program(path, state) {
        path.traverse(visitor, state);
      }
    }
  };
}
