import React from 'react';

const ChannelItem = ({ channel }) => {
   return (
      <li className='channel'>
         <span className='hashtag'>#</span>
         <span className='channel-text'>{channel}</span>
      </li>
   );
};

export default ChannelItem;