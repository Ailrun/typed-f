require('dotenv/config');

const process = require('process');

const request = require('superagent');

const version = require('../lerna.json').version;
const tag_name = `v${version}`;

const githubAuthToken = process.env.TYPED_F_GITHUB_AUTH_TOKEN;

if (githubAuthToken === undefined ||
    githubAuthToken === '') {
  console.error('You should provide TYPED_F_GITHUB_AUTH_TOKEN environment variable!');
  process.exit(1);
}

request.post('https://api.github.com/repos/ailrun/typed-f/releases')
  .set('Authorization', `token ${githubAuthToken}`)
  .send({
	tag_name,
	name: tag_name,
	body: "See [CHANGELOG.md](https://github.com/Ailrun/typed-f/blob/master/CHANGELOG.md) for detail",
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
