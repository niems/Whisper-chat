import React from 'react';
import ChannelItem from './channelItem/channelItem';

const CategoryList = ({ category, channelList }) => {
    console.log(`category: ${category} | channelList: ${JSON.stringify(channelList)}\n`);

    const channels = channelList.map(channel => (
        <ChannelItem key={channel} channel={channel} />
    ));

    return(
        <ul className='category-channels-list'>
            <h3 className='category-title'>{category}</h3>
            {channels}
        </ul>
    )
};

export default CategoryList;