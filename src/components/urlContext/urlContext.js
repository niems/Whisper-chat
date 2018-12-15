import React from 'react';


const isProductionBuild = true; // path MUST be updated if it's the production build because of how it's hosted
const UrlContext = React.createContext({
  production: isProductionBuild,
  basePath: isProductionBuild ? '/whisper-chat' : ''
});

export default UrlContext;
