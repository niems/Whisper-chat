import React from 'react';
import ChannelItem from './channelItem/channelItem';

// only displays category title & toggle button if category was given
const DisplayCategoryTitle = ({ category }) => {
    //<input className='category-toggle' id={`${category}-toggle`} type='checkbox' />
    const categoryDisplay = category ?
        <React.Fragment>
            <h3 className='category-title'>{category}</h3>
        </React.Fragment>
        : null;

    return categoryDisplay;
};

const CategoryList = ({ category = null, channelList }) => {
    const channels = channelList.map(channel => (
        <ChannelItem key={channel} channel={channel} />
    ));

    return(
        <React.Fragment>
            <DisplayCategoryTitle category={category} />
            
            <ul className='category-channels-list'>
                {channels}
            </ul>
        </React.Fragment>
    )
};

export default CategoryList;