/* eslint-disable unicorn/no-lonely-if */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Source: https://github.com/vercel/next.js/blob/f6998e30a815e976173501a62e6e481f92699d81/packages/next/src/build/babel/plugins/next-page-config.ts
 */
import type { NodePath, PluginObj, PluginPass, Visitor } from '@babel/core';
import { types as BabelTypes } from '@babel/core';
import type { PageConfig } from 'next/types';
import { STRING_LITERAL_DROP_BUNDLE } from 'next/constants';

const CONFIG_KEY = 'config';

// replace program path with just a variable with the drop identifier
function replaceBundle(path: any, t: typeof BabelTypes): void {
  path.parentPath.replaceWith(
    t.program(
      [
        t.variableDeclaration('const', [
          t.variableDeclarator(
            t.identifier(STRING_LITERAL_DROP_BUNDLE),
            t.stringLiteral(`${STRING_LITERAL_DROP_BUNDLE} ${Date.now()}`)
          )
        ])
      ],
      []
    )
  );
}

function errorMessage(state: any, details: string): string {
  const pageName = (state.filename || '').split(state.cwd || '').pop() || 'unknown';
  return `Invalid page config export found. ${details} in file ${pageName}. See: https://nextjs.org/docs/messages/invalid-page-config`;
}

interface ConfigState extends PluginPass {
  bundleDropped?: boolean;
}

// config to parsing pageConfig for client bundles
export default function nextPageConfig({
  types: t
}: {
  types: typeof BabelTypes;
}): PluginObj {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse(
            {
              ExportDeclaration(exportPath, exportState) {
                if (
                  // @ts-expect-error: whatever is wrong, it comes from upstream
                  BabelTypes.isExportNamedDeclaration(exportPath) &&
                  (exportPath.node as BabelTypes.ExportNamedDeclaration).specifiers?.some(
                    (specifier) => {
                      return (
                        (t.isIdentifier(specifier.exported)
                          ? specifier.exported.name
                          : specifier.exported.value) === CONFIG_KEY
                      );
                    }
                  ) &&
                  BabelTypes.isStringLiteral(
                    (exportPath.node as BabelTypes.ExportNamedDeclaration).source
                  )
                ) {
                  throw new Error(
                    errorMessage(exportState, 'Expected object but got export from')
                  );
                }
              },
              ExportNamedDeclaration(
                exportPath: NodePath<BabelTypes.ExportNamedDeclaration>,
                exportState: any
              ) {
                if (
                  exportState.bundleDropped ||
                  (!exportPath.node.declaration &&
                    exportPath.node.specifiers.length === 0)
                ) {
                  return;
                }

                const config: PageConfig = {};
                const declarations: BabelTypes.VariableDeclarator[] = [
                  ...((exportPath.node.declaration as BabelTypes.VariableDeclaration)
                    ?.declarations || []),
                  exportPath.scope.getBinding(CONFIG_KEY)?.path
                    .node as BabelTypes.VariableDeclarator
                ].filter(Boolean);

                for (const specifier of exportPath.node.specifiers) {
                  if (
                    (t.isIdentifier(specifier.exported)
                      ? specifier.exported.name
                      : specifier.exported.value) === CONFIG_KEY
                  ) {
                    // export {} from 'somewhere'
                    if (BabelTypes.isStringLiteral(exportPath.node.source)) {
                      throw new Error(
                        errorMessage(exportState, `Expected object but got import`)
                      );
                      // import hello from 'world'
                      // export { hello as config }
                    } else if (
                      BabelTypes.isIdentifier(
                        (specifier as BabelTypes.ExportSpecifier).local
                      )
                    ) {
                      if (
                        BabelTypes.isImportSpecifier(
                          exportPath.scope.getBinding(
                            (specifier as BabelTypes.ExportSpecifier).local.name
                          )?.path.node
                        )
                      ) {
                        throw new Error(
                          errorMessage(exportState, `Expected object but got import`)
                        );
                      }
                    }
                  }
                }

                for (const declaration of declarations) {
                  if (
                    !BabelTypes.isIdentifier(declaration.id, {
                      name: CONFIG_KEY
                    })
                  ) {
                    continue;
                  }

                  let { init } = declaration;
                  if (BabelTypes.isTSAsExpression(init)) {
                    init = init.expression;
                  }

                  if (!BabelTypes.isObjectExpression(init)) {
                    const got = init ? init.type : 'undefined';
                    throw new Error(
                      errorMessage(exportState, `Expected object but got ${got}`)
                    );
                  }

                  for (const property of init.properties) {
                    if (BabelTypes.isSpreadElement(property)) {
                      throw new Error(
                        errorMessage(exportState, `Property spread is not allowed`)
                      );
                    }
                    const { name } = property.key as BabelTypes.Identifier;
                    if (BabelTypes.isIdentifier(property.key, { name: 'amp' })) {
                      if (!BabelTypes.isObjectProperty(property)) {
                        throw new Error(
                          errorMessage(exportState, `Invalid property "${name}"`)
                        );
                      }
                      if (
                        !BabelTypes.isBooleanLiteral(property.value) &&
                        !BabelTypes.isStringLiteral(property.value)
                      ) {
                        throw new Error(
                          errorMessage(exportState, `Invalid value for "${name}"`)
                        );
                      }
                      config.amp = property.value.value as PageConfig['amp'];
                    }
                  }
                }

                if (config.amp === true) {
                  if (!exportState.file?.opts?.caller.isDev) {
                    // don't replace bundle in development so HMR can track
                    // dependencies and trigger reload when they are changed
                    replaceBundle(exportPath, t);
                  }
                  exportState.bundleDropped = true;
                  return;
                }
              }
            },
            state
          );
        }
      }
    } as Visitor<ConfigState>
  };
}
