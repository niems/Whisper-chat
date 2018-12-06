import React from 'react';
import { Link } from 'react-router-dom';
import UrlContext from '../../urlContext/urlContext';

const HomeNavigation = (props) => {
    return (
        <UrlContext.Consumer>
            { ({ basePath }) => (
                <Link to={basePath} className='navigate home abs-top-left'>
                    <img src='../assets/svg/placeholder/round-back-arrow.svg' alt='navigate back to homepage' />
                </Link>
            )}
        </UrlContext.Consumer>
    );
};

export default HomeNavigation;