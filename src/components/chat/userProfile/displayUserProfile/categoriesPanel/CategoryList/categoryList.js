import React from 'react';
import ChannelItem from './channelItem/channelItem';

// only displays category title & toggle button if category was given
const DisplayCategoryTitle = ({ category }) => {
    //<input className='category-toggle' id={`${category}-toggle`} type='checkbox' />
    const categoryDisplay = category ?
        <React.Fragment>
            <h3 id={`${category}-category`} className='category-title'>{category}</h3>
        </React.Fragment>
        : null;

    return categoryDisplay;
};

const CategoryList = ({ category, channelList, displayCategoryTitle = false, channelsRef = null, onChannelSelect = null }) => {
    const channels = channelList.map(channel => (
        <ChannelItem key={channel} channel={channel} />
    ));

    // if category list is length 0, return null (ex. PMs when a user initially creates an account)

    return(
        <React.Fragment>
            {displayCategoryTitle ? <DisplayCategoryTitle category={category} /> : null}
            
            <ul id={`${category}-list`} className='category-channels-list' onClick={onChannelSelect}>
                {channels}
            </ul>
        </React.Fragment>
    )
};

export default CategoryList;