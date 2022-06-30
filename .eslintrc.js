module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
 rules: {
  'no-console': 'off',
  'no-debugger': 'off',
  'no-unused-vars': 'off',
  'no-trailing-spaces': 'off',
  'no-unused-expressions': 'off',
  'no-undef': 'off',
  "vue/multi-word-component-names": "off",
  "vue/component-definition-name-casing": "off", 
  "no-v-for-template-key": "off",
  "vue/v-slot-style" : "off",

},

}
