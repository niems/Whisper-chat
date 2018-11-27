import React from 'react';
import CategoryList from './CategoryList/categoryList';
import ChannelItem from './CategoryList/channelItem/channelItem';

// testing data for structuring channel panel
const testChannelCategories = {
    "Groups": [ // user CAN manually create channels under this category
        'general', // default channel
        'random', // default channel

        'listenHereGuy', // user-defined channel
    ], 

    "PMs": [ // user CANNOT manually create channels under this category: they're automatically added when selecting a user to message or receiving a message
        'Rick',
        'Morty',
        'BirdPerson'
    ]
};

const CategoriesPanel = ({ username, allChannelRefs, allOnlineUsers, onChannelSelect, signout }) => {
    
    // get all the categories to be displayed in the panel
    const channelCategories = Object.keys( testChannelCategories ).map(category => (
        <CategoryList key={category} category={category} displayCategoryTitle={true} channelRef={allChannelRefs[category]} onChannelSelect={onChannelSelect} channelList={testChannelCategories[category]} />
    )); 

    const onlineUsers =  (<CategoryList category={'online-users'} channelRef={allChannelRefs['Online Users']} onChannelSelect={onChannelSelect} channelList={allOnlineUsers} />);

    return (
        <section className='side-panel'>
            <button id='logout' className='link-to' onClick={signout}>
                <img src='./assets/svg/placeholder/logout-black.svg' alt='user logout' />
            </button>

            <nav id='all-categories' className='scrollbar'>
                <h2 className='category-section-header'>Channels</h2>
                <div className='category-section'>
                    {channelCategories}
                </div>

                <h2 className='category-section-header'>Online Users</h2>
                <div className='category-section'>
                    {onlineUsers}
                </div>
            </nav>

            <span id='current-user'>{username}</span>
        </section>
    );
}

export default CategoriesPanel;
