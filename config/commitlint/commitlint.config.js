module.exports = {
  rules: {
    'body-leading-blank': [
      2,
      'always',
    ],
    'footer-leading-blank': [
      2,
      'always',
    ],
    'header-max-length': [
      2,
      'always',
      72,
    ],
    'scope-enum': [
      2,
      'always',
      [
        'repo',
        'package',
        'test',
        'function',
        'functor',
        'applicative',
        'monad',
      ],
    ],
    'scope-empty': [
      2,
      'never',
    ],
    'scope-case': [
      0,
    ],
    /**
     * @desc
     * Block sentence case to allow uppercase letter only after some verb or statement.
     */
    'subject-case': [
      2,
      'never',
      'sentence-case',
    ],
    'subject-empty': [
      0,
    ],
    'type-enum': [
      2,
      'always',
      [
        'chore',
        'docs',
        'feat',
        'fix',
        'init',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'type-case': [
      0,
    ],
    'type-empty': [
      2,
      'never',
    ],
  },
};
