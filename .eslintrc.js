module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    indent: ['error', 4],
    semi: [2, 'always'],
    'vue/html-indent': ['warn', 4, { 'baseIndent': 1 }],
    'vue/html-closing-bracket-newline': ['error', { multiline: 'never' }]
  }
}
