import React from 'react';

const UrlContext = React.createContext({
  production: false,
  basePath: ''
});

export default UrlContext;
