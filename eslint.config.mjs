import withNuxt from "./.nuxt/eslint.config.mjs";
import unocss from "@unocss/eslint-config/flat";

export default withNuxt(
  unocss,

  // your custom flat configs go here, for example:
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   rules: {
  //     'no-console': 'off' // allow console.log in TypeScript files
  //   }
  // },
  // {
  //   ...
  // }
);
