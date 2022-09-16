module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier', 'prettier/react'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'object-curly-newline': 'off',
    'import/no-useless-path-segments': 'warn',
    'import/no-relative-packages': 'warn',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
  },
};
