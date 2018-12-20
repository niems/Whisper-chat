import React from 'react';
import { Link } from 'react-router-dom';
import env from '../../../env';


const HomeNavigation = () => {
  return (
    <Link to={env.routePath} className="navigate home abs-top-left">
      <img
        src="./assets/svg/placeholder/round-back-arrow.svg"
        alt="navigate back to homepage"
      />
    </Link>
  );
};

export default HomeNavigation;
