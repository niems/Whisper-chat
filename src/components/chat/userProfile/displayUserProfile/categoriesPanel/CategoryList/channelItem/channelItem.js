import React from 'react';

const ChannelItem = ({ channel }) => {
   return (
      <li id={channel} className='channel'>
         <span className='hashtag'>#</span>
         <span className='channel-text'>{channel}</span>
      </li>
   );
};

export default ChannelItem;