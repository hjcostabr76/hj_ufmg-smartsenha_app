module.exports = {
      root: true,
      parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
  },
  extends: [
      'hjcostabr76/ts-node',
      'hjcostabr76/spellcheck',
  ],
  rules: {
      'import/no-unused-modules': ['off'],
      'max-lines-per-function': ['off'],
      '@typescript-eslint/unified-signatures': ['off'],
      'no-restricted-properties': ['error', { object: 'ENV' }]
  }
};
