import React from 'react';
import CategoryList from './CategoryList/categoryList';

const CategoriesPanel = ({ username, allChannelRefs, allChannelData, allOnlineUsers, onChannelSelect, signout }) => {
    
    // get all the categories to be displayed in the panel
   const channelCategories = Object.keys( allChannelData ).map(category => (
        <CategoryList key={category} category={category} displayCategoryTitle={true} channelRef={allChannelRefs[category]} onChannelSelect={onChannelSelect} channelList={Object.keys(allChannelData[category])} />
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
