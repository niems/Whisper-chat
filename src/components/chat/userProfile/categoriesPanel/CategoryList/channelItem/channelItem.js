import React from 'react';

const ChannelItem = ({ channel }) => {
   return (
      <li id={channel} className='channel'>{channel}</li>
   );
};

export default ChannelItem;