# @typed-f/monad

[![NPM Version][monad-npm-version-badge]][monad-npm]
[![CircleCI][repo-circleci-badge]][repo-circleci]
[![Known Vulnerabilities][monad-snyk-badge]][monad-snyk]
[![Supported TypeScript Version][repo-supported-typescript-badge]][supported-typescript]
[![PRs Welcome][prs-welcome-badge]][prs-welcome]

monad for [Typed-F](repo-github)

[lerna-badge]: https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg
[lerna]: https://lernajs.io/

[prs-welcome-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs-welcome]: http://makeapullrequest.com

[repo-supported-typescript-badge]: https://img.shields.io/badge/support-typescript%40%3E%3D3.0-007acc.svg
[supported-typescript]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html

[repo-slack-badge]: https://typed-f.now.sh/slack/badge.svg?style=for-the-badge&logo=slack
[repo-slack]: https://typed-f.now.sh/slack/welcome

[repo-circleci]: https://circleci.com/gh/Ailrun/typed-f/tree/master
[repo-circleci-badge]: https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser/master.svg?logo=circleci

[repo-github]: https://github.com/Ailrun/typed-f
[repo-github-releases]: https://github.com/Ailrun/typed-f/releases

[repo-github-license-badge]: https://img.shields.io/github/license/Ailrun/typed-f.svg
[repo-github-tag-badge]: https://img.shields.io/github/tag/Ailrun/typed-f.svg?colorB=blue

[applicative-github]: https://github.com/Ailrun/typed-f/tree/master/packages/applicative
[either-github]: https://github.com/Ailrun/typed-f/tree/master/packages/either
[function-github]: https://github.com/Ailrun/typed-f/tree/master/packages/function
[functor-github]: https://github.com/Ailrun/typed-f/tree/master/packages/functor
[lens-github]: https://github.com/Ailrun/typed-f/tree/master/packages/lens
[matchable-github]: https://github.com/Ailrun/typed-f/tree/master/packages/matchable
[maybe-github]: https://github.com/Ailrun/typed-f/tree/master/packages/maybe
[monad-github]: https://github.com/Ailrun/typed-f/tree/master/packages/monad
[setoid-github]: https://github.com/Ailrun/typed-f/tree/master/packages/setoid
[tagged-github]: https://github.com/Ailrun/typed-f/tree/master/packages/tagged

[applicative-npm]: https://www.npmjs.com/package/@typed-f/applicative
[either-npm]: https://www.npmjs.com/package/@typed-f/either
[function-npm]: https://www.npmjs.com/package/@typed-f/function
[functor-npm]: https://www.npmjs.com/package/@typed-f/functor
[lens-npm]: https://www.npmjs.com/package/@typed-f/lens
[matchable-npm]: https://www.npmjs.com/package/@typed-f/matchable
[maybe-npm]: https://www.npmjs.com/package/@typed-f/maybe
[monad-npm]: https://www.npmjs.com/package/@typed-f/monad
[setoid-npm]: https://www.npmjs.com/package/@typed-f/setoid
[tagged-npm]: https://www.npmjs.com/package/@typed-f/tagged

[applicative-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Fapplicative%2Fpackage.json
[either-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Feither%2Fpackage.json
[function-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Ffunction%2Fpackage.json
[functor-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Ffunctor%2Fpackage.json
[lens-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Flens%2Fpackage.json
[matchable-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Fmatchable%2Fpackage.json
[maybe-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Fmaybe%2Fpackage.json
[monad-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Fmonad%2Fpackage.json
[setoid-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Fsetoid%2Fpackage.json
[tagged-snyk-badge]: https://snyk.io/test/github/Ailrun/typed-f/badge.svg?targetFile=packages%2Ftagged%2Fpackage.json

[applicative-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/applicative/latest.svg?logo=npm&label=latest&colorB=blue
[either-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/either/latest.svg?logo=npm&label=latest&colorB=blue
[function-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/function/latest.svg?logo=npm&label=latest&colorB=blue
[functor-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/functor/latest.svg?logo=npm&label=latest&colorB=blue
[lens-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/lens/latest.svg?logo=npm&label=latest&colorB=blue
[matchable-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/matchable/latest.svg?logo=npm&label=latest&colorB=blue
[maybe-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/maybe/latest.svg?logo=npm&label=latest&colorB=blue
[monad-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/monad/latest.svg?logo=npm&label=latest&colorB=blue
[setoid-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/setoid/latest.svg?logo=npm&label=latest&colorB=blue
[tagged-npm-version-badge]: https://img.shields.io/npm/v/@typed-f/tagged/latest.svg?logo=npm&label=latest&colorB=blue

[applicative-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
[either-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
[function-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
[functor-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
[lens-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
[matchable-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
[maybe-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
[monad-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
[setoid-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
[tagged-snyk]: https://snyk.io/test/github/Ailrun/typed-f?targetFile=packages%2Flens%2Fpackage.json
