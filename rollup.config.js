import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import { uglify } from 'rollup-plugin-uglify';

import pkg from "./package.json";

let override = { compilerOptions: { declaration: false } }

export default [
  {
    input: "src/index.ts",
    external: Object.keys(pkg.peerDependencies),
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: false
      },
    ],
    plugins: [
      external(),
      resolve({
        browser: true
      }),
      typescript({
        rollupCommonJSResolveHack: true,
        tsconfigOverride: override,
        exclude: "**/__tests__/**",
        clean: true
      }),
      commonjs({
        include: ["node_modules/**"],
        exclude: ["**/*.stories.tsx"],
        namedExports: {
          "node_modules/react/react.js": [
            "Children",
            "Component",
            "PropTypes",
            "createElement"
          ],
          "node_modules/react-dom/index.js": ["render"],
          'node_modules/react-is/index.js': [
            "isElement",
            "isValidElementType",
            "ForwardRef"
          ]
        }
      }),
      uglify()
    ]
  },
  {
    input: "src/index.ts",
    external: Object.keys(pkg.peerDependencies),
    output: [
      {
        file: pkg.module,
        format: "es",
        exports: "named",
        sourcemap: false
      },
    ],
    plugins: [
      external(),
      resolve({
        browser: true
      }),
      typescript({
        rollupCommonJSResolveHack: true,
        exclude: "**/__tests__/**",
        clean: true
      }),
      commonjs({
        include: ["node_modules/**"],
        exclude: ["**/*.stories.tsx"],
        namedExports: {
          "node_modules/react/react.js": [
            "Children",
            "Component",
            "PropTypes",
            "createElement"
          ],
          "node_modules/react-dom/index.js": ["render"],
          'node_modules/react-is/index.js': [
            "isElement",
            "isValidElementType",
            "ForwardRef"
          ]
        }
      })
    ]
  }
];
