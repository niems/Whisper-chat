const production = true;
const routePath = production ? '/whisper-chat/' : '/';

const env = {
  isProduction: production,
  routePath: routePath,
  domain: production ? `https://niems.github.io${routePath}` : routePath,

  socketDomain: production
    ? 'https://afternoon-springs-45644.herokuapp.com/'
    : 'http://localhost:8081/',

  serverDomain: production
    ? 'https://afternoon-springs-45644.herokuapp.com/'
    : 'http://localhost:8080/'
};

export default env;
