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
      'unicorn/no-null': ['off'],
      'max-lines-per-function': ['off'],
      'import/no-unused-modules': ['off'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/unified-signatures': ['off'],
      'no-restricted-properties': ['error', { object: 'ENV' }]
  }
};
