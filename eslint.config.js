// import js from '@eslint/js';
// import globals from 'globals';
// import react from 'eslint-plugin-react'; // 🔹 добавляем
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
// export default [
//   { ignores: ['dist'] },
//   {
//     files: ['**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     plugins: {
//       react, // 🔹 добавляем
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...react.configs.recommended.rules, // 🔹 включает react/prop-types и др.
//       ...reactHooks.configs.recommended.rules,
//       'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//       'react/prop-types': 'warn',
//     },
//     settings: {
//       react: {
//         version: 'detect', // 🔹 чтобы плагин понимал твою версию React
//       },
//     },
//   },
// ];
// eslint.config.js (или .mjs, если у тебя ESM)
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
// отключает конфликтующие формат-правила
import pluginImport from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  // игнор сборки/артефактов
  { ignores: ['dist', 'build', 'coverage'] },

  // базовый JS/JSX слой
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        // если нужен Node-код в tools/scripts — расширь по маске отдельным блоком
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: pluginImport,
    },
    settings: {
      react: { version: 'detect' },

      // resolver для import/order и import/no-unresolved с алиасами
      'import/resolver': {
        alias: {
          map: [
            ['@app', './src/app'],
            ['@pages', './src/pages'],
            ['@widgets', './src/widgets'],
            ['@features', './src/features'],
            ['@entities', './src/entities'],
            ['@shared', './src/shared'],
            ['@assets', './src/assets'],
          ],
          extensions: ['.js', '.jsx', '.json', '.png', '.jpg', '.jpeg', '.svg'],
        },
        node: {
          extensions: ['.js', '.jsx', '.json', '.png', '.jpg', '.jpeg', '.svg'],
        },
      },
    },
    rules: {
      // Базы
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Полезные поведенческие правила
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // import-* (порядок, пустая строка, дубликаты, резолвинг)
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // node: fs, path
            'external', // react, lodash
            'internal', // алиасы проекта
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          alphabetize: { order: 'ignore' },
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@shared/**', group: 'internal', position: 'before' },
            { pattern: '@features/**', group: 'internal', position: 'before' },
            { pattern: '@entities/**', group: 'internal', position: 'before' },
            { pattern: '@widgets/**', group: 'internal', position: 'before' },
            { pattern: '@app/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'never',
        },
      ],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',

      // prop-types на предупреждение (если в проекте есть TS — можно выключить)
      'react/prop-types': 'warn',
    },
  },

  // Отключаем конфликты с Prettier (должно быть в конце!)
  {
    rules: {
      ...(eslintConfigPrettier.rules ?? {}),
    },
  },
];
