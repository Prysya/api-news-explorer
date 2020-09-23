{
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
    'no-unused-vars': ['error', { args: 'none' }],
  },
};
